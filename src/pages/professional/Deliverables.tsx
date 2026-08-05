import { DashboardLayout } from '@/layouts/DashboardLayout'
import { Deliverables } from '@/modules/professionals/pages/Deliverables'

export function DeliverablesPage() {
  return (
    <DashboardLayout title="Deliverables">
      <Deliverables />
    </DashboardLayout>
  )
}
