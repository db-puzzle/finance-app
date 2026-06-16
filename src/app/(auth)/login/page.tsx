'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AuthForm } from '@/components/auth/auth-form'

export default function LoginPage() {
  const t = useTranslations('auth')

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{t('login')}</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AuthForm mode="login" />
        
        <p className="mt-6 text-center text-sm text-muted-foreground">
          {t('noAccount')}{' '}
          <Link href="/signup" className="font-medium text-primary hover:underline">
            {t('signup')}
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
