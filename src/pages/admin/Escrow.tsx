import { AdminLayout } from '@/layouts/AdminLayout'
import { Wallet } from '@/modules/escrow/pages/Wallet'

export function EscrowPage() {
  return (
    <AdminLayout title="Escrow Oversight">
      <Wallet />
    </AdminLayout>
  )
}
