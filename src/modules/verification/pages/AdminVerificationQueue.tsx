import {
  AlertTriangle,
  BadgeCheck,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Eye,
  FileCheck2,
  FileText,
  Filter,
  Search,
  ShieldAlert,
  ShieldCheck,
  User,
  Users,
  XCircle,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'

type VerificationStatus =
  | 'Submitted'
  | 'Need More Information'
  | 'Verified'
  | 'Rejected'
  | 'Suspended'

type ApplicantType =
  | 'Client'
  | 'Contractor'
  | 'Supplier'
  | 'Project Manager'
  | 'Professional'

type VerificationApplicant = {
  id: string
  name: string
  type: ApplicantType
  registration?: string
  submittedAt: string
  documents: number
  requiredDocuments: number
  status: VerificationStatus
  risk: 'Low' | 'Medium' | 'High'
  location: string
  trustScore?: number
}

const verificationQueue: VerificationApplicant[] = [
  {
    id: 'VER-2026-00482',
    name: 'BuildRight Construction Ltd.',
    type: 'Contractor',
    registration: 'RC 3849201',
    submittedAt: '01 Sep 2026 · 09:42',
    documents: 10,
    requiredDocuments: 10,
    status: 'Submitted',
    risk: 'Low',
    location: 'Abuja, Nigeria',
    trustScore: 82,
  },
  {
    id: 'VER-2026-00481',
    name: 'Amina Yusuf',
    type: 'Client',
    submittedAt: '01 Sep 2026 · 08:17',
    documents: 6,
    requiredDocuments: 7,
    status: 'Need More Information',
    risk: 'Medium',
    location: 'London, United Kingdom',
  },
  {
    id: 'VER-2026-00480',
    name: 'Prime Build Materials Ltd.',
    type: 'Supplier',
    registration: 'RC 2198473',
    submittedAt: '31 Aug 2026 · 16:34',
    documents: 9,
    requiredDocuments: 9,
    status: 'Submitted',
    risk: 'Low',
    location: 'Abuja, Nigeria',
    trustScore: 94,
  },
  {
    id: 'VER-2026-00479',
    name: 'Ibrahim Bello',
    type: 'Professional',
    submittedAt: '31 Aug 2026 · 14:21',
    documents: 5,
    requiredDocuments: 6,
    status: 'Submitted',
    risk: 'Medium',
    location: 'Kano, Nigeria',
  },
  {
    id: 'VER-2026-00478',
    name: 'NorthPoint Project Management',
    type: 'Project Manager',
    registration: 'PM-092481',
    submittedAt: '31 Aug 2026 · 11:08',
    documents: 7,
    requiredDocuments: 7,
    status: 'Submitted',
    risk: 'Low',
    location: 'Lagos, Nigeria',
    trustScore: 88,
  },
]

const statusFilters: Array<'All' | VerificationStatus> = [
  'All',
  'Submitted',
  'Need More Information',
  'Verified',
  'Rejected',
  'Suspended',
]

const verificationStats = [
  {
    label: 'Pending review',
    value: '18',
    description: 'Awaiting admin review',
    icon: Clock3,
  },
  {
    label: 'Need information',
    value: '5',
    description: 'Applicants requiring action',
    icon: AlertTriangle,
  },
  {
    label: 'Verified',
    value: '342',
    description: 'Active verified accounts',
    icon: ShieldCheck,
  },
  {
    label: 'High risk',
    value: '3',
    description: 'Requires enhanced review',
    icon: ShieldAlert,
  },
]

export function AdminVerificationQueue() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5">
              <ShieldCheck className="h-4 w-4 text-ink/60" />
            </div>

            <span className="text-xs font-semibold uppercase tracking-wide text-ink/40">
              Admin control centre
            </span>
          </div>

          <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink">
            Verification Queue
          </h1>

          <p className="mt-1 max-w-2xl text-sm text-ink/45">
            Review identity, business and professional verification
            submissions before granting transaction access.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-xs font-semibold text-ink transition-colors hover:bg-ink/[0.03]"
          >
            <FileCheck2 className="h-3.5 w-3.5" />
            Verification rules
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
          >
            <Users className="h-3.5 w-3.5" />
            Review all
          </button>
        </div>
      </div>

      {/* Summary metrics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {verificationStats.map((stat) => (
          <VerificationMetric
            key={stat.label}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            description={stat.description}
          />
        ))}
      </div>

      {/* Queue */}
      <Card className="overflow-hidden">
        <CardHeader
          title="Pending verification submissions"
          subtitle="Applicants currently awaiting verification review"
        />

        {/* Toolbar */}
        <div className="border-y border-line px-6 py-4">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="relative w-full xl:max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/30" />

              <input
                type="search"
                placeholder="Search applicant, ID or registration..."
                className="h-10 w-full rounded-xl border border-line bg-paper-2 pl-9 pr-3 text-xs text-ink outline-none placeholder:text-ink/30 focus:border-ink/20 focus:ring-2 focus:ring-ink/5"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-3 py-2 text-xs font-semibold text-ink/60 hover:bg-ink/[0.03]"
              >
                <Filter className="h-3.5 w-3.5" />
                Filters
              </button>

              {statusFilters.slice(0, 3).map((filter) => (
                <button
                  key={filter}
                  type="button"
                  className={
                    filter === 'Submitted'
                      ? 'rounded-xl bg-ink px-3 py-2 text-xs font-semibold text-white'
                      : 'rounded-xl border border-line bg-white px-3 py-2 text-xs font-semibold text-ink/50 hover:bg-ink/[0.03]'
                  }
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px]">
            <thead>
              <tr className="border-b border-line bg-paper-2 text-left">
                <th className="px-6 py-3 text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                  Applicant
                </th>

                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                  Role
                </th>

                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                  Documents
                </th>

                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                  Risk
                </th>

                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                  Submitted
                </th>

                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                  Status
                </th>

                <th className="px-6 py-3 text-right text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-line">
              {verificationQueue.map((applicant) => (
                <VerificationRow
                  key={applicant.id}
                  applicant={applicant}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-3 border-t border-line px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink/40">
            Showing <span className="font-semibold text-ink/60">5</span> of{' '}
            <span className="font-semibold text-ink/60">18</span> pending
            submissions
          </p>

          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled
              className="rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-ink/25"
            >
              Previous
            </button>

            <button
              type="button"
              className="rounded-lg bg-ink px-3 py-1.5 text-xs font-semibold text-white"
            >
              1
            </button>

            <button
              type="button"
              className="rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-ink/50 hover:bg-ink/[0.03]"
            >
              2
            </button>

            <button
              type="button"
              className="rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-ink/50 hover:bg-ink/[0.03]"
            >
              Next
            </button>
          </div>
        </div>
      </Card>

      {/* Verification lifecycle */}
      <Card>
        <CardHeader
          title="Verification lifecycle"
          subtitle="Build OS verification states defined by the governance framework"
        />

        <CardBody>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
            <LifecycleItem
              icon={FileText}
              title="Draft"
              description="Profile started but required documents are incomplete."
              access="Save profile only"
            />

            <LifecycleItem
              icon={Clock3}
              title="Submitted"
              description="Required documents have been submitted for review."
              access="Pending review"
            />

            <LifecycleItem
              icon={AlertTriangle}
              title="Need More Information"
              description="Admin has requested additional evidence or corrections."
              access="Edit rejected fields"
            />

            <LifecycleItem
              icon={CheckCircle2}
              title="Verified"
              description="Required verification checks have been successfully passed."
              access="Full role access"
            />

            <LifecycleItem
              icon={XCircle}
              title="Rejected / Suspended"
              description="Verification failed or account access has been restricted."
              access="Appeal / reapply"
            />
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

function VerificationMetric({
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
        <div className="flex items-start justify-between">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5">
            <Icon className="h-4 w-4 text-ink/55" />
          </div>

          <ChevronRight className="h-4 w-4 text-ink/20" />
        </div>

        <p className="mt-5 text-[10px] font-semibold uppercase tracking-wide text-ink/35">
          {label}
        </p>

        <p className="mt-1 font-display text-2xl font-semibold tracking-tight text-ink">
          {value}
        </p>

        <p className="mt-1 text-xs text-ink/40">
          {description}
        </p>
      </CardBody>
    </Card>
  )
}

function VerificationRow({
  applicant,
}: {
  applicant: VerificationApplicant
}) {
  return (
    <tr className="transition-colors hover:bg-ink/[0.015]">
      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink/5">
            {applicant.type === 'Client' ? (
              <User className="h-4 w-4 text-ink/50" />
            ) : (
              <Building2 className="h-4 w-4 text-ink/50" />
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="truncate text-sm font-semibold text-ink">
                {applicant.name}
              </p>

              {applicant.trustScore && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] font-semibold text-emerald-700">
                  <BadgeCheck className="h-3 w-3" />
                  {applicant.trustScore}
                </span>
              )}
            </div>

            <p className="mt-1 text-[10px] font-mono text-ink/35">
              {applicant.id}
            </p>
          </div>
        </div>
      </td>

      <td className="px-4 py-5">
        <p className="text-xs font-medium text-ink/65">
          {applicant.type}
        </p>

        <p className="mt-1 text-[10px] text-ink/35">
          {applicant.location}
        </p>
      </td>

      <td className="px-4 py-5">
        <div className="flex items-center gap-2">
          <FileCheck2 className="h-3.5 w-3.5 text-ink/35" />

          <span className="text-xs font-semibold text-ink">
            {applicant.documents}/{applicant.requiredDocuments}
          </span>
        </div>

        <div className="mt-2 h-1.5 w-24 overflow-hidden rounded-full bg-ink/5">
          <div
            className="h-full rounded-full bg-ink"
            style={{
              width: `${
                (applicant.documents / applicant.requiredDocuments) * 100
              }%`,
            }}
          />
        </div>
      </td>

      <td className="px-4 py-5">
        <RiskBadge risk={applicant.risk} />
      </td>

      <td className="px-4 py-5">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-3.5 w-3.5 text-ink/25" />

          <span className="text-xs text-ink/50">
            {applicant.submittedAt}
          </span>
        </div>
      </td>

      <td className="px-4 py-5">
        <StatusBadge status={applicant.status} />
      </td>

      <td className="px-6 py-5 text-right">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-white px-3 py-2 text-xs font-semibold text-ink/60 transition-colors hover:bg-ink/[0.03] hover:text-ink"
        >
          <Eye className="h-3.5 w-3.5" />
          Review
        </button>
      </td>
    </tr>
  )
}

function StatusBadge({
  status,
}: {
  status: VerificationStatus
}) {
  const styles: Record<VerificationStatus, string> = {
    Submitted: 'bg-amber-500/10 text-amber-700',
    'Need More Information': 'bg-orange-500/10 text-orange-700',
    Verified: 'bg-emerald-500/10 text-emerald-700',
    Rejected: 'bg-rose-500/10 text-rose-700',
    Suspended: 'bg-rose-500/10 text-rose-700',
  }

  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  )
}

function RiskBadge({
  risk,
}: {
  risk: VerificationApplicant['risk']
}) {
  const styles = {
    Low: 'bg-emerald-500/10 text-emerald-700',
    Medium: 'bg-amber-500/10 text-amber-700',
    High: 'bg-rose-500/10 text-rose-700',
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${styles[risk]}`}
    >
      {risk === 'High' ? (
        <ShieldAlert className="h-3 w-3" />
      ) : risk === 'Medium' ? (
        <AlertTriangle className="h-3 w-3" />
      ) : (
        <ShieldCheck className="h-3 w-3" />
      )}

      {risk} risk
    </span>
  )
}

function LifecycleItem({
  icon: Icon,
  title,
  description,
  access,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  access: string
}) {
  return (
    <div className="rounded-2xl border border-line bg-paper-2 p-4">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm">
        <Icon className="h-4 w-4 text-ink/50" />
      </div>

      <h3 className="mt-4 text-sm font-semibold text-ink">
        {title}
      </h3>

      <p className="mt-1 text-xs leading-5 text-ink/40">
        {description}
      </p>

      <div className="mt-4 border-t border-line pt-3">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/30">
          Access level
        </p>

        <p className="mt-1 text-xs font-medium text-ink/60">
          {access}
        </p>
      </div>
    </div>
  )
}