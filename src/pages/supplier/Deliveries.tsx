import { DashboardLayout } from '@/layouts/DashboardLayout'
import { Deliveries } from '@/modules/procurement/pages/Deliveries'

export function DeliveriesPage() {
  return (
    <DashboardLayout title="Deliveries">
      <Deliveries />
    </DashboardLayout>
  )
}
