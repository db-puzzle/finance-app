import { useCallback, useEffect } from 'react'
import { useUserStore } from '@/stores/user-store'
import type { StreakInfo } from '@/types'

export function useStreak() {
  const { user, streakInfo, updateStreak } = useUserStore()

  const checkStreak = useCallback(async () => {
    if (!user) return

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const lastActivity = user.lastActivityAt
      ? new Date(user.lastActivityAt)
      : null
    
    if (lastActivity) {
      lastActivity.setHours(0, 0, 0, 0)
    }

    const todayCompleted = lastActivity?.getTime() === today.getTime()

    let currentStreak = user.currentStreak

    if (lastActivity) {
      const daysSinceLastActivity = Math.floor(
        (today.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24)
      )

      if (daysSinceLastActivity > 1) {
        currentStreak = 0
      }
    }

    const newStreakInfo: StreakInfo = {
      currentStreak,
      longestStreak: user.longestStreak,
      lastActivityDate: lastActivity,
      todayCompleted,
    }

    updateStreak(newStreakInfo)
  }, [user, updateStreak])

  const recordActivity = useCallback(async () => {
    if (!user || !streakInfo) return

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (streakInfo.todayCompleted) {
      return
    }

    const lastActivity = streakInfo.lastActivityDate
    let newStreak = 1

    if (lastActivity) {
      const daysSinceLastActivity = Math.floor(
        (today.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24)
      )

      if (daysSinceLastActivity === 1) {
        newStreak = streakInfo.currentStreak + 1
      } else if (daysSinceLastActivity === 0) {
        newStreak = streakInfo.currentStreak
      }
    }

    const newLongestStreak = Math.max(newStreak, streakInfo.longestStreak)

    updateStreak({
      currentStreak: newStreak,
      longestStreak: newLongestStreak,
      lastActivityDate: today,
      todayCompleted: true,
    })

    // TODO: Sync with backend
  }, [user, streakInfo, updateStreak])

  useEffect(() => {
    checkStreak()
  }, [checkStreak])

  return {
    streakInfo,
    recordActivity,
    checkStreak,
  }
}
