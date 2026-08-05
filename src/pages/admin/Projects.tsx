import { AdminLayout } from '@/layouts/AdminLayout'
import { ProjectList } from '@/modules/projects/pages/ProjectList'

export function ProjectsPage() {
  return (
    <AdminLayout title="All Projects">
      <ProjectList />
    </AdminLayout>
  )
}
