import { AdminLayout } from '@/layouts/AdminLayout'
import { Users } from '@/modules/admin/pages/Users'

export function UsersPage() {
  return (
    <AdminLayout title="Manage Users">
      <Users />
    </AdminLayout>
  )
}
