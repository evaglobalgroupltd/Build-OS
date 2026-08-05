import type { InputHTMLAttributes, ReactNode } from 'react'

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  labelAction?: ReactNode
}

export function FormField({ label, error, labelAction, id, className = '', ...rest }: FormFieldProps) {
  const fieldId = id ?? label.toLowerCase().replace(/\s+/g, '-')
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label htmlFor={fieldId} className="block text-xs font-medium text-ink/60">
          {label}
        </label>
        {labelAction}
      </div>
      <input
        id={fieldId}
        aria-invalid={!!error}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        className={`w-full rounded-md border bg-white px-3 py-2.5 text-sm text-ink placeholder:text-ink/30 focus:outline-none ${
          error ? 'border-brick/50' : 'border-line'
        } ${className}`}
        {...rest}
      />
      {error && (
        <p id={`${fieldId}-error`} className="mt-1.5 text-xs text-brick">
          {error}
        </p>
      )}
    </div>
  )
}
