import type { ComponentType, ReactNode } from 'react'

import {
  AlertTriangle,
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Download,
  Eye,
  FileCheck2,
  FileText,
  Image,
  LockKeyhole,
  MapPin,
  MoreHorizontal,
  Play,
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

import { EvidenceTrail } from '@/modules/evidence/components/EvidenceTrail'

type EvidenceStatus =
  | 'submitted'
  | 'under_review'
  | 'verified'
  | 'blocked'
  | 'rejected'

type EvidenceFileType =
  | 'image'
  | 'video'
  | 'document'

interface EvidenceFile {
  id: string
  name: string
  type: EvidenceFileType
  size: string
  uploadedAt: string
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

const evidenceStatusLabel: Record<
  EvidenceStatus,
  string
> = {
  submitted: 'Submitted',
  under_review: 'Under review',
  verified: 'Verified',
  blocked: 'Blocked',
  rejected: 'Rejected',
}

const evidence = {
  id: 'EVD-2026-00482',
  status: 'under_review' as EvidenceStatus,

  title: 'Internal Finishing Milestone Evidence',

  project: {
    id: 'PRJ-2026-00421',
    name: 'Abuja Residential Development',
    location: 'Abuja, Federal Capital Territory',
  },

  milestone: {
    id: 'MLS-004',
    name: 'Milestone 04 — Internal Finishing',
  },

  submittedBy: {
    name: 'BuildRight Construction Ltd',
    role: 'Contractor',
  },

  submittedAt: '27 Aug 2026 · 08:34',

  description:
    'Evidence submitted to support completion of the internal finishing milestone, including site photographs, progress documentation and supporting completion records.',

  files: [
    {
      id: 'FILE-001',
      name: 'living-room-finishing.jpg',
      type: 'image' as EvidenceFileType,
      size: '4.8 MB',
      uploadedAt: '27 Aug 2026 · 08:31',
    },
    {
      id: 'FILE-002',
      name: 'bedroom-finishing.jpg',
      type: 'image' as EvidenceFileType,
      size: '5.2 MB',
      uploadedAt: '27 Aug 2026 · 08:31',
    },
    {
      id: 'FILE-003',
      name: 'internal-progress-video.mp4',
      type: 'video' as EvidenceFileType,
      size: '24.6 MB',
      uploadedAt: '27 Aug 2026 · 08:32',
    },
    {
      id: 'FILE-004',
      name: 'milestone-completion-report.pdf',
      type: 'document' as EvidenceFileType,
      size: '1.3 MB',
      uploadedAt: '27 Aug 2026 · 08:33',
    },
  ],
}

/**
 * Evidence Details
 *
 * Detailed audit view for a single evidence submission.
 *
 * Used across:
 * - Milestone verification
 * - Payment requests
 * - Procurement deliveries
 * - Monitoring reports
 * - Dispute evidence
 * - Digital Property Passport
 *
 * Build OS principle:
 * Progress is not treated as complete because it was claimed.
 * Progress becomes trusted when evidence is submitted,
 * independently verified and recorded in the audit trail.
 */
export function EvidenceDetails() {
  const imageFiles = evidence.files.filter(
    (file) => file.type === 'image',
  )

  const videoFiles = evidence.files.filter(
    (file) => file.type === 'video',
  )

  const documentFiles = evidence.files.filter(
    (file) => file.type === 'document',
  )

  const isBlocked = evidence.status === 'blocked'
  const isVerified = evidence.status === 'verified'
  const isRejected = evidence.status === 'rejected'

  return (
    <div className="space-y-7">
      {/* ------------------------------------------------------------------ */}
      {/* Navigation                                                          */}
      {/* ------------------------------------------------------------------ */}

      <button
        type="button"
        className="group inline-flex items-center gap-2 text-xs font-semibold text-ink/40 transition-colors hover:text-ink"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-ink/[0.07] bg-white transition-all group-hover:-translate-x-0.5 group-hover:border-ink/[0.12]">
          <ArrowLeft className="h-3.5 w-3.5" />
        </span>

        Back to evidence
      </button>

      {/* ------------------------------------------------------------------ */}
      {/* Header                                                              */}
      {/* ------------------------------------------------------------------ */}

      <header className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
        <div className="min-w-0 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] border border-ink/[0.07] bg-white shadow-[0_4px_14px_rgba(20,30,25,0.035)]">
              <FileCheck2 className="h-[18px] w-[18px] text-[#12613E]" />
            </div>

            <Badge tone={evidenceStatusTone[evidence.status]}>
              {evidenceStatusLabel[evidence.status]}
            </Badge>

            <span className="rounded-full border border-ink/[0.06] bg-[#F7F8F6] px-2.5 py-1 font-mono text-[9px] font-semibold tracking-wide text-ink/40">
              {evidence.id}
            </span>
          </div>

          <div className="mt-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/30">
              Verification dossier
            </p>

            <h1 className="mt-1.5 font-display text-[30px] font-semibold leading-[1.1] tracking-[-0.035em] text-ink sm:text-[36px]">
              {evidence.title}
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-ink/50">
              {evidence.description}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <button
            type="button"
            className="group inline-flex items-center gap-2 rounded-full border border-ink/[0.07] bg-white px-4 py-2.5 text-xs font-semibold text-ink/55 shadow-[0_4px_14px_rgba(20,30,25,0.025)] transition-all hover:-translate-y-0.5 hover:border-ink/[0.12] hover:text-ink hover:shadow-[0_8px_22px_rgba(20,30,25,0.05)]"
          >
            <Download className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
            Export evidence
          </button>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/[0.07] bg-white text-ink/40 shadow-[0_4px_14px_rgba(20,30,25,0.025)] transition-all hover:border-ink/[0.12] hover:text-ink"
            aria-label="More actions"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* State banners                                                       */}
      {/* ------------------------------------------------------------------ */}

      {isBlocked && (
        <StatusBanner
          icon={AlertTriangle}
          title="Evidence verification is blocked"
          description="This evidence record cannot proceed through the approval workflow until the related issue or dispute has been resolved."
          tone="brick"
        />
      )}

      {isVerified && (
        <StatusBanner
          icon={CheckCircle2}
          title="Evidence independently verified"
          description="The required evidence and verification requirements have been satisfied and recorded."
          tone="teal"
        />
      )}

      {isRejected && (
        <StatusBanner
          icon={AlertTriangle}
          title="Evidence submission rejected"
          description="This evidence record has been rejected and cannot satisfy the associated verification requirement in its current state."
          tone="brick"
        />
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Main layout                                                         */}
      {/* ------------------------------------------------------------------ */}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(330px,0.8fr)]">
        {/* Main */}
        <main className="space-y-6">
          {/* Evidence files */}
          <Card className="overflow-hidden">
            <CardHeader
              title="Submitted evidence"
              subtitle={`${evidence.files.length} supporting records attached to this submission`}
            />

            <CardBody>
              <div className="space-y-6">
                {imageFiles.length > 0 && (
                  <EvidenceGroup
                    title="Site photographs"
                    count={imageFiles.length}
                    icon={Image}
                  >
                    <div className="grid gap-3 sm:grid-cols-2">
                      {imageFiles.map((file) => (
                        <EvidenceFileCard
                          key={file.id}
                          file={file}
                        />
                      ))}
                    </div>
                  </EvidenceGroup>
                )}

                {videoFiles.length > 0 && (
                  <EvidenceGroup
                    title="Video evidence"
                    count={videoFiles.length}
                    icon={Video}
                  >
                    <div className="space-y-3">
                      {videoFiles.map((file) => (
                        <EvidenceFileRow
                          key={file.id}
                          file={file}
                        />
                      ))}
                    </div>
                  </EvidenceGroup>
                )}

                {documentFiles.length > 0 && (
                  <EvidenceGroup
                    title="Supporting documents"
                    count={documentFiles.length}
                    icon={FileText}
                  >
                    <div className="space-y-3">
                      {documentFiles.map((file) => (
                        <EvidenceFileRow
                          key={file.id}
                          file={file}
                        />
                      ))}
                    </div>
                  </EvidenceGroup>
                )}
              </div>
            </CardBody>
          </Card>

          {/* Verification review */}
          <Card>
            <CardHeader
              title="Verification review"
              subtitle="Review actions and decisions are recorded in the audit trail"
            />

            <CardBody>
              <div className="grid gap-3 sm:grid-cols-3">
                <ReviewAction
                  icon={CheckCircle2}
                  title="Verify evidence"
                  description="Confirm submitted evidence"
                  tone="teal"
                  disabled={isBlocked || isVerified || isRejected}
                />

                <ReviewAction
                  icon={Clock3}
                  title="Request more"
                  description="Ask for additional records"
                  tone="amber"
                  disabled={isVerified || isRejected}
                />

                <ReviewAction
                  icon={AlertTriangle}
                  title="Flag issue"
                  description="Escalate for further review"
                  tone="brick"
                  disabled={isVerified || isRejected}
                />
              </div>

              <div className="mt-5 flex items-start gap-2.5 rounded-[12px] bg-[#F7F8F6] px-3.5 py-3">
                <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#12613E]/60" />

                <p className="text-[10px] leading-4 text-ink/40">
                  Verification decisions are permanently associated
                  with this evidence record and retained as part of
                  the Build OS audit trail.
                </p>
              </div>
            </CardBody>
          </Card>
        </main>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Evidence trail */}
          <EvidenceTrail
            percentComplete={75}
            steps={[
              {
                id: 'submission',
                label: 'Evidence submitted',
                status: 'complete',
                actor: evidence.submittedBy.name,
                timestamp: evidence.submittedAt,
              },
              {
                id: 'review',
                label: 'Initial review completed',
                status: 'complete',
                actor: 'Build OS Verification',
                timestamp: '27 Aug 2026 · 09:10',
              },
              {
                id: 'verification',
                label: 'Independent verification',
                status: 'pending',
                actor: 'Project Manager',
              },
              {
                id: 'approval',
                label: 'Approval decision',
                status: 'pending',
              },
            ]}
            nextAction={{
              label: 'Awaiting project manager verification',
              description:
                'The assigned project manager must review and verify the submitted milestone evidence.',
            }}
          />

          {/* Submission context */}
          <Card>
            <CardHeader
              title="Submission context"
              subtitle="Project and milestone linkage"
            />

            <CardBody>
              <div className="space-y-1">
                <ContextItem
                  icon={FileText}
                  label="Project"
                  value={evidence.project.name}
                  meta={evidence.project.id}
                />

                <ContextItem
                  icon={MapPin}
                  label="Location"
                  value={evidence.project.location}
                />

                <ContextItem
                  icon={FileCheck2}
                  label="Milestone"
                  value={evidence.milestone.name}
                  meta={evidence.milestone.id}
                />
              </div>
            </CardBody>
          </Card>

          {/* Submitter */}
          <Card>
            <CardHeader
              title="Submitted by"
              subtitle="Evidence source record"
            />

            <CardBody>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] border border-ink/[0.06] bg-[#F7F8F6]">
                  <User className="h-4 w-4 text-ink/40" />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-ink">
                    {evidence.submittedBy.name}
                  </p>

                  <p className="mt-1 text-xs text-ink/40">
                    {evidence.submittedBy.role}
                  </p>

                  <div className="mt-3 flex items-center gap-1.5 font-mono text-[9px] text-ink/30">
                    <CalendarDays className="h-3 w-3" />
                    {evidence.submittedAt}
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Protection */}
          <div className="overflow-hidden rounded-[18px] border border-ink/[0.07] bg-[#F7F8F6]">
            <div className="h-1 bg-[#12613E]/70" />

            <div className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-white shadow-[0_4px_14px_rgba(20,30,25,0.035)]">
                  <LockKeyhole className="h-4 w-4 text-[#12613E]/65" />
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-xs font-semibold text-ink">
                      Protected evidence record
                    </p>

                    <span className="rounded-full bg-[#F4F7F4] px-2 py-0.5 text-[8px] font-semibold text-[#12613E]">
                      Audited
                    </span>
                  </div>

                  <p className="mt-1.5 text-[11px] leading-5 text-ink/40">
                    Submission, verification and review activity
                    associated with this evidence is retained in
                    the Build OS audit trail.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Status banner                                                              */
/* -------------------------------------------------------------------------- */

function StatusBanner({
  icon: Icon,
  title,
  description,
  tone,
}: {
  icon: typeof AlertTriangle
  title: string
  description: string
  tone: 'teal' | 'brick'
}) {
  const isTeal = tone === 'teal'

  return (
    <div
      className={`relative overflow-hidden rounded-[18px] border ${
        isTeal
          ? 'border-[#12613E]/10 bg-[#F4F7F4]'
          : 'border-[#B85C12]/12 bg-[#F8EEE6]'
      }`}
    >
      <div
        className={`absolute inset-y-0 left-0 w-1 ${
          isTeal
            ? 'bg-[#12613E]'
            : 'bg-[#B85C12]'
        }`}
      />

      <div className="flex items-start gap-3.5 p-4 sm:p-4.5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-white shadow-[0_4px_14px_rgba(20,30,25,0.035)]">
          <Icon
            className={`h-4 w-4 ${
              isTeal
                ? 'text-[#12613E]'
                : 'text-[#B85C12]'
            }`}
          />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p
              className={`text-xs font-semibold ${
                isTeal
                  ? 'text-[#12613E]'
                  : 'text-[#B85C12]'
              }`}
            >
              {title}
            </p>

            <span
              className={`rounded-full px-2 py-0.5 text-[8px] font-semibold ${
                isTeal
                  ? 'bg-white text-[#12613E]'
                  : 'bg-white text-[#B85C12]'
              }`}
            >
              {isTeal ? 'Controlled' : 'Action required'}
            </span>
          </div>

          <p className="mt-1 text-[11px] leading-5 text-ink/45">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Evidence groups                                                            */
/* -------------------------------------------------------------------------- */

function EvidenceGroup({
  title,
  count,
  icon: Icon,
  children,
}: {
  title: string
  count: number
  icon: ComponentType<{ className?: string }>
  children: ReactNode
}) {
  return (
    <section>
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-[#F7F8F6]">
          <Icon className="h-3.5 w-3.5 text-ink/40" />
        </div>

        <p className="text-xs font-semibold text-ink">
          {title}
        </p>

        <span className="rounded-full bg-[#F7F8F6] px-2 py-0.5 font-mono text-[9px] font-semibold text-ink/35">
          {count}
        </span>
      </div>

      {children}
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/* Image evidence                                                             */
/* -------------------------------------------------------------------------- */

function EvidenceFileCard({
  file,
}: {
  file: EvidenceFile
}) {
  return (
    <article className="group overflow-hidden rounded-[16px] border border-ink/[0.07] bg-white transition-all hover:-translate-y-0.5 hover:border-ink/[0.10] hover:shadow-[0_10px_28px_rgba(20,30,25,0.055)]">
      <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-[#F7F8F6]">
        <Image className="h-8 w-8 text-ink/15 transition-transform duration-300 group-hover:scale-105" />

        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/[0.06] to-transparent" />

        <span className="absolute right-2.5 top-2.5 rounded-full bg-white/90 px-2 py-1 text-[8px] font-semibold text-ink/40 shadow-sm backdrop-blur-sm">
          IMAGE
        </span>
      </div>

      <div className="p-3.5">
        <div className="flex items-start justify-between gap-3">
          <p className="min-w-0 truncate text-xs font-semibold text-ink">
            {file.name}
          </p>

          <span className="shrink-0 font-mono text-[9px] text-ink/30">
            {file.id}
          </span>
        </div>

        <p className="mt-1.5 text-[10px] text-ink/35">
          {file.size} · {file.uploadedAt}
        </p>

        <button
          type="button"
          className="group mt-3 inline-flex items-center gap-1.5 text-[10px] font-semibold text-ink/45 transition-colors hover:text-ink"
        >
          <Eye className="h-3.5 w-3.5 transition-transform group-hover:scale-105" />
          View evidence
        </button>
      </div>
    </article>
  )
}

/* -------------------------------------------------------------------------- */
/* Video / document evidence                                                  */
/* -------------------------------------------------------------------------- */

function EvidenceFileRow({
  file,
}: {
  file: EvidenceFile
}) {
  const Icon =
    file.type === 'video'
      ? Video
      : FileText

  const typeLabel =
    file.type === 'video'
      ? 'VIDEO'
      : 'DOCUMENT'

  return (
    <article className="group flex items-center justify-between gap-3 rounded-[15px] border border-ink/[0.07] bg-white p-3.5 transition-all hover:border-ink/[0.10] hover:shadow-[0_8px_24px_rgba(20,30,25,0.045)]">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#F7F8F6]">
          <Icon className="h-4 w-4 text-ink/40" />
        </div>

        <div className="min-w-0">
          <div className="flex min-w-0 items-center gap-2">
            <p className="truncate text-xs font-semibold text-ink">
              {file.name}
            </p>

            <span className="hidden shrink-0 rounded-full bg-[#F7F8F6] px-1.5 py-0.5 text-[7px] font-semibold tracking-wide text-ink/30 sm:inline-flex">
              {typeLabel}
            </span>
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[10px] text-ink/35">
            <span>{file.size}</span>
            <span>·</span>
            <span>{file.uploadedAt}</span>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] border border-ink/[0.07] bg-white text-ink/35 transition-all hover:border-ink/[0.12] hover:text-ink"
        aria-label={`View ${file.name}`}
      >
        {file.type === 'video' ? (
          <Play className="h-3.5 w-3.5" />
        ) : (
          <Eye className="h-3.5 w-3.5" />
        )}
      </button>
    </article>
  )
}

/* -------------------------------------------------------------------------- */
/* Review action                                                              */
/* -------------------------------------------------------------------------- */

function ReviewAction({
  icon: Icon,
  title,
  description,
  tone,
  disabled = false,
}: {
  icon: typeof CheckCircle2
  title: string
  description: string
  tone: 'teal' | 'amber' | 'brick'
  disabled?: boolean
}) {
  const styles = {
    teal: {
      border: 'border-[#12613E]/10 hover:border-[#12613E]/25',
      icon: 'bg-[#F4F7F4] text-[#12613E]',
      hover: 'hover:shadow-[0_8px_22px_rgba(18,97,62,0.055)]',
    },
    amber: {
      border: 'border-[#C28A2C]/12 hover:border-[#C28A2C]/25',
      icon: 'bg-[#F7F1E7] text-[#C28A2C]',
      hover: 'hover:shadow-[0_8px_22px_rgba(194,138,44,0.055)]',
    },
    brick: {
      border: 'border-[#B85C12]/10 hover:border-[#B85C12]/25',
      icon: 'bg-[#F8EEE6] text-[#B85C12]',
      hover: 'hover:shadow-[0_8px_22px_rgba(184,92,18,0.055)]',
    },
  }

  const style = styles[tone]

  return (
    <button
      type="button"
      disabled={disabled}
      className={`group rounded-[15px] border bg-white p-3.5 text-left transition-all disabled:cursor-not-allowed disabled:opacity-35 ${style.border} ${style.hover}`}
    >
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-[9px] ${style.icon}`}
      >
        <Icon className="h-4 w-4 transition-transform group-hover:scale-105" />
      </div>

      <p className="mt-3 text-xs font-semibold text-ink">
        {title}
      </p>

      <p className="mt-1 text-[10px] leading-4 text-ink/40">
        {description}
      </p>
    </button>
  )
}

/* -------------------------------------------------------------------------- */
/* Context item                                                               */
/* -------------------------------------------------------------------------- */

function ContextItem({
  icon: Icon,
  label,
  value,
  meta,
}: {
  icon: typeof FileText
  label: string
  value: string
  meta?: string
}) {
  return (
    <div className="flex items-start gap-3 rounded-[12px] p-2.5 transition-colors hover:bg-[#F7F8F6]">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-[#F7F8F6]">
        <Icon className="h-3.5 w-3.5 text-ink/35" />
      </div>

      <div className="min-w-0 pt-0.5">
        <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-ink/30">
          {label}
        </p>

        <p className="mt-1 text-xs font-semibold leading-5 text-ink/70">
          {value}
        </p>

        {meta && (
          <p className="mt-1 font-mono text-[9px] text-ink/30">
            {meta}
          </p>
        )}
      </div>
    </div>
  )
}