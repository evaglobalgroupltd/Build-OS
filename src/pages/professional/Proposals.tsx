import { DashboardLayout } from '@/layouts/DashboardLayout'
import { Proposals } from '@/modules/professionals/pages/Proposals'

export function ProposalsPage() {
  return (
    <DashboardLayout title="Proposals">
      <Proposals />
    </DashboardLayout>
  )
}
