import type { ReactNode } from 'react'

type Tone = 'neutral' | 'amber' | 'teal' | 'brick'

const toneClasses: Record<Tone, string> = {
  neutral: 'bg-ink/5 text-ink border-ink/10',
  amber: 'bg-amber/15 text-amber-dark border-amber/30',
  teal: 'bg-teal-light text-teal border-teal/25',
  brick: 'bg-brick-light text-brick border-brick/25',
}

export function Badge({
  tone = 'neutral',
  icon,
  children,
}: {
  tone?: Tone
  icon?: ReactNode
  children: ReactNode
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium ${toneClasses[tone]}`}
    >
      {icon}
      {children}
    </span>
  )
}
