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
    permissions: [
      'View organization profile',
      'Edit organization profile',
      'Manage members',
      'Manage roles and permissions',
    ],
  },
  {
    title: 'Projects',
    permissions: [
      'View projects',
      'Create projects',
      'Edit project information',
      'Approve project actions',
    ],
  },
  {
    title: 'Procurement',
    permissions: [
      'View procurement requests',
      'Create material requests',
      'Approve supplier quotations',
      'Verify deliveries',
    ],
  },
  {
    title: 'Finance & Escrow',
    permissions: [
      'View wallet balances',
      'Fund project escrow',
      'Approve payment requests',
      'View financial reports',
    ],
  },
  {
    title: 'Monitoring & Reports',
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
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
          Organization security
        </p>

        <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight text-ink">
          Permissions
        </h1>

        <p className="mt-1 text-sm text-ink/45">
          Configure role-based access to organization resources and actions.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Summary
          icon={ShieldCheck}
          label="Roles"
          value="4"
          description="Configured access roles"
        />

        <Summary
          icon={Users}
          label="Members"
          value="10"
          description="Users assigned to roles"
        />

        <Summary
          icon={LockKeyhole}
          label="Permissions"
          value="24"
          description="Available organization controls"
        />
      </div>

      <Card>
        <CardHeader
          title="Role configuration"
          subtitle="Select a role to manage its permission set"
        />

        <CardBody>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {roles.map((role, index) => (
              <button
                key={role.name}
                type="button"
                className={`rounded-xl border p-4 text-left transition-colors ${
                  index === 0
                    ? 'border-ink bg-ink text-white'
                    : 'border-line bg-paper-2 text-ink hover:border-ink/20'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">{role.name}</p>
                    <p
                      className={`mt-1 text-xs ${
                        index === 0 ? 'text-white/50' : 'text-ink/40'
                      }`}
                    >
                      {role.description}
                    </p>
                  </div>

                  <ChevronDown
                    className={`h-4 w-4 ${
                      index === 0 ? 'text-white/50' : 'text-ink/30'
                    }`}
                  />
                </div>

                <div
                  className={`mt-4 text-[10px] font-semibold ${
                    index === 0 ? 'text-white/60' : 'text-ink/40'
                  }`}
                >
                  {role.members} assigned member
                  {role.members !== 1 ? 's' : ''}
                </div>
              </button>
            ))}
          </div>
        </CardBody>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader
          title="Organization Admin permissions"
          subtitle="Full-access role · 1 member assigned"
          action={
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-[10px] font-semibold text-emerald-700">
              <ShieldCheck className="h-3.5 w-3.5" />
              Protected role
            </span>
          }
        />

        <div className="divide-y divide-line">
          {permissionGroups.map((group) => (
            <div key={group.title} className="px-6 py-6">
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-ink">
                  {group.title}
                </h3>

                <p className="mt-1 text-xs text-ink/40">
                  Controls available within this area.
                </p>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                {group.permissions.map((permission) => {
                  const enabled = enabledPermissions.has(permission)

                  return (
                    <div
                      key={permission}
                      className="flex items-center gap-3 rounded-xl border border-line bg-paper-2 px-3 py-3"
                    >
                      <div
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                          enabled
                            ? 'bg-emerald-500/10'
                            : 'bg-ink/5'
                        }`}
                      >
                        {enabled ? (
                          <Check className="h-3.5 w-3.5 text-emerald-600" />
                        ) : (
                          <LockKeyhole className="h-3.5 w-3.5 text-ink/30" />
                        )}
                      </div>

                      <span className="text-xs font-medium text-ink/65">
                        {permission}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-line bg-paper-2 px-6 py-4">
          <p className="text-[10px] leading-5 text-ink/40">
            Permissions should follow the principle of least privilege.
            Financial releases, verification decisions and sensitive
            administrative actions should require the appropriate approval
            chain and remain fully auditable.
          </p>
        </div>
      </Card>
    </div>
  )
}

function Summary({
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