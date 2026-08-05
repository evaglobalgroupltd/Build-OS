import { DashboardLayout } from '@/layouts/DashboardLayout'
import { Passport } from '@/modules/property-passport/pages/Passport'

export function PassportPage() {
  return (
    <DashboardLayout title="Digital Property Passport">
      <Passport />
    </DashboardLayout>
  )
}
