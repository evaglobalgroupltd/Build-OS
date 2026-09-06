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

  const isBlocked =
    evidence.status === 'blocked'

  const isVerified =
    evidence.status === 'verified'

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <button
        type="button"
        className="inline-flex items-center gap-2 text-xs font-semibold text-ink/45 transition hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to evidence
      </button>

      {/* Header */}
      <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-start">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink/5">
              <FileCheck2 className="h-5 w-5 text-ink/60" />
            </div>

            <Badge
              tone={
                evidenceStatusTone[evidence.status]
              }
            >
              {evidence.status
                .replaceAll('_', ' ')
                .replace(/\b\w/g, (letter) =>
                  letter.toUpperCase(),
                )}
            </Badge>

            <span className="rounded-full bg-paper-2 px-2.5 py-1 font-mono text-[9px] font-semibold text-ink/40">
              {evidence.id}
            </span>
          </div>

          <h1 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            {evidence.title}
          </h1>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-ink/50">
            {evidence.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-xs font-semibold text-ink/55 transition hover:text-ink"
          >
            <Download className="h-4 w-4" />
            Export evidence
          </button>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white text-ink/45 transition hover:text-ink"
            aria-label="More actions"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Status warning */}
      {isBlocked && (
        <div className="flex items-start gap-3 rounded-2xl border border-brick/15 bg-brick/[0.04] p-4">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-brick" />

          <div>
            <p className="text-sm font-semibold text-brick">
              Evidence verification is blocked
            </p>

            <p className="mt-1 text-xs leading-5 text-ink/50">
              This evidence record cannot proceed through
              the approval workflow until the related issue
              or dispute has been resolved.
            </p>
          </div>
        </div>
      )}

      {/* Verified state */}
      {isVerified && (
        <div className="flex items-start gap-3 rounded-2xl border border-teal/15 bg-teal-light p-4">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal" />

          <div>
            <p className="text-sm font-semibold text-teal">
              Evidence independently verified
            </p>

            <p className="mt-1 text-xs leading-5 text-ink/50">
              The required evidence and verification
              requirements have been satisfied and recorded.
            </p>
          </div>
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(340px,0.8fr)]">
        {/* Main content */}
        <div className="space-y-6">
          {/* Evidence files */}
          <Card className="overflow-hidden">
            <CardHeader
              title="Submitted evidence"
              subtitle={`${evidence.files.length} supporting records attached to this submission`}
            />

            <CardBody>
              <div className="space-y-5">
                {/* Images */}
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

                {/* Videos */}
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

                {/* Documents */}
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

          {/* Review */}
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
                  disabled={isBlocked}
                />

                <ReviewAction
                  icon={Clock3}
                  title="Request more"
                  description="Ask for additional records"
                  tone="amber"
                />

                <ReviewAction
                  icon={AlertTriangle}
                  title="Flag issue"
                  description="Escalate for further review"
                  tone="brick"
                />
              </div>

              <p className="mt-4 flex items-center gap-2 text-[10px] text-ink/35">
                <ShieldCheck className="h-3.5 w-3.5" />
                Verification decisions are permanently
                associated with this evidence record.
              </p>
            </CardBody>
          </Card>
        </div>

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
              <div className="space-y-4">
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
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-paper-2">
                  <User className="h-4 w-4 text-ink/45" />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-ink">
                    {evidence.submittedBy.name}
                  </p>

                  <p className="mt-1 text-xs text-ink/40">
                    {evidence.submittedBy.role}
                  </p>

                  <div className="mt-3 flex items-center gap-1.5 font-mono text-[9px] text-ink/35">
                    <CalendarDays className="h-3 w-3" />
                    {evidence.submittedAt}
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Audit protection */}
          <div className="rounded-2xl border border-line bg-paper-2 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white">
                <LockKeyhole className="h-4 w-4 text-ink/45" />
              </div>

              <div>
                <p className="text-xs font-semibold text-ink">
                  Protected evidence record
                </p>

                <p className="mt-1 text-[11px] leading-5 text-ink/45">
                  Submission, verification and review
                  activity associated with this evidence is
                  retained in the Build OS audit trail.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

function EvidenceGroup({
  title,
  count,
  icon: Icon,
  children,
}: {
  title: string
  count: number
  icon: typeof Image
  children: React.ReactNode
}) {
  return (
    <section>
      <div className="mb-3 flex items-center gap-2">
        <Icon className="h-4 w-4 text-ink/40" />

        <p className="text-xs font-semibold text-ink">
          {title}
        </p>

        <span className="rounded-full bg-paper-2 px-2 py-0.5 font-mono text-[9px] text-ink/40">
          {count}
        </span>
      </div>

      {children}
    </section>
  )
}

function EvidenceFileCard({
  file,
}: {
  file: EvidenceFile
}) {
  return (
    <div className="group overflow-hidden rounded-xl border border-line bg-paper-2">
      <div className="flex aspect-[16/10] items-center justify-center bg-ink/[0.03]">
        <Image className="h-8 w-8 text-ink/20" />
      </div>

      <div className="p-3">
        <p className="truncate text-xs font-semibold text-ink">
          {file.name}
        </p>

        <p className="mt-1 text-[10px] text-ink/35">
          {file.size} · {file.uploadedAt}
        </p>

        <button
          type="button"
          className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-semibold text-ink/50 transition hover:text-ink"
        >
          <Eye className="h-3.5 w-3.5" />
          View evidence
        </button>
      </div>
    </div>
  )
}

function EvidenceFileRow({
  file,
}: {
  file: EvidenceFile
}) {
  const Icon =
    file.type === 'video'
      ? Video
      : FileText

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-line bg-white p-3">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-paper-2">
          <Icon className="h-4 w-4 text-ink/40" />
        </div>

        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-ink">
            {file.name}
          </p>

          <p className="mt-1 text-[10px] text-ink/35">
            {file.size} · {file.uploadedAt}
          </p>
        </div>
      </div>

      <button
        type="button"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line text-ink/40 transition hover:text-ink"
        aria-label={`View ${file.name}`}
      >
        {file.type === 'video' ? (
          <Play className="h-3.5 w-3.5" />
        ) : (
          <Eye className="h-3.5 w-3.5" />
        )}
      </button>
    </div>
  )
}

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
  const toneStyles = {
    teal: 'border-teal/15 hover:border-teal/35',
    amber: 'border-amber/20 hover:border-amber/40',
    brick: 'border-brick/15 hover:border-brick/35',
  }

  return (
    <button
      type="button"
      disabled={disabled}
      className={`rounded-xl border bg-white p-3 text-left transition disabled:cursor-not-allowed disabled:opacity-40 ${toneStyles[tone]}`}
    >
      <Icon
        className={`h-4 w-4 ${
          tone === 'teal'
            ? 'text-teal'
            : tone === 'amber'
              ? 'text-amber-dark'
              : 'text-brick'
        }`}
      />

      <p className="mt-3 text-xs font-semibold text-ink">
        {title}
      </p>

      <p className="mt-1 text-[10px] leading-4 text-ink/40">
        {description}
      </p>
    </button>
  )
}

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
    <div className="flex items-start gap-2.5">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-ink/30" />

      <div className="min-w-0">
        <p className="text-[9px] font-semibold uppercase tracking-wide text-ink/30">
          {label}
        </p>

        <p className="mt-1 text-xs font-semibold text-ink/65">
          {value}
        </p>

        {meta && (
          <p className="mt-1 font-mono text-[9px] text-ink/35">
            {meta}
          </p>
        )}
      </div>
    </div>
  )
}