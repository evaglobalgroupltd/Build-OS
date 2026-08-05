import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string
  subtitle: string
  children: ReactNode
  footer?: ReactNode
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper-2 px-6 py-10">
      <div className="w-full max-w-sm">
        <Link to="/" className="mb-8 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-ink font-display text-sm font-bold text-amber">
            B
          </div>
          <span className="font-display text-base font-bold text-ink">Build OS</span>
        </Link>

        <div className="rounded-lg border border-line bg-white p-7">
          <h1 className="font-display text-xl font-semibold text-ink">{title}</h1>
          <p className="mt-1 text-sm text-ink/50">{subtitle}</p>
          <div className="mt-6">{children}</div>
        </div>

        {footer && <div className="mt-5 text-center text-sm text-ink/50">{footer}</div>}
      </div>
    </div>
  )
}
