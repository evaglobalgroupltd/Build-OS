import type { ReactNode } from 'react'
import { DashboardLayout } from './DashboardLayout'

interface AdminLayoutProps {
  title: string
  children: ReactNode
}

/**
 * Administrative application shell.
 *
 * Admin currently uses the shared DashboardLayout so the application
 * maintains a consistent navigation and responsive experience across roles.
 *
 * Keeping this as a dedicated wrapper makes the admin experience easy to
 * evolve independently later without changing individual admin pages.
 */
export function AdminLayout({
  title,
  children,
}: AdminLayoutProps) {
  return (
    <DashboardLayout title={title}>
      <div className="w-full">
        {children}
      </div>
    </DashboardLayout>
  )
}