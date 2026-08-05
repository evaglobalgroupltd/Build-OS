import { Search, Gavel, ListChecks, Wallet } from 'lucide-react'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { StatCard } from '@/components/ui/StatCard'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { TrustScore } from '@/components/ui/TrustScore'
import { BidList } from '@/modules/bidding/components/BidList'
import { MaterialRequestList } from '@/modules/procurement/components/MaterialRequestList'
import { bids, materialRequests } from '@/data/mockData'
import { useAuth } from '@/context/AuthContext'

export function ContractorDashboard() {
  const { user } = useAuth()

  return (
    <DashboardLayout title="Overview">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-ink/50">Welcome back, {user.fullName.split(' ')[0]}.</p>
        <TrustScore score={user.trustScore} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Available projects" value="6" icon={Search} tone="ink" />
        <StatCard label="Active bids" value={String(bids.length)} icon={Gavel} tone="amber" />
        <StatCard label="Milestones in progress" value="3" icon={ListChecks} tone="teal" />
        <StatCard label="Payments this month" value="₦8.0M" icon={Wallet} tone="teal" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Bid comparison" subtitle="Abuja Terrace (3 Units) — p-1002" />
          <CardBody>
            <BidList bids={bids} />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Material requests" subtitle="On the Lekki Duplex build" />
          <CardBody>
            <MaterialRequestList requests={materialRequests} />
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  )
}
