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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/35">
            Project team
          </p>

          <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight text-ink">
            Team & professionals
          </h1>

          <p className="mt-1 max-w-2xl text-sm leading-6 text-ink/45">
            Manage the contractor, project manager and professionals assigned
            to this project.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white"
        >
          <Plus className="h-4 w-4" />
          Add team member
        </button>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
        />

        <TeamStat
          icon={ShieldCheck}
          label="Verified"
          value={String(verifiedCount)}
          detail="Professional records verified"
        />

        <TeamStat
          icon={Mail}
          label="Pending invites"
          value={String(invitedCount)}
          detail="Awaiting acceptance"
          tone={invitedCount > 0 ? 'amber' : 'default'}
        />
      </div>

      {/* Core project roles */}
      <div className="grid gap-6 lg:grid-cols-2">
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

      {/* Team list */}
      <Card>
        <CardHeader
          title="Assigned team"
          subtitle={`${filteredTeam.length} member${
            filteredTeam.length === 1 ? '' : 's'
          } shown`}
        />

        <CardBody className="space-y-5">
          {/* Search */}
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/30" />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search team members, organisations or roles..."
              className="h-10 w-full rounded-lg border border-line bg-white pl-9 pr-3 text-xs text-ink outline-none placeholder:text-ink/30 focus:border-ink/30"
            />
          </div>

          {/* Role filters */}
          <div className="flex gap-1 overflow-x-auto pb-1">
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

          {/* Members */}
          <div className="divide-y divide-line rounded-xl border border-line">
            {filteredTeam.map((member) => (
              <TeamMemberRow
                key={member.id}
                member={member}
              />
            ))}

            {filteredTeam.length === 0 && (
              <div className="px-6 py-12 text-center">
                <Users className="mx-auto h-6 w-6 text-ink/20" />

                <p className="mt-3 text-sm font-semibold text-ink">
                  No team members found
                </p>

                <p className="mt-1 text-xs text-ink/40">
                  Try another search term or role.
                </p>
              </div>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Professional assignment */}
      <Card>
        <CardHeader
          title="Professional assignment"
          subtitle="Find and assign verified professionals to this project."
        />

        <CardBody>
          <div className="grid gap-4 md:grid-cols-3">
            <AssignmentCard
              title="Find professionals"
              description="Browse professionals by discipline and project requirement."
              action="Browse professionals"
            />

            <AssignmentCard
              title="Project requirements"
              description="Review the professional roles and expertise required for this project."
              action="View requirements"
            />

            <AssignmentCard
              title="Verification"
              description="Only verified professional records should be used for project assignments."
              action="View verification"
            />
          </div>
        </CardBody>
      </Card>

      {/* Governance note */}
      <div className="rounded-xl border border-line bg-paper-2 p-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-ink/35" />

          <div>
            <p className="text-xs font-semibold text-ink">
              Team governance
            </p>

            <p className="mt-1 max-w-3xl text-xs leading-5 text-ink/45">
              Project roles should remain tied to the platform's role and
              permission model. Professional verification and project
              assignment are separate from project-specific responsibilities,
              approvals and audit records.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Components                                                                  */
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
  tone?: 'default' | 'amber'
}) {
  return (
    <div className="rounded-xl border border-line bg-white p-4">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
          {label}
        </span>

        <Icon className="h-4 w-4 text-ink/30" />
      </div>

      <p
        className={[
          'mt-3 font-display text-xl font-semibold',
          tone === 'amber' ? 'text-amber-700' : 'text-ink',
        ].join(' ')}
      >
        {value}
      </p>

      <p className="mt-1 text-[10px] text-ink/35">{detail}</p>
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
    <Card>
      <CardHeader
        title={title}
        subtitle={description}
      />

      <CardBody>
        {member ? (
          <div className="flex items-center gap-3">
            <Avatar name={member.name} />

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-xs font-semibold text-ink">
                  {member.name}
                </p>

                {member.verified && (
                  <Badge tone="teal">
                    <span className="inline-flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3" />
                      Verified
                    </span>
                  </Badge>
                )}
              </div>

              {member.organisation && (
                <p className="mt-1 text-[10px] text-ink/40">
                  {member.organisation}
                </p>
              )}

              <p className="mt-1 text-[10px] text-ink/35">
                {member.responsibility}
              </p>
            </div>

            <button
              type="button"
              aria-label={`View ${member.name}`}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-ink/30 hover:bg-ink/5 hover:text-ink"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-line p-5 text-center">
            <UserRound className="mx-auto h-5 w-5 text-ink/20" />

            <p className="mt-2 text-xs font-semibold text-ink">
              {emptyLabel}
            </p>

            <button
              type="button"
              className="mt-3 text-[11px] font-semibold text-ink"
            >
              Assign {title}
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
    <div className="group flex flex-col gap-4 p-4 transition-colors hover:bg-ink/[0.015] sm:flex-row sm:items-center">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <Avatar name={member.name} />

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="truncate text-xs font-semibold text-ink">
              {member.name}
            </p>

            {member.verified && (
              <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-teal">
                <ShieldCheck className="h-3 w-3" />
                Verified
              </span>
            )}
          </div>

          <p className="mt-1 text-[10px] text-ink/35">
            {roleLabels[member.role]}
            {member.organisation ? ` · ${member.organisation}` : ''}
          </p>

          <p className="mt-1 text-[10px] text-ink/30">
            {member.responsibility}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 sm:justify-end">
        <TeamStatus status={member.status} />

        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-ink/30 hover:bg-ink/5 hover:text-ink"
          aria-label={`Open ${member.name}`}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
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
    <div className="rounded-xl border border-line p-4">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink/5">
        <Users className="h-4 w-4 text-ink/40" />
      </div>

      <h3 className="mt-4 text-xs font-semibold text-ink">
        {title}
      </h3>

      <p className="mt-1 text-[11px] leading-5 text-ink/40">
        {description}
      </p>

      <button
        type="button"
        className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold text-ink"
      >
        {action}
        <ChevronRight className="h-3.5 w-3.5" />
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
        'whitespace-nowrap rounded-lg px-3 py-2 text-[11px] font-semibold transition-colors',
        active
          ? 'bg-ink text-white'
          : 'text-ink/40 hover:bg-ink/5 hover:text-ink',
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
    return <Badge tone="teal">Active</Badge>
  }

  if (status === 'invited') {
    return <Badge tone="amber">Invite pending</Badge>
  }

  return <Badge tone="neutral">Inactive</Badge>
}

function Avatar({
  name,
}: {
  name: string
}) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()

  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink/5 font-display text-xs font-semibold text-ink/45">
      {initials || 'U'}
    </div>
  )
}