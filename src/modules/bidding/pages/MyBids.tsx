import {
  CheckCircle2,
  Clock3,
  FileText,
  Filter,
  Gavel,
  Send,
  TrendingUp,
  XCircle,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { BidList } from '@/modules/bidding/components/BidList'
import { bids } from '@/data/mockData'

export function MyBids() {
  const submittedCount = bids.filter(
    (bid) => bid.status === 'submitted',
  ).length

  const shortlistedCount = bids.filter(
    (bid) => bid.status === 'shortlisted',
  ).length

  const awardedCount = bids.filter(
    (bid) => bid.status === 'awarded',
  ).length

  const rejectedCount = bids.filter(
    (bid) => bid.status === 'rejected',
  ).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5">
              <Gavel className="h-5 w-5 text-ink/65" />
            </div>

            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/40">
              Contractor bidding
            </span>
          </div>

          <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            My bids
          </h1>

          <p className="mt-1 max-w-2xl text-sm leading-6 text-ink/50">
            Track submitted proposals, review bid status and monitor
            opportunities through the Build OS marketplace.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex w-fit items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
        >
          <Send className="h-3.5 w-3.5" />
          Find projects
        </button>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          label="Total bids"
          value={bids.length}
          description="All submitted proposals"
          icon={FileText}
        />

        <SummaryCard
          label="Awaiting review"
          value={submittedCount}
          description="Currently under review"
          icon={Clock3}
        />

        <SummaryCard
          label="Shortlisted"
          value={shortlistedCount}
          description="Moved to next stage"
          icon={TrendingUp}
        />

        <SummaryCard
          label="Awarded"
          value={awardedCount}
          description={`${rejectedCount} rejected`}
          icon={CheckCircle2}
        />
      </div>

      {/* Bid list */}
      <Card>
        <CardHeader
          title="Submitted bids"
          subtitle="Bids you have submitted and their current status"
          action={
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-xs font-medium text-ink/55 transition-colors hover:bg-ink/[0.03] hover:text-ink"
            >
              <Filter className="h-3.5 w-3.5" />
              Filter
            </button>
          }
        />

        <CardBody>
          {bids.length > 0 ? (
            <BidList bids={bids} />
          ) : (
            <EmptyBidsState />
          )}
        </CardBody>
      </Card>
    </div>
  )
}

interface SummaryCardProps {
  label: string
  value: number
  description: string
  icon: React.ComponentType<{ className?: string }>
}

function SummaryCard({
  label,
  value,
  description,
  icon: Icon,
}: SummaryCardProps) {
  return (
    <Card>
      <CardBody>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-ink/40">
              {label}
            </p>

            <p className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">
              {value}
            </p>

            <p className="mt-1 text-xs text-ink/40">
              {description}
            </p>
          </div>

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink/5">
            <Icon className="h-5 w-5 text-ink/55" />
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

function EmptyBidsState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-line px-6 py-14 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink/5">
        <Gavel className="h-5 w-5 text-ink/40" />
      </div>

      <h3 className="mt-4 font-display text-base font-semibold text-ink">
        No bids submitted yet
      </h3>

      <p className="mt-1 max-w-sm text-xs leading-5 text-ink/40">
        Explore available projects and submit your first proposal to start
        building your contractor record.
      </p>

      <button
        type="button"
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white"
      >
        <Send className="h-3.5 w-3.5" />
        Browse projects
      </button>
    </div>
  )
}