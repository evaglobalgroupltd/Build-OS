import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'

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

const controlClass = (error?: string) =>
  `w-full rounded-md border bg-white px-3 py-2.5 text-sm text-ink placeholder:text-ink/30 focus:outline-none ${
    error ? 'border-brick/50' : 'border-line'
  }`

function FieldShell({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string
  label: string
  error?: string
  hint?: string
  children: ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-ink/60">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-brick">
          {error}
        </p>
      ) : (
        hint && <p className="mt-1.5 text-xs text-ink/40">{hint}</p>
      )}
    </div>
  )
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  error?: string
  hint?: string
}

/** Same look as FormField, for a <select>. Pass the <option>s as children. */
export function SelectField({ label, error, hint, id, className = '', children, ...rest }: SelectFieldProps) {
  const fieldId = id ?? label.toLowerCase().replace(/\s+/g, '-')
  return (
    <FieldShell id={fieldId} label={label} error={error} hint={hint}>
      <select id={fieldId} aria-invalid={!!error} className={`${controlClass(error)} ${className}`} {...rest}>
        {children}
      </select>
    </FieldShell>
  )
}

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
  hint?: string
}

/** Same look as FormField, for a <textarea>. */
export function TextAreaField({ label, error, hint, id, className = '', ...rest }: TextAreaFieldProps) {
  const fieldId = id ?? label.toLowerCase().replace(/\s+/g, '-')
  return (
    <FieldShell id={fieldId} label={label} error={error} hint={hint}>
      <textarea
        id={fieldId}
        aria-invalid={!!error}
        className={`${controlClass(error)} min-h-[84px] resize-y ${className}`}
        {...rest}
      />
    </FieldShell>
  )
}
