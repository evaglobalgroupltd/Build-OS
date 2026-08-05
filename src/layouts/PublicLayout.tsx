import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-ink font-display text-sm font-bold text-amber">
              B
            </div>
            <span className="font-display text-base font-bold text-ink">Build OS</span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium text-ink/60 md:flex">
            <a href="#how-it-works" className="hover:text-ink">How it works</a>
            <a href="#roles" className="hover:text-ink">Who it's for</a>
            <a href="#trust" className="hover:text-ink">Trust & escrow</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium text-ink/70 hover:text-ink">
              Log in
            </Link>
            <Link
              to="/register"
              className="rounded-md bg-ink px-4 py-2 text-sm font-medium text-paper hover:bg-ink-2"
            >
              Start a project
            </Link>
          </div>
        </div>
      </header>

      {children}

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-xs text-ink/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Build OS. All funds escrow-protected.</p>
          <div className="flex gap-5">
            <a href="#how-it-works" className="hover:text-ink/70">How it works</a>
            <a href="#roles" className="hover:text-ink/70">Who it's for</a>
            <a href="#trust" className="hover:text-ink/70">Trust & escrow</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
