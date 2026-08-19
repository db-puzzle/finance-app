'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  BookOpen, 
  Clock, 
  Lock,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Coins,
  Target,
  TrendingUp
} from 'lucide-react'
import { foundationLessons } from '@/content/lessons/foundation'
import { useProgressStore } from '@/stores/progress-store'
import { cn } from '@/lib/utils'

type LessonStatus = 'completed' | 'in-progress' | 'available' | 'locked'

export default function LearnPage() {
  const [locale] = useState<'en' | 'pt'>('en')

  const hasHydrated = useProgressStore((state) => state.hasHydrated)
  const progressMap = useProgressStore((state) => state.progressMap)
  const isLessonCompleted = useProgressStore((state) => state.isLessonCompleted)
  const isLessonAvailable = useProgressStore((state) => state.isLessonAvailable)
  const getCompletedLessonIds = useProgressStore((state) => state.getCompletedLessonIds)
  const getContinueLessonId = useProgressStore((state) => state.getContinueLessonId)

  const completedLessons = hasHydrated ? getCompletedLessonIds() : []
  const lessonIds = foundationLessons.map((lesson) => lesson.id)
  const currentLessonId = hasHydrated
    ? getContinueLessonId(lessonIds) ?? lessonIds[0]
    : lessonIds[0]

  const getLessonStatus = (lessonId: string, prerequisites: string[]): LessonStatus => {
    if (isLessonCompleted(lessonId)) return 'completed'
    if (progressMap[lessonId]?.status === 'IN_PROGRESS') return 'in-progress'
    if (isLessonAvailable(lessonId, prerequisites)) return 'available'
    return 'locked'
  }

  const getStatusIcon = (status: LessonStatus) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-6 w-6 text-green-500" />
      case 'in-progress':
        return (
          <div className="relative">
            <div className="h-6 w-6 rounded-full border-2 border-primary animate-pulse" />
            <div className="absolute inset-1 rounded-full bg-primary/20" />
          </div>
        )
      case 'available':
        return <Target className="h-6 w-6 text-primary" />
      case 'locked':
        return <Lock className="h-6 w-6 text-muted-foreground/50" />
    }
  }

  const getLessonNumber = (index: number) => {
    return String(index + 1).padStart(2, '0')
  }

  const totalXP = foundationLessons.reduce((acc, lesson) => acc + lesson.xpReward, 0)
  const earnedXP = completedLessons.reduce((acc, lessonId) => {
    const lesson = foundationLessons.find(l => l.id === lessonId)
    return acc + (lesson?.xpReward || 0)
  }, 0)

  const progressPercent = (completedLessons.length / foundationLessons.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="container max-w-3xl py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <BookOpen className="h-4 w-4" />
            {locale === 'en' ? 'Learning Path' : 'Trilha de Aprendizado'}
          </div>
          <h1 className="text-3xl font-bold mb-4">
            {locale === 'en' ? '🌱 Financial Foundations' : '🌱 Fundamentos Financeiros'}
          </h1>
          <p className="text-muted-foreground">
            {locale === 'en' 
              ? 'Master the basics of personal finance and build a strong foundation for your financial future.'
              : 'Domine os conceitos básicos de finanças pessoais e construa uma base sólida para seu futuro financeiro.'}
          </p>
        </div>

        {/* Progress card */}
        <Card className="mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  {locale === 'en' ? 'Your Progress' : 'Seu Progresso'}
                </p>
                <p className="text-2xl font-bold">
                  {completedLessons.length} / {foundationLessons.length} {locale === 'en' ? 'lessons' : 'lições'}
                </p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="flex items-center gap-1 text-primary font-bold">
                    <Sparkles className="h-4 w-4" />
                    {earnedXP} / {totalXP}
                  </div>
                  <p className="text-xs text-muted-foreground">XP</p>
                </div>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
              </div>
            </div>
            <Progress value={progressPercent} className="h-3" />
          </div>
        </Card>

        {/* Lessons list */}
        <div className="space-y-4">
          {foundationLessons.map((lesson, index) => {
            const status = getLessonStatus(lesson.id, lesson.prerequisites)
            const isLocked = status === 'locked'
            const sectionProgress = progressMap[lesson.id]
            const sectionPercent =
              status === 'in-progress' && sectionProgress
                ? Math.min(
                    100,
                    Math.round(
                      (sectionProgress.currentSection / (lesson.sections.length + 1)) * 100
                    )
                  )
                : 0

            return (
              <Card 
                key={lesson.id} 
                className={cn(
                  "overflow-hidden transition-all duration-200",
                  isLocked && "opacity-60",
                  !isLocked && "hover:shadow-md hover:border-primary/30"
                )}
              >
                <CardContent className="p-0">
                  <Link 
                    href={isLocked ? '#' : `/learn/${lesson.id}`}
                    className={cn(
                      "flex items-start gap-4 p-5",
                      isLocked && "cursor-not-allowed"
                    )}
                    onClick={(e) => isLocked && e.preventDefault()}
                  >
                    {/* Lesson number and status */}
                    <div className="flex flex-col items-center gap-2">
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold",
                        status === 'completed' && "bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400",
                        status === 'in-progress' && "bg-primary/10 text-primary",
                        status === 'available' && "bg-muted text-foreground",
                        status === 'locked' && "bg-muted/50 text-muted-foreground/50"
                      )}>
                        {getLessonNumber(index)}
                      </div>
                      {getStatusIcon(status)}
                    </div>

                    {/* Lesson content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {status === 'in-progress' && (
                          <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full">
                            {locale === 'en' ? 'Continue' : 'Continuar'}
                          </span>
                        )}
                        {status === 'completed' && (
                          <span className="px-2 py-0.5 bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400 text-xs font-medium rounded-full">
                            {locale === 'en' ? 'Completed' : 'Completa'}
                          </span>
                        )}
                      </div>
                      
                      <h3 className={cn(
                        "font-semibold text-lg mb-1",
                        isLocked && "text-muted-foreground/70"
                      )}>
                        {lesson.title[locale]}
                      </h3>
                      
                      <p className={cn(
                        "text-sm mb-3 line-clamp-2",
                        isLocked ? "text-muted-foreground/50" : "text-muted-foreground"
                      )}>
                        {lesson.description[locale]}
                      </p>

                      {status === 'in-progress' && sectionPercent > 0 && (
                        <div className="mb-3">
                          <Progress value={sectionPercent} className="h-1.5" />
                        </div>
                      )}

                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {lesson.estimatedMinutes} min
                        </span>
                        <span className="flex items-center gap-1">
                          <Sparkles className="h-3.5 w-3.5 text-primary" />
                          {lesson.xpReward} XP
                        </span>
                        <span className="flex items-center gap-1">
                          <Coins className="h-3.5 w-3.5 text-amber-500" />
                          {lesson.currencyReward}
                        </span>
                      </div>
                    </div>

                    {/* Arrow */}
                    {!isLocked && (
                      <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-3" />
                    )}
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Continue button for mobile */}
        {currentLessonId && (
          <div className="fixed bottom-6 left-4 right-4 md:hidden">
            <Button size="lg" className="w-full shadow-lg" asChild>
              <Link href={`/learn/${currentLessonId}`}>
                {locale === 'en' ? 'Continue Learning' : 'Continuar Aprendendo'}
                <ChevronRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
