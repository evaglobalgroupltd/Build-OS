import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Clock3,
  DollarSign,
  FileCheck2,
  FileText,
  ShieldCheck,
  Star,
  UserRound,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'
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

function getSelectedBid(): Bid | undefined {
  return bids[0]
}

export function BidDetails() {
  const bid = getSelectedBid()

  if (!bid) {
    return (
      <Card>
        <CardBody className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <FileCheck2 className="h-9 w-9 text-ink/25" />

          <h2 className="mt-4 font-display text-lg font-semibold text-ink">
            Bid not found
          </h2>

          <p className="mt-1 max-w-md text-sm leading-6 text-ink/40">
            The submitted bid could not be found or may have been removed.
          </p>
        </CardBody>
      </Card>
    )
  }

  const risks = bid.riskFlags ?? []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <button
            type="button"
            className="mb-4 inline-flex items-center gap-1.5 text-xs font-medium text-ink/45 transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to bid comparison
          </button>

          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5">
              <FileText className="h-5 w-5 text-ink/65" />
            </div>

            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/40">
              Bidding
            </span>
          </div>

          <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Bid details
          </h1>

          <p className="mt-1 max-w-2xl text-sm leading-6 text-ink/50">
            Review the contractor submission, commercial breakdown, delivery
            proposal and verification indicators before making an award
            decision.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {bid.verified && (
            <Badge tone="teal">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" />
                Verified contractor
              </span>
            </Badge>
          )}

          <Badge tone={bidStatusTone[bid.status]}>
            {bid.status}
          </Badge>
        </div>
      </div>

      {/* Contractor summary */}
      <Card>
        <CardBody>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-ink/5">
                <UserRound className="h-6 w-6 text-ink/50" />
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-ink/35">
                  Contractor
                </p>

                <h2 className="mt-1 font-display text-xl font-semibold text-ink">
                  {bid.contractorName}
                </h2>

                <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink/40">
                  {bid.rating !== undefined && (
                    <span className="inline-flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      {bid.rating} client rating
                    </span>
                  )}

                  {bid.completedProjects !== undefined && (
                    <span>
                      {bid.completedProjects} completed projects
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-paper-2 px-4 py-3">
                <p className="text-[10px] uppercase tracking-wide text-ink/35">
                  Bid amount
                </p>

                <p className="mt-1 font-mono text-base font-semibold text-ink">
                  {formatAmount(bid.amount, bid.currency)}
                </p>
              </div>

              <div className="rounded-xl bg-paper-2 px-4 py-3">
                <p className="text-[10px] uppercase tracking-wide text-ink/35">
                  Timeline
                </p>

                <p className="mt-1 font-mono text-base font-semibold text-ink">
                  {bid.timelineWeeks} weeks
                </p>
              </div>

              <div className="col-span-2 rounded-xl bg-paper-2 px-4 py-3 sm:col-span-1">
                <p className="text-[10px] uppercase tracking-wide text-ink/35">
                  Trust score
                </p>

                <p className="mt-1 font-mono text-base font-semibold text-ink">
                  {bid.trustScore !== undefined
                    ? `${bid.trustScore} / 100`
                    : 'Not available'}
                </p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Commercial + delivery */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader
            title="Commercial proposal"
            subtitle="Submitted contract value and proposed delivery terms."
          />

          <CardBody>
            <div className="rounded-xl border border-line bg-paper-2 p-5">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-ink/45" />

                <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                  Total bid value
                </p>
              </div>

              <p className="mt-2 font-display text-3xl font-bold tracking-tight text-ink">
                {formatAmount(bid.amount, bid.currency)}
              </p>

              <p className="mt-1 text-xs text-ink/40">
                Submitted commercial offer
              </p>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-line p-4">
                <p className="text-[10px] uppercase tracking-wide text-ink/35">
                  Currency
                </p>

                <p className="mt-1 text-sm font-semibold text-ink">
                  {bid.currency}
                </p>
              </div>

              <div className="rounded-xl border border-line p-4">
                <p className="text-[10px] uppercase tracking-wide text-ink/35">
                  Bid status
                </p>

                <p className="mt-1 text-sm font-semibold capitalize text-ink">
                  {bid.status}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Delivery proposal"
            subtitle="Contractor's proposed execution timeline."
          />

          <CardBody>
            <div className="flex items-center gap-4 rounded-xl border border-line p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink/5">
                <Clock3 className="h-5 w-5 text-ink/55" />
              </div>

              <div>
                <p className="text-xs text-ink/40">
                  Proposed completion period
                </p>

                <p className="mt-1 font-display text-2xl font-semibold text-ink">
                  {bid.timelineWeeks} weeks
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-xl bg-paper-2 p-4">
              <p className="text-xs font-medium text-ink">
                Delivery assessment
              </p>

              <p className="mt-1 text-xs leading-5 text-ink/45">
                Timeline should be assessed against the project schedule,
                milestone requirements, contractor capacity and other
                submitted bids before award.
              </p>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Trust and verification */}
      <Card>
        <CardHeader
          title="Trust & verification"
          subtitle="Contractor credibility indicators used during bid evaluation."
        />

        <CardBody>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-line p-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-ink/45" />
                <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                  Verification
                </p>
              </div>

              <p className="mt-2 text-sm font-semibold text-ink">
                {bid.verified ? 'Verified' : 'Pending verification'}
              </p>
            </div>

            <div className="rounded-xl border border-line p-4">
              <div className="flex items-center gap-2">
                <TrophyIcon />
                <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                  Trust score
                </p>
              </div>

              <p className="mt-2 text-sm font-semibold text-ink">
                {bid.trustScore !== undefined
                  ? `${bid.trustScore} / 100`
                  : '—'}
              </p>
            </div>

            <div className="rounded-xl border border-line p-4">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-ink/45" />
                <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                  Client rating
                </p>
              </div>

              <p className="mt-2 text-sm font-semibold text-ink">
                {bid.rating !== undefined ? `${bid.rating} / 5` : '—'}
              </p>
            </div>

            <div className="rounded-xl border border-line p-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-ink/45" />
                <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                  Completed work
                </p>
              </div>

              <p className="mt-2 text-sm font-semibold text-ink">
                {bid.completedProjects !== undefined
                  ? `${bid.completedProjects} projects`
                  : '—'}
              </p>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Risk review */}
      <Card>
        <CardHeader
          title="Risk review"
          subtitle="Flags that should be considered before awarding the contract."
        />

        <CardBody>
          {risks.length === 0 ? (
            <div className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />

              <div>
                <p className="text-sm font-semibold text-emerald-700">
                  No outstanding risk flags
                </p>

                <p className="mt-0.5 text-xs text-emerald-700/65">
                  No commercial or verification concerns are currently
                  attached to this bid.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {risks.map((risk) => (
                <div
                  key={risk}
                  className="flex gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4"
                >
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />

                  <p className="text-sm text-amber-800">
                    {risk}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardBody>
      </Card>

      {/* Decision */}
      <Card className="border-ink/10 bg-paper-2">
        <CardBody>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-ink">
                Bid decision
              </p>

              <p className="mt-1 max-w-2xl text-xs leading-5 text-ink/45">
                Review all commercial, delivery, verification and trust
                indicators before proceeding. Awarding the bid selects the
                contractor; escrow funding and payment release remain
                separate controlled actions.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                className="rounded-xl border border-line px-4 py-2.5 text-xs font-semibold text-ink/60 transition-colors hover:bg-white"
              >
                Request clarification
              </button>

              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-ink/90"
              >
                Award contract
                <ArrowRightIcon />
              </button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

function TrophyIcon() {
  return (
    <span className="inline-flex">
      <Trophy className="h-4 w-4 text-ink/45" />
    </span>
  )
}

function ArrowRightIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className="h-3.5 w-3.5"
      aria-hidden="true"
    >
      <path
        d="M3.5 8h9M9 4.5L12.5 8 9 11.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}