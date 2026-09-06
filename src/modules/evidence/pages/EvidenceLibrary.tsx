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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink/5">
              <FileCheck2 className="h-5 w-5 text-ink/55" />
            </div>

            <span className="rounded-full bg-paper-2 px-2.5 py-1 font-mono text-[9px] font-semibold text-ink/40">
              EVIDENCE
            </span>
          </div>

          <h1 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Evidence Library
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/50">
            Review and track evidence submitted across projects,
            milestones, procurement, monitoring and disputes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-xs font-semibold text-ink/55 transition hover:border-ink/20 hover:text-ink"
          >
            <Filter className="h-4 w-4" />
            Filters
          </button>
        </div>
      </div>

      {/* Trust message */}
      <div className="flex items-start gap-3 rounded-2xl border border-teal/15 bg-teal-light p-4">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-teal" />

        <div>
          <p className="text-sm font-semibold text-teal">
            Evidence is part of the payment control layer
          </p>

          <p className="mt-1 text-xs leading-5 text-ink/50">
            Submitted evidence supports milestone verification,
            procurement acceptance, monitoring and payment decisions.
            Contractor or supplier claims are not treated as verified
            until the required review chain is completed.
          </p>
        </div>
      </div>

      {/* Summary */}
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

      {/* Search and filters */}
      <Card>
        <CardBody>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative min-w-0 flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/30" />

              <input
                type="search"
                placeholder="Search evidence, project, milestone or submitter..."
                className="h-10 w-full rounded-xl border border-line bg-paper-2 pl-9 pr-4 text-xs text-ink outline-none transition placeholder:text-ink/30 focus:border-ink/20 focus:bg-white"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <FilterChip label="All" active />
              <FilterChip label="Under review" />
              <FilterChip label="Verified" />
              <FilterChip label="Blocked" />
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Evidence records */}
      <Card className="overflow-hidden">
        <CardHeader
          title="Evidence records"
          subtitle={`${totalEvidence} evidence submissions across active and completed projects`}
        />

        <CardBody>
          <div className="space-y-3">
            {evidence.map((item) => (
              <EvidenceRecordRow
                key={item.id}
                evidence={item}
              />
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Evidence principles */}
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
  const iconStyles = {
    neutral: 'bg-ink/5 text-ink/50',
    teal: 'bg-teal-light text-teal',
    amber: 'bg-amber/10 text-amber-dark',
    brick: 'bg-brick/[0.06] text-brick',
  }

  return (
    <Card>
      <CardBody>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
              {label}
            </p>

            <p className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">
              {value}
            </p>

            <p className="mt-1 text-[10px] text-ink/35">
              {description}
            </p>
          </div>

          <div
            className={`flex h-9 w-9 items-center justify-center rounded-xl ${iconStyles[tone]}`}
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
      className={`rounded-full px-3 py-1.5 text-[10px] font-semibold transition ${
        active
          ? 'bg-ink text-white'
          : 'bg-paper-2 text-ink/40 hover:bg-ink/5 hover:text-ink/70'
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
  const statusLabel = evidence.status
    .replaceAll('_', ' ')
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase(),
    )

  return (
    <button
      type="button"
      className="group w-full rounded-2xl border border-line bg-white p-4 text-left transition hover:border-ink/15 hover:shadow-sm"
    >
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
        {/* Icon */}
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-paper-2">
          <EvidenceTypeIcon type={evidence.type} />
        </div>

        {/* Main information */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="truncate text-sm font-semibold text-ink">
              {evidence.title}
            </p>

            <Badge
              tone={
                evidenceStatusTone[evidence.status]
              }
            >
              {statusLabel}
            </Badge>

            <span className="rounded-full bg-paper-2 px-2 py-1 text-[9px] font-semibold text-ink/40">
              {evidenceTypeLabels[evidence.type]}
            </span>
          </div>

          <p className="mt-1 text-xs leading-5 text-ink/45">
            {evidence.description}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] text-ink/35">
            <span className="inline-flex items-center gap-1.5">
              <FileText className="h-3 w-3" />
              {evidence.projectName}
            </span>

            {evidence.milestone && (
              <span className="inline-flex items-center gap-1.5">
                <FileCheck2 className="h-3 w-3" />
                {evidence.milestone}
              </span>
            )}

            <span className="inline-flex items-center gap-1.5">
              <User className="h-3 w-3" />
              {evidence.submittedBy}
            </span>

            <span className="inline-flex items-center gap-1.5 font-mono">
              <CalendarDays className="h-3 w-3" />
              {evidence.submittedAt}
            </span>
          </div>
        </div>

        {/* File information */}
        <div className="flex items-center gap-4 xl:w-[170px] xl:justify-end">
          <div className="hidden text-right sm:block">
            <p className="text-xs font-semibold text-ink">
              {evidence.fileCount} files
            </p>

            <div className="mt-1 flex justify-end gap-1">
              {evidence.fileTypes.map((type) => (
                <FileTypeIcon
                  key={type}
                  type={type}
                />
              ))}
            </div>
          </div>

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-line text-ink/35 transition group-hover:border-ink/20 group-hover:text-ink">
            <ChevronRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </button>
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

  return <Icon className="h-5 w-5 text-ink/45" />
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

  return (
    <span className="flex h-5 w-5 items-center justify-center rounded-md bg-paper-2">
      <Icon className="h-3 w-3 text-ink/35" />
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
    <div className="rounded-2xl border border-line bg-paper-2 p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white">
          <Icon className="h-4 w-4 text-ink/45" />
        </div>

        <div>
          <p className="text-xs font-semibold text-ink">
            {title}
          </p>

          <p className="mt-1 text-[10px] leading-5 text-ink/40">
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