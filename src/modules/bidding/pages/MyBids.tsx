import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { BidList } from '@/modules/bidding/components/BidList'
import { bids } from '@/data/mockData'

export function MyBids() {
  return (
    <Card>
      <CardHeader title="My bids" subtitle="Bids you have submitted and their current status" />
      <CardBody>
        <BidList bids={bids} />
      </CardBody>
    </Card>
  )
}
