import type { ReactNode } from 'react'
import { Link, NavLink } from 'react-router-dom'
import {
  BadgeCheck,
  BarChart3,
  ChevronRight,
  FileText,
  FolderKanban,
  Landmark,
  LayoutDashboard,
  Scale,
  ShieldCheck,
  ShoppingCart,
  Store,
  Users,
} from 'lucide-react'

interface AdminLayoutProps {
  title: string
  children: ReactNode
}

const NAV_ITEMS = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/verification', label: 'Verification', icon: BadgeCheck },
  { to: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { to: '/admin/marketplace', label: 'Marketplace', icon: Store },
  { to: '/admin/procurement', label: 'Procurement', icon: ShoppingCart },
  { to: '/admin/escrow', label: 'Escrow', icon: Landmark },
  { to: '/admin/disputes', label: 'Disputes', icon: Scale },
  { to: '/admin/compliance', label: 'Compliance', icon: ShieldCheck },
  { to: '/admin/reports', label: 'Reports', icon: FileText },
  { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
]

const navClass = ({
  isActive,
}: {
  isActive: boolean
}) =>
  [
    'group relative flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all duration-200',
    'outline-none focus-visible:ring-2 focus-visible:ring-[#1657FF] focus-visible:ring-offset-2',
    isActive
      ? 'bg-[#F1F5FF] text-[#1657FF]'
      : 'text-[#0B1220]/55 hover:bg-[#F7F8FA] hover:text-[#0B1220]',
  ].join(' ')

function BuildOsLogo() {
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#0B1220] shadow-sm">
      <img
        src="/images/BuildOs.png"
        alt=""
        className="h-[19px] w-[19px] object-contain"
      />
    </div>
  )
}

function SidebarNavigation() {
  return (
    <nav
      className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 pb-6"
      aria-label="Admin"
    >
      {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={navClass}
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-[#1657FF]"
                />
              )}

              <Icon
                size={17}
                strokeWidth={isActive ? 2 : 1.8}
                className={
                  isActive
                    ? 'text-[#1657FF]'
                    : 'text-[#0B1220]/35 transition-colors group-hover:text-[#0B1220]/60'
                }
              />

              <span className="truncate">{label}</span>

              {isActive && (
                <ChevronRight
                  size={14}
                  strokeWidth={1.8}
                  className="ml-auto text-[#1657FF]/50"
                />
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}

function Sidebar() {
  return (
    <aside className="hidden w-[264px] shrink-0 border-r border-[#E7EAF0] bg-white lg:flex lg:flex-col">
      {/* Brand */}
      <div className="flex h-[72px] shrink-0 items-center border-b border-[#ECEEF2] px-5">
        <Link
          to="/"
          className="group flex items-center gap-3 rounded-lg outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-[#1657FF] focus-visible:ring-offset-2"
          aria-label="Build OS home"
        >
          <BuildOsLogo />

          <div className="flex flex-col">
            <span className="font-display text-[15px] font-bold leading-none tracking-[-0.02em] text-[#0B1220]">
              Build OS
            </span>

            <span className="mt-1 font-mono text-[8px] font-medium uppercase tracking-[0.17em] text-[#0B1220]/30">
              Built environment OS
            </span>
          </div>
        </Link>
      </div>

      {/* Workspace identity */}
      <div className="px-4 pb-4 pt-5">
        <div className="rounded-2xl border border-[#E8EBF0] bg-[#FAFBFC] p-3.5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0B1220]">
              <ShieldCheck
                size={17}
                strokeWidth={1.8}
                className="text-white"
              />
            </div>

            <div className="min-w-0">
              <p className="truncate text-[12px] font-semibold text-[#0B1220]">
                Administration
              </p>

              <div className="mt-1 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#1657FF]" />

                <span className="font-mono text-[8px] font-medium uppercase tracking-[0.13em] text-[#0B1220]/35">
                  Control centre
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation label */}
      <div className="px-5 pb-2">
        <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.17em] text-[#0B1220]/30">
          Workspace
        </p>
      </div>

      <SidebarNavigation />

      {/* Sidebar footer */}
      <div className="border-t border-[#ECEEF2] px-4 py-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[8px] font-medium uppercase tracking-[0.13em] text-[#0B1220]/25">
            Build OS
          </span>

          <span className="font-mono text-[8px] font-medium uppercase tracking-[0.13em] text-[#0B1220]/25">
            v1.0
          </span>
        </div>
      </div>
    </aside>
  )
}

function MobileNavigation() {
  return (
    <nav
      className="scrollbar-none flex gap-1 overflow-x-auto border-b border-[#E7EAF0] bg-white px-3 py-2.5 lg:hidden"
      aria-label="Admin"
    >
      {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={navClass}
        >
          {({ isActive }) => (
            <>
              <Icon
                size={15}
                strokeWidth={isActive ? 2 : 1.8}
                className={
                  isActive
                    ? 'text-[#1657FF]'
                    : 'text-[#0B1220]/35'
                }
              />

              <span>{label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}

export function AdminLayout({
  title,
  children,
}: AdminLayoutProps) {
  return (
    <div className="min-h-screen w-full bg-[#F7F8FA] text-[#0B1220]">
      <div className="flex min-h-screen">
        {/* Desktop sidebar */}
        <Sidebar />

        {/* Main workspace */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* ─────────────────────────────────────────
              HEADER
          ───────────────────────────────────────── */}

          <header className="sticky top-0 z-30 border-b border-[#E7EAF0] bg-white/95 backdrop-blur-xl">
            <div className="flex h-[72px] items-center justify-between gap-6 px-5 sm:px-8 xl:px-10">
              {/* Page identity */}
              <div className="min-w-0">
                <div className="mb-1 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#1657FF]" />

                  <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-[#0B1220]/35">
                    Administration
                  </span>
                </div>

                <h1 className="truncate font-display text-[20px] font-semibold tracking-[-0.025em] text-[#0B1220] sm:text-[23px]">
                  {title}
                </h1>
              </div>

              {/* Header status */}
              <div className="hidden items-center gap-4 sm:flex">
                <div className="flex items-center gap-2 rounded-full border border-[#E7EAF0] bg-[#FAFBFC] px-3 py-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#1657FF]" />

                  <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.13em] text-[#0B1220]/40">
                    System operational
                  </span>
                </div>

                <Link
                  to="/"
                  className="flex items-center gap-1.5 text-[12px] font-medium text-[#0B1220]/45 transition-colors hover:text-[#1657FF]"
                >
                  View platform
                  <ChevronRight size={13} />
                </Link>
              </div>
            </div>
          </header>

          {/* Mobile / tablet navigation */}
          <MobileNavigation />

          {/* ─────────────────────────────────────────
              CONTENT
          ───────────────────────────────────────── */}

          <main className="flex-1 px-5 py-6 sm:px-8 sm:py-8 xl:px-10 xl:py-9">
            <div className="mx-auto w-full max-w-[1680px]">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}