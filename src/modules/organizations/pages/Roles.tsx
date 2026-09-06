import {
  Check,
  ChevronRight,
  MoreHorizontal,
  Plus,
  ShieldCheck,
  Users,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'

const roles = [
  {
    name: 'Organization Owner',
    description:
      'Full control over the organization, members, roles, permissions and organization settings.',
    members: 1,
    permissions: 18,
    system: true,
    level: 'Full access',
  },
  {
    name: 'Organization Admin',
    description:
      'Manages members, projects, organization settings and operational activities.',
    members: 3,
    permissions: 15,
    system: true,
    level: 'Administrative',
  },
  {
    name: 'Project Manager',
    description:
      'Manages assigned projects, monitors progress, verifies milestones and coordinates project activities.',
    members: 8,
    permissions: 11,
    system: false,
    level: 'Project access',
  },
  {
    name: 'Finance Manager',
    description:
      'Reviews financial activity, escrow transactions, payment requests and reconciliation records.',
    members: 2,
    permissions: 9,
    system: false,
    level: 'Financial access',
  },
  {
    name: 'Procurement Officer',
    description:
      'Manages material requests, supplier quotations, procurement workflows and delivery records.',
    members: 4,
    permissions: 8,
    system: false,
    level: 'Procurement access',
  },
  {
    name: 'Member',
    description:
      'Standard organization member with access to assigned projects and permitted operational functions.',
    members: 12,
    permissions: 5,
    system: false,
    level: 'Limited access',
  },
]

const permissionGroups = [
  {
    name: 'Organization',
    permissions: ['View organization', 'Manage members', 'Manage roles'],
  },
  {
    name: 'Projects',
    permissions: ['View projects', 'Create projects', 'Manage assigned projects'],
  },
  {
    name: 'Finance',
    permissions: ['View wallet', 'Review payments', 'View transactions'],
  },
  {
    name: 'Procurement',
    permissions: ['View requests', 'Manage quotations', 'Verify deliveries'],
  },
]

export function Roles() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
            Organization access
          </p>

          <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight text-ink">
            Roles
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/50">
            Define organization-level roles and control what members can access
            across Build OS.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
        >
          <Plus className="h-3.5 w-3.5" />
          Create role
        </button>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <SummaryCard
          icon={ShieldCheck}
          label="Organization roles"
          value={roles.length.toString()}
          description="Configured access levels"
        />

        <SummaryCard
          icon={Users}
          label="Assigned members"
          value="30"
          description="Across all organization roles"
        />

        <SummaryCard
          icon={Check}
          label="Permission groups"
          value={permissionGroups.length.toString()}
          description="Access areas configured"
        />
      </div>

      {/* Roles */}
      <Card className="overflow-hidden">
        <CardHeader
          title="Organization roles"
          subtitle="Roles determine what members can view, create, approve and manage."
        />

        <div className="divide-y divide-line">
          {roles.map((role) => (
            <div
              key={role.name}
              className="px-6 py-5 transition-colors hover:bg-ink/[0.02] sm:px-7"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex min-w-0 items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink/5">
                    <ShieldCheck className="h-5 w-5 text-ink/55" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-sm font-semibold text-ink">
                        {role.name}
                      </h2>

                      {role.system && (
                        <span className="rounded-full bg-ink/5 px-2 py-1 text-[10px] font-semibold text-ink/45">
                          System role
                        </span>
                      )}

                      <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold text-emerald-700">
                        {role.level}
                      </span>
                    </div>

                    <p className="mt-1.5 max-w-2xl text-xs leading-5 text-ink/45">
                      {role.description}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-6">
                  <RoleMetric
                    label="Members"
                    value={role.members.toString()}
                  />

                  <RoleMetric
                    label="Permissions"
                    value={role.permissions.toString()}
                  />

                  <button
                    type="button"
                    aria-label={`Manage ${role.name}`}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-white text-ink/45 transition-colors hover:bg-ink/[0.03] hover:text-ink"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>

                  <ChevronRight className="hidden h-4 w-4 text-ink/25 sm:block" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Permission model */}
      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader
            title="Permission model"
            subtitle="Core access areas available when configuring organization roles."
          />

          <CardBody>
            <div className="grid gap-4 sm:grid-cols-2">
              {permissionGroups.map((group) => (
                <div
                  key={group.name}
                  className="rounded-2xl border border-line bg-paper-2 p-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-ink">
                      {group.name}
                    </h3>

                    <span className="rounded-full bg-white px-2 py-1 text-[10px] font-semibold text-ink/40">
                      {group.permissions.length} permissions
                    </span>
                  </div>

                  <div className="mt-4 space-y-2">
                    {group.permissions.map((permission) => (
                      <div
                        key={permission}
                        className="flex items-center gap-2 text-xs text-ink/55"
                      >
                        <div className="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-500/10">
                          <Check className="h-3 w-3 text-emerald-600" />
                        </div>

                        {permission}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Governance note */}
        <Card>
          <CardHeader
            title="Role governance"
            subtitle="Access control principles"
          />

          <CardBody>
            <div className="space-y-4">
              <GovernanceItem
                title="Least privilege"
                description="Members should receive only the access required for their responsibilities."
              />

              <GovernanceItem
                title="Separation of duties"
                description="Sensitive project, financial and approval actions should not rely on a single role."
              />

              <GovernanceItem
                title="Auditability"
                description="Role changes and permission updates should be recorded in the organization audit trail."
              />

              <GovernanceItem
                title="System protection"
                description="Critical platform roles cannot be removed or modified without the required administrative authority."
              />
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Access notice */}
      <div className="rounded-2xl border border-line bg-paper-2 px-5 py-4">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink/5">
            <ShieldCheck className="h-4 w-4 text-ink/55" />
          </div>

          <div>
            <p className="text-xs font-semibold text-ink">
              Access control is organization-scoped
            </p>

            <p className="mt-1 text-xs leading-5 text-ink/45">
              Changes made here affect members within this organization. System
              permissions governing Build OS security, verification, escrow and
              platform administration remain controlled by the appropriate
              Build OS administrative layer.
            </p>
          </div>
        </div>
      </div>
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
            <Icon className="h-4 w-4 text-ink/55" />
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
              {label}
            </p>

            <p className="mt-0.5 font-display text-xl font-semibold text-ink">
              {value}
            </p>
          </div>
        </div>

        <p className="mt-3 text-xs text-ink/40">{description}</p>
      </CardBody>
    </Card>
  )
}

function RoleMetric({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="hidden text-right sm:block">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/30">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-ink">{value}</p>
    </div>
  )
}

function GovernanceItem({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="border-b border-line pb-4 last:border-0 last:pb-0">
      <p className="text-xs font-semibold text-ink">{title}</p>

      <p className="mt-1 text-xs leading-5 text-ink/45">
        {description}
      </p>
    </div>
  )
}