'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  CheckCircle2, 
  XCircle, 
  ChevronRight,
  Lightbulb,
  Trophy,
  RefreshCw,
  Sparkles
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { QuizQuestion } from '@/content/lessons/foundation'

type LessonQuizProps = {
  questions: QuizQuestion[]
  locale: 'en' | 'pt'
  onComplete: (passed: boolean) => void
}

export function LessonQuiz({ questions, locale, onComplete }: LessonQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [hasAnswered, setHasAnswered] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [showResults, setShowResults] = useState(false)

  const currentQuestion = questions[currentQuestionIndex]
  const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100
  const isCorrect = currentQuestion?.options.find(o => o.id === selectedAnswer)?.isCorrect

  const handleSelectAnswer = (optionId: string) => {
    if (hasAnswered) return
    setSelectedAnswer(optionId)
  }

  const handleCheckAnswer = () => {
    if (!selectedAnswer) return
    setHasAnswered(true)
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
      setSelectedAnswer(null)
      setHasAnswered(false)
    } else {
      setShowResults(true)
    }
  }

  const handleRetry = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setHasAnswered(false)
    setCorrectAnswers(0)
    setShowResults(false)
  }

  if (showResults) {
    const passed = correctAnswers >= Math.ceil(questions.length * 0.7)
    const percentage = Math.round((correctAnswers / questions.length) * 100)

    return (
      <Card className="overflow-hidden">
        <div className={cn(
          "p-6 text-center",
          passed 
            ? "bg-gradient-to-br from-green-500 to-emerald-600" 
            : "bg-gradient-to-br from-amber-500 to-orange-600"
        )}>
          <div className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4",
            passed ? "bg-white/20" : "bg-white/20"
          )}>
            {passed ? (
              <Trophy className="h-8 w-8 text-white" />
            ) : (
              <RefreshCw className="h-8 w-8 text-white" />
            )}
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">
            {passed 
              ? (locale === 'en' ? 'Great Job!' : 'Ótimo Trabalho!')
              : (locale === 'en' ? 'Keep Learning!' : 'Continue Aprendendo!')}
          </h3>
          <p className="text-white/80">
            {locale === 'en' 
              ? `You got ${correctAnswers} out of ${questions.length} correct`
              : `Você acertou ${correctAnswers} de ${questions.length}`}
          </p>
        </div>

        <CardContent className="p-6">
          {/* Score visualization */}
          <div className="flex items-center justify-center gap-3 mb-6">
            {questions.map((_, index) => (
              <div 
                key={index}
                className={cn(
                  "w-3 h-3 rounded-full",
                  index < correctAnswers ? "bg-green-500" : "bg-red-400"
                )}
              />
            ))}
          </div>

          <div className="text-center mb-6">
            <div className="text-5xl font-bold text-primary mb-1">{percentage}%</div>
            <p className="text-sm text-muted-foreground">
              {passed 
                ? (locale === 'en' ? 'You passed! 🎉' : 'Você passou! 🎉')
                : (locale === 'en' ? 'Need 70% to pass' : 'Precisa de 70% para passar')}
            </p>
          </div>

          {passed ? (
            <Button size="lg" className="w-full" onClick={() => onComplete(true)}>
              <Sparkles className="h-4 w-4 mr-2" />
              {locale === 'en' ? 'Claim Rewards' : 'Reivindicar Recompensas'}
            </Button>
          ) : (
            <div className="space-y-3">
              <Button size="lg" className="w-full" onClick={handleRetry}>
                <RefreshCw className="h-4 w-4 mr-2" />
                {locale === 'en' ? 'Try Again' : 'Tentar Novamente'}
              </Button>
              <Button size="lg" variant="outline" className="w-full" onClick={() => onComplete(false)}>
                {locale === 'en' ? 'Review Lesson' : 'Revisar Lição'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            {locale === 'en' ? 'Question' : 'Pergunta'} {currentQuestionIndex + 1}/{questions.length}
          </span>
          <span>{correctAnswers} {locale === 'en' ? 'correct' : 'corretas'}</span>
        </div>
        <Progress value={progressPercent} className="h-2" />
      </div>

      {/* Question */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-6">
            {currentQuestion.question[locale]}
          </h3>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === option.id
              const showCorrect = hasAnswered && option.isCorrect
              const showWrong = hasAnswered && isSelected && !option.isCorrect

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectAnswer(option.id)}
                  disabled={hasAnswered}
                  className={cn(
                    "w-full p-4 rounded-xl border-2 text-left transition-all duration-200",
                    "flex items-center gap-4",
                    !hasAnswered && isSelected && "border-primary bg-primary/5",
                    !hasAnswered && !isSelected && "border-border hover:border-primary/50 hover:bg-muted/50",
                    showCorrect && "border-green-500 bg-green-50 dark:bg-green-950/30",
                    showWrong && "border-red-500 bg-red-50 dark:bg-red-950/30",
                    hasAnswered && !showCorrect && !showWrong && "opacity-50"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-sm",
                    !hasAnswered && isSelected && "bg-primary text-primary-foreground",
                    !hasAnswered && !isSelected && "bg-muted",
                    showCorrect && "bg-green-500 text-white",
                    showWrong && "bg-red-500 text-white"
                  )}>
                    {showCorrect ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : showWrong ? (
                      <XCircle className="h-5 w-5" />
                    ) : (
                      String.fromCharCode(65 + index)
                    )}
                  </div>
                  <span className={cn(
                    "flex-1",
                    showCorrect && "text-green-700 dark:text-green-300 font-medium",
                    showWrong && "text-red-700 dark:text-red-300"
                  )}>
                    {option.text[locale]}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Explanation */}
          {hasAnswered && (
            <div className={cn(
              "mt-6 p-4 rounded-lg animate-in fade-in slide-in-from-bottom-2 duration-300",
              isCorrect ? "bg-green-50 dark:bg-green-950/30" : "bg-amber-50 dark:bg-amber-950/30"
            )}>
              <div className="flex items-start gap-3">
                <Lightbulb className={cn(
                  "h-5 w-5 flex-shrink-0 mt-0.5",
                  isCorrect ? "text-green-600" : "text-amber-600"
                )} />
                <div>
                  <p className={cn(
                    "font-medium mb-1",
                    isCorrect ? "text-green-700 dark:text-green-300" : "text-amber-700 dark:text-amber-300"
                  )}>
                    {isCorrect 
                      ? (locale === 'en' ? 'Correct!' : 'Correto!')
                      : (locale === 'en' ? 'Not quite!' : 'Não exatamente!')}
                  </p>
                  <p className={cn(
                    "text-sm",
                    isCorrect ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400"
                  )}>
                    {currentQuestion.explanation[locale]}
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action buttons */}
      <div className="flex justify-end">
        {!hasAnswered ? (
          <Button 
            size="lg"
            onClick={handleCheckAnswer}
            disabled={!selectedAnswer}
          >
            {locale === 'en' ? 'Check Answer' : 'Verificar Resposta'}
          </Button>
        ) : (
          <Button 
            size="lg"
            onClick={handleNextQuestion}
          >
            {currentQuestionIndex < questions.length - 1 
              ? (locale === 'en' ? 'Next Question' : 'Próxima Pergunta')
              : (locale === 'en' ? 'See Results' : 'Ver Resultados')}
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  )
}
