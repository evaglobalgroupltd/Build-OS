import { DashboardLayout } from '@/layouts/DashboardLayout'
import { MilestoneReview } from '@/modules/milestones/pages/MilestoneReview'

export function MilestonesPage() {
  return (
    <DashboardLayout title="Milestone Verification">
      <MilestoneReview />
    </DashboardLayout>
  )
}
