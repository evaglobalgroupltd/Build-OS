import { DashboardLayout } from '@/layouts/DashboardLayout'
import { Inspections } from '@/modules/monitoring/pages/Inspections'

export function InspectionsPage() {
  return (
    <DashboardLayout title="Inspections">
      <Inspections />
    </DashboardLayout>
  )
}
