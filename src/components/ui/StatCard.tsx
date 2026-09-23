import type { LucideIcon } from 'lucide-react'
import { Card } from './Card'

const toneClasses = {
  ink: {
    surface: 'bg-ink/[0.035]',
    text: 'text-ink/65',
    ring: 'ring-ink/[0.07]',
    accent: 'bg-ink/25',
  },
  amber: {
    surface: 'bg-[#F8EEE6]',
    text: 'text-[#B85C12]',
    ring: 'ring-[#B85C12]/15',
    accent: 'bg-[#B85C12]',
  },
  teal: {
    surface: 'bg-[#EAF3EE]',
    text: 'text-[#12613E]',
    ring: 'ring-[#12613E]/15',
    accent: 'bg-[#12613E]',
  },
  brick: {
    surface: 'bg-brick-light',
    text: 'text-brick',
    ring: 'ring-brick/15',
    accent: 'bg-brick',
  },
} as const

export function StatCard({
  label,
  value,
  icon: Icon,
  hint,
  tone = 'ink',
  className = '',
}: {
  label: string
  value: string
  icon: LucideIcon
  hint?: string
  tone?: keyof typeof toneClasses
  className?: string
}) {
  const styles = toneClasses[tone]

  return (
    <Card
      className={`
        group relative
        overflow-hidden
        p-5 sm:p-6
        ${className}
      `}
    >
      {/* Quiet semantic accent */}
      <span
        aria-hidden="true"
        className={`
          absolute left-0 top-0
          h-[2px] w-12
          rounded-r-full
          opacity-70
          transition-all duration-300
          group-hover:w-20
          ${styles.accent}
          motion-reduce:transition-none
        `}
      />

      <div className="flex items-start justify-between gap-5">
        <dl className="min-w-0 flex-1">
          <dt className="flex items-center gap-2">
            <span
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.13em]
                text-ink/42
              "
            >
              {label}
            </span>
          </dt>

          <dd
            title={value}
            className="
              mt-3
              truncate
              font-display
              text-[30px]
              font-semibold
              leading-[0.95]
              tracking-[-0.035em]
              text-ink
              lining-nums
              tabular-nums
              sm:text-[34px]
              lg:text-[36px]
            "
          >
            {value}
          </dd>

          {hint && (
            <dd
              className="
                mt-2.5
                truncate
                text-[11.5px]
                leading-relaxed
                text-ink/45
                sm:text-[12px]
              "
            >
              {hint}
            </dd>
          )}
        </dl>

        {/* Semantic icon */}
        <div
          aria-hidden="true"
          className={`
            flex
            h-10 w-10
            shrink-0
            items-center justify-center
            rounded-[13px]
            ring-1 ring-inset
            transition-transform duration-300
            group-hover:scale-[1.03]
            ${styles.surface}
            ${styles.text}
            ${styles.ring}
            motion-reduce:transition-none
            motion-reduce:group-hover:scale-100
          `}
        >
          <Icon
            size={17}
            strokeWidth={1.7}
          />
        </div>
      </div>
    </Card>
  )
}