import { DashboardLayout } from '@/layouts/DashboardLayout'
import { RiskAlerts } from '@/modules/monitoring/pages/RiskAlerts'

export function RisksPage() {
  return (
    <DashboardLayout title="Risk Alerts">
      <RiskAlerts />
    </DashboardLayout>
  )
}
