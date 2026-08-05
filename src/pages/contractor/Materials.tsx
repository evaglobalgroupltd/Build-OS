import { DashboardLayout } from '@/layouts/DashboardLayout'
import { MaterialRequests } from '@/modules/procurement/pages/MaterialRequests'

export function MaterialsPage() {
  return (
    <DashboardLayout title="Material Requests">
      <MaterialRequests />
    </DashboardLayout>
  )
}
