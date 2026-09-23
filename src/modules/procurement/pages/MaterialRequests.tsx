import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Package,
  Plus,
  ShieldCheck,
  Truck,
} from 'lucide-react'
import { type ComponentType } from 'react'

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

  const totalRequests = materialRequests.length

  return (
    <div className="space-y-7 pb-8">
      {/* ---------------------------------------------------------------- */}
      {/* Page introduction                                                */}
      {/* ---------------------------------------------------------------- */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/35">
              Procurement control
            </span>

            <span className="h-1 w-1 rounded-full bg-ink/20" />

            <span className="text-[10px] font-medium text-ink/35">
              {totalRequests} {totalRequests === 1 ? 'request' : 'requests'}
            </span>
          </div>

          <h1 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-ink sm:text-3xl">
            Material requests
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/45">
            Manage material requirements from the initial request through
            supplier fulfilment, site delivery and verification.
          </p>
        </div>

        <button
          type="button"
          className="group inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-ink px-5 text-xs font-semibold text-white shadow-[0_8px_20px_rgba(20,40,30,0.14)] transition-all hover:-translate-y-0.5 hover:bg-ink/90 focus:outline-none focus:ring-4 focus:ring-ink/[0.08]"
        >
          <Plus className="h-3.5 w-3.5" />
          Create request
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Procurement overview                                             */}
      {/* ---------------------------------------------------------------- */}
      <Card className="overflow-hidden border-ink/[0.08] bg-white shadow-[0_16px_40px_rgba(20,40,30,0.055)]">
        <div className="grid lg:grid-cols-[1.05fr_1.95fr]">
          {/* Overview statement */}
          <div className="relative overflow-hidden bg-ink px-6 py-7 text-white sm:px-7">
            <div className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-white/[0.055] blur-3xl" />

            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-[13px] border border-white/10 bg-white/[0.08]">
                <Package className="h-4 w-4 text-white/75" />
              </div>

              <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
                Procurement overview
              </p>

              <p className="mt-2 max-w-xs text-2xl font-semibold tracking-[-0.035em] text-white">
                Keep every material movement visible.
              </p>

              <p className="mt-3 max-w-sm text-xs leading-5 text-white/45">
                Track requests, supplier activity, deliveries and verification
                without losing the relationship between each procurement
                stage.
              </p>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 divide-x divide-y divide-ink/[0.06] sm:grid-cols-4 sm:divide-y-0">
            <SummaryCard
              icon={Clock3}
              label="Requested"
              value={requested}
              description="Awaiting review"
              accent="amber"
            />

            <SummaryCard
              icon={Package}
              label="Active"
              value={active}
              description="In procurement"
              accent="ink"
            />

            <SummaryCard
              icon={Truck}
              label="Delivered"
              value={delivered}
              description="Received on site"
              accent="amber"
            />

            <SummaryCard
              icon={CheckCircle2}
              label="Verified"
              value={completed}
              description="Workflow completed"
              accent="teal"
            />
          </div>
        </div>
      </Card>

      {/* ---------------------------------------------------------------- */}
      {/* Request list                                                      */}
      {/* ---------------------------------------------------------------- */}
      <Card className="overflow-hidden border-ink/[0.07] shadow-[0_12px_30px_rgba(20,40,30,0.045)]">
        <CardHeader
          title="Material requests"
          subtitle="Requested, quoted, ordered and delivered materials"
          action={
            <div className="flex items-center gap-2">
              <span className="hidden rounded-full border border-ink/[0.07] bg-ink/[0.02] px-2.5 py-1 text-[10px] font-semibold text-ink/40 sm:inline-flex">
                {totalRequests} total
              </span>

              <button
                type="button"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-3.5 py-2 text-[11px] font-semibold text-white shadow-[0_5px_14px_rgba(20,40,30,0.1)] transition-all hover:-translate-y-0.5 hover:bg-ink/90 focus:outline-none focus:ring-4 focus:ring-ink/[0.05]"
              >
                <Plus className="h-3 w-3" />
                New request
                <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          }
        />

        <CardBody>
          <MaterialRequestList requests={materialRequests} />
        </CardBody>
      </Card>

      {/* ---------------------------------------------------------------- */}
      {/* Procurement workflow                                             */}
      {/* ---------------------------------------------------------------- */}
      <Card className="overflow-hidden border-ink/[0.07] shadow-[0_12px_30px_rgba(20,40,30,0.045)]">
        <CardHeader
          title="Procurement lifecycle"
          subtitle="A controlled path from material requirement to verified receipt."
        />

        <CardBody>
          <div className="grid gap-3 md:grid-cols-5 md:gap-0">
            <WorkflowStep
              number="01"
              label="Request"
              description="Material need raised"
              state="active"
            />

            <WorkflowConnector />

            <WorkflowStep
              number="02"
              label="Approval"
              description="Request reviewed"
            />

            <WorkflowConnector />

            <WorkflowStep
              number="03"
              label="Quotation"
              description="Supplier pricing"
            />

            <WorkflowConnector />

            <WorkflowStep
              number="04"
              label="Delivery"
              description="Materials reach site"
            />

            <WorkflowConnector />

            <WorkflowStep
              number="05"
              label="Verification"
              description="Quantity & condition confirmed"
              icon={ShieldCheck}
            />
          </div>
        </CardBody>
      </Card>

      {/* ---------------------------------------------------------------- */}
      {/* Operational footer                                               */}
      {/* ---------------------------------------------------------------- */}
      <div className="grid gap-4 lg:grid-cols-3">
        <OperationalCard
          icon={Clock3}
          eyebrow="Attention"
          title={`${requested} request${requested === 1 ? '' : 's'} awaiting review`}
          description="Review new material requirements before procurement activity begins."
          tone="amber"
        />

        <OperationalCard
          icon={Truck}
          eyebrow="In motion"
          title={`${active} active procurement${active === 1 ? '' : 's'}`}
          description="Requests currently moving through approval, quotation or delivery."
          tone="default"
        />

        <OperationalCard
          icon={ShieldCheck}
          eyebrow="Control"
          title={`${completed} verified`}
          description="Completed requests have passed through the verification workflow."
          tone="teal"
        />
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Summary card                                                               */
/* -------------------------------------------------------------------------- */

function SummaryCard({
  icon: Icon,
  label,
  value,
  description,
  accent = 'default',
}: {
  icon: ComponentType<{ className?: string }>
  label: string
  value: number
  description: string
  accent?: 'default' | 'amber' | 'teal'
}) {
  const accentStyles = {
    default: {
      icon: 'bg-ink/[0.045] text-ink/45',
      value: 'text-ink',
      rail: 'bg-ink/20',
    },
    amber: {
      icon: 'bg-[#F7EFE8] text-amber-700',
      value: 'text-ink',
      rail: 'bg-amber-600/50',
    },
    teal: {
      icon: 'bg-[#EAF4EE] text-teal-700',
      value: 'text-ink',
      rail: 'bg-teal-700/50',
    },
  }

  const styles = accentStyles[accent]

  return (
    <div className="relative min-h-[155px] p-5 sm:p-6">
      <div
        className={`absolute bottom-5 left-0 top-5 w-[2px] rounded-full ${styles.rail}`}
      />

      <div className="flex items-start justify-between gap-3">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-[11px] ${styles.icon}`}
        >
          <Icon className="h-4 w-4" />
        </div>

        <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/25">
          Live
        </span>
      </div>

      <div className="mt-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-ink/35">
          {label}
        </p>

        <p
          className={`mt-1 text-2xl font-semibold tracking-[-0.04em] ${styles.value}`}
        >
          {String(value).padStart(2, '0')}
        </p>

        <p className="mt-1 text-[10px] text-ink/35">
          {description}
        </p>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Workflow                                                                   */
/* -------------------------------------------------------------------------- */

function WorkflowStep({
  number,
  label,
  description,
  state = 'default',
  icon: Icon,
}: {
  number: string
  label: string
  description: string
  state?: 'default' | 'active'
  icon?: ComponentType<{ className?: string }>
}) {
  const StepIcon = Icon ?? Package
  const isActive = state === 'active'

  return (
    <div
      className={`relative flex min-w-0 items-center gap-3 rounded-[16px] border p-3.5 transition-colors ${
        isActive
          ? 'border-ink/[0.09] bg-ink/[0.025]'
          : 'border-transparent bg-transparent'
      }`}
    >
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] font-mono text-[10px] font-semibold ${
          isActive
            ? 'bg-ink text-white'
            : 'bg-ink/[0.045] text-ink/35'
        }`}
      >
        {number}
      </span>

      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <p className="truncate text-xs font-semibold text-ink">
            {label}
          </p>

          {isActive && (
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600" />
          )}
        </div>

        <p className="mt-1 line-clamp-2 text-[10px] leading-4 text-ink/35">
          {description}
        </p>
      </div>

      {Icon && (
        <StepIcon className="ml-auto hidden h-3.5 w-3.5 shrink-0 text-ink/20 xl:block" />
      )}
    </div>
  )
}

function WorkflowConnector() {
  return (
    <div className="hidden items-center justify-center md:flex">
      <div className="flex w-full items-center px-1">
        <div className="h-px flex-1 bg-ink/[0.08]" />

        <ArrowRight className="mx-1 h-3 w-3 shrink-0 text-ink/20" />

        <div className="h-px flex-1 bg-ink/[0.08]" />
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Operational cards                                                          */
/* -------------------------------------------------------------------------- */

function OperationalCard({
  icon: Icon,
  eyebrow,
  title,
  description,
  tone = 'default',
}: {
  icon: ComponentType<{ className?: string }>
  eyebrow: string
  title: string
  description: string
  tone?: 'default' | 'amber' | 'teal'
}) {
  const styles = {
    default: {
      icon: 'bg-ink/[0.045] text-ink/45',
      border: 'border-ink/[0.07]',
    },
    amber: {
      icon: 'bg-[#F7EFE8] text-amber-700',
      border: 'border-amber-700/[0.08]',
    },
    teal: {
      icon: 'bg-[#EAF4EE] text-teal-700',
      border: 'border-teal-700/[0.08]',
    },
  }

  const style = styles[tone]

  return (
    <div
      className={`rounded-[20px] border bg-white p-5 shadow-[0_8px_24px_rgba(20,40,30,0.035)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(20,40,30,0.055)] ${style.border}`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] ${style.icon}`}
        >
          <Icon className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-ink/30">
            {eyebrow}
          </p>

          <p className="mt-1.5 text-xs font-semibold leading-5 text-ink">
            {title}
          </p>

          <p className="mt-1 text-[10px] leading-4 text-ink/35">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}