import type { ComponentType } from 'react'

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
    description: 'Identity, membership and administrative controls.',
    permissions: ['View organization', 'Manage members', 'Manage roles'],
  },
  {
    name: 'Projects',
    description: 'Project delivery and operational management.',
    permissions: [
      'View projects',
      'Create projects',
      'Manage assigned projects',
    ],
  },
  {
    name: 'Finance',
    description: 'Financial visibility and payment operations.',
    permissions: ['View wallet', 'Review payments', 'View transactions'],
  },
  {
    name: 'Procurement',
    description: 'Materials, suppliers and delivery controls.',
    permissions: ['View requests', 'Manage quotations', 'Verify deliveries'],
  },
]

export function Roles() {
  const totalMembers = roles.reduce((total, role) => total + role.members, 0)

  return (
    <div className="space-y-7">
      {/* ------------------------------------------------------------------ */}
      {/* Hero                                                               */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden rounded-[24px] border border-ink/[0.07] bg-white shadow-[0_18px_50px_rgba(20,40,30,0.08)]">
        <div className="pointer-events-none absolute -right-24 -top-28 h-64 w-64 rounded-full bg-[#12613E]/[0.07] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-[#B85C12]/[0.05] blur-3xl" />

        <div className="relative px-6 py-7 sm:px-8 lg:px-10 lg:py-9">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#12613E]/[0.08] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#12613E]">
                  <ShieldCheck className="h-3 w-3" />
                  Access architecture
                </span>

                <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-ink/25">
                  Organization governance
                </span>
              </div>

              <h1 className="mt-4 font-display text-3xl font-semibold tracking-[-0.035em] text-ink sm:text-4xl">
                Roles
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/45">
                Define organization-level access profiles and establish how
                members interact with projects, finance, procurement and
                operational resources.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
                <HeroMeta
                  icon={ShieldCheck}
                  label="Access model"
                  value="Role-based"
                />

                <HeroMeta
                  icon={Users}
                  label="Assigned members"
                  value={`${totalMembers} members`}
                />

                <HeroMeta
                  icon={Check}
                  label="Permission areas"
                  value={`${permissionGroups.length} groups`}
                />
              </div>
            </div>

            <button
              type="button"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#18271F] px-4 py-2.5 text-xs font-semibold text-white shadow-[0_10px_24px_rgba(24,39,31,0.16)] transition-all hover:-translate-y-0.5 hover:bg-[#12613E]"
            >
              <Plus className="h-3.5 w-3.5" />
              Create role
            </button>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Summary                                                            */}
      {/* ------------------------------------------------------------------ */}
      <div className="grid gap-4 sm:grid-cols-3">
        <SummaryCard
          icon={ShieldCheck}
          label="Organization roles"
          value={roles.length.toString()}
          description="Configured access profiles"
          accent="green"
        />

        <SummaryCard
          icon={Users}
          label="Assigned members"
          value={totalMembers.toString()}
          description="Across all organization roles"
          accent="bronze"
        />

        <SummaryCard
          icon={Check}
          label="Permission groups"
          value={permissionGroups.length.toString()}
          description="Core access areas configured"
          accent="neutral"
        />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Role registry                                                      */}
      {/* ------------------------------------------------------------------ */}
      <Card className="overflow-hidden">
        <CardHeader
          title="Organization roles"
          subtitle="Access profiles determine what members can view, create, approve and manage."
          action={
            <span className="hidden rounded-full bg-ink/[0.04] px-2.5 py-1 text-[10px] font-semibold text-ink/35 sm:inline-flex">
              {roles.length} configured roles
            </span>
          }
        />

        <div className="divide-y divide-ink/[0.06]">
          {roles.map((role, index) => (
            <RoleRow key={role.name} role={role} index={index} />
          ))}
        </div>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* Permission architecture                                            */}
      {/* ------------------------------------------------------------------ */}
      <div className="grid gap-7 xl:grid-cols-[minmax(0,1fr)_360px]">
        <Card>
          <CardHeader
            title="Permission model"
            subtitle="Core access areas available when configuring organization roles."
          />

          <CardBody>
            <div className="grid gap-4 sm:grid-cols-2">
              {permissionGroups.map((group, index) => (
                <PermissionGroup
                  key={group.name}
                  group={group}
                  index={index}
                />
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Governance */}
        <Card>
          <CardHeader
            title="Role governance"
            subtitle="Access control principles"
          />

          <CardBody>
            <div className="space-y-5">
              <GovernanceItem
                number="01"
                title="Least privilege"
                description="Members should receive only the access required for their responsibilities."
              />

              <GovernanceItem
                number="02"
                title="Separation of duties"
                description="Sensitive project, financial and approval actions should not rely on a single role."
              />

              <GovernanceItem
                number="03"
                title="Auditability"
                description="Role changes and permission updates should be recorded in the organization audit trail."
              />

              <GovernanceItem
                number="04"
                title="System protection"
                description="Critical platform roles cannot be removed or modified without the required administrative authority."
              />
            </div>
          </CardBody>
        </Card>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Access notice                                                       */}
      {/* ------------------------------------------------------------------ */}
      <div className="rounded-[20px] border border-[#12613E]/[0.09] bg-[#F4F8F5] p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#12613E]/[0.09]">
            <ShieldCheck className="h-4 w-4 text-[#12613E]" />
          </div>

          <div>
            <p className="text-xs font-semibold text-[#18271F]">
              Access control is organization-scoped
            </p>

            <p className="mt-1 max-w-4xl text-xs leading-5 text-ink/40">
              Changes made here affect members within this organization.
              System permissions governing Build OS security, verification,
              escrow and platform administration remain controlled by the
              appropriate Build OS administrative layer.
            </p>
          </div>

          <span className="shrink-0 self-start rounded-full bg-white px-3 py-1.5 text-[10px] font-semibold text-[#12613E] shadow-sm">
            Governance active
          </span>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Supporting components                                                       */
/* -------------------------------------------------------------------------- */

function HeroMeta({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-3.5 w-3.5 text-[#12613E]" />

      <div className="flex items-center gap-1.5">
        <span className="text-[10px] uppercase tracking-[0.08em] text-ink/30">
          {label}
        </span>

        <span className="text-xs font-medium text-ink/60">{value}</span>
      </div>
    </div>
  )
}

function RoleRow({
  role,
  index,
}: {
  role: (typeof roles)[number]
  index: number
}) {
  return (
    <div className="group px-6 py-6 transition-colors hover:bg-[#FAFBFA] sm:px-7">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-start gap-4">
          <div
            className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
              role.system
                ? 'bg-[#18271F] text-white shadow-[0_8px_20px_rgba(24,39,31,0.12)]'
                : 'bg-[#F4F6F3] text-[#12613E]'
            }`}
          >
            <ShieldCheck className="h-[18px] w-[18px]" />

            {role.system && (
              <span className="absolute -bottom-1 -right-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#B85C12]" />
            )}
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-ink/25">
                {String(index + 1).padStart(2, '0')}
              </span>

              <h2 className="text-sm font-semibold text-ink">
                {role.name}
              </h2>

              {role.system && (
                <span className="inline-flex items-center gap-1 rounded-full bg-ink/[0.05] px-2 py-1 text-[10px] font-semibold text-ink/45">
                  System role
                </span>
              )}

              <span
                className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
                  role.system
                    ? 'bg-[#12613E]/[0.08] text-[#12613E]'
                    : 'bg-[#B85C12]/[0.08] text-[#B85C12]'
                }`}
              >
                {role.level}
              </span>
            </div>

            <p className="mt-2 max-w-2xl text-xs leading-5 text-ink/45">
              {role.description}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-5 lg:justify-end">
          <div className="flex items-center gap-5">
            <RoleMetric
              label="Members"
              value={role.members.toString()}
            />

            <RoleMetric
              label="Permissions"
              value={role.permissions.toString()}
            />
          </div>

          <button
            type="button"
            aria-label={`Manage ${role.name}`}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-ink/[0.08] bg-white text-ink/40 transition-all hover:border-ink/[0.14] hover:bg-ink/[0.03] hover:text-ink"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>

          <ChevronRight className="hidden h-4 w-4 shrink-0 text-ink/20 transition-transform group-hover:translate-x-0.5 group-hover:text-ink/40 sm:block" />
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
  accent,
}: {
  icon: ComponentType<{ className?: string }>
  label: string
  value: string
  description: string
  accent: 'green' | 'bronze' | 'neutral'
}) {
  const styles = {
    green: {
      icon: 'bg-[#12613E]/[0.08] text-[#12613E]',
      value: 'text-[#12613E]',
    },
    bronze: {
      icon: 'bg-[#B85C12]/[0.08] text-[#B85C12]',
      value: 'text-[#B85C12]',
    },
    neutral: {
      icon: 'bg-ink/[0.05] text-ink/55',
      value: 'text-ink',
    },
  }[accent]

  return (
    <Card className="transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(20,40,30,0.07)]">
      <CardBody>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-ink/30">
              {label}
            </p>

            <p
              className={`mt-1.5 font-display text-2xl font-semibold tracking-tight ${styles.value}`}
            >
              {value}
            </p>
          </div>

          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl ${styles.icon}`}
          >
            <Icon className="h-4 w-4" />
          </div>
        </div>

        <p className="mt-3 text-xs leading-5 text-ink/40">{description}</p>
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
    <div className="min-w-[56px] text-right">
      <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-ink/25">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-ink">{value}</p>
    </div>
  )
}

function PermissionGroup({
  group,
  index,
}: {
  group: (typeof permissionGroups)[number]
  index: number
}) {
  return (
    <div className="rounded-[18px] border border-ink/[0.07] bg-[#F8F9F7] p-5 transition-all duration-200 hover:border-[#12613E]/[0.12] hover:bg-white hover:shadow-[0_12px_28px_rgba(20,40,30,0.06)]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#12613E]/[0.08]">
            <span className="font-display text-[10px] font-semibold text-[#12613E]">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink">
              {group.name}
            </h3>

            <p className="mt-1 text-xs leading-5 text-ink/40">
              {group.description}
            </p>
          </div>
        </div>

        <span className="shrink-0 rounded-full bg-white px-2 py-1 text-[10px] font-semibold text-ink/35">
          {group.permissions.length}
        </span>
      </div>

      <div className="mt-5 space-y-2">
        {group.permissions.map((permission) => (
          <div
            key={permission}
            className="flex items-center gap-2.5 rounded-xl border border-ink/[0.05] bg-white px-3 py-2.5"
          >
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#12613E]/[0.08]">
              <Check className="h-3 w-3 text-[#12613E]" />
            </div>

            <span className="text-xs font-medium text-ink/55">
              {permission}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function GovernanceItem({
  number,
  title,
  description,
}: {
  number: string
  title: string
  description: string
}) {
  return (
    <div className="flex gap-3 border-b border-ink/[0.06] pb-5 last:border-0 last:pb-0">
      <span className="font-display text-[10px] font-semibold text-[#12613E]/60">
        {number}
      </span>

      <div>
        <p className="text-xs font-semibold text-ink">{title}</p>

        <p className="mt-1 text-xs leading-5 text-ink/40">
          {description}
        </p>
      </div>
    </div>
  )
}