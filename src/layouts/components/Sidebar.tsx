import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FocusEvent as ReactFocusEvent,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
  type RefObject,
} from 'react'
import { NavLink } from 'react-router-dom'
import * as Icons from 'lucide-react'
import {
  Check,
  ChevronsUpDown,
  Circle,
  PanelLeftClose,
  PanelLeftOpen,
  ShieldCheck,
  X,
  type LucideIcon,
} from 'lucide-react'

import { navByRole, roleLabels } from '@/config/navigation'
import { roleMeta, accentClasses, roleOrder } from '@/config/roleUi'
import type { AppRole } from '@/config/roleUi'
import { useAuth } from '@/context/AuthContext'

/* -------------------------------------------------------------------------- */
/*  Icons                                                                      */
/* -------------------------------------------------------------------------- */

/**
 * Nav config stores icon names as strings, so they are looked up here.
 * The namespace import bundles all of lucide; once navigation.ts exports icon
 * components instead of names, this lookup can be deleted.
 */
const iconRegistry = Icons as unknown as Record<string, LucideIcon | undefined>
const resolveIcon = (name: string): LucideIcon => iconRegistry[name] ?? Circle

/* -------------------------------------------------------------------------- */
/*  Behaviour hooks                                                            */
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

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Modal drawer behaviour: locks body scroll, moves focus inside, traps Tab,
 * closes on Escape and hands focus back to whatever opened it.
 */
function useDrawer(
  open: boolean,
  onClose: (() => void) | undefined,
  panelRef: RefObject<HTMLElement | null>,
) {
  const latest = useRef(onClose)

  useEffect(() => {
    latest.current = onClose
  })

  useEffect(() => {
    if (!open) return

    const panel = panelRef.current
    const previouslyFocused = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusables = () =>
      Array.from(panel?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [])

    const frame = requestAnimationFrame(() => focusables()[0]?.focus())

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        // An open popover inside the drawer closes itself first.
        if (panel?.querySelector('[aria-expanded="true"]')) return
        latest.current?.()
        return
      }

      if (event.key !== 'Tab') return

      const items = focusables()
      if (items.length === 0) return

      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement

      if (event.shiftKey && active === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus()
    }
  }, [open, panelRef])
}

const STORAGE_KEY = 'buildos:sidebar-collapsed'

/** Desktop rail state, remembered between visits. */
function useSidebarCollapsed() {
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    try {
      return window.localStorage.getItem(STORAGE_KEY) === '1'
    } catch {
      return false
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, collapsed ? '1' : '0')
    } catch {
      /* storage unavailable: the preference simply won't persist */
    }
  }, [collapsed])

  const toggle = useCallback(() => setCollapsed((value) => !value), [])

  return [collapsed, toggle] as const
}

/* -------------------------------------------------------------------------- */
/*  Rail tooltips                                                              */
/*                                                                             */
/*  One fixed-position tooltip owned by <Sidebar>. Absolutely positioned       */
/*  tooltips would be clipped by the scrolling nav.                            */
/* -------------------------------------------------------------------------- */

interface TooltipState {
  label: string
  top: number
  left: number
}

interface TipApi {
  show: (element: HTMLElement, label: string) => void
  hide: () => void
}

const noTip: TipApi = { show: () => {}, hide: () => {} }

function tipHandlers(tip: TipApi, enabled: boolean, label: string) {
  if (!enabled) return {}

  return {
    onMouseEnter: (event: ReactMouseEvent<HTMLElement>) =>
      tip.show(event.currentTarget, label),
    onFocus: (event: ReactFocusEvent<HTMLElement>) =>
      tip.show(event.currentTarget, label),
    onMouseLeave: tip.hide,
    onBlur: tip.hide,
  }
}

/* -------------------------------------------------------------------------- */
/*  Shared styles                                                              */
/* -------------------------------------------------------------------------- */

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/60 focus-visible:ring-offset-2'

const iconButton = `flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink/45 transition-colors hover:bg-ink/[0.05] hover:text-ink motion-reduce:transition-none ${focusRing}`

/* -------------------------------------------------------------------------- */
/*  Brand row (76px, matches the Topbar so their dividers form one line)       */
/* -------------------------------------------------------------------------- */

function Brand({
  collapsed = false,
  children,
}: {
  collapsed?: boolean
  children: ReactNode
}) {
  return (
    <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-line px-4">
      <div
        aria-hidden={collapsed}
        className={`overflow-hidden transition-[max-width,opacity,margin] duration-300 motion-reduce:transition-none ${
          collapsed ? 'ml-0 max-w-0 opacity-0' : 'ml-2 max-w-[160px] opacity-100'
        }`}
      >
        <img
          src="/images/BuildOs.png"
          alt="Build OS"
          className="h-9 w-auto max-w-[156px] object-contain object-left"
        />
      </div>

      {children}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Workspace switcher                                                         */
/* -------------------------------------------------------------------------- */

function RoleChip({ role, className }: { role: AppRole; className: string }) {
  const meta = roleMeta[role]
  const accent = accentClasses[meta.accent]

  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-xl border ${accent.active} ${className}`}
    >
      <meta.icon
        size={16}
        strokeWidth={1.75}
        className={accent.icon}
        aria-hidden="true"
      />
    </span>
  )
}

function WorkspaceSwitcher({
  collapsed,
  tip,
}: {
  collapsed: boolean
  tip: TipApi
}) {
  const { role, setRole } = useAuth()
  const [open, setOpen] = useState(false)

  const panelId = useId()
  const triggerRef = useRef<HTMLButtonElement>(null)

  const dismiss = useCallback((reason: DismissReason) => {
    setOpen(false)
    if (reason === 'escape') triggerRef.current?.focus()
  }, [])

  const containerRef = useDismiss<HTMLDivElement>(open, dismiss)

  const label = roleLabels[role] ?? 'Workspace'

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={collapsed ? `Workspace: ${label}` : undefined}
        onClick={() => {
          tip.hide()
          setOpen((value) => !value)
        }}
        {...tipHandlers(tip, collapsed && !open, `Workspace: ${label}`)}
        className={`group flex w-full items-center rounded-2xl border transition duration-200 motion-reduce:transition-none ${focusRing} ${
          collapsed
            ? 'h-11 justify-center border-transparent hover:bg-ink/[0.04]'
            : 'gap-3 border-line bg-white p-2.5 text-left hover:border-ink/15 hover:shadow-[0_10px_28px_-16px_rgba(11,18,32,0.28)]'
        }`}
      >
        <RoleChip role={role} className="h-9 w-9" />

        {!collapsed && (
          <>
            <span className="min-w-0 flex-1">
              <span className="block text-xs text-ink/50">Workspace</span>
              <span className="block truncate text-[13.5px] font-semibold text-ink">
                {label}
              </span>
            </span>

            <ChevronsUpDown
              size={15}
              strokeWidth={1.75}
              className="shrink-0 text-ink/35 transition-colors group-hover:text-ink/60"
              aria-hidden="true"
            />
          </>
        )}
      </button>

      <div
        id={panelId}
        className={`absolute top-[calc(100%+8px)] z-50 origin-top-left rounded-2xl border border-line bg-white p-1.5 shadow-[0_18px_50px_-16px_rgba(11,18,32,0.3)] transition-[opacity,transform,visibility] duration-150 motion-reduce:transition-none ${
          collapsed ? 'left-0 w-[248px]' : 'inset-x-0'
        } ${
          open
            ? 'visible translate-y-0 scale-100 opacity-100'
            : 'invisible -translate-y-1 scale-[0.98] opacity-0'
        }`}
      >
        <p className="px-3 pb-1.5 pt-2 text-xs text-ink/50">
          Switch workspace
        </p>

        <div className="space-y-0.5">
          {roleOrder.map((item) => {
            const roleItem = item as AppRole
            const active = roleItem === role

            return (
              <button
                key={roleItem}
                type="button"
                aria-current={active ? 'true' : undefined}
                onClick={() => {
                  setRole(roleItem)
                  setOpen(false)
                  triggerRef.current?.focus()
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/60 ${
                  active ? 'bg-ink/[0.05]' : 'hover:bg-ink/[0.035]'
                }`}
              >
                <RoleChip role={roleItem} className="h-8 w-8" />

                <span
                  className={`min-w-0 flex-1 truncate text-[13px] ${
                    active ? 'font-semibold text-ink' : 'font-medium text-ink/70'
                  }`}
                >
                  {roleLabels[roleItem] ?? roleItem}
                </span>

                {active && (
                  <Check
                    size={15}
                    strokeWidth={2}
                    className="shrink-0 text-ink"
                    aria-hidden="true"
                  />
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Navigation                                                                 */
/* -------------------------------------------------------------------------- */

function SidebarNav({
  collapsed,
  tip,
  onNavigate,
}: {
  collapsed: boolean
  tip: TipApi
  onNavigate?: () => void
}) {
  const { role } = useAuth()
  const items = navByRole[role]

  return (
    <nav
      aria-label="Primary"
      onScroll={tip.hide}
      className="
        flex-1 space-y-0.5 overflow-y-auto px-3 py-3
        [mask-image:linear-gradient(to_bottom,transparent,#000_12px,#000_calc(100%-12px),transparent)]
        [scrollbar-color:rgba(11,18,32,0.14)_transparent]
        [scrollbar-width:thin]
      "
    >
      {items.map((item) => {
        const Icon = resolveIcon(item.icon)

        return (
          <NavLink
            key={item.path}
            to={item.path}
            // Top-level role routes (/role/page) match exactly; deeper routes match by prefix.
            end={item.path.split('/').length === 3}
            onClick={onNavigate}
            {...tipHandlers(tip, collapsed, item.label)}
            className={({ isActive }) =>
              `group relative flex min-h-[44px] items-center rounded-xl text-[13.5px] transition-colors duration-200 motion-reduce:transition-none ${focusRing} ${
                collapsed ? 'justify-center px-0' : 'px-3.5'
              } ${
                isActive
                  ? 'bg-ink/[0.05] font-semibold text-ink shadow-[inset_0_0_0_1px_rgba(11,18,32,0.05)]'
                  : 'font-medium text-ink/60 hover:bg-ink/[0.035] hover:text-ink'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {/* Brass tick, set on the sidebar's edge like a bookmark */}
                <span
                  aria-hidden="true"
                  className={`absolute -left-3 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-amber transition duration-200 motion-reduce:transition-none ${
                    isActive ? 'scale-y-100 opacity-100' : 'scale-y-50 opacity-0'
                  }`}
                />

                <Icon
                  size={18}
                  strokeWidth={1.75}
                  aria-hidden="true"
                  className={`shrink-0 transition-colors ${
                    isActive
                      ? 'text-amber'
                      : 'text-ink/35 group-hover:text-ink/60'
                  }`}
                />

                {/* Stays in the DOM when collapsed so screen readers keep the label */}
                <span
                  className={`truncate whitespace-nowrap transition-[max-width,opacity,margin] duration-300 motion-reduce:transition-none ${
                    collapsed
                      ? 'ml-0 max-w-0 opacity-0'
                      : 'ml-3 max-w-[180px] opacity-100'
                  }`}
                >
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        )
      })}
    </nav>
  )
}

/* -------------------------------------------------------------------------- */
/*  Escrow assurance: the one dark object in an otherwise light frame          */
/* -------------------------------------------------------------------------- */

function EscrowNotice({
  collapsed,
  tip,
}: {
  collapsed: boolean
  tip: TipApi
}) {
  return (
    <div className="shrink-0 border-t border-line p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      {collapsed ? (
        <div
          role="note"
          aria-label="Escrow protected. Funds stay in escrow until each milestone is verified."
          {...tipHandlers(tip, true, 'Escrow protected')}
          className="mx-auto flex h-11 w-full items-center justify-center rounded-xl bg-ink text-amber ring-1 ring-inset ring-white/10"
        >
          <ShieldCheck size={18} strokeWidth={1.75} aria-hidden="true" />
        </div>
      ) : (
        <div className="relative overflow-hidden rounded-2xl bg-ink p-4 shadow-[0_14px_34px_-14px_rgba(11,18,32,0.5)] ring-1 ring-inset ring-white/10">
          <span
            aria-hidden="true"
            className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber/70 to-transparent"
          />

          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-amber ring-1 ring-inset ring-amber/35">
              <ShieldCheck size={17} strokeWidth={1.75} aria-hidden="true" />
            </span>

            <p className="text-[13px] font-semibold text-white">
              Escrow protected
            </p>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-white/60">
            Funds stay in escrow until each milestone is verified.
          </p>
        </div>
      )}
    </div>
  )
}

function SidebarBody({
  collapsed,
  tip,
  onNavigate,
}: {
  collapsed: boolean
  tip: TipApi
  onNavigate?: () => void
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="shrink-0 px-3 pt-4">
        <WorkspaceSwitcher collapsed={collapsed} tip={tip} />
      </div>

      <SidebarNav collapsed={collapsed} tip={tip} onNavigate={onNavigate} />
      <EscrowNotice collapsed={collapsed} tip={tip} />
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Sidebar                                                                    */
/* -------------------------------------------------------------------------- */

interface SidebarProps {
  mobileOpen?: boolean
  onMobileClose?: () => void
}

export function Sidebar({ mobileOpen = false, onMobileClose }: SidebarProps) {
  const [collapsed, toggleCollapsed] = useSidebarCollapsed()
  const [tooltip, setTooltip] = useState<TooltipState | null>(null)
  const drawerRef = useRef<HTMLDivElement>(null)

  useDrawer(mobileOpen, onMobileClose, drawerRef)

  const tip = useMemo<TipApi>(
    () => ({
      show: (element, label) => {
        const rect = element.getBoundingClientRect()
        setTooltip({
          label,
          top: rect.top + rect.height / 2,
          left: rect.right + 12,
        })
      },
      hide: () => setTooltip(null),
    }),
    [],
  )

  useEffect(() => {
    setTooltip(null)
  }, [collapsed])

  return (
    <>
      {/* ---------------------------- Desktop ---------------------------- */}
      <aside
        aria-label="Application sidebar"
        className={`relative z-40 hidden h-full shrink-0 flex-col border-r border-line bg-white transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none lg:flex ${
          collapsed ? 'w-[72px]' : 'w-[272px]'
        }`}
      >
        <Brand collapsed={collapsed}>
          <button
            type="button"
            onClick={toggleCollapsed}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className={iconButton}
            {...tipHandlers(tip, collapsed, 'Expand sidebar')}
          >
            {collapsed ? (
              <PanelLeftOpen size={18} strokeWidth={1.75} aria-hidden="true" />
            ) : (
              <PanelLeftClose size={18} strokeWidth={1.75} aria-hidden="true" />
            )}
          </button>
        </Brand>

        <SidebarBody collapsed={collapsed} tip={tip} />

        {collapsed && tooltip && (
          <div
            role="tooltip"
            style={{ top: tooltip.top, left: tooltip.left }}
            className="pointer-events-none fixed z-[70] -translate-y-1/2 whitespace-nowrap rounded-lg bg-ink px-2.5 py-1.5 text-xs font-medium text-white shadow-[0_10px_30px_-10px_rgba(11,18,32,0.5)]"
          >
            {tooltip.label}
          </div>
        )}
      </aside>

      {/* ------------------- Mobile drawer (always expanded) ------------------- */}
      {/* `invisible` removes it from the tab order and a11y tree while closed. */}
      <div
        className={`fixed inset-0 z-50 transition-[visibility] duration-300 lg:hidden ${
          mobileOpen ? 'visible' : 'invisible'
        }`}
      >
        <div
          aria-hidden="true"
          onClick={onMobileClose}
          className={`absolute inset-0 bg-ink/40 backdrop-blur-sm transition-opacity duration-300 motion-reduce:transition-none ${
            mobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <div
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
          className={`absolute inset-y-0 left-0 flex w-[300px] max-w-[88vw] flex-col bg-white shadow-[0_40px_90px_-24px_rgba(11,18,32,0.45)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <Brand>
            <button
              type="button"
              onClick={onMobileClose}
              aria-label="Close navigation"
              className={iconButton}
            >
              <X size={18} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </Brand>

          <SidebarBody collapsed={false} tip={noTip} onNavigate={onMobileClose} />
        </div>
      </div>
    </>
  )
}