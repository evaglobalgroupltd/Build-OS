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

  const verificationPercentage = Math.round(
    (passedChecks / verificationChecks.length) * 100,
  )

  const statusLabel =
    evidenceStatusLabels[evidence.status]

  return (
    <div className="space-y-7">
      {/* =========================================================
          BACK NAVIGATION
      ========================================================= */}
      <button
        type="button"
        className="group inline-flex items-center gap-2 text-xs font-semibold text-ink/40 transition-colors hover:text-ink"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-ink/[0.07] bg-white transition-all group-hover:border-ink/[0.14] group-hover:shadow-sm">
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
        </span>

        Back to review queue
      </button>

      {/* =========================================================
          HEADER
      ========================================================= */}
      <header className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-[13px] border border-ink/[0.07] bg-white shadow-[0_6px_20px_rgba(20,30,25,0.035)]">
              <ShieldCheck className="h-[18px] w-[18px] text-ink/55" />
            </div>

            <span className="h-px w-6 bg-ink/10" />

            <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-ink/30">
              Verification dossier
            </span>

            <Badge tone={evidenceStatusTone[evidence.status]}>
              {statusLabel}
            </Badge>
          </div>

          <div className="mt-4 flex flex-wrap items-end gap-x-3 gap-y-2">
            <h1 className="font-display text-[30px] font-semibold tracking-[-0.035em] text-ink sm:text-[36px]">
              Review Evidence
            </h1>

            <span className="mb-1 rounded-full bg-[#F7F8F6] px-2.5 py-1 font-mono text-[9px] font-semibold text-ink/35">
              {evidence.id}
            </span>
          </div>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-ink/50">
            Determine whether the submitted records sufficiently
            support the claimed milestone completion before the
            associated payment can proceed.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full border border-ink/[0.08] bg-white px-4 text-xs font-semibold text-ink/60 shadow-[0_6px_20px_rgba(20,30,25,0.035)] transition-all hover:-translate-y-0.5 hover:border-ink/[0.15] hover:text-ink hover:shadow-[0_10px_28px_rgba(20,30,25,0.05)]"
        >
          <Download className="h-3.5 w-3.5" />
          Export record
        </button>
      </header>

      {/* =========================================================
          REVIEW STATE
      ========================================================= */}
      <div className="relative overflow-hidden rounded-[20px] border border-[#C28A2C]/[0.14] bg-[#F7F1E7]">
        <div className="absolute inset-y-0 left-0 w-1 bg-[#C28A2C]" />

        <div className="flex flex-col gap-4 p-4 pl-5 sm:flex-row sm:items-start sm:p-5 sm:pl-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] bg-white shadow-[0_4px_16px_rgba(20,30,25,0.04)]">
            <Clock3 className="h-[18px] w-[18px] text-[#C28A2C]" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-semibold text-ink">
                Independent verification required
              </p>

              <span className="rounded-full bg-[#C28A2C]/[0.09] px-2 py-1 text-[9px] font-semibold text-[#C28A2C]">
                {verificationPercentage}% reviewed
              </span>
            </div>

            <p className="mt-1 max-w-4xl text-xs leading-5 text-ink/50">
              The submission has passed the initial evidence
              checks, but independent verification remains
              outstanding. The associated milestone payment should
              not proceed until the required verification chain is
              complete.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================
          WORKSPACE
      ========================================================= */}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(330px,0.8fr)]">
        {/* =======================================================
            MAIN REVIEW COLUMN
        ======================================================= */}
        <main className="space-y-6">
          {/* -------------------------------------------------------
              MILESTONE CLAIM
          ------------------------------------------------------- */}
          <Card>
            <CardHeader
              title="Milestone claim"
              subtitle="What the submitted evidence is intended to prove"
            />

            <CardBody className="p-4 sm:p-5">
              <div className="relative overflow-hidden rounded-[18px] border border-ink/[0.07] bg-[#F7F8F6]">
                <div className="absolute inset-y-0 left-0 w-1 bg-[#12613E]/50" />

                <div className="flex flex-col gap-5 p-4 pl-5 sm:flex-row sm:items-start sm:justify-between sm:p-5 sm:pl-6">
                  <div className="min-w-0">
                    <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-ink/30">
                      {evidence.milestone.id}
                    </p>

                    <h2 className="mt-1.5 font-display text-lg font-semibold tracking-[-0.02em] text-ink">
                      {evidence.milestone.name}
                    </h2>

                    <p className="mt-2 max-w-2xl text-xs leading-5 text-ink/45">
                      {evidence.description}
                    </p>
                  </div>

                  <div className="shrink-0 rounded-[14px] border border-ink/[0.06] bg-white px-4 py-3 sm:min-w-[118px] sm:text-right">
                    <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-ink/30">
                      Completion claim
                    </p>

                    <p className="mt-1 font-display text-[26px] font-semibold tracking-[-0.03em] text-ink">
                      {evidence.milestone.completionClaim}%
                    </p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* -------------------------------------------------------
              EVIDENCE
          ------------------------------------------------------- */}
          <Card className="overflow-hidden">
            <CardHeader
              title="Evidence submitted"
              subtitle={`${evidence.files.length} records available for inspection`}
            />

            <CardBody className="p-4 sm:p-5">
              <div className="space-y-6">
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
                          className="group overflow-hidden rounded-[16px] border border-ink/[0.07] bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/[0.12] hover:shadow-[0_12px_30px_rgba(20,30,25,0.05)]"
                        >
                          <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-[#F7F8F6]">
                            <Image className="h-9 w-9 text-ink/15 transition-transform duration-300 group-hover:scale-105" />

                            <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-1 text-[8px] font-semibold uppercase tracking-[0.14em] text-ink/40 backdrop-blur">
                              Image
                            </span>

                            <button
                              type="button"
                              className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-ink/45 opacity-0 shadow-sm transition-all group-hover:opacity-100 hover:text-ink"
                              aria-label={`View ${file.name}`}
                            >
                              <Eye className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          <div className="p-3.5">
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <p className="truncate text-xs font-semibold text-ink">
                                  {file.name}
                                </p>

                                <p className="mt-1 font-mono text-[9px] text-ink/30">
                                  {file.size} · {file.uploadedAt}
                                </p>
                              </div>

                              <span className="font-mono text-[8px] text-ink/20">
                                {file.id}
                              </span>
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

                    <div className="space-y-2.5">
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

                    <div className="space-y-2.5">
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

          {/* -------------------------------------------------------
              VERIFICATION CHECKLIST
          ------------------------------------------------------- */}
          <Card>
            <CardHeader
              title="Verification checklist"
              subtitle={`${passedChecks} of ${verificationChecks.length} requirements currently satisfied`}
            />

            <CardBody className="p-4 sm:p-5">
              <div className="space-y-2.5">
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
                <div className="relative mt-4 overflow-hidden rounded-[15px] border border-[#C28A2C]/[0.12] bg-[#F7F1E7] p-3.5 pl-4">
                  <div className="absolute inset-y-0 left-0 w-1 bg-[#C28A2C]/60" />

                  <div className="flex items-start gap-2.5">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#C28A2C]" />

                    <div>
                      <p className="text-[10px] font-semibold text-ink">
                        Verification chain incomplete
                      </p>

                      <p className="mt-1 text-[10px] leading-5 text-ink/45">
                        Independent verification remains
                        outstanding. This evidence must not be
                        treated as payment-approved until the
                        required review is completed.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardBody>
          </Card>

          {/* -------------------------------------------------------
              DECISION
          ------------------------------------------------------- */}
          <Card>
            <CardHeader
              title="Review decision"
              subtitle="Select the action that should be recorded against this evidence"
            />

            <CardBody className="p-4 sm:p-5">
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

              <div className="mt-5">
                <label className="text-[9px] font-semibold uppercase tracking-[0.16em] text-ink/30">
                  Reviewer notes
                </label>

                <textarea
                  rows={4}
                  placeholder="Record observations, verification notes or reasons for requesting additional evidence..."
                  className="mt-2 w-full resize-none rounded-[14px] border border-ink/[0.07] bg-[#F7F8F6] px-3.5 py-3 text-xs leading-5 text-ink outline-none transition-all placeholder:text-ink/30 focus:border-ink/[0.16] focus:bg-white focus:ring-4 focus:ring-ink/[0.025]"
                />
              </div>

              <div className="mt-4 flex flex-col gap-3 border-t border-ink/[0.06] pt-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="flex items-center gap-2 text-[10px] text-ink/35">
                  <LockKeyhole className="h-3.5 w-3.5" />
                  Decision will be added to the audit trail.
                </p>

                <button
                  type="button"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-ink px-5 text-xs font-semibold text-white shadow-[0_6px_18px_rgba(20,30,25,0.10)] transition-all hover:-translate-y-0.5 hover:bg-ink/90 hover:shadow-[0_10px_24px_rgba(20,30,25,0.14)]"
                >
                  Record review
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </CardBody>
          </Card>
        </main>

        {/* =======================================================
            SIDEBAR
        ======================================================= */}
        <aside className="space-y-6">
          {/* -------------------------------------------------------
              VERIFICATION PROGRESS
          ------------------------------------------------------- */}
          <Card>
            <CardHeader
              title="Verification progress"
              subtitle="Current review state"
            />

            <CardBody className="p-4 sm:p-5">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="font-display text-[34px] font-semibold tracking-[-0.04em] text-ink">
                    {verificationPercentage}%
                  </p>

                  <p className="mt-1 text-[10px] text-ink/35">
                    Checklist completion
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#F7F1E7]">
                  <ShieldCheck className="h-[18px] w-[18px] text-[#C28A2C]" />
                </div>
              </div>

              <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-[#F7F8F6]">
                <div
                  className="h-full rounded-full bg-[#C28A2C] transition-all duration-500"
                  style={{
                    width: `${verificationPercentage}%`,
                  }}
                />
              </div>

              <div className="mt-4 flex items-center justify-between text-[9px]">
                <span className="text-ink/30">
                  {passedChecks} passed
                </span>

                <span className="font-semibold text-[#C28A2C]">
                  {verificationChecks.length - passedChecks}{' '}
                  outstanding
                </span>
              </div>

              <p className="mt-4 border-t border-ink/[0.06] pt-4 text-[10px] leading-5 text-ink/40">
                Independent verification is the remaining
                control before this evidence can support payment
                approval.
              </p>
            </CardBody>
          </Card>

          {/* -------------------------------------------------------
              PROJECT CONTEXT
          ------------------------------------------------------- */}
          <Card>
            <CardHeader
              title="Project context"
              subtitle="Record linkage"
            />

            <CardBody className="p-4 sm:p-5">
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

          {/* -------------------------------------------------------
              SUBMITTER
          ------------------------------------------------------- */}
          <Card>
            <CardHeader
              title="Submitted by"
              subtitle="Evidence source"
            />

            <CardBody className="p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-[#F7F8F6]">
                  <User className="h-4 w-4 text-ink/40" />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-ink">
                    {evidence.submittedBy.name}
                  </p>

                  <span className="mt-1 inline-flex rounded-full bg-[#F7F8F6] px-2 py-1 text-[9px] font-semibold text-ink/40">
                    {evidence.submittedBy.role}
                  </span>

                  <div className="mt-3 flex items-center gap-1.5 font-mono text-[9px] text-ink/30">
                    <CalendarDays className="h-3 w-3" />
                    {evidence.submittedAt}
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* -------------------------------------------------------
              PROTECTED REVIEW
          ------------------------------------------------------- */}
          <div className="relative overflow-hidden rounded-[18px] border border-[#12613E]/[0.10] bg-[#F4F7F4] p-4">
            <div className="absolute inset-y-0 left-0 w-1 bg-[#12613E]" />

            <div className="flex items-start gap-3 pl-1">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] bg-white shadow-[0_4px_14px_rgba(20,30,25,0.035)]">
                <LockKeyhole className="h-4 w-4 text-[#12613E]" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-xs font-semibold text-[#12613E]">
                    Protected review
                  </p>

                  <span className="rounded-full bg-[#12613E]/[0.08] px-2 py-1 text-[8px] font-semibold text-[#12613E]">
                    Audited
                  </span>
                </div>

                <p className="mt-1.5 text-[10px] leading-5 text-ink/40">
                  Reviewer actions, notes and decisions are
                  permanently associated with this evidence
                  record and retained in the Build OS audit trail.
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
    <div className="mb-3 flex items-center gap-2.5">
      <div className="flex h-7 w-7 items-center justify-center rounded-[9px] bg-[#F7F8F6]">
        <Icon className="h-3.5 w-3.5 text-ink/40" />
      </div>

      <p className="text-xs font-semibold text-ink">
        {title}
      </p>

      <span className="rounded-full bg-[#F7F8F6] px-2 py-0.5 font-mono text-[9px] font-semibold text-ink/35">
        {count}
      </span>

      <span className="h-px flex-1 bg-ink/[0.06]" />
    </div>
  )
}

function EvidenceFileRow({
  file,
}: {
  file: EvidenceFile
}) {
  const isVideo = file.type === 'video'
  const Icon = isVideo ? Video : FileText

  return (
    <div className="group flex items-center justify-between gap-3 rounded-[15px] border border-ink/[0.07] bg-white p-3.5 transition-all duration-200 hover:border-ink/[0.12] hover:shadow-[0_8px_24px_rgba(20,30,25,0.04)]">
      <div className="flex min-w-0 items-center gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] ${
            isVideo
              ? 'bg-[#F7F1E7] text-[#C28A2C]'
              : 'bg-[#F7F8F6] text-ink/40'
          }`}
        >
          <Icon className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-ink">
            {file.name}
          </p>

          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[9px] text-ink/30">
            <span>{file.id}</span>
            <span className="text-ink/15">•</span>
            <span>{file.size}</span>
            <span className="text-ink/15">•</span>
            <span>{file.uploadedAt}</span>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] border border-ink/[0.07] text-ink/30 transition-all group-hover:border-ink/[0.13] group-hover:text-ink"
        aria-label={`${isVideo ? 'Play' : 'View'} ${file.name}`}
      >
        {isVideo ? (
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
    <div
      className={`relative overflow-hidden rounded-[15px] border p-3.5 transition-colors ${
        passed
          ? 'border-[#12613E]/[0.08] bg-[#F4F7F4]'
          : 'border-[#C28A2C]/[0.12] bg-[#F7F1E7]'
      }`}
    >
      <div
        className={`absolute inset-y-0 left-0 w-[3px] ${
          passed ? 'bg-[#12613E]/50' : 'bg-[#C28A2C]/60'
        }`}
      />

      <div className="flex items-start gap-3 pl-1">
        <div
          className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-white ${
            passed ? 'text-[#12613E]' : 'text-[#C28A2C]'
          }`}
        >
          {passed ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <Clock3 className="h-4 w-4" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs font-semibold text-ink">
              {label}
            </p>

            <span
              className={`rounded-full px-2 py-0.5 text-[8px] font-semibold ${
                passed
                  ? 'bg-[#12613E]/[0.08] text-[#12613E]'
                  : 'bg-[#C28A2C]/[0.09] text-[#C28A2C]'
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
    teal: {
      border: 'border-[#12613E]/[0.10] hover:border-[#12613E]/[0.28]',
      icon: 'bg-[#F4F7F4] text-[#12613E]',
    },
    amber: {
      border: 'border-[#C28A2C]/[0.12] hover:border-[#C28A2C]/[0.30]',
      icon: 'bg-[#F7F1E7] text-[#C28A2C]',
    },
    brick: {
      border: 'border-[#B85C12]/[0.10] hover:border-[#B85C12]/[0.28]',
      icon: 'bg-[#F8EEE6] text-[#B85C12]',
    },
  }

  return (
    <button
      type="button"
      disabled={disabled}
      className={`group rounded-[16px] border bg-white p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(20,30,25,0.045)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-none ${styles[tone].border}`}
    >
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-[11px] ${styles[tone].icon}`}
      >
        <Icon className="h-4 w-4" />
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <p className="text-xs font-semibold text-ink">
          {title}
        </p>

        <ChevronRight className="h-3.5 w-3.5 text-ink/20 transition-transform group-hover:translate-x-0.5" />
      </div>

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
    <div className="flex items-start gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-[#F7F8F6]">
        <Icon className="h-3.5 w-3.5 text-ink/35" />
      </div>

      <div className="min-w-0">
        <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-ink/30">
          {label}
        </p>

        <p className="mt-1 text-xs font-semibold leading-5 text-ink/65">
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