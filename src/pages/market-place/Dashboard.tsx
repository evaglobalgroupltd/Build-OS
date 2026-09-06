import { Boxes, FileText, Truck, Wallet } from 'lucide-react'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { StatCard } from '@/components/ui/StatCard'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { MaterialRequestList } from '@/modules/procurement/components/MaterialRequestList'
import { materialRequests } from '@/data/mockData'
import { useAuth } from '@/context/AuthContext'

export function MarketDashboard() {
  const { user } = useAuth()

  return (
    <DashboardLayout title="Overview">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-ink/50">Welcome back, {user.fullName.split(' ')[0]}.</p>
        {user.verificationStatus !== 'verified' && (
          <Badge tone="amber">Business verification pending</Badge>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Catalogue items" value="42" icon={Boxes} tone="ink" />
        <StatCard label="Open quotation requests" value="2" icon={FileText} tone="amber" />
        <StatCard label="Deliveries in transit" value="1" icon={Truck} tone="teal" />
        <StatCard label="Payments pending" value="₦1.8M" icon={Wallet} tone="amber" />
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader title="Material requests" subtitle="Requests routed to your catalogue" />
          <CardBody>
            <MaterialRequestList requests={materialRequests} />
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  )
}
