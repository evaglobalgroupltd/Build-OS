import { AdminLayout } from '@/layouts/AdminLayout'
import { ManagementReports } from '@/modules/reports/pages/ManagementReports'

export function ReportsPage() {
  return (
    <AdminLayout title="Reports">
      <ManagementReports />
    </AdminLayout>
  )
}
