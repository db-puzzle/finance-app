'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import type { User as SupabaseUser } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  Wallet, 
  Flame, 
  Coins, 
  BookOpen, 
  Trophy,
  ChevronRight,
  Play,
  Lock,
  CheckCircle2,
  BarChart3,
  User,
  Settings,
  LogOut,
  Home,
  GraduationCap,
  Menu
} from 'lucide-react'
import { endDemoMode, type DemoUser } from '@/lib/demo-mode'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { foundationLessons } from '@/content/lessons/foundation'
import { useProgressStore } from '@/stores/progress-store'

type DashboardContentProps = {
  user: SupabaseUser | DemoUser
  isDemo?: boolean
}

function isDemoUser(user: SupabaseUser | DemoUser): user is DemoUser {
  return 'onboardingCompleted' in user
}

export function DashboardContent({ user, isDemo = false }: DashboardContentProps) {
  const t = useTranslations()
  const router = useRouter()
  
  const userName = isDemoUser(user) 
    ? user.name 
    : (user.user_metadata?.name || user.email?.split('@')[0] || 'Learner')
  
  const avatarUrl = isDemoUser(user) ? undefined : user.user_metadata?.avatar_url

  const handleLogout = async () => {
    if (isDemo) {
      endDemoMode()
    } else {
      const supabase = createClient()
      await supabase.auth.signOut()
    }
    router.push('/')
  }

  const progressMap = useProgressStore((state) => state.progressMap)
  const isLessonCompleted = useProgressStore((state) => state.isLessonCompleted)
  const isLessonAvailable = useProgressStore((state) => state.isLessonAvailable)
  const getCompletedLessonIds = useProgressStore((state) => state.getCompletedLessonIds)

  const completedLessonIds = getCompletedLessonIds()

  const lessonCards = foundationLessons.map((lesson) => {
    let status: 'completed' | 'in_progress' | 'available' | 'locked' = 'locked'
    if (isLessonCompleted(lesson.id)) {
      status = 'completed'
    } else if (progressMap[lesson.id]?.status === 'IN_PROGRESS') {
      status = 'in_progress'
    } else if (isLessonAvailable(lesson.id, lesson.prerequisites)) {
      status = 'available'
    }

    const saved = progressMap[lesson.id]
    const progress =
      status === 'in_progress' && saved
        ? Math.min(
            100,
            Math.round((saved.currentSection / (lesson.sections.length + 1)) * 100)
          )
        : undefined

    return {
      id: lesson.id,
      title: lesson.title.en,
      status,
      xp: lesson.xpReward,
      progress,
    }
  })

  const mockStats = isDemoUser(user) 
    ? {
        streak: user.currentStreak,
        coins: user.virtualCurrency,
        lessonsCompleted: completedLessonIds.length,
        totalLessons: foundationLessons.length,
      }
    : {
        streak: 5,
        coins: 450,
        lessonsCompleted: completedLessonIds.length,
        totalLessons: foundationLessons.length,
      }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Wallet className="h-5 w-5" />
              </div>
              <span className="font-bold text-xl hidden sm:inline">Finance App</span>
            </Link>
            
            {isDemo && (
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Demo Mode
              </Badge>
            )}
            
            <nav className="hidden md:flex items-center gap-1">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard">
                  <Home className="h-4 w-4 mr-2" />
                  {t('nav.home')}
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/learn">
                  <GraduationCap className="h-4 w-4 mr-2" />
                  {t('nav.learn')}
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/portfolio">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  {t('nav.portfolio')}
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/leaderboard">
                  <Trophy className="h-4 w-4 mr-2" />
                  {t('nav.leaderboard')}
                </Link>
              </Button>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-sm">
                <Flame className="h-4 w-4 text-orange-500" />
                <span className="font-medium">{mockStats.streak}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm">
                <Coins className="h-4 w-4 text-yellow-500" />
                <span className="font-medium">{mockStats.coins}</span>
              </div>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={avatarUrl} />
                    <AvatarFallback>{userName[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="font-medium">{userName}</p>
                  <p className="text-sm text-muted-foreground">
                    {isDemoUser(user) ? user.email : user.email}
                  </p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    {t('nav.profile')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    {t('nav.settings')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  {t('nav.logout')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold sm:text-3xl">
            {t('dashboard.greeting', { name: userName })}
          </h1>
          <p className="text-muted-foreground mt-1">
            Ready to continue your financial journey?
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Continue Learning Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{t('dashboard.continuelearning')}</CardTitle>
                  <CardDescription>
                    {mockStats.lessonsCompleted} of {mockStats.totalLessons} lessons completed
                  </CardDescription>
                </div>
                <Button asChild>
                  <Link href="/learn">
                    View All
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lessonCards.map((lesson) => (
                    <div 
                      key={lesson.id}
                      className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-shrink-0">
                        {lesson.status === 'completed' ? (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                            <CheckCircle2 className="h-5 w-5" />
                          </div>
                        ) : lesson.status === 'in_progress' ? (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <Play className="h-5 w-5" />
                          </div>
                        ) : lesson.status === 'available' ? (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
                            <BookOpen className="h-5 w-5" />
                          </div>
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground/50">
                            <Lock className="h-5 w-5" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium truncate">{lesson.title}</h3>
                          {lesson.status === 'in_progress' && (
                            <Badge variant="secondary" className="flex-shrink-0">
                              In Progress
                            </Badge>
                          )}
                        </div>
                        {lesson.status === 'in_progress' && lesson.progress && (
                          <div className="mt-2">
                            <Progress value={lesson.progress} className="h-1.5" />
                          </div>
                        )}
                        <p className="text-sm text-muted-foreground mt-1">
                          +{lesson.xp} XP
                        </p>
                      </div>
                      
                      <Button 
                        variant={lesson.status === 'locked' ? 'ghost' : 'outline'}
                        size="sm"
                        disabled={lesson.status === 'locked'}
                        asChild={lesson.status !== 'locked'}
                      >
                        {lesson.status !== 'locked' ? (
                          <Link href={`/learn/${lesson.id}`}>
                            {lesson.status === 'completed' 
                              ? 'Review' 
                              : lesson.status === 'in_progress' 
                                ? 'Continue' 
                                : 'Start'
                            }
                          </Link>
                        ) : (
                          <span>Locked</span>
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats Card */}
            <Card>
              <CardHeader>
                <CardTitle>{t('dashboard.yourProgress')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-orange-50 dark:bg-orange-950/20">
                  <div className="flex items-center gap-3">
                    <Flame className="h-5 w-5 text-orange-500" />
                    <span className="font-medium">{t('dashboard.streak')}</span>
                  </div>
                  <span className="text-xl font-bold">{mockStats.streak}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50 dark:bg-yellow-950/20">
                  <div className="flex items-center gap-3">
                    <Coins className="h-5 w-5 text-yellow-500" />
                    <span className="font-medium">{t('dashboard.currency')}</span>
                  </div>
                  <span className="text-xl font-bold">{mockStats.coins}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-blue-500" />
                    <span className="font-medium">{t('dashboard.lessonsCompleted')}</span>
                  </div>
                  <span className="text-xl font-bold">{mockStats.lessonsCompleted}</span>
                </div>
              </CardContent>
            </Card>

            {/* Paper Trading Card */}
            <Card>
              <CardHeader>
                <CardTitle>{t('portfolio.title')}</CardTitle>
                <CardDescription>
                  Practice investing with virtual money
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <div className="text-3xl font-bold">$10,000.00</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Starting balance
                  </p>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/portfolio">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Start Trading
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Leaderboard Preview */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{t('leaderboard.title')}</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/leaderboard">View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { rank: 1, name: 'Alex', coins: 2450 },
                    { rank: 2, name: 'Jordan', coins: 2100 },
                    { rank: 3, name: 'Sam', coins: 1890 },
                  ].map((entry) => (
                    <div 
                      key={entry.rank}
                      className="flex items-center gap-3"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-bold">
                        {entry.rank}
                      </div>
                      <span className="flex-1 font-medium">{entry.name}</span>
                      <div className="flex items-center gap-1 text-sm">
                        <Coins className="h-3.5 w-3.5 text-yellow-500" />
                        {entry.coins}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
