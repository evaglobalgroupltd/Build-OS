import { AdminLayout } from '@/layouts/AdminLayout'
import { Overview } from '@/modules/analytics/pages/Overview'

export function AnalyticsPage() {
  return (
    <AdminLayout title="Analytics">
      <Overview />
    </AdminLayout>
  )
}
