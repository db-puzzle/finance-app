import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, StreakInfo } from '@/types'

type UserState = {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  streakInfo: StreakInfo | null
}

type UserActions = {
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  updateProfile: (updates: Partial<Pick<User, 'name' | 'avatarUrl' | 'country' | 'ageGroup' | 'locale'>>) => void
  addCurrency: (amount: number) => void
  updateStreak: (streakInfo: StreakInfo) => void
  completeOnboarding: () => void
  logout: () => void
}

export const useUserStore = create<UserState & UserActions>()(
  persist(
    (set) => ({
      user: null,
      isLoading: true,
      isAuthenticated: false,
      streakInfo: null,

      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
          isLoading: false,
        }),

      setLoading: (loading) =>
        set({ isLoading: loading }),

      updateProfile: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),

      addCurrency: (amount) =>
        set((state) => ({
          user: state.user
            ? { ...state.user, virtualCurrency: state.user.virtualCurrency + amount }
            : null,
        })),

      updateStreak: (streakInfo) =>
        set((state) => ({
          streakInfo,
          user: state.user
            ? {
                ...state.user,
                currentStreak: streakInfo.currentStreak,
                longestStreak: streakInfo.longestStreak,
              }
            : null,
        })),

      completeOnboarding: () =>
        set((state) => ({
          user: state.user ? { ...state.user, onboardingCompleted: true } : null,
        })),

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          streakInfo: null,
        }),
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
