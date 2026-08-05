import { DashboardLayout } from '@/layouts/DashboardLayout'
import { Quotations } from '@/modules/procurement/pages/Quotations'

export function QuotationsPage() {
  return (
    <DashboardLayout title="Quotation Requests">
      <Quotations />
    </DashboardLayout>
  )
}
