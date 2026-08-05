import { DashboardLayout } from '@/layouts/DashboardLayout'
import { MilestoneList } from '@/modules/milestones/pages/MilestoneList'

export function MilestonesPage() {
  return (
    <DashboardLayout title="Active Milestones">
      <MilestoneList />
    </DashboardLayout>
  )
}
