import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
  type UIEvent,
} from 'react'
import { useLocation } from 'react-router-dom'

import { Sidebar } from './components/Sidebar'
import { Topbar } from './components/Topbar'
interface DashboardLayoutProps {
  title: string
  /** Page-level controls shown in the topbar, before the account menu. */
  actions?: ReactNode
  /** Shows the topbar search trigger and binds Cmd/Ctrl + K. Omit to hide search. */
  onSearchClick?: () => void
  children: ReactNode
}

export function DashboardLayout({
  title,
  actions,
  onSearchClick,
  children,
}: DashboardLayoutProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const mainRef = useRef<HTMLElement | null>(null)
  const { pathname, hash } = useLocation()

  const openMobileNav = useCallback(() => setMobileNavOpen(true), [])
  const closeMobileNav = useCallback(() => setMobileNavOpen(false), [])

  // On navigation: close the drawer, then either jump to the #anchor inside
  // the page or start from the top. A layout effect runs before paint, so the
  // previous page's scroll position is never visible.
  useLayoutEffect(() => {
    setMobileNavOpen(false)

    const main = mainRef.current
    if (!main) return

    const anchor = hash ? document.getElementById(hash.slice(1)) : null

    if (anchor && main.contains(anchor)) {
      anchor.scrollIntoView({ block: 'start' })
    } else {
      main.scrollTo({ top: 0, behavior: 'instant' })
    }

    setScrolled(main.scrollTop > 10)
  }, [pathname, hash])

  // Small hysteresis so the topbar doesn't flicker around the threshold.
  const handleScroll = (event: UIEvent<HTMLElement>) => {
    const top = event.currentTarget.scrollTop
    setScrolled((previous) => (previous ? top > 2 : top > 10))
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F5F5F2] text-ink antialiased [@supports(height:100dvh)]:h-[100dvh]">
      <a
        href="#main-content"
        className="
          sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5
          focus:z-[100] focus:rounded-xl focus:bg-ink focus:px-4
          focus:py-2.5 focus:text-sm focus:font-medium focus:text-white
          focus:shadow-[0_14px_34px_-14px_rgba(11,18,32,0.5)]
          focus:outline-none focus:ring-2 focus:ring-amber/70
          focus:ring-offset-2
        "
      >
        Skip to content
      </a>

      <Sidebar mobileOpen={mobileNavOpen} onMobileClose={closeMobileNav} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          title={title}
          actions={actions}
          onSearchClick={onSearchClick}
          onMenuClick={openMobileNav}
          elevated={scrolled}
        />

        <main
          id="main-content"
          ref={mainRef}
          tabIndex={-1}
          onScroll={handleScroll}
          className="
            min-h-0 flex-1 overflow-y-auto overscroll-contain outline-none
            [scrollbar-color:rgba(11,18,32,0.16)_transparent]
            [scrollbar-width:thin]
          "
        >
          {/* Same max-width and gutters as the topbar's inner row, so their edges align. */}
          <div className="mx-auto w-full max-w-[1680px] px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-6 sm:px-6 sm:pb-8 sm:pt-8 lg:px-10 lg:pb-10 lg:pt-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}