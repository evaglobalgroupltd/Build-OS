import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Download,
  FileSearch,
  ShieldCheck,
  Scale,
  Users,
  Wallet,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'

const auditSummary = [
  {
    label: 'Audit Events',
    value: '28,451',
    icon: Activity,
    tone: 'ink',
    detail: 'Platform-wide activity',
  },
  {
    label: 'Compliance Logs',
    value: '4,102',
    icon: ShieldCheck,
    tone: 'teal',
    detail: 'Verification & controls',
  },
  {
    label: 'Escrow Actions',
    value: '8,933',
    icon: Wallet,
    tone: 'amber',
    detail: 'Financial activity',
  },
  {
    label: 'Dispute Records',
    value: '247',
    icon: Scale,
    tone: 'brick',
    detail: 'Case history',
  },
] as const

const recentAuditEvents = [
  {
    action: 'Escrow Release Approved',
    actor: 'Build OS Admin',
    category: 'Escrow',
    date: '2026-08-24 14:33',
    status: 'Completed',
    tone: 'complete',
  },
  {
    action: 'Supplier Verification Approved',
    actor: 'Compliance Officer',
    category: 'Verification',
    date: '2026-08-24 12:08',
    status: 'Completed',
    tone: 'complete',
  },
  {
    action: 'Dispute Escalated',
    actor: 'Dispute Officer',
    category: 'Dispute',
    date: '2026-08-24 10:11',
    status: 'Under Review',
    tone: 'review',
  },
  {
    action: 'Contractor Suspended',
    actor: 'Risk Team',
    category: 'Compliance',
    date: '2026-08-23 18:20',
    status: 'Flagged',
    tone: 'flagged',
  },
] as const

const statusStyles = {
  complete: {
    badge: 'bg-[#EAF4EE] text-[#12613E]',
    dot: 'bg-[#12613E]',
    icon: CheckCircle2,
  },
  review: {
    badge: 'bg-[#F8EEE6] text-[#B85C12]',
    dot: 'bg-[#B85C12]',
    icon: Clock3,
  },
  flagged: {
    badge: 'bg-brick-light/50 text-brick',
    dot: 'bg-brick',
    icon: AlertTriangle,
  },
} as const

const summaryToneStyles = {
  ink: {
    icon: 'bg-ink/[0.05] text-ink/60',
    value: 'text-ink',
  },
  teal: {
    icon: 'bg-[#EAF4EE] text-[#12613E]',
    value: 'text-[#12613E]',
  },
  amber: {
    icon: 'bg-[#F8EEE6] text-[#B85C12]',
    value: 'text-[#B85C12]',
  },
  brick: {
    icon: 'bg-brick-light/40 text-brick',
    value: 'text-brick',
  },
} as const

export function AuditReports() {
  return (
    <div className="space-y-7">

      {/* ========================================================= */}
      {/* Page introduction / command bar                           */}
      {/* ========================================================= */}

      <section
        aria-label="Audit reports overview"
        className="
          relative
          overflow-hidden
          rounded-[24px]
          border
          border-ink/[0.07]
          bg-white
          shadow-[0_18px_50px_rgba(20,40,30,0.055)]
        "
      >
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#12613E]/[0.035] blur-3xl" />

        <div className="relative flex flex-col gap-6 p-5 sm:p-6 lg:flex-row lg:items-end lg:justify-between lg:p-7">

          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#12613E]" />

              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/40">
                Governance & control
              </p>
            </div>

            <h1 className="font-display text-[28px] font-semibold leading-tight tracking-[-0.035em] text-ink sm:text-[32px]">
              Audit reports
            </h1>

            <p className="mt-2 max-w-2xl text-[12px] leading-5 text-ink/50">
              Immutable audit trails, compliance records and platform activity
              across Build OS.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">

            <button
              type="button"
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-ink
                px-4
                py-2.5
                text-xs
                font-semibold
                text-white
                shadow-[0_8px_20px_rgba(24,39,31,0.12)]
                transition
                duration-200
                hover:-translate-y-0.5
                hover:opacity-90
              "
            >
              <Download className="h-3.5 w-3.5" />
              Export audit log
            </button>

            <button
              type="button"
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-ink/[0.09]
                bg-white
                px-4
                py-2.5
                text-xs
                font-semibold
                text-ink
                transition
                duration-200
                hover:-translate-y-0.5
                hover:border-ink/20
                hover:shadow-sm
              "
            >
              <FileSearch className="h-3.5 w-3.5" />
              Advanced search
            </button>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* Executive metrics                                         */}
      {/* ========================================================= */}

      <section
        aria-label="Audit summary"
        className="grid grid-cols-2 gap-3 lg:grid-cols-4"
      >
        {auditSummary.map((item) => {
          const Icon = item.icon
          const tone = summaryToneStyles[item.tone]

          return (
            <Card
              key={item.label}
              className="
                group
                overflow-hidden
                transition
                duration-300
                hover:-translate-y-0.5
                hover:shadow-[0_15px_35px_rgba(20,40,30,0.07)]
              "
            >
              <CardBody className="relative p-4 sm:p-5">

                <div className="flex items-start justify-between gap-3">

                  <div
                    className={[
                      'flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px]',
                      tone.icon,
                    ].join(' ')}
                  >
                    <Icon className="h-[17px] w-[17px]" />
                  </div>

                  <ArrowUpRight
                    className="
                      h-3.5
                      w-3.5
                      text-ink/20
                      transition
                      duration-200
                      group-hover:-translate-y-0.5
                      group-hover:translate-x-0.5
                      group-hover:text-ink/40
                    "
                  />

                </div>

                <div className="mt-5">

                  <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-ink/40">
                    {item.label}
                  </p>

                  <p
                    className={[
                      'mt-1 font-display text-[25px] font-semibold tracking-[-0.035em]',
                      tone.value,
                    ].join(' ')}
                  >
                    {item.value}
                  </p>

                  <p className="mt-1 text-[10px] text-ink/40">
                    {item.detail}
                  </p>

                </div>
              </CardBody>
            </Card>
          )
        })}
      </section>

      {/* ========================================================= */}
      {/* Activity timeline                                         */}
      {/* ========================================================= */}

      <Card className="overflow-hidden">

        <CardHeader
          title="Recent audit activity"
          subtitle="System-generated events across verification, escrow, compliance and disputes"
        />

        <CardBody className="pt-3">

          <div className="divide-y divide-ink/[0.06]">

            {recentAuditEvents.map((event) => {
              const status = statusStyles[event.tone]
              const StatusIcon = status.icon

              return (
                <div
                  key={`${event.action}-${event.date}`}
                  className="
                    group
                    flex
                    flex-col
                    gap-4
                    px-1
                    py-4
                    transition
                    duration-200
                    lg:flex-row
                    lg:items-center
                    lg:justify-between
                  "
                >

                  <div className="flex min-w-0 items-start gap-3.5">

                    <div className="relative mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-paper-2">

                      <span
                        className={[
                          'absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full ring-2 ring-white',
                          status.dot,
                        ].join(' ')}
                      />

                      <Activity className="h-4 w-4 text-ink/45" />

                    </div>

                    <div className="min-w-0">

                      <div className="flex flex-wrap items-center gap-2">

                        <h3 className="text-[12px] font-semibold text-ink">
                          {event.action}
                        </h3>

                        <span className="rounded-full bg-ink/[0.045] px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.08em] text-ink/40">
                          {event.category}
                        </span>

                      </div>

                      <p className="mt-1 text-[10px] text-ink/40">
                        {event.actor}
                      </p>

                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-5 pl-[52px] lg:justify-end lg:pl-0">

                    <span className="text-[10px] tabular-nums text-ink/40">
                      {event.date}
                    </span>

                    <span
                      className={[
                        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[9px] font-bold',
                        status.badge,
                      ].join(' ')}
                    >
                      <StatusIcon className="h-3 w-3" />
                      {event.status}
                    </span>

                  </div>

                </div>
              )
            })}

          </div>

          <div className="mt-3 flex justify-end border-t border-ink/[0.06] pt-4">

            <button
              type="button"
              className="
                inline-flex
                items-center
                gap-1
                text-[10px]
                font-bold
                text-[#B85C12]
                transition
                hover:gap-1.5
              "
            >
              View complete audit history
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>

          </div>

        </CardBody>
      </Card>

      {/* ========================================================= */}
      {/* Audit domains                                              */}
      {/* ========================================================= */}

      <section
        aria-label="Audit domain summaries"
        className="grid grid-cols-1 gap-5 lg:grid-cols-3"
      >

        <AuditDomainCard
          eyebrow="Compliance"
          title="Compliance monitoring"
          subtitle="KYC, AML and verification audit coverage"
          icon={ShieldCheck}
          tone="teal"
          metrics={[
            {
              icon: ShieldCheck,
              label: 'Verification reviews',
              value: '1,224',
            },
            {
              icon: Users,
              label: 'User compliance checks',
              value: '842',
            },
            {
              icon: AlertTriangle,
              label: 'Risk alerts',
              value: '14',
              emphasis: 'warning',
            },
          ]}
        />

        <AuditDomainCard
          eyebrow="Financial controls"
          title="Escrow audit trail"
          subtitle="Funding, releases, refunds and frozen payments"
          icon={Wallet}
          tone="amber"
          metrics={[
            {
              icon: Wallet,
              label: 'Wallet transactions',
              value: '8,933',
            },
            {
              icon: Activity,
              label: 'Payment releases',
              value: '1,481',
            },
            {
              icon: AlertTriangle,
              label: 'Frozen transactions',
              value: '27',
              emphasis: 'warning',
            },
          ]}
        />

        <AuditDomainCard
          eyebrow="Case governance"
          title="Dispute audit logs"
          subtitle="Dispute workflow and resolution history"
          icon={Scale}
          tone="brick"
          metrics={[
            {
              icon: Scale,
              label: 'Open disputes',
              value: '31',
              emphasis: 'warning',
            },
            {
              icon: Scale,
              label: 'Resolved cases',
              value: '216',
            },
            {
              icon: Activity,
              label: 'Evidence records',
              value: '1,043',
            },
          ]}
        />

      </section>

    </div>
  )
}

/* ========================================================================== */
/* Audit domain card                                                          */
/* ========================================================================== */

function AuditDomainCard({
  eyebrow,
  title,
  subtitle,
  icon: Icon,
  tone,
  metrics,
}: {
  eyebrow: string
  title: string
  subtitle: string
  icon: React.ComponentType<{ className?: string }>
  tone: 'teal' | 'amber' | 'brick'
  metrics: {
    icon: React.ComponentType<{ className?: string }>
    label: string
    value: string
    emphasis?: 'warning'
  }[]
}) {
  const toneStyles = {
    teal: {
      icon: 'bg-[#EAF4EE] text-[#12613E]',
      accent: 'bg-[#12613E]',
    },
    amber: {
      icon: 'bg-[#F8EEE6] text-[#B85C12]',
      accent: 'bg-[#B85C12]',
    },
    brick: {
      icon: 'bg-brick-light/40 text-brick',
      accent: 'bg-brick',
    },
  } as const

  const styles = toneStyles[tone]

  return (
    <Card className="overflow-hidden">

      <div className="border-b border-ink/[0.07] px-5 py-5">

        <div className="flex items-start justify-between gap-4">

          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-ink/40">
              {eyebrow}
            </p>

            <h3 className="mt-1 font-display text-[18px] font-semibold tracking-[-0.02em] text-ink">
              {title}
            </h3>

            <p className="mt-1 max-w-[280px] text-[10px] leading-4 text-ink/45">
              {subtitle}
            </p>
          </div>

          <div
            className={[
              'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl',
              styles.icon,
            ].join(' ')}
          >
            <Icon className="h-4 w-4" />
          </div>

        </div>

      </div>

      <CardBody className="p-4">

        <div className="space-y-2">

          {metrics.map((metric) => {
            const MetricIcon = metric.icon

            return (
              <div
                key={metric.label}
                className="
                  group
                  flex
                  items-center
                  justify-between
                  rounded-2xl
                  border
                  border-transparent
                  bg-paper-2
                  px-3.5
                  py-3
                  transition
                  duration-200
                  hover:border-ink/[0.06]
                  hover:bg-white
                "
              >

                <div className="flex min-w-0 items-center gap-3">

                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-ink/40 shadow-[0_2px_8px_rgba(20,40,30,0.035)]">
                    <MetricIcon className="h-3.5 w-3.5" />
                  </div>

                  <span className="truncate text-[10px] font-medium text-ink/55">
                    {metric.label}
                  </span>

                </div>

                <span
                  className={[
                    'font-display text-[14px] font-semibold tabular-nums',
                    metric.emphasis === 'warning'
                      ? 'text-[#B85C12]'
                      : 'text-ink',
                  ].join(' ')}
                >
                  {metric.value}
                </span>

              </div>
            )
          })}

        </div>

        <button
          type="button"
          className="
            mt-4
            flex
            w-full
            items-center
            justify-between
            rounded-xl
            border
            border-ink/[0.07]
            bg-white
            px-3.5
            py-2.5
            text-[10px]
            font-semibold
            text-ink/65
            transition
            hover:border-ink/15
            hover:text-ink
          "
        >
          <span>Open detailed records</span>
          <ArrowUpRight className="h-3.5 w-3.5 text-ink/30" />
        </button>

      </CardBody>
    </Card>
  )
}