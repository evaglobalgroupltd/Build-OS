import type { Bid } from '@/modules/bidding/types'
import {
  AlertTriangle,
  Award,
  CheckCircle2,
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

export function BidList({ bids }: { bids: Bid[] }) {
  if (bids.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-line bg-paper-2 px-6 py-10 text-center">
        <p className="text-sm font-medium text-ink">No bids received yet</p>
        <p className="mt-1 text-xs text-ink/40">
          Contractor bids will appear here once submitted.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {bids.map((bid) => (
        <div
          key={bid.id}
          className="rounded-xl border border-line bg-white p-4 transition-colors hover:bg-ink/[0.015]"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Contractor */}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-semibold text-ink">
                  {bid.contractorName}
                </p>

                {bid.verified && (
                  <Badge tone="teal">
                    <span className="inline-flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3" />
                      Verified
                    </span>
                  </Badge>
                )}

                <Badge tone={bidStatusTone[bid.status]}>
                  {bid.status}
                </Badge>
              </div>

              {/* Core bid information */}
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-ink/50">
                <span className="inline-flex items-center gap-1.5">
                  <span className="font-medium text-ink/40">Bid</span>
                  <span className="font-mono font-semibold text-ink">
                    {formatAmount(bid.amount, bid.currency)}
                  </span>
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <Clock3 className="h-3.5 w-3.5" />
                  {bid.timelineWeeks} weeks
                </span>
              </div>
            </div>

            {/* Evaluation summary */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 lg:min-w-[340px]">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                  Trust score
                </p>

                <p className="mt-1 flex items-center gap-1 text-sm font-semibold text-ink">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  {bid.trustScore ?? '—'}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                  Rating
                </p>

                <p className="mt-1 flex items-center gap-1 text-sm font-semibold text-ink">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  {bid.rating ?? '—'}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                  Experience
                </p>

                <p className="mt-1 text-sm font-semibold text-ink">
                  {bid.experienceYears != null
                    ? `${bid.experienceYears} yrs`
                    : '—'}
                </p>
              </div>
            </div>
          </div>

          {/* Cost breakdown */}
          {(bid.materialCost != null ||
            bid.labourCost != null ||
            bid.equipmentCost != null ||
            bid.logisticsCost != null) && (
            <div className="mt-4 border-t border-line pt-4">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-ink/35">
                    Materials
                  </p>
                  <p className="mt-1 text-xs font-medium text-ink">
                    {bid.materialCost != null
                      ? formatAmount(bid.materialCost, bid.currency)
                      : '—'}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-wide text-ink/35">
                    Labour
                  </p>
                  <p className="mt-1 text-xs font-medium text-ink">
                    {bid.labourCost != null
                      ? formatAmount(bid.labourCost, bid.currency)
                      : '—'}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-wide text-ink/35">
                    Equipment
                  </p>
                  <p className="mt-1 text-xs font-medium text-ink">
                    {bid.equipmentCost != null
                      ? formatAmount(bid.equipmentCost, bid.currency)
                      : '—'}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-wide text-ink/35">
                    Logistics
                  </p>
                  <p className="mt-1 text-xs font-medium text-ink">
                    {bid.logisticsCost != null
                      ? formatAmount(bid.logisticsCost, bid.currency)
                      : '—'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Risk / award indicators */}
          {(bid.riskFlags?.length ||
            bid.status === 'awarded' ||
            bid.status === 'clarification') && (
            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-line pt-3">
              {bid.riskFlags?.map((risk) => (
                <span
                  key={risk}
                  className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold text-red-600"
                >
                  <AlertTriangle className="h-3 w-3" />
                  {risk}
                </span>
              ))}

              {bid.status === 'clarification' && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-1 text-[10px] font-semibold text-amber-700">
                  Clarification required
                </span>
              )}

              {bid.status === 'awarded' && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                  <Award className="h-3 w-3" />
                  Contract awarded
                </span>
              )}
            </div>
          )}

          {/* Verification / compliance */}
          {bid.verified && (
            <div className="mt-3 flex items-center gap-1.5 text-[10px] text-ink/40">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              Contractor verification requirements satisfied
            </div>
          )}
        </div>
      ))}
    </div>
  )
}