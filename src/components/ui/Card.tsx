import type { HTMLAttributes, ReactNode } from 'react'

export function Card({
  children,
  className = '',
  corners = false,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode; corners?: boolean }) {
  return (
    <div
      className={`rounded-lg border border-line bg-white ${corners ? 'corner-ticks' : ''} ${className}`}
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
