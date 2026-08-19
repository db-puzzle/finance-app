import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type LessonProgressStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED'

export type LessonProgress = {
  lessonId: string
  status: LessonProgressStatus
  /** Current section index; equals section count when the user is on the quiz */
  currentSection: number
  completedSections: number[]
  xpEarned: number
  currencyEarned: number
  startedAt: string | null
  completedAt: string | null
}

type ProgressState = {
  progressMap: Record<string, LessonProgress>
  hasHydrated: boolean
}

type ProgressActions = {
  setHasHydrated: (hydrated: boolean) => void
  startLesson: (lessonId: string) => void
  setCurrentSection: (lessonId: string, sectionIndex: number) => void
  markSectionComplete: (lessonId: string, sectionIndex: number) => void
  enterQuiz: (lessonId: string, totalSections: number) => void
  markLessonComplete: (lessonId: string, xpEarned: number, currencyEarned: number) => void
  getLessonProgress: (lessonId: string) => LessonProgress | null
  isLessonCompleted: (lessonId: string) => boolean
  isLessonAvailable: (lessonId: string, prerequisites: string[]) => boolean
  getCompletedLessonIds: () => string[]
  getContinueLessonId: (lessonIds: string[]) => string | null
}

function createEmptyProgress(lessonId: string): LessonProgress {
  return {
    lessonId,
    status: 'NOT_STARTED',
    currentSection: 0,
    completedSections: [],
    xpEarned: 0,
    currencyEarned: 0,
    startedAt: null,
    completedAt: null,
  }
}

export const useProgressStore = create<ProgressState & ProgressActions>()(
  persist(
    (set, get) => ({
      progressMap: {},
      hasHydrated: false,

      setHasHydrated: (hydrated) => set({ hasHydrated: hydrated }),

      startLesson: (lessonId) =>
        set((state) => {
          const existing = state.progressMap[lessonId]
          if (existing && existing.status !== 'NOT_STARTED') {
            return state
          }

          return {
            progressMap: {
              ...state.progressMap,
              [lessonId]: {
                ...createEmptyProgress(lessonId),
                status: 'IN_PROGRESS',
                startedAt: new Date().toISOString(),
              },
            },
          }
        }),

      setCurrentSection: (lessonId, sectionIndex) =>
        set((state) => {
          const current = state.progressMap[lessonId] ?? createEmptyProgress(lessonId)

          return {
            progressMap: {
              ...state.progressMap,
              [lessonId]: {
                ...current,
                lessonId,
                currentSection: sectionIndex,
                status: current.status === 'COMPLETED' ? 'COMPLETED' : 'IN_PROGRESS',
                startedAt: current.startedAt ?? new Date().toISOString(),
              },
            },
          }
        }),

      markSectionComplete: (lessonId, sectionIndex) =>
        set((state) => {
          const current = state.progressMap[lessonId] ?? createEmptyProgress(lessonId)
          const completedSections = current.completedSections.includes(sectionIndex)
            ? current.completedSections
            : [...current.completedSections, sectionIndex]

          return {
            progressMap: {
              ...state.progressMap,
              [lessonId]: {
                ...current,
                lessonId,
                completedSections,
                currentSection: Math.max(current.currentSection, sectionIndex + 1),
                status: current.status === 'COMPLETED' ? 'COMPLETED' : 'IN_PROGRESS',
                startedAt: current.startedAt ?? new Date().toISOString(),
              },
            },
          }
        }),

      enterQuiz: (lessonId, totalSections) =>
        set((state) => {
          const current = state.progressMap[lessonId] ?? createEmptyProgress(lessonId)

          return {
            progressMap: {
              ...state.progressMap,
              [lessonId]: {
                ...current,
                lessonId,
                currentSection: totalSections,
                status: current.status === 'COMPLETED' ? 'COMPLETED' : 'IN_PROGRESS',
                startedAt: current.startedAt ?? new Date().toISOString(),
              },
            },
          }
        }),

      markLessonComplete: (lessonId, xpEarned, currencyEarned) =>
        set((state) => {
          const current = state.progressMap[lessonId] ?? createEmptyProgress(lessonId)
          const alreadyCompleted = current.status === 'COMPLETED'

          return {
            progressMap: {
              ...state.progressMap,
              [lessonId]: {
                ...current,
                lessonId,
                status: 'COMPLETED',
                xpEarned: alreadyCompleted ? current.xpEarned : xpEarned,
                currencyEarned: alreadyCompleted ? current.currencyEarned : currencyEarned,
                completedAt: alreadyCompleted
                  ? current.completedAt
                  : new Date().toISOString(),
                startedAt: current.startedAt ?? new Date().toISOString(),
              },
            },
          }
        }),

      getLessonProgress: (lessonId) => get().progressMap[lessonId] ?? null,

      isLessonCompleted: (lessonId) =>
        get().progressMap[lessonId]?.status === 'COMPLETED',

      isLessonAvailable: (lessonId, prerequisites) => {
        if (prerequisites.length === 0) return true

        const { progressMap } = get()
        return prerequisites.every(
          (prereqId) => progressMap[prereqId]?.status === 'COMPLETED'
        )
      },

      getCompletedLessonIds: () =>
        Object.values(get().progressMap)
          .filter((progress) => progress.status === 'COMPLETED')
          .map((progress) => progress.lessonId),

      getContinueLessonId: (lessonIds) => {
        const { progressMap } = get()

        const inProgress = lessonIds.find(
          (id) => progressMap[id]?.status === 'IN_PROGRESS'
        )
        if (inProgress) return inProgress

        const nextAvailable = lessonIds.find((id) => {
          const progress = progressMap[id]
          return !progress || progress.status === 'NOT_STARTED'
        })

        return nextAvailable ?? null
      },
    }),
    {
      name: 'lesson-progress-storage',
      partialize: (state) => ({
        progressMap: state.progressMap,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)

// Fallback if rehydration already finished before listeners attached
if (typeof window !== 'undefined') {
  useProgressStore.persist.onFinishHydration(() => {
    useProgressStore.getState().setHasHydrated(true)
  })
  if (useProgressStore.persist.hasHydrated()) {
    useProgressStore.getState().setHasHydrated(true)
  }
}
