import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

/**
 * Premium empty state for dashboard panels, lists and workspace sections.
 *
 * Design direction:
 * Quiet luxury × modern enterprise × real-estate investment platform.
 *
 * The component intentionally avoids illustrations or oversized decoration.
 * The goal is to make an empty workspace feel intentional, calm and actionable.
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon
  title: string
  description: string
  action?: ReactNode
}) {
  return (
    <div
      role="status"
      className="
        flex min-h-[220px] flex-col items-center justify-center
        px-6 py-14
        text-center
        sm:min-h-[250px] sm:py-16
      "
    >
      {/* Refined icon medallion */}
      <div
        aria-hidden="true"
        className="
          relative flex h-14 w-14 items-center justify-center
          rounded-full
          border border-[#12613E]/[0.10]
          bg-[#F4F6F3]
          text-[#12613E]/70
          shadow-[0_1px_2px_rgba(11,18,32,0.035),0_12px_28px_-16px_rgba(11,18,32,0.22)]
          after:absolute
          after:-inset-2
          after:rounded-full
          after:border
          after:border-[#12613E]/[0.055]
        "
      >
        <Icon
          size={21}
          strokeWidth={1.6}
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="mt-7 max-w-md">
        <p
          className="
            font-display
            text-[17px]
            font-semibold
            leading-tight
            tracking-[-0.018em]
            text-ink
            sm:text-[18px]
          "
        >
          {title}
        </p>

        <p
          className="
            mx-auto
            mt-2
            max-w-sm
            text-[13px]
            leading-[1.7]
            text-ink/50
            sm:text-[13.5px]
          "
        >
          {description}
        </p>
      </div>

      {/* Optional primary action */}
      {action && (
        <div className="mt-6 flex items-center justify-center">
          {action}
        </div>
      )}
    </div>
  )
}