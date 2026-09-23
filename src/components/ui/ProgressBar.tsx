const barColors = {
  amber: 'bg-[#B85C12]',
  teal: 'bg-[#12613E]',
} as const

const heights = {
  sm: 'h-1',
  md: 'h-1.5',
} as const

export function ProgressBar({
  percent,
  tone = 'amber',
  size = 'md',
  label = 'Progress',
}: {
  percent: number
  tone?: keyof typeof barColors
  size?: keyof typeof heights

  /** Accessible name, e.g. "Milestone 2 of 5". */
  label?: string
}) {
  const value = Number.isFinite(percent)
    ? Math.min(100, Math.max(0, percent))
    : 0

  const roundedValue = Math.round(value)

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={roundedValue}
      className={[
        'relative w-full overflow-hidden rounded-full',
        'bg-ink/[0.065]',
        'ring-1 ring-inset ring-ink/[0.025]',
        heights[size],
      ].join(' ')}
    >
      <div
        className={[
          'relative h-full overflow-hidden rounded-full',
          barColors[tone],
          'shadow-[inset_0_1px_0_rgba(255,255,255,0.24)]',
          'transition-[width] duration-700',
          'ease-[cubic-bezier(0.22,1,0.36,1)]',
          'motion-reduce:transition-none',
        ].join(' ')}
        style={{ width: `${value}%` }}
      >
        {/* Very subtle highlight for a more polished finish */}
        {value > 0 && (
          <span
            aria-hidden="true"
            className="
              absolute inset-x-0 top-0
              h-px
              bg-white/25
            "
          />
        )}
      </div>
    </div>
  )
}