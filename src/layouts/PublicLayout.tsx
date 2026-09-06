import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface PublicLayoutProps {
  children: ReactNode
}

export function PublicLayout({ children }: PublicLayoutProps) {
  const currentYear = new Date().getFullYear()

  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-line/80 bg-paper/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand */}
          <Link
            to="/"
            className="group flex shrink-0 items-center gap-3"
            aria-label="Build OS home"
          >
            <img
              src="/images/BuildOs.png"
              alt="Build OS"
              className="h-9 w-9 rounded-lg object-contain transition-transform duration-200 group-hover:scale-105"
            />

            <span className="font-display text-base font-bold tracking-tight text-ink sm:text-lg">
              Build OS
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-7 text-sm font-medium text-ink/60 lg:flex"
          >
            <Link
              to="/how-it-works"
              className="transition-colors hover:text-ink"
            >
              How it works
            </Link>

            <Link
              to="/who-its-for"
              className="transition-colors hover:text-ink"
            >
              Who it's for
            </Link>

            <Link
              to="/trust-security"
              className="transition-colors hover:text-ink"
            >
              Trust & escrow
            </Link>
          </nav>

          {/* Authentication / CTA */}
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="hidden rounded-lg px-3 py-2 text-sm font-medium text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink sm:inline-flex"
            >
              Log in
            </Link>

            <Link
              to="/get-started"
              className="inline-flex items-center justify-center rounded-lg bg-ink px-4 py-2.5 text-sm font-semibold text-paper shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-ink-2 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-ink/20 focus:ring-offset-2"
            >
              <span className="hidden sm:inline">Start a project</span>
              <span className="sm:hidden">Get started</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-line/80 bg-paper">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
            {/* Footer brand */}
            <div className="flex items-center gap-3">
              <img
                src="/images/BuildOs.png"
                alt="Build OS"
                className="h-7 w-7 rounded-lg object-contain opacity-85"
              />

              <p className="text-xs leading-5 text-ink/45 sm:text-sm">
                © {currentYear} Build OS. All funds escrow-protected.
              </p>
            </div>

            {/* Footer navigation */}
            <nav
              aria-label="Footer navigation"
              className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-ink/45 sm:justify-end sm:text-sm"
            >
              <Link
                to="/how-it-works"
                className="transition-colors hover:text-ink/75"
              >
                How it works
              </Link>

              <Link
                to="/who-its-for"
                className="transition-colors hover:text-ink/75"
              >
                Who it's for
              </Link>

              <Link
                to="/trust-security"
                className="transition-colors hover:text-ink/75"
              >
                Trust & escrow
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}