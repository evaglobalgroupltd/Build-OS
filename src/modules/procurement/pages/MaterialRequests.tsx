import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { MaterialRequestList } from '@/modules/procurement/components/MaterialRequestList'
import { materialRequests } from '@/data/mockData'

export function MaterialRequests() {
  return (
    <Card>
      <CardHeader title="Material requests" subtitle="Requested, quoted, ordered and delivered materials" />
      <CardBody>
        <MaterialRequestList requests={materialRequests} />
      </CardBody>
    </Card>
  )
}
