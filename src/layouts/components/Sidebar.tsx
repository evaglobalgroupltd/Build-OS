import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import * as Icons from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { X, ShieldCheck } from 'lucide-react'

import { navByRole, roleLabels } from '@/config/navigation'
import { roleMeta, accentClasses } from '@/config/roleUi'
import { useAuth } from '@/context/AuthContext'

function BuildOsLogo() {
  return (
    <img
      src="/images/BuildOs.png"
      alt="Build OS"
      className="h-9 w-auto max-w-[150px] object-contain object-left"
    />
  )
}

function RoleBadge() {
  const { role } = useAuth()
  const meta = roleMeta[role]
  const accent = accentClasses[meta.accent]

  return (
    <div
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] ${accent.active}`}
    >
      <meta.icon
        size={11}
        className={accent.icon}
        strokeWidth={2.25}
        aria-hidden="true"
      />

      <span>{roleLabels[role]}</span>
    </div>
  )
}

function SidebarContent({
  onNavigate,
}: {
  onNavigate?: () => void
}) {
  const { role } = useAuth()
  const items = navByRole[role]

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <nav
        aria-label="Primary navigation"
        className="
          flex-1
          space-y-1
          overflow-y-auto
          px-3
          py-4
          [scrollbar-width:thin]
          [scrollbar-color:rgba(15,23,42,0.15)_transparent]
        "
      >
        {items.map((item) => {
          const Icon =
            (Icons[item.icon as keyof typeof Icons] as LucideIcon) ??
            Icons.Circle

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path.split('/').length === 3}
              onClick={onNavigate}
              className={({ isActive }) =>
                `
                  group
                  relative
                  flex
                  min-h-10
                  items-center
                  gap-3
                  rounded-lg
                  py-2.5
                  pl-4
                  pr-3
                  text-[13px]
                  font-medium
                  transition-all
                  duration-150
                  ease-out
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-amber/60
                  focus-visible:ring-offset-1
                  ${
                    isActive
                      ? 'bg-ink text-paper shadow-sm'
                      : 'text-ink/65 hover:bg-ink/[0.045] hover:text-ink'
                  }
                `
              }
            >
              {({ isActive }) => (
                <>
                  {/* Active navigation indicator */}
                  <span
                    className={`
                      absolute
                      inset-y-2
                      left-0
                      w-0.5
                      rounded-full
                      bg-amber
                      transition-opacity
                      duration-150
                      ${
                        isActive
                          ? 'opacity-100'
                          : 'opacity-0'
                      }
                    `}
                    aria-hidden="true"
                  />

                  {/* Icon */}
                  <span
                    className={`
                      flex
                      h-5
                      w-5
                      shrink-0
                      items-center
                      justify-center
                      transition-colors
                      ${
                        isActive
                          ? 'text-amber'
                          : 'text-ink/35 group-hover:text-ink/65'
                      }
                    `}
                  >
                    <Icon
                      size={17}
                      strokeWidth={isActive ? 2.25 : 2}
                      aria-hidden="true"
                    />
                  </span>

                  {/* Label */}
                  <span className="min-w-0 truncate">
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          )
        })}
      </nav>

      {/* Trust / escrow status */}
      <div className="border-t border-line p-4">
        <div className="rounded-xl border border-teal/10 bg-teal-light px-3.5 py-3.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-teal">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/70">
              <ShieldCheck
                size={14}
                strokeWidth={2.25}
                aria-hidden="true"
              />
            </span>

            <span>Escrow protected</span>
          </div>

          <p className="mt-2 pl-8 text-[11px] leading-relaxed text-teal/75">
            All funds are held securely until milestones are verified.
          </p>
        </div>
      </div>
    </div>
  )
}

function BrandHeader() {
  return (
    <header className="shrink-0 border-b border-line">
      <div className="flex h-[68px] items-center justify-between gap-3 px-5">
        <BuildOsLogo />

        <RoleBadge />
      </div>
    </header>
  )
}

function MobileBrandHeader({
  onClose,
}: {
  onClose?: () => void
}) {
  return (
    <header className="shrink-0 border-b border-line">
      <div className="flex h-[68px] items-center justify-between gap-3 pl-5 pr-3">
        <BuildOsLogo />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close navigation menu"
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-lg
            text-ink/50
            transition-colors
            hover:bg-ink/5
            hover:text-ink
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-amber/60
            focus-visible:ring-offset-1
          "
        >
          <X size={18} strokeWidth={2} />
        </button>
      </div>
    </header>
  )
}

export function Sidebar({
  mobileOpen = false,
  onMobileClose,
}: {
  mobileOpen?: boolean
  onMobileClose?: () => void
}) {
  useEffect(() => {
    if (!mobileOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onMobileClose?.()
      }
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [mobileOpen, onMobileClose])

  return (
    <>
      {/* =========================================================
          DESKTOP SIDEBAR
          ========================================================= */}
      <aside
        aria-label="Application sidebar"
        className="
          hidden
          h-screen
          w-64
          shrink-0
          flex-col
          border-r
          border-line
          bg-white
          lg:flex
        "
      >
        <BrandHeader />

        <SidebarContent />
      </aside>

      {/* =========================================================
          MOBILE SIDEBAR / DRAWER
          ========================================================= */}
      <div
        className={`
          fixed
          inset-0
          z-50
          lg:hidden
          ${
            mobileOpen
              ? 'pointer-events-auto'
              : 'pointer-events-none'
          }
        `}
        aria-hidden={!mobileOpen}
      >
        {/* Backdrop */}
        <div
          className={`
            absolute
            inset-0
            bg-ink/40
            backdrop-blur-[2px]
            transition-opacity
            duration-200
            ${
              mobileOpen
                ? 'opacity-100'
                : 'opacity-0'
            }
          `}
          onClick={onMobileClose}
          aria-hidden="true"
        />

        {/* Drawer */}
        <aside
          aria-label="Mobile application sidebar"
          className={`
            absolute
            inset-y-0
            left-0
            flex
            w-[280px]
            max-w-[86vw]
            flex-col
            bg-white
            shadow-2xl
            transition-transform
            duration-200
            ease-out
            ${
              mobileOpen
                ? 'translate-x-0'
                : '-translate-x-full'
            }
          `}
        >
          <MobileBrandHeader
            onClose={onMobileClose}
          />

          <SidebarContent
            onNavigate={onMobileClose}
          />
        </aside>
      </div>
    </>
  )
}