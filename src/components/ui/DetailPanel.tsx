import { useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

/**
 * Slide-over panel used when a card is clicked to show more information.
 * Rendered in a portal so hover transforms on cards can't break positioning.
 * Closes on Escape and backdrop click.
 */
export function DetailPanel({
  open,
  onClose,
  eyebrow,
  title,
  children,
  footer,
}: {
  open: boolean
  onClose: () => void
  eyebrow?: string
  title: string
  children: ReactNode
  footer?: ReactNode
}) {
  const closeRef = useRef<HTMLButtonElement | null>(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCloseRef.current()
    }

    window.addEventListener('keydown', onKey)
    closeRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-[100]">
      <div
        className="absolute inset-0 bg-ink/40"
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="absolute right-0 top-0 flex h-full w-full max-w-[460px] flex-col bg-white shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-5">
          <div className="min-w-0">
            {eyebrow && (
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink/40">
                {eyebrow}
              </p>
            )}
            <h2 className="mt-1 text-lg font-bold leading-snug text-ink">{title}</h2>
          </div>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-ink/60 transition hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/60"
          >
            <X size={15} aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>

        {footer && (
          <div className="flex flex-wrap gap-3 border-t border-line px-5 py-4">
            {footer}
          </div>
        )}
      </aside>
    </div>,
    document.body,
  )
}

export function DetailRow({
  label,
  value,
}: {
  label: string
  value: ReactNode
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5">
      <dt className="text-[11px] text-ink/45">{label}</dt>
      <dd className="text-right text-[12px] font-semibold text-ink">{value}</dd>
    </div>
  )
}