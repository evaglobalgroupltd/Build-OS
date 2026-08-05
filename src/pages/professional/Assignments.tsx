import { DashboardLayout } from '@/layouts/DashboardLayout'
import { ServiceInvitations } from '@/modules/professionals/pages/ServiceInvitations'

export function AssignmentsPage() {
  return (
    <DashboardLayout title="Service Invitations">
      <ServiceInvitations />
    </DashboardLayout>
  )
}
