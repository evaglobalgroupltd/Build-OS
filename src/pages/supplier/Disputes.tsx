import { DashboardLayout } from '@/layouts/DashboardLayout'
import { DisputeList } from '@/modules/disputes/pages/DisputeList'

export function DisputesPage() {
  return (
    <DashboardLayout title="Disputes">
      <DisputeList />
    </DashboardLayout>
  )
}
