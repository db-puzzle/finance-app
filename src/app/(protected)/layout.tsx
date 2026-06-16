'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { isDemoMode } from '@/lib/demo-mode'
import { createClient } from '@/lib/supabase/client'

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function checkAuth() {
      // Check demo mode first
      if (isDemoMode()) {
        setIsAuthorized(true)
        setIsLoading(false)
        return
      }

      // Check Supabase auth
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        
        if (user) {
          setIsAuthorized(true)
        } else {
          router.push('/login')
        }
      } catch {
        // If Supabase fails (no credentials), redirect to login
        router.push('/login')
      }
      
      setIsLoading(false)
    }

    checkAuth()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthorized) {
    return null
  }

  return <>{children}</>
}
