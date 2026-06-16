import Link from 'next/link'
import { Wallet } from 'lucide-react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Wallet className="h-5 w-5" />
          </div>
          <span className="font-bold text-xl">Finance App</span>
        </Link>
      </header>
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>
      
      <footer className="p-4 text-center text-sm text-muted-foreground">
        Built with care. Free forever.
      </footer>
    </div>
  )
}
