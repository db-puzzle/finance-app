'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Trophy, 
  Coins,
  BookOpen,
  CheckCircle2,
  Circle,
  Sparkles
} from 'lucide-react'
import {
  getLessonById,
  getNextLesson,
  type Lesson,
} from '@/content/lessons/foundation'
import { LessonContent } from '@/components/learn/lesson-content'
import { LessonQuiz } from '@/components/learn/lesson-quiz'
import { CompoundCalculator } from '@/components/learn/compound-calculator'
import {
  useProgressStore,
  type LessonProgress,
} from '@/stores/progress-store'
import { useUserStore } from '@/stores/user-store'
import { isDemoMode, updateDemoUser, getDemoUser } from '@/lib/demo-mode'
import { cn } from '@/lib/utils'

type LessonView = {
  sectionIndex: number
  showQuiz: boolean
}

function getRestoredView(
  lesson: Lesson,
  saved: LessonProgress | null
): LessonView {
  if (!saved || saved.status === 'NOT_STARTED' || saved.status === 'COMPLETED') {
    return { sectionIndex: 0, showQuiz: false }
  }

  if (saved.currentSection >= lesson.sections.length) {
    return {
      sectionIndex: lesson.sections.length - 1,
      showQuiz: true,
    }
  }

  return {
    sectionIndex: saved.currentSection,
    showQuiz: false,
  }
}

type LessonPlayerProps = {
  lesson: Lesson
  initialView: LessonView
  locale: 'en' | 'pt'
}

function LessonPlayer({ lesson, initialView, locale }: LessonPlayerProps) {
  const router = useRouter()

  const getLessonProgress = useProgressStore((state) => state.getLessonProgress)
  const startLesson = useProgressStore((state) => state.startLesson)
  const setCurrentSection = useProgressStore((state) => state.setCurrentSection)
  const markSectionComplete = useProgressStore((state) => state.markSectionComplete)
  const enterQuiz = useProgressStore((state) => state.enterQuiz)
  const markLessonComplete = useProgressStore((state) => state.markLessonComplete)
  const addCurrency = useUserStore((state) => state.addCurrency)

  const [currentSectionIndex, setCurrentSectionIndex] = useState(
    initialView.sectionIndex
  )
  const [showQuiz, setShowQuiz] = useState(initialView.showQuiz)
  const [lessonCompleted, setLessonCompleted] = useState(false)

  useEffect(() => {
    startLesson(lesson.id)
  }, [lesson.id, startLesson])

  const currentSection = lesson.sections[currentSectionIndex]
  const totalSections = lesson.sections.length
  const progressPercent = showQuiz
    ? 100
    : ((currentSectionIndex + 1) / (totalSections + 1)) * 100

  const handleNextSection = () => {
    markSectionComplete(lesson.id, currentSectionIndex)

    if (currentSectionIndex < lesson.sections.length - 1) {
      const nextIndex = currentSectionIndex + 1
      setCurrentSectionIndex(nextIndex)
      setCurrentSection(lesson.id, nextIndex)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      enterQuiz(lesson.id, lesson.sections.length)
      setShowQuiz(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePrevSection = () => {
    if (showQuiz) {
      setShowQuiz(false)
      setCurrentSection(lesson.id, currentSectionIndex)
    } else if (currentSectionIndex > 0) {
      const prevIndex = currentSectionIndex - 1
      setCurrentSectionIndex(prevIndex)
      setCurrentSection(lesson.id, prevIndex)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleQuizComplete = (passed: boolean) => {
    if (!passed) return

    const alreadyCompleted = getLessonProgress(lesson.id)?.status === 'COMPLETED'
    markLessonComplete(lesson.id, lesson.xpReward, lesson.currencyReward)

    if (!alreadyCompleted) {
      addCurrency(lesson.currencyReward)

      if (isDemoMode()) {
        const demoUser = getDemoUser()
        if (demoUser) {
          updateDemoUser({
            virtualCurrency: demoUser.virtualCurrency + lesson.currencyReward,
          })
        }
      }
    }

    setLessonCompleted(true)
  }

  const handleContinueToNextLesson = () => {
    const nextLesson = getNextLesson(lesson.id)
    if (nextLesson) {
      router.push(`/learn/${nextLesson.id}`)
    } else {
      router.push('/learn')
    }
  }

  if (lessonCompleted) {
    const nextLesson = getNextLesson(lesson.id)

    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
        <div className="container max-w-2xl py-12 px-4">
          <Card className="text-center overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-8">
              <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {locale === 'en' ? 'Lesson Complete!' : 'Lição Completa!'}
              </h1>
              <p className="text-white/80">
                {locale === 'en'
                  ? "You've mastered this topic"
                  : 'Você dominou este tópico'}
              </p>
            </div>

            <CardContent className="p-8">
              <div className="flex justify-center gap-8 mb-8">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-2xl font-bold text-primary mb-1">
                    <Sparkles className="h-5 w-5" />
                    +{lesson.xpReward}
                  </div>
                  <p className="text-sm text-muted-foreground">XP Earned</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-2xl font-bold text-amber-500 mb-1">
                    <Coins className="h-5 w-5" />
                    +{lesson.currencyReward}
                  </div>
                  <p className="text-sm text-muted-foreground">Coins Earned</p>
                </div>
              </div>

              <div className="space-y-3">
                {nextLesson ? (
                  <Button
                    size="lg"
                    className="w-full"
                    onClick={handleContinueToNextLesson}
                  >
                    {locale === 'en'
                      ? 'Continue to Next Lesson'
                      : 'Continuar para Próxima Lição'}
                    <ChevronRight className="h-5 w-5 ml-2" />
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    className="w-full"
                    onClick={() => router.push('/learn')}
                  >
                    {locale === 'en'
                      ? 'Back to Learning Path'
                      : 'Voltar para Trilha'}
                  </Button>
                )}
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full"
                  onClick={() => router.push('/dashboard')}
                >
                  {locale === 'en' ? 'Go to Dashboard' : 'Ir para Painel'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container max-w-4xl py-3 px-4">
          <div className="flex items-center justify-between mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/learn')}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              {locale === 'en' ? 'Back' : 'Voltar'}
            </Button>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {lesson.estimatedMinutes} min
            </div>
          </div>

          <div className="relative">
            <Progress value={progressPercent} className="h-2" />
            <div className="flex justify-between mt-2">
              {lesson.sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => {
                    if (!showQuiz && index <= currentSectionIndex) {
                      setCurrentSectionIndex(index)
                      setCurrentSection(lesson.id, index)
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }
                  }}
                  disabled={showQuiz || index > currentSectionIndex}
                  className={cn(
                    'flex items-center gap-1 text-xs transition-colors',
                    index === currentSectionIndex && !showQuiz
                      ? 'text-primary font-medium'
                      : index < currentSectionIndex
                        ? 'text-primary/60 hover:text-primary cursor-pointer'
                        : 'text-muted-foreground/50'
                  )}
                >
                  {index < currentSectionIndex ? (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  ) : index === currentSectionIndex && !showQuiz ? (
                    <Circle className="h-3.5 w-3.5 fill-current" />
                  ) : (
                    <Circle className="h-3.5 w-3.5" />
                  )}
                  <span className="hidden sm:inline">{index + 1}</span>
                </button>
              ))}
              <button
                disabled={!showQuiz}
                className={cn(
                  'flex items-center gap-1 text-xs transition-colors',
                  showQuiz
                    ? 'text-primary font-medium'
                    : 'text-muted-foreground/50'
                )}
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Quiz</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-3xl py-8 px-4">
        {showQuiz ? (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">
                {locale === 'en'
                  ? '🎯 Knowledge Check'
                  : '🎯 Teste de Conhecimento'}
              </h2>
              <p className="text-muted-foreground">
                {locale === 'en'
                  ? "Let's see what you've learned!"
                  : 'Vamos ver o que você aprendeu!'}
              </p>
            </div>
            <LessonQuiz
              questions={lesson.quiz}
              locale={locale}
              onComplete={handleQuizComplete}
            />
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="mb-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full font-medium">
                  {locale === 'en' ? 'Part' : 'Parte'}{' '}
                  {currentSectionIndex + 1}/{totalSections}
                </span>
              </div>
              <h2 className="text-2xl font-bold">
                {currentSection.title[locale]}
              </h2>
            </div>

            <div className="mb-8">
              <LessonContent
                content={currentSection.content[locale]}
                locale={locale}
              />

              {currentSection.type === 'interactive' &&
                currentSection.interactiveType === 'compound-calculator' && (
                  <div className="mt-8">
                    <CompoundCalculator locale={locale} />
                  </div>
                )}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-6 border-t">
          <Button
            variant="outline"
            onClick={handlePrevSection}
            disabled={currentSectionIndex === 0 && !showQuiz}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            {locale === 'en' ? 'Back' : 'Voltar'}
          </Button>

          {!showQuiz && (
            <div className="text-center text-sm text-muted-foreground">
              {currentSectionIndex + 1} / {totalSections}
            </div>
          )}

          {!showQuiz && (
            <Button onClick={handleNextSection}>
              {currentSectionIndex === lesson.sections.length - 1
                ? locale === 'en'
                  ? 'Take Quiz'
                  : 'Fazer Quiz'
                : locale === 'en'
                  ? 'Continue'
                  : 'Continuar'}
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function LessonPage() {
  const router = useRouter()
  const params = useParams()
  const lessonId = params.lessonId as string
  const locale = 'en' as const

  const lesson = getLessonById(lessonId)
  const hasHydrated = useProgressStore((state) => state.hasHydrated)
  const progressMap = useProgressStore((state) => state.progressMap)

  useEffect(() => {
    if (!lesson) {
      router.push('/learn')
    }
  }, [lesson, router])

  if (!lesson) {
    return null
  }

  if (!hasHydrated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 flex items-center justify-center">
        <p className="text-muted-foreground">
          {locale === 'en' ? 'Loading lesson...' : 'Carregando lição...'}
        </p>
      </div>
    )
  }

  const initialView = getRestoredView(lesson, progressMap[lesson.id] ?? null)

  return (
    <LessonPlayer
      key={lesson.id}
      lesson={lesson}
      initialView={initialView}
      locale={locale}
    />
  )
}
