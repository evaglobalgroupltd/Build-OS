import { Component, type ErrorInfo, type ReactNode } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { AlertTriangle } from 'lucide-react'

import { DashboardLayout } from '@/layouts/DashboardLayout'

/* =============================================================================
 * HubLayout: one sidebar item, many module pages.
 *
 * The sidebar has ~10 entries per role but the modules hold 100+ pages. A "hub"
 * is a route with nested children: it renders the dashboard layout once, a tab
 * bar for its pages, and the active page below it via <Outlet />.
 *
 *   <Route path="/app/client/escrow" element={<HubLayout title="Escrow" tabs={ESCROW_TABS} />}>
 *     <Route index element={<Wallet />} />
 *     <Route path="transactions" element={<Transactions />} />
 *     <Route path="fund" element={<Funding />} />
 *   </Route>
 *
 * Module pages rendered inside a hub should NOT wrap themselves in
 * DashboardLayout (the audit shows which ones do: OWN-LAYOUT).
 * ========================================================================== */

export interface SectionTab {
  label: string
  to: string
  /** Match the path exactly. Set on the hub's index tab. */
  end?: boolean
}

export function SectionTabs({ tabs, label = 'Section' }: { tabs: SectionTab[]; label?: string }) {
  if (tabs.length === 0) return null

  return (
    <nav aria-label={label} className="mb-6 -mx-1 overflow-x-auto px-1 pb-1">
      <ul className="flex min-w-max gap-1.5 rounded-2xl border border-line bg-white p-1.5">
        {tabs.map((tab) => (
          <li key={tab.to}>
            <NavLink
              to={tab.to}
              end={tab.end}
              className={({ isActive }) =>
                `block whitespace-nowrap rounded-xl px-4 py-2 text-[12px] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/60 ${
                  isActive
                    ? 'bg-ink text-white shadow-sm'
                    : 'text-ink/55 hover:bg-ink/[0.045] hover:text-ink'
                }`
              }
            >
              {tab.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

/* ---- Error boundary: a page that throws shows a message, not a white screen ---- */

interface BoundaryState {
  error: Error | null
}

export class PageBoundary extends Component<{ children: ReactNode }, BoundaryState> {
  state: BoundaryState = { error: null }

  static getDerivedStateFromError(error: Error): BoundaryState {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[HubLayout] page failed to render:', error, info.componentStack)
  }

  render() {
    if (!this.state.error) return this.props.children

    return (
      <div role="alert" className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
          <div>
            <p className="text-sm font-semibold text-amber-900">This page couldn't be displayed</p>
            <p className="mt-1 text-xs leading-5 text-amber-900/70">
              It likely needs data or props that the route doesn't provide yet. Check the browser
              console for details. The rest of your workspace is unaffected.
            </p>
            <p className="mt-2 font-mono text-[11px] text-amber-900/60">{this.state.error.message}</p>
          </div>
        </div>
      </div>
    )
  }
}

export function HubLayout({ title, tabs, label }: { title: string; tabs: SectionTab[]; label?: string }) {
  const { pathname } = useLocation()

  return (
    <DashboardLayout title={title}>
      <SectionTabs tabs={tabs} label={label ?? `${title} sections`} />
      {/* key resets the boundary when you navigate to another tab */}
      <PageBoundary key={pathname}>
        <Outlet />
      </PageBoundary>
    </DashboardLayout>
  )
}