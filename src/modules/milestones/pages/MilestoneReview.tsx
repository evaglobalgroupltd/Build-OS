import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  FileCheck2,
  FileText,
  Image as ImageIcon,
  MessageSquare,
  ShieldCheck,
  UserRound,
  Video,
  Wallet,
  XCircle,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'

export function MilestoneReview() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-white text-ink/55 hover:bg-paper-2 hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>

        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/35">
            Verification workflow
          </p>

          <h1 className="font-display text-xl font-semibold text-ink">
            Review Milestone
          </h1>
        </div>
      </div>

      {/* Review summary */}
      <Card className="overflow-hidden">
        <div className="border-b border-line bg-paper-2 px-6 py-6 sm:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-display text-2xl font-semibold text-ink">
                  Foundation
                </h2>

                <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-[10px] font-semibold text-amber-700">
                  Pending Review
                </span>
              </div>

              <p className="mt-2 text-sm text-ink/45">
                Gwarinpa Residence · Foundation phase
              </p>
            </div>

            <div className="rounded-xl bg-white px-5 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                Payment under review
              </p>

              <p className="mt-1 font-display text-xl font-bold text-ink">
                ₦2,850,000
              </p>
            </div>
          </div>
        </div>

        <CardBody>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <ReviewMetric
              icon={UserRound}
              label="Contractor"
              value="BuildRight Construction Ltd."
            />

            <ReviewMetric
              icon={ShieldCheck}
              label="Project manager"
              value="Ibrahim Musa"
            />

            <ReviewMetric
              icon={CheckCircle2}
              label="Reported progress"
              value="100%"
            />

            <ReviewMetric
              icon={Wallet}
              label="Payment status"
              value="Awaiting approval"
            />
          </div>
        </CardBody>
      </Card>

      <div className="grid gap-6 xl:grid-cols-3">
        {/* Evidence review */}
        <div className="space-y-6 xl:col-span-2">
          <Card>
            <CardHeader
              title="Evidence submitted"
              subtitle="Review the evidence supporting milestone completion"
            />

            <CardBody>
              <div className="grid gap-3 sm:grid-cols-2">
                <EvidenceCard
                  icon={ImageIcon}
                  title="Site photographs"
                  count="6 files"
                  description="Foundation and reinforcement progress."
                />

                <EvidenceCard
                  icon={Video}
                  title="Site videos"
                  count="2 files"
                  description="Walkthrough footage of completed work."
                />

                <EvidenceCard
                  icon={FileText}
                  title="Completion notes"
                  count="1 document"
                  description="Contractor completion submission."
                />

                <EvidenceCard
                  icon={FileCheck2}
                  title="Inspection record"
                  count="1 document"
                  description="Submitted for independent verification."
                />
              </div>
            </CardBody>
          </Card>

          {/* Review checklist */}
          <Card>
            <CardHeader
              title="Verification checklist"
              subtitle="Confirm the milestone satisfies the approved scope"
            />

            <CardBody>
              <div className="space-y-3">
                <ReviewCheck
                  title="Approved scope completed"
                  description="Reported foundation works correspond with the approved milestone scope."
                />

                <ReviewCheck
                  title="Evidence is sufficient"
                  description="Submitted photos, videos and completion records support the completion claim."
                />

                <ReviewCheck
                  title="Materials are accounted for"
                  description="Material usage is consistent with the approved procurement and project records."
                />

                <ReviewCheck
                  title="Quality is acceptable"
                  description="No unresolved quality issue or defect has been identified."
                />

                <ReviewCheck
                  title="No active dispute"
                  description="The milestone payment line is not currently subject to a dispute."
                />
              </div>
            </CardBody>
          </Card>

          {/* Review comment */}
          <Card>
            <CardHeader
              title="Review decision"
              subtitle="Record the reason for approval, rejection or further evidence"
            />

            <CardBody>
              <label className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                Review comment
              </label>

              <textarea
                rows={5}
                placeholder="Add verification notes, observations or required corrections..."
                className="mt-2 w-full resize-none rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none placeholder:text-ink/30 focus:border-ink/25"
              />

              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3 text-xs font-semibold text-white hover:opacity-90"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Approve milestone
                </button>

                <button
                  type="button"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-xs font-semibold text-amber-700 hover:bg-amber-500/15"
                >
                  <MessageSquare className="h-4 w-4" />
                  Request evidence
                </button>

                <button
                  type="button"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-xs font-semibold text-rose-700 hover:bg-rose-500/15"
                >
                  <XCircle className="h-4 w-4" />
                  Reject
                </button>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Approval panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader
              title="Payment controls"
              subtitle="Escrow release requirements"
            />

            <CardBody>
              <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                <div className="flex gap-3">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />

                  <div>
                    <p className="text-xs font-semibold text-amber-800">
                      Payment is not yet releasable
                    </p>

                    <p className="mt-1 text-xs leading-5 text-amber-800/70">
                      Evidence must be independently verified and approved
                      through the required client workflow before escrow release.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <PaymentRequirement
                  title="Evidence submitted"
                  status="complete"
                />

                <PaymentRequirement
                  title="PM / professional verification"
                  status="pending"
                />

                <PaymentRequirement
                  title="Client approval"
                  status="pending"
                />

                <PaymentRequirement
                  title="No active dispute"
                  status="complete"
                />

                <PaymentRequirement
                  title="Escrow funds available"
                  status="complete"
                />
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader
              title="Milestone policy"
              subtitle="Build OS governance"
            />

            <CardBody>
              <div className="space-y-4">
                <PolicyItem
                  icon={ShieldCheck}
                  text="Contractor evidence alone cannot authorize payment."
                />

                <PolicyItem
                  icon={FileCheck2}
                  text="Evidence must support the claimed milestone completion."
                />

                <PolicyItem
                  icon={UserRound}
                  text="Independent verification is required where applicable."
                />

                <PolicyItem
                  icon={Wallet}
                  text="Approved milestone becomes eligible for escrow release."
                />
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}

function ReviewMetric({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-ink/35">
        <Icon className="h-3.5 w-3.5" />

        <span className="text-[10px] font-semibold uppercase tracking-wide">
          {label}
        </span>
      </div>

      <p className="mt-2 text-xs font-semibold text-ink">{value}</p>
    </div>
  )
}

function EvidenceCard({
  icon: Icon,
  title,
  count,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  count: string
  description: string
}) {
  return (
    <button
      type="button"
      className="flex items-center gap-3 rounded-xl border border-line bg-paper-2 p-4 text-left transition-colors hover:bg-white"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white">
        <Icon className="h-4 w-4 text-ink/55" />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-semibold text-ink">{title}</p>

        <p className="mt-0.5 text-[10px] font-medium text-ink/40">
          {count}
        </p>

        <p className="mt-1 text-[11px] leading-4 text-ink/40">
          {description}
        </p>
      </div>
    </button>
  )
}

function ReviewCheck({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="flex gap-3 rounded-xl border border-line bg-paper-2 p-4">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
      </div>

      <div>
        <p className="text-xs font-semibold text-ink">{title}</p>

        <p className="mt-1 text-[11px] leading-5 text-ink/40">
          {description}
        </p>
      </div>
    </div>
  )
}

function PaymentRequirement({
  title,
  status,
}: {
  title: string
  status: 'complete' | 'pending'
}) {
  return (
    <div className="flex items-center justify-between border-b border-line pb-3 last:border-0 last:pb-0">
      <div className="flex items-center gap-2.5">
        {status === 'complete' ? (
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
        ) : (
          <Clock3 className="h-4 w-4 text-amber-600" />
        )}

        <span className="text-xs text-ink/60">{title}</span>
      </div>

      <span
        className={
          status === 'complete'
            ? 'text-[10px] font-semibold text-emerald-700'
            : 'text-[10px] font-semibold text-amber-700'
        }
      >
        {status === 'complete' ? 'Complete' : 'Pending'}
      </span>
    </div>
  )
}

function PolicyItem({
  icon: Icon,
  text,
}: {
  icon: React.ComponentType<{ className?: string }>
  text: string
}) {
  return (
    <div className="flex gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ink/5">
        <Icon className="h-4 w-4 text-ink/50" />
      </div>

      <p className="text-xs leading-5 text-ink/50">{text}</p>
    </div>
  )
}