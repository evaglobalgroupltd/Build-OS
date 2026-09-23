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
    tone: 'green',
  },
  {
    label: 'Need information',
    value: '5',
    description: 'Applicants requiring action',
    icon: AlertTriangle,
    tone: 'bronze',
  },
  {
    label: 'Verified',
    value: '342',
    description: 'Active verified accounts',
    icon: ShieldCheck,
    tone: 'green',
  },
  {
    label: 'High risk',
    value: '3',
    description: 'Requires enhanced review',
    icon: ShieldAlert,
    tone: 'brick',
  },
] as const

export function AdminVerificationQueue() {
  return (
    <div className="space-y-7">
      {/* ------------------------------------------------------------------ */}
      {/* Page header                                                         */}
      {/* ------------------------------------------------------------------ */}

      <section className="relative overflow-hidden rounded-[24px] border border-ink/[0.07] bg-white shadow-[0_18px_50px_rgba(20,40,30,0.055)]">
        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#12613E]/[0.055] blur-3xl" />

        <div className="relative flex flex-col gap-6 p-6 sm:p-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#12613E]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/40">
                Admin control centre
              </span>
            </div>

            <h1 className="mt-3 font-display text-[30px] font-semibold tracking-[-0.035em] text-ink sm:text-[34px]">
              Verification Queue
            </h1>

            <p className="mt-2 max-w-xl text-[13px] leading-6 text-ink/45">
              Review identity, business and professional verification
              submissions before granting transaction access across Build OS.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <HeaderMeta icon={ShieldCheck} label="Governance protected" />
              <HeaderMeta icon={FileCheck2} label="18 awaiting review" />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-ink/[0.08] bg-white px-4 text-xs font-semibold text-ink/65 shadow-[0_4px_16px_rgba(20,40,30,0.035)] transition-all hover:border-ink/15 hover:bg-paper-2 hover:text-ink"
            >
              <FileCheck2 className="h-3.5 w-3.5" />
              Verification rules
            </button>

            <button
              type="button"
              className="inline-flex h-10 items-center gap-2 rounded-full bg-ink px-4 text-xs font-semibold text-white shadow-[0_8px_20px_rgba(20,40,30,0.12)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(20,40,30,0.16)]"
            >
              <Users className="h-3.5 w-3.5" />
              Review all
            </button>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Summary metrics                                                     */}
      {/* ------------------------------------------------------------------ */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {verificationStats.map((stat) => (
          <VerificationMetric
            key={stat.label}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            description={stat.description}
            tone={stat.tone}
          />
        ))}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Verification queue                                                  */}
      {/* ------------------------------------------------------------------ */}

      <Card className="overflow-hidden border-ink/[0.07] shadow-[0_18px_50px_rgba(20,40,30,0.045)]">
        <CardHeader
          title="Pending verification submissions"
          subtitle="Applicants currently awaiting verification review"
        />

        {/* Queue overview strip */}
        <div className="border-y border-ink/[0.06] bg-paper-2/60 px-6 py-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF4EE] text-[#12613E]">
                <ShieldCheck className="h-4 w-4" />
              </div>

              <div>
                <p className="text-xs font-semibold text-ink">
                  Verification review desk
                </p>

                <p className="mt-0.5 text-[11px] text-ink/40">
                  Identity, business, document and risk controls
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-[11px] text-ink/40">
              <span>
                Queue{' '}
                <strong className="font-semibold text-ink/70">18</strong>
              </span>

              <span className="h-3.5 w-px bg-ink/10" />

              <span>
                Enhanced review{' '}
                <strong className="font-semibold text-[#B85C12]">3</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="border-b border-ink/[0.06] px-6 py-4">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="relative w-full xl:max-w-sm">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink/25" />

              <input
                type="search"
                placeholder="Search applicant, ID or registration..."
                className="h-10 w-full rounded-xl border border-ink/[0.08] bg-paper-2 pl-10 pr-3 text-xs text-ink outline-none transition-all placeholder:text-ink/30 focus:border-[#12613E]/25 focus:bg-white focus:ring-2 focus:ring-[#12613E]/[0.06]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-ink/[0.08] bg-white px-3.5 py-2 text-[11px] font-semibold text-ink/60 transition-colors hover:bg-paper-2 hover:text-ink"
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
                      ? 'rounded-full bg-ink px-3.5 py-2 text-[11px] font-semibold text-white shadow-[0_5px_14px_rgba(20,40,30,0.10)]'
                      : 'rounded-full border border-ink/[0.08] bg-white px-3.5 py-2 text-[11px] font-semibold text-ink/50 transition-colors hover:bg-paper-2 hover:text-ink'
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
          <table className="w-full min-w-[1040px]">
            <thead>
              <tr className="border-b border-ink/[0.06] bg-paper-2/70 text-left">
                <th className="px-6 py-3.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/35">
                  Applicant
                </th>

                <th className="px-4 py-3.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/35">
                  Role
                </th>

                <th className="px-4 py-3.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/35">
                  Documents
                </th>

                <th className="px-4 py-3.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/35">
                  Risk
                </th>

                <th className="px-4 py-3.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/35">
                  Submitted
                </th>

                <th className="px-4 py-3.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/35">
                  Status
                </th>

                <th className="px-6 py-3.5 text-right text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/35">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-ink/[0.055]">
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
        <div className="flex flex-col gap-3 border-t border-ink/[0.06] px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] text-ink/40">
            Showing{' '}
            <span className="font-semibold text-ink/65">5</span> of{' '}
            <span className="font-semibold text-ink/65">18</span> pending
            submissions
          </p>

          <div className="flex items-center gap-1.5">
            <PaginationButton disabled>
              Previous
            </PaginationButton>

            <PaginationButton active>1</PaginationButton>

            <PaginationButton>2</PaginationButton>

            <PaginationButton>Next</PaginationButton>
          </div>
        </div>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* Verification lifecycle                                              */}
      {/* ------------------------------------------------------------------ */}

      <Card className="border-ink/[0.07] shadow-[0_18px_50px_rgba(20,40,30,0.035)]">
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
              tone="neutral"
            />

            <LifecycleItem
              icon={Clock3}
              title="Submitted"
              description="Required documents have been submitted for review."
              access="Pending review"
              tone="bronze"
            />

            <LifecycleItem
              icon={AlertTriangle}
              title="Need More Information"
              description="Admin has requested additional evidence or corrections."
              access="Edit rejected fields"
              tone="bronze"
            />

            <LifecycleItem
              icon={CheckCircle2}
              title="Verified"
              description="Required verification checks have been successfully passed."
              access="Full role access"
              tone="green"
            />

            <LifecycleItem
              icon={XCircle}
              title="Rejected / Suspended"
              description="Verification failed or account access has been restricted."
              access="Appeal / reapply"
              tone="brick"
            />
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Header metadata                                                            */
/* -------------------------------------------------------------------------- */

function HeaderMeta({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-ink/[0.07] bg-paper-2 px-3 py-1.5">
      <Icon className="h-3 w-3 text-[#12613E]" />

      <span className="text-[10px] font-medium text-ink/50">
        {label}
      </span>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Summary metric                                                             */
/* -------------------------------------------------------------------------- */

function VerificationMetric({
  icon: Icon,
  label,
  value,
  description,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  description: string
  tone: 'green' | 'bronze' | 'brick'
}) {
  const toneStyles = {
    green: {
      icon: 'bg-[#EAF4EE] text-[#12613E]',
      accent: 'bg-[#12613E]',
    },
    bronze: {
      icon: 'bg-[#F8EEE6] text-[#B85C12]',
      accent: 'bg-[#B85C12]',
    },
    brick: {
      icon: 'bg-brick-light/50 text-brick',
      accent: 'bg-brick',
    },
  }

  const styles = toneStyles[tone]

  return (
    <Card className="group border-ink/[0.07] transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/[0.11] hover:shadow-[0_16px_36px_rgba(20,40,30,0.055)]">
      <CardBody>
        <div className="flex items-start justify-between">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-[14px] ${styles.icon}`}
          >
            <Icon className="h-4 w-4" />
          </div>

          <ChevronRight className="h-4 w-4 text-ink/15 transition-transform group-hover:translate-x-0.5" />
        </div>

        <div className="mt-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/35">
              {label}
            </p>

            <p className="mt-1 font-display text-[27px] font-semibold tracking-[-0.035em] text-ink tabular-nums">
              {value}
            </p>
          </div>

          <span
            className={`mb-1 h-1.5 w-1.5 rounded-full ${styles.accent}`}
          />
        </div>

        <p className="mt-1 text-[11px] text-ink/40">
          {description}
        </p>
      </CardBody>
    </Card>
  )
}

/* -------------------------------------------------------------------------- */
/* Verification row                                                           */
/* -------------------------------------------------------------------------- */

function VerificationRow({
  applicant,
}: {
  applicant: VerificationApplicant
}) {
  const documentPercentage =
    applicant.requiredDocuments > 0
      ? Math.round(
          (applicant.documents / applicant.requiredDocuments) * 100,
        )
      : 0

  const isIndividual = applicant.type === 'Client'

  return (
    <tr className="group transition-colors hover:bg-[#12613E]/[0.018]">
      {/* Applicant */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-3.5">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] border border-ink/[0.06] ${
              isIndividual
                ? 'bg-[#EEF4F0]'
                : 'bg-[#F2F3F0]'
            }`}
          >
            {isIndividual ? (
              <User className="h-4 w-4 text-[#12613E]/70" />
            ) : (
              <Building2 className="h-4 w-4 text-ink/45" />
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="truncate text-[13px] font-semibold text-ink">
                {applicant.name}
              </p>

              {applicant.trustScore !== undefined && (
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[#12613E]/10 bg-[#EAF4EE] px-2 py-0.5 text-[9px] font-semibold text-[#12613E]">
                  <BadgeCheck className="h-2.5 w-2.5" />
                  {applicant.trustScore}
                </span>
              )}
            </div>

            <div className="mt-1 flex flex-wrap items-center gap-2">
              <span className="font-mono text-[9px] text-ink/30">
                {applicant.id}
              </span>

              {applicant.registration && (
                <>
                  <span className="h-1 w-1 rounded-full bg-ink/15" />

                  <span className="text-[9px] text-ink/35">
                    {applicant.registration}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </td>

      {/* Role */}
      <td className="px-4 py-5">
        <p className="text-xs font-semibold text-ink/70">
          {applicant.type}
        </p>

        <p className="mt-1 text-[10px] text-ink/35">
          {applicant.location}
        </p>
      </td>

      {/* Documents */}
      <td className="px-4 py-5">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-paper-2">
            <FileCheck2 className="h-3.5 w-3.5 text-ink/35" />
          </div>

          <span className="text-xs font-semibold tabular-nums text-ink/75">
            {applicant.documents}/{applicant.requiredDocuments}
          </span>
        </div>

        <div className="mt-2.5 flex items-center gap-2">
          <div className="h-1.5 w-20 overflow-hidden rounded-full bg-ink/[0.06]">
            <div
              className={`h-full rounded-full transition-all ${
                documentPercentage === 100
                  ? 'bg-[#12613E]'
                  : 'bg-[#B85C12]'
              }`}
              style={{
                width: `${documentPercentage}%`,
              }}
            />
          </div>

          <span className="text-[9px] font-medium tabular-nums text-ink/30">
            {documentPercentage}%
          </span>
        </div>
      </td>

      {/* Risk */}
      <td className="px-4 py-5">
        <RiskBadge risk={applicant.risk} />
      </td>

      {/* Submitted */}
      <td className="px-4 py-5">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-3.5 w-3.5 text-ink/25" />

          <span className="whitespace-nowrap text-[11px] text-ink/50">
            {applicant.submittedAt}
          </span>
        </div>
      </td>

      {/* Status */}
      <td className="px-4 py-5">
        <StatusBadge status={applicant.status} />
      </td>

      {/* Action */}
      <td className="px-6 py-5 text-right">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-full border border-ink/[0.08] bg-white px-3.5 py-2 text-[10px] font-semibold text-ink/55 shadow-[0_3px_10px_rgba(20,40,30,0.025)] transition-all hover:border-ink/15 hover:bg-paper-2 hover:text-ink"
        >
          <Eye className="h-3.5 w-3.5" />
          Review
          <ChevronRight className="h-3 w-3 text-ink/25" />
        </button>
      </td>
    </tr>
  )
}

/* -------------------------------------------------------------------------- */
/* Status badge                                                               */
/* -------------------------------------------------------------------------- */

function StatusBadge({
  status,
}: {
  status: VerificationStatus
}) {
  const styles: Record<
    VerificationStatus,
    {
      wrapper: string
      dot: string
    }
  > = {
    Submitted: {
      wrapper: 'bg-[#F8EEE6] text-[#B85C12]',
      dot: 'bg-[#B85C12]',
    },
    'Need More Information': {
      wrapper: 'bg-[#F8EEE6] text-[#B85C12]',
      dot: 'bg-[#B85C12]',
    },
    Verified: {
      wrapper: 'bg-[#EAF4EE] text-[#12613E]',
      dot: 'bg-[#12613E]',
    },
    Rejected: {
      wrapper: 'bg-brick-light/50 text-brick',
      dot: 'bg-brick',
    },
    Suspended: {
      wrapper: 'bg-brick-light/50 text-brick',
      dot: 'bg-brick',
    },
  }

  const style = styles[status]

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1.5 text-[9px] font-semibold ${style.wrapper}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
      {status}
    </span>
  )
}

/* -------------------------------------------------------------------------- */
/* Risk badge                                                                 */
/* -------------------------------------------------------------------------- */

function RiskBadge({
  risk,
}: {
  risk: VerificationApplicant['risk']
}) {
  const styles = {
    Low: {
      wrapper: 'bg-[#EAF4EE] text-[#12613E]',
      icon: ShieldCheck,
    },
    Medium: {
      wrapper: 'bg-[#F8EEE6] text-[#B85C12]',
      icon: AlertTriangle,
    },
    High: {
      wrapper: 'bg-brick-light/50 text-brick',
      icon: ShieldAlert,
    },
  }

  const style = styles[risk]
  const Icon = style.icon

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[9px] font-semibold ${style.wrapper}`}
    >
      <Icon className="h-3 w-3" />
      {risk} risk
    </span>
  )
}

/* -------------------------------------------------------------------------- */
/* Lifecycle item                                                             */
/* -------------------------------------------------------------------------- */

function LifecycleItem({
  icon: Icon,
  title,
  description,
  access,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  access: string
  tone: 'neutral' | 'bronze' | 'green' | 'brick'
}) {
  const styles = {
    neutral: {
      icon: 'bg-white text-ink/45',
      accent: 'bg-ink/20',
      access: 'text-ink/55',
    },
    bronze: {
      icon: 'bg-[#F8EEE6] text-[#B85C12]',
      accent: 'bg-[#B85C12]',
      access: 'text-[#B85C12]',
    },
    green: {
      icon: 'bg-[#EAF4EE] text-[#12613E]',
      accent: 'bg-[#12613E]',
      access: 'text-[#12613E]',
    },
    brick: {
      icon: 'bg-brick-light/50 text-brick',
      accent: 'bg-brick',
      access: 'text-brick',
    },
  }

  const style = styles[tone]

  return (
    <div className="group relative rounded-[18px] border border-ink/[0.07] bg-paper-2 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/[0.11] hover:bg-white hover:shadow-[0_12px_30px_rgba(20,40,30,0.045)]">
      <div
        className={`absolute left-4 top-0 h-0.5 w-7 rounded-full ${style.accent}`}
      />

      <div
        className={`flex h-9 w-9 items-center justify-center rounded-[12px] ${style.icon}`}
      >
        <Icon className="h-4 w-4" />
      </div>

      <h3 className="mt-4 text-[13px] font-semibold tracking-[-0.01em] text-ink">
        {title}
      </h3>

      <p className="mt-1.5 min-h-[60px] text-[11px] leading-5 text-ink/40">
        {description}
      </p>

      <div className="mt-4 border-t border-ink/[0.06] pt-3">
        <p className="text-[9px] font-semibold uppercase tracking-[0.13em] text-ink/30">
          Access level
        </p>

        <p className={`mt-1 text-[11px] font-semibold ${style.access}`}>
          {access}
        </p>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Pagination                                                                 */
/* -------------------------------------------------------------------------- */

function PaginationButton({
  children,
  active = false,
  disabled = false,
}: {
  children: React.ReactNode
  active?: boolean
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={
        active
          ? 'min-w-8 rounded-lg bg-ink px-2.5 py-1.5 text-[10px] font-semibold text-white shadow-[0_4px_10px_rgba(20,40,30,0.10)]'
          : disabled
            ? 'rounded-lg border border-ink/[0.06] px-3 py-1.5 text-[10px] font-medium text-ink/20'
            : 'rounded-lg border border-ink/[0.07] bg-white px-3 py-1.5 text-[10px] font-medium text-ink/45 transition-colors hover:bg-paper-2 hover:text-ink'
      }
    >
      {children}
    </button>
  )
}