import { DashboardLayout } from '@/layouts/DashboardLayout'
import { Catalogue } from '@/modules/suppliers/pages/Catalogue'

export function CataloguePage() {
  return (
    <DashboardLayout title="Catalogue">
      <Catalogue />
    </DashboardLayout>
  )
}
