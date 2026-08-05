import { DashboardLayout } from '@/layouts/DashboardLayout'
import { EvidenceLibrary } from '@/modules/evidence/pages/EvidenceLibrary'

export function EvidencePage() {
  return (
    <DashboardLayout title="Evidence">
      <EvidenceLibrary />
    </DashboardLayout>
  )
}
