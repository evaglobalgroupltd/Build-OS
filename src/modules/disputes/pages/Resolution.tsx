
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  Gavel,
  Landmark,
  LockKeyhole,
  Scale,
  ShieldCheck,
  WalletCards,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

const resolution = {
  disputeId: 'DSP-0042',
  category: 'Payment Dispute',
  project: 'Maitama Duplex Construction',
  raisedBy: 'Client',
  respondent: 'Contractor',
  amount: 420_000,
  status: 'recommended',
  recommendation:
    'Release the undisputed milestone amount and retain the disputed balance pending completion of the corrective work.',
  outcome: 'Partial settlement recommended',
  financialAction: '₦420K affected',
  correctiveAction:
    'Contractor to complete outstanding corrective work and submit completion evidence for verification.',
  reviewedBy: 'Build OS Admin',
  expertReview: 'Not required',
  lastUpdated: '27 Aug 2026, 14:32',
}

const resolutionSteps = [
  {
    label: 'Dispute opened',
    description: 'Formal complaint registered.',
    complete: true,
  },
  {
    label: 'Evidence reviewed',
    description: 'Supporting records assessed.',
    complete: true,
  },
  {
    label: 'Payment frozen',
    description: 'Affected payment line placed on hold.',
    complete: true,
  },
  {
    label: 'Recommendation',
    description: 'Resolution recommendation prepared.',
    complete: true,
  },
  {
    label: 'Final resolution',
    description: 'Decision awaiting authorized closure.',
    complete: false,
  },
]

function formatAmount(amount: number) {
  if (amount >= 1_000_000) {
    return `₦${(amount / 1_000_000).toFixed(2)}M`
  }

  if (amount >= 1_000) {
    return `₦${(amount / 1_000).toFixed(0)}K`
  }

  return `₦${amount.toLocaleString()}`
}

export function Resolution() {
  return (
    <div className="space-y-7">
      {/* ------------------------------------------------------------------ */}
      {/* Executive header                                                    */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden rounded-[28px] bg-[#173629] px-6 py-7 text-white shadow-[0_24px_70px_rgba(23,54,41,0.16)] sm:px-8 sm:py-8">
        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full border border-white/[0.06]" />
        <div className="pointer-events-none absolute -right-5 -top-10 h-40 w-40 rounded-full border border-white/[0.05]" />
        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-52 w-52 rounded-full bg-[#B85C12]/10 blur-3xl" />

        <div className="relative">
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D58A52]" />
            Dispute resolution
          </div>

          <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-[15px] border border-white/10 bg-white/[0.07]">
                  <Scale className="h-5 w-5 text-[#D58A52]" />
                </div>

                <h1 className="font-display text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
                  Resolution
                </h1>
              </div>

              <p className="mt-4 text-sm leading-6 text-white/55">
                Review the proposed outcome, financial action and corrective
                measures before the dispute is formally closed.
              </p>
            </div>

            <div className="flex w-fit items-center gap-2 rounded-full border border-[#D58A52]/20 bg-[#D58A52]/10 px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#E0A878]">
              <LockKeyhole className="h-3.5 w-3.5" />
              Awaiting final decision
            </div>
          </div>

          <div className="mt-7 grid gap-3 border-t border-white/[0.08] pt-5 sm:grid-cols-3">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-white/30">
                Case
              </p>
              <p className="mt-1 font-mono text-xs font-medium text-white/70">
                {resolution.disputeId}
              </p>
            </div>

            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-white/30">
                Project
              </p>
              <p className="mt-1 truncate text-xs font-medium text-white/70">
                {resolution.project}
              </p>
            </div>

            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-white/30">
                Affected value
              </p>
              <p className="mt-1 font-mono text-xs font-semibold text-[#E0A878]">
                {formatAmount(resolution.amount)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Case snapshot                                                       */}
      {/* ------------------------------------------------------------------ */}
      <Card className="overflow-hidden rounded-[24px] border-ink/[0.07] bg-white shadow-[0_14px_45px_rgba(0,0,0,0.04)]">
        <CardHeader
          title="Case snapshot"
          subtitle="Core information attached to the proposed resolution"
        />

        <CardBody>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-[16px] border border-ink/[0.06] bg-paper-2/60 p-4">
              <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/30">
                Raised by
              </p>

              <p className="mt-2 text-sm font-semibold text-ink">
                {resolution.raisedBy}
              </p>
            </div>

            <div className="rounded-[16px] border border-ink/[0.06] bg-paper-2/60 p-4">
              <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/30">
                Respondent
              </p>

              <p className="mt-2 text-sm font-semibold text-ink">
                {resolution.respondent}
              </p>
            </div>

            <div className="rounded-[16px] border border-[#B85C12]/10 bg-[#F7EFE8]/60 p-4">
              <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/30">
                Affected amount
              </p>

              <p className="mt-2 font-mono text-sm font-semibold text-ink">
                {formatAmount(resolution.amount)}
              </p>
            </div>

            <div className="rounded-[16px] border border-ink/[0.06] bg-paper-2/60 p-4">
              <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/30">
                Last updated
              </p>

              <p className="mt-2 text-sm font-semibold text-ink">
                {resolution.lastUpdated}
              </p>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* Resolution workflow                                                 */}
      {/* ------------------------------------------------------------------ */}
      <Card className="rounded-[24px] border-ink/[0.07] bg-white p-6 shadow-[0_14px_45px_rgba(0,0,0,0.035)] sm:p-7">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-ink/35">
              Resolution workflow
            </p>

            <h2 className="mt-1.5 font-display text-xl font-semibold tracking-[-0.025em] text-ink">
              Case progress
            </h2>
          </div>

          <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-ink/30">
            4 of 5 stages complete
          </span>
        </div>

        <div className="mt-8">
          <div className="grid gap-7 md:grid-cols-5 md:gap-4">
            {resolutionSteps.map((step, index) => {
              const isCurrent = !step.complete
              const isLast = index === resolutionSteps.length - 1

              return (
                <div key={step.label} className="relative">
                  {!isLast && (
                    <div
                      className={`absolute left-8 right-[-16px] top-4 hidden h-px md:block ${
                        step.complete
                          ? 'bg-[#173629]/20'
                          : 'bg-ink/[0.07]'
                      }`}
                    />
                  )}

                  <div className="relative">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full border ${
                        step.complete
                          ? 'border-[#173629] bg-[#173629] text-white shadow-[0_5px_15px_rgba(23,54,41,0.12)]'
                          : 'border-[#B85C12]/30 bg-[#F7EFE8] text-[#B85C12]'
                      }`}
                    >
                      {step.complete ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <span className="h-2 w-2 rounded-full bg-[#B85C12]" />
                      )}
                    </div>

                    <p
                      className={`mt-3 text-xs font-semibold ${
                        isCurrent ? 'text-[#B85C12]' : 'text-ink'
                      }`}
                    >
                      {step.label}
                    </p>

                    <p className="mt-1 max-w-[150px] text-[11px] leading-4 text-ink/40">
                      {step.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* Recommendation + authority                                          */}
      {/* ------------------------------------------------------------------ */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="overflow-hidden rounded-[24px] border-ink/[0.07] bg-white shadow-[0_14px_45px_rgba(0,0,0,0.04)] lg:col-span-2">
          <CardHeader
            title="Resolution recommendation"
            subtitle="Proposed outcome based on the evidence and review"
          />

          <CardBody>
            <div className="relative overflow-hidden rounded-[20px] bg-[#173629] p-5 text-white sm:p-6">
              <div className="pointer-events-none absolute -right-12 -top-16 h-40 w-40 rounded-full border border-white/[0.05]" />
              <div className="pointer-events-none absolute -bottom-20 left-1/2 h-40 w-40 rounded-full bg-[#B85C12]/10 blur-3xl" />

              <div className="relative flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] border border-white/10 bg-white/[0.07]">
                  <ClipboardCheck className="h-[19px] w-[19px] text-[#D58A52]" />
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/35">
                      Recommended outcome
                    </p>

                    <span className="rounded-full bg-[#D58A52]/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#E0A878]">
                      Recommendation issued
                    </span>
                  </div>

                  <h3 className="mt-2 font-display text-xl font-semibold tracking-[-0.02em] text-white">
                    {resolution.outcome}
                  </h3>

                  <p className="mt-3 max-w-2xl text-sm leading-6 text-white/55">
                    {resolution.recommendation}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="group rounded-[18px] border border-ink/[0.07] bg-paper-2/60 p-5 transition-all duration-300 hover:border-ink/10 hover:bg-white hover:shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F7EFE8]">
                    <WalletCards className="h-4 w-4 text-[#B85C12]" />
                  </div>

                  <p className="text-xs font-semibold text-ink">
                    Financial action
                  </p>
                </div>

                <p className="mt-4 font-display text-xl font-semibold tracking-[-0.02em] text-ink">
                  {resolution.financialAction}
                </p>

                <p className="mt-1.5 text-[11px] leading-5 text-ink/40">
                  Payment treatment associated with this recommendation.
                </p>
              </div>

              <div className="group rounded-[18px] border border-ink/[0.07] bg-paper-2/60 p-5 transition-all duration-300 hover:border-ink/10 hover:bg-white hover:shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/[0.045]">
                    <FileCheck2 className="h-4 w-4 text-ink/55" />
                  </div>

                  <p className="text-xs font-semibold text-ink">
                    Corrective action
                  </p>
                </div>

                <p className="mt-4 text-sm leading-5 text-ink/60">
                  {resolution.correctiveAction}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Review authority */}
        <Card className="rounded-[24px] border-ink/[0.07] bg-white shadow-[0_14px_45px_rgba(0,0,0,0.04)]">
          <CardHeader
            title="Review authority"
            subtitle="Participants responsible for the resolution"
          />

          <CardBody className="space-y-3">
            <div className="rounded-[17px] border border-ink/[0.06] bg-paper-2/60 p-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink/[0.045]">
                  <ShieldCheck className="h-4 w-4 text-ink/50" />
                </div>

                <p className="text-xs font-semibold text-ink">
                  Administrative review
                </p>
              </div>

              <p className="mt-3 text-sm font-semibold text-ink">
                {resolution.reviewedBy}
              </p>
            </div>

            <div className="rounded-[17px] border border-ink/[0.06] bg-paper-2/60 p-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink/[0.045]">
                  <Landmark className="h-4 w-4 text-ink/50" />
                </div>

                <p className="text-xs font-semibold text-ink">
                  Expert review
                </p>
              </div>

              <p className="mt-3 text-sm font-semibold text-ink">
                {resolution.expertReview}
              </p>
            </div>

            <div className="rounded-[17px] border border-[#B85C12]/10 bg-[#F7EFE8]/55 p-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#B85C12]/10">
                  <LockKeyhole className="h-4 w-4 text-[#B85C12]" />
                </div>

                <p className="text-xs font-semibold text-ink">
                  Payment protection
                </p>
              </div>

              <p className="mt-3 text-xs leading-5 text-ink/55">
                Affected funds remain protected until the authorized
                resolution action is completed.
              </p>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Final decision                                                      */}
      {/* ------------------------------------------------------------------ */}
      <Card className="overflow-hidden rounded-[24px] border-ink/[0.07] bg-white shadow-[0_14px_45px_rgba(0,0,0,0.04)]">
        <CardHeader
          title="Final decision"
          subtitle="Authorized users can approve the recommendation or return the case for further review"
        />

        <CardBody>
          <div className="relative overflow-hidden rounded-[20px] bg-paper-2 p-5 sm:p-6">
            <div className="pointer-events-none absolute -right-12 -top-16 h-36 w-36 rounded-full bg-[#B85C12]/[0.035] blur-2xl" />

            <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] bg-white shadow-sm ring-1 ring-ink/[0.05]">
                  <Gavel className="h-[18px] w-[18px] text-ink/55" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-ink">
                    Ready for authorized decision
                  </p>

                  <p className="mt-1 max-w-2xl text-xs leading-5 text-ink/45">
                    Final resolution should only be applied after all required
                    evidence has been reviewed and the affected payment line
                    has been confirmed.
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 flex-wrap gap-2">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-xl border border-ink/[0.08] bg-white px-4 py-2.5 text-xs font-semibold text-ink/60 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/15 hover:bg-ink/[0.025] hover:text-ink"
                >
                  Request further review
                </button>

                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#173629] px-4 py-2.5 text-xs font-semibold text-white shadow-[0_8px_20px_rgba(23,54,41,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#204736] hover:shadow-[0_12px_25px_rgba(23,54,41,0.18)]"
                >
                  Approve resolution
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* Audit protection                                                    */}
      {/* ------------------------------------------------------------------ */}
      <div className="relative overflow-hidden rounded-[20px] bg-[#173629] p-5 text-white shadow-[0_14px_40px_rgba(23,54,41,0.09)] sm:p-6">
        <div className="pointer-events-none absolute -right-12 -top-16 h-36 w-36 rounded-full border border-white/[0.05]" />

        <div className="relative flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] border border-white/10 bg-white/[0.07]">
            <ShieldCheck className="h-[18px] w-[18px] text-[#D58A52]" />
          </div>

          <div>
            <p className="text-xs font-semibold text-white">
              Resolution audit trail
            </p>

            <p className="mt-1.5 max-w-3xl text-xs leading-5 text-white/50">
              Every recommendation, approval, payment action, correction and
              closure event should remain permanently associated with the
              dispute record for audit and compliance purposes.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/[0.08] bg-white/[0.05] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-white/40">
                Decision traceable
              </span>

              <span className="rounded-full border border-white/[0.08] bg-white/[0.05] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-white/40">
                Payment protected
              </span>

              <span className="rounded-full border border-white/[0.08] bg-white/[0.05] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-white/40">
                Audit retained
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}