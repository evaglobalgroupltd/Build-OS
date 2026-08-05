import { AdminLayout } from '@/layouts/AdminLayout'
import { Compliance } from '@/modules/admin/pages/Compliance'

export function CompliancePage() {
  return (
    <AdminLayout title="Compliance">
      <Compliance />
    </AdminLayout>
  )
}
