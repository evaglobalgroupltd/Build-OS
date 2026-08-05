import { DashboardLayout } from '@/layouts/DashboardLayout'
import { PurchaseOrders } from '@/modules/procurement/pages/PurchaseOrders'

export function OrdersPage() {
  return (
    <DashboardLayout title="Purchase Orders">
      <PurchaseOrders />
    </DashboardLayout>
  )
}
