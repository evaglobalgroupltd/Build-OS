import type { ComponentType } from 'react'

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

/* -------------------------------------------------------------------------- */
/* Data                                                                       */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export function Members() {
  return (
    <div className="space-y-7 pb-8">
      {/* ------------------------------------------------------------------ */}
      {/* Hero                                                               */}
      {/* ------------------------------------------------------------------ */}

      <section className="relative overflow-hidden rounded-[24px] border border-ink/[0.07] bg-white shadow-[0_18px_50px_rgba(20,40,30,0.08)]">
        <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#12613E]/[0.07] blur-3xl" />
        <div className="absolute -bottom-28 left-1/3 h-56 w-56 rounded-full bg-[#B85C12]/[0.05] blur-3xl" />

        <div className="relative px-5 py-6 sm:px-7 sm:py-7 lg:px-8">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#12613E]/10 bg-[#12613E]/[0.06] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#12613E]">
                  <Users className="h-3 w-3" />
                  Organization governance
                </span>

                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/30">
                  24 members
                </span>
              </div>

              <h1 className="mt-5 max-w-2xl font-display text-3xl font-semibold tracking-[-0.035em] text-[#18271F] sm:text-4xl">
                Organization members.
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/48 sm:text-[15px]">
                Manage people, organizational access and verification across
                your Build OS workspace.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-ink/42">
                <HeroMeta label="Active" value="21" />
                <HeroMeta label="Pending" value="3" />
                <HeroMeta label="Verified" value="22" />
              </div>
            </div>

            <button
              type="button"
              className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#18271F] px-5 text-xs font-semibold text-white shadow-[0_10px_24px_rgba(24,39,31,0.16)] transition-all hover:-translate-y-0.5 hover:bg-[#12613E]"
            >
              <UserPlus className="h-3.5 w-3.5" />
              Invite member
            </button>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Summary                                                            */}
      {/* ------------------------------------------------------------------ */}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          icon={Users}
          label="Total members"
          value="24"
          description="Organization members"
          tone="green"
        />

        <SummaryCard
          icon={UserCheck}
          label="Active members"
          value="21"
          description="Currently active"
          tone="neutral"
        />

        <SummaryCard
          icon={UserPlus}
          label="Pending invites"
          value="3"
          description="Awaiting acceptance"
          tone="bronze"
        />

        <SummaryCard
          icon={ShieldCheck}
          label="Verified members"
          value="22"
          description="Identity verified"
          tone="green"
        />
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Members register                                                    */}
      {/* ------------------------------------------------------------------ */}

      <Card className="overflow-hidden">
        <CardHeader
          title="Member register"
          subtitle="People currently associated with this organization"
          action={
            <span className="hidden rounded-full bg-ink/[0.04] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/40 sm:inline-flex">
              Access directory
            </span>
          }
        />

        {/* Controls */}
        <div className="border-y border-ink/[0.06] bg-[#F8F9F7] px-5 py-4 sm:px-6">
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/25" />

              <input
                type="search"
                placeholder="Search by name or email..."
                className="h-11 w-full rounded-xl border border-ink/[0.07] bg-white pl-10 pr-4 text-xs text-ink outline-none transition-all placeholder:text-ink/30 focus:border-[#12613E]/25 focus:ring-4 focus:ring-[#12613E]/[0.05]"
              />
            </div>

            <FilterButton label="All roles" />

            <FilterButton label="All statuses" />
          </div>
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[800px] text-left">
            <thead className="border-b border-ink/[0.06] bg-[#FBFCFA]">
              <tr>
                <TableHeading>Member</TableHeading>
                <TableHeading>Role</TableHeading>
                <TableHeading>Verification</TableHeading>
                <TableHeading>Status</TableHeading>
                <TableHeading>Joined</TableHeading>
                <th className="px-6 py-3" />
              </tr>
            </thead>

            <tbody className="divide-y divide-ink/[0.055]">
              {members.map((member) => (
                <MemberTableRow key={member.email} member={member} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile list */}
        <div className="divide-y divide-ink/[0.055] md:hidden">
          {members.map((member) => (
            <MemberMobileRow key={member.email} member={member} />
          ))}
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-3 border-t border-ink/[0.06] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-xs text-ink/40">
            Showing{' '}
            <span className="font-semibold text-ink/65">4</span> of{' '}
            <span className="font-semibold text-ink/65">24</span> members
          </p>

          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#12613E] transition-colors hover:text-[#0E4C31]"
          >
            View all members
            <ChevronDown className="h-3.5 w-3.5 -rotate-90" />
          </button>
        </div>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* Roles                                                               */}
      {/* ------------------------------------------------------------------ */}

      <Card>
        <CardHeader
          title="Roles and permissions"
          subtitle="Organization-level access is controlled through assigned roles"
          action={
            <button
              type="button"
              className="hidden items-center gap-1.5 text-xs font-semibold text-[#12613E] sm:inline-flex"
            >
              Manage roles
              <ChevronDown className="h-3.5 w-3.5 -rotate-90" />
            </button>
          }
        />

        <CardBody>
          <div className="grid gap-3 md:grid-cols-2">
            {roleDescriptions.map((item, index) => (
              <RoleCard
                key={item.role}
                role={item.role}
                description={item.description}
                index={index}
              />
            ))}
          </div>
        </CardBody>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* Governance notice                                                   */}
      {/* ------------------------------------------------------------------ */}

      <section className="overflow-hidden rounded-[20px] border border-[#12613E]/10 bg-[#F5F9F6]">
        <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#12613E]/10 bg-white text-[#12613E] shadow-sm">
              <Building2 className="h-4 w-4" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-semibold text-[#18271F]">
                  Organization access
                </p>

                <span className="rounded-full bg-[#12613E]/10 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#12613E]">
                  Controlled
                </span>
              </div>

              <p className="mt-1.5 max-w-2xl text-xs leading-5 text-ink/45">
                Members only have access to projects, procurement activity,
                documents and other resources permitted by their assigned
                organization role.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-ink/[0.08] bg-white px-4 py-2.5 text-xs font-semibold text-ink/65 shadow-sm transition-all hover:border-[#12613E]/15 hover:text-[#12613E]"
          >
            <Plus className="h-3.5 w-3.5" />
            Manage roles
          </button>
        </div>
      </section>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Member row                                                                 */
/* -------------------------------------------------------------------------- */

function MemberTableRow({
  member,
}: {
  member: (typeof members)[number]
}) {
  return (
    <tr className="group transition-colors hover:bg-[#FBFCFA]">
      <td className="px-6 py-4.5">
        <div className="flex items-center gap-3.5">
          <Avatar initials={member.initials} />

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="truncate text-sm font-semibold text-[#18271F]">
                {member.name}
              </p>

              {member.verification === 'Verified' && (
                <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-[#12613E]" />
              )}
            </div>

            <p className="mt-1 flex items-center gap-1.5 truncate text-xs text-ink/38">
              <Mail className="h-3 w-3 shrink-0" />
              {member.email}
            </p>
          </div>
        </div>
      </td>

      <td className="px-6 py-4.5">
        <span className="inline-flex rounded-full bg-ink/[0.045] px-2.5 py-1.5 text-[10px] font-semibold text-ink/58">
          {member.role}
        </span>
      </td>

      <td className="px-6 py-4.5">
        <VerificationBadge status={member.verification} />
      </td>

      <td className="px-6 py-4.5">
        <StatusBadge status={member.status} />
      </td>

      <td className="px-6 py-4.5 text-xs text-ink/42">
        {member.joined}
      </td>

      <td className="px-6 py-4.5 text-right">
        <button
          type="button"
          aria-label={`Actions for ${member.name}`}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink/25 transition-all hover:bg-ink/[0.05] hover:text-ink"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </td>
    </tr>
  )
}

/* -------------------------------------------------------------------------- */
/* Mobile row                                                                 */
/* -------------------------------------------------------------------------- */

function MemberMobileRow({
  member,
}: {
  member: (typeof members)[number]
}) {
  return (
    <div className="px-5 py-5">
      <div className="flex items-start gap-3.5">
        <Avatar initials={member.initials} />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="truncate text-sm font-semibold text-[#18271F]">
                  {member.name}
                </p>

                {member.verification === 'Verified' && (
                  <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-[#12613E]" />
                )}
              </div>

              <p className="mt-1 truncate text-xs text-ink/38">
                {member.email}
              </p>
            </div>

            <button
              type="button"
              aria-label={`Actions for ${member.name}`}
              className="shrink-0 rounded-lg p-1 text-ink/30 transition-colors hover:bg-ink/5 hover:text-ink"
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-ink/[0.045] px-2.5 py-1 text-[10px] font-semibold text-ink/58">
              {member.role}
            </span>

            <VerificationBadge status={member.verification} />

            <StatusBadge status={member.status} />
          </div>

          <div className="mt-3 flex items-center gap-2 text-[10px] text-ink/35">
            <span className="uppercase tracking-[0.1em]">Joined</span>
            <span className="h-1 w-1 rounded-full bg-ink/20" />
            <span>{member.joined}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Avatar                                                                     */
/* -------------------------------------------------------------------------- */

function Avatar({ initials }: { initials: string }) {
  return (
    <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-[13px] bg-[#18271F] text-[10px] font-bold tracking-wide text-white shadow-[0_6px_16px_rgba(24,39,31,0.14)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.14),transparent_45%)]" />
      <span className="relative">{initials}</span>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Summary card                                                               */
/* -------------------------------------------------------------------------- */

function SummaryCard({
  icon: Icon,
  label,
  value,
  description,
  tone,
}: {
  icon: ComponentType<{ className?: string }>
  label: string
  value: string
  description: string
  tone: 'green' | 'bronze' | 'neutral'
}) {
  const toneClasses = {
    green: {
      icon: 'bg-[#12613E]/[0.07] text-[#12613E]',
      accent: 'bg-[#12613E]',
    },
    bronze: {
      icon: 'bg-[#B85C12]/[0.08] text-[#B85C12]',
      accent: 'bg-[#B85C12]',
    },
    neutral: {
      icon: 'bg-ink/[0.05] text-ink/50',
      accent: 'bg-ink/15',
    },
  } as const

  return (
    <Card className="relative overflow-hidden">
      <div
        className={`absolute left-0 top-0 h-full w-0.5 ${toneClasses[tone].accent}`}
      />

      <CardBody>
        <div className="flex items-center justify-between gap-3">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-xl ${toneClasses[tone].icon}`}
          >
            <Icon className="h-4 w-4" />
          </div>

          <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-ink/25">
            Organization
          </span>
        </div>

        <p className="mt-5 font-display text-2xl font-semibold tracking-[-0.025em] text-[#18271F]">
          {value}
        </p>

        <p className="mt-1 text-xs font-semibold text-ink/55">{label}</p>

        <p className="mt-1 text-[11px] text-ink/35">{description}</p>
      </CardBody>
    </Card>
  )
}

/* -------------------------------------------------------------------------- */
/* Role card                                                                  */
/* -------------------------------------------------------------------------- */

function RoleCard({
  role,
  description,
  index,
}: {
  role: string
  description: string
  index: number
}) {
  const roleNumbers = ['01', '02', '03', '04']

  return (
    <div className="group rounded-[18px] border border-ink/[0.06] bg-[#FAFBF9] p-4.5 transition-all hover:border-[#12613E]/10 hover:bg-white hover:shadow-[0_12px_30px_rgba(20,40,30,0.06)]">
      <div className="flex items-start gap-3.5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-ink/[0.06] bg-white text-[#12613E] shadow-sm">
          <ShieldCheck className="h-4 w-4" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-[#18271F]">{role}</p>

            <span className="font-mono text-[9px] font-semibold tracking-[0.12em] text-ink/20">
              {roleNumbers[index]}
            </span>
          </div>

          <p className="mt-1.5 text-xs leading-5 text-ink/43">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Badges                                                                     */
/* -------------------------------------------------------------------------- */

function VerificationBadge({
  status,
}: {
  status: string
}) {
  const verified = status === 'Verified'

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[10px] font-semibold ${
        verified
          ? 'bg-[#12613E]/[0.08] text-[#12613E]'
          : 'bg-[#B85C12]/[0.09] text-[#A4510F]'
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
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[10px] font-semibold ${
        active
          ? 'bg-[#12613E]/[0.08] text-[#12613E]'
          : 'bg-[#B85C12]/[0.09] text-[#A4510F]'
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          active ? 'bg-[#12613E]' : 'bg-[#B85C12]'
        }`}
      />

      {status}
    </span>
  )
}

/* -------------------------------------------------------------------------- */
/* Filters                                                                    */
/* -------------------------------------------------------------------------- */

function FilterButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="inline-flex h-11 items-center justify-between gap-5 rounded-xl border border-ink/[0.07] bg-white px-4 text-xs font-semibold text-ink/55 transition-all hover:border-ink/[0.12] hover:text-ink sm:min-w-[145px]"
    >
      {label}
      <ChevronDown className="h-3.5 w-3.5 text-ink/30" />
    </button>
  )
}

/* -------------------------------------------------------------------------- */
/* Table heading                                                              */
/* -------------------------------------------------------------------------- */

function TableHeading({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-6 py-3 text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/30">
      {children}
    </th>
  )
}

/* -------------------------------------------------------------------------- */
/* Hero metadata                                                              */
/* -------------------------------------------------------------------------- */

function HeroMeta({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-semibold text-ink/65">{value}</span>
      <span>{label}</span>
    </div>
  )
}