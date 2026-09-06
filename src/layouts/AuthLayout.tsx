import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface AuthLayoutProps {
  title: string
  subtitle: string
  children: ReactNode
  footer?: ReactNode
}

export function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-paper-2 px-4 py-8 sm:px-6 sm:py-10">
      {/* Subtle background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-amber/5 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-ink/5 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Brand */}
        <div className="mb-8 flex justify-center sm:mb-10">
          <Link
            to="/"
            className="group inline-flex items-center gap-3 rounded-xl px-3 py-2 transition-opacity hover:opacity-80"
            aria-label="Build OS home"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink shadow-sm">
              <img
                src="/images/BuildOs.png"
                alt=""
                className="h-6 w-6 object-contain"
              />
            </div>

            <span className="font-display text-lg font-bold tracking-tight text-ink">
              Build OS
            </span>
          </Link>
        </div>

        {/* Authentication card */}
        <div className="rounded-2xl border border-line/80 bg-white p-6 shadow-sm sm:p-8">
          <div>
            <h1 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-[26px]">
              {title}
            </h1>

            <p className="mt-2 text-sm leading-6 text-ink/55">
              {subtitle}
            </p>
          </div>

          <div className="mt-7">
            {children}
          </div>
        </div>

        {/* Footer */}
        {footer && (
          <div className="mt-6 px-4 text-center text-sm leading-6 text-ink/50">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}