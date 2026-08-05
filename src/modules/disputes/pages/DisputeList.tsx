import { Gavel } from 'lucide-react'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/EmptyState'
import { disputes, projects } from '@/data/mockData'

const statusTone = {
  open: 'brick',
  under_review: 'amber',
  resolved: 'teal',
  escalated: 'brick',
} as const

export function DisputeList() {
  if (disputes.length === 0) {
    return (
      <Card>
        <EmptyState icon={Gavel} title="No disputes" description="You have no open or past disputes." />
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader title="Disputes" subtitle="Across all your projects" />
      <CardBody className="space-y-3">
        {disputes.map((d) => {
          const project = projects.find((p) => p.id === d.projectId)
          return (
            <div key={d.id} className="rounded-md border border-line p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-display text-sm font-semibold text-ink">{d.category}</p>
                  <p className="mt-0.5 text-xs text-ink/50">{project?.name ?? d.projectId}</p>
                </div>
                <Badge tone={statusTone[d.status]}>{d.status.replace('_', ' ')}</Badge>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-ink/50">
                <span>Raised by {d.raisedBy}</span>
                <span>vs {d.respondent}</span>
                <span className="font-mono">₦{(d.amount / 1_000_000).toFixed(2)}M in dispute</span>
                <span>Opened {d.openedDate}</span>
              </div>
            </div>
          )
        })}
      </CardBody>
    </Card>
  )
}
