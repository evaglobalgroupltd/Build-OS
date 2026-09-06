import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Package,
  Plus,
  Truck,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { MaterialRequestList } from '@/modules/procurement/components/MaterialRequestList'
import { materialRequests } from '@/data/mockData'

export function MaterialRequests() {
  const requested = materialRequests.filter(
    (request) => request.status === 'requested',
  ).length

  const active = materialRequests.filter((request) =>
    ['approved', 'quoted', 'fund reserved', 'in transit'].includes(
      request.status,
    ),
  ).length

  const delivered = materialRequests.filter((request) =>
    ['delivered', 'verified', 'accepted'].includes(request.status),
  ).length

  const completed = materialRequests.filter((request) =>
    ['verified', 'accepted'].includes(request.status),
  ).length

  return (
    <div className="space-y-6">
      {/* Overview */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          icon={Clock3}
          label="Requested"
          value={requested}
          description="Awaiting procurement review"
        />

        <SummaryCard
          icon={Package}
          label="Active"
          value={active}
          description="Approved through delivery"
        />

        <SummaryCard
          icon={Truck}
          label="Delivered"
          value={delivered}
          description="Materials received on site"
        />

        <SummaryCard
          icon={CheckCircle2}
          label="Verified"
          value={completed}
          description="Ready for completed workflow"
        />
      </div>

      {/* Requests */}
      <Card className="overflow-hidden">
        <CardHeader
          title="Material requests"
          subtitle="Requested, quoted, ordered and delivered materials"
          action={
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl bg-ink px-3.5 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
            >
              <Plus className="h-3.5 w-3.5" />
              Create request
            </button>
          }
        />

        <CardBody>
          <MaterialRequestList requests={materialRequests} />
        </CardBody>
      </Card>

      {/* Procurement workflow */}
      <Card>
        <CardHeader
          title="Procurement workflow"
          subtitle="Requests move through review, supplier selection, delivery and verification."
        />

        <CardBody>
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <WorkflowStep
              number="01"
              label="Request"
              description="Material need raised"
            />

            <ArrowRight className="hidden h-4 w-4 shrink-0 text-ink/20 md:block" />

            <WorkflowStep
              number="02"
              label="Approval"
              description="Request reviewed"
            />

            <ArrowRight className="hidden h-4 w-4 shrink-0 text-ink/20 md:block" />

            <WorkflowStep
              number="03"
              label="Quotation"
              description="Supplier pricing"
            />

            <ArrowRight className="hidden h-4 w-4 shrink-0 text-ink/20 md:block" />

            <WorkflowStep
              number="04"
              label="Delivery"
              description="Materials reach site"
            />

            <ArrowRight className="hidden h-4 w-4 shrink-0 text-ink/20 md:block" />

            <WorkflowStep
              number="05"
              label="Verification"
              description="Quantity & condition confirmed"
            />
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: number
  description: string
}) {
  return (
    <Card>
      <div className="p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5">
            <Icon className="h-4 w-4 text-ink/50" />
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
              {label}
            </p>

            <p className="mt-0.5 text-xl font-semibold text-ink">
              {value}
            </p>
          </div>
        </div>

        <p className="mt-3 text-xs text-ink/40">{description}</p>
      </div>
    </Card>
  )
}

function WorkflowStep({
  number,
  label,
  description,
}: {
  number: string
  label: string
  description: string
}) {
  return (
    <div className="flex min-w-0 flex-1 items-center gap-3 rounded-xl bg-ink/[0.03] p-3">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white font-mono text-[10px] font-semibold text-ink/40">
        {number}
      </span>

      <div className="min-w-0">
        <p className="text-xs font-semibold text-ink">{label}</p>

        <p className="mt-0.5 truncate text-[10px] text-ink/40">
          {description}
        </p>
      </div>
    </div>
  )
}