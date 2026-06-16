'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  TrendingUp, 
  BookOpen, 
  Trophy, 
  Target, 
  Wallet,
  BarChart3,
  Flame,
  Users,
  ChevronRight,
  Sparkles
} from 'lucide-react'

export default function LandingPage() {
  const t = useTranslations()

  const features = [
    {
      icon: BookOpen,
      title: 'Interactive Lessons',
      description: 'Learn through engaging content with real-world examples tailored to your country and life stage.',
    },
    {
      icon: BarChart3,
      title: 'Paper Trading',
      description: 'Practice investing with virtual money. Build portfolios, execute trades, and see real market data.',
    },
    {
      icon: Target,
      title: 'Personalized Paths',
      description: 'Choose your focus: master investing fundamentals or develop an entrepreneur mindset.',
    },
    {
      icon: Flame,
      title: 'Daily Streaks',
      description: 'Build habits that last. Maintain your streak and watch your knowledge compound like interest.',
    },
    {
      icon: Trophy,
      title: 'Leaderboards',
      description: 'Compete with learners worldwide. Climb the ranks as you grow your virtual portfolio.',
    },
    {
      icon: Sparkles,
      title: 'Gamified Learning',
      description: 'Earn coins, unlock achievements, and level up as you progress through your financial education.',
    },
  ]

  const learningTopics = [
    'Budgeting Basics',
    'Emergency Funds',
    'Compound Interest',
    'Stock Markets',
    'ETFs & Index Funds',
    'Retirement Planning',
    'Risk Management',
    'Portfolio Building',
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Wallet className="h-5 w-5" />
            </div>
            <span className="font-bold text-xl">Finance App</span>
          </Link>
          
          <nav className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/login">{t('auth.login')}</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">{t('auth.signup')}</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                {t('app.tagline')}
              </h1>
              <p className="mt-6 text-lg text-muted-foreground md:text-xl">
                {t('app.description')}
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" asChild className="w-full sm:w-auto">
                  <Link href="/signup">
                    Start Learning Free
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
                  <Link href="#features">{t('common.learnMore')}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Topics Marquee */}
        <section className="border-y bg-muted/50 py-4 overflow-hidden">
          <div className="flex animate-marquee gap-8 whitespace-nowrap">
            {[...learningTopics, ...learningTopics].map((topic, i) => (
              <span 
                key={i} 
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground"
              >
                <TrendingUp className="h-4 w-4 text-primary" />
                {topic}
              </span>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 md:py-28">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Everything you need to master finance
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                From basics to advanced strategies, learn at your own pace with tools designed for success.
              </p>
            </div>
            
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <Card key={feature.title} className="relative overflow-hidden">
                  <CardContent className="pt-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 font-semibold text-lg">{feature.title}</h3>
                    <p className="mt-2 text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Learning Paths Section */}
        <section className="py-20 md:py-28 bg-muted/30">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Choose your path
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Start with the foundations, then specialize in what matters to you.
              </p>
            </div>
            
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              <Card className="relative">
                <CardContent className="pt-6">
                  <div className="absolute -top-3 left-6">
                    <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                      Required
                    </span>
                  </div>
                  <h3 className="mt-2 font-semibold text-xl">Foundation</h3>
                  <p className="mt-2 text-muted-foreground">
                    Build a solid base with budgeting, saving, and understanding compound interest.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Why Financial Literacy Matters
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Building Your First Budget
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Emergency Funds
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      The Power of Compound Interest
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-xl">Investing Path</h3>
                  <p className="mt-2 text-muted-foreground">
                    Master the stock market, build portfolios, and plan for retirement.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-chart-2" />
                      Stocks, Bonds & ETFs
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-chart-2" />
                      Risk & Diversification
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-chart-2" />
                      Portfolio Building
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-chart-2" />
                      Retirement Accounts
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-xl">Entrepreneur Path</h3>
                  <p className="mt-2 text-muted-foreground">
                    Learn to build businesses, manage cash flow, and scale your ventures.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-chart-3" />
                      The Entrepreneur Mindset
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-chart-3" />
                      Business Models & Revenue
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-chart-3" />
                      Managing Cash Flow
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-chart-3" />
                      Funding & Scaling
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">20+</div>
                <div className="mt-2 text-muted-foreground">Lessons</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">3</div>
                <div className="mt-2 text-muted-foreground">Countries Supported</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">100%</div>
                <div className="mt-2 text-muted-foreground">Free to Learn</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-4xl font-bold text-primary">
                  <Users className="h-8 w-8" />
                </div>
                <div className="mt-2 text-muted-foreground">Growing Community</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-28 bg-primary text-primary-foreground">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Start your journey today
              </h2>
              <p className="mt-4 text-lg opacity-90">
                Join thousands of learners building their financial future. It&apos;s free, forever.
              </p>
              <Button 
                size="lg" 
                variant="secondary" 
                asChild 
                className="mt-8"
              >
                <Link href="/signup">
                  Create Free Account
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-primary" />
            <span className="font-semibold">Finance App</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Built with care. Free forever.
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  )
}
