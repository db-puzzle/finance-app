'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts'
import { 
  Calculator, 
  TrendingUp, 
  Coins, 
  Clock,
  Sparkles,
  DollarSign,
  Percent,
  RefreshCw
} from 'lucide-react'

type CompoundCalculatorProps = {
  locale: 'en' | 'pt'
}

interface DataPoint {
  year: number
  principal: number
  interest: number
  total: number
}

export function CompoundCalculator({ locale }: CompoundCalculatorProps) {
  const [initialAmount, setInitialAmount] = useState(1000)
  const [monthlyContribution, setMonthlyContribution] = useState(100)
  const [years, setYears] = useState(20)
  const [interestRate, setInterestRate] = useState(7)
  const [showResults, setShowResults] = useState(false)

  const results = useMemo(() => {
    const monthlyRate = interestRate / 100 / 12
    const data: DataPoint[] = []
    let totalPrincipal = initialAmount
    let balance = initialAmount

    for (let year = 0; year <= years; year++) {
      if (year === 0) {
        data.push({
          year,
          principal: initialAmount,
          interest: 0,
          total: initialAmount
        })
      } else {
        for (let month = 0; month < 12; month++) {
          balance = balance * (1 + monthlyRate) + monthlyContribution
          totalPrincipal += monthlyContribution
        }
        data.push({
          year,
          principal: Math.round(totalPrincipal),
          interest: Math.round(balance - totalPrincipal),
          total: Math.round(balance)
        })
      }
    }

    return data
  }, [initialAmount, monthlyContribution, years, interestRate])

  const finalData = results[results.length - 1]
  const totalContributed = finalData.principal
  const totalInterest = finalData.interest
  const finalTotal = finalData.total
  const growthMultiplier = (finalTotal / totalContributed).toFixed(1)

  const formatCurrency = (value: number) => {
    if (locale === 'pt') {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        maximumFractionDigits: 0
      }).format(value)
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value)
  }

  const handleReset = () => {
    setInitialAmount(1000)
    setMonthlyContribution(100)
    setYears(20)
    setInterestRate(7)
    setShowResults(false)
  }

  return (
    <Card className="border-2 border-primary/20 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 border-b">
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          {locale === 'en' ? 'Compound Interest Calculator' : 'Calculadora de Juros Compostos'}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        {!showResults ? (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Initial amount */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2 text-base font-medium">
                  <DollarSign className="h-4 w-4 text-primary" />
                  {locale === 'en' ? 'Starting Amount' : 'Valor Inicial'}
                </Label>
                <span className="text-lg font-bold text-primary">
                  {formatCurrency(initialAmount)}
                </span>
              </div>
              <Slider
                value={[initialAmount]}
                onValueChange={(values: number[]) => setInitialAmount(values[0])}
                min={0}
                max={50000}
                step={500}
                className="py-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{formatCurrency(0)}</span>
                <span>{formatCurrency(50000)}</span>
              </div>
            </div>

            {/* Monthly contribution */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2 text-base font-medium">
                  <Coins className="h-4 w-4 text-primary" />
                  {locale === 'en' ? 'Monthly Contribution' : 'Contribuição Mensal'}
                </Label>
                <span className="text-lg font-bold text-primary">
                  {formatCurrency(monthlyContribution)}
                </span>
              </div>
              <Slider
                value={[monthlyContribution]}
                onValueChange={(values: number[]) => setMonthlyContribution(values[0])}
                min={0}
                max={2000}
                step={25}
                className="py-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{formatCurrency(0)}</span>
                <span>{formatCurrency(2000)}</span>
              </div>
            </div>

            {/* Years */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2 text-base font-medium">
                  <Clock className="h-4 w-4 text-primary" />
                  {locale === 'en' ? 'Time Period' : 'Período'}
                </Label>
                <span className="text-lg font-bold text-primary">
                  {years} {locale === 'en' ? 'years' : 'anos'}
                </span>
              </div>
              <Slider
                value={[years]}
                onValueChange={(values: number[]) => setYears(values[0])}
                min={1}
                max={40}
                step={1}
                className="py-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1 {locale === 'en' ? 'year' : 'ano'}</span>
                <span>40 {locale === 'en' ? 'years' : 'anos'}</span>
              </div>
            </div>

            {/* Interest rate */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2 text-base font-medium">
                  <Percent className="h-4 w-4 text-primary" />
                  {locale === 'en' ? 'Annual Return' : 'Retorno Anual'}
                </Label>
                <span className="text-lg font-bold text-primary">
                  {interestRate}%
                </span>
              </div>
              <Slider
                value={[interestRate]}
                onValueChange={(values: number[]) => setInterestRate(values[0])}
                min={1}
                max={15}
                step={0.5}
                className="py-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1%</span>
                <span>15%</span>
              </div>
            </div>

            <Button 
              size="lg" 
              className="w-full"
              onClick={() => setShowResults(true)}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              {locale === 'en' ? 'Calculate My Growth' : 'Calcular Meu Crescimento'}
            </Button>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Summary cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/50 rounded-xl p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">
                  {locale === 'en' ? 'You Invest' : 'Você Investe'}
                </p>
                <p className="text-xl font-bold text-foreground">
                  {formatCurrency(totalContributed)}
                </p>
              </div>
              <div className="bg-green-500/10 rounded-xl p-4 text-center">
                <p className="text-xs text-green-600 dark:text-green-400 mb-1">
                  {locale === 'en' ? 'Interest Earned' : 'Juros Ganhos'}
                </p>
                <p className="text-xl font-bold text-green-600 dark:text-green-400">
                  +{formatCurrency(totalInterest)}
                </p>
              </div>
            </div>

            {/* Final total */}
            <div className="bg-gradient-to-r from-primary to-primary/80 rounded-xl p-6 text-center text-white">
              <p className="text-sm opacity-80 mb-1">
                {locale === 'en' ? 'Total After' : 'Total Após'} {years} {locale === 'en' ? 'Years' : 'Anos'}
              </p>
              <p className="text-4xl font-bold mb-2">
                {formatCurrency(finalTotal)}
              </p>
              <p className="text-sm opacity-80">
                {locale === 'en' 
                  ? `That's ${growthMultiplier}x your money!` 
                  : `Isso é ${growthMultiplier}x seu dinheiro!`}
              </p>
            </div>

            {/* Chart */}
            <div>
              <p className="text-sm font-medium mb-4 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                {locale === 'en' ? 'Growth Over Time' : 'Crescimento ao Longo do Tempo'}
              </p>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart 
                    data={results}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="principalGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="year" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                      tickFormatter={(value) => `${value}y`}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                      tickFormatter={(value: number) => {
                        if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
                        if (value >= 1000) return `${Math.round(value / 1000)}k`
                        return String(value)
                      }}
                      width={50}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                      formatter={(value, name) => [
                        formatCurrency(Number(value)),
                        name === 'total' 
                          ? (locale === 'en' ? 'Total' : 'Total')
                          : (locale === 'en' ? 'Principal' : 'Principal')
                      ]}
                      labelFormatter={(year) => `${locale === 'en' ? 'Year' : 'Ano'} ${year}`}
                    />
                    <ReferenceLine 
                      y={totalContributed} 
                      stroke="hsl(var(--muted-foreground))" 
                      strokeDasharray="3 3"
                      strokeOpacity={0.5}
                    />
                    <Area
                      type="monotone"
                      dataKey="principal"
                      stroke="hsl(var(--muted-foreground))"
                      strokeWidth={2}
                      fill="url(#principalGradient)"
                    />
                    <Area
                      type="monotone"
                      dataKey="total"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      fill="url(#totalGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center gap-6 mt-3 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span>{locale === 'en' ? 'Total Balance' : 'Saldo Total'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-muted-foreground/50" />
                  <span>{locale === 'en' ? 'Your Contributions' : 'Suas Contribuições'}</span>
                </div>
              </div>
            </div>

            {/* Key insight */}
            <div className="bg-amber-50 dark:bg-amber-950/30 rounded-xl p-4 border border-amber-200 dark:border-amber-900">
              <p className="text-sm text-amber-800 dark:text-amber-200">
                💡 <strong>{locale === 'en' ? 'Key Insight:' : 'Insight:'}</strong>{' '}
                {locale === 'en' 
                  ? `The green area is FREE MONEY from compound interest. After ${years} years, you earn ${formatCurrency(totalInterest)} without lifting a finger!`
                  : `A área verde é DINHEIRO GRÁTIS dos juros compostos. Após ${years} anos, você ganha ${formatCurrency(totalInterest)} sem fazer nada!`}
              </p>
            </div>

            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleReset}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              {locale === 'en' ? 'Try Different Numbers' : 'Testar Outros Valores'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
