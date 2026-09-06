import {
  BadgeCheck,
  Building2,
  ChevronDown,
  Mail,
  MoreHorizontal,
  Plus,
  Search,
  ShieldCheck,
  UserCheck,
  UserPlus,
  Users,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'

const members = [
  {
    name: 'Ahmed Muhammed',
    email: 'ahmed@example.com',
    role: 'Organization Admin',
    status: 'Active',
    verification: 'Verified',
    joined: '12 Aug 2026',
    initials: 'AM',
  },
  {
    name: 'Ibrahim Musa',
    email: 'ibrahim@example.com',
    role: 'Project Manager',
    status: 'Active',
    verification: 'Verified',
    joined: '15 Aug 2026',
    initials: 'IM',
  },
  {
    name: 'Fatima Bello',
    email: 'fatima@example.com',
    role: 'Procurement Manager',
    status: 'Active',
    verification: 'Verified',
    joined: '18 Aug 2026',
    initials: 'FB',
  },
  {
    name: 'Daniel Okafor',
    email: 'daniel@example.com',
    role: 'Member',
    status: 'Pending',
    verification: 'Pending',
    joined: '28 Aug 2026',
    initials: 'DO',
  },
]

const roleDescriptions = [
  {
    role: 'Organization Admin',
    description:
      'Full control over organization members, settings and organization-level permissions.',
  },
  {
    role: 'Project Manager',
    description:
      'Can manage assigned projects, monitor milestones, reports and verification activities.',
  },
  {
    role: 'Procurement Manager',
    description:
      'Can manage material requests, supplier quotations and procurement workflows.',
  },
  {
    role: 'Member',
    description:
      'Standard organization access based on permissions assigned by an administrator.',
  },
]

export function Members() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink/5">
              <Users className="h-5 w-5 text-ink/60" />
            </div>

            <div>
              <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">
                Organization members
              </h1>

              <p className="mt-0.5 text-sm text-ink/45">
                Manage people who have access to this organization.
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
        >
          <UserPlus className="h-3.5 w-3.5" />
          Invite member
        </button>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          icon={Users}
          label="Total members"
          value="24"
          description="Organization members"
        />

        <SummaryCard
          icon={UserCheck}
          label="Active members"
          value="21"
          description="Currently active"
        />

        <SummaryCard
          icon={UserPlus}
          label="Pending invites"
          value="3"
          description="Awaiting acceptance"
        />

        <SummaryCard
          icon={ShieldCheck}
          label="Verified members"
          value="22"
          description="Identity verified"
        />
      </div>

      {/* Members table */}
      <Card className="overflow-hidden">
        <CardHeader
          title="Members"
          subtitle="People currently associated with this organization"
        />

        <div className="border-b border-line px-6 py-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/30" />

              <input
                type="search"
                placeholder="Search members..."
                className="h-10 w-full rounded-xl border border-line bg-paper-2 pl-9 pr-4 text-xs text-ink outline-none transition focus:border-ink/20 focus:bg-white"
              />
            </div>

            <button
              type="button"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-line bg-white px-4 text-xs font-semibold text-ink/60 transition-colors hover:bg-ink/[0.03]"
            >
              All roles
              <ChevronDown className="h-3.5 w-3.5" />
            </button>

            <button
              type="button"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-line bg-white px-4 text-xs font-semibold text-ink/60 transition-colors hover:bg-ink/[0.03]"
            >
              All statuses
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[760px] text-left">
            <thead className="border-b border-line bg-paper-2">
              <tr>
                <th className="px-6 py-3 text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                  Member
                </th>

                <th className="px-6 py-3 text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                  Role
                </th>

                <th className="px-6 py-3 text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                  Verification
                </th>

                <th className="px-6 py-3 text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                  Status
                </th>

                <th className="px-6 py-3 text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                  Joined
                </th>

                <th className="px-6 py-3" />
              </tr>
            </thead>

            <tbody className="divide-y divide-line">
              {members.map((member) => (
                <tr
                  key={member.email}
                  className="transition-colors hover:bg-ink/[0.015]"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink text-xs font-bold text-white">
                        {member.initials}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="truncate text-sm font-semibold text-ink">
                            {member.name}
                          </p>

                          {member.verification === 'Verified' && (
                            <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                          )}
                        </div>

                        <p className="mt-0.5 flex items-center gap-1.5 text-xs text-ink/40">
                          <Mail className="h-3 w-3" />
                          {member.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-ink/65">
                      {member.role}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <VerificationBadge status={member.verification} />
                  </td>

                  <td className="px-6 py-4">
                    <StatusBadge status={member.status} />
                  </td>

                  <td className="px-6 py-4 text-xs text-ink/45">
                    {member.joined}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      aria-label={`Actions for ${member.name}`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink/35 transition-colors hover:bg-ink/5 hover:text-ink"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile member list */}
        <div className="divide-y divide-line md:hidden">
          {members.map((member) => (
            <div
              key={member.email}
              className="flex items-start gap-3 px-5 py-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink text-xs font-bold text-white">
                {member.initials}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-ink">
                      {member.name}
                    </p>

                    <p className="mt-0.5 truncate text-xs text-ink/40">
                      {member.email}
                    </p>
                  </div>

                  <button
                    type="button"
                    aria-label={`Actions for ${member.name}`}
                    className="shrink-0 text-ink/35"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-ink/5 px-2.5 py-1 text-[10px] font-semibold text-ink/60">
                    {member.role}
                  </span>

                  <VerificationBadge status={member.verification} />

                  <StatusBadge status={member.status} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-line px-6 py-4">
          <p className="text-xs text-ink/40">
            Showing <span className="font-semibold text-ink/60">4</span> of{' '}
            <span className="font-semibold text-ink/60">24</span> members
          </p>

          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink/60 transition-colors hover:text-ink"
          >
            View all members
            <ChevronDown className="h-3.5 w-3.5 -rotate-90" />
          </button>
        </div>
      </Card>

      {/* Roles and permissions */}
      <Card>
        <CardHeader
          title="Roles and permissions"
          subtitle="Organization-level access is controlled through assigned roles"
        />

        <CardBody>
          <div className="grid gap-3 md:grid-cols-2">
            {roleDescriptions.map((item) => (
              <div
                key={item.role}
                className="rounded-2xl border border-line bg-paper-2 p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                    <ShieldCheck className="h-4 w-4 text-ink/50" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-ink">
                      {item.role}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-ink/45">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Organization access notice */}
      <Card>
        <CardBody>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink/5">
                <Building2 className="h-4 w-4 text-ink/55" />
              </div>

              <div>
                <p className="text-sm font-semibold text-ink">
                  Organization access
                </p>

                <p className="mt-1 max-w-2xl text-xs leading-5 text-ink/45">
                  Members only have access to projects, procurement activity,
                  documents and other resources permitted by their assigned
                  organization role.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-xs font-semibold text-ink/65 transition-colors hover:bg-ink/[0.03]"
            >
              <Plus className="h-3.5 w-3.5" />
              Manage roles
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  description: string
}) {
  return (
    <Card>
      <CardBody>
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5">
            <Icon className="h-4 w-4 text-ink/50" />
          </div>

          <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
            {label}
          </p>
        </div>

        <p className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink">
          {value}
        </p>

        <p className="mt-1 text-xs text-ink/40">{description}</p>
      </CardBody>
    </Card>
  )
}

function VerificationBadge({
  status,
}: {
  status: string
}) {
  const verified = status === 'Verified'

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
        verified
          ? 'bg-emerald-500/10 text-emerald-700'
          : 'bg-amber-500/10 text-amber-700'
      }`}
    >
      {verified ? (
        <BadgeCheck className="h-3 w-3" />
      ) : (
        <ShieldCheck className="h-3 w-3" />
      )}

      {status}
    </span>
  )
}

function StatusBadge({
  status,
}: {
  status: string
}) {
  const active = status === 'Active'

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${
        active
          ? 'bg-emerald-500/10 text-emerald-700'
          : 'bg-amber-500/10 text-amber-700'
      }`}
    >
      {status}
    </span>
  )
}