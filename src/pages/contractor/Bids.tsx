import { DashboardLayout } from '@/layouts/DashboardLayout'
import { MyBids } from '@/modules/bidding/pages/MyBids'

export function BidsPage() {
  return (
    <DashboardLayout title="My Bids">
      <MyBids />
    </DashboardLayout>
  )
}
