import { AdminLayout } from '@/layouts/AdminLayout'
import { ProcurementDashboard } from '@/modules/procurement/pages/ProcurementDashboard'

export function ProcurementPage() {
  return (
    <AdminLayout title="Procurement Oversight">
      <ProcurementDashboard />
    </AdminLayout>
  )
}
