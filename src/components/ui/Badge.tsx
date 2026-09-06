import type { ReactNode } from 'react'

/**
 * Status badge. See /design-system.md "Pill vs Badge" for when to reach
 * for this vs. the plain `Pill` in Primitives.jsx:
 *  - `Pill`  — a neutral chip/tag (stakeholder tags, LIVE/APPROVED labels).
 *  - `Badge` — a semantic status with an optional leading icon (verified,
 *              pending, needs-attention). If you don't need one of these
 *              four meanings, you probably want Pill instead.
 */

type Tone = 'neutral' | 'amber' | 'teal' | 'brick'

// amber = pending / in progress, teal = verified, brick = needs attention,
// neutral = informational / default. Every tone follows the same
// light-bg / mid-tone-text / soft-border shape so new tones stay consistent.
const toneClasses: Record<Tone, string> = {
  neutral: 'bg-ink/5 text-ink border-ink/10',
  amber: 'bg-amber-light text-amber-dark border-amber/30',
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
      {icon && (
        <span aria-hidden="true" className="flex shrink-0 [&>svg]:h-3 [&>svg]:w-3">
          {icon}
        </span>
      )}
      {children}
    </span>
  )
}