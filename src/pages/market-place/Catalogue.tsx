import { DashboardLayout } from '@/layouts/DashboardLayout'
import { Catalogue } from '@/modules/market/pages/Catalogue'

export function CataloguePage() {
  return (
    <DashboardLayout title="Catalogue">
      <Catalogue />
    </DashboardLayout>
  )
}
