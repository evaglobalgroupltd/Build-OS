import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  UserCircle,
} from 'lucide-react'

import { useAuth } from '@/context/AuthContext'
import { roleLabels } from '@/config/navigation'
import { roleMeta, accentClasses, roleOrder } from '@/config/roleUi'
import type { UserRole } from '@/types'
import { Badge } from '@/components/ui/Badge'

interface AppHeaderProps {
  title: string
  onMenuClick?: () => void
}

function VerificationBadge({
  status,
}: {
  status: string
}) {
  if (status === 'verified') {
    return <Badge tone="teal">Verified</Badge>
  }

  return (
    <Badge tone="amber">
      {status.replace('_', ' ')}
    </Badge>
  )
}

function RolePreview({
  role,
  onRoleChange,
}: {
  role: UserRole
  onRoleChange: (role: UserRole) => void
}) {
  const activeMeta = roleMeta[role]
  const activeAccent = accentClasses[activeMeta.accent]

  return (
    <div
      className={`
        hidden
        items-center
        gap-2
        rounded-lg
        border
        px-2.5
        py-1.5
        md:flex
        ${activeAccent.active}
        border-current/15
      `}
    >
      <span
        className="
          flex
          h-6
          w-6
          shrink-0
          items-center
          justify-center
          rounded-md
          bg-white/60
        "
      >
        <activeMeta.icon
          size={13}
          className={activeAccent.icon}
          strokeWidth={2.25}
          aria-hidden="true"
        />
      </span>

      <div className="flex items-center gap-1.5">
        <span className="text-[9px] font-semibold uppercase tracking-[0.08em] text-ink/40">
          Role
        </span>

        <select
          aria-label="Select preview role"
          value={role}
          onChange={(event) =>
            onRoleChange(event.target.value as UserRole)
          }
          className="
            cursor-pointer
            bg-transparent
            text-xs
            font-semibold
            text-ink
            outline-none
          "
        >
          {roleOrder.map((itemRole) => (
            <option key={itemRole} value={itemRole}>
              {roleLabels[itemRole]}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

function NotificationButton() {
  return (
    <button
      type="button"
      aria-label="Notifications"
      className="
        relative
        flex
        h-9
        w-9
        shrink-0
        items-center
        justify-center
        rounded-lg
        text-ink/55
        transition-all
        duration-150
        hover:bg-ink/5
        hover:text-ink
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-amber/60
        focus-visible:ring-offset-1
      "
    >
      <Bell
        size={18}
        strokeWidth={1.9}
        aria-hidden="true"
      />

      {/* Unread indicator */}
      <span
        className="
          absolute
          right-[7px]
          top-[6px]
          h-1.5
          w-1.5
          rounded-full
          bg-brick
          ring-2
          ring-white
        "
        aria-hidden="true"
      />
    </button>
  )
}

export function AppHeader({
  title,
  onMenuClick,
}: AppHeaderProps) {
  const navigate = useNavigate()
  const { user, role, setRole } = useAuth()

  const [menuOpen, setMenuOpen] = useState(false)

  const menuRef = useRef<HTMLDivElement | null>(null)

  const activeMeta = roleMeta[role]
  const activeAccent = accentClasses[activeMeta.accent]

  useEffect(() => {
    if (!menuOpen) return

    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
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

  function handleLogOut() {
    setMenuOpen(false)

    // Demo-only:
    // Replace with authService.logOut() once the
    // real authentication/session layer is connected.
    navigate('/login')
  }

  return (
    <header
      className="
        sticky
        top-0
        z-30
        flex
        h-16
        shrink-0
        items-center
        justify-between
        border-b
        border-line
        bg-white/95
        px-4
        backdrop-blur-sm
        sm:px-6
      "
    >
      {/* =====================================================
          LEFT — MOBILE MENU + PAGE CONTEXT
          ===================================================== */}
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-lg
            text-ink/55
            transition-all
            duration-150
            hover:bg-ink/5
            hover:text-ink
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-amber/60
            focus-visible:ring-offset-1
            lg:hidden
          "
        >
          <Menu
            size={19}
            strokeWidth={2}
            aria-hidden="true"
          />
        </button>

        <div className="min-w-0">
          <h1
            className="
              truncate
              font-display
              text-base
              font-semibold
              tracking-[-0.01em]
              text-ink
              sm:text-lg
            "
          >
            {title}
          </h1>
        </div>
      </div>

      {/* =====================================================
          RIGHT — ROLE / NOTIFICATIONS / ACCOUNT
          ===================================================== */}
      <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
        {/* Demo role switcher */}
        <RolePreview
          role={role}
          onRoleChange={setRole}
        />

        {/* Divider */}
        <div
          className="hidden h-6 w-px bg-line md:block"
          aria-hidden="true"
        />

        {/* Notifications */}
        <NotificationButton />

        {/* Account */}
        <div
          ref={menuRef}
          className="
            relative
            border-l
            border-line
            pl-1.5
            sm:pl-3
          "
        >
          <button
            type="button"
            onClick={() =>
              setMenuOpen((open) => !open)
            }
            aria-expanded={menuOpen}
            aria-haspopup="menu"
            className="
              group
              flex
              items-center
              gap-2
              rounded-lg
              py-1
              pl-1
              pr-1
              transition-colors
              hover:bg-ink/5
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-amber/60
              focus-visible:ring-offset-1
              sm:gap-2.5
              sm:pr-1.5
            "
          >
            {/* Avatar */}
            <div
              className="
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-amber/15
                font-mono
                text-[11px]
                font-bold
                text-amber-dark
                ring-1
                ring-amber/10
              "
            >
              {user.avatarInitials}
            </div>

            {/* User information */}
            <div className="hidden min-w-0 text-left sm:block">
              <p
                className="
                  max-w-[150px]
                  truncate
                  text-xs
                  font-semibold
                  leading-none
                  text-ink
                "
              >
                {user.fullName}
              </p>

              <div className="mt-1.5">
                <VerificationBadge
                  status={user.verificationStatus}
                />
              </div>
            </div>

            {/* Dropdown indicator */}
            <ChevronDown
              size={14}
              strokeWidth={2}
              className={`
                hidden
                text-ink/35
                transition-transform
                duration-150
                sm:block
                ${
                  menuOpen
                    ? 'rotate-180'
                    : ''
                }
              `}
              aria-hidden="true"
            />
          </button>

          {/* =================================================
              ACCOUNT MENU
              ================================================= */}
          {menuOpen && (
            <div
              role="menu"
              aria-label="Account menu"
              className="
                absolute
                right-0
                top-full
                z-50
                mt-2
                w-60
                overflow-hidden
                rounded-xl
                border
                border-line
                bg-white
                shadow-xl
                shadow-ink/10
              "
            >
              {/* Mobile user summary */}
              <div
                className="
                  border-b
                  border-line
                  px-4
                  py-3.5
                  sm:hidden
                "
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-amber/15
                      font-mono
                      text-xs
                      font-bold
                      text-amber-dark
                    "
                  >
                    {user.avatarInitials}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-ink">
                      {user.fullName}
                    </p>

                    <div className="mt-1">
                      <VerificationBadge
                        status={user.verificationStatus}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Current role */}
              <div
                className="
                  flex
                  items-center
                  gap-2
                  border-b
                  border-line
                  px-4
                  py-3
                "
              >
                <span
                  className={`
                    flex
                    h-6
                    w-6
                    items-center
                    justify-center
                    rounded-md
                    ${activeAccent.active}
                  `}
                >
                  <activeMeta.icon
                    size={13}
                    className={activeAccent.icon}
                    strokeWidth={2.25}
                    aria-hidden="true"
                  />
                </span>

                <div className="min-w-0">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-ink/35">
                    Current role
                  </p>

                  <p className="mt-0.5 truncate text-xs font-semibold text-ink">
                    {roleLabels[role]}
                  </p>
                </div>
              </div>

              {/* Profile */}
              <div className="p-1.5">
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setMenuOpen(false)
                    // Connect to profile route when available.
                  }}
                  className="
                    flex
                    w-full
                    items-center
                    gap-2.5
                    rounded-lg
                    px-3
                    py-2.5
                    text-left
                    text-sm
                    font-medium
                    text-ink/75
                    transition-colors
                    hover:bg-ink/5
                    hover:text-ink
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-amber/60
                  "
                >
                  <UserCircle
                    size={17}
                    className="text-ink/40"
                    strokeWidth={1.9}
                    aria-hidden="true"
                  />

                  <span>View profile</span>
                </button>

                {/* Logout */}
                <button
                  type="button"
                  role="menuitem"
                  onClick={handleLogOut}
                  className="
                    mt-0.5
                    flex
                    w-full
                    items-center
                    gap-2.5
                    rounded-lg
                    border-t
                    border-line
                    px-3
                    py-2.5
                    text-left
                    text-sm
                    font-medium
                    text-brick
                    transition-colors
                    hover:bg-brick-light
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-brick/40
                  "
                >
                  <LogOut
                    size={17}
                    strokeWidth={1.9}
                    aria-hidden="true"
                  />

                  <span>Log out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

/**
 * Backwards-compatible export.
 *
 * If existing layouts still import `Topbar`, they will continue
 * to work while the application gradually moves to `AppHeader`.
 */
export const Topbar = AppHeader