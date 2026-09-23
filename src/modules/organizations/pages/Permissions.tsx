import type { ComponentType } from 'react'

import {
  Check,
  ChevronDown,
  LockKeyhole,
  ShieldCheck,
  Users,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'

const roles = [
  {
    name: 'Organization Admin',
    description: 'Full organization administration',
    members: 1,
  },
  {
    name: 'Project Manager',
    description: 'Projects, monitoring and milestones',
    members: 4,
  },
  {
    name: 'Finance Manager',
    description: 'Escrow and financial operations',
    members: 2,
  },
  {
    name: 'Procurement Officer',
    description: 'Materials and supplier operations',
    members: 3,
  },
]

const permissionGroups = [
  {
    title: 'Organization',
    description: 'Identity, membership and administrative controls.',
    permissions: [
      'View organization profile',
      'Edit organization profile',
      'Manage members',
      'Manage roles and permissions',
    ],
  },
  {
    title: 'Projects',
    description: 'Project creation, delivery and operational decisions.',
    permissions: [
      'View projects',
      'Create projects',
      'Edit project information',
      'Approve project actions',
    ],
  },
  {
    title: 'Procurement',
    description: 'Materials, supplier requests and delivery verification.',
    permissions: [
      'View procurement requests',
      'Create material requests',
      'Approve supplier quotations',
      'Verify deliveries',
    ],
  },
  {
    title: 'Finance & Escrow',
    description: 'Financial visibility, funding and controlled releases.',
    permissions: [
      'View wallet balances',
      'Fund project escrow',
      'Approve payment requests',
      'View financial reports',
    ],
  },
  {
    title: 'Monitoring & Reports',
    description: 'Evidence, milestones, reporting and project oversight.',
    permissions: [
      'View project reports',
      'Upload reports',
      'Verify milestones',
      'View project evidence',
    ],
  },
]

const enabledPermissions = new Set([
  'View organization profile',
  'Edit organization profile',
  'Manage members',
  'Manage roles and permissions',
  'View projects',
  'Create projects',
  'Edit project information',
  'Approve project actions',
  'View procurement requests',
  'Create material requests',
  'Approve supplier quotations',
  'Verify deliveries',
  'View wallet balances',
  'View financial reports',
  'View project reports',
  'Upload reports',
  'Verify milestones',
  'View project evidence',
])

export function Permissions() {
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
                  Security governance
                </span>

                <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-ink/25">
                  Role-based access
                </span>
              </div>

              <h1 className="mt-4 font-display text-3xl font-semibold tracking-[-0.035em] text-ink sm:text-4xl">
                Permissions
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/45">
                Define how organization members access projects, financial
                operations, procurement, monitoring and administrative
                controls.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
                <HeroMeta
                  icon={ShieldCheck}
                  label="Access model"
                  value="Role-based"
                />

                <HeroMeta
                  icon={LockKeyhole}
                  label="Control posture"
                  value="Least privilege"
                />

                <HeroMeta
                  icon={Users}
                  label="Assigned users"
                  value="10 members"
                />
              </div>
            </div>

            <div className="shrink-0 rounded-2xl border border-[#12613E]/[0.09] bg-[#F4F8F5] px-4 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-ink/30">
                Current role
              </p>

              <div className="mt-1.5 flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#12613E]/[0.1]">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#12613E]" />
                </div>

                <span className="text-xs font-semibold text-[#18271F]">
                  Organization Admin
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Summary                                                            */}
      {/* ------------------------------------------------------------------ */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Summary
          icon={ShieldCheck}
          label="Roles"
          value="4"
          description="Configured access roles"
          accent="green"
        />

        <Summary
          icon={Users}
          label="Members"
          value="10"
          description="Users assigned to roles"
          accent="bronze"
        />

        <Summary
          icon={LockKeyhole}
          label="Permissions"
          value="24"
          description="Available organization controls"
          accent="neutral"
        />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Role registry                                                      */}
      {/* ------------------------------------------------------------------ */}
      <Card>
        <CardHeader
          title="Role configuration"
          subtitle="Select a role to inspect its organization access profile."
        />

        <CardBody>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {roles.map((role, index) => {
              const selected = index === 0

              return (
                <button
                  key={role.name}
                  type="button"
                  className={`group relative overflow-hidden rounded-[18px] border p-4 text-left transition-all duration-200 ${
                    selected
                      ? 'border-[#18271F] bg-[#18271F] text-white shadow-[0_14px_32px_rgba(24,39,31,0.16)]'
                      : 'border-ink/[0.07] bg-[#F8F9F7] text-ink hover:-translate-y-0.5 hover:border-[#12613E]/[0.18] hover:bg-white hover:shadow-[0_12px_28px_rgba(20,40,30,0.07)]'
                  }`}
                >
                  {selected && (
                    <div className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full bg-[#12613E]/20 blur-2xl" />
                  )}

                  <div className="relative flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
                            selected
                              ? 'bg-white/[0.1]'
                              : 'bg-[#12613E]/[0.08]'
                          }`}
                        >
                          <ShieldCheck
                            className={`h-3.5 w-3.5 ${
                              selected
                                ? 'text-white/75'
                                : 'text-[#12613E]/75'
                            }`}
                          />
                        </div>

                        <p className="text-sm font-semibold leading-5">
                          {role.name}
                        </p>
                      </div>

                      <p
                        className={`mt-3 text-xs leading-5 ${
                          selected ? 'text-white/45' : 'text-ink/40'
                        }`}
                      >
                        {role.description}
                      </p>
                    </div>

                    <ChevronDown
                      className={`mt-1 h-4 w-4 shrink-0 transition-transform ${
                        selected
                          ? 'text-white/45'
                          : 'text-ink/25 group-hover:text-ink/50'
                      }`}
                    />
                  </div>

                  <div
                    className={`relative mt-5 flex items-center justify-between border-t pt-3 text-[10px] font-semibold ${
                      selected
                        ? 'border-white/[0.08] text-white/50'
                        : 'border-ink/[0.06] text-ink/35'
                    }`}
                  >
                    <span>
                      {role.members} assigned member
                      {role.members !== 1 ? 's' : ''}
                    </span>

                    {selected && (
                      <span className="inline-flex items-center gap-1.5 text-[#B9DCC9]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#6CC394]" />
                        Selected
                      </span>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </CardBody>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* Selected role                                                       */}
      {/* ------------------------------------------------------------------ */}
      <Card className="overflow-hidden">
        <div className="border-b border-ink/[0.06] bg-[#F4F6F3] px-6 py-6 sm:px-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#18271F] shadow-[0_10px_24px_rgba(24,39,31,0.12)]">
                <ShieldCheck className="h-5 w-5 text-white" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-display text-lg font-semibold tracking-tight text-ink">
                    Organization Admin permissions
                  </h2>

                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#12613E]/[0.08] px-2.5 py-1 text-[10px] font-semibold text-[#12613E]">
                    <ShieldCheck className="h-3 w-3" />
                    Protected role
                  </span>
                </div>

                <p className="mt-1 text-xs text-ink/40">
                  Full-access role · 1 member assigned
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-ink/[0.07] bg-white px-3.5 py-2.5">
              <p className="text-[10px] uppercase tracking-[0.08em] text-ink/30">
                Access coverage
              </p>

              <p className="mt-0.5 text-sm font-semibold text-[#12613E]">
                18 of 18 enabled
              </p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-ink/[0.06]">
          {permissionGroups.map((group, groupIndex) => (
            <PermissionGroup
              key={group.title}
              group={group}
              index={groupIndex}
            />
          ))}
        </div>

        {/* Governance note */}
        <div className="border-t border-ink/[0.06] bg-[#F8F9F7] px-6 py-5 sm:px-7">
          <div className="flex gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#B85C12]/[0.08]">
              <LockKeyhole className="h-4 w-4 text-[#B85C12]" />
            </div>

            <div>
              <p className="text-xs font-semibold text-ink">
                Governance principle
              </p>

              <p className="mt-1 max-w-4xl text-xs leading-5 text-ink/40">
                Permissions should follow the principle of least privilege.
                Financial releases, verification decisions and sensitive
                administrative actions should follow the appropriate approval
                chain and remain fully auditable.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* Security posture                                                    */}
      {/* ------------------------------------------------------------------ */}
      <div className="rounded-[20px] border border-[#12613E]/[0.09] bg-[#F4F8F5] p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#12613E]/[0.09]">
              <ShieldCheck className="h-4 w-4 text-[#12613E]" />
            </div>

            <div>
              <p className="text-xs font-semibold text-[#18271F]">
                Access governance is active
              </p>

              <p className="mt-1 max-w-2xl text-xs leading-5 text-ink/40">
                Organization permissions are structured by role. Sensitive
                actions should remain restricted to authorized users and
                recorded within the organization audit trail.
              </p>
            </div>
          </div>

          <div className="shrink-0 rounded-full bg-white px-3 py-1.5 text-[10px] font-semibold text-[#12613E] shadow-sm">
            Policy enforced
          </div>
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

function Summary({
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
  const accentStyles = {
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
  }

  const styles = accentStyles[accent]

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

function PermissionGroup({
  group,
  index,
}: {
  group: (typeof permissionGroups)[number]
  index: number
}) {
  return (
    <div className="px-6 py-6 sm:px-7">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F4F6F3]">
            <span className="font-display text-xs font-semibold text-ink/45">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink">
              {group.title}
            </h3>

            <p className="mt-1 text-xs leading-5 text-ink/40">
              {group.description}
            </p>
          </div>
        </div>

        <span className="self-start rounded-full bg-ink/[0.04] px-2.5 py-1 text-[10px] font-semibold text-ink/35">
          {group.permissions.length} controls
        </span>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {group.permissions.map((permission) => {
          const enabled = enabledPermissions.has(permission)

          return (
            <PermissionRow
              key={permission}
              permission={permission}
              enabled={enabled}
            />
          )
        })}
      </div>
    </div>
  )
}

function PermissionRow({
  permission,
  enabled,
}: {
  permission: string
  enabled: boolean
}) {
  return (
    <div
      className={`group flex items-center gap-3 rounded-xl border px-3.5 py-3 transition-colors ${
        enabled
          ? 'border-[#12613E]/[0.07] bg-[#F8F9F7] hover:border-[#12613E]/[0.14] hover:bg-[#F4F8F5]'
          : 'border-ink/[0.06] bg-ink/[0.02]'
      }`}
    >
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
          enabled ? 'bg-[#12613E]/[0.09]' : 'bg-ink/[0.05]'
        }`}
      >
        {enabled ? (
          <Check className="h-3.5 w-3.5 text-[#12613E]" />
        ) : (
          <LockKeyhole className="h-3.5 w-3.5 text-ink/25" />
        )}
      </div>

      <span
        className={`text-xs font-medium ${
          enabled ? 'text-ink/65' : 'text-ink/35'
        }`}
      >
        {permission}
      </span>

      {enabled && (
        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#12613E]/50" />
      )}
    </div>
  )
}