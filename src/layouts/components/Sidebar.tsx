
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
import type { AppRole } from '@/config/roles'
import { useAuth } from '@/context/AuthContext'

/* =============================================================================
 * ICON REGISTRY
 * ============================================================================= */

/**
 * Navigation configuration stores Lucide icon names as strings.
 * This registry resolves those names into actual Lucide components.
 */
const iconRegistry = Icons as unknown as Record<string, LucideIcon | undefined>

const resolveIcon = (name: string): LucideIcon =>
  iconRegistry[name] ?? Circle

/* =============================================================================
 * SHARED TYPES
 * ============================================================================= */

type DismissReason = 'pointer' | 'escape'

interface TooltipState {
  label: string
  top: number
  left: number
}

interface TipApi {
  show: (element: HTMLElement, label: string) => void
  hide: () => void
}

const noTip: TipApi = {
  show: () => {},
  hide: () => {},
}

/* =============================================================================
 * SHARED STYLES
 * ============================================================================= */

const focusRing = `
  focus-visible:outline-none
  focus-visible:ring-2
  focus-visible:ring-amber/60
  focus-visible:ring-offset-2
`

const iconButton = `
  flex h-9 w-9 shrink-0
  items-center justify-center
  rounded-lg
  text-ink/45
  transition-all duration-200
  hover:bg-ink/[0.05]
  hover:text-ink
  motion-reduce:transition-none
  ${focusRing}
`

/* =============================================================================
 * DISMISS HOOK
 * ============================================================================= */

/**
 * Closes a popover when:
 * - pointer interaction occurs outside it
 * - Escape is pressed
 */
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

/* =============================================================================
 * DRAWER ACCESSIBILITY
 * ============================================================================= */

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Mobile navigation drawer:
 * - locks body scrolling
 * - moves focus into drawer
 * - traps Tab navigation
 * - closes on Escape
 * - restores focus to the trigger
 */
function useDrawer(
  open: boolean,
  onClose: (() => void) | undefined,
  panelRef: RefObject<HTMLElement | null>,
) {
  const latest = useRef(onClose)

  useEffect(() => {
    latest.current = onClose
  }, [onClose])

  useEffect(() => {
    if (!open) return

    const panel = panelRef.current
    const previouslyFocused = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'

    const focusables = () =>
      Array.from(
        panel?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [],
      )

    const frame = requestAnimationFrame(() => {
      focusables()[0]?.focus()
    })

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        /*
         * If a nested popover is open, let that component close itself.
         */
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

/* =============================================================================
 * SIDEBAR COLLAPSE STATE
 * ============================================================================= */

const STORAGE_KEY = 'buildos:sidebar-collapsed'

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
      window.localStorage.setItem(
        STORAGE_KEY,
        collapsed ? '1' : '0',
      )
    } catch {
      /*
       * Storage may be unavailable.
       * The sidebar still works normally.
       */
    }
  }, [collapsed])

  const toggle = useCallback(() => {
    setCollapsed((value) => !value)
  }, [])

  return [collapsed, toggle] as const
}

/* =============================================================================
 * TOOLTIP SYSTEM
 * ============================================================================= */

/**
 * Fixed-position tooltip.
 *
 * Using fixed positioning prevents the tooltip from being clipped by
 * the sidebar's scrolling navigation container.
 */
function tipHandlers(
  tip: TipApi,
  enabled: boolean,
  label: string,
) {
  if (!enabled) return {}

  return {
    onMouseEnter: (
      event: ReactMouseEvent<HTMLElement>,
    ) => {
      tip.show(event.currentTarget, label)
    },

    onFocus: (
      event: ReactFocusEvent<HTMLElement>,
    ) => {
      tip.show(event.currentTarget, label)
    },

    onMouseLeave: tip.hide,
    onBlur: tip.hide,
  }
}

/* =============================================================================
 * BRAND
 * ============================================================================= */

function Brand({
  collapsed = false,
  children,
}: {
  collapsed?: boolean
  children: ReactNode
}) {
  return (
    <div
      className="
        relative flex h-[76px] shrink-0
        items-center justify-between
        border-b border-line
        bg-white
        px-4
      "
    >
      {/* Premium divider highlight */}
      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-x-7 bottom-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-amber/25
          to-transparent
        "
      />

      <div
        aria-hidden={collapsed}
        className={`
          overflow-hidden
          transition-[max-width,opacity,margin]
          duration-300
          ease-[cubic-bezier(0.22,1,0.36,1)]
          motion-reduce:transition-none
          ${
            collapsed
              ? 'ml-0 max-w-0 opacity-0'
              : 'ml-2 max-w-[160px] opacity-100'
          }
        `}
      >
        <img
          src="/images/BuildOs.png"
          alt="Build OS"
          className="
            h-9 w-auto max-w-[156px]
            object-contain object-left
          "
        />
      </div>

      {children}
    </div>
  )
}

/* =============================================================================
 * WORKSPACE CHIP
 * ============================================================================= */

function RoleChip({
  role,
  className,
}: {
  role: AppRole
  className: string
}) {
  const meta = roleMeta[role]
  const accent = accentClasses[meta.accent]

  return (
    <span
      className={`
        flex shrink-0 items-center justify-center
        rounded-xl border
        ${accent.active}
        ${className}
      `}
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

/* =============================================================================
 * WORKSPACE SWITCHER
 * ============================================================================= */

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

  const dismiss = useCallback(
    (reason: DismissReason) => {
      setOpen(false)

      if (reason === 'escape') {
        triggerRef.current?.focus()
      }
    },
    [],
  )

  const containerRef = useDismiss<HTMLDivElement>(
    open,
    dismiss,
  )

  const label = roleLabels[role] ?? 'Workspace'

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={
          collapsed
            ? `Workspace: ${label}`
            : undefined
        }
        onClick={() => {
          tip.hide()
          setOpen((value) => !value)
        }}
        {...tipHandlers(
          tip,
          collapsed && !open,
          `Workspace: ${label}`,
        )}
        className={`
          group flex w-full items-center
          rounded-2xl border
          transition-all duration-200
          motion-reduce:transition-none
          ${focusRing}
          ${
            collapsed
              ? `
                h-11
                justify-center
                border-transparent
                hover:bg-ink/[0.04]
              `
              : `
                gap-3
                border-line
                bg-white
                p-2.5
                text-left
                hover:border-ink/15
                hover:shadow-[0_12px_30px_-18px_rgba(11,18,32,0.35)]
              `
          }
        `}
      >
        <RoleChip
          role={role}
          className="h-9 w-9"
        />

        {!collapsed && (
          <>
            <span className="min-w-0 flex-1">
              <span className="block text-[10px] uppercase tracking-[0.14em] text-ink/35">
                Workspace
              </span>

              <span className="mt-0.5 block truncate text-[13.5px] font-semibold text-ink">
                {label}
              </span>
            </span>

            <ChevronsUpDown
              size={15}
              strokeWidth={1.75}
              className="
                shrink-0
                text-ink/30
                transition-colors
                group-hover:text-ink/60
              "
              aria-hidden="true"
            />
          </>
        )}
      </button>

      {/* ------------------------------------------------------------------ */}
      {/* Workspace popover                                                  */}
      {/* ------------------------------------------------------------------ */}

      <div
        id={panelId}
        className={`
          absolute top-[calc(100%+8px)]
          z-50 origin-top-left
          rounded-2xl
          border border-line
          bg-white
          p-1.5
          shadow-[0_22px_60px_-20px_rgba(11,18,32,0.35)]
          transition-[opacity,transform,visibility]
          duration-150
          motion-reduce:transition-none
          ${
            collapsed
              ? 'left-0 w-[248px]'
              : 'inset-x-0'
          }
          ${
            open
              ? `
                visible
                translate-y-0
                scale-100
                opacity-100
              `
              : `
                invisible
                -translate-y-1
                scale-[0.98]
                opacity-0
              `
          }
        `}
      >
        <div className="px-3 pb-1.5 pt-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/35">
            Switch workspace
          </p>
        </div>

        <div className="space-y-0.5">
          {roleOrder.map((item) => {
            const roleItem = item as AppRole
            const active = roleItem === role

            return (
              <button
                key={roleItem}
                type="button"
                aria-current={
                  active ? 'true' : undefined
                }
                onClick={() => {
                  setRole(roleItem)
                  setOpen(false)
                  triggerRef.current?.focus()
                }}
                className={`
                  group flex w-full items-center gap-3
                  rounded-xl px-2.5 py-2
                  text-left
                  transition-all duration-150
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-amber/60
                  ${
                    active
                      ? 'bg-ink/[0.055]'
                      : 'hover:bg-ink/[0.035]'
                  }
                `}
              >
                <RoleChip
                  role={roleItem}
                  className="h-8 w-8"
                />

                <span
                  className={`
                    min-w-0 flex-1 truncate text-[13px]
                    ${
                      active
                        ? 'font-semibold text-ink'
                        : 'font-medium text-ink/70'
                    }
                  `}
                >
                  {roleLabels[roleItem] ??
                    roleItem}
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

/* =============================================================================
 * SIDEBAR NAVIGATION
 * ============================================================================= */

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

  /*
   * navigation.ts is deliberately the single source of truth.
   *
   * This means the newly added:
   *
   *   Decisions
   *   Messages
   *   Updates
   *
   * automatically appear here once added to navByRole.
   */
  const items = navByRole[role] ?? []

  return (
    <nav
      aria-label="Primary"
      onScroll={tip.hide}
      className="
        flex-1
        overflow-y-auto
        px-3
        py-4
        [scrollbar-color:rgba(11,18,32,0.12)_transparent]
        [scrollbar-width:thin]
      "
    >
      {/* ------------------------------------------------------------------ */}
      {/* Section label                                                      */}
      {/* ------------------------------------------------------------------ */}

      {!collapsed && (
        <div className="mb-2 px-3">
          <p className="
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.18em]
            text-ink/30
          ">
            Workspace
          </p>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Items                                                              */}
      {/* ------------------------------------------------------------------ */}

      <div className="space-y-1">
        {items.map((item) => {
          const Icon = resolveIcon(item.icon)

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={
                item.path === '/app/client' ||
                item.path === '/app/contractor' ||
                item.path === '/app/market' ||
                item.path === '/app/pm' ||
                item.path === '/app/professional' ||
                item.path === '/app/admin'
              }
              onClick={onNavigate}
              {...tipHandlers(
                tip,
                collapsed,
                item.label,
              )}
              className={({ isActive }) =>
                `
                  group relative flex min-h-[46px]
                  items-center overflow-hidden
                  rounded-xl
                  text-[13.5px]
                  transition-all duration-200
                  motion-reduce:transition-none
                  ${focusRing}
                  ${
                    collapsed
                      ? 'justify-center px-0'
                      : 'gap-3 px-3.5'
                  }
                  ${
                    isActive
                      ? `
                        bg-ink/[0.055]
                        font-semibold
                        text-ink
                        shadow-[inset_0_0_0_1px_rgba(11,18,32,0.055)]
                      `
                      : `
                        font-medium
                        text-ink/58
                        hover:bg-ink/[0.035]
                        hover:text-ink
                      `
                  }
                `
              }
            >
              {({ isActive }) => (
                <>
                  {/* ------------------------------------------------------ */}
                  {/* Brass active rail                                      */}
                  {/* ------------------------------------------------------ */}

                  <span
                    aria-hidden="true"
                    className={`
                      absolute left-[-1px] top-1/2
                      h-6 w-[3px]
                      -translate-y-1/2
                      rounded-r-full
                      bg-amber
                      transition-all duration-200
                      motion-reduce:transition-none
                      ${
                        isActive
                          ? 'scale-y-100 opacity-100'
                          : 'scale-y-40 opacity-0'
                      }
                    `}
                  />

                  {/* ------------------------------------------------------ */}
                  {/* Icon tile                                               */}
                  {/* ------------------------------------------------------ */}

                  <span
                    className={`
                      relative flex h-8 w-8
                      shrink-0 items-center justify-center
                      rounded-lg
                      transition-all duration-200
                      motion-reduce:transition-none
                      ${
                        isActive
                          ? `
                            bg-amber/[0.10]
                            text-amber
                          `
                          : `
                            text-ink/35
                            group-hover:bg-ink/[0.045]
                            group-hover:text-ink/65
                          `
                      }
                    `}
                  >
                    <Icon
                      size={17}
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />

                    <span
                      aria-hidden="true"
                      className={`
                        pointer-events-none
                        absolute inset-0
                        rounded-lg
                        ring-1 ring-inset
                        ring-amber/20
                        transition-opacity
                        ${
                          isActive
                            ? 'opacity-100'
                            : 'opacity-0'
                        }
                      `}
                    />
                  </span>

                  {/* ------------------------------------------------------ */}
                  {/* Label                                                   */}
                  {/* ------------------------------------------------------ */}

                  <span
                    className={`
                      min-w-0 flex-1
                      truncate whitespace-nowrap
                      transition-[max-width,opacity]
                      duration-300
                      motion-reduce:transition-none
                      ${
                        collapsed
                          ? 'max-w-0 opacity-0'
                          : 'max-w-[180px] opacity-100'
                      }
                    `}
                  >
                    {item.label}
                  </span>

                  {/* ------------------------------------------------------ */}
                  {/* Active dot                                              */}
                  {/* ------------------------------------------------------ */}

                  {!collapsed && isActive && (
                    <span
                      aria-hidden="true"
                      className="
                        h-1.5 w-1.5
                        shrink-0
                        rounded-full
                        bg-amber
                        shadow-[0_0_10px_rgba(196,160,76,0.45)]
                      "
                    />
                  )}
                </>
              )}
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}

/* =============================================================================
 * ESCROW ASSURANCE
 * ============================================================================= */

function EscrowNotice({
  collapsed,
  tip,
}: {
  collapsed: boolean
  tip: TipApi
}) {
  return (
    <div
      className="
        shrink-0
        border-t border-line
        bg-white
        p-3
        pb-[max(0.75rem,env(safe-area-inset-bottom))]
      "
    >
      {/* ------------------------------------------------------------------ */}
      {/* Collapsed state                                                     */}
      {/* ------------------------------------------------------------------ */}

      {collapsed ? (
        <div
          role="note"
          aria-label="
            Escrow protected.
            Funds remain secured until project milestones are verified.
          "
          {...tipHandlers(
            tip,
            true,
            'Escrow protected',
          )}
          className="
            mx-auto flex h-11 w-full
            items-center justify-center
            rounded-xl
            bg-ink
            text-amber
            shadow-[0_12px_28px_-14px_rgba(11,18,32,0.5)]
            ring-1 ring-inset ring-white/10
          "
        >
          <ShieldCheck
            size={18}
            strokeWidth={1.75}
            aria-hidden="true"
          />
        </div>
      ) : (
        /* --------------------------------------------------------------- */
        /* Expanded state                                                   */
        /* --------------------------------------------------------------- */

        <div
          className="
            relative overflow-hidden
            rounded-2xl
            bg-ink
            p-4
            shadow-[0_18px_42px_-18px_rgba(11,18,32,0.55)]
            ring-1 ring-inset ring-white/10
          "
        >
          {/* Brass line */}
          <span
            aria-hidden="true"
            className="
              absolute inset-x-8 top-0
              h-px
              bg-gradient-to-r
              from-transparent
              via-amber/80
              to-transparent
            "
          />

          {/* Ambient glow */}
          <span
            aria-hidden="true"
            className="
              pointer-events-none
              absolute -right-10 -top-10
              h-28 w-28
              rounded-full
              bg-amber/10
              blur-3xl
            "
          />

          <div className="relative flex items-center gap-3">
            <span
              className="
                flex h-9 w-9 shrink-0
                items-center justify-center
                rounded-full
                bg-white/[0.06]
                text-amber
                ring-1 ring-inset
                ring-amber/30
              "
            >
              <ShieldCheck
                size={17}
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </span>

            <div className="min-w-0">
              <p className="
                text-[12px]
                font-semibold
                tracking-wide
                text-white
              ">
                Escrow protected
              </p>

              <p className="
                mt-0.5
                text-[9px]
                font-medium
                uppercase
                tracking-[0.14em]
                text-white/35
              ">
                Financial security
              </p>
            </div>
          </div>

          <p className="
            relative mt-3
            text-[11px]
            leading-relaxed
            text-white/55
          ">
            Funds remain secured until each project
            milestone has been independently verified
            and approved.
          </p>
        </div>
      )}
    </div>
  )
}

/* =============================================================================
 * SIDEBAR BODY
 * ============================================================================= */

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
      {/* Workspace selector */}
      <div className="shrink-0 px-3 pt-4">
        <WorkspaceSwitcher
          collapsed={collapsed}
          tip={tip}
        />
      </div>

      {/* Navigation */}
      <SidebarNav
        collapsed={collapsed}
        tip={tip}
        onNavigate={onNavigate}
      />

      {/* Financial assurance */}
      <EscrowNotice
        collapsed={collapsed}
        tip={tip}
      />
    </div>
  )
}

/* =============================================================================
 * SIDEBAR
 * ============================================================================= */

export interface SidebarProps {
  mobileOpen?: boolean
  onMobileClose?: () => void
}

export function Sidebar({
  mobileOpen = false,
  onMobileClose,
}: SidebarProps) {
  const [collapsed, toggleCollapsed] =
    useSidebarCollapsed()

  const [tooltip, setTooltip] =
    useState<TooltipState | null>(null)

  const drawerRef =
    useRef<HTMLDivElement>(null)

  useDrawer(
    mobileOpen,
    onMobileClose,
    drawerRef,
  )

  /* ------------------------------------------------------------------------ */
  /* Tooltip API                                                               */
  /* ------------------------------------------------------------------------ */

  const tip = useMemo<TipApi>(
    () => ({
      show: (element, label) => {
        const rect =
          element.getBoundingClientRect()

        setTooltip({
          label,
          top: rect.top + rect.height / 2,
          left: rect.right + 12,
        })
      },

      hide: () => {
        setTooltip(null)
      },
    }),
    [],
  )

  /* Clear tooltip whenever sidebar state changes. */
  useEffect(() => {
    setTooltip(null)
  }, [collapsed])

  return (
    <>
      {/* ==================================================================== */}
      {/* DESKTOP SIDEBAR                                                      */}
      {/* ==================================================================== */}

      <aside
        aria-label="Application sidebar"
        className={`
          relative z-40
          hidden h-full shrink-0
          flex-col
          border-r border-line
          bg-white
          transition-[width]
          duration-300
          ease-[cubic-bezier(0.22,1,0.36,1)]
          motion-reduce:transition-none
          lg:flex
          ${
            collapsed
              ? 'w-[72px]'
              : 'w-[272px]'
          }
        `}
      >
        <Brand collapsed={collapsed}>
          <button
            type="button"
            onClick={toggleCollapsed}
            aria-label={
              collapsed
                ? 'Expand sidebar'
                : 'Collapse sidebar'
            }
            className={iconButton}
            {...tipHandlers(
              tip,
              collapsed,
              'Expand sidebar',
            )}
          >
            {collapsed ? (
              <PanelLeftOpen
                size={18}
                strokeWidth={1.75}
                aria-hidden="true"
              />
            ) : (
              <PanelLeftClose
                size={18}
                strokeWidth={1.75}
                aria-hidden="true"
              />
            )}
          </button>
        </Brand>

        <SidebarBody
          collapsed={collapsed}
          tip={tip}
        />

        {/* ------------------------------------------------------------------ */}
        {/* Collapsed navigation tooltip                                      */}
        {/* ------------------------------------------------------------------ */}

        {collapsed && tooltip && (
          <div
            role="tooltip"
            style={{
              top: tooltip.top,
              left: tooltip.left,
            }}
            className="
              pointer-events-none
              fixed z-[70]
              -translate-y-1/2
              whitespace-nowrap
              rounded-lg
              border border-white/10
              bg-ink
              px-2.5 py-1.5
              text-xs
              font-medium
              text-white
              shadow-[0_12px_32px_-10px_rgba(11,18,32,0.55)]
            "
          >
            {tooltip.label}
          </div>
        )}
      </aside>

      {/* ==================================================================== */}
      {/* MOBILE DRAWER                                                        */}
      {/* ==================================================================== */}

      <div
        className={`
          fixed inset-0 z-50
          lg:hidden
          transition-[visibility]
          duration-300
          ${
            mobileOpen
              ? 'visible'
              : 'invisible'
          }
        `}
      >
        {/* ------------------------------------------------------------------ */}
        {/* Backdrop                                                           */}
        {/* ------------------------------------------------------------------ */}

        <div
          aria-hidden="true"
          onClick={onMobileClose}
          className={`
            absolute inset-0
            bg-ink/45
            backdrop-blur-sm
            transition-opacity
            duration-300
            motion-reduce:transition-none
            ${
              mobileOpen
                ? 'opacity-100'
                : 'opacity-0'
            }
          `}
        />

        {/* ------------------------------------------------------------------ */}
        {/* Drawer                                                             */}
        {/* ------------------------------------------------------------------ */}

        <div
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
          className={`
            absolute inset-y-0 left-0
            flex w-[300px]
            max-w-[88vw]
            flex-col
            border-r border-line
            bg-white
            shadow-[0_40px_100px_-24px_rgba(11,18,32,0.5)]
            transition-transform
            duration-300
            ease-[cubic-bezier(0.22,1,0.36,1)]
            motion-reduce:transition-none
            ${
              mobileOpen
                ? 'translate-x-0'
                : '-translate-x-full'
            }
          `}
        >
          <Brand>
            <button
              type="button"
              onClick={onMobileClose}
              aria-label="Close navigation"
              className={iconButton}
            >
              <X
                size={18}
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </button>
          </Brand>

          <SidebarBody
            collapsed={false}
            tip={noTip}
            onNavigate={onMobileClose}
          />
        </div>
      </div>
    </>
  )
}