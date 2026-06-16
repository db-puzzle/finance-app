'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  Wallet, 
  Globe, 
  User, 
  ChevronRight, 
  ChevronLeft,
  GraduationCap,
  Briefcase,
  Users,
  Armchair,
  TreePalm
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { isDemoMode, updateDemoUser } from '@/lib/demo-mode'

const countries = [
  { id: 'US', flag: '🇺🇸' },
  { id: 'BR', flag: '🇧🇷' },
  { id: 'UK', flag: '🇬🇧' },
] as const

const ageGroups = [
  { id: 'STUDENT', icon: GraduationCap },
  { id: 'YOUNG_ADULT', icon: Briefcase },
  { id: 'ADULT', icon: Users },
  { id: 'PRE_RETIREMENT', icon: Armchair },
  { id: 'RETIREMENT', icon: TreePalm },
] as const

type Country = typeof countries[number]['id']
type AgeGroup = typeof ageGroups[number]['id']

export default function OnboardingPage() {
  const t = useTranslations()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [country, setCountry] = useState<Country | null>(null)
  const [ageGroup, setAgeGroup] = useState<AgeGroup | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const totalSteps = 2
  const progress = (step / totalSteps) * 100
  const isDemo = isDemoMode()

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleFinish = async () => {
    if (!country || !ageGroup) return

    setIsLoading(true)

    try {
      if (isDemo) {
        // Demo mode - just update local storage
        updateDemoUser({
          country,
          ageGroup,
          onboardingCompleted: true,
        })
        router.push('/dashboard')
      } else {
        // Real mode - call API
        const response = await fetch('/api/user/onboarding', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ country, ageGroup }),
        })

        if (response.ok) {
          router.push('/dashboard')
        }
      }
    } catch (error) {
      console.error('Onboarding error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Wallet className="h-5 w-5" />
            </div>
            <span className="font-bold text-xl">Finance App</span>
          </div>
          {isDemo && (
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Demo Mode
            </Badge>
          )}
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          <div className="mb-8">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground mt-2 text-center">
              Step {step} of {totalSteps}
            </p>
          </div>

          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">
                {step === 1 ? t('onboarding.selectCountry') : t('onboarding.selectAgeGroup')}
              </CardTitle>
              <CardDescription>
                {step === 1 
                  ? t('onboarding.selectCountryDescription')
                  : t('onboarding.selectAgeGroupDescription')
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              {step === 1 ? (
                <div className="grid gap-3">
                  {countries.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setCountry(c.id)}
                      className={cn(
                        'flex items-center gap-4 p-4 rounded-lg border-2 transition-all',
                        'hover:border-primary/50 hover:bg-muted/50',
                        country === c.id 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border'
                      )}
                    >
                      <span className="text-3xl">{c.flag}</span>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{t(`countries.${c.id}`)}</span>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="grid gap-3">
                  {ageGroups.map((ag) => (
                    <button
                      key={ag.id}
                      onClick={() => setAgeGroup(ag.id)}
                      className={cn(
                        'flex items-center gap-4 p-4 rounded-lg border-2 transition-all',
                        'hover:border-primary/50 hover:bg-muted/50',
                        ageGroup === ag.id 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border'
                      )}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                        <ag.icon className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{t(`ageGroups.${ag.id}`)}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              <div className="flex gap-3 mt-6">
                {step > 1 && (
                  <Button 
                    variant="outline" 
                    onClick={handleBack}
                    className="flex-1"
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    {t('onboarding.back')}
                  </Button>
                )}
                
                {step < totalSteps ? (
                  <Button 
                    onClick={handleNext}
                    disabled={step === 1 && !country}
                    className="flex-1"
                  >
                    {t('onboarding.continue')}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button 
                    onClick={handleFinish}
                    disabled={!ageGroup || isLoading}
                    className="flex-1"
                  >
                    {t('onboarding.finish')}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
