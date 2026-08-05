import { AdminLayout } from '@/layouts/AdminLayout'
import { DisputeList } from '@/modules/disputes/pages/DisputeList'

export function DisputesPage() {
  return (
    <AdminLayout title="Disputes">
      <DisputeList />
    </AdminLayout>
  )
}
