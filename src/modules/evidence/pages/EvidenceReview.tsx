import {
  AlertTriangle,
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Download,
  Eye,
  FileCheck2,
  FileText,
  Image,
  LockKeyhole,
  MapPin,
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
    completionClaim: 100,
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

const verificationChecks = [
  {
    id: 'scope',
    label: 'Evidence matches approved milestone scope',
    description:
      'Submitted records correspond to the work defined for this milestone.',
    status: 'passed',
  },
  {
    id: 'location',
    label: 'Evidence is associated with the correct project',
    description:
      'Project and milestone references match the submitted evidence.',
    status: 'passed',
  },
  {
    id: 'quality',
    label: 'Evidence quality is sufficient for verification',
    description:
      'Images, video and documentation provide enough information for review.',
    status: 'passed',
  },
  {
    id: 'independent',
    label: 'Independent verification completed',
    description:
      'A project manager or assigned professional must independently confirm the claim.',
    status: 'pending',
  },
]

export function EvidenceReview() {
  const imageFiles = evidence.files.filter(
    (file) => file.type === 'image',
  )

  const videoFiles = evidence.files.filter(
    (file) => file.type === 'video',
  )

  const documentFiles = evidence.files.filter(
    (file) => file.type === 'document',
  )

  const passedChecks = verificationChecks.filter(
    (check) => check.status === 'passed',
  ).length

  const allChecksPassed =
    passedChecks === verificationChecks.length

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <button
        type="button"
        className="inline-flex items-center gap-2 text-xs font-semibold text-ink/45 transition hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to review queue
      </button>

      {/* Header */}
      <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-start">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink/5">
              <ShieldCheck className="h-5 w-5 text-ink/55" />
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
            Review Evidence
          </h1>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-ink/50">
            Verify whether the submitted records sufficiently
            support the claimed milestone completion before
            recommending payment.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-xs font-semibold text-ink/55 transition hover:text-ink"
          >
            <Download className="h-4 w-4" />
            Export record
          </button>
        </div>
      </div>

      {/* Review banner */}
      <div className="flex items-start gap-3 rounded-2xl border border-amber/20 bg-amber/[0.05] p-4">
        <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-amber-dark" />

        <div>
          <p className="text-sm font-semibold text-ink">
            Verification required
          </p>

          <p className="mt-1 text-xs leading-5 text-ink/50">
            This submission has passed the initial evidence
            checks but still requires independent verification
            before the associated milestone payment can proceed.
          </p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(340px,0.8fr)]">
        {/* Main review workspace */}
        <div className="space-y-6">
          {/* Claim */}
          <Card>
            <CardHeader
              title="Milestone claim"
              subtitle="What the submitted evidence is intended to prove"
            />

            <CardBody>
              <div className="rounded-2xl border border-line bg-paper-2 p-4">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div>
                    <p className="font-mono text-[9px] font-semibold uppercase tracking-wide text-ink/35">
                      {evidence.milestone.id}
                    </p>

                    <h2 className="mt-1 text-sm font-semibold text-ink">
                      {evidence.milestone.name}
                    </h2>

                    <p className="mt-2 text-xs leading-5 text-ink/45">
                      {evidence.description}
                    </p>
                  </div>

                  <div className="shrink-0 rounded-xl bg-white px-3 py-2 text-right">
                    <p className="text-[9px] font-semibold uppercase tracking-wide text-ink/30">
                      Completion claim
                    </p>

                    <p className="mt-1 font-display text-xl font-semibold text-ink">
                      {evidence.milestone.completionClaim}%
                    </p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Evidence preview */}
          <Card className="overflow-hidden">
            <CardHeader
              title="Evidence submitted"
              subtitle={`${evidence.files.length} records available for inspection`}
            />

            <CardBody>
              <div className="space-y-5">
                {/* Images */}
                {imageFiles.length > 0 && (
                  <section>
                    <EvidenceSectionHeader
                      icon={Image}
                      title="Site photographs"
                      count={imageFiles.length}
                    />

                    <div className="grid gap-3 sm:grid-cols-2">
                      {imageFiles.map((file) => (
                        <div
                          key={file.id}
                          className="overflow-hidden rounded-xl border border-line bg-paper-2"
                        >
                          <div className="flex aspect-[16/10] items-center justify-center bg-ink/[0.03]">
                            <Image className="h-9 w-9 text-ink/20" />
                          </div>

                          <div className="p-3">
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <p className="truncate text-xs font-semibold text-ink">
                                  {file.name}
                                </p>

                                <p className="mt-1 text-[10px] text-ink/35">
                                  {file.size} · {file.uploadedAt}
                                </p>
                              </div>

                              <button
                                type="button"
                                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line text-ink/40 transition hover:text-ink"
                                aria-label={`View ${file.name}`}
                              >
                                <Eye className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Video */}
                {videoFiles.length > 0 && (
                  <section>
                    <EvidenceSectionHeader
                      icon={Video}
                      title="Video evidence"
                      count={videoFiles.length}
                    />

                    <div className="space-y-3">
                      {videoFiles.map((file) => (
                        <EvidenceFileRow
                          key={file.id}
                          file={file}
                        />
                      ))}
                    </div>
                  </section>
                )}

                {/* Documents */}
                {documentFiles.length > 0 && (
                  <section>
                    <EvidenceSectionHeader
                      icon={FileText}
                      title="Supporting documents"
                      count={documentFiles.length}
                    />

                    <div className="space-y-3">
                      {documentFiles.map((file) => (
                        <EvidenceFileRow
                          key={file.id}
                          file={file}
                        />
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </CardBody>
          </Card>

          {/* Verification checklist */}
          <Card>
            <CardHeader
              title="Verification checklist"
              subtitle={`${passedChecks} of ${verificationChecks.length} verification requirements currently satisfied`}
            />

            <CardBody>
              <div className="space-y-3">
                {verificationChecks.map((check) => (
                  <VerificationCheck
                    key={check.id}
                    label={check.label}
                    description={check.description}
                    status={check.status}
                  />
                ))}
              </div>

              {!allChecksPassed && (
                <div className="mt-4 flex items-start gap-2 rounded-xl border border-amber/15 bg-amber/[0.04] p-3">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-dark" />

                  <p className="text-[10px] leading-5 text-ink/45">
                    Independent verification remains outstanding.
                    Do not treat this submission as payment-approved
                    until the required verification is completed.
                  </p>
                </div>
              )}
            </CardBody>
          </Card>

          {/* Decision */}
          <Card>
            <CardHeader
              title="Review decision"
              subtitle="Select the action that should be recorded against this evidence"
            />

            <CardBody>
              <div className="grid gap-3 md:grid-cols-3">
                <DecisionButton
                  icon={CheckCircle2}
                  title="Verify evidence"
                  description="Confirm that the evidence supports the milestone claim."
                  tone="teal"
                  disabled={!allChecksPassed}
                />

                <DecisionButton
                  icon={Clock3}
                  title="Request more"
                  description="Ask the submitter for additional or clearer evidence."
                  tone="amber"
                />

                <DecisionButton
                  icon={AlertTriangle}
                  title="Flag issue"
                  description="Escalate suspected quality, scope or compliance concerns."
                  tone="brick"
                />
              </div>

              <div className="mt-4">
                <label className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                  Reviewer notes
                </label>

                <textarea
                  rows={4}
                  placeholder="Record observations, verification notes or reasons for requesting additional evidence..."
                  className="mt-2 w-full resize-none rounded-xl border border-line bg-paper-2 px-3 py-2.5 text-xs leading-5 text-ink outline-none transition placeholder:text-ink/30 focus:border-ink/20 focus:bg-white"
                />
              </div>

              <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-4">
                <p className="flex items-center gap-2 text-[10px] text-ink/35">
                  <LockKeyhole className="h-3.5 w-3.5" />
                  Decision will be added to the audit trail.
                </p>

                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-ink/90"
                >
                  Record review
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Review sidebar */}
        <aside className="space-y-6">
          {/* Verification progress */}
          <Card>
            <CardHeader
              title="Verification progress"
              subtitle="Current review state"
            />

            <CardBody>
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="font-display text-3xl font-semibold text-ink">
                    {Math.round(
                      (passedChecks /
                        verificationChecks.length) *
                        100,
                    )}
                    %
                  </p>

                  <p className="mt-1 text-[10px] text-ink/35">
                    Checklist completion
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber/[0.08]">
                  <ShieldCheck className="h-5 w-5 text-amber-dark" />
                </div>
              </div>

              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-paper-2">
                <div
                  className="h-full rounded-full bg-amber"
                  style={{
                    width: `${
                      (passedChecks /
                        verificationChecks.length) *
                      100
                    }%`,
                  }}
                />
              </div>

              <p className="mt-3 text-[10px] leading-5 text-ink/40">
                Independent verification is the remaining
                control before this evidence can support
                payment approval.
              </p>
            </CardBody>
          </Card>

          {/* Project context */}
          <Card>
            <CardHeader
              title="Project context"
              subtitle="Record linkage"
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
              subtitle="Evidence source"
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
                  Protected review
                </p>

                <p className="mt-1 text-[11px] leading-5 text-ink/45">
                  Reviewer actions, notes and decisions are
                  permanently associated with the evidence
                  record and retained in the Build OS audit
                  trail.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

function EvidenceSectionHeader({
  icon: Icon,
  title,
  count,
}: {
  icon: typeof Image
  title: string
  count: number
}) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <Icon className="h-4 w-4 text-ink/40" />

      <p className="text-xs font-semibold text-ink">
        {title}
      </p>

      <span className="rounded-full bg-paper-2 px-2 py-0.5 font-mono text-[9px] text-ink/40">
        {count}
      </span>
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

function VerificationCheck({
  label,
  description,
  status,
}: {
  label: string
  description: string
  status: 'passed' | 'pending'
}) {
  const passed = status === 'passed'

  return (
    <div className="flex items-start gap-3 rounded-xl border border-line bg-white p-3">
      <div
        className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
          passed
            ? 'bg-teal-light'
            : 'bg-amber/[0.08]'
        }`}
      >
        {passed ? (
          <CheckCircle2 className="h-4 w-4 text-teal" />
        ) : (
          <Clock3 className="h-4 w-4 text-amber-dark" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-xs font-semibold text-ink">
            {label}
          </p>

          <span
            className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${
              passed
                ? 'bg-teal-light text-teal'
                : 'bg-amber/[0.08] text-amber-dark'
            }`}
          >
            {passed ? 'Passed' : 'Pending'}
          </span>
        </div>

        <p className="mt-1 text-[10px] leading-5 text-ink/40">
          {description}
        </p>
      </div>
    </div>
  )
}

function DecisionButton({
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
    teal: 'border-teal/15 hover:border-teal/35',
    amber: 'border-amber/20 hover:border-amber/40',
    brick: 'border-brick/15 hover:border-brick/35',
  }

  const iconStyles = {
    teal: 'text-teal',
    amber: 'text-amber-dark',
    brick: 'text-brick',
  }

  return (
    <button
      type="button"
      disabled={disabled}
      className={`rounded-xl border bg-white p-4 text-left transition disabled:cursor-not-allowed disabled:opacity-40 ${styles[tone]}`}
    >
      <Icon className={`h-5 w-5 ${iconStyles[tone]}`} />

      <p className="mt-3 text-xs font-semibold text-ink">
        {title}
      </p>

      <p className="mt-1 text-[10px] leading-5 text-ink/40">
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