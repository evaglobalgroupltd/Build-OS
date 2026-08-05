import { AdminLayout } from '@/layouts/AdminLayout'
import { AdminVerificationQueue } from '@/modules/verification/pages/AdminVerificationQueue'

export function VerificationPage() {
  return (
    <AdminLayout title="Verification Queue">
      <AdminVerificationQueue />
    </AdminLayout>
  )
}
