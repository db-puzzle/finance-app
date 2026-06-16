'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardContent } from './dashboard-content'
import { isDemoMode, getDemoUser, type DemoUser } from '@/lib/demo-mode'
import { createClient } from '@/lib/supabase/client'
import type { User as SupabaseUser } from '@supabase/supabase-js'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<SupabaseUser | DemoUser | null>(null)
  const [isDemo, setIsDemo] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadUser() {
      // Check demo mode first
      if (isDemoMode()) {
        const demoUser = getDemoUser()
        if (demoUser) {
          if (!demoUser.onboardingCompleted) {
            router.push('/onboarding')
            return
          }
          setUser(demoUser)
          setIsDemo(true)
          setIsLoading(false)
          return
        }
      }

      // Check Supabase auth
      try {
        const supabase = createClient()
        const { data: { user: supabaseUser } } = await supabase.auth.getUser()
        
        if (supabaseUser) {
          setUser(supabaseUser)
        } else {
          router.push('/login')
        }
      } catch {
        router.push('/login')
      }
      
      setIsLoading(false)
    }

    loadUser()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <DashboardContent user={user} isDemo={isDemo} />
}
