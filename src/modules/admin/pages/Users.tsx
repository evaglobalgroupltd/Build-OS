import {
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Search,
  ShieldCheck,
  UserCog,
  UsersRound,
  UserX,
} from 'lucide-react'

import { Card } from '@/components/ui/Card'

/**
 * Manage Users — Admin module
 * BRD reference: Sec. 39
 *
 * Enterprise user directory and account administration workspace.
 *
 * TODO:
 * - Connect to the users API.
 * - Add server-side search, filtering and pagination.
 * - Add user profile/detail drawer.
 * - Add role and permission management.
 * - Add account activation/deactivation controls.
 * - Add invitation workflow.
 * - Add account status and verification management.
 * - Add user activity / audit history.
 */

const userMetrics = [
  {
    label: 'Total Users',
    value: '—',
    icon: UsersRound,
  },
  {
    label: 'Active Accounts',
    value: '—',
    icon: CheckCircle2,
  },
  {
    label: 'Pending',
    value: '—',
    icon: Clock3,
  },
  {
    label: 'Suspended',
    value: '—',
    icon: UserX,
  },
]

const directoryColumns = [
  'User',
  'Role',
  'Status',
  'Last Activity',
  'Access',
]

export function Users() {
  return (
    <section className="space-y-6">
      {/* Page heading */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-3 py-1.5 shadow-sm backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-ink/60" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/55">
              Identity & Access
            </span>
          </div>

          <h1 className="text-2xl font-semibold tracking-[-0.035em] text-ink sm:text-3xl">
            Manage Users
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-ink/55">
            Manage the people, roles, account states, and access permissions
            that make up your organisation's platform environment.
          </p>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-ink/10 bg-white/70 px-3.5 py-2.5 text-xs text-ink/55 shadow-sm backdrop-blur">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Administrative access</span>
        </div>
      </div>

      {/* User metrics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {userMetrics.map((metric) => {
          const Icon = metric.icon

          return (
            <Card
              key={metric.label}
              className="group relative overflow-hidden border-ink/10 bg-white/80 p-5 shadow-[0_10px_35px_rgba(15,23,42,0.04)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/40">
                    {metric.label}
                  </p>

                  <p className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-ink">
                    {metric.value}
                  </p>
                </div>

                <div className="rounded-xl border border-ink/10 bg-ink/[0.025] p-2.5 transition-transform duration-300 group-hover:-translate-y-0.5">
                  <Icon className="h-4 w-4 text-ink/55" />
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-ink/10 to-transparent" />
            </Card>
          )
        })}
      </div>

      {/* User directory */}
      <Card className="overflow-hidden border-ink/10 bg-white/85 shadow-[0_18px_60px_rgba(15,23,42,0.055)]">
        {/* Directory header */}
        <div className="border-b border-ink/10 px-5 py-5 sm:px-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-ink/10 bg-ink/[0.035]">
                <UserCog className="h-4 w-4 text-ink/65" />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-ink">
                  User Directory
                </h2>

                <p className="mt-0.5 text-xs text-ink/45">
                  Accounts, roles and access status
                </p>
              </div>
            </div>

            {/* Search shell */}
            <div className="flex w-full max-w-sm items-center gap-2 rounded-xl border border-ink/10 bg-white px-3.5 py-2.5 opacity-60 shadow-sm">
              <Search className="h-3.5 w-3.5 shrink-0 text-ink/35" />

              <span className="text-xs text-ink/35">
                Search users by name or email
              </span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <div className="min-w-[760px]">
            {/* Table header */}
            <div className="grid grid-cols-[2fr_1.1fr_1fr_1.2fr_0.8fr] border-b border-ink/[0.07] bg-ink/[0.018] px-6 py-3">
              {directoryColumns.map((column) => (
                <div
                  key={column}
                  className="text-[9px] font-bold uppercase tracking-[0.15em] text-ink/35"
                >
                  {column}
                </div>
              ))}
            </div>

            {/* Placeholder rows */}
            {[1, 2, 3].map((row) => (
              <div
                key={row}
                className="grid grid-cols-[2fr_1.1fr_1fr_1.2fr_0.8fr] items-center border-b border-ink/[0.06] px-6 py-4 last:border-b-0"
              >
                {/* User */}
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 animate-pulse rounded-full bg-ink/[0.055]" />

                  <div className="space-y-1.5">
                    <div className="h-2.5 w-28 animate-pulse rounded-full bg-ink/[0.055]" />
                    <div className="h-2 w-36 animate-pulse rounded-full bg-ink/[0.035]" />
                  </div>
                </div>

                {/* Role */}
                <div className="h-2.5 w-20 animate-pulse rounded-full bg-ink/[0.045]" />

                {/* Status */}
                <div className="h-5 w-16 animate-pulse rounded-full bg-ink/[0.04]" />

                {/* Activity */}
                <div className="h-2.5 w-24 animate-pulse rounded-full bg-ink/[0.04]" />

                {/* Access */}
                <div className="h-2.5 w-14 animate-pulse rounded-full bg-ink/[0.04]" />
              </div>
            ))}
          </div>
        </div>

        {/* Empty infrastructure state */}
        <div className="relative overflow-hidden border-t border-ink/10">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink/[0.025] blur-3xl" />

            <div
              className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage:
                  'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
                backgroundSize: '36px 36px',
              }}
            />
          </div>

          <div className="relative z-10 flex min-h-[270px] items-center justify-center px-6 py-12">
            <div className="max-w-md text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-ink/10 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
                <UsersRound className="h-6 w-6 text-ink/60" />
              </div>

              <div className="mb-2 inline-flex items-center rounded-full border border-ink/10 bg-ink/[0.025] px-3 py-1">
                <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-ink/40">
                  User Directory Infrastructure
                </span>
              </div>

              <h3 className="text-base font-semibold tracking-[-0.02em] text-ink">
                User management is being prepared
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-ink/45">
                Connect the user service to populate accounts, roles, access
                status, activity history, and administrative controls.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-3 border-t border-ink/10 bg-ink/[0.018] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-2 text-[10px] text-ink/40">
            <span className="font-medium uppercase tracking-[0.14em]">
              Identity & Access
            </span>

            <span className="text-ink/20">•</span>

            <span>BRD Sec. 39</span>
          </div>

          <div className="inline-flex items-center gap-1.5 text-[10px] font-medium text-ink/40">
            <span>User administration architecture</span>
            <ArrowUpRight className="h-3 w-3" />
          </div>
        </div>
      </Card>
    </section>
  )
}