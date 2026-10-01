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
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Command,
  LogOut,
  Menu,
  Search,
  ShieldCheck,
  UserCircle,
} from 'lucide-react'

import { roleLabels } from '@/config/navigation'
import type { AppRole } from '@/config/roles'
import { useAuth } from '@/context/AuthContext'

/* =============================================================================
 * Build OS — Premium Topbar
 *
 * Design language:
 * - Obsidian / paper foundation
 * - Brass executive accent
 * - Restrained electric-blue workspace signal
 * - Glass depth and architectural spacing
 * - Minimal, premium, operational rather than decorative
 * ============================================================================= */

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

type DismissReason = 'pointer' | 'escape'

function useDismiss<T extends HTMLElement>(
  open: boolean,
  onDismiss: (reason: DismissReason) => void,
) {
  const ref = useRef<T>(null)
  const latest = useRef(onDismiss)

  useEffect(() => {
    latest.current = onDismiss
  }, [onDismiss])

  useEffect(() => {
    if (!open) return

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node

      if (ref.current && !ref.current.contains(target)) {
        latest.current('pointer')
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        latest.current('escape')
      }
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

function getInitials(
  name?: string | null,
  email?: string | null,
): string {
  if (name?.trim()) {
    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join('')
      .toUpperCase()
  }

  if (email?.trim()) {
    return email.trim().slice(0, 2).toUpperCase()
  }

  return 'U'
}

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/60 focus-visible:ring-offset-2'

const softFocusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/15 focus-visible:ring-offset-2'

/* -------------------------------------------------------------------------- */
/* Brand mark                                                                  */
/* -------------------------------------------------------------------------- */

function BrandMark({
  compact = false,
}: {
  compact?: boolean
}) {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-ink text-white shadow-[0_8px_24px_-10px_rgba(11,18,32,0.55)] ${
          compact ? 'h-9 w-9' : 'h-10 w-10'
        }`}
      >
        {/* Architectural inner frame */}
        <span
          aria-hidden="true"
          className="absolute inset-[5px] rounded-[7px] border border-white/15"
        />

        {/* Brass signal */}
        <span
          aria-hidden="true"
          className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.65)]"
        />

        <span className="relative font-display text-[11px] font-semibold tracking-[0.12em]">
          BO
        </span>
      </div>

      {!compact && (
        <div className="hidden leading-none sm:block">
          <p className="font-display text-[12px] font-semibold tracking-[0.18em] text-ink">
            BUILD OS
          </p>

          <p className="mt-1 text-[9px] font-medium uppercase tracking-[0.16em] text-ink/35">
            Property Operations
          </p>
        </div>
      )}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Search trigger                                                              */
/* -------------------------------------------------------------------------- */

function SearchTrigger({
  onClick,
}: {
  onClick: () => void
}) {
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
      if (
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === 'k'
      ) {
        event.preventDefault()
        onClick()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClick])

  return (
    <>
      {/* Desktop command/search trigger */}
      <button
        type="button"
        onClick={onClick}
        aria-keyshortcuts="Control+K Meta+K"
        aria-label={`Search Build OS. Shortcut ${shortcut}`}
        className={`group hidden h-11 w-[250px] items-center gap-3 rounded-xl border border-line/80 bg-ink/[0.025] px-3.5 text-[13px] text-ink/45 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] transition-all duration-200 hover:border-ink/15 hover:bg-white hover:text-ink/70 hover:shadow-[0_8px_25px_-18px_rgba(11,18,32,0.35)] md:flex xl:w-[330px] ${softFocusRing}`}
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-lg border border-line/80 bg-white text-ink/40 transition-colors group-hover:text-ink/65">
          <Search
            size={14}
            strokeWidth={1.8}
            aria-hidden="true"
          />
        </span>

        <span className="flex-1 text-left">
          Search workspace
        </span>

        <kbd className="flex items-center gap-1 rounded-lg border border-line bg-white px-2 py-1 font-sans text-[10px] font-semibold tracking-wide text-ink/40 shadow-sm">
          {shortcut === '⌘K' && (
            <Command
              size={10}
              strokeWidth={2}
              aria-hidden="true"
            />
          )}

          <span>
            {shortcut === '⌘K' ? 'K' : 'Ctrl K'}
          </span>
        </kbd>
      </button>

      {/* Mobile */}
      <button
        type="button"
        onClick={onClick}
        aria-label="Search workspace"
        className={`flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white text-ink/60 shadow-sm transition-all hover:border-ink/15 hover:text-ink hover:shadow-md md:hidden ${softFocusRing}`}
      >
        <Search
          size={17}
          strokeWidth={1.75}
          aria-hidden="true"
        />
      </button>
    </>
  )
}

/* -------------------------------------------------------------------------- */
/* Monogram                                                                    */
/* -------------------------------------------------------------------------- */

function Monogram({
  initials,
  className = '',
}: {
  initials: string
  className?: string
}) {
  return (
    <span
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-ink font-display font-semibold tracking-[0.08em] text-white ring-1 ring-amber-400/60 shadow-[0_6px_18px_-8px_rgba(11,18,32,0.7)] ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-[3px] rounded-full border border-white/10"
      />

      <span className="relative">
        {initials}
      </span>
    </span>
  )
}

/* -------------------------------------------------------------------------- */
/* Account menu                                                                */
/* -------------------------------------------------------------------------- */

const menuItem =
  'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] font-medium text-ink/70 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/50 hover:bg-ink/[0.035] hover:text-ink'

function AccountMenu() {
  const { user, role, logout } = useAuth()

  const [open, setOpen] = useState(false)

  const panelId = useId()
  const triggerRef = useRef<HTMLButtonElement>(null)

  const dismiss = useCallback((reason: DismissReason) => {
    setOpen(false)

    if (reason === 'escape') {
      requestAnimationFrame(() => {
        triggerRef.current?.focus()
      })
    }
  }, [])

  const containerRef = useDismiss<HTMLDivElement>(
    open,
    dismiss,
  )

  const initials = getInitials(
    user?.fullName,
    user?.email,
  )

  const displayName =
    user?.fullName ||
    user?.email ||
    'Build OS User'

  const roleLabel =
    roleLabels[role as AppRole] ??
    'Workspace'

  return (
    <div
      ref={containerRef}
      className="relative"
    >
      {/* Account trigger */}
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
        className={`group flex items-center gap-2.5 rounded-full p-1 transition-all duration-200 hover:bg-ink/[0.035] lg:pr-3.5 ${focusRing}`}
      >
        <span className="sr-only">
          Open account menu
        </span>

        <Monogram
          initials={initials}
          className="h-10 w-10 text-[12px]"
        />

        <span className="hidden min-w-0 max-w-[170px] text-left lg:block">
          <span className="block truncate text-[12px] font-semibold tracking-[-0.01em] text-ink">
            {displayName}
          </span>

          <span className="mt-0.5 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.1em] text-ink/40">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {roleLabel}
          </span>
        </span>

        <ChevronDown
          size={15}
          strokeWidth={1.75}
          aria-hidden="true"
          className={`hidden text-ink/30 transition-transform duration-200 lg:block ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Account panel */}
      <div
        id={panelId}
        role="menu"
        aria-hidden={!open}
        className={`absolute right-0 top-[calc(100%+12px)] z-50 w-[310px] origin-top-right overflow-hidden rounded-[22px] border border-line/90 bg-white/95 shadow-[0_24px_70px_-22px_rgba(11,18,32,0.38)] backdrop-blur-2xl transition-[opacity,transform,visibility] duration-200 motion-reduce:transition-none ${
          open
            ? 'visible translate-y-0 scale-100 opacity-100'
            : 'invisible -translate-y-2 scale-[0.97] opacity-0'
        }`}
      >
        {/* Premium top strip */}
        <div className="relative overflow-hidden bg-ink px-5 pb-5 pt-5 text-white">
          <span
            aria-hidden="true"
            className="absolute -right-12 -top-16 h-36 w-36 rounded-full bg-amber-400/10 blur-2xl"
          />

          <span
            aria-hidden="true"
            className="absolute -bottom-20 left-20 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl"
          />

          <div className="relative flex items-start gap-3.5">
            <Monogram
              initials={initials}
              className="h-12 w-12 border border-white/10 text-sm ring-1 ring-amber-400/70"
            />

            <div className="min-w-0 flex-1 pt-0.5">
              <p className="truncate text-[14px] font-semibold tracking-[-0.01em]">
                {displayName}
              </p>

              {user?.email && (
                <p className="mt-1 truncate text-[11px] text-white/45">
                  {user.email}
                </p>
              )}

              <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1">
                <ShieldCheck
                  size={11}
                  strokeWidth={1.8}
                  className="text-amber-300"
                  aria-hidden="true"
                />

                <span className="text-[9px] font-semibold uppercase tracking-[0.13em] text-white/65">
                  {roleLabel}
                </span>
              </div>
            </div>
          </div>

          {/* Workspace status */}
          <div className="relative mt-4 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.045] px-3 py-2.5">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>

              <span className="text-[10px] font-medium text-white/55">
                Workspace active
              </span>
            </div>

            <CheckCircle2
              size={13}
              strokeWidth={1.8}
              className="text-emerald-400"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Menu */}
        <div className="p-2">
          <Link
            to="/profile"
            role="menuitem"
            onClick={() => setOpen(false)}
            className={menuItem}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-ink/[0.025]">
              <UserCircle
                size={16}
                strokeWidth={1.7}
                className="text-ink/45"
                aria-hidden="true"
              />
            </span>

            <span className="flex-1">
              <span className="block">
                View profile
              </span>

              <span className="mt-0.5 block text-[10px] font-normal text-ink/35">
                Account & personal details
              </span>
            </span>

            <ArrowUpRight
              size={14}
              strokeWidth={1.7}
              className="text-ink/20"
              aria-hidden="true"
            />
          </Link>

          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false)
              logout()
            }}
            className={`${menuItem} hover:bg-red-50 hover:text-red-700`}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-ink/[0.025]">
              <LogOut
                size={16}
                strokeWidth={1.7}
                className="text-ink/40"
                aria-hidden="true"
              />
            </span>

            <span className="flex-1 text-left">
              <span className="block">
                Log out
              </span>

              <span className="mt-0.5 block text-[10px] font-normal text-ink/35">
                End this workspace session
              </span>
            </span>
          </button>
        </div>

        {/* Footer */}
        <div className="border-t border-line/70 bg-ink/[0.015] px-4 py-3">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-ink/30">
              Build OS
            </span>

            <span className="text-[9px] font-medium text-ink/25">
              Secure workspace
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Topbar                                                                      */
/* -------------------------------------------------------------------------- */

export interface TopbarProps {
  title?: string
  onMenuClick?: () => void

  /**
   * True once the page content has scrolled.
   * Adds depth and the subtle brass architectural line.
   */
  elevated?: boolean

  /**
   * Page-level controls such as notifications,
   * create buttons or contextual actions.
   */
  actions?: ReactNode

  /**
   * Shows the global search trigger and binds
   * Cmd/Ctrl + K to the same handler.
   */
  onSearchClick?: () => void
}

export function Topbar({
  title,
  onMenuClick,
  elevated = false,
  actions,
  onSearchClick,
}: TopbarProps) {
  const hasControls = Boolean(
    onSearchClick || actions,
  )

  return (
    <header
      className={`relative z-30 h-[76px] shrink-0 border-b border-line/80 bg-white/[0.88] backdrop-blur-2xl transition-all duration-300 motion-reduce:transition-none ${
        elevated
          ? 'shadow-[0_16px_42px_-25px_rgba(11,18,32,0.35)]'
          : 'shadow-[0_1px_0_rgba(11,18,32,0.02)]'
      }`}
    >
      {/* Very subtle top architectural line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink/10 to-transparent"
      />

      <div className="mx-auto flex h-full w-full max-w-[1680px] items-center gap-4 px-4 sm:px-6 lg:px-10">
        {/* Mobile menu */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation"
          className={`group flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-white text-ink/55 shadow-sm transition-all hover:border-ink/15 hover:text-ink hover:shadow-md lg:hidden ${softFocusRing}`}
        >
          <Menu
            size={18}
            strokeWidth={1.75}
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:scale-105"
          />
        </button>

        {/* Mobile Build OS mark */}
        <div className="lg:hidden">
          <BrandMark compact />
        </div>

        {/* Page identity */}
        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 items-center gap-3">
            {title && (
              <>
                <div className="hidden h-6 w-px bg-line lg:block" />

                <div className="min-w-0">
                  <p className="mb-0.5 hidden text-[9px] font-semibold uppercase tracking-[0.18em] text-ink/30 lg:block">
                    Build OS workspace
                  </p>

                  <h1 className="truncate font-display text-[20px] font-medium leading-tight tracking-[-0.025em] text-ink sm:text-[23px] lg:text-[25px]">
                    {title}
                  </h1>
                </div>
              </>
            )}

            {!title && (
              <div className="hidden lg:block">
                <BrandMark />
              </div>
            )}
          </div>
        </div>

        {/* Right controls */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
          {onSearchClick && (
            <SearchTrigger onClick={onSearchClick} />
          )}

          {actions && (
            <div className="flex items-center gap-2">
              {actions}
            </div>
          )}

          {hasControls && (
            <span
              aria-hidden="true"
              className="mx-1 hidden h-7 w-px bg-gradient-to-b from-transparent via-line to-transparent sm:block"
            />
          )}

          <AccountMenu />
        </div>
      </div>

      {/* Brass architectural thread */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-amber-400/70 to-transparent transition-opacity duration-500 motion-reduce:transition-none ${
          elevated ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Very subtle bottom glow when elevated */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-[12%] -bottom-3 h-3 bg-gradient-to-r from-transparent via-ink/[0.025] to-transparent blur-md transition-opacity duration-500 motion-reduce:transition-none ${
          elevated ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </header>
  )
}

/* -------------------------------------------------------------------------- */
/* Backwards-compatible alias                                                  */
/* -------------------------------------------------------------------------- */

export const AppHeader = Topbar