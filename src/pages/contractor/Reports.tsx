import { DashboardLayout } from '@/layouts/DashboardLayout'
import { ProjectReports } from '@/modules/reports/pages/ProjectReports'

export function ReportsPage() {
  return (
    <DashboardLayout title="Reports">
      <ProjectReports />
    </DashboardLayout>
  )
}
