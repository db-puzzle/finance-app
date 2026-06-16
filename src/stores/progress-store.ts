import { create } from 'zustand'
import type { UserProgress, ProgressStatus } from '@/types'

type ProgressState = {
  progressMap: Record<string, UserProgress>
  isLoading: boolean
}

type ProgressActions = {
  setProgress: (progress: UserProgress[]) => void
  updateLessonProgress: (lessonId: string, updates: Partial<UserProgress>) => void
  markSectionComplete: (lessonId: string, sectionIndex: number) => void
  markLessonComplete: (lessonId: string, xpEarned: number, currencyEarned: number) => void
  getLessonProgress: (lessonId: string) => UserProgress | null
  isLessonCompleted: (lessonId: string) => boolean
  isLessonAvailable: (lessonId: string, prerequisites: string[]) => boolean
}

export const useProgressStore = create<ProgressState & ProgressActions>()((set, get) => ({
  progressMap: {},
  isLoading: true,

  setProgress: (progress: UserProgress[]) =>
    set({
      progressMap: progress.reduce(
        (acc: Record<string, UserProgress>, p: UserProgress) => ({ ...acc, [p.lessonId]: p }),
        {}
      ),
      isLoading: false,
    }),

  updateLessonProgress: (lessonId: string, updates: Partial<UserProgress>) =>
    set((state) => ({
      progressMap: {
        ...state.progressMap,
        [lessonId]: state.progressMap[lessonId]
          ? { ...state.progressMap[lessonId], ...updates }
          : ({ lessonId, ...updates } as UserProgress),
      },
    })),

  markSectionComplete: (lessonId: string, sectionIndex: number) =>
    set((state) => {
      const current = state.progressMap[lessonId]
      const completedSections = current?.completedSections || []
      
      if (completedSections.includes(sectionIndex)) {
        return state
      }
      
      return {
        progressMap: {
          ...state.progressMap,
          [lessonId]: {
            ...current,
            lessonId,
            completedSections: [...completedSections, sectionIndex],
            currentSection: sectionIndex + 1,
            status: 'IN_PROGRESS' as ProgressStatus,
          } as UserProgress,
        },
      }
    }),

  markLessonComplete: (lessonId: string, xpEarned: number, currencyEarned: number) =>
    set((state) => ({
      progressMap: {
        ...state.progressMap,
        [lessonId]: {
          ...state.progressMap[lessonId],
          lessonId,
          status: 'COMPLETED' as ProgressStatus,
          xpEarned,
          currencyEarned,
          completedAt: new Date(),
        } as UserProgress,
      },
    })),

  getLessonProgress: (lessonId: string) => get().progressMap[lessonId] || null,

  isLessonCompleted: (lessonId: string) =>
    get().progressMap[lessonId]?.status === 'COMPLETED',

  isLessonAvailable: (lessonId: string, prerequisites: string[]) => {
    if (prerequisites.length === 0) return true
    
    const { progressMap } = get()
    return prerequisites.every(
      (prereqId: string) => progressMap[prereqId]?.status === 'COMPLETED'
    )
  },
}))
