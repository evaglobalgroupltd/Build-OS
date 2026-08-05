import { DashboardLayout } from '@/layouts/DashboardLayout'
import { MaterialRequests } from '@/modules/procurement/pages/MaterialRequests'

export function ProcurementPage() {
  return (
    <DashboardLayout title="Procurement">
      <MaterialRequests />
    </DashboardLayout>
  )
}
