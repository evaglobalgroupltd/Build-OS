import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { MoreHorizontal, type LucideIcon } from 'lucide-react'

export interface MenuItem {
  label: string
  /** Internal route. Renders a real <Link>. */
  to?: string
  /** Or an action. */
  onClick?: () => void
  icon?: LucideIcon
}

const itemClass =
  'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[12px] font-medium text-ink/70 transition hover:bg-ink/[0.045] hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/60'

/**
 * Small dropdown used for "more options" buttons so they always do something.
 * Closes on outside click, Escape, and after choosing an item.
 */
export function PopoverMenu({
  label,
  items,
  icon: Icon = MoreHorizontal,
  buttonClassName = 'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-ink/40 transition-colors hover:bg-ink/[0.045] hover:text-ink/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/60',
  align = 'right',
}: {
  label: string
  items: MenuItem[]
  icon?: LucideIcon
  buttonClassName?: string
  align?: 'left' | 'right'
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const onPointer = (event: PointerEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)

    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className={buttonClassName}
      >
        <Icon size={18} strokeWidth={1.7} aria-hidden="true" />
      </button>

      {open && (
        <div
          role="menu"
          className={`absolute top-[calc(100%+6px)] z-50 w-60 rounded-2xl border border-line bg-white p-1.5 shadow-[0_22px_60px_-20px_rgba(11,18,32,0.35)] ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
        >
          {items.map((item) => {
            const ItemIcon = item.icon
            const content = (
              <>
                {ItemIcon && (
                  <ItemIcon size={14} strokeWidth={1.7} aria-hidden="true" />
                )}
                {item.label}
              </>
            )

            return item.to ? (
              <Link
                key={item.label}
                to={item.to}
                role="menuitem"
                onClick={() => setOpen(false)}
                className={itemClass}
              >
                {content}
              </Link>
            ) : (
              <button
                key={item.label}
                type="button"
                role="menuitem"
                onClick={() => {
                  setOpen(false)
                  item.onClick?.()
                }}
                className={itemClass}
              >
                {content}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}