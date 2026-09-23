import type { HTMLAttributes, ReactNode } from 'react'

/**
 * Semantic status badge.
 *
 * Use Badge for meaningful system states:
 * - verified
 * - pending
 * - in progress
 * - needs attention
 * - informational states
 *
 * Use `Pill` for neutral metadata, tags, categories, or labels.
 *
 * Visual direction:
 * restrained luxury × editorial real-estate UI × enterprise clarity.
 */

type Tone = 'neutral' | 'amber' | 'teal' | 'brick'

/**
 * Semantic status language.
 *
 * neutral → informational / default
 * amber   → pending / in progress / awaiting action
 * teal    → verified / completed / healthy
 * brick   → attention / blocked / disputed
 *
 * Each tone intentionally uses:
 * - a soft tinted surface
 * - deep readable text
 * - a subtle hairline
 * - a small semantic indicator
 */
const tones: Record<
  Tone,
  {
    chip: string
    dot: string
  }
> = {
  neutral: {
    chip:
      'bg-ink/[0.035] text-ink/65 border-ink/[0.09]',
    dot: 'bg-ink/35',
  },

  amber: {
    chip:
      'bg-[#F8EEE6] text-[#8F4710] border-[#B85C12]/20',
    dot: 'bg-[#B85C12]',
  },

  teal: {
    chip:
      'bg-[#12613E]/[0.075] text-[#12613E] border-[#12613E]/20',
    dot: 'bg-[#12613E]',
  },

  brick: {
    chip:
      'bg-brick-light text-brick border-brick/20',
    dot: 'bg-brick',
  },
}

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone

  /**
   * Optional leading icon.
   * When supplied, it takes precedence over the status dot.
   */
  icon?: ReactNode

  /**
   * Display the semantic tone dot when no icon is supplied.
   */
  dot?: boolean
}

export function Badge({
  tone = 'neutral',
  icon,
  dot = false,
  className = '',
  children,
  ...rest
}: BadgeProps) {
  const { chip, dot: dotColor } = tones[tone]

  return (
    <span
      className={[
        'inline-flex',
        'min-h-[25px]',
        'items-center',
        'gap-1.5',
        'whitespace-nowrap',
        'rounded-full',
        'border',
        'px-2.5',
        'py-1',
        'text-[10px]',
        'font-semibold',
        'leading-none',
        'tracking-[0.01em]',
        'shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]',
        'transition-colors',
        'duration-200',
        chip,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {icon ? (
        <span
          aria-hidden="true"
          className="
            flex
            shrink-0
            items-center
            justify-center
            [&>svg]:h-3
            [&>svg]:w-3
            [&>svg]:stroke-[2]
          "
        >
          {icon}
        </span>
      ) : dot ? (
        <span
          aria-hidden="true"
          className={[
            'h-1.5',
            'w-1.5',
            'shrink-0',
            'rounded-full',
            dotColor,
          ].join(' ')}
        />
      ) : null}

      <span className="truncate">
        {children}
      </span>
    </span>
  )
}