import type { Bid } from '@/modules/bidding/types'
import { Badge } from '@/components/ui/Badge'

const bidStatusTone = {
  submitted: 'neutral',
  shortlisted: 'amber',
  clarification: 'amber',
  awarded: 'teal',
  rejected: 'brick',
} as const

export function BidList({ bids }: { bids: Bid[] }) {
  return (
    <div className="space-y-3">
      {bids.map((b) => (
        <div key={b.id} className="flex items-center justify-between rounded-md border border-line p-3">
          <div>
            <p className="text-sm font-medium text-ink">{b.contractorName}</p>
            <p className="mt-0.5 font-mono text-xs text-ink/50">
              {b.currency === 'NGN' ? '₦' : '$'}
              {(b.amount / 1_000_000).toFixed(1)}M · {b.timelineWeeks} wks
            </p>
          </div>
          <div className="flex items-center gap-3">
            {b.verified && <Badge tone="teal">Verified</Badge>}
            <Badge tone={bidStatusTone[b.status]}>{b.status}</Badge>
          </div>
        </div>
      ))}
    </div>
  )
}
