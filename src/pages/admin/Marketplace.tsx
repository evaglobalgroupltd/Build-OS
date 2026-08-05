import { Boxes } from 'lucide-react'
import { AdminLayout } from '@/layouts/AdminLayout'
import { PlaceholderPage } from '@/components/feedback/PlaceholderPage'

// No single module maps to this view yet — it aggregates data across
// several modules (contractors + suppliers). Build it out once those
// modules have real list pages to compose.
export function MarketplacePage() {
  return (
    <AdminLayout title="Marketplace">
      <PlaceholderPage
        icon={Boxes}
        title="Marketplace"
        description="Cross-module view combining the contractor and supplier marketplaces."
        brdReference="Sec. 39"
      />
    </AdminLayout>
  )
}
