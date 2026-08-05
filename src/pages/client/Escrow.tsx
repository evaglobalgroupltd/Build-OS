import { DashboardLayout } from '@/layouts/DashboardLayout'
import { Wallet } from '@/modules/escrow/pages/Wallet'

export function EscrowPage() {
  return (
    <DashboardLayout title="Escrow Wallet">
      <Wallet />
    </DashboardLayout>
  )
}
