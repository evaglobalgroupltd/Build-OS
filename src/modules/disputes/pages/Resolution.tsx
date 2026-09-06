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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5">
              <Scale className="h-5 w-5 text-ink/65" />
            </div>

            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/40">
              Dispute Resolution
            </span>
          </div>

          <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Resolution
          </h1>

          <p className="mt-1 max-w-2xl text-sm leading-6 text-ink/50">
            Review the proposed outcome, financial action and corrective
            measures before the dispute is formally closed.
          </p>
        </div>

        <Badge tone="amber">
          <span className="inline-flex items-center gap-1.5">
            <LockKeyhole className="h-3.5 w-3.5" />
            Awaiting final decision
          </span>
        </Badge>
      </div>

      {/* Case summary */}
      <Card className="overflow-hidden">
        <div className="border-b border-line px-6 py-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink/5">
                <Gavel className="h-5 w-5 text-ink/60" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-display text-lg font-semibold text-ink">
                    {resolution.category}
                  </h2>

                  <Badge tone="amber">Recommendation issued</Badge>
                </div>

                <p className="mt-1 text-xs text-ink/45">
                  {resolution.project}
                </p>
              </div>
            </div>

            <span className="rounded-full border border-line bg-paper-2 px-3 py-1.5 font-mono text-[10px] font-medium text-ink/45">
              {resolution.disputeId}
            </span>
          </div>
        </div>

        <CardBody>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/35">
                Raised by
              </p>
              <p className="mt-1.5 text-sm font-semibold text-ink">
                {resolution.raisedBy}
              </p>
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/35">
                Respondent
              </p>
              <p className="mt-1.5 text-sm font-semibold text-ink">
                {resolution.respondent}
              </p>
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/35">
                Affected amount
              </p>
              <p className="mt-1.5 font-mono text-sm font-semibold text-ink">
                {formatAmount(resolution.amount)}
              </p>
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/35">
                Last updated
              </p>
              <p className="mt-1.5 text-sm font-semibold text-ink">
                {resolution.lastUpdated}
              </p>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Resolution workflow */}
      <Card className="p-6">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/40">
            Resolution workflow
          </p>

          <h2 className="mt-1 font-display text-lg font-semibold text-ink">
            Case progress
          </h2>
        </div>

        <div className="mt-7">
          <div className="grid gap-5 md:grid-cols-5">
            {resolutionSteps.map((step, index) => (
              <div key={step.label} className="relative">
                {index < resolutionSteps.length - 1 && (
                  <div
                    className={`absolute left-8 right-[-20px] top-4 hidden h-px md:block ${
                      step.complete ? 'bg-ink/20' : 'bg-line'
                    }`}
                  />
                )}

                <div className="relative">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full border ${
                      step.complete
                        ? 'border-ink bg-ink text-white'
                        : 'border-line bg-paper-2 text-ink/30'
                    }`}
                  >
                    {step.complete ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <span className="h-2 w-2 rounded-full bg-ink/20" />
                    )}
                  </div>

                  <p className="mt-3 text-xs font-semibold text-ink">
                    {step.label}
                  </p>

                  <p className="mt-1 text-[11px] leading-4 text-ink/40">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Recommendation + financial action */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Resolution recommendation"
            subtitle="Proposed outcome based on the evidence and review"
          />

          <CardBody>
            <div className="rounded-2xl border border-amber-500/15 bg-amber-500/[0.04] p-5">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10">
                  <ClipboardCheck className="h-5 w-5 text-amber-700" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-ink">
                    {resolution.outcome}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-ink/55">
                    {resolution.recommendation}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-line p-4">
                <div className="flex items-center gap-2">
                  <WalletCards className="h-4 w-4 text-ink/50" />
                  <p className="text-xs font-semibold text-ink">
                    Financial action
                  </p>
                </div>

                <p className="mt-2 text-sm font-medium text-ink/65">
                  {resolution.financialAction}
                </p>
              </div>

              <div className="rounded-xl border border-line p-4">
                <div className="flex items-center gap-2">
                  <FileCheck2 className="h-4 w-4 text-ink/50" />
                  <p className="text-xs font-semibold text-ink">
                    Corrective action
                  </p>
                </div>

                <p className="mt-2 text-sm leading-5 text-ink/55">
                  {resolution.correctiveAction}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Review authority */}
        <Card>
          <CardHeader
            title="Review authority"
            subtitle="Participants responsible for the resolution"
          />

          <CardBody className="space-y-4">
            <div className="rounded-xl bg-paper-2 p-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-ink/50" />
                <p className="text-xs font-semibold text-ink">
                  Administrative review
                </p>
              </div>

              <p className="mt-2 text-sm font-medium text-ink">
                {resolution.reviewedBy}
              </p>
            </div>

            <div className="rounded-xl bg-paper-2 p-4">
              <div className="flex items-center gap-2">
                <Landmark className="h-4 w-4 text-ink/50" />
                <p className="text-xs font-semibold text-ink">
                  Expert review
                </p>
              </div>

              <p className="mt-2 text-sm font-medium text-ink">
                {resolution.expertReview}
              </p>
            </div>

            <div className="rounded-xl bg-paper-2 p-4">
              <div className="flex items-center gap-2">
                <LockKeyhole className="h-4 w-4 text-ink/50" />
                <p className="text-xs font-semibold text-ink">
                  Payment protection
                </p>
              </div>

              <p className="mt-2 text-sm leading-5 text-ink/55">
                Affected funds remain protected until the authorized
                resolution action is completed.
              </p>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Decision area */}
      <Card>
        <CardHeader
          title="Final decision"
          subtitle="Authorized users can approve the recommendation or return the case for further review"
        />

        <CardBody>
          <div className="flex flex-col gap-4 rounded-2xl border border-line bg-paper-2 p-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-ink">
                Ready for authorized decision
              </p>

              <p className="mt-1 max-w-2xl text-xs leading-5 text-ink/45">
                Final resolution should only be applied after all required
                evidence has been reviewed and the affected payment line has
                been confirmed.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-xs font-semibold text-ink/65 transition-colors hover:bg-ink/5 hover:text-ink"
              >
                Request further review
              </button>

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-ink/90"
              >
                Approve resolution
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Audit note */}
      <div className="flex gap-3 rounded-2xl border border-line bg-paper-2 p-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink/5">
          <ShieldCheck className="h-4 w-4 text-ink/55" />
        </div>

        <div>
          <p className="text-xs font-semibold text-ink">
            Resolution audit trail
          </p>

          <p className="mt-1 text-xs leading-5 text-ink/45">
            Every recommendation, approval, payment action, correction and
            closure event should remain permanently associated with the
            dispute record for audit and compliance purposes.
          </p>
        </div>
      </div>
    </div>
  )
}