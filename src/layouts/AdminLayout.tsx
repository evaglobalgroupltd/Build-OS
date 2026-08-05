import type { ReactNode } from 'react'
import { DashboardLayout } from './DashboardLayout'

/**
 * Admin currently shares the same sidebar/topbar chrome as every other role
 * (Sidebar/Topbar already adapt their nav based on the active role). This
 * wrapper exists so admin screens have their own layout to import from —
 * if the admin experience later needs a genuinely different shell (e.g. a
 * denser layout, a global search bar, a different nav pattern), only this
 * file needs to change, not every admin page.
 */
export function AdminLayout({ title, children }: { title: string; children: ReactNode }) {
  return <DashboardLayout title={title}>{children}</DashboardLayout>
}
