
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

function getStatusDescription(status: keyof typeof statusTone) {
  switch (status) {
    case 'resolved':
      return 'Case resolved and closed'
    case 'under_review':
      return 'Build OS review is in progress'
    case 'escalated':
      return 'Requires elevated intervention'
    default:
      return 'Awaiting review and response'
  }
}

export function DisputeList() {
  if (disputes.length === 0) {
    return (
      <Card className="overflow-hidden rounded-[24px] border-ink/[0.07] shadow-[0_18px_50px_rgba(0,0,0,0.04)]">
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
    <div className="space-y-7">
      {/* ------------------------------------------------------------------ */}
      {/* Command header                                                     */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden rounded-[28px] bg-[#173629] px-6 py-7 text-white shadow-[0_24px_70px_rgba(23,54,41,0.16)] sm:px-8 sm:py-8">
        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full border border-white/[0.06]" />
        <div className="pointer-events-none absolute -right-5 -top-10 h-40 w-40 rounded-full border border-white/[0.05]" />
        <div className="pointer-events-none absolute -bottom-24 left-1/2 h-48 w-48 rounded-full bg-[#B85C12]/10 blur-3xl" />

        <div className="relative">
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D58A52]" />
            Dispute management
          </div>

          <div className="mt-3 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h1 className="font-display text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl">
                Dispute command center
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-white/55">
                Monitor payment, quality, delivery and contractual disputes
                across your active project portfolio.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/65 backdrop-blur-sm">
              <Gavel className="h-3.5 w-3.5 text-[#D58A52]" />
              Case oversight
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Overview metrics                                                    */}
      {/* ------------------------------------------------------------------ */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="group rounded-[20px] border-ink/[0.07] bg-white p-5 shadow-[0_10px_35px_rgba(0,0,0,0.035)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(0,0,0,0.06)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-ink/35">
                Active disputes
              </p>

              <p className="mt-2 font-display text-[30px] font-semibold leading-none tracking-[-0.035em] text-ink">
                {openCount}
              </p>

              <p className="mt-2 text-xs text-ink/40">
                Requires attention or review
              </p>
            </div>

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-[#F7EFE8]">
              <Clock3 className="h-[18px] w-[18px] text-[#B85C12]" />
            </div>
          </div>

          <div className="mt-5 h-1 overflow-hidden rounded-full bg-paper-2">
            <div
              className="h-full rounded-full bg-[#B85C12]"
              style={{
                width: `${Math.min(
                  100,
                  (openCount / Math.max(disputes.length, 1)) * 100,
                )}%`,
              }}
            />
          </div>
        </Card>

        <Card className="group rounded-[20px] border-ink/[0.07] bg-white p-5 shadow-[0_10px_35px_rgba(0,0,0,0.035)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(0,0,0,0.06)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-ink/35">
                Resolved
              </p>

              <p className="mt-2 font-display text-[30px] font-semibold leading-none tracking-[-0.035em] text-ink">
                {resolvedCount}
              </p>

              <p className="mt-2 text-xs text-ink/40">
                Successfully closed disputes
              </p>
            </div>

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-[#EDF5EF]">
              <CheckCircle2 className="h-[18px] w-[18px] text-[#3F775B]" />
            </div>
          </div>

          <div className="mt-5 h-1 overflow-hidden rounded-full bg-paper-2">
            <div
              className="h-full rounded-full bg-[#3F775B]"
              style={{
                width: `${Math.min(
                  100,
                  (resolvedCount / Math.max(disputes.length, 1)) * 100,
                )}%`,
              }}
            />
          </div>
        </Card>

        <Card className="group rounded-[20px] border-ink/[0.07] bg-white p-5 shadow-[0_10px_35px_rgba(0,0,0,0.035)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(0,0,0,0.06)]">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-ink/35">
                Disputed value
              </p>

              <p className="mt-2 truncate font-display text-[30px] font-semibold leading-none tracking-[-0.035em] text-ink">
                {formatAmount(disputedValue)}
              </p>

              <p className="mt-2 text-xs text-ink/40">
                Total value currently recorded
              </p>
            </div>

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-ink/[0.045]">
              <WalletCards className="h-[18px] w-[18px] text-ink/55" />
            </div>
          </div>

          <div className="mt-5 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B85C12]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/35">
              Financial exposure
            </span>
          </div>
        </Card>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Main dispute register                                               */}
      {/* ------------------------------------------------------------------ */}
      <Card className="overflow-hidden rounded-[24px] border-ink/[0.07] bg-white shadow-[0_14px_45px_rgba(0,0,0,0.04)]">
        <CardHeader
          title="Dispute register"
          subtitle="Payment, delivery, quality and project disputes across your projects"
        />

        <CardBody className="space-y-4">
          {disputes.map((dispute) => {
            const project = projects.find(
              (projectItem) => projectItem.id === dispute.projectId,
            )

            const Icon = getStatusIcon(dispute.status)

            return (
              <article
                key={dispute.id}
                className="group relative overflow-hidden rounded-[20px] border border-ink/[0.07] bg-paper-2/60 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/[0.13] hover:bg-white hover:shadow-[0_18px_45px_rgba(0,0,0,0.055)] sm:p-6"
              >
                {/* Subtle status accent */}
                <div
                  className={`absolute inset-y-0 left-0 w-1 ${
                    dispute.status === 'resolved'
                      ? 'bg-[#3F775B]'
                      : dispute.status === 'escalated'
                        ? 'bg-[#B85C12]'
                        : 'bg-amber-500'
                  }`}
                />

                {/* Top section */}
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex min-w-0 gap-3.5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-[#173629] shadow-sm">
                      <Gavel className="h-[18px] w-[18px] text-white" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display text-[15px] font-semibold tracking-[-0.015em] text-ink">
                          {dispute.category}
                        </h3>

                        <Badge tone={statusTone[dispute.status]}>
                          <span className="inline-flex items-center gap-1.5">
                            <Icon className="h-3 w-3" />
                            {statusLabel[dispute.status]}
                          </span>
                        </Badge>
                      </div>

                      <p className="mt-1.5 truncate text-xs text-ink/45">
                        {project?.name ?? dispute.projectId}
                      </p>

                      <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.11em] text-ink/30">
                        {getStatusDescription(dispute.status)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="rounded-full border border-ink/[0.07] bg-white px-3 py-1.5 font-mono text-[10px] font-medium text-ink/40">
                      {dispute.id}
                    </span>

                    <button
                      type="button"
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-ink/[0.07] bg-white text-ink/40 transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/15 hover:bg-ink hover:text-white hover:shadow-md"
                      aria-label={`View dispute ${dispute.id}`}
                    >
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </div>

                {/* Metadata rail */}
                <div className="mt-6 grid gap-3 border-t border-ink/[0.07] pt-5 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-[14px] border border-ink/[0.055] bg-white/70 p-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ink/[0.045]">
                        <ShieldAlert className="h-3.5 w-3.5 text-ink/50" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/30">
                          Raised by
                        </p>
                        <p className="mt-1 truncate text-xs font-medium text-ink">
                          {dispute.raisedBy}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[14px] border border-ink/[0.055] bg-white/70 p-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ink/[0.045]">
                        <FileText className="h-3.5 w-3.5 text-ink/50" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/30">
                          Respondent
                        </p>
                        <p className="mt-1 truncate text-xs font-medium text-ink">
                          {dispute.respondent}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[14px] border border-ink/[0.055] bg-white/70 p-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F7EFE8]">
                        <WalletCards className="h-3.5 w-3.5 text-[#B85C12]" />
                      </div>

                      <div>
                        <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/30">
                          Amount affected
                        </p>
                        <p className="mt-1 font-mono text-xs font-semibold text-ink">
                          {formatAmount(dispute.amount)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[14px] border border-ink/[0.055] bg-white/70 p-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ink/[0.045]">
                        <CalendarDays className="h-3.5 w-3.5 text-ink/50" />
                      </div>

                      <div>
                        <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/30">
                          Opened
                        </p>
                        <p className="mt-1 text-xs font-medium text-ink">
                          {dispute.openedDate}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Workflow */}
                <div className="mt-4 rounded-[16px] border border-ink/[0.055] bg-white/70 px-4 py-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#B85C12]" />

                        <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-ink/35">
                          Dispute workflow
                        </p>
                      </div>

                      <p className="mt-1.5 text-xs leading-5 text-ink/45">
                        Evidence and affected payment lines remain subject to
                        Build OS review.
                      </p>
                    </div>

                    {dispute.status !== 'resolved' ? (
                      <span className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border border-amber-700/10 bg-amber-500/10 px-3 py-1.5 text-[10px] font-semibold text-amber-700">
                        <Clock3 className="h-3 w-3" />
                        Resolution pending
                      </span>
                    ) : (
                      <span className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border border-emerald-700/10 bg-emerald-500/10 px-3 py-1.5 text-[10px] font-semibold text-emerald-700">
                        <CheckCircle2 className="h-3 w-3" />
                        Closed
                      </span>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </CardBody>
      </Card>
    </div>
  )
}
