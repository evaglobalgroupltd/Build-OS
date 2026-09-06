import {
  AlertTriangle,
  CheckCircle2,
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-start">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber/10">
              <FileCheck2 className="h-5 w-5 text-amber-dark" />
            </div>

            <Badge tone="amber">
              Under review
            </Badge>

            <span className="rounded-full bg-paper-2 px-2.5 py-1 font-mono text-[9px] font-semibold text-ink/40">
              {evidence.id}
            </span>
          </div>

          <h1 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Review evidence
          </h1>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-ink/50">
            Review the submitted records, confirm milestone completion
            and record an independent verification decision.
          </p>
        </div>

        <div className="rounded-xl border border-line bg-white px-4 py-3">
          <p className="text-[9px] font-semibold uppercase tracking-wide text-ink/30">
            Review status
          </p>

          <div className="mt-1 flex items-center gap-2">
            <Clock3 className="h-4 w-4 text-amber-dark" />

            <p className="text-sm font-semibold text-ink">
              Awaiting verification
            </p>
          </div>
        </div>
      </div>

      {/* Review notice */}
      <div className="flex items-start gap-3 rounded-2xl border border-amber/20 bg-amber/[0.05] p-4">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-dark" />

        <div>
          <p className="text-sm font-semibold text-ink">
            Independent verification required
          </p>

          <p className="mt-1 max-w-3xl text-xs leading-5 text-ink/50">
            Contractor-submitted evidence alone is not sufficient for
            payment release. Review the evidence against the approved
            milestone scope and record your decision below.
          </p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(340px,0.8fr)]">
        {/* Main review area */}
        <div className="space-y-6">
          {/* Milestone context */}
          <Card>
            <CardHeader
              title="Milestone under review"
              subtitle="Evidence must correspond with the approved project scope"
            />

            <CardBody>
              <div className="grid gap-4 sm:grid-cols-3">
                <ReviewContext
                  label="Project"
                  value={evidence.project.name}
                  meta={evidence.project.id}
                />

                <ReviewContext
                  label="Milestone"
                  value={evidence.milestone.name}
                  meta={evidence.milestone.id}
                />

                <ReviewContext
                  label="Reported progress"
                  value={`${evidence.milestone.progress}%`}
                  meta="Contractor submission"
                />
              </div>
            </CardBody>
          </Card>

          {/* Evidence */}
          <Card className="overflow-hidden">
            <CardHeader
              title="Submitted evidence"
              subtitle={`${evidence.files.length} records attached to this milestone`}
            />

            <CardBody>
              <div className="space-y-6">
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
                    <div className="space-y-3">
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
                    <div className="space-y-3">
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

          {/* Decision */}
          <Card>
            <CardHeader
              title="Verification decision"
              subtitle="Your decision will be permanently associated with this evidence record"
            />

            <CardBody>
              <div className="grid gap-3 sm:grid-cols-3">
                <button
                  type="button"
                  className="rounded-xl border border-teal/15 bg-white p-4 text-left transition hover:border-teal/40 hover:bg-teal-light"
                >
                  <CheckCircle2 className="h-5 w-5 text-teal" />

                  <p className="mt-3 text-xs font-semibold text-ink">
                    Verify evidence
                  </p>

                  <p className="mt-1 text-[10px] leading-4 text-ink/40">
                    Confirm that the evidence supports the milestone.
                  </p>
                </button>

                <button
                  type="button"
                  className="rounded-xl border border-amber/20 bg-white p-4 text-left transition hover:border-amber/40 hover:bg-amber/[0.04]"
                >
                  <Clock3 className="h-5 w-5 text-amber-dark" />

                  <p className="mt-3 text-xs font-semibold text-ink">
                    Request more evidence
                  </p>

                  <p className="mt-1 text-[10px] leading-4 text-ink/40">
                    Ask the submitter to provide additional records.
                  </p>
                </button>

                <button
                  type="button"
                  className="rounded-xl border border-brick/15 bg-white p-4 text-left transition hover:border-brick/40 hover:bg-brick/[0.04]"
                >
                  <AlertTriangle className="h-5 w-5 text-brick" />

                  <p className="mt-3 text-xs font-semibold text-ink">
                    Reject evidence
                  </p>

                  <p className="mt-1 text-[10px] leading-4 text-ink/40">
                    Evidence does not adequately support completion.
                  </p>
                </button>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="review-note"
                  className="text-[9px] font-semibold uppercase tracking-wide text-ink/35"
                >
                  Review note
                </label>

                <textarea
                  id="review-note"
                  rows={4}
                  placeholder="Add your verification notes, observations or required corrections..."
                  className="mt-2 w-full resize-none rounded-xl border border-line bg-paper-2 px-3 py-3 text-xs text-ink outline-none transition placeholder:text-ink/25 focus:border-ink/20 focus:bg-white"
                />
              </div>

              <div className="mt-4 flex items-center justify-between gap-4">
                <p className="flex items-center gap-2 text-[10px] text-ink/35">
                  <LockKeyhole className="h-3.5 w-3.5" />
                  Decision is audit logged
                </p>

                <button
                  type="button"
                  className="rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-ink/90"
                >
                  Record review decision
                </button>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
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

                  <p className="mt-2 font-mono text-[9px] text-ink/30">
                    Submitted {evidence.submittedAt}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Review checklist */}
          <Card>
            <CardHeader
              title="Verification checklist"
              subtitle="Review before recording a decision"
            />

            <CardBody>
              <div className="space-y-3">
                <ChecklistItem
                  label="Evidence relates to the correct milestone"
                />

                <ChecklistItem
                  label="Submitted records are readable and usable"
                />

                <ChecklistItem
                  label="Site condition matches reported progress"
                />

                <ChecklistItem
                  label="Evidence is sufficient for independent verification"
                />

                <ChecklistItem
                  label="No conflicting information identified"
                />
              </div>
            </CardBody>
          </Card>

          {/* Audit note */}
          <div className="rounded-2xl border border-line bg-paper-2 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white">
                <MessageSquare className="h-4 w-4 text-ink/45" />
              </div>

              <div>
                <p className="text-xs font-semibold text-ink">
                  Review integrity
                </p>

                <p className="mt-1 text-[11px] leading-5 text-ink/45">
                  Avoid approving evidence based solely on the
                  contractor's claim. Verification should reflect
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

function ReviewFileCard({
  file,
}: {
  file: EvidenceFile
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-paper-2">
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
          Inspect evidence
        </button>
      </div>
    </div>
  )
}

function ReviewFileRow({
  file,
}: {
  file: EvidenceFile
}) {
  const Icon = file.type === 'video' ? Video : FileText

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
        aria-label={`Inspect ${file.name}`}
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

function ReviewContext({
  label,
  value,
  meta,
}: {
  label: string
  value: string
  meta?: string
}) {
  return (
    <div className="rounded-xl border border-line bg-paper-2 p-3">
      <p className="text-[9px] font-semibold uppercase tracking-wide text-ink/30">
        {label}
      </p>

      <p className="mt-1 text-xs font-semibold text-ink">
        {value}
      </p>

      {meta && (
        <p className="mt-1 font-mono text-[9px] text-ink/35">
          {meta}
        </p>
      )}
    </div>
  )
}

function ChecklistItem({
  label,
}: {
  label: string
}) {
  return (
    <label className="flex cursor-pointer items-start gap-2.5 rounded-lg border border-line bg-white p-2.5">
      <input
        type="checkbox"
        className="mt-0.5 h-3.5 w-3.5 rounded border-line accent-ink"
      />

      <span className="text-[10px] leading-4 text-ink/55">
        {label}
      </span>
    </label>
  )
}