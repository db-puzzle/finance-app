import { useState, useCallback, useMemo } from 'react'
import type { CompoundInterestResult } from '@/types'

type CompoundInterestParams = {
  principal: number
  monthlyContribution: number
  annualRate: number
  years: number
  compoundingFrequency: 'annually' | 'semi-annually' | 'quarterly' | 'monthly' | 'daily'
}

const COMPOUNDING_PERIODS = {
  annually: 1,
  'semi-annually': 2,
  quarterly: 4,
  monthly: 12,
  daily: 365,
}

export function useCompoundInterest(initialParams?: Partial<CompoundInterestParams>) {
  const [params, setParams] = useState<CompoundInterestParams>({
    principal: 1000,
    monthlyContribution: 100,
    annualRate: 7,
    years: 30,
    compoundingFrequency: 'monthly',
    ...initialParams,
  })

  const updateParams = useCallback(
    (updates: Partial<CompoundInterestParams>) => {
      setParams((prev) => ({ ...prev, ...updates }))
    },
    []
  )

  const results = useMemo((): CompoundInterestResult[] => {
    const { principal, monthlyContribution, annualRate, years, compoundingFrequency } = params
    const n = COMPOUNDING_PERIODS[compoundingFrequency]
    const r = annualRate / 100
    const yearlyContribution = monthlyContribution * 12

    const data: CompoundInterestResult[] = []
    let totalContributions = principal

    for (let year = 0; year <= years; year++) {
      if (year === 0) {
        data.push({
          year: 0,
          principal,
          interest: 0,
          total: principal,
        })
        continue
      }

      const previousTotal = data[year - 1].total
      
      let newTotal = previousTotal
      for (let period = 0; period < n; period++) {
        newTotal = newTotal * (1 + r / n) + yearlyContribution / n
      }

      totalContributions += yearlyContribution
      const totalInterest = newTotal - totalContributions

      data.push({
        year,
        principal: totalContributions,
        interest: totalInterest,
        total: newTotal,
      })
    }

    return data
  }, [params])

  const finalAmount = useMemo(() => {
    return results.length > 0 ? results[results.length - 1].total : 0
  }, [results])

  const totalContributions = useMemo(() => {
    return results.length > 0 ? results[results.length - 1].principal : 0
  }, [results])

  const totalInterestEarned = useMemo(() => {
    return results.length > 0 ? results[results.length - 1].interest : 0
  }, [results])

  return {
    params,
    updateParams,
    results,
    finalAmount,
    totalContributions,
    totalInterestEarned,
  }
}
