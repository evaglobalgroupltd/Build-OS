import { DashboardLayout } from '@/layouts/DashboardLayout'
import { Transactions } from '@/modules/escrow/pages/Transactions'

export function PaymentsPage() {
  return (
    <DashboardLayout title="Payments">
      <Transactions />
    </DashboardLayout>
  )
}
