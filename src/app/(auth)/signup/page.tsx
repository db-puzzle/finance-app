'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AuthForm } from '@/components/auth/auth-form'

export default function SignupPage() {
  const t = useTranslations('auth')

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{t('signup')}</CardTitle>
        <CardDescription>
          Create your free account and start learning
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AuthForm mode="signup" />
        
        <p className="mt-6 text-center text-sm text-muted-foreground">
          {t('hasAccount')}{' '}
          <Link href="/login" className="font-medium text-primary hover:underline">
            {t('login')}
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
