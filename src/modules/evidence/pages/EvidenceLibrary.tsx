import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Eye,
  FileCheck2,
  FileText,
  Filter,
  Image,
  Search,
  ShieldCheck,
  User,
  Video,
} from 'lucide-react'

import { Badge } from '@/components/ui/Badge'
import {
  Card,
  CardBody,
  CardHeader,
} from '@/components/ui/Card'

type EvidenceStatus =
  | 'submitted'
  | 'under_review'
  | 'verified'
  | 'blocked'
  | 'rejected'

type EvidenceType =
  | 'milestone'
  | 'monitoring'
  | 'procurement'
  | 'document'
  | 'dispute'

type EvidenceFileType =
  | 'image'
  | 'video'
  | 'document'

interface EvidenceRecord {
  id: string
  title: string
  type: EvidenceType
  status: EvidenceStatus
  projectId: string
  projectName: string
  milestone?: string
  submittedBy: string
  submittedRole: string
  submittedAt: string
  fileCount: number
  fileTypes: EvidenceFileType[]
  description: string
}

const evidenceStatusTone: Record<
  EvidenceStatus,
  'neutral' | 'amber' | 'teal' | 'brick'
> = {
  submitted: 'neutral',
  under_review: 'amber',
  verified: 'teal',
  blocked: 'brick',
  rejected: 'brick',
}

const evidenceStatusLabels: Record<
  EvidenceStatus,
  string
> = {
  submitted: 'Submitted',
  under_review: 'Under review',
  verified: 'Verified',
  blocked: 'Blocked',
  rejected: 'Rejected',
}

const evidenceTypeLabels: Record<EvidenceType, string> = {
  milestone: 'Milestone',
  monitoring: 'Monitoring',
  procurement: 'Procurement',
  document: 'Document',
  dispute: 'Dispute',
}

const evidence = [
  {
    id: 'EVD-2026-00482',
    title: 'Internal Finishing Milestone Evidence',
    type: 'milestone' as EvidenceType,
    status: 'under_review' as EvidenceStatus,
    projectId: 'PRJ-2026-00421',
    projectName: 'Abuja Residential Development',
    milestone: 'Milestone 04 — Internal Finishing',
    submittedBy: 'BuildRight Construction Ltd',
    submittedRole: 'Contractor',
    submittedAt: '27 Aug 2026 · 08:34',
    fileCount: 4,
    fileTypes: ['image', 'video', 'document'] as EvidenceFileType[],
    description:
      'Site photographs, progress video and completion documentation submitted for milestone verification.',
  },
  {
    id: 'EVD-2026-00479',
    title: 'Weekly Site Progress Report',
    type: 'monitoring' as EvidenceType,
    status: 'verified' as EvidenceStatus,
    projectId: 'PRJ-2026-00421',
    projectName: 'Abuja Residential Development',
    milestone: 'Week 18 Progress',
    submittedBy: 'Ibrahim Musa',
    submittedRole: 'Project Manager',
    submittedAt: '26 Aug 2026 · 16:20',
    fileCount: 8,
    fileTypes: ['image', 'video', 'document'] as EvidenceFileType[],
    description:
      'Weekly construction progress report including site conditions, workforce, materials and timeline status.',
  },
  {
    id: 'EVD-2026-00471',
    title: 'Cement Delivery Confirmation',
    type: 'procurement' as EvidenceType,
    status: 'verified' as EvidenceStatus,
    projectId: 'PRJ-2026-00421',
    projectName: 'Abuja Residential Development',
    milestone: 'Procurement Request PR-018',
    submittedBy: 'PrimeBuild Materials Ltd',
    submittedRole: 'Supplier',
    submittedAt: '26 Aug 2026 · 11:42',
    fileCount: 3,
    fileTypes: ['image', 'document'] as EvidenceFileType[],
    description:
      'Delivery note and site photographs confirming delivery of approved cement quantities.',
  },
  {
    id: 'EVD-2026-00465',
    title: 'Foundation Completion Evidence',
    type: 'milestone' as EvidenceType,
    status: 'verified' as EvidenceStatus,
    projectId: 'PRJ-2026-00388',
    projectName: 'Kano Family Residence',
    milestone: 'Milestone 02 — Foundation',
    submittedBy: 'Northern Buildworks Ltd',
    submittedRole: 'Contractor',
    submittedAt: '25 Aug 2026 · 14:05',
    fileCount: 11,
    fileTypes: ['image', 'video', 'document'] as EvidenceFileType[],
    description:
      'Foundation completion photographs, inspection documentation and material usage records.',
  },
  {
    id: 'EVD-2026-00451',
    title: 'Electrical Installation Inspection',
    type: 'document' as EvidenceType,
    status: 'submitted' as EvidenceStatus,
    projectId: 'PRJ-2026-00405',
    projectName: 'Lekki Modern Residence',
    milestone: 'MEP Rough-In',
    submittedBy: 'Engr. Ahmed Bello',
    submittedRole: 'Professional Expert',
    submittedAt: '24 Aug 2026 · 10:18',
    fileCount: 5,
    fileTypes: ['image', 'document'] as EvidenceFileType[],
    description:
      'Electrical installation inspection records submitted for professional review.',
  },
  {
    id: 'EVD-2026-00437',
    title: 'Roofing Quality Dispute Evidence',
    type: 'dispute' as EvidenceType,
    status: 'blocked' as EvidenceStatus,
    projectId: 'PRJ-2026-00374',
    projectName: 'Wuse Duplex Project',
    milestone: 'Milestone 05 — Roofing',
    submittedBy: 'Client / Project Owner',
    submittedRole: 'Client',
    submittedAt: '23 Aug 2026 · 18:46',
    fileCount: 7,
    fileTypes: ['image', 'video', 'document'] as EvidenceFileType[],
    description:
      'Evidence submitted following a quality dispute concerning roofing works and material specification.',
  },
]

export function EvidenceLibrary() {
  const totalEvidence = evidence.length

  const verifiedCount = evidence.filter(
    (item) => item.status === 'verified',
  ).length

  const reviewCount = evidence.filter(
    (item) =>
      item.status === 'submitted' ||
      item.status === 'under_review',
  ).length

  const blockedCount = evidence.filter(
    (item) =>
      item.status === 'blocked' ||
      item.status === 'rejected',
  ).length

  return (
    <div className="space-y-7">
      {/* =========================================================
          HEADER
      ========================================================= */}
      <header className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-[13px] border border-ink/[0.07] bg-white shadow-[0_6px_20px_rgba(20,30,25,0.035)]">
              <FileCheck2 className="h-[18px] w-[18px] text-ink/55" />
            </div>

            <span className="h-px w-7 bg-ink/10" />

            <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-ink/35">
              Evidence governance
            </span>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <h1 className="font-display text-[30px] font-semibold tracking-[-0.035em] text-ink sm:text-[34px]">
              Evidence Library
            </h1>

            <span className="inline-flex items-center gap-2 rounded-full border border-amber/[0.16] bg-[#F7F1E7] px-3 py-1.5 text-[10px] font-semibold text-amber-dark">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C28A2C]" />
              {reviewCount} awaiting review
            </span>
          </div>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/50">
            A controlled record of evidence supporting project
            verification, procurement acceptance, monitoring,
            disputes and payment decisions.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full border border-ink/[0.08] bg-white px-4 text-xs font-semibold text-ink/65 shadow-[0_6px_20px_rgba(20,30,25,0.035)] transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/[0.15] hover:text-ink hover:shadow-[0_10px_26px_rgba(20,30,25,0.055)]"
        >
          <Filter className="h-3.5 w-3.5" />
          Filters
        </button>
      </header>

      {/* =========================================================
          GOVERNANCE BANNER
      ========================================================= */}
      <div className="relative overflow-hidden rounded-[20px] border border-[#12613E]/[0.10] bg-[#F4F7F4] shadow-[0_8px_30px_rgba(20,30,25,0.035)]">
        <div className="absolute inset-y-0 left-0 w-1 bg-[#12613E]" />

        <div className="flex flex-col gap-4 p-4 pl-5 sm:flex-row sm:items-start sm:p-5 sm:pl-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] border border-[#12613E]/[0.08] bg-white shadow-[0_4px_16px_rgba(20,30,25,0.04)]">
            <ShieldCheck className="h-[18px] w-[18px] text-[#12613E]" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-semibold text-[#12613E]">
                Evidence is part of the payment control layer
              </p>

              <span className="rounded-full bg-[#12613E]/[0.08] px-2 py-1 text-[9px] font-semibold text-[#12613E]">
                Controlled
              </span>
            </div>

            <p className="mt-1 max-w-4xl text-xs leading-5 text-ink/50">
              Submitted evidence supports milestone verification,
              procurement acceptance, monitoring and payment
              decisions. Contractor or supplier claims are not
              treated as verified until the required review chain
              is completed.
            </p>
          </div>

          <div className="hidden shrink-0 items-center gap-2 rounded-full border border-[#12613E]/[0.08] bg-white px-3 py-2 text-[9px] font-semibold text-ink/45 sm:flex">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#12613E]" />
            Audit trail preserved
          </div>
        </div>
      </div>

      {/* =========================================================
          SUMMARY
      ========================================================= */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <EvidenceStat
          label="Total evidence"
          value={totalEvidence}
          icon={FileCheck2}
          description="All submitted records"
        />

        <EvidenceStat
          label="Verified"
          value={verifiedCount}
          icon={CheckCircle2}
          description="Passed required review"
          tone="teal"
        />

        <EvidenceStat
          label="Awaiting review"
          value={reviewCount}
          icon={Clock3}
          description="Requires verification"
          tone="amber"
        />

        <EvidenceStat
          label="Blocked / rejected"
          value={blockedCount}
          icon={AlertTriangle}
          description="Requires intervention"
          tone="brick"
        />
      </div>

      {/* =========================================================
          SEARCH / FILTERS
      ========================================================= */}
      <Card className="overflow-hidden">
        <CardBody className="p-3 sm:p-4">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/25" />

              <input
                type="search"
                placeholder="Search evidence, project, milestone or submitter..."
                className="h-11 w-full rounded-[13px] border border-ink/[0.07] bg-[#F7F8F6] pl-10 pr-4 text-xs text-ink outline-none transition-all placeholder:text-ink/30 focus:border-[#12613E]/[0.20] focus:bg-white focus:ring-4 focus:ring-[#12613E]/[0.04]"
              />
            </div>

            <div className="flex flex-wrap gap-1.5">
              <FilterChip label="All" active />
              <FilterChip label="Under review" />
              <FilterChip label="Verified" />
              <FilterChip label="Blocked" />
            </div>
          </div>
        </CardBody>
      </Card>

      {/* =========================================================
          RECORDS
      ========================================================= */}
      <Card className="overflow-hidden">
        <CardHeader
          title="Evidence records"
          subtitle={`${totalEvidence} submissions across active and completed projects`}
        />

        <CardBody className="p-3 sm:p-4">
          <div className="space-y-2.5">
            {evidence.map((item) => (
              <EvidenceRecordRow
                key={item.id}
                evidence={item}
              />
            ))}
          </div>
        </CardBody>
      </Card>

      {/* =========================================================
          PRINCIPLES
      ========================================================= */}
      <div>
        <div className="mb-3 flex items-center gap-3">
          <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-ink/30">
            Evidence principles
          </span>

          <span className="h-px flex-1 bg-ink/[0.06]" />
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <EvidencePrinciple
            icon={ShieldCheck}
            title="Verified before payment"
            description="Evidence must pass the required verification chain before associated funds can be released."
          />

          <EvidencePrinciple
            icon={FileCheck2}
            title="Audit preserved"
            description="Submission, review, verification and rejection decisions remain attached to the evidence record."
          />

          <EvidencePrinciple
            icon={LockKeyholeIcon}
            title="Dispute protected"
            description="Evidence linked to a disputed payment remains available while the affected payment line is frozen."
          />
        </div>
      </div>
    </div>
  )
}

function EvidenceStat({
  label,
  value,
  icon: Icon,
  description,
  tone = 'neutral',
}: {
  label: string
  value: number
  icon: typeof FileCheck2
  description: string
  tone?: 'neutral' | 'teal' | 'amber' | 'brick'
}) {
  const styles = {
    neutral: {
      icon: 'bg-ink/[0.045] text-ink/50',
      accent: 'bg-ink/20',
    },
    teal: {
      icon: 'bg-[#F4F7F4] text-[#12613E]',
      accent: 'bg-[#12613E]/60',
    },
    amber: {
      icon: 'bg-[#F7F1E7] text-[#C28A2C]',
      accent: 'bg-[#C28A2C]/60',
    },
    brick: {
      icon: 'bg-[#F8EEE6] text-[#B85C12]',
      accent: 'bg-[#B85C12]/60',
    },
  }

  return (
    <Card className="group relative overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_34px_rgba(20,30,25,0.055)]">
      <div
        className={`absolute inset-x-0 bottom-0 h-px ${styles[tone].accent}`}
      />

      <CardBody className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-ink/35">
              {label}
            </p>

            <p className="mt-2 font-display text-[27px] font-semibold tracking-[-0.03em] text-ink">
              {value}
            </p>

            <p className="mt-1 text-[10px] text-ink/35">
              {description}
            </p>
          </div>

          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] ${styles[tone].icon}`}
          >
            <Icon className="h-4 w-4" />
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

function FilterChip({
  label,
  active = false,
}: {
  label: string
  active?: boolean
}) {
  return (
    <button
      type="button"
      className={`rounded-full px-3 py-2 text-[10px] font-semibold transition-all ${
        active
          ? 'bg-ink text-white shadow-[0_4px_12px_rgba(20,30,25,0.10)]'
          : 'bg-[#F7F8F6] text-ink/40 hover:bg-ink/[0.05] hover:text-ink/70'
      }`}
    >
      {label}
    </button>
  )
}

function EvidenceRecordRow({
  evidence,
}: {
  evidence: EvidenceRecord
}) {
  const statusLabel =
    evidenceStatusLabels[evidence.status]

  const statusRail = {
    submitted: 'bg-ink/20',
    under_review: 'bg-[#C28A2C]/60',
    verified: 'bg-[#12613E]/60',
    blocked: 'bg-[#B85C12]/60',
    rejected: 'bg-[#B85C12]/60',
  }[evidence.status]

  const typeTone = {
    milestone: 'bg-[#F4F7F4]',
    monitoring: 'bg-[#F7F8F6]',
    procurement: 'bg-[#F7F1E7]',
    document: 'bg-ink/[0.045]',
    dispute: 'bg-[#F8EEE6]',
  }[evidence.type]

  return (
    <button
      type="button"
      className="group relative w-full overflow-hidden rounded-[18px] border border-ink/[0.07] bg-white p-4 text-left shadow-[0_4px_18px_rgba(20,30,25,0.025)] transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/[0.12] hover:shadow-[0_12px_34px_rgba(20,30,25,0.055)] sm:p-5"
    >
      {/* Bottom status rail */}
      <div
        className={`absolute inset-x-0 bottom-0 h-[2px] ${statusRail}`}
      />

      <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
        {/* Type icon */}
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] ${typeTone}`}
        >
          <EvidenceTypeIcon type={evidence.type} />
        </div>

        {/* Main information */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="min-w-0 truncate text-sm font-semibold text-ink">
              {evidence.title}
            </p>

            <Badge
              tone={
                evidenceStatusTone[evidence.status]
              }
            >
              {statusLabel}
            </Badge>

            <span className="rounded-full bg-[#F7F8F6] px-2 py-1 text-[9px] font-semibold text-ink/40">
              {evidenceTypeLabels[evidence.type]}
            </span>
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-x-2">
            <span className="font-mono text-[9px] font-medium text-ink/25">
              {evidence.id}
            </span>

            <span className="h-1 w-1 rounded-full bg-ink/15" />

            <span className="text-[10px] text-ink/35">
              {evidence.submittedRole}
            </span>
          </div>

          <p className="mt-2 max-w-3xl text-xs leading-5 text-ink/45">
            {evidence.description}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
            <MetaItem
              icon={FileText}
              value={evidence.projectName}
            />

            {evidence.milestone && (
              <MetaItem
                icon={FileCheck2}
                value={evidence.milestone}
              />
            )}

            <MetaItem
              icon={User}
              value={evidence.submittedBy}
            />

            <MetaItem
              icon={CalendarDays}
              value={evidence.submittedAt}
              mono
            />
          </div>
        </div>

        {/* Files / action */}
        <div className="flex items-center justify-between gap-4 border-t border-ink/[0.06] pt-3 xl:w-[190px] xl:justify-end xl:border-t-0 xl:pt-0">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#F7F8F6]">
              <Eye className="h-3.5 w-3.5 text-ink/35" />
            </div>

            <div>
              <p className="text-xs font-semibold text-ink">
                {evidence.fileCount} files
              </p>

              <div className="mt-1 flex gap-1">
                {evidence.fileTypes.map((type) => (
                  <FileTypeIcon
                    key={type}
                    type={type}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] border border-ink/[0.07] text-ink/30 transition-all duration-200 group-hover:border-ink/[0.14] group-hover:bg-[#F7F8F6] group-hover:text-ink">
            <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </button>
  )
}

function MetaItem({
  icon: Icon,
  value,
  mono = false,
}: {
  icon: typeof FileText
  value: string
  mono?: boolean
}) {
  return (
    <span
      className={`inline-flex min-w-0 items-center gap-1.5 text-[10px] text-ink/35 ${
        mono ? 'font-mono' : ''
      }`}
    >
      <Icon className="h-3 w-3 shrink-0 text-ink/25" />

      <span className="truncate">{value}</span>
    </span>
  )
}

function EvidenceTypeIcon({
  type,
}: {
  type: EvidenceType
}) {
  const Icon =
    type === 'milestone'
      ? FileCheck2
      : type === 'monitoring'
        ? Video
        : type === 'procurement'
          ? PackageIcon
          : type === 'document'
            ? FileText
            : AlertTriangle

  return <Icon className="h-[18px] w-[18px] text-ink/45" />
}

function FileTypeIcon({
  type,
}: {
  type: EvidenceFileType
}) {
  const Icon =
    type === 'image'
      ? Image
      : type === 'video'
        ? Video
        : FileText

  const tone =
    type === 'image'
      ? 'bg-[#F4F7F4] text-[#12613E]'
      : type === 'video'
        ? 'bg-[#F7F1E7] text-[#C28A2C]'
        : 'bg-[#F7F8F6] text-ink/35'

  return (
    <span
      className={`flex h-5 w-5 items-center justify-center rounded-[6px] ${tone}`}
    >
      <Icon className="h-2.5 w-2.5" />
    </span>
  )
}

function EvidencePrinciple({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof ShieldCheck
  title: string
  description: string
}) {
  return (
    <div className="group relative overflow-hidden rounded-[16px] border border-ink/[0.06] bg-[#F7F8F6] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/[0.10] hover:bg-white hover:shadow-[0_10px_28px_rgba(20,30,25,0.04)] sm:p-5">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] border border-ink/[0.05] bg-white">
          <Icon className="h-4 w-4 text-ink/45" />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-semibold text-ink">
            {title}
          </p>

          <p className="mt-1.5 text-[10px] leading-5 text-ink/40">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

// Small icon adapters keep the main component readable and
// avoid coupling the UI to a particular domain icon name.
function PackageIcon({
  className,
}: {
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m16.5 9.4-9-5.19" />
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.27 6.96 8.73 5.05 8.73-5.05" />
      <path d="M12 22.08V12" />
    </svg>
  )
}

function LockKeyholeIcon({
  className,
}: {
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="16" r="1" />
      <rect
        width="18"
        height="12"
        x="3"
        y="10"
        rx="2"
      />
      <path d="M7 10V7a5 5 0 0 1 10 0v3" />
    </svg>
  )
}