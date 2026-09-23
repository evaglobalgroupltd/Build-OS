
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  DollarSign,
  FileCheck2,
  ShieldCheck,
  Star,
  Trophy,
} from 'lucide-react'

import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { bids } from '@/data/mockData'

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

const bidStatusTone = {
  submitted: 'neutral',
  shortlisted: 'amber',
  clarification: 'amber',
  awarded: 'teal',
  rejected: 'brick',
} as const

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

export function BidComparison() {
  const sortedBids = [...bids].sort((a, b) => a.amount - b.amount)

  const lowestBid = sortedBids[0]?.amount

  const verifiedCount = bids.filter((bid) => bid.verified).length

  const shortlistedCount = bids.filter(
    (bid) =>
      bid.status === 'shortlisted' || bid.status === 'clarification',
  ).length

  return (
    <div className="space-y-7">
      {/* ------------------------------------------------------------------ */}
      {/* Executive marketplace header                                       */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden rounded-[24px] bg-[#173629] px-6 py-7 text-white sm:px-8 sm:py-8">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/[0.035]" />
        <div className="absolute -bottom-28 right-24 h-56 w-56 rounded-full bg-[#B85C12]/10" />
        <div className="absolute left-[45%] top-1/2 h-36 w-36 -translate-y-1/2 rounded-full bg-white/[0.018]" />

        <div className="relative flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                <FileCheck2 className="h-4 w-4 text-white/80" />
              </div>

              <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/40">
                Bid intelligence
              </span>
            </div>

            <h1 className="mt-5 font-display text-[29px] font-semibold leading-tight tracking-[-0.04em] sm:text-[36px]">
              Compare before you commit.
            </h1>

            <p className="mt-3 max-w-2xl text-[12px] leading-5 text-white/50 sm:text-[13px] sm:leading-6">
              Review commercial terms, contractor credibility, delivery
              capability and risk indicators before moving to contract award.
            </p>
          </div>

          <div className="flex shrink-0 gap-2.5">
            <div className="rounded-2xl bg-white/[0.08] px-4 py-3">
              <p className="text-[8px] font-bold uppercase tracking-[0.11em] text-white/35">
                Submitted
              </p>

              <p className="mt-1 font-display text-[23px] font-semibold">
                {bids.length}
              </p>
            </div>

            <div className="rounded-2xl bg-white/[0.08] px-4 py-3">
              <p className="text-[8px] font-bold uppercase tracking-[0.11em] text-white/35">
                Shortlisted
              </p>

              <p className="mt-1 font-display text-[23px] font-semibold">
                {shortlistedCount}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Summary intelligence                                                */}
      {/* ------------------------------------------------------------------ */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="group rounded-[20px] border-ink/[0.07] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(20,40,30,0.06)]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-ink/30">
                Total bids
              </p>

              <p className="mt-2 font-display text-[28px] font-semibold tracking-[-0.035em] text-ink">
                {bids.length}
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F6F8F5]">
              <FileCheck2 className="h-4 w-4 text-ink/50" />
            </div>
          </div>

          <p className="mt-2 text-[10px] text-ink/40">
            Contractor submissions received
          </p>
        </Card>

        <Card className="group rounded-[20px] border-ink/[0.07] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(20,40,30,0.06)]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-ink/30">
                Lowest bid
              </p>

              <p className="mt-2 font-display text-[24px] font-semibold tracking-[-0.03em] text-ink">
                {sortedBids[0]
                  ? formatAmount(
                      sortedBids[0].amount,
                      sortedBids[0].currency,
                    )
                  : '—'}
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F8EEE6]">
              <DollarSign className="h-4 w-4 text-[#B85C12]" />
            </div>
          </div>

          <p className="mt-2 text-[10px] text-ink/40">
            Lowest submitted commercial value
          </p>
        </Card>

        <Card className="group rounded-[20px] border-ink/[0.07] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(20,40,30,0.06)]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-ink/30">
                Verified bidders
              </p>

              <p className="mt-2 font-display text-[28px] font-semibold tracking-[-0.035em] text-ink">
                {verifiedCount}
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF4EE]">
              <ShieldCheck className="h-4 w-4 text-[#12613E]" />
            </div>
          </div>

          <p className="mt-2 text-[10px] text-ink/40">
            Contractors with verified credentials
          </p>
        </Card>

        <Card className="group rounded-[20px] border-ink/[0.07] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(20,40,30,0.06)]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-ink/30">
                Under review
              </p>

              <p className="mt-2 font-display text-[28px] font-semibold tracking-[-0.035em] text-ink">
                {shortlistedCount}
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F8EEE6]">
              <Trophy className="h-4 w-4 text-[#B85C12]" />
            </div>
          </div>

          <p className="mt-2 text-[10px] text-ink/40">
            Shortlisted or awaiting clarification
          </p>
        </Card>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Comparison workspace                                                */}
      {/* ------------------------------------------------------------------ */}
      <section>
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-ink/30">
              Contractor submissions
            </p>

            <h2 className="mt-1 font-display text-[20px] font-semibold tracking-[-0.025em] text-ink">
              Commercial & performance comparison
            </h2>

            <p className="mt-1 text-[11px] leading-5 text-ink/40">
              Compare the indicators that matter before progressing a bid to award.
            </p>
          </div>

          <span className="hidden rounded-full border border-ink/[0.07] bg-white px-3 py-1.5 text-[9px] font-semibold text-ink/40 sm:block">
            {bids.length} submissions
          </span>
        </div>

        <div className="space-y-4">
          {sortedBids.map((bid, index) => {
            const isLowest = bid.amount === lowestBid
            const isAwarded = bid.status === 'awarded'
            const hasRisks = Boolean(bid.riskFlags?.length)

            return (
              <Card
                key={bid.id}
                className={`
                  group
                  relative
                  overflow-hidden
                  rounded-[22px]
                  border
                  bg-white
                  transition-all
                  duration-300
                  hover:-translate-y-[2px]
                  hover:shadow-[0_20px_50px_rgba(20,40,30,0.07)]
                  ${
                    isAwarded
                      ? 'border-[#12613E]/15'
                      : isLowest
                        ? 'border-[#B85C12]/15'
                        : 'border-ink/[0.07]'
                  }
                `}
              >
                <div
                  className={`
                    absolute inset-x-0 top-0 h-0.5
                    ${
                      isAwarded
                        ? 'bg-[#12613E]'
                        : isLowest
                          ? 'bg-[#B85C12]'
                          : 'bg-[#173629]/10'
                    }
                  `}
                />

                <div className="p-5 sm:p-6">
                  {/* Contractor identity */}
                  <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#173629] text-white">
                          <span className="font-display text-[12px] font-semibold">
                            {getInitials(bid.contractorName)}
                          </span>
                        </div>

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-[14px] font-semibold text-ink">
                              {bid.contractorName}
                            </h3>

                            {bid.verified && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-[#EAF4EE] px-2 py-1 text-[8px] font-bold uppercase tracking-[0.06em] text-[#12613E]">
                                <CheckCircle2 className="h-2.5 w-2.5" />
                                Verified
                              </span>
                            )}
                          </div>

                          <p className="mt-0.5 text-[10px] text-ink/35">
                            Contractor submission #{String(index + 1).padStart(2, '0')}
                          </p>
                        </div>

                        {isLowest && (
                          <Badge tone="amber">
                            <span className="inline-flex items-center gap-1">
                              <Trophy className="h-3 w-3" />
                              Lowest bid
                            </span>
                          </Badge>
                        )}

                        <Badge tone={bidStatusTone[bid.status]}>
                          {bid.status}
                        </Badge>
                      </div>

                      {/* Core comparison metrics */}
                      <div className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
                        <div
                          className={`
                            rounded-[17px] p-4
                            ${
                              isLowest
                                ? 'bg-[#F8EEE6]'
                                : 'bg-[#F6F8F5]'
                            }
                          `}
                        >
                          <div className="flex items-center gap-2">
                            <DollarSign
                              className={`h-3.5 w-3.5 ${
                                isLowest
                                  ? 'text-[#B85C12]'
                                  : 'text-ink/40'
                              }`}
                            />

                            <p className="text-[8px] font-bold uppercase tracking-[0.10em] text-ink/30">
                              Bid amount
                            </p>
                          </div>

                          <p className="mt-2 font-display text-[18px] font-semibold tracking-[-0.02em] text-ink">
                            {formatAmount(bid.amount, bid.currency)}
                          </p>

                          {isLowest && (
                            <p className="mt-1 text-[9px] font-medium text-[#B85C12]">
                              Lowest submitted value
                            </p>
                          )}
                        </div>

                        <div className="rounded-[17px] bg-[#F6F8F5] p-4">
                          <div className="flex items-center gap-2">
                            <Clock3 className="h-3.5 w-3.5 text-ink/40" />

                            <p className="text-[8px] font-bold uppercase tracking-[0.10em] text-ink/30">
                              Timeline
                            </p>
                          </div>

                          <p className="mt-2 font-display text-[18px] font-semibold tracking-[-0.02em] text-ink">
                            {bid.timelineWeeks}
                            <span className="ml-1 text-[10px] font-medium text-ink/40">
                              weeks
                            </span>
                          </p>

                          <p className="mt-1 text-[9px] text-ink/35">
                            Proposed delivery period
                          </p>
                        </div>

                        <div className="rounded-[17px] bg-[#F6F8F5] p-4">
                          <div className="flex items-center gap-2">
                            <ShieldCheck className="h-3.5 w-3.5 text-ink/40" />

                            <p className="text-[8px] font-bold uppercase tracking-[0.10em] text-ink/30">
                              Verification
                            </p>
                          </div>

                          <p className="mt-2 text-[12px] font-semibold text-ink">
                            {bid.verified
                              ? 'Verified contractor'
                              : 'Pending verification'}
                          </p>

                          <p className="mt-1 text-[9px] text-ink/35">
                            Credential status
                          </p>
                        </div>

                        <div className="rounded-[17px] bg-[#173629] p-4">
                          <div className="flex items-center gap-2">
                            <Star className="h-3.5 w-3.5 text-white/45" />

                            <p className="text-[8px] font-bold uppercase tracking-[0.10em] text-white/35">
                              Trust score
                            </p>
                          </div>

                          <p className="mt-2 font-display text-[18px] font-semibold tracking-[-0.02em] text-white">
                            {bid.trustScore ?? '—'}
                            {bid.trustScore ? (
                              <span className="ml-1 text-[9px] font-medium text-white/35">
                                / 100
                              </span>
                            ) : null}
                          </p>

                          <p className="mt-1 text-[9px] text-white/35">
                            Platform performance signal
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Supporting intelligence */}
                  <div className="mt-5 flex flex-col gap-4 border-t border-ink/[0.06] pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                      {bid.rating !== undefined && (
                        <span className="inline-flex items-center gap-1.5 text-[10px] text-ink/40">
                          <Star className="h-3.5 w-3.5 fill-current text-[#B85C12]" />

                          <strong className="font-semibold text-ink/70">
                            {bid.rating}
                          </strong>

                          client rating
                        </span>
                      )}

                      {bid.completedProjects !== undefined && (
                        <span className="text-[10px] text-ink/40">
                          <strong className="font-semibold text-ink/70">
                            {bid.completedProjects}
                          </strong>{' '}
                          completed projects
                        </span>
                      )}

                      {hasRisks ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F8EEE6] px-2.5 py-1 text-[9px] font-semibold text-[#9A4D0A]">
                          <AlertTriangle className="h-3 w-3" />
                          {bid.riskFlags.length} risk flag
                          {bid.riskFlags.length > 1 ? 's' : ''}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF4EE] px-2.5 py-1 text-[9px] font-semibold text-[#12613E]">
                          <CheckCircle2 className="h-3 w-3" />
                          No flagged risks
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="
                          rounded-full
                          border
                          border-ink/[0.08]
                          bg-white
                          px-4
                          py-2.5
                          text-[10px]
                          font-bold
                          text-ink/55
                          transition-all
                          duration-200
                          hover:border-ink/15
                          hover:bg-[#F6F8F5]
                          hover:text-ink
                        "
                      >
                        View bid
                      </button>

                      {!isAwarded && bid.status !== 'rejected' && (
                        <button
                          type="button"
                          className="
                            group/action
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            bg-ink
                            px-4
                            py-2.5
                            text-[10px]
                            font-bold
                            text-white
                            transition-all
                            duration-200
                            hover:bg-[#173629]
                            hover:shadow-[0_8px_22px_rgba(20,40,30,0.14)]
                          "
                        >
                          Review & award
                          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/action:translate-x-0.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {bids.length === 0 && (
          <Card className="rounded-[22px] border-dashed border-ink/[0.10] p-10 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F6F8F5]">
              <FileCheck2 className="h-5 w-5 text-ink/30" />
            </div>

            <p className="mt-4 font-display text-[17px] font-semibold text-ink">
              No bids submitted
            </p>

            <p className="mx-auto mt-1 max-w-sm text-[10px] leading-5 text-ink/40">
              Contractor bids will appear here once submissions are received
              for this project.
            </p>
          </Card>
        )}
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Decision guidance                                                   */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden rounded-[22px] bg-[#F6F8F5] px-5 py-6 sm:px-7 sm:py-7">
        <div className="absolute -right-16 -top-20 h-44 w-44 rounded-full bg-[#173629]/[0.025]" />
        <div className="absolute -bottom-20 right-24 h-36 w-36 rounded-full bg-[#B85C12]/[0.04]" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
            <ShieldCheck className="h-4 w-4 text-[#12613E]" />
          </div>

          <div className="max-w-3xl">
            <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-ink/30">
              Awarding guidance
            </p>

            <h2 className="mt-1 font-display text-[18px] font-semibold tracking-[-0.02em] text-ink">
              Compare the whole bid, not just the price.
            </h2>

            <p className="mt-2 text-[10px] leading-5 text-ink/45 sm:text-[11px]">
              The lowest submitted amount is only one commercial indicator.
              Review the contractor&apos;s cost structure, proposed delivery
              timeline, verification status, trust score, previous project
              performance and identified risks before progressing to award.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
