import { Bell, ChevronDown, Menu } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { roleLabels } from '@/config/navigation'
import type { UserRole } from '@/types'
import { Badge } from '@/components/ui/Badge'

const allRoles: UserRole[] = ['client', 'contractor', 'supplier', 'project_manager', 'professional', 'admin']

export function Topbar({ title, onMenuClick }: { title: string; onMenuClick?: () => void }) {
  const { user, role, setRole } = useAuth()

  return (
    <header className="flex h-16 items-center justify-between border-b border-line bg-white px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          aria-label="Open menu"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-ink/60 hover:bg-ink/5 lg:hidden"
        >
          <Menu size={19} />
        </button>
        <h1 className="truncate font-display text-base font-semibold text-ink sm:text-lg">{title}</h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* Demo-only: lets you preview any role's dashboard without a real login flow */}
        <div className="hidden items-center gap-2 rounded-md border border-line px-2.5 py-1.5 md:flex">
          <span className="text-[10px] font-medium uppercase tracking-wide text-ink/40">
            Preview role
          </span>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as UserRole)}
            className="bg-transparent text-xs font-medium text-ink focus:outline-none"
          >
            {allRoles.map((r) => (
              <option key={r} value={r}>
                {roleLabels[r]}
              </option>
            ))}
          </select>
        </div>

        <button className="relative flex h-9 w-9 items-center justify-center rounded-md text-ink/60 hover:bg-ink/5">
          <Bell size={17} />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-brick" />
        </button>

        <div className="flex items-center gap-2 border-l border-line pl-2 sm:pl-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber/20 font-mono text-xs font-semibold text-amber-dark">
            {user.avatarInitials}
          </div>
          <div className="hidden text-left sm:block">
            <p className="text-xs font-medium leading-none text-ink">{user.fullName}</p>
            <div className="mt-1">
              {user.verificationStatus === 'verified' ? (
                <Badge tone="teal">Verified</Badge>
              ) : (
                <Badge tone="amber">{user.verificationStatus.replace('_', ' ')}</Badge>
              )}
            </div>
          </div>
          <ChevronDown size={14} className="hidden text-ink/40 sm:block" />
        </div>
      </div>
    </header>
  )
}
