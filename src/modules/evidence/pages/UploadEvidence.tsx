import type { ReactNode } from 'react'

import {
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Eye,
  FileCheck2,
  FileText,
  Image,
  LockKeyhole,
  MessageSquare,
  Play,
  ShieldCheck,
  User,
  Video,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { Badge } from '@/components/ui/Badge'
import {
  Card,
  CardBody,
  CardHeader,
} from '@/components/ui/Card'

type EvidenceFileType = 'image' | 'video' | 'document'

interface EvidenceFile {
  id: string
  name: string
  type: EvidenceFileType
  size: string
  uploadedAt: string
}

const evidence = {
  id: 'EVD-2026-00482',
  status: 'under_review',

  title: 'Internal Finishing Milestone Evidence',

  project: {
    id: 'PRJ-2026-00421',
    name: 'Abuja Residential Development',
  },

  milestone: {
    id: 'MLS-004',
    name: 'Milestone 04 — Internal Finishing',
    progress: 75,
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

  const totalFiles = evidence.files.length

  return (
    <div className="space-y-7">
      {/* ─────────────────────────────────────────────────────────────
          Header
      ───────────────────────────────────────────────────────────── */}
      <header className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-[13px] border border-amber/[0.12] bg-amber/[0.07]">
              <FileCheck2 className="h-[18px] w-[18px] text-amber-dark" />
            </div>

            <Badge tone="amber">
              Under review
            </Badge>

            <span className="rounded-full border border-ink/[0.06] bg-[#F7F8F6] px-2.5 py-1 font-mono text-[9px] font-semibold tracking-[0.02em] text-ink/40">
              {evidence.id}
            </span>
          </div>

          <div className="mt-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/35">
              Verification workspace
            </p>

            <h1 className="mt-1.5 font-display text-[30px] font-semibold tracking-[-0.025em] text-ink sm:text-[34px]">
              Review evidence
            </h1>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-ink/50">
              Review the submitted records, validate the milestone claim
              and record an independent verification decision.
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 rounded-full border border-ink/[0.07] bg-white px-3.5 py-2.5 shadow-[0_5px_20px_rgba(20,30,25,0.035)]">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber/[0.08]">
            <Clock3 className="h-3.5 w-3.5 text-amber-dark" />
          </span>

          <div>
            <p className="text-[8px] font-semibold uppercase tracking-[0.14em] text-ink/30">
              Review status
            </p>

            <p className="mt-0.5 text-xs font-semibold text-ink">
              Awaiting verification
            </p>
          </div>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          Verification notice
      ───────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-[20px] border border-amber/[0.16] bg-amber/[0.045] p-4 sm:p-5">
        <div className="absolute inset-y-0 left-0 w-[3px] bg-amber" />

        <div className="flex items-start gap-3.5 pl-1">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] bg-white shadow-[0_4px_14px_rgba(20,30,25,0.04)]">
            <ShieldCheck className="h-[17px] w-[17px] text-amber-dark" />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-semibold text-ink">
                Independent verification required
              </p>

              <span className="rounded-full bg-amber/[0.09] px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.1em] text-amber-dark">
                Controlled review
              </span>
            </div>

            <p className="mt-1.5 max-w-4xl text-xs leading-5 text-ink/50">
              Contractor-submitted evidence alone is not sufficient for
              payment release. Review the evidence against the approved
              milestone scope and record your decision below.
            </p>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          Main workspace
      ───────────────────────────────────────────────────────────── */}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(330px,0.8fr)]">
        {/* Main */}
        <div className="min-w-0 space-y-6">
          {/* Milestone context */}
          <Card className="overflow-hidden">
            <CardHeader
              title="Milestone under review"
              subtitle="Evidence must correspond with the approved project scope"
            />

            <CardBody>
              <div className="grid gap-3 sm:grid-cols-3">
                <ReviewContext
                  label="Project"
                  value={evidence.project.name}
                  meta={evidence.project.id}
                  icon={FileText}
                />

                <ReviewContext
                  label="Milestone"
                  value={evidence.milestone.name}
                  meta={evidence.milestone.id}
                  icon={FileCheck2}
                />

                <ReviewContext
                  label="Reported progress"
                  value={`${evidence.milestone.progress}%`}
                  meta="Contractor submission"
                  icon={Clock3}
                  emphasis
                />
              </div>

              <div className="mt-4 rounded-[16px] border border-ink/[0.06] bg-[#F7F8F6] p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.13em] text-ink/30">
                      Completion claim
                    </p>

                    <p className="mt-1 font-display text-2xl font-semibold tracking-tight text-ink">
                      {evidence.milestone.progress}%
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.13em] text-ink/30">
                      Evidence package
                    </p>

                    <p className="mt-1 text-xs font-semibold text-ink">
                      {totalFiles} attached records
                    </p>
                  </div>
                </div>

                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-ink/[0.07]">
                  <div
                    className="h-full rounded-full bg-amber transition-all"
                    style={{
                      width: `${evidence.milestone.progress}%`,
                    }}
                  />
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Evidence submitted */}
          <Card className="overflow-hidden">
            <CardHeader
              title="Submitted evidence"
              subtitle={`${totalFiles} records attached to this milestone`}
            />

            <CardBody>
              <div className="space-y-7">
                {imageFiles.length > 0 && (
                  <EvidenceReviewGroup
                    title="Site photographs"
                    count={imageFiles.length}
                    icon={Image}
                  >
                    <div className="grid gap-3 sm:grid-cols-2">
                      {imageFiles.map((file) => (
                        <ReviewFileCard
                          key={file.id}
                          file={file}
                        />
                      ))}
                    </div>
                  </EvidenceReviewGroup>
                )}

                {videoFiles.length > 0 && (
                  <EvidenceReviewGroup
                    title="Video evidence"
                    count={videoFiles.length}
                    icon={Video}
                  >
                    <div className="space-y-2.5">
                      {videoFiles.map((file) => (
                        <ReviewFileRow
                          key={file.id}
                          file={file}
                        />
                      ))}
                    </div>
                  </EvidenceReviewGroup>
                )}

                {documentFiles.length > 0 && (
                  <EvidenceReviewGroup
                    title="Supporting documents"
                    count={documentFiles.length}
                    icon={FileText}
                  >
                    <div className="space-y-2.5">
                      {documentFiles.map((file) => (
                        <ReviewFileRow
                          key={file.id}
                          file={file}
                        />
                      ))}
                    </div>
                  </EvidenceReviewGroup>
                )}
              </div>
            </CardBody>
          </Card>

          {/* Verification decision */}
          <Card className="overflow-hidden">
            <CardHeader
              title="Verification decision"
              subtitle="Your decision will be permanently associated with this evidence record"
            />

            <CardBody>
              <div className="grid gap-3 sm:grid-cols-3">
                <DecisionButton
                  icon={CheckCircle2}
                  title="Verify evidence"
                  description="Confirm that the evidence supports the milestone."
                  tone="teal"
                  disabled
                />

                <DecisionButton
                  icon={Clock3}
                  title="Request more evidence"
                  description="Ask the submitter to provide additional records."
                  tone="amber"
                />

                <DecisionButton
                  icon={AlertTriangle}
                  title="Reject evidence"
                  description="Evidence does not adequately support completion."
                  tone="brick"
                />
              </div>

              <div className="mt-5 border-t border-ink/[0.06] pt-5">
                <label
                  htmlFor="review-note"
                  className="text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/35"
                >
                  Review note
                </label>

                <textarea
                  id="review-note"
                  rows={4}
                  placeholder="Add your verification notes, observations or required corrections..."
                  className="mt-2.5 w-full resize-none rounded-[14px] border border-ink/[0.08] bg-[#F7F8F6] px-3.5 py-3 text-xs leading-5 text-ink outline-none transition placeholder:text-ink/25 hover:border-ink/[0.12] focus:border-ink/20 focus:bg-white focus:shadow-[0_0_0_3px_rgba(20,30,25,0.025)]"
                />

                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2 text-[10px] text-ink/35">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F7F8F6]">
                      <LockKeyhole className="h-3 w-3" />
                    </span>

                    <span>
                      Decision is audit logged and protected.
                    </span>
                  </div>

                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-4 py-2.5 text-xs font-semibold text-white shadow-[0_5px_16px_rgba(20,30,25,0.10)] transition hover:-translate-y-0.5 hover:bg-ink/90 hover:shadow-[0_8px_20px_rgba(20,30,25,0.14)]"
                  >
                    Record review decision
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Sidebar */}
        <aside className="min-w-0 space-y-6">
          {/* Verification state */}
          <Card className="overflow-hidden">
            <CardHeader
              title="Verification state"
              subtitle="Current evidence review position"
            />

            <CardBody>
              <div className="rounded-[16px] border border-amber/[0.14] bg-amber/[0.045] p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/30">
                      Review progress
                    </p>

                    <p className="mt-1 font-display text-3xl font-semibold tracking-[-0.03em] text-ink">
                      3<span className="text-base text-ink/30"> / 5</span>
                    </p>
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-white shadow-[0_4px_14px_rgba(20,30,25,0.04)]">
                    <ShieldCheck className="h-4 w-4 text-amber-dark" />
                  </div>
                </div>

                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-ink/[0.07]">
                  <div
                    className="h-full rounded-full bg-amber"
                    style={{ width: '60%' }}
                  />
                </div>

                <p className="mt-2.5 text-[10px] leading-4 text-ink/40">
                  Verification remains incomplete. Independent review is
                  required before this evidence can support release.
                </p>
              </div>
            </CardBody>
          </Card>

          {/* Submitted by */}
          <Card>
            <CardHeader
              title="Submitted by"
              subtitle="Evidence source"
            />

            <CardBody>
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] border border-ink/[0.06] bg-[#F7F8F6]">
                  <User className="h-4 w-4 text-ink/45" />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-ink">
                    {evidence.submittedBy.name}
                  </p>

                  <div className="mt-1 flex items-center gap-2">
                    <span className="rounded-full bg-[#F7F8F6] px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.1em] text-ink/40">
                      {evidence.submittedBy.role}
                    </span>
                  </div>

                  <p className="mt-2.5 font-mono text-[9px] text-ink/30">
                    Submitted {evidence.submittedAt}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Verification checklist */}
          <Card>
            <CardHeader
              title="Verification checklist"
              subtitle="Review before recording a decision"
            />

            <CardBody>
              <div className="space-y-2">
                <ChecklistItem
                  label="Evidence relates to the correct milestone"
                  checked
                />

                <ChecklistItem
                  label="Submitted records are readable and usable"
                  checked
                />

                <ChecklistItem
                  label="Site condition matches reported progress"
                  checked
                />

                <ChecklistItem
                  label="Evidence is sufficient for independent verification"
                />

                <ChecklistItem
                  label="No conflicting information identified"
                />
              </div>

              <div className="mt-4 flex items-start gap-2.5 rounded-[13px] border border-amber/[0.12] bg-amber/[0.045] p-3">
                <Clock3 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-dark" />

                <p className="text-[10px] leading-4 text-ink/45">
                  Two verification conditions remain open before the
                  evidence can be fully verified.
                </p>
              </div>
            </CardBody>
          </Card>

          {/* Review integrity */}
          <div className="relative overflow-hidden rounded-[20px] border border-ink/[0.07] bg-[#F7F8F6] p-4">
            <div className="absolute inset-y-0 left-0 w-[3px] bg-ink/15" />

            <div className="flex items-start gap-3.5 pl-1">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] bg-white shadow-[0_4px_14px_rgba(20,30,25,0.035)]">
                <MessageSquare className="h-4 w-4 text-ink/45" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <p className="text-xs font-semibold text-ink">
                    Review integrity
                  </p>

                  <LockKeyhole className="h-3 w-3 text-ink/25" />
                </div>

                <p className="mt-1.5 text-[10px] leading-5 text-ink/45">
                  Avoid approving evidence based solely on the
                  contractor&apos;s claim. Verification should reflect
                  independent review of the submitted records.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

function EvidenceReviewGroup({
  title,
  count,
  icon: Icon,
  children,
}: {
  title: string
  count: number
  icon: LucideIcon
  children: ReactNode
}) {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[9px] bg-[#F7F8F6]">
            <Icon className="h-3.5 w-3.5 text-ink/40" />
          </span>

          <div className="min-w-0">
            <p className="text-xs font-semibold text-ink">
              {title}
            </p>
          </div>

          <span className="rounded-full bg-[#F7F8F6] px-2 py-0.5 font-mono text-[9px] font-semibold text-ink/35">
            {count}
          </span>
        </div>

        <span className="hidden text-[8px] font-semibold uppercase tracking-[0.12em] text-ink/25 sm:block">
          Evidence set
        </span>
      </div>

      {children}
    </section>
  )
}

function ReviewFileCard({
  file,
}: {
  file: EvidenceFile
}) {
  return (
    <article className="group overflow-hidden rounded-[17px] border border-ink/[0.07] bg-white transition duration-200 hover:-translate-y-0.5 hover:border-ink/[0.11] hover:shadow-[0_10px_28px_rgba(20,30,25,0.06)]">
      <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-[#F7F8F6]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(18,97,62,0.035),transparent_62%)]" />

        <div className="relative flex h-12 w-12 items-center justify-center rounded-[14px] bg-white shadow-[0_6px_20px_rgba(20,30,25,0.055)]">
          <Image className="h-5 w-5 text-ink/25" />
        </div>

        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-1 text-[8px] font-semibold uppercase tracking-[0.12em] text-ink/35 backdrop-blur-sm">
          Image
        </span>

        <button
          type="button"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-ink/40 opacity-0 shadow-sm backdrop-blur-sm transition group-hover:opacity-100 hover:text-ink"
          aria-label={`Inspect ${file.name}`}
        >
          <Eye className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="p-3.5">
        <p className="truncate text-xs font-semibold text-ink">
          {file.name}
        </p>

        <p className="mt-1.5 truncate text-[9px] text-ink/35">
          {file.size} · {file.uploadedAt}
        </p>

        <button
          type="button"
          className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-semibold text-ink/45 transition hover:text-ink"
        >
          <Eye className="h-3.5 w-3.5" />
          Inspect evidence
        </button>
      </div>
    </article>
  )
}

function ReviewFileRow({
  file,
}: {
  file: EvidenceFile
}) {
  const Icon = file.type === 'video' ? Video : FileText

  return (
    <article className="group flex items-center justify-between gap-3 rounded-[15px] border border-ink/[0.07] bg-white p-3 transition duration-200 hover:border-ink/[0.11] hover:shadow-[0_7px_22px_rgba(20,30,25,0.045)]">
      <div className="flex min-w-0 items-center gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] ${
            file.type === 'video'
              ? 'bg-amber/[0.07]'
              : 'bg-[#F7F8F6]'
          }`}
        >
          <Icon
            className={`h-4 w-4 ${
              file.type === 'video'
                ? 'text-amber-dark'
                : 'text-ink/40'
            }`}
          />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="truncate text-xs font-semibold text-ink">
              {file.name}
            </p>

            <span className="hidden shrink-0 rounded-full bg-[#F7F8F6] px-1.5 py-0.5 text-[7px] font-semibold uppercase tracking-[0.1em] text-ink/30 sm:inline-flex">
              {file.type}
            </span>
          </div>

          <p className="mt-1 truncate text-[9px] text-ink/35">
            {file.size} · {file.uploadedAt}
          </p>
        </div>
      </div>

      <button
        type="button"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/[0.07] bg-white text-ink/35 transition hover:border-ink/[0.14] hover:text-ink"
        aria-label={`Inspect ${file.name}`}
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

function ReviewContext({
  label,
  value,
  meta,
  icon: Icon,
  emphasis = false,
}: {
  label: string
  value: string
  meta?: string
  icon: LucideIcon
  emphasis?: boolean
}) {
  return (
    <div
      className={`rounded-[15px] border p-3.5 transition ${
        emphasis
          ? 'border-amber/[0.12] bg-amber/[0.035]'
          : 'border-ink/[0.06] bg-[#F7F8F6]'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-[9px] font-semibold uppercase tracking-[0.13em] text-ink/30">
          {label}
        </p>

        <Icon
          className={`h-3.5 w-3.5 ${
            emphasis ? 'text-amber-dark/60' : 'text-ink/25'
          }`}
        />
      </div>

      <p
        className={`mt-2 text-xs font-semibold leading-5 ${
          emphasis ? 'text-ink' : 'text-ink'
        }`}
      >
        {value}
      </p>

      {meta && (
        <p className="mt-1 truncate font-mono text-[9px] text-ink/30">
          {meta}
        </p>
      )}
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
  icon: LucideIcon
  title: string
  description: string
  tone: 'teal' | 'amber' | 'brick'
  disabled?: boolean
}) {
  const toneClasses = {
    teal: {
      border: 'border-[#12613E]/[0.13]',
      hover: 'hover:border-[#12613E]/30 hover:bg-[#12613E]/[0.035]',
      icon: 'bg-[#12613E]/[0.07] text-[#12613E]',
      dot: 'bg-[#12613E]',
    },
    amber: {
      border: 'border-[#C28A2C]/[0.15]',
      hover: 'hover:border-[#C28A2C]/35 hover:bg-[#C28A2C]/[0.035]',
      icon: 'bg-[#C28A2C]/[0.08] text-[#9A6D18]',
      dot: 'bg-[#C28A2C]',
    },
    brick: {
      border: 'border-[#B85C12]/[0.14]',
      hover: 'hover:border-[#B85C12]/35 hover:bg-[#B85C12]/[0.035]',
      icon: 'bg-[#B85C12]/[0.07] text-[#B85C12]',
      dot: 'bg-[#B85C12]',
    },
  }

  const styles = toneClasses[tone]

  return (
    <button
      type="button"
      disabled={disabled}
      className={`group relative overflow-hidden rounded-[17px] border bg-white p-4 text-left transition duration-200 ${
        styles.border
      } ${
        disabled
          ? 'cursor-not-allowed opacity-50'
          : `hover:-translate-y-0.5 ${styles.hover} hover:shadow-[0_8px_24px_rgba(20,30,25,0.045)]`
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-[11px] ${styles.icon}`}
        >
          <Icon className="h-4 w-4" />
        </span>

        {!disabled && (
          <ChevronRight className="h-3.5 w-3.5 text-ink/20 transition group-hover:translate-x-0.5 group-hover:text-ink/40" />
        )}
      </div>

      <p className="mt-3 text-xs font-semibold text-ink">
        {title}
      </p>

      <p className="mt-1.5 text-[10px] leading-4 text-ink/40">
        {description}
      </p>

      {disabled && (
        <div className="mt-3 flex items-center gap-1.5">
          <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />

          <span className="text-[8px] font-semibold uppercase tracking-[0.1em] text-ink/30">
            Additional verification required
          </span>
        </div>
      )}
    </button>
  )
}

function ChecklistItem({
  label,
  checked = false,
}: {
  label: string
  checked?: boolean
}) {
  return (
    <label
      className={`group flex cursor-pointer items-start gap-3 rounded-[13px] border p-3 transition ${
        checked
          ? 'border-[#12613E]/[0.10] bg-[#12613E]/[0.025]'
          : 'border-ink/[0.06] bg-white hover:border-ink/[0.11]'
      }`}
    >
      <span
        className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition ${
          checked
            ? 'border-[#12613E] bg-[#12613E] text-white'
            : 'border-ink/15 bg-white text-transparent'
        }`}
      >
        <CheckCircle2 className="h-3 w-3" />
      </span>

      <input
        type="checkbox"
        defaultChecked={checked}
        className="sr-only"
      />

      <span
        className={`text-[10px] leading-4 ${
          checked ? 'text-ink/60' : 'text-ink/50'
        }`}
      >
        {label}
      </span>
    </label>
  )
}