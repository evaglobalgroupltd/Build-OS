import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import {
  ArrowUpRight,
  Menu,
  ShieldCheck,
  X,
} from 'lucide-react'

interface PublicLayoutProps {
  children: ReactNode
}

const navLinks = [
  { to: '/how-it-works', label: 'How it works' },
  { to: '/who-its-for', label: "Who it's for" },
  { to: '/trust-security', label: 'Trust & security' },
]

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1657FF]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F8FA]'

/* -------------------------------------------------------------------------- */
/* Brand                                                                      */
/* -------------------------------------------------------------------------- */

function Brand({ size = 'md' }: { size?: 'md' | 'sm' }) {
  const isSmall = size === 'sm'

  return (
    <Link
      to="/"
      aria-label="Build OS home"
      className={`
        group inline-flex shrink-0 items-center
        gap-2.5 rounded-xl
        ${focusRing}
      `}
    >
      <span
        className="
          flex shrink-0 items-center justify-center
          rounded-xl
          bg-white
          shadow-[0_6px_18px_-10px_rgba(15,23,42,0.35)]
          ring-1 ring-black/[0.05]
        "
      >
        <img
          src="/images/BuildOs.png"
          alt=""
          className={`
            object-contain
            transition-transform duration-300
            motion-reduce:transition-none
            motion-safe:group-hover:scale-[1.04]
            ${isSmall ? 'h-8 w-8' : 'h-9 w-9'}
          `}
        />
      </span>

      <span
        className={`
          font-display font-bold
          tracking-[-0.025em]
          text-[#0B1220]
          ${isSmall ? 'text-[15px]' : 'text-base sm:text-[17px]'}
        `}
      >
        Build OS
      </span>
    </Link>
  )
}

/* -------------------------------------------------------------------------- */
/* Desktop navigation                                                         */
/* -------------------------------------------------------------------------- */

function DesktopNavigation() {
  return (
    <nav
      aria-label="Main navigation"
      className="hidden items-center gap-8 lg:flex"
    >
      {navLinks.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            [
              'group relative rounded-lg px-1 py-2',
              'text-[13px] font-medium',
              'transition-colors duration-200',
              focusRing,
              isActive
                ? 'text-[#0B1220]'
                : 'text-[#0B1220]/50 hover:text-[#0B1220]',
            ].join(' ')
          }
        >
          {({ isActive }) => (
            <>
              {link.label}

              <span
                aria-hidden="true"
                className={`
                  absolute
                  bottom-0.5
                  left-1
                  right-1
                  h-[2px]
                  origin-center
                  rounded-full
                  bg-[#1657FF]
                  transition-transform
                  duration-200
                  ${isActive ? 'scale-x-100' : 'scale-x-0'}
                `}
              />
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}

/* -------------------------------------------------------------------------- */
/* Header actions                                                             */
/* -------------------------------------------------------------------------- */

function HeaderActions({
  onMenuClick,
}: {
  onMenuClick: () => void
}) {
  return (
    <div className="flex items-center gap-2.5 sm:gap-3">
      <Link
        to="/login"
        className={`
          hidden
          rounded-xl
          px-3.5
          py-2.5
          text-[13px]
          font-medium
          text-[#0B1220]/60
          transition-colors
          hover:bg-black/[0.035]
          hover:text-[#0B1220]
          sm:inline-flex
          ${focusRing}
        `}
      >
        Log in
      </Link>

      <Link
        to="/get-started"
        className={`
          group
          inline-flex
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-[#0B1220]
          px-4
          py-2.5
          text-[13px]
          font-semibold
          text-white
          shadow-[0_10px_24px_-14px_rgba(11,18,32,0.65)]
          transition-all
          duration-200
          hover:-translate-y-0.5
          hover:bg-[#1657FF]
          hover:shadow-[0_14px_28px_-14px_rgba(22,87,255,0.55)]
          motion-reduce:transition-none
          ${focusRing}
        `}
      >
        <span className="hidden sm:inline">
          Start a project
        </span>

        <span className="sm:hidden">
          Get started
        </span>

        <ArrowUpRight
          size={15}
          strokeWidth={2}
          className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      </Link>

      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open menu"
        className={`
          flex h-10 w-10
          items-center justify-center
          rounded-xl
          text-[#0B1220]/60
          transition-colors
          hover:bg-black/[0.035]
          hover:text-[#0B1220]
          lg:hidden
          ${focusRing}
        `}
      >
        <Menu
          size={20}
          strokeWidth={1.9}
          aria-hidden="true"
        />
      </button>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Mobile navigation                                                          */
/* -------------------------------------------------------------------------- */

function MobileMenu({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  return (
    <div
      className={`
        absolute inset-x-0 top-full
        border-b border-black/[0.06]
        bg-white/95
        shadow-[0_28px_60px_-32px_rgba(15,23,42,0.35)]
        backdrop-blur-2xl
        transition-[opacity,transform,visibility]
        duration-250
        ease-out
        lg:hidden
        ${
          open
            ? 'visible translate-y-0 opacity-100'
            : 'invisible -translate-y-2 opacity-0'
        }
      `}
    >
      <div className="mx-auto w-full max-w-7xl px-5 pb-5 pt-3 sm:px-7">
        <nav
          aria-label="Mobile navigation"
          className="space-y-1"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={onClose}
              className={({ isActive }) =>
                [
                  'group relative flex min-h-12 items-center',
                  'rounded-xl px-4',
                  'text-[14px] font-medium',
                  'transition-colors duration-200',
                  focusRing,
                  isActive
                    ? 'bg-[#F1F5FF] text-[#1657FF]'
                    : 'text-[#0B1220]/60 hover:bg-black/[0.03] hover:text-[#0B1220]',
                ].join(' ')
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="
                        absolute
                        left-1.5
                        top-1/2
                        h-5
                        w-[3px]
                        -translate-y-1/2
                        rounded-r-full
                        bg-[#1657FF]
                      "
                    />
                  )}

                  {link.label}

                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="
                        ml-auto
                        h-1.5
                        w-1.5
                        rounded-full
                        bg-[#1657FF]
                      "
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="mt-4 grid grid-cols-2 gap-2.5 border-t border-black/[0.055] pt-4">
          <Link
            to="/login"
            onClick={onClose}
            className={`
              flex min-h-11
              items-center justify-center
              rounded-xl
              border border-black/[0.07]
              bg-white
              text-[13px]
              font-medium
              text-[#0B1220]/70
              transition-colors
              hover:bg-black/[0.025]
              hover:text-[#0B1220]
              ${focusRing}
            `}
          >
            Log in
          </Link>

          <Link
            to="/get-started"
            onClick={onClose}
            className={`
              flex min-h-11
              items-center justify-center
              rounded-xl
              bg-[#0B1220]
              text-[13px]
              font-semibold
              text-white
              transition-colors
              hover:bg-[#1657FF]
              ${focusRing}
            `}
          >
            Start a project
          </Link>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Footer                                                                     */
/* -------------------------------------------------------------------------- */

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-black/[0.055] bg-white">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-7 lg:px-10">
        <div className="grid gap-12 py-14 md:grid-cols-[1.2fr_1fr] lg:py-16">
          {/* Brand */}
          <div className="max-w-md">
            <Brand size="sm" />

            <p className="mt-5 max-w-sm text-[13px] leading-6 text-[#0B1220]/50">
              Build OS provides a trusted digital infrastructure
              for managing property development, procurement,
              contractors, milestones and payments.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#F5F8FF] px-3 py-1.5 text-[11px] font-medium text-[#1657FF]">
              <ShieldCheck
                size={14}
                strokeWidth={2}
                aria-hidden="true"
              />

              Verified project infrastructure
            </div>
          </div>

          {/* Links */}
          <div className="md:justify-self-end">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0B1220]/30">
              Explore
            </p>

            <nav
              aria-label="Footer navigation"
              className="mt-4 grid gap-x-10 gap-y-3 sm:grid-cols-2"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`
                    w-fit
                    rounded-md
                    text-[13px]
                    font-medium
                    text-[#0B1220]/55
                    transition-colors
                    hover:text-[#1657FF]
                    ${focusRing}
                  `}
                >
                  {link.label}
                </Link>
              ))}

              <Link
                to="/login"
                className={`
                  w-fit
                  rounded-md
                  text-[13px]
                  font-medium
                  text-[#0B1220]/55
                  transition-colors
                  hover:text-[#1657FF]
                  ${focusRing}
                `}
              >
                Log in
              </Link>

              <Link
                to="/get-started"
                className={`
                  w-fit
                  rounded-md
                  text-[13px]
                  font-medium
                  text-[#0B1220]/55
                  transition-colors
                  hover:text-[#1657FF]
                  ${focusRing}
                `}
              >
                Start a project
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="
          flex
          flex-col
          gap-4
          border-t
          border-black/[0.055]
          py-6
          sm:flex-row
          sm:items-center
          sm:justify-between
        ">
          <p className="text-[11px] text-[#0B1220]/35 sm:text-xs">
            © {currentYear} Build OS. All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-[11px] font-medium text-[#0B1220]/45 sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

            Payments protected through milestone-based escrow
          </div>
        </div>
      </div>
    </footer>
  )
}

/* -------------------------------------------------------------------------- */
/* Public layout                                                              */
/* -------------------------------------------------------------------------- */

export function PublicLayout({
  children,
}: PublicLayoutProps) {
  const location = useLocation()
  const headerRef = useRef<HTMLElement | null>(null)

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    setMenuOpen(false)

    if (!location.hash) {
      window.scrollTo({
        top: 0,
        behavior: 'instant',
      })
    }
  }, [location.pathname, location.hash])

  useEffect(() => {
    if (!menuOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    document.addEventListener(
      'mousedown',
      handleClickOutside,
    )

    window.addEventListener(
      'keydown',
      handleKeyDown,
    )

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside,
      )

      window.removeEventListener(
        'keydown',
        handleKeyDown,
      )
    }
  }, [menuOpen])

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F8FA] text-[#0B1220]">
      {/* Accessibility */}
      <a
        href="#main-content"
        className="
          sr-only
          focus:not-sr-only
          focus:fixed
          focus:left-5
          focus:top-5
          focus:z-[100]
          focus:rounded-xl
          focus:bg-[#0B1220]
          focus:px-4
          focus:py-2.5
          focus:text-sm
          focus:font-medium
          focus:text-white
          focus:shadow-xl
        "
      >
        Skip to content
      </a>

      {/* ------------------------------------------------------------------ */}
      {/* Header                                                             */}
      {/* ------------------------------------------------------------------ */}

      <header
        ref={headerRef}
        className={`
          sticky
          top-0
          z-50
          border-b
          backdrop-blur-2xl
          transition-all
          duration-300
          motion-reduce:transition-none
          ${
            scrolled
              ? `
                border-black/[0.07]
                bg-white/90
                shadow-[0_16px_42px_-30px_rgba(15,23,42,0.3)]
              `
              : `
                border-black/[0.04]
                bg-[#F7F8FA]/75
              `
          }
        `}
      >
        <div className="
          mx-auto
          flex
          h-[72px]
          w-full
          max-w-7xl
          items-center
          justify-between
          px-5
          sm:px-7
          lg:grid
          lg:grid-cols-[1fr_auto_1fr]
          lg:px-10
        ">
          {/* Brand */}
          <div className="lg:justify-self-start">
            <Brand />
          </div>

          {/* Desktop navigation */}
          <DesktopNavigation />

          {/* Actions */}
          <div className="lg:justify-self-end">
            <HeaderActions
              onMenuClick={() =>
                setMenuOpen((open) => !open)
              }
            />
          </div>
        </div>

        {/* Mobile navigation */}
        <MobileMenu
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
        />
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* Main                                                               */}
      {/* ------------------------------------------------------------------ */}

      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 outline-none"
      >
        {children}
      </main>

      {/* ------------------------------------------------------------------ */}
      {/* Footer                                                             */}
      {/* ------------------------------------------------------------------ */}

      <Footer />
    </div>
  )
}