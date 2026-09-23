import type { ComponentType } from 'react'

import {
  AlertCircle,
  ArrowLeft,
  BadgeCheck,
  Check,
  CheckCircle2,
  ChevronRight,
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
      {/* ------------------------------------------------------------------ */}
      {/* HERO                                                               */}
      {/* ------------------------------------------------------------------ */}

      <section className="relative overflow-hidden rounded-[28px] bg-[#0B1220] text-white shadow-[0_24px_70px_rgba(11,18,32,0.16)]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-28 -top-32 h-96 w-96 rounded-full bg-[#1657FF]/20 blur-3xl" />
          <div className="absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-[#34A6FF]/10 blur-3xl" />

          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
              backgroundSize: '42px 42px',
            }}
          />
        </div>

        <div className="relative px-6 pb-8 pt-6 sm:px-8 lg:px-10 lg:pb-9">
          {/* Back navigation */}
          <button
            type="button"
            className="mb-7 inline-flex items-center gap-2 rounded-lg px-1 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/35 transition-colors hover:text-white/70"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to milestones
          </button>

          <div className="flex flex-col gap-7 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/50">
                  <ShieldCheck className="h-3 w-3" />
                  Verification workflow
                </span>

                <span className="font-mono text-[9px] text-white/25">
                  MS-004
                </span>
              </div>

              <div className="mt-5">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="font-display text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                    Foundation
                  </h1>

                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/10 px-3 py-1.5 text-[9px] font-semibold text-amber-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    Pending review
                  </span>
                </div>

                <p className="mt-3 text-sm text-white/45">
                  Gwarinpa Residence · Foundation phase
                </p>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/35">
                <span className="inline-flex items-center gap-2">
                  <UserRound className="h-3.5 w-3.5 text-white/25" />
                  BuildRight Construction Ltd.
                </span>

                <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:block" />

                <span className="inline-flex items-center gap-2">
                  <ShieldCheck className="h-3.5 w-3.5 text-white/25" />
                  Ibrahim Musa
                </span>
              </div>
            </div>

            {/* Payment amount */}
            <div className="min-w-[230px] rounded-2xl border border-white/[0.08] bg-white/[0.05] p-5 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-white/30">
                  Payment under review
                </p>

                <Wallet className="h-4 w-4 text-white/25" />
              </div>

              <p className="mt-2 font-display text-3xl font-semibold tracking-tight text-white">
                ₦2.85m
              </p>

              <div className="mt-4 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />

                <span className="text-[10px] font-medium text-white/40">
                  Escrow release controlled
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Summary metrics */}
        <div className="relative grid border-t border-white/[0.08] sm:grid-cols-2 xl:grid-cols-4">
          <HeroMetric
            label="Reported progress"
            value="100%"
            description="Contractor submission"
          />

          <HeroMetric
            label="Evidence"
            value="10 files"
            description="Submitted for review"
          />

          <HeroMetric
            label="Verification"
            value="Pending"
            description="Independent review required"
          />

          <HeroMetric
            label="Payment"
            value="₦2.85m"
            description="Currently controlled"
          />
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* REVIEW STATUS                                                       */}
      {/* ------------------------------------------------------------------ */}

      <div className="rounded-2xl border border-amber-200/70 bg-amber-50/70 px-5 py-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/10">
            <AlertCircle className="h-4 w-4 text-amber-700" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-amber-900">
              Payment is currently controlled
            </p>

            <p className="mt-1 text-xs leading-5 text-amber-900/55">
              The milestone can be reviewed now, but escrow release remains
              gated until the required verification and client approval
              conditions are complete.
            </p>
          </div>

          <span className="shrink-0 rounded-full bg-amber-500/10 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-amber-700">
            Action required
          </span>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* MAIN REVIEW AREA                                                    */}
      {/* ------------------------------------------------------------------ */}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-6">
          {/* Review summary */}
          <Card>
            <CardHeader
              title="Milestone summary"
              subtitle="Core project and completion information"
            />

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

          {/* Evidence */}
          <Card className="overflow-hidden">
            <CardHeader
              title="Evidence submitted"
              subtitle="Review the records supporting the milestone completion claim"
              action={
                <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-ink/30">
                  10 files
                </span>
              }
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

              <div className="mt-5 flex items-center justify-between rounded-xl border border-line bg-paper-2 px-4 py-3.5">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
                    <Check className="h-4 w-4 text-emerald-600" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-ink">
                      Evidence package received
                    </p>

                    <p className="mt-0.5 text-[10px] text-ink/40">
                      Submitted by contractor for milestone verification.
                    </p>
                  </div>
                </div>

                <span className="hidden text-[9px] font-semibold uppercase tracking-[0.1em] text-emerald-700 sm:block">
                  Ready for review
                </span>
              </div>
            </CardBody>
          </Card>

          {/* Verification checklist */}
          <Card>
            <CardHeader
              title="Verification checklist"
              subtitle="Confirm that the milestone satisfies the approved project scope"
              action={
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[9px] font-semibold text-emerald-700">
                  5 checks
                </span>
              }
            />

            <CardBody>
              <div className="space-y-2">
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
                  description="Material usage is consistent with approved procurement and project records."
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

          {/* Decision */}
          <Card className="overflow-hidden">
            <div className="border-b border-line bg-paper-2 px-6 py-5 sm:px-7">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#1657FF]/10">
                  <MessageSquare className="h-4 w-4 text-[#1657FF]" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-ink">
                    Review decision
                  </p>

                  <p className="mt-1 text-xs text-ink/40">
                    Record the reasoning behind your milestone decision.
                  </p>
                </div>
              </div>
            </div>

            <CardBody>
              <label className="text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/30">
                Review comment
              </label>

              <textarea
                rows={5}
                placeholder="Add verification notes, observations or required corrections..."
                className="mt-2.5 w-full resize-none rounded-xl border border-line bg-white px-4 py-3.5 text-sm leading-6 text-ink outline-none transition-all placeholder:text-ink/25 focus:border-[#1657FF]/30 focus:ring-4 focus:ring-[#1657FF]/[0.05]"
              />

              <div className="mt-5 grid gap-2.5 sm:grid-cols-3">
                <button
                  type="button"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#0B1220] px-4 text-xs font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#111B2E]"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Approve milestone
                </button>

                <button
                  type="button"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 text-xs font-semibold text-amber-700 transition-colors hover:bg-amber-500/15"
                >
                  <MessageSquare className="h-4 w-4" />
                  Request evidence
                </button>

                <button
                  type="button"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 text-xs font-semibold text-rose-700 transition-colors hover:bg-rose-500/15"
                >
                  <XCircle className="h-4 w-4" />
                  Reject
                </button>
              </div>

              <p className="mt-4 text-center text-[9px] leading-4 text-ink/30">
                Your decision and comment will be recorded in the project
                audit trail.
              </p>
            </CardBody>
          </Card>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* RIGHT RAIL                                                        */}
        {/* ---------------------------------------------------------------- */}

        <aside className="space-y-6">
          {/* Payment control */}
          <div className="overflow-hidden rounded-2xl bg-[#0B1220] text-white shadow-[0_18px_45px_rgba(11,18,32,0.12)]">
            <div className="relative overflow-hidden px-5 py-5">
              <div className="pointer-events-none absolute -right-16 -top-20 h-44 w-44 rounded-full bg-[#1657FF]/20 blur-3xl" />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.17em] text-white/30">
                      Payment control
                    </p>

                    <p className="mt-1 text-[10px] text-white/30">
                      Escrow release requirements
                    </p>
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05]">
                    <Wallet className="h-4 w-4 text-white/50" />
                  </div>
                </div>

                <p className="mt-6 font-display text-3xl font-semibold tracking-tight">
                  ₦2,850,000
                </p>

                <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-amber-400/10 px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />

                  <span className="text-[9px] font-semibold uppercase tracking-[0.1em] text-amber-300">
                    Not releasable
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-white/[0.08] px-5 py-4">
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
          </div>

          {/* Approval chain */}
          <Card>
            <CardHeader
              title="Approval chain"
              subtitle="Required parties before release"
            />

            <CardBody>
              <div className="space-y-0">
                <ApprovalStep
                  role="Contractor"
                  name="BuildRight Construction Ltd."
                  status="complete"
                />

                <ApprovalStep
                  role="Project Manager"
                  name="Ibrahim Musa"
                  status="complete"
                />

                <ApprovalStep
                  role="Professional"
                  name="Independent verification"
                  status="pending"
                />

                <ApprovalStep
                  role="Client"
                  name="Client approval"
                  status="pending"
                  last
                />
              </div>
            </CardBody>
          </Card>

          {/* Governance */}
          <Card>
            <CardHeader
              title="Milestone policy"
              subtitle="Build OS governance"
            />

            <CardBody>
              <div className="space-y-1">
                <PolicyItem
                  icon={ShieldCheck}
                  text="Contractor evidence alone cannot authorize payment."
                />

                <PolicyItem
                  icon={FileCheck2}
                  text="Evidence must support the claimed milestone completion."
                />

                <PolicyItem
                  icon={BadgeCheck}
                  text="Independent verification is required where applicable."
                />

                <PolicyItem
                  icon={Wallet}
                  text="Approved milestones become eligible for escrow release."
                />
              </div>
            </CardBody>
          </Card>
        </aside>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* FOOTER CONTROL BAR                                                  */}
      {/* ------------------------------------------------------------------ */}

      <div className="rounded-2xl border border-line bg-white p-4 shadow-[0_10px_35px_rgba(11,18,32,0.04)] sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1657FF]/10">
              <ShieldCheck className="h-4 w-4 text-[#1657FF]" />
            </div>

            <div>
              <p className="text-xs font-semibold text-ink">
                Decision will be audited
              </p>

              <p className="mt-0.5 text-[10px] text-ink/35">
                All review actions, comments and approval changes are retained
                in the project audit trail.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-ink/30">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Audit trail enabled
          </div>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Hero metric                                                               */
/* -------------------------------------------------------------------------- */

function HeroMetric({
  label,
  value,
  description,
}: {
  label: string
  value: string
  description: string
}) {
  return (
    <div className="border-white/[0.08] px-6 py-5 sm:px-7 xl:border-l">
      <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/30">
        {label}
      </p>

      <p className="mt-1.5 font-display text-xl font-semibold tracking-tight text-white">
        {value}
      </p>

      <p className="mt-1 text-[10px] text-white/30">
        {description}
      </p>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Review metric                                                             */
/* -------------------------------------------------------------------------- */

function ReviewMetric({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="min-w-0">
      <div className="flex items-center gap-2 text-ink/30">
        <Icon className="h-3.5 w-3.5" />

        <span className="text-[9px] font-semibold uppercase tracking-[0.12em]">
          {label}
        </span>
      </div>

      <p className="mt-2 truncate text-xs font-semibold text-ink/70">
        {value}
      </p>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Evidence card                                                             */
/* -------------------------------------------------------------------------- */

function EvidenceCard({
  icon: Icon,
  title,
  count,
  description,
}: {
  icon: ComponentType<{ className?: string }>
  title: string
  count: string
  description: string
}) {
  return (
    <button
      type="button"
      className="group flex items-start gap-3 rounded-2xl border border-line bg-paper-2 p-4 text-left transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_10px_30px_rgba(11,18,32,0.06)]"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
        <Icon className="h-4 w-4 text-ink/50 transition-colors group-hover:text-[#1657FF]" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-semibold text-ink">
            {title}
          </p>

          <ChevronRight className="h-3.5 w-3.5 shrink-0 text-ink/20 transition-transform group-hover:translate-x-0.5 group-hover:text-ink/45" />
        </div>

        <p className="mt-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-ink/30">
          {count}
        </p>

        <p className="mt-1.5 text-[10px] leading-4.5 text-ink/40">
          {description}
        </p>
      </div>
    </button>
  )
}

/* -------------------------------------------------------------------------- */
/* Checklist                                                                 */
/* -------------------------------------------------------------------------- */

function ReviewCheck({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="group flex gap-3 rounded-xl border border-line bg-white p-3.5 transition-colors hover:bg-paper-2">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-semibold text-ink">
            {title}
          </p>

          <span className="hidden items-center gap-1 text-[8px] font-semibold uppercase tracking-[0.1em] text-emerald-700 sm:inline-flex">
            <Check className="h-3 w-3" />
            Passed
          </span>
        </div>

        <p className="mt-1 text-[10px] leading-5 text-ink/40">
          {description}
        </p>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Payment requirement                                                       */
/* -------------------------------------------------------------------------- */

function PaymentRequirement({
  title,
  status,
}: {
  title: string
  status: 'complete' | 'pending'
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-white/[0.07] py-3 last:border-0 last:pb-0">
      <div className="flex min-w-0 items-center gap-2.5">
        {status === 'complete' ? (
          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
        ) : (
          <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border border-amber-400/40">
            <span className="h-1 w-1 rounded-full bg-amber-400" />
          </span>
        )}

        <span className="truncate text-[10px] text-white/50">
          {title}
        </span>
      </div>

      <span
        className={
          status === 'complete'
            ? 'shrink-0 text-[8px] font-semibold uppercase tracking-[0.1em] text-emerald-400'
            : 'shrink-0 text-[8px] font-semibold uppercase tracking-[0.1em] text-amber-400'
        }
      >
        {status === 'complete' ? 'Complete' : 'Pending'}
      </span>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Approval timeline                                                         */
/* -------------------------------------------------------------------------- */

function ApprovalStep({
  role,
  name,
  status,
  last = false,
}: {
  role: string
  name: string
  status: 'complete' | 'pending'
  last?: boolean
}) {
  return (
    <div className="relative flex gap-3 pb-5 last:pb-0">
      {!last && (
        <div className="absolute bottom-0 left-[14px] top-7 w-px bg-line" />
      )}

      <div
        className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
          status === 'complete'
            ? 'bg-emerald-500/10 text-emerald-600'
            : 'bg-amber-500/10 text-amber-600'
        }`}
      >
        {status === 'complete' ? (
          <Check className="h-3.5 w-3.5" />
        ) : (
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
        )}
      </div>

      <div className="min-w-0 pt-0.5">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-xs font-semibold text-ink">
            {role}
          </p>

          <span
            className={`rounded-full px-2 py-0.5 text-[8px] font-semibold ${
              status === 'complete'
                ? 'bg-emerald-500/10 text-emerald-700'
                : 'bg-amber-500/10 text-amber-700'
            }`}
          >
            {status === 'complete' ? 'Verified' : 'Pending'}
          </span>
        </div>

        <p className="mt-1 text-[10px] leading-4 text-ink/40">
          {name}
        </p>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Policy item                                                               */
/* -------------------------------------------------------------------------- */

function PolicyItem({
  icon: Icon,
  text,
}: {
  icon: ComponentType<{ className?: string }>
  text: string
}) {
  return (
    <div className="flex gap-3 rounded-xl p-2.5 transition-colors hover:bg-paper-2">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ink/[0.04]">
        <Icon className="h-3.5 w-3.5 text-ink/45" />
      </div>

      <p className="pt-0.5 text-[10px] leading-5 text-ink/45">
        {text}
      </p>
    </div>
  )
}