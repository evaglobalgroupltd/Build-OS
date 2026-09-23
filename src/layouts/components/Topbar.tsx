import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, LogOut, Menu, Search, UserCircle } from 'lucide-react'

import { roleLabels } from '@/config/navigation'
import type { AppRole } from '@/config/roles'
import { useAuth } from '@/context/AuthContext'

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

type DismissReason = 'pointer' | 'escape'

/** Closes a popover on an outside pointer-down or Escape. */
function useDismiss<T extends HTMLElement>(
  open: boolean,
  onDismiss: (reason: DismissReason) => void,
) {
  const ref = useRef<T>(null)
  const latest = useRef(onDismiss)

  useEffect(() => {
    latest.current = onDismiss
  })

  useEffect(() => {
    if (!open) return

    const handlePointerDown = (event: PointerEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        latest.current('pointer')
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') latest.current('escape')
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  return ref
}

function getInitials(name?: string | null, email?: string | null) {
  if (name?.trim()) {
    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join('')
      .toUpperCase()
  }

  if (email?.trim()) return email.trim().slice(0, 2).toUpperCase()

  return 'U'
}

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/60 focus-visible:ring-offset-2'

/* -------------------------------------------------------------------------- */
/*  Search trigger                                                             */
/*                                                                             */
/*  Rendered only when the page supplies `onSearchClick`, so there is never    */
/*  a search box that does nothing. Cmd/Ctrl + K calls the same handler.       */
/* -------------------------------------------------------------------------- */

function SearchTrigger({ onClick }: { onClick: () => void }) {
  const shortcut = useMemo(
    () =>
      typeof navigator !== 'undefined' &&
      /Mac|iPhone|iPad/.test(navigator.userAgent)
        ? '⌘K'
        : 'Ctrl K',
    [],
  )

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        onClick()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClick])

  return (
    <>
      <button
        type="button"
        onClick={onClick}
        aria-keyshortcuts="Control+K Meta+K"
        className={`hidden h-10 w-[240px] items-center gap-2.5 rounded-xl border border-line bg-ink/[0.025] px-3.5 text-[13px] text-ink/45 transition-colors hover:border-ink/15 hover:bg-white hover:text-ink/70 motion-reduce:transition-none md:flex xl:w-[320px] ${focusRing}`}
      >
        <Search size={16} strokeWidth={1.75} aria-hidden="true" />

        <span className="flex-1 text-left">Search</span>

        <kbd className="rounded-md border border-line bg-white px-1.5 py-0.5 font-sans text-[11px] font-medium text-ink/45">
          {shortcut}
        </kbd>
      </button>

      <button
        type="button"
        onClick={onClick}
        aria-label="Search"
        className={`flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white text-ink/60 transition-colors hover:border-ink/15 hover:text-ink motion-reduce:transition-none md:hidden ${focusRing}`}
      >
        <Search size={17} strokeWidth={1.75} aria-hidden="true" />
      </button>
    </>
  )
}

/* -------------------------------------------------------------------------- */
/*  Account menu                                                               */
/* -------------------------------------------------------------------------- */

function Monogram({
  initials,
  className,
}: {
  initials: string
  className: string
}) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full bg-ink font-display font-medium tracking-wide text-white ring-1 ring-amber/60 ${className}`}
    >
      {initials}
    </span>
  )
}

const menuItem = `flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] font-medium text-ink/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/60`

function AccountMenu() {
  const { user, role, logout } = useAuth()
  const [open, setOpen] = useState(false)

  const panelId = useId()
  const triggerRef = useRef<HTMLButtonElement>(null)

  const dismiss = useCallback((reason: DismissReason) => {
    setOpen(false)
    if (reason === 'escape') triggerRef.current?.focus()
  }, [])

  const containerRef = useDismiss<HTMLDivElement>(open, dismiss)

  const initials = getInitials(user?.name, user?.email)
  const displayName = user?.name || user?.email || 'Account'
  const roleLabel = roleLabels[role as AppRole] ?? 'Workspace'

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className={`group flex items-center gap-3 rounded-full p-1 transition-colors hover:bg-ink/[0.04] motion-reduce:transition-none lg:pr-3.5 ${focusRing}`}
      >
        <span className="sr-only">Open account menu</span>

        <Monogram initials={initials} className="h-10 w-10 text-[13px]" />

        <span className="hidden min-w-0 max-w-[160px] text-left lg:block">
          <span className="block truncate text-[13px] font-semibold text-ink">
            {displayName}
          </span>
          <span className="block truncate text-xs text-ink/50">
            {roleLabel}
          </span>
        </span>

        <ChevronDown
          size={15}
          strokeWidth={1.75}
          aria-hidden="true"
          className={`hidden text-ink/35 transition-transform duration-200 motion-reduce:transition-none lg:block ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div
        id={panelId}
        className={`absolute right-0 top-[calc(100%+10px)] z-40 w-[280px] origin-top-right overflow-hidden rounded-2xl border border-line bg-white shadow-[0_18px_50px_-16px_rgba(11,18,32,0.3)] transition-[opacity,transform,visibility] duration-150 motion-reduce:transition-none ${
          open
            ? 'visible translate-y-0 scale-100 opacity-100'
            : 'invisible -translate-y-1 scale-[0.98] opacity-0'
        }`}
      >
        <div className="flex items-center gap-3.5 border-b border-line p-4">
          <Monogram initials={initials} className="h-11 w-11 text-sm" />

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-ink">
              {user?.name || 'Build OS user'}
            </p>

            {user?.email && (
              <p className="mt-0.5 truncate text-xs text-ink/50">
                {user.email}
              </p>
            )}

            <p className="mt-1 text-xs text-ink/40">{roleLabel}</p>
          </div>
        </div>

        <div className="p-1.5">
          <Link
            to="/profile"
            onClick={() => setOpen(false)}
            className={`${menuItem} hover:bg-ink/[0.04] hover:text-ink`}
          >
            <UserCircle
              size={17}
              strokeWidth={1.75}
              className="text-ink/35"
              aria-hidden="true"
            />
            View profile
          </Link>

          <button
            type="button"
            onClick={() => {
              setOpen(false)
              logout()
            }}
            className={`${menuItem} hover:bg-red-50 hover:text-red-700`}
          >
            <LogOut
              size={17}
              strokeWidth={1.75}
              className="text-ink/35"
              aria-hidden="true"
            />
            Log out
          </button>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Topbar                                                                     */
/* -------------------------------------------------------------------------- */

interface TopbarProps {
  title?: string
  onMenuClick?: () => void
  /** True once the page content has scrolled: adds depth and the brass thread. */
  elevated?: boolean
  /** Page-level controls (notifications, a primary action) shown before the account menu. */
  actions?: ReactNode
  /** Shows the search trigger and binds Cmd/Ctrl + K. Omit to hide search. */
  onSearchClick?: () => void
}

export function Topbar({
  title,
  onMenuClick,
  elevated = false,
  actions,
  onSearchClick,
}: TopbarProps) {
  const hasControls = Boolean(onSearchClick || actions)

  return (
    // 76px tall to match the sidebar brand row, so the two dividers form one line.
    <header
      className={`relative z-30 h-[76px] shrink-0 border-b border-line bg-white/85 backdrop-blur-xl transition-shadow duration-300 motion-reduce:transition-none ${
        elevated
          ? 'shadow-[0_12px_32px_-20px_rgba(11,18,32,0.28)]'
          : 'shadow-none'
      }`}
    >
      <div className="mx-auto flex h-full w-full max-w-[1680px] items-center gap-4 px-4 sm:px-6 lg:px-10">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation"
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-white text-ink/60 transition-colors hover:border-ink/15 hover:text-ink motion-reduce:transition-none lg:hidden ${focusRing}`}
        >
          <Menu size={18} strokeWidth={1.75} aria-hidden="true" />
        </button>

        <div className="min-w-0 flex-1">
          {title && (
            <h1 className="truncate font-display text-[22px] font-medium leading-tight tracking-[-0.015em] text-ink sm:text-[26px]">
              {title}
            </h1>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {onSearchClick && <SearchTrigger onClick={onSearchClick} />}
          {actions}

          {hasControls && (
            <span
              aria-hidden="true"
              className="mx-1 hidden h-6 w-px bg-line sm:block"
            />
          )}

          <AccountMenu />
        </div>
      </div>

      {/* Brass thread: fades in once the page has scrolled. */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-amber/60 to-transparent transition-opacity duration-300 motion-reduce:transition-none ${
          elevated ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </header>
  )
}

/**
 * Backwards-compatible alias.
 *
 *   import { AppHeader } from '@/components/layout/Topbar'
 */
export const AppHeader = Topbar