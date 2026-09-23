import { useMemo, useState } from 'react'
import {
  CheckCircle2,
  ChevronRight,
  Mail,
  Plus,
  Search,
  ShieldCheck,
  UserRound,
  Users,
} from 'lucide-react'

import { Badge } from '@/components/ui/Badge'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'

type TeamRole =
  | 'client'
  | 'project_manager'
  | 'contractor'
  | 'architect'
  | 'quantity_surveyor'
  | 'engineer'
  | 'site_supervisor'

type TeamStatus = 'active' | 'invited' | 'inactive'

type TeamMember = {
  id: string
  name: string
  role: TeamRole
  organisation?: string
  email: string
  status: TeamStatus
  verified: boolean
  responsibility: string
  joinedAt: string
}

const roleLabels: Record<TeamRole, string> = {
  client: 'Client',
  project_manager: 'Project Manager',
  contractor: 'Contractor',
  architect: 'Architect',
  quantity_surveyor: 'Quantity Surveyor',
  engineer: 'Engineer',
  site_supervisor: 'Site Supervisor',
}

const demoTeam: TeamMember[] = [
  {
    id: 'TEAM-001',
    name: 'Project Owner',
    role: 'client',
    email: 'owner@example.com',
    status: 'active',
    verified: true,
    responsibility: 'Project approvals and key decisions',
    joinedAt: '01 Aug 2026',
  },
  {
    id: 'TEAM-002',
    name: 'David Okafor',
    role: 'project_manager',
    organisation: 'BuildCore PM',
    email: 'david@example.com',
    status: 'active',
    verified: true,
    responsibility: 'Project coordination and delivery oversight',
    joinedAt: '03 Aug 2026',
  },
  {
    id: 'TEAM-003',
    name: 'Apex Construction Ltd',
    role: 'contractor',
    organisation: 'Apex Construction Ltd',
    email: 'projects@example.com',
    status: 'active',
    verified: true,
    responsibility: 'Construction delivery and site execution',
    joinedAt: '05 Aug 2026',
  },
  {
    id: 'TEAM-004',
    name: 'Amaka Eze',
    role: 'architect',
    organisation: 'Eze Design Studio',
    email: 'amaka@example.com',
    status: 'active',
    verified: true,
    responsibility: 'Architectural design and technical documentation',
    joinedAt: '05 Aug 2026',
  },
  {
    id: 'TEAM-005',
    name: 'Ibrahim Musa',
    role: 'quantity_surveyor',
    organisation: 'Musa Cost Consultants',
    email: 'ibrahim@example.com',
    status: 'active',
    verified: true,
    responsibility: 'Cost planning, BOQ and valuation',
    joinedAt: '07 Aug 2026',
  },
  {
    id: 'TEAM-006',
    name: 'Chinedu Nwosu',
    role: 'engineer',
    organisation: 'Nwosu Engineering',
    email: 'chinedu@example.com',
    status: 'invited',
    verified: true,
    responsibility: 'Engineering review and technical support',
    joinedAt: '28 Aug 2026',
  },
]

export function ProjectTeam() {
  const [search, setSearch] = useState('')
  const [activeRole, setActiveRole] = useState<TeamRole | 'all'>('all')

  const roles = useMemo(() => {
    return Array.from(
      new Set(demoTeam.map((member) => member.role)),
    )
  }, [])

  const filteredTeam = useMemo(() => {
    const query = search.trim().toLowerCase()

    return demoTeam.filter((member) => {
      const matchesRole =
        activeRole === 'all' || member.role === activeRole

      const matchesSearch =
        !query ||
        member.name.toLowerCase().includes(query) ||
        member.organisation?.toLowerCase().includes(query) ||
        member.email.toLowerCase().includes(query) ||
        roleLabels[member.role].toLowerCase().includes(query)

      return matchesRole && matchesSearch
    })
  }, [search, activeRole])

  const activeCount = demoTeam.filter(
    (member) => member.status === 'active',
  ).length

  const invitedCount = demoTeam.filter(
    (member) => member.status === 'invited',
  ).length

  const verifiedCount = demoTeam.filter(
    (member) => member.verified,
  ).length

  const contractor = demoTeam.find(
    (member) => member.role === 'contractor',
  )

  const projectManager = demoTeam.find(
    (member) => member.role === 'project_manager',
  )

  return (
    <div className="space-y-7">
      {/* ------------------------------------------------------------------ */}
      {/* Header / hero                                                      */}
      {/* ------------------------------------------------------------------ */}

      <section
        aria-label="Project team header"
        className="
          relative overflow-hidden rounded-[24px]
          bg-[#18271F]
          shadow-[0_18px_50px_rgba(20,40,30,0.10)]
        "
      >
        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-white/[0.04] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-[#B8D9C4]/[0.04] blur-3xl" />

        <div className="relative flex flex-col gap-7 p-6 sm:p-7 lg:flex-row lg:items-end lg:justify-between lg:p-8">
          <div className="min-w-0">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white/[0.09] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-white/65">
                Project team
              </span>

              <span className="h-1 w-1 rounded-full bg-white/20" />

              <span className="text-[9px] font-medium text-white/35">
                People & professionals
              </span>
            </div>

            <h1 className="font-display text-[29px] font-semibold leading-tight tracking-[-0.035em] text-white sm:text-[34px]">
              Team & professionals
            </h1>

            <p className="mt-3 max-w-2xl text-[11px] leading-5 text-white/45 sm:text-xs">
              Manage the people responsible for project delivery, technical
              oversight, approvals and professional services.
            </p>
          </div>

          <button
            type="button"
            className="
              group inline-flex w-fit shrink-0 items-center justify-center gap-2
              rounded-full bg-white px-5 py-2.5
              text-[10px] font-bold text-ink
              transition duration-300
              hover:-translate-y-0.5 hover:bg-white/90
            "
          >
            <Plus
              size={13}
              className="transition-transform duration-300 group-hover:rotate-90"
            />
            Add team member
          </button>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Summary metrics                                                    */}
      {/* ------------------------------------------------------------------ */}

      <section
        aria-label="Team summary"
        className="grid grid-cols-2 gap-3 lg:grid-cols-4"
      >
        <TeamStat
          icon={Users}
          label="Team members"
          value={String(demoTeam.length)}
          detail="Assigned to project"
        />

        <TeamStat
          icon={CheckCircle2}
          label="Active"
          value={String(activeCount)}
          detail="Currently participating"
          tone="green"
        />

        <TeamStat
          icon={ShieldCheck}
          label="Verified"
          value={String(verifiedCount)}
          detail="Professional records verified"
          tone="green"
        />

        <TeamStat
          icon={Mail}
          label="Pending invites"
          value={String(invitedCount)}
          detail="Awaiting acceptance"
          tone={invitedCount > 0 ? 'amber' : 'default'}
        />
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Core project roles                                                 */}
      {/* ------------------------------------------------------------------ */}

      <section aria-label="Core project roles">
        <div className="mb-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink/35">
            Project leadership
          </p>

          <h2 className="mt-1 font-display text-xl font-semibold tracking-[-0.025em] text-ink">
            Core project roles
          </h2>

          <p className="mt-1 text-[11px] text-ink/40">
            The primary people responsible for coordinating and delivering this project.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <CoreRoleCard
            title="Project Manager"
            description="Primary project coordination and delivery oversight."
            member={projectManager}
            emptyLabel="No project manager assigned"
          />

          <CoreRoleCard
            title="Contractor"
            description="Responsible for construction delivery and site execution."
            member={contractor}
            emptyLabel="No contractor assigned"
          />
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Team directory                                                     */}
      {/* ------------------------------------------------------------------ */}

      <Card className="overflow-hidden">
        <CardHeader
          title="Assigned team"
          subtitle={`${filteredTeam.length} member${
            filteredTeam.length === 1 ? '' : 's'
          } shown`}
        />

        <CardBody className="p-5 sm:p-6">
          {/* Search */}
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/25"
              size={15}
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search people, organisations or roles..."
              className="
                h-11 w-full rounded-[14px]
                border border-ink/[0.07]
                bg-[#FAFBFA]
                pl-11 pr-4
                text-[11px] text-ink
                outline-none
                transition
                placeholder:text-ink/25
                focus:border-ink/[0.16]
                focus:bg-white
                focus:shadow-[0_8px_24px_rgba(20,40,30,0.04)]
              "
            />
          </div>

          {/* Role filters */}
          <div className="mt-4 flex gap-1.5 overflow-x-auto pb-1">
            <RoleFilter
              active={activeRole === 'all'}
              onClick={() => setActiveRole('all')}
            >
              All members
            </RoleFilter>

            {roles.map((role) => (
              <RoleFilter
                key={role}
                active={activeRole === role}
                onClick={() => setActiveRole(role)}
              >
                {roleLabels[role]}
              </RoleFilter>
            ))}
          </div>

          {/* Directory */}
          <div className="mt-5 overflow-hidden rounded-[18px] border border-ink/[0.07]">
            {/* Desktop heading */}
            <div className="hidden border-b border-ink/[0.06] bg-[#FAFBFA] px-4 py-3 lg:grid lg:grid-cols-[minmax(0,1.6fr)_minmax(150px,0.9fr)_120px_32px] lg:items-center lg:gap-4">
              <span className="text-[8px] font-bold uppercase tracking-[0.13em] text-ink/30">
                Member
              </span>

              <span className="text-[8px] font-bold uppercase tracking-[0.13em] text-ink/30">
                Responsibility
              </span>

              <span className="text-[8px] font-bold uppercase tracking-[0.13em] text-ink/30">
                Status
              </span>

              <span />
            </div>

            <div className="divide-y divide-ink/[0.06]">
              {filteredTeam.map((member) => (
                <TeamMemberRow
                  key={member.id}
                  member={member}
                />
              ))}

              {filteredTeam.length === 0 && (
                <div className="flex min-h-[260px] flex-col items-center justify-center px-6 py-12 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink/[0.05] text-ink/25">
                    <Users size={18} />
                  </div>

                  <p className="mt-4 font-display text-sm font-semibold text-ink">
                    No team members found
                  </p>

                  <p className="mt-1 max-w-xs text-[10px] leading-5 text-ink/35">
                    Try another search term or select a different role.
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardBody>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* Professional assignment                                            */}
      {/* ------------------------------------------------------------------ */}

      <section aria-label="Professional assignment">
        <div className="mb-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink/35">
            Professional network
          </p>

          <h2 className="mt-1 font-display text-xl font-semibold tracking-[-0.025em] text-ink">
            Professional assignment
          </h2>

          <p className="mt-1 text-[11px] text-ink/40">
            Find, assess and assign verified professionals to the project.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <AssignmentCard
            title="Find professionals"
            description="Browse professionals by discipline, expertise and project requirement."
            action="Browse professionals"
          />

          <AssignmentCard
            title="Project requirements"
            description="Review the disciplines and expertise required for this project's delivery."
            action="View requirements"
          />

          <AssignmentCard
            title="Verification"
            description="Confirm professional records and verification status before assignment."
            action="View verification"
          />
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Governance                                                         */}
      {/* ------------------------------------------------------------------ */}

      <section
        aria-label="Team governance"
        className="overflow-hidden rounded-[20px] border border-ink/[0.07] bg-white"
      >
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:p-6">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF4EE] text-[#12613E]">
            <ShieldCheck size={15} />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-[11px] font-bold text-ink">
                Team governance
              </p>

              <span className="rounded-full bg-[#EAF4EE] px-2 py-1 text-[8px] font-bold uppercase tracking-[0.10em] text-[#12613E]">
                Protected
              </span>
            </div>

            <p className="mt-1.5 max-w-4xl text-[10.5px] leading-5 text-ink/40">
              Project roles remain tied to the platform's role and permission
              model. Professional verification and project assignment are
              maintained separately from project responsibilities, approvals
              and audit records.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Components                                                                 */
/* -------------------------------------------------------------------------- */

function TeamStat({
  icon: Icon,
  label,
  value,
  detail,
  tone = 'default',
}: {
  icon: React.ElementType
  label: string
  value: string
  detail: string
  tone?: 'default' | 'green' | 'amber'
}) {
  const iconStyles = {
    default: 'bg-ink/[0.05] text-ink/35',
    green: 'bg-[#EAF4EE] text-[#12613E]',
    amber: 'bg-[#F8EEE6] text-[#B85C12]',
  }

  const valueStyles = {
    default: 'text-ink',
    green: 'text-[#12613E]',
    amber: 'text-[#B85C12]',
  }

  return (
    <div
      className="
        group relative overflow-hidden rounded-[18px]
        border border-ink/[0.07] bg-white p-4
        transition duration-300
        hover:-translate-y-0.5
        hover:shadow-[0_14px_35px_rgba(20,40,30,0.06)]
        sm:p-5
      "
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-ink/35 sm:text-[10px]">
            {label}
          </p>

          <p
            className={[
              'mt-2 font-display text-[25px] font-semibold tracking-[-0.035em]',
              valueStyles[tone],
            ].join(' ')}
          >
            {value}
          </p>
        </div>

        <div
          className={[
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105',
            iconStyles[tone],
          ].join(' ')}
        >
          <Icon size={16} />
        </div>
      </div>

      <p className="mt-2 text-[10px] leading-4 text-ink/40">
        {detail}
      </p>
    </div>
  )
}

function CoreRoleCard({
  title,
  description,
  member,
  emptyLabel,
}: {
  title: string
  description: string
  member?: TeamMember
  emptyLabel: string
}) {
  return (
    <Card className="group overflow-hidden transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(20,40,30,0.06)]">
      <CardHeader
        title={title}
        subtitle={description}
      />

      <CardBody>
        {member ? (
          <div className="rounded-[17px] border border-ink/[0.06] bg-[#FCFDFC] p-4">
            <div className="flex items-center gap-3">
              <Avatar name={member.name} featured />

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="truncate text-[11px] font-semibold text-ink">
                    {member.name}
                  </p>

                  {member.verified && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#EAF4EE] px-2 py-1 text-[8px] font-bold text-[#12613E]">
                      <ShieldCheck size={9} />
                      Verified
                    </span>
                  )}
                </div>

                {member.organisation && (
                  <p className="mt-1 text-[10px] text-ink/40">
                    {member.organisation}
                  </p>
                )}
              </div>

              <button
                type="button"
                aria-label={`View ${member.name}`}
                className="
                  flex h-8 w-8 shrink-0 items-center justify-center
                  rounded-lg text-ink/25
                  transition
                  hover:bg-white hover:text-ink
                  hover:shadow-[0_3px_12px_rgba(20,40,30,0.05)]
                "
              >
                <ChevronRight size={14} />
              </button>
            </div>

            <div className="mt-4 border-t border-ink/[0.06] pt-3">
              <p className="text-[9px] font-bold uppercase tracking-[0.10em] text-ink/30">
                Responsibility
              </p>

              <p className="mt-1 text-[10.5px] leading-5 text-ink/45">
                {member.responsibility}
              </p>
            </div>
          </div>
        ) : (
          <div className="rounded-[17px] border border-dashed border-ink/[0.10] bg-[#FAFBFA] p-6 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-ink/[0.05] text-ink/25">
              <UserRound size={16} />
            </div>

            <p className="mt-3 text-[11px] font-semibold text-ink">
              {emptyLabel}
            </p>

            <button
              type="button"
              className="mt-3 inline-flex items-center gap-1 text-[10px] font-bold text-ink/55 transition hover:text-[#B85C12]"
            >
              Assign {title}
              <ChevronRight size={12} />
            </button>
          </div>
        )}
      </CardBody>
    </Card>
  )
}

function TeamMemberRow({
  member,
}: {
  member: TeamMember
}) {
  return (
    <div
      className="
        group relative
        flex flex-col gap-4 p-4
        transition duration-200
        hover:bg-[#FCFDFC]
        lg:grid lg:grid-cols-[minmax(0,1.6fr)_minmax(150px,0.9fr)_120px_32px]
        lg:items-center lg:gap-4
      "
    >
      {/* Member */}
      <div className="flex min-w-0 items-center gap-3">
        <Avatar name={member.name} />

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="truncate text-[11px] font-semibold text-ink">
              {member.name}
            </p>

            {member.verified && (
              <span className="inline-flex items-center gap-1 text-[8px] font-bold text-[#12613E]">
                <ShieldCheck size={10} />
                Verified
              </span>
            )}
          </div>

          <p className="mt-1 text-[9.5px] text-ink/35">
            {roleLabels[member.role]}
            {member.organisation ? ` · ${member.organisation}` : ''}
          </p>

          <p className="mt-1 font-mono text-[8px] text-ink/20">
            {member.id}
          </p>
        </div>
      </div>

      {/* Responsibility */}
      <div className="hidden min-w-0 lg:block">
        <p className="text-[10px] leading-4 text-ink/45">
          {member.responsibility}
        </p>
      </div>

      {/* Status */}
      <div className="flex items-center justify-between lg:justify-start">
        <span className="text-[8px] font-bold uppercase tracking-[0.10em] text-ink/25 lg:hidden">
          Status
        </span>

        <TeamStatus status={member.status} />
      </div>

      {/* Action */}
      <button
        type="button"
        className="
          absolute right-4 top-4
          flex h-8 w-8 items-center justify-center
          rounded-lg text-ink/20
          transition
          hover:bg-white hover:text-ink
          lg:static
        "
        aria-label={`Open ${member.name}`}
      >
        <ChevronRight size={14} />
      </button>
    </div>
  )
}

function AssignmentCard({
  title,
  description,
  action,
}: {
  title: string
  description: string
  action: string
}) {
  return (
    <div
      className="
        group rounded-[18px] border border-ink/[0.07]
        bg-white p-5
        transition duration-300
        hover:-translate-y-0.5
        hover:border-ink/[0.11]
        hover:shadow-[0_14px_35px_rgba(20,40,30,0.06)]
      "
    >
      <div
        className="
          flex h-10 w-10 items-center justify-center
          rounded-xl bg-ink/[0.05] text-ink/35
          transition duration-300
          group-hover:bg-[#EAF4EE]
          group-hover:text-[#12613E]
        "
      >
        <Users size={16} />
      </div>

      <h3 className="mt-4 font-display text-sm font-semibold tracking-[-0.01em] text-ink">
        {title}
      </h3>

      <p className="mt-1.5 min-h-[42px] text-[10.5px] leading-5 text-ink/40">
        {description}
      </p>

      <button
        type="button"
        className="
          group/action mt-5 inline-flex items-center gap-1.5
          text-[10px] font-bold text-ink/50
          transition hover:text-[#B85C12]
        "
      >
        {action}

        <ChevronRight
          size={12}
          className="transition-transform duration-200 group-hover/action:translate-x-0.5"
        />
      </button>
    </div>
  )
}

function RoleFilter({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'whitespace-nowrap rounded-full px-3.5 py-2 text-[9px] font-bold transition duration-200',
        active
          ? 'bg-ink text-white shadow-[0_5px_15px_rgba(20,30,25,0.10)]'
          : 'bg-ink/[0.04] text-ink/40 hover:bg-ink/[0.07] hover:text-ink/65',
      ].join(' ')}
    >
      {children}
    </button>
  )
}

function TeamStatus({
  status,
}: {
  status: TeamStatus
}) {
  if (status === 'active') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF4EE] px-2.5 py-1.5 text-[8px] font-bold text-[#12613E]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#12613E]" />
        Active
      </span>
    )
  }

  if (status === 'invited') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F8EEE6] px-2.5 py-1.5 text-[8px] font-bold text-[#B85C12]">
        <Mail size={9} />
        Invite pending
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/[0.05] px-2.5 py-1.5 text-[8px] font-bold text-ink/40">
      Inactive
    </span>
  )
}

function Avatar({
  name,
  featured = false,
}: {
  name: string
  featured?: boolean
}) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()

  return (
    <div
      className={[
        'flex shrink-0 items-center justify-center rounded-xl font-display font-semibold',
        featured ? 'h-11 w-11 text-sm' : 'h-10 w-10 text-xs',
        'bg-[#EAF4EE] text-[#12613E]',
      ].join(' ')}
    >
      {initials || 'U'}
    </div>
  )
}