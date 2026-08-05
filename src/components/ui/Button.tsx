import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  icon?: ReactNode
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-ink text-paper hover:bg-ink-2 active:bg-ink-2 disabled:bg-ink/40',
  secondary:
    'bg-transparent text-ink border border-ink/20 hover:border-ink/40 hover:bg-ink/5',
  ghost: 'bg-transparent text-ink hover:bg-ink/5',
  danger: 'bg-brick text-white hover:bg-brick/90',
}

const sizeClasses: Record<Size, string> = {
  sm: 'text-xs px-3 py-1.5 gap-1.5',
  md: 'text-sm px-4 py-2.5 gap-2',
  lg: 'text-base px-5 py-3 gap-2',
}

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md font-medium
        transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60
        ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...rest}
    >
      {icon}
      {children}
    </button>
  )
}
