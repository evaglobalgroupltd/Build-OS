import { useEffect, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { Sidebar } from './components/Sidebar'
import { Topbar } from './components/Topbar'

interface DashboardLayoutProps {
  title: string
  children: ReactNode
}

export function DashboardLayout({
  title,
  children,
}: DashboardLayoutProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMobileNavOpen(false)
  }, [location.pathname])

  return (
    <div className="flex min-h-screen w-full overflow-hidden bg-paper-2">
      {/* Sidebar */}
      <Sidebar
        mobileOpen={mobileNavOpen}
        onMobileClose={() => setMobileNavOpen(false)}
      />

      {/* Main application area */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top navigation */}
        <Topbar
          title={title}
          onMenuClick={() => setMobileNavOpen(true)}
        />

        {/* Page content */}
        <main className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1600px] px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}