import type { 
  User, 
  LearningPath, 
  Lesson, 
  LessonSection,
  Quiz,
  QuizQuestion,
  UserProgress,
  Achievement,
  VirtualPortfolio,
  PortfolioHolding,
  VirtualTrade,
  LeaderboardEntry,
} from '@/generated/prisma/client'

export {
  Country, 
  AgeGroup, 
  SectionType,
  QuestionType,
  QuizType,
  ProgressStatus,
  AchievementType,
  TradeType,
  LeaderboardType,
} from '@/generated/prisma/client'

export type {
  User,
  LearningPath,
  Lesson,
  LessonSection,
  Quiz,
  QuizQuestion,
  UserProgress,
  Achievement,
  VirtualPortfolio,
  PortfolioHolding,
  VirtualTrade,
  LeaderboardEntry,
}

export type TranslatedContent = {
  en: string
  pt: string
}

export type QuizOption = {
  id: string
  text: TranslatedContent
  isCorrect?: boolean
}

export type MatchingPair = {
  left: TranslatedContent
  right: TranslatedContent
}

export type LessonWithRelations = Lesson & {
  path: LearningPath
  sections: LessonSection[]
  quizzes: Quiz[]
}

export type UserWithProgress = User & {
  progress: UserProgress[]
}

export type LearningPathWithLessons = LearningPath & {
  lessons: Lesson[]
}

export type PortfolioWithHoldings = VirtualPortfolio & {
  holdings: PortfolioHolding[]
  trades: VirtualTrade[]
}

export type LeaderboardDisplayEntry = {
  rank: number
  userId: string
  userName: string
  avatarUrl: string | null
  score: number
  isCurrentUser: boolean
}

export type SkillTreeNode = {
  id: string
  lessonId: string
  title: string
  description: string
  status: 'locked' | 'available' | 'in_progress' | 'completed'
  xpReward: number
  position: { x: number; y: number }
  connections: string[]
}

export type StockQuote = {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: number
}

export type AuthState = {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

export type StreakInfo = {
  currentStreak: number
  longestStreak: number
  lastActivityDate: Date | null
  todayCompleted: boolean
}

export type CompoundInterestResult = {
  year: number
  principal: number
  interest: number
  total: number
}

export type PortfolioAllocation = {
  symbol: string
  name: string
  percentage: number
  color: string
}

export type MarketScenario = {
  id: string
  title: TranslatedContent
  description: TranslatedContent
  marketChange: number
  options: {
    id: string
    text: TranslatedContent
    impact: number
    feedback: TranslatedContent
  }[]
}
