import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { Loader2 } from 'lucide-react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg'

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size

  /** Leading icon. Replaced by a spinner while `loading`. */
  icon?: ReactNode

  /** Trailing icon such as arrows or chevrons. */
  iconRight?: ReactNode

  /** Disables the button, shows a spinner and sets aria-busy. */
  loading?: boolean
}

/**
 * Shared Build OS button language.
 *
 * Visual direction:
 * Luxury real-estate platform × private wealth dashboard ×
 * modern enterprise SaaS.
 *
 * Buttons should feel substantial and precise rather than decorative.
 */
const base = `
  relative inline-flex select-none items-center justify-center
  whitespace-nowrap
  rounded-xl
  font-medium
  tracking-[-0.006em]
  transition-[background-color,border-color,color,box-shadow,transform]
  duration-200
  ease-out

  focus-visible:outline-none
  focus-visible:ring-2
  focus-visible:ring-[#B85C12]/35
  focus-visible:ring-offset-2
  focus-visible:ring-offset-[#F4F6F3]

  active:translate-y-px

  disabled:cursor-not-allowed
  disabled:pointer-events-none
  disabled:opacity-50
  disabled:shadow-none

  motion-reduce:transition-none
  motion-reduce:active:translate-y-0

  [&_svg]:shrink-0
`

const variantClasses: Record<Variant, string> = {
  /**
   * Primary:
   * Strong dark executive CTA.
   *
   * Used for:
   * - Continue
   * - Save
   * - Create project
   * - Submit
   * - Confirm
   */
  primary: `
    bg-ink
    text-paper

    shadow-[
      inset_0_1px_0_rgba(255,255,255,0.12),
      0_1px_2px_rgba(11,18,32,0.20),
      0_10px_24px_-14px_rgba(11,18,32,0.55)
    ]

    hover:bg-ink-2

    hover:shadow-[
      inset_0_1px_0_rgba(255,255,255,0.16),
      0_1px_2px_rgba(11,18,32,0.22),
      0_14px_30px_-14px_rgba(11,18,32,0.62)
    ]

    active:shadow-[
      inset_0_1px_2px_rgba(0,0,0,0.18),
      0_1px_2px_rgba(11,18,32,0.18)
    ]
  `,

  /**
   * Secondary:
   * Quiet premium outlined action.
   */
  secondary: `
    border
    border-ink/[0.12]
    bg-white
    text-ink

    shadow-[0_1px_2px_rgba(11,18,32,0.035)]

    hover:border-ink/[0.22]
    hover:bg-[#FCFCFB]

    hover:shadow-[
      0_1px_2px_rgba(11,18,32,0.05),
      0_10px_22px_-16px_rgba(11,18,32,0.28)
    ]

    active:bg-ink/[0.025]
  `,

  /**
   * Ghost:
   * Minimal navigation/action treatment.
   */
  ghost: `
    text-ink/65

    hover:bg-ink/[0.045]
    hover:text-ink

    active:bg-ink/[0.065]
  `,

  /**
   * Danger:
   * Reserved for destructive actions.
   */
  danger: `
    bg-brick
    text-white

    shadow-[
      inset_0_1px_0_rgba(255,255,255,0.14),
      0_1px_2px_rgba(11,18,32,0.18),
      0_8px_18px_-14px_rgba(11,18,32,0.35)
    ]

    hover:bg-brick/90

    hover:shadow-[
      inset_0_1px_0_rgba(255,255,255,0.16),
      0_1px_2px_rgba(11,18,32,0.20),
      0_10px_22px_-14px_rgba(11,18,32,0.42)
    ]

    active:bg-brick/95
  `,
}

const sizeClasses: Record<Size, string> = {
  sm: `
    h-8
    gap-1.5
    rounded-[10px]
    px-3
    text-[11px]
    font-semibold
    [&_svg]:h-3.5
    [&_svg]:w-3.5
  `,

  md: `
    h-10
    gap-2
    rounded-xl
    px-4
    text-[13px]
    font-semibold
    [&_svg]:h-4
    [&_svg]:w-4
  `,

  lg: `
    h-12
    gap-2.5
    rounded-[14px]
    px-6
    text-[14px]
    font-semibold
    [&_svg]:h-[18px]
    [&_svg]:w-[18px]
  `,
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = 'primary',
      size = 'md',
      icon,
      iconRight,
      loading = false,
      disabled,
      className = '',
      children,
      ...rest
    },
    ref,
  ) {
    const isDisabled = disabled || loading

    return (
      <button
        ref={ref}
        type={rest.type ?? 'button'}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        className={[
          base,
          variantClasses[variant],
          sizeClasses[size],
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...rest}
      >
        {loading ? (
          <Loader2
            className="animate-spin motion-reduce:animate-none"
            aria-hidden="true"
          />
        ) : (
          icon
        )}

        {children}

        {!loading && iconRight}
      </button>
    )
  },
)