const DEMO_USER_KEY = 'demo-user'
const DEMO_COOKIE_NAME = 'demo-mode'

export type DemoUser = {
  id: string
  email: string
  name: string
  country: 'US' | 'BR' | 'UK'
  ageGroup: 'STUDENT' | 'YOUNG_ADULT' | 'ADULT' | 'PRE_RETIREMENT' | 'RETIREMENT'
  onboardingCompleted: boolean
  virtualCurrency: number
  currentStreak: number
  longestStreak: number
}

const DEFAULT_DEMO_USER: DemoUser = {
  id: 'demo-user-123',
  email: 'demo@example.com',
  name: 'Demo User',
  country: 'US',
  ageGroup: 'YOUNG_ADULT',
  onboardingCompleted: false,
  virtualCurrency: 500,
  currentStreak: 3,
  longestStreak: 7,
}

function setCookie(name: string, value: string, days: number = 7) {
  if (typeof document === 'undefined') return
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    return decodeURIComponent(parts.pop()?.split(';').shift() || '')
  }
  return null
}

function deleteCookie(name: string) {
  if (typeof document === 'undefined') return
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
}

export function isDemoMode(): boolean {
  if (typeof window === 'undefined') return false
  return getCookie(DEMO_COOKIE_NAME) === 'true'
}

export function getDemoUser(): DemoUser | null {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem(DEMO_USER_KEY)
  if (!stored) return null
  try {
    return JSON.parse(stored) as DemoUser
  } catch {
    return null
  }
}

export function startDemoMode(): DemoUser {
  const user = { ...DEFAULT_DEMO_USER }
  localStorage.setItem(DEMO_USER_KEY, JSON.stringify(user))
  setCookie(DEMO_COOKIE_NAME, 'true', 7)
  return user
}

export function updateDemoUser(updates: Partial<DemoUser>): DemoUser | null {
  const current = getDemoUser()
  if (!current) {
    // If no user exists, create one with the updates
    const user = { ...DEFAULT_DEMO_USER, ...updates }
    localStorage.setItem(DEMO_USER_KEY, JSON.stringify(user))
    return user
  }
  
  const updated = { ...current, ...updates }
  localStorage.setItem(DEMO_USER_KEY, JSON.stringify(updated))
  return updated
}

export function endDemoMode(): void {
  localStorage.removeItem(DEMO_USER_KEY)
  deleteCookie(DEMO_COOKIE_NAME)
}
