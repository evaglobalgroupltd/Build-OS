import { NavLink } from 'react-router-dom'
import * as Icons from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { X } from 'lucide-react'
import { navByRole, roleLabels } from '@/config/navigation'
import { useAuth } from '@/context/AuthContext'

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const { role } = useAuth()
  const items = navByRole[role]

  return (
    <>
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
        {items.map((item) => {
          const Icon = (Icons[item.icon as keyof typeof Icons] as LucideIcon) ?? Icons.Circle
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path.split('/').length === 3}
              onClick={onNavigate}
              className={({ isActive }) =>
                `flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-ink text-paper'
                    : 'text-ink/65 hover:bg-ink/5 hover:text-ink'
                }`
              }
            >
              <Icon size={16} />
              {item.label}
            </NavLink>
          )
        })}
      </nav>

      <div className="border-t border-line p-4">
        <div className="rounded-md bg-teal-light px-3 py-2.5 text-xs text-teal">
          <p className="font-semibold">Escrow protected</p>
          <p className="mt-0.5 text-teal/80">All funds held until milestones are verified.</p>
        </div>
      </div>
    </>
  )
}

function BrandHeader() {
  const { role } = useAuth()
  return (
    <div className="flex h-16 items-center gap-2 border-b border-line px-5">
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-ink font-display text-sm font-bold text-amber">
        B
      </div>
      <div>
        <p className="font-display text-sm font-bold leading-none text-ink">Build OS</p>
        <p className="mt-1 text-[10px] uppercase tracking-wide text-ink/40">{roleLabels[role]}</p>
      </div>
    </div>
  )
}

export function Sidebar({ mobileOpen = false, onMobileClose }: { mobileOpen?: boolean; onMobileClose?: () => void }) {
  return (
    <>
      {/* Desktop: static sidebar, always visible at lg+ */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-line bg-white lg:flex">
        <BrandHeader />
        <SidebarContent />
      </aside>

      {/* Mobile: overlay drawer, toggled from the topbar hamburger */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${mobileOpen ? '' : 'pointer-events-none'}`}
        aria-hidden={!mobileOpen}
      >
        <div
          className={`absolute inset-0 bg-ink/40 transition-opacity duration-200 ${
            mobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={onMobileClose}
        />
        <aside
          className={`absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col bg-white shadow-xl transition-transform duration-200 ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex h-16 items-center justify-between gap-2 border-b border-line pl-5 pr-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-ink font-display text-sm font-bold text-amber">
                B
              </div>
              <span className="font-display text-sm font-bold text-ink">Build OS</span>
            </div>
            <button
              onClick={onMobileClose}
              aria-label="Close menu"
              className="flex h-9 w-9 items-center justify-center rounded-md text-ink/50 hover:bg-ink/5"
            >
              <X size={18} />
            </button>
          </div>
          <SidebarContent onNavigate={onMobileClose} />
        </aside>
      </div>
    </>
  )
}
