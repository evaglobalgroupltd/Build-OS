import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { BidList } from '@/modules/bidding/components/BidList'
import { bids } from '@/data/mockData'

export function BidComparison() {
  return (
    <Card>
      <CardHeader title="Bid comparison" subtitle="Compare by cost, timeline, verification and trust score" />
      <CardBody>
        <BidList bids={bids} />
      </CardBody>
    </Card>
  )
}
