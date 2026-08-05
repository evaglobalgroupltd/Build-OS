import { DashboardLayout } from '@/layouts/DashboardLayout'
import { AvailableProjects } from '@/modules/bidding/pages/AvailableProjects'

export function ProjectsPage() {
  return (
    <DashboardLayout title="Available Projects">
      <AvailableProjects />
    </DashboardLayout>
  )
}
