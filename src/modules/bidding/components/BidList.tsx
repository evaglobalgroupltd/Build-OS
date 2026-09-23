
import type { Bid } from '@/modules/bidding/types'
import {
  AlertTriangle,
  Award,
  CheckCircle2,
  ChevronRight,
  Clock3,
  ShieldCheck,
  Star,
} from 'lucide-react'

import { Badge } from '@/components/ui/Badge'

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

export function BidList({ bids }: { bids: Bid[] }) {
  if (bids.length === 0) {
    return (
      <div className="relative overflow-hidden rounded-[22px] border border-dashed border-ink/[0.10] bg-white px-6 py-14 text-center">
        <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#173629]/[0.035]" />
        <div className="absolute -bottom-16 left-10 h-28 w-28 rounded-full bg-[#B85C12]/[0.035]" />

        <div className="relative mx-auto flex max-w-sm flex-col items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F4F6F3] text-ink/45">
            <Award className="h-5 w-5" />
          </div>

          <p className="mt-4 font-display text-[17px] font-semibold tracking-[-0.02em] text-ink">
            No bids received yet
          </p>

          <p className="mt-1.5 text-[11px] leading-5 text-ink/45">
            Contractor proposals will appear here once they are submitted
            against this tender.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {bids.map((bid) => {
        const isAwarded = bid.status === 'awarded'
        const hasCostBreakdown =
          bid.materialCost != null ||
          bid.labourCost != null ||
          bid.equipmentCost != null ||
          bid.logisticsCost != null

        const hasIndicators =
          Boolean(bid.riskFlags?.length) ||
          bid.status === 'awarded' ||
          bid.status === 'clarification'

        return (
          <article
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
              hover:-translate-y-[1px]
              hover:shadow-[0_18px_45px_rgba(20,40,30,0.07)]
              ${
                isAwarded
                  ? 'border-[#12613E]/20 shadow-[0_10px_35px_rgba(18,97,62,0.06)]'
                  : 'border-ink/[0.07]'
              }
            `}
          >
            {/* Awarded accent */}
            {isAwarded && (
              <div className="absolute inset-x-0 top-0 h-0.5 bg-[#12613E]" />
            )}

            {/* ===================================================== */}
            {/* Primary bid summary */}
            {/* ===================================================== */}

            <div className="p-5 sm:p-6">
              <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                {/* Contractor identity */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-[14px]
                        font-display
                        text-sm
                        font-semibold
                        ${
                          isAwarded
                            ? 'bg-[#173629] text-white'
                            : 'bg-[#F3F5F2] text-ink/65'
                        }
                      `}
                    >
                      {getInitials(bid.contractorName)}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="truncate font-display text-[16px] font-semibold tracking-[-0.015em] text-ink">
                          {bid.contractorName}
                        </h3>

                        {bid.verified && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#EAF4EE] px-2 py-1 text-[9px] font-bold uppercase tracking-[0.06em] text-[#12613E]">
                            <ShieldCheck className="h-3 w-3" />
                            Verified
                          </span>
                        )}

                        <Badge tone={bidStatusTone[bid.status]}>
                          {bid.status}
                        </Badge>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
                        <div>
                          <p className="text-[9px] font-bold uppercase tracking-[0.10em] text-ink/35">
                            Bid value
                          </p>

                          <p className="mt-0.5 font-display text-[20px] font-semibold tracking-[-0.025em] text-ink">
                            {formatAmount(bid.amount, bid.currency)}
                          </p>
                        </div>

                        <div className="h-7 w-px bg-ink/[0.08]" />

                        <div>
                          <p className="text-[9px] font-bold uppercase tracking-[0.10em] text-ink/35">
                            Timeline
                          </p>

                          <p className="mt-0.5 flex items-center gap-1.5 text-[12px] font-semibold text-ink">
                            <Clock3 className="h-3.5 w-3.5 text-ink/35" />
                            {bid.timelineWeeks} weeks
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Evaluation metrics */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 xl:min-w-[390px]">
                  <div className="rounded-[15px] bg-[#F7F8F6] px-3.5 py-3">
                    <p className="text-[8px] font-bold uppercase tracking-[0.10em] text-ink/35">
                      Trust score
                    </p>

                    <p className="mt-1.5 flex items-center gap-1.5 font-display text-[15px] font-semibold text-ink">
                      <ShieldCheck className="h-3.5 w-3.5 text-[#12613E]" />
                      {bid.trustScore ?? '—'}
                    </p>
                  </div>

                  <div className="rounded-[15px] bg-[#F7F8F6] px-3.5 py-3">
                    <p className="text-[8px] font-bold uppercase tracking-[0.10em] text-ink/35">
                      Rating
                    </p>

                    <p className="mt-1.5 flex items-center gap-1.5 font-display text-[15px] font-semibold text-ink">
                      <Star className="h-3.5 w-3.5 fill-current text-[#B85C12]" />
                      {bid.rating ?? '—'}
                    </p>
                  </div>

                  <div className="rounded-[15px] bg-[#F7F8F6] px-3.5 py-3">
                    <p className="text-[8px] font-bold uppercase tracking-[0.10em] text-ink/35">
                      Experience
                    </p>

                    <p className="mt-1.5 font-display text-[15px] font-semibold text-ink">
                      {bid.experienceYears != null
                        ? `${bid.experienceYears} yrs`
                        : '—'}
                    </p>
                  </div>
                </div>
              </div>

              {/* ===================================================== */}
              {/* Cost breakdown */}
              {/* ===================================================== */}

              {hasCostBreakdown && (
                <div className="mt-6 border-t border-ink/[0.07] pt-5">
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-ink/35">
                        Cost structure
                      </p>

                      <p className="mt-0.5 text-[11px] text-ink/45">
                        Submitted bid composition
                      </p>
                    </div>

                    <div className="hidden items-center gap-1.5 text-[9px] font-semibold text-ink/30 sm:flex">
                      View breakdown
                      <ChevronRight className="h-3 w-3" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 overflow-hidden rounded-[16px] border border-ink/[0.06] bg-[#FAFBF9] sm:grid-cols-4">
                    <div className="border-b border-r border-ink/[0.05] p-3.5 sm:border-b-0">
                      <p className="text-[9px] font-bold uppercase tracking-[0.08em] text-ink/35">
                        Materials
                      </p>

                      <p className="mt-1 font-display text-[13px] font-semibold text-ink">
                        {bid.materialCost != null
                          ? formatAmount(bid.materialCost, bid.currency)
                          : '—'}
                      </p>
                    </div>

                    <div className="border-b border-ink/[0.05] p-3.5 sm:border-b-0 sm:border-r">
                      <p className="text-[9px] font-bold uppercase tracking-[0.08em] text-ink/35">
                        Labour
                      </p>

                      <p className="mt-1 font-display text-[13px] font-semibold text-ink">
                        {bid.labourCost != null
                          ? formatAmount(bid.labourCost, bid.currency)
                          : '—'}
                      </p>
                    </div>

                    <div className="border-r border-ink/[0.05] p-3.5">
                      <p className="text-[9px] font-bold uppercase tracking-[0.08em] text-ink/35">
                        Equipment
                      </p>

                      <p className="mt-1 font-display text-[13px] font-semibold text-ink">
                        {bid.equipmentCost != null
                          ? formatAmount(bid.equipmentCost, bid.currency)
                          : '—'}
                      </p>
                    </div>

                    <div className="p-3.5">
                      <p className="text-[9px] font-bold uppercase tracking-[0.08em] text-ink/35">
                        Logistics
                      </p>

                      <p className="mt-1 font-display text-[13px] font-semibold text-ink">
                        {bid.logisticsCost != null
                          ? formatAmount(bid.logisticsCost, bid.currency)
                          : '—'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ===================================================== */}
              {/* Risk / award indicators */}
              {/* ===================================================== */}

              {hasIndicators && (
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {bid.riskFlags?.map((risk) => (
                    <span
                      key={risk}
                      className="inline-flex items-center gap-1.5 rounded-full border border-red-500/10 bg-red-500/[0.06] px-2.5 py-1.5 text-[9px] font-bold text-red-600"
                    >
                      <AlertTriangle className="h-3 w-3" />
                      {risk}
                    </span>
                  ))}

                  {bid.status === 'clarification' && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#B85C12]/10 bg-[#B85C12]/[0.07] px-2.5 py-1.5 text-[9px] font-bold text-[#9A4D0A]">
                      <Clock3 className="h-3 w-3" />
                      Clarification required
                    </span>
                  )}

                  {isAwarded && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#12613E]/10 bg-[#EAF4EE] px-2.5 py-1.5 text-[9px] font-bold text-[#12613E]">
                      <Award className="h-3 w-3" />
                      Contract awarded
                    </span>
                  )}
                </div>
              )}

              {/* ===================================================== */}
              {/* Verification footer */}
              {/* ===================================================== */}

              {bid.verified && (
                <div className="mt-5 flex items-center justify-between border-t border-ink/[0.06] pt-4">
                  <div className="flex items-center gap-1.5 text-[9px] font-medium text-ink/35">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#12613E]" />
                    Contractor verification requirements satisfied
                  </div>

                  <ChevronRight className="hidden h-3.5 w-3.5 text-ink/20 transition-transform duration-200 group-hover:translate-x-0.5 sm:block" />
                </div>
              )}
            </div>
          </article>
        )
      })}
    </div>
  )
}