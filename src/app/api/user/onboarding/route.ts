import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const onboardingSchema = z.object({
  country: z.enum(['US', 'BR', 'UK']),
  ageGroup: z.enum(['STUDENT', 'YOUNG_ADULT', 'ADULT', 'PRE_RETIREMENT', 'RETIREMENT']),
})

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { country, ageGroup } = onboardingSchema.parse(body)

    const locale = country === 'BR' ? 'pt' : 'en'

    await prisma.user.upsert({
      where: { id: user.id },
      update: {
        country,
        ageGroup,
        locale,
        onboardingCompleted: true,
      },
      create: {
        id: user.id,
        email: user.email!,
        name: user.user_metadata?.name || user.email?.split('@')[0],
        country,
        ageGroup,
        locale,
        onboardingCompleted: true,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Onboarding error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
    }
    
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
