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

import { Card, CardBody, CardHeader } from '@/components/ui/Card'
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

export function BidComparison() {
  const sortedBids = [...bids].sort((a, b) => a.amount - b.amount)

  const lowestBid = sortedBids[0]?.amount

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader
          title="Bid comparison"
          subtitle="Compare contractors by cost, timeline, verification, experience and trust score before awarding the project."
        />

        <CardBody>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-xl border border-line bg-paper-2 p-4">
              <div className="flex items-center gap-2">
                <FileCheck2 className="h-4 w-4 text-ink/50" />
                <p className="text-xs text-ink/45">Total bids</p>
              </div>

              <p className="mt-2 font-display text-xl font-semibold text-ink">
                {bids.length}
              </p>
            </div>

            <div className="rounded-xl border border-line bg-paper-2 p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-ink/50" />
                <p className="text-xs text-ink/45">Lowest bid</p>
              </div>

              <p className="mt-2 font-display text-xl font-semibold text-ink">
                {sortedBids[0]
                  ? formatAmount(
                      sortedBids[0].amount,
                      sortedBids[0].currency,
                    )
                  : '—'}
              </p>
            </div>

            <div className="rounded-xl border border-line bg-paper-2 p-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <p className="text-xs text-ink/45">Verified bidders</p>
              </div>

              <p className="mt-2 font-display text-xl font-semibold text-ink">
                {bids.filter((bid) => bid.verified).length}
              </p>
            </div>

            <div className="rounded-xl border border-line bg-paper-2 p-4">
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-ink/50" />
                <p className="text-xs text-ink/45">Shortlisted</p>
              </div>

              <p className="mt-2 font-display text-xl font-semibold text-ink">
                {bids.filter(
                  (bid) =>
                    bid.status === 'shortlisted' ||
                    bid.status === 'clarification',
                ).length}
              </p>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Comparison */}
      <Card className="overflow-hidden">
        <CardHeader
          title="Contractor bids"
          subtitle="Review the commercial and trust indicators for each submitted bid."
        />

        <CardBody className="p-0">
          <div className="divide-y divide-line">
            {sortedBids.map((bid, index) => {
              const isLowest = bid.amount === lowestBid

              return (
                <div
                  key={bid.id}
                  className="p-5 transition-colors hover:bg-ink/[0.02] sm:p-6"
                >
                  {/* Contractor */}
                  <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink/5">
                          <span className="font-mono text-xs font-semibold text-ink/60">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>

                        <h3 className="text-sm font-semibold text-ink">
                          {bid.contractorName}
                        </h3>

                        {bid.verified && (
                          <Badge tone="teal">
                            <span className="inline-flex items-center gap-1">
                              <CheckCircle2 className="h-3 w-3" />
                              Verified
                            </span>
                          </Badge>
                        )}

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

                      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {/* Cost */}
                        <div className="rounded-xl border border-line p-4">
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-ink/40" />
                            <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                              Bid amount
                            </p>
                          </div>

                          <p className="mt-2 font-mono text-base font-semibold text-ink">
                            {formatAmount(bid.amount, bid.currency)}
                          </p>
                        </div>

                        {/* Timeline */}
                        <div className="rounded-xl border border-line p-4">
                          <div className="flex items-center gap-2">
                            <Clock3 className="h-4 w-4 text-ink/40" />
                            <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                              Timeline
                            </p>
                          </div>

                          <p className="mt-2 font-mono text-base font-semibold text-ink">
                            {bid.timelineWeeks} weeks
                          </p>
                        </div>

                        {/* Verification */}
                        <div className="rounded-xl border border-line p-4">
                          <div className="flex items-center gap-2">
                            <ShieldCheck className="h-4 w-4 text-ink/40" />
                            <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                              Verification
                            </p>
                          </div>

                          <p className="mt-2 text-sm font-semibold text-ink">
                            {bid.verified ? 'Verified contractor' : 'Pending'}
                          </p>
                        </div>

                        {/* Trust */}
                        <div className="rounded-xl border border-line p-4">
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-ink/40" />
                            <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                              Trust score
                            </p>
                          </div>

                          <p className="mt-2 text-sm font-semibold text-ink">
                            {bid.trustScore ?? '—'}
                            {bid.trustScore ? ' / 100' : ''}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom action area */}
                  <div className="mt-5 flex flex-col justify-between gap-4 border-t border-line pt-4 sm:flex-row sm:items-center">
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-ink/45">
                      {bid.rating !== undefined && (
                        <span className="inline-flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 fill-current text-ink/50" />
                          <span className="font-semibold text-ink/70">
                            {bid.rating}
                          </span>
                          client rating
                        </span>
                      )}

                      {bid.completedProjects !== undefined && (
                        <span>
                          <strong className="font-semibold text-ink/70">
                            {bid.completedProjects}
                          </strong>{' '}
                          completed projects
                        </span>
                      )}

                      {bid.riskFlags?.length > 0 && (
                        <span className="inline-flex items-center gap-1 text-amber-700">
                          <AlertTriangle className="h-3.5 w-3.5" />
                          {bid.riskFlags.length} risk flag
                          {bid.riskFlags.length > 1 ? 's' : ''}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="rounded-lg border border-line px-3 py-2 text-xs font-semibold text-ink/60 transition-colors hover:bg-ink/5"
                      >
                        View bid
                      </button>

                      {bid.status !== 'awarded' &&
                        bid.status !== 'rejected' && (
                          <button
                            type="button"
                            className="inline-flex items-center gap-1.5 rounded-lg bg-ink px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-ink/90"
                          >
                            Review & award
                            <ArrowRight className="h-3.5 w-3.5" />
                          </button>
                        )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {bids.length === 0 && (
            <div className="p-10 text-center">
              <FileCheck2 className="mx-auto h-8 w-8 text-ink/25" />

              <p className="mt-3 text-sm font-semibold text-ink">
                No bids submitted
              </p>

              <p className="mt-1 text-xs text-ink/40">
                Contractor bids will appear here once submitted.
              </p>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Decision guidance */}
      <Card className="border-ink/10 bg-paper-2 p-5">
        <div className="flex gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

          <div>
            <p className="text-sm font-semibold text-ink">
              Awarding guidance
            </p>

            <p className="mt-1 text-xs leading-5 text-ink/45">
              The lowest bid should not automatically determine the award.
              Compare the contractor&apos;s cost breakdown, delivery timeline,
              verification status, trust score, previous project performance
              and any identified risk before selecting a contractor.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}