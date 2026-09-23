
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  DollarSign,
  FileCheck2,
  FileText,
  ShieldCheck,
  Star,
  Trophy,
  UserRound,
} from 'lucide-react'

import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import type { Bid } from '@/modules/bidding/types'
import { bids } from '@/data/mockData'

const bidStatusTone = {
  submitted: 'neutral',
  shortlisted: 'amber',
  clarification: 'amber',
  awarded: 'teal',
  rejected: 'brick',
} as const

function formatAmount(amount: number, currency: string) {
  const symbol = currency === 'NGN' ? '₦' : '$'

  if (amount >= 1_000_000) {
    return `${symbol}${(amount / 1_000_000).toFixed(1)}M`
  }

  if (amount >= 1_000) {
    return `${symbol}${(amount / 1_000).toFixed(0)}K`
  }

  return `${symbol}${amount.toLocaleString()}`
}

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

function getSelectedBid(): Bid | undefined {
  return bids[0]
}

export function BidDetails() {
  const bid = getSelectedBid()

  if (!bid) {
    return (
      <Card className="rounded-[22px] border-dashed border-ink/[0.10]">
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F6F8F5]">
            <FileCheck2 className="h-5 w-5 text-ink/30" />
          </div>

          <h2 className="mt-4 font-display text-[18px] font-semibold tracking-[-0.02em] text-ink">
            Bid not found
          </h2>

          <p className="mt-1 max-w-md text-[11px] leading-5 text-ink/40">
            The submitted bid could not be found or may have been removed.
          </p>
        </div>
      </Card>
    )
  }

  const risks = bid.riskFlags ?? []
  const hasRisks = risks.length > 0

  return (
    <div className="space-y-7">
      {/* ------------------------------------------------------------------ */}
      {/* Header / contractor dossier                                        */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden rounded-[24px] bg-[#173629] px-6 py-7 text-white sm:px-8 sm:py-8">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/[0.035]" />
        <div className="absolute -bottom-28 right-20 h-56 w-56 rounded-full bg-[#B85C12]/10" />
        <div className="absolute left-[48%] top-1/2 h-36 w-36 -translate-y-1/2 rounded-full bg-white/[0.018]" />

        <div className="relative">
          <button
            type="button"
            className="
              inline-flex
              items-center
              gap-1.5
              text-[10px]
              font-semibold
              text-white/45
              transition-colors
              hover:text-white
            "
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to bid comparison
          </button>

          <div className="mt-7 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex min-w-0 items-start gap-4 sm:gap-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/[0.10] ring-1 ring-white/10 sm:h-16 sm:w-16">
                <span className="font-display text-[17px] font-semibold tracking-[-0.02em] text-white">
                  {getInitials(bid.contractorName)}
                </span>
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/35">
                    Contractor dossier
                  </span>

                  <span className="h-1 w-1 rounded-full bg-white/20" />

                  <span className="font-mono text-[9px] tracking-wide text-white/30">
                    {bid.id}
                  </span>
                </div>

                <h1 className="mt-2 font-display text-[27px] font-semibold leading-tight tracking-[-0.035em] sm:text-[33px]">
                  {bid.contractorName}
                </h1>

                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] text-white/45">
                  {bid.rating !== undefined && (
                    <span className="inline-flex items-center gap-1.5">
                      <Star className="h-3.5 w-3.5 fill-current text-[#D88A46]" />
                      <strong className="font-semibold text-white/75">
                        {bid.rating}
                      </strong>
                      client rating
                    </span>
                  )}

                  {bid.completedProjects !== undefined && (
                    <span>
                      <strong className="font-semibold text-white/75">
                        {bid.completedProjects}
                      </strong>{' '}
                      completed projects
                    </span>
                  )}

                  {bid.verified && (
                    <span className="inline-flex items-center gap-1.5 text-[#A8D9BD]">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      Verified contractor
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-2">
              {bid.verified && (
                <Badge tone="teal">
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="h-3 w-3" />
                    Verified
                  </span>
                </Badge>
              )}

              <Badge tone={bidStatusTone[bid.status]}>
                {bid.status}
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Executive snapshot                                                  */}
      {/* ------------------------------------------------------------------ */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-[20px] border-ink/[0.07] p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-ink/30">
                Bid amount
              </p>

              <p className="mt-2 font-display text-[25px] font-semibold tracking-[-0.03em] text-ink">
                {formatAmount(bid.amount, bid.currency)}
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F8EEE6]">
              <DollarSign className="h-4 w-4 text-[#B85C12]" />
            </div>
          </div>

          <p className="mt-2 text-[10px] text-ink/35">
            Submitted commercial offer
          </p>
        </Card>

        <Card className="rounded-[20px] border-ink/[0.07] p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-ink/30">
                Delivery
              </p>

              <p className="mt-2 font-display text-[25px] font-semibold tracking-[-0.03em] text-ink">
                {bid.timelineWeeks}
                <span className="ml-1 text-[11px] font-medium text-ink/35">
                  weeks
                </span>
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F6F8F5]">
              <Clock3 className="h-4 w-4 text-ink/50" />
            </div>
          </div>

          <p className="mt-2 text-[10px] text-ink/35">
            Proposed completion period
          </p>
        </Card>

        <Card className="rounded-[20px] border-ink/[0.07] p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-ink/30">
                Trust score
              </p>

              <p className="mt-2 font-display text-[25px] font-semibold tracking-[-0.03em] text-ink">
                {bid.trustScore !== undefined ? bid.trustScore : '—'}
                {bid.trustScore !== undefined && (
                  <span className="ml-1 text-[11px] font-medium text-ink/35">
                    / 100
                  </span>
                )}
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF4EE]">
              <ShieldCheck className="h-4 w-4 text-[#12613E]" />
            </div>
          </div>

          <p className="mt-2 text-[10px] text-ink/35">
            Platform performance signal
          </p>
        </Card>

        <Card className="rounded-[20px] border-ink/[0.07] p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-ink/30">
                Risk flags
              </p>

              <p className="mt-2 font-display text-[25px] font-semibold tracking-[-0.03em] text-ink">
                {risks.length}
              </p>
            </div>

            <div
              className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                hasRisks ? 'bg-[#F8EEE6]' : 'bg-[#EAF4EE]'
              }`}
            >
              {hasRisks ? (
                <AlertTriangle className="h-4 w-4 text-[#B85C12]" />
              ) : (
                <CheckCircle2 className="h-4 w-4 text-[#12613E]" />
              )}
            </div>
          </div>

          <p className="mt-2 text-[10px] text-ink/35">
            {hasRisks ? 'Items requiring review' : 'No flagged concerns'}
          </p>
        </Card>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Commercial + delivery                                               */}
      {/* ------------------------------------------------------------------ */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="overflow-hidden rounded-[22px] border-ink/[0.07]">
          <div className="border-b border-ink/[0.06] px-5 py-5 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F8EEE6]">
                <DollarSign className="h-4 w-4 text-[#B85C12]" />
              </div>

              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-ink/30">
                  Commercial proposal
                </p>

                <h2 className="mt-1 font-display text-[19px] font-semibold tracking-[-0.025em] text-ink">
                  Submitted terms
                </h2>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <div className="rounded-[18px] bg-[#173629] p-5 text-white">
              <p className="text-[8px] font-bold uppercase tracking-[0.13em] text-white/35">
                Total bid value
              </p>

              <p className="mt-2 font-display text-[31px] font-semibold tracking-[-0.035em]">
                {formatAmount(bid.amount, bid.currency)}
              </p>

              <div className="mt-3 flex items-center gap-2 text-[9px] text-white/40">
                <FileText className="h-3 w-3" />
                Submitted commercial offer
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2.5">
              <div className="rounded-[16px] bg-[#F6F8F5] p-4">
                <p className="text-[8px] font-bold uppercase tracking-[0.11em] text-ink/30">
                  Currency
                </p>

                <p className="mt-2 text-[12px] font-semibold text-ink">
                  {bid.currency}
                </p>
              </div>

              <div className="rounded-[16px] bg-[#F6F8F5] p-4">
                <p className="text-[8px] font-bold uppercase tracking-[0.11em] text-ink/30">
                  Bid status
                </p>

                <p className="mt-2 text-[12px] font-semibold capitalize text-ink">
                  {bid.status}
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="overflow-hidden rounded-[22px] border-ink/[0.07]">
          <div className="border-b border-ink/[0.06] px-5 py-5 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F6F8F5]">
                <Clock3 className="h-4 w-4 text-ink/55" />
              </div>

              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-ink/30">
                  Delivery proposal
                </p>

                <h2 className="mt-1 font-display text-[19px] font-semibold tracking-[-0.025em] text-ink">
                  Proposed execution
                </h2>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <div className="rounded-[18px] bg-[#F6F8F5] p-5">
              <p className="text-[8px] font-bold uppercase tracking-[0.12em] text-ink/30">
                Proposed completion period
              </p>

              <p className="mt-2 font-display text-[31px] font-semibold tracking-[-0.035em] text-ink">
                {bid.timelineWeeks}
                <span className="ml-1 text-[13px] font-medium text-ink/35">
                  weeks
                </span>
              </p>

              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-ink/[0.06]">
                <div className="h-full w-[72%] rounded-full bg-[#173629]" />
              </div>
            </div>

            <div className="mt-3 rounded-[16px] border border-ink/[0.06] p-4">
              <p className="text-[10px] font-semibold text-ink">
                Delivery assessment
              </p>

              <p className="mt-1 text-[10px] leading-5 text-ink/40">
                Timeline should be assessed against the project schedule,
                milestone requirements, contractor capacity and other
                submitted bids before award.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Trust & verification                                                */}
      {/* ------------------------------------------------------------------ */}
      <Card className="overflow-hidden rounded-[22px] border-ink/[0.07]">
        <div className="border-b border-ink/[0.06] px-5 py-5 sm:px-6">
          <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-ink/30">
            Contractor intelligence
          </p>

          <h2 className="mt-1 font-display text-[19px] font-semibold tracking-[-0.025em] text-ink">
            Trust & verification
          </h2>

          <p className="mt-1 text-[10px] leading-5 text-ink/40">
            Credibility indicators available during the bid evaluation process.
          </p>
        </div>

        <div className="grid gap-px bg-ink/[0.06] sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white p-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF4EE]">
              <ShieldCheck className="h-4 w-4 text-[#12613E]" />
            </div>

            <p className="mt-4 text-[8px] font-bold uppercase tracking-[0.11em] text-ink/30">
              Verification
            </p>

            <p className="mt-1.5 text-[12px] font-semibold text-ink">
              {bid.verified ? 'Verified' : 'Pending verification'}
            </p>

            <p className="mt-1 text-[9px] text-ink/35">
              Contractor credentials
            </p>
          </div>

          <div className="bg-white p-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F6F8F5]">
              <Trophy className="h-4 w-4 text-ink/50" />
            </div>

            <p className="mt-4 text-[8px] font-bold uppercase tracking-[0.11em] text-ink/30">
              Trust score
            </p>

            <p className="mt-1.5 text-[12px] font-semibold text-ink">
              {bid.trustScore !== undefined
                ? `${bid.trustScore} / 100`
                : '—'}
            </p>

            <p className="mt-1 text-[9px] text-ink/35">
              Platform performance signal
            </p>
          </div>

          <div className="bg-white p-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F8EEE6]">
              <Star className="h-4 w-4 fill-current text-[#B85C12]" />
            </div>

            <p className="mt-4 text-[8px] font-bold uppercase tracking-[0.11em] text-ink/30">
              Client rating
            </p>

            <p className="mt-1.5 text-[12px] font-semibold text-ink">
              {bid.rating !== undefined ? `${bid.rating} / 5` : '—'}
            </p>

            <p className="mt-1 text-[9px] text-ink/35">
              Historical client feedback
            </p>
          </div>

          <div className="bg-white p-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F6F8F5]">
              <CheckCircle2 className="h-4 w-4 text-[#12613E]" />
            </div>

            <p className="mt-4 text-[8px] font-bold uppercase tracking-[0.11em] text-ink/30">
              Completed work
            </p>

            <p className="mt-1.5 text-[12px] font-semibold text-ink">
              {bid.completedProjects !== undefined
                ? `${bid.completedProjects} projects`
                : '—'}
            </p>

            <p className="mt-1 text-[9px] text-ink/35">
              Recorded completed projects
            </p>
          </div>
        </div>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* Risk review                                                         */}
      {/* ------------------------------------------------------------------ */}
      <Card className="rounded-[22px] border-ink/[0.07] p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
              hasRisks ? 'bg-[#F8EEE6]' : 'bg-[#EAF4EE]'
            }`}
          >
            {hasRisks ? (
              <AlertTriangle className="h-4 w-4 text-[#B85C12]" />
            ) : (
              <CheckCircle2 className="h-4 w-4 text-[#12613E]" />
            )}
          </div>

          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-ink/30">
              Risk review
            </p>

            <h2 className="mt-1 font-display text-[19px] font-semibold tracking-[-0.025em] text-ink">
              Commercial & verification risks
            </h2>

            <p className="mt-1 text-[10px] leading-5 text-ink/40">
              Flags that should be considered before progressing the bid.
            </p>
          </div>
        </div>

        {risks.length === 0 ? (
          <div className="mt-5 flex items-start gap-3 rounded-[18px] border border-[#12613E]/10 bg-[#EAF4EE] p-4">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#12613E]" />
            </div>

            <div>
              <p className="text-[11px] font-bold text-[#12613E]">
                No outstanding risk flags
              </p>

              <p className="mt-1 text-[10px] leading-5 text-[#12613E]/60">
                No commercial or verification concerns are currently attached
                to this bid.
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-5 space-y-2.5">
            {risks.map((risk) => (
              <div
                key={risk}
                className="flex items-start gap-3 rounded-[17px] border border-[#B85C12]/10 bg-[#F8EEE6] p-4"
              >
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#B85C12]" />

                <p className="text-[10px] leading-5 text-[#7A3F0C]">
                  {risk}
                </p>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* Final decision panel                                                */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden rounded-[22px] bg-[#173629] px-5 py-6 text-white sm:px-7 sm:py-7">
        <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-white/[0.035]" />
        <div className="absolute -bottom-20 right-24 h-36 w-36 rounded-full bg-[#B85C12]/10" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                <ShieldCheck className="h-4 w-4 text-[#A8D9BD]" />
              </div>

              <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/40">
                Bid decision
              </p>
            </div>

            <h2 className="mt-3 font-display text-[21px] font-semibold tracking-[-0.025em]">
              Ready for your decision?
            </h2>

            <p className="mt-2 max-w-xl text-[10px] leading-5 text-white/45 sm:text-[11px]">
              Review the commercial, delivery, verification and trust
              indicators before proceeding. Awarding the bid selects the
              contractor; escrow funding and payment release remain separate
              controlled actions.
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <button
              type="button"
              className="
                rounded-xl
                border
                border-white/10
                bg-white/[0.06]
                px-4
                py-3
                text-[10px]
                font-bold
                text-white/65
                transition-all
                duration-200
                hover:bg-white/[0.10]
                hover:text-white
              "
            >
              Request clarification
            </button>

            <button
              type="button"
              className="
                group
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-white
                px-5
                py-3
                text-[10px]
                font-bold
                text-[#173629]
                shadow-[0_10px_30px_rgba(0,0,0,0.14)]
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:bg-[#F6F8F5]
              "
            >
              Award contract
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
