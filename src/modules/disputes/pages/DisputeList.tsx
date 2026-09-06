import {
  AlertTriangle,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Gavel,
  ShieldAlert,
  WalletCards,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/EmptyState'
import { disputes, projects } from '@/data/mockData'

const statusTone = {
  open: 'brick',
  under_review: 'amber',
  resolved: 'teal',
  escalated: 'brick',
} as const

const statusLabel = {
  open: 'Dispute opened',
  under_review: 'Under review',
  resolved: 'Resolved',
  escalated: 'Escalated',
} as const

function formatAmount(amount: number) {
  if (amount >= 1_000_000) {
    return `₦${(amount / 1_000_000).toFixed(2)}M`
  }

  if (amount >= 1_000) {
    return `₦${(amount / 1_000).toFixed(0)}K`
  }

  return `₦${amount.toLocaleString()}`
}

function getStatusIcon(status: keyof typeof statusTone) {
  switch (status) {
    case 'resolved':
      return CheckCircle2
    case 'under_review':
      return Clock3
    case 'escalated':
      return ShieldAlert
    default:
      return AlertTriangle
  }
}

export function DisputeList() {
  if (disputes.length === 0) {
    return (
      <Card>
        <EmptyState
          icon={Gavel}
          title="No disputes"
          description="You have no open or past disputes. Project payments and activities are currently clear."
        />
      </Card>
    )
  }

  const openCount = disputes.filter(
    (dispute) =>
      dispute.status === 'open' || dispute.status === 'under_review',
  ).length

  const resolvedCount = disputes.filter(
    (dispute) => dispute.status === 'resolved',
  ).length

  const disputedValue = disputes.reduce(
    (total, dispute) => total + dispute.amount,
    0,
  )

  return (
    <div className="space-y-6">
      {/* Overview */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/40">
                Active disputes
              </p>

              <p className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">
                {openCount}
              </p>

              <p className="mt-1 text-xs text-ink/40">
                Requires attention or review
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10">
              <Clock3 className="h-5 w-5 text-amber-700" />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/40">
                Resolved
              </p>

              <p className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">
                {resolvedCount}
              </p>

              <p className="mt-1 text-xs text-ink/40">
                Successfully closed disputes
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
              <CheckCircle2 className="h-5 w-5 text-emerald-700" />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/40">
                Disputed value
              </p>

              <p className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">
                {formatAmount(disputedValue)}
              </p>

              <p className="mt-1 text-xs text-ink/40">
                Total value currently recorded
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink/5">
              <WalletCards className="h-5 w-5 text-ink/60" />
            </div>
          </div>
        </Card>
      </div>

      {/* Main dispute list */}
      <Card className="overflow-hidden">
        <CardHeader
          title="Disputes"
          subtitle="Payment, delivery, quality and project disputes across your projects"
        />

        <CardBody className="space-y-4">
          {disputes.map((dispute) => {
            const project = projects.find(
              (projectItem) => projectItem.id === dispute.projectId,
            )

            const Icon = getStatusIcon(dispute.status)

            return (
              <div
                key={dispute.id}
                className="group rounded-2xl border border-line bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/15 hover:shadow-[0_12px_35px_rgba(0,0,0,0.06)]"
              >
                {/* Top row */}
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex min-w-0 gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink/5">
                      <Gavel className="h-5 w-5 text-ink/60" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display text-sm font-semibold text-ink">
                          {dispute.category}
                        </h3>

                        <Badge tone={statusTone[dispute.status]}>
                          <span className="inline-flex items-center gap-1.5">
                            <Icon className="h-3 w-3" />
                            {statusLabel[dispute.status]}
                          </span>
                        </Badge>
                      </div>

                      <p className="mt-1 text-xs text-ink/45">
                        {project?.name ?? dispute.projectId}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="rounded-full border border-line bg-paper-2 px-2.5 py-1 font-mono text-[10px] font-medium text-ink/45">
                      {dispute.id}
                    </span>

                    <button
                      type="button"
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-line text-ink/45 transition-colors hover:bg-ink/5 hover:text-ink"
                      aria-label={`View dispute ${dispute.id}`}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Metadata */}
                <div className="mt-5 grid gap-3 border-t border-line pt-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink/5">
                      <ShieldAlert className="h-3.5 w-3.5 text-ink/50" />
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-wide text-ink/35">
                        Raised by
                      </p>
                      <p className="mt-0.5 text-xs font-medium text-ink">
                        {dispute.raisedBy}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink/5">
                      <FileText className="h-3.5 w-3.5 text-ink/50" />
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-wide text-ink/35">
                        Respondent
                      </p>
                      <p className="mt-0.5 text-xs font-medium text-ink">
                        {dispute.respondent}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink/5">
                      <WalletCards className="h-3.5 w-3.5 text-ink/50" />
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-wide text-ink/35">
                        Amount affected
                      </p>
                      <p className="mt-0.5 font-mono text-xs font-semibold text-ink">
                        {formatAmount(dispute.amount)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink/5">
                      <CalendarDays className="h-3.5 w-3.5 text-ink/50" />
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-wide text-ink/35">
                        Opened
                      </p>
                      <p className="mt-0.5 text-xs font-medium text-ink">
                        {dispute.openedDate}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Workflow indicator */}
                <div className="mt-5 rounded-xl bg-paper-2 px-4 py-3">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/35">
                        Dispute workflow
                      </p>

                      <p className="mt-1 text-xs text-ink/50">
                        Evidence and affected payment lines remain subject to
                        Build OS review.
                      </p>
                    </div>

                    {dispute.status !== 'resolved' && (
                      <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-1 text-[10px] font-semibold text-amber-700">
                        <Clock3 className="h-3 w-3" />
                        Resolution pending
                      </span>
                    )}

                    {dispute.status === 'resolved' && (
                      <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                        <CheckCircle2 className="h-3 w-3" />
                        Closed
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </CardBody>
      </Card>
    </div>
  )
}