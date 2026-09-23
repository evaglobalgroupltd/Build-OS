import { ShieldCheck } from 'lucide-react'

const RADIUS = 19
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function getTier(score: number) {
  if (score >= 80) {
    return {
      name: 'Strong',
      ring: 'text-[#12613E]',
      text: 'text-[#12613E]',
      surface: 'bg-[#12613E]/[0.07]',
    }
  }

  if (score >= 60) {
    return {
      name: 'Moderate',
      ring: 'text-[#B85C12]',
      text: 'text-[#9A4C0F]',
      surface: 'bg-[#B85C12]/[0.07]',
    }
  }

  return {
    name: 'Low',
    ring: 'text-brick',
    text: 'text-brick',
    surface: 'bg-brick/[0.07]',
  }
}

export function TrustScore({
  score,
  size = 'md',
  showLabel = true,
}: {
  score: number
  size?: 'sm' | 'md'
  /** Hide the text beside the ring when space is tight. */
  showLabel?: boolean
}) {
  const value = Number.isFinite(score)
    ? Math.min(100, Math.max(0, score))
    : 0

  const tier = getTier(value)
  const roundedValue = Math.round(value)
  const dash = (value / 100) * CIRCUMFERENCE

  const isSmall = size === 'sm'

  const gauge = isSmall
    ? 'h-9 w-9'
    : 'h-[52px] w-[52px]'

  const numberSize = isSmall
    ? 'text-[10px]'
    : 'text-[13px]'

  return (
    <div className="flex items-center gap-3">
      {/* Trust gauge */}
      <div
        role="img"
        aria-label={`Trust score ${roundedValue} out of 100, ${tier.name.toLowerCase()}`}
        className={`relative shrink-0 ${gauge}`}
      >
        <svg
          viewBox="0 0 44 44"
          className={`h-full w-full -rotate-90 ${tier.ring}`}
          aria-hidden="true"
        >
          {/* Soft track */}
          <circle
            cx="22"
            cy="22"
            r={RADIUS}
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.10"
            strokeWidth="3"
          />

          {/* Active score */}
          <circle
            cx="22"
            cy="22"
            r={RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            className="
              transition-[stroke-dasharray]
              duration-700
              ease-[cubic-bezier(0.22,1,0.36,1)]
              motion-reduce:transition-none
            "
            style={{
              strokeDasharray: `${dash} ${CIRCUMFERENCE}`,
            }}
          />
        </svg>

        {/* Score value */}
        <span
          aria-hidden="true"
          className={`
            absolute inset-0
            flex items-center justify-center
            font-display font-semibold
            leading-none tracking-[-0.02em]
            text-ink
            lining-nums tabular-nums
            ${numberSize}
          `}
        >
          {roundedValue}
        </span>
      </div>

      {showLabel &&
        (isSmall ? (
          <div className="min-w-0">
            <p className="flex items-center gap-1.5 text-[11px] font-medium text-ink/50">
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full ${tier.surface}`}
              >
                <ShieldCheck
                  size={11}
                  strokeWidth={2}
                  className={tier.text}
                  aria-hidden="true"
                />
              </span>

              <span className="truncate">Trust score</span>
            </p>
          </div>
        ) : (
          <div className="min-w-0 leading-tight">
            <p className="text-[11px] font-medium uppercase tracking-[0.09em] text-ink/40">
              Trust score
            </p>

            <p
              className={`
                mt-1.5
                flex items-center gap-1.5
                text-[13px]
                font-semibold
                tracking-[-0.005em]
                ${tier.text}
              `}
            >
              <span
                className={`
                  flex h-5 w-5 items-center justify-center
                  rounded-full
                  ${tier.surface}
                `}
              >
                <ShieldCheck
                  size={12}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </span>

              {tier.name}
            </p>
          </div>
        ))}
    </div>
  )
}