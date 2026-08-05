import { DashboardLayout } from '@/layouts/DashboardLayout'
import { ProjectList } from '@/modules/projects/pages/ProjectList'

export function ProjectsPage() {
  return (
    <DashboardLayout title="Assigned Projects">
      <ProjectList />
    </DashboardLayout>
  )
}
