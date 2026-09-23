import type { HTMLAttributes, ReactNode } from 'react'

/**
 * Generic structured-content card.
 *
 * Use `Card` for real application content:
 * - dashboard widgets
 * - portfolio/project panels
 * - list sections
 * - detail views
 * - financial summaries
 * - activity panels
 *
 * `Panel` in Primitives.jsx remains reserved for nested device/screenshot
 * presentation frames used in hero and marketing mockups.
 *
 * Visual direction:
 * Luxury real-estate platform × private wealth dashboard ×
 * modern enterprise SaaS.
 */

/**
 * Shared interaction language for clickable cards.
 *
 * Intentionally restrained:
 * - subtle vertical lift
 * - firmer hairline on hover
 * - soft, deep shadow
 * - refined keyboard focus
 *
 * Use this instead of creating custom card hover treatments.
 */
export const CARD_INTERACTIVE = `
  transition-[transform,box-shadow,border-color] duration-300 ease-out
  hover:-translate-y-0.5
  hover:border-ink/[0.14]
  hover:shadow-[0_1px_2px_rgba(11,18,32,0.03),0_18px_44px_-24px_rgba(11,18,32,0.28)]
  focus-visible:outline-none
  focus-visible:ring-2
  focus-visible:ring-[#B85C12]/35
  focus-visible:ring-offset-2
  focus-visible:ring-offset-[#F4F6F3]
  motion-reduce:transition-none
  motion-reduce:hover:translate-y-0
`

export function Card({
  children,
  className = '',
  corners = false,
  interactive = false,
  ...rest
}: HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  corners?: boolean

  /**
   * Apply the shared premium interaction treatment.
   *
   * Intended for cards that are clickable or otherwise interactive.
   */
  interactive?: boolean
}) {
  return (
    <div
      className={[
        'relative overflow-hidden',
        'rounded-[20px]',
        'border border-ink/[0.075]',
        'bg-white',
        'shadow-[0_1px_2px_rgba(11,18,32,0.025)]',
        'transition-[border-color,box-shadow]',
        'duration-300',
        'ease-out',
        corners ? 'corner-ticks' : '',
        interactive ? CARD_INTERACTIVE : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
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
  as: Heading = 'h3',
}: {
  title: string
  subtitle?: string
  action?: ReactNode

  /**
   * Heading level keeps the document outline semantic.
   */
  as?: 'h2' | 'h3' | 'h4'
}) {
  return (
    <div
      className="
        flex items-start justify-between gap-5
        border-b border-ink/[0.065]
        px-5 py-5
        sm:px-6 sm:py-[21px]
      "
    >
      <div className="min-w-0">
        <Heading
          className="
            font-display
            text-[16px] font-semibold
            leading-[1.25]
            tracking-[-0.018em]
            text-ink
            sm:text-[17px]
          "
        >
          {title}
        </Heading>

        {subtitle && (
          <p
            className="
              mt-1.5
              max-w-2xl
              text-[12px]
              leading-[1.65]
              text-ink/50
              sm:text-[13px]
            "
          >
            {subtitle}
          </p>
        )}
      </div>

      {action && (
        <div className="shrink-0 pt-0.5">
          {action}
        </div>
      )}
    </div>
  )
}

export function CardBody({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={[
        'px-5 py-5',
        'sm:px-6 sm:py-[22px]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  )
}

export function CardFooter({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={[
        'rounded-b-[20px]',
        'border-t border-ink/[0.06]',
        'bg-[#FCFCFB]',
        'px-5 py-4',
        'sm:px-6',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  )
}