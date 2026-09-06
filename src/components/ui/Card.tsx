import type { HTMLAttributes, ReactNode } from 'react'

/**
 * Generic structured-content card (dashboard widgets, list panels, detail
 * views) — distinct from `Panel` in Primitives.jsx, which is specifically
 * the nested "device chrome" frame used for hero/marketing mockups. Use
 * `Card` for real app content; use `Panel` for a screenshot-style preview.
 */

// The one hover language used everywhere else in the app (Pillars, Roles,
// Steps) — see design-system.md §5. Pull this in via `interactive`, don't
// hand-roll a second hover treatment at the call site.
const INTERACTIVE_CLASSES =
  'transition-all duration-300 hover:-translate-y-1 hover:border-teal/20 hover:shadow-[0_24px_50px_-30px_rgba(22,87,255,0.4)]'

export function Card({
  children,
  className = '',
  corners = false,
  interactive = false,
  ...rest
}: HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  corners?: boolean
  /** Apply the standard card hover-lift for clickable cards. */
  interactive?: boolean
}) {
  return (
    <div
      className={`rounded-2xl border border-line bg-white ${corners ? 'corner-ticks' : ''} ${
        interactive ? INTERACTIVE_CLASSES : ''
      } ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}

export function CardHeader({
  title,
  subtitle,
  action,
}: {
  title: string
  subtitle?: string
  action?: ReactNode
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4">
      <div>
        <h3 className="font-display text-sm font-semibold tracking-wide text-ink">{title}</h3>
        {subtitle && <p className="mt-0.5 text-xs text-ink/50">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

export function CardBody({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`px-5 py-4 ${className}`}>{children}</div>
}