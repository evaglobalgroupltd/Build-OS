import {
  AlertTriangle,
  ArrowUpRight,
  BadgeCheck,
  CheckCircle2,
  Download,
  FileCheck2,
  Fingerprint,
  Lock,
  ShieldCheck,
  Users,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'

const complianceOverview = [
  {
    label: 'Verified Users',
    value: '12,482',
    icon: BadgeCheck,
    tone: 'teal',
    detail: 'Identity records cleared',
  },
  {
    label: 'Pending Reviews',
    value: '216',
    icon: FileCheck2,
    tone: 'amber',
    detail: 'Require compliance action',
  },
  {
    label: 'AML Alerts',
    value: '8',
    icon: AlertTriangle,
    tone: 'brick',
    detail: 'Active financial flags',
  },
  {
    label: 'Suspended Accounts',
    value: '27',
    icon: ShieldCheck,
    tone: 'ink',
    detail: 'Access currently restricted',
  },
] as const

const complianceAlerts = [
  {
    title: 'Expired Contractor Documents',
    category: 'Verification',
    severity: 'Medium',
    count: 14,
    tone: 'medium',
  },
  {
    title: 'Outstanding AML Reviews',
    category: 'Financial Compliance',
    severity: 'High',
    count: 8,
    tone: 'high',
  },
  {
    title: 'Supplier Verification Resubmissions',
    category: 'KYC',
    severity: 'Low',
    count: 21,
    tone: 'low',
  },
] as const

const overviewToneStyles = {
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
  ink: {
    icon: 'bg-ink/[0.05] text-ink/60',
    value: 'text-ink',
  },
} as const

const severityStyles = {
  low: {
    badge: 'bg-ink/[0.045] text-ink/50',
    dot: 'bg-ink/35',
  },
  medium: {
    badge: 'bg-[#F8EEE6] text-[#B85C12]',
    dot: 'bg-[#B85C12]',
  },
  high: {
    badge: 'bg-brick-light/50 text-brick',
    dot: 'bg-brick',
  },
} as const

export function ComplianceReports() {
  return (
    <div className="space-y-7">

      {/* ========================================================= */}
      {/* Header / compliance command centre                         */}
      {/* ========================================================= */}

      <section
        aria-label="Compliance overview"
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
        <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-[#12613E]/[0.035] blur-3xl" />

        <div className="relative flex flex-col gap-6 p-5 sm:p-6 lg:flex-row lg:items-end lg:justify-between lg:p-7">

          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#12613E]" />

              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/40">
                Risk & regulatory control
              </p>
            </div>

            <h1 className="font-display text-[28px] font-semibold leading-tight tracking-[-0.035em] text-ink sm:text-[32px]">
              Compliance reports
            </h1>

            <p className="mt-2 max-w-2xl text-[12px] leading-5 text-ink/50">
              Monitor identity verification, financial controls, regulatory
              obligations and platform security across Build OS.
            </p>
          </div>

          <button
            type="button"
            className="
              inline-flex
              w-fit
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
            Export compliance report
          </button>

        </div>
      </section>

      {/* ========================================================= */}
      {/* Executive compliance metrics                               */}
      {/* ========================================================= */}

      <section
        aria-label="Compliance summary"
        className="grid grid-cols-2 gap-3 lg:grid-cols-4"
      >
        {complianceOverview.map((item) => {
          const Icon = item.icon
          const tone = overviewToneStyles[item.tone]

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
              <CardBody className="p-4 sm:p-5">

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
                      'mt-1 font-display text-[25px] font-semibold tracking-[-0.035em] tabular-nums',
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
      {/* Compliance domains                                         */}
      {/* ========================================================= */}

      <section
        aria-label="Compliance domains"
        className="grid grid-cols-1 gap-5 lg:grid-cols-3"
      >

        <ComplianceDomainCard
          eyebrow="Identity controls"
          title="Identity verification"
          subtitle="KYC and user verification status"
          icon={BadgeCheck}
          tone="teal"
          metrics={[
            {
              icon: Users,
              label: 'Verified users',
              value: '12,482',
            },
            {
              icon: FileCheck2,
              label: 'Pending reviews',
              value: '216',
              emphasis: 'warning',
            },
            {
              icon: AlertTriangle,
              label: 'Rejected applications',
              value: '41',
              emphasis: 'danger',
            },
          ]}
        />

        <ComplianceDomainCard
          eyebrow="Financial controls"
          title="AML monitoring"
          subtitle="Financial compliance and risk controls"
          icon={Fingerprint}
          tone="amber"
          metrics={[
            {
              icon: Fingerprint,
              label: 'AML checks',
              value: '3,904',
            },
            {
              icon: AlertTriangle,
              label: 'Risk flags',
              value: '17',
              emphasis: 'warning',
            },
            {
              icon: ShieldCheck,
              label: 'Investigations',
              value: '8',
              emphasis: 'warning',
            },
          ]}
        />

        <ComplianceDomainCard
          eyebrow="Security controls"
          title="Data protection"
          subtitle="Privacy, access and security controls"
          icon={Lock}
          tone="ink"
          metrics={[
            {
              icon: Lock,
              label: 'Access audits',
              value: '1,224',
            },
            {
              icon: ShieldCheck,
              label: 'Security reviews',
              value: '102',
            },
            {
              icon: CheckCircle2,
              label: 'Incidents',
              value: '0',
              emphasis: 'success',
            },
          ]}
        />

      </section>

      {/* ========================================================= */}
      {/* Compliance alerts                                          */}
      {/* ========================================================= */}

      <Card className="overflow-hidden">

        <CardHeader
          title="Compliance alerts"
          subtitle="Items requiring review, remediation or continued monitoring"
        />

        <CardBody className="pt-3">

          <div className="divide-y divide-ink/[0.06]">

            {complianceAlerts.map((alert) => {
              const severity = severityStyles[alert.tone]

              return (
                <div
                  key={alert.title}
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
                          severity.dot,
                        ].join(' ')}
                      />

                      <AlertTriangle className="h-4 w-4 text-ink/45" />

                    </div>

                    <div className="min-w-0">

                      <h3 className="text-[12px] font-semibold text-ink">
                        {alert.title}
                      </h3>

                      <p className="mt-1 text-[10px] text-ink/40">
                        {alert.category}
                      </p>

                    </div>

                  </div>

                  <div className="flex items-center justify-between gap-6 pl-[52px] lg:justify-end lg:pl-0">

                    <span
                      className={[
                        'rounded-full px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.07em]',
                        severity.badge,
                      ].join(' ')}
                    >
                      {alert.severity}
                    </span>

                    <div className="text-right">

                      <p className="font-display text-[16px] font-semibold tabular-nums text-ink">
                        {alert.count}
                      </p>

                      <p className="text-[8px] uppercase tracking-[0.08em] text-ink/35">
                        records
                      </p>

                    </div>

                    <ArrowUpRight
                      className="
                        hidden
                        h-3.5
                        w-3.5
                        text-ink/20
                        transition
                        group-hover:-translate-y-0.5
                        group-hover:translate-x-0.5
                        group-hover:text-ink/40
                        sm:block
                      "
                    />

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
              Review all alerts
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>

          </div>

        </CardBody>
      </Card>

      {/* ========================================================= */}
      {/* Compliance coverage                                        */}
      {/* ========================================================= */}

      <Card className="overflow-hidden">

        <CardHeader
          title="Compliance coverage"
          subtitle="Platform-wide regulatory control coverage"
        />

        <CardBody>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">

            <CoverageCard
              title="KYC Compliance"
              value="98%"
              icon={BadgeCheck}
            />

            <CoverageCard
              title="Business Verification"
              value="96%"
              icon={ShieldCheck}
            />

            <CoverageCard
              title="Professional Verification"
              value="94%"
              icon={Users}
            />

            <CoverageCard
              title="AML Compliance"
              value="99%"
              icon={Fingerprint}
            />

          </div>

        </CardBody>
      </Card>

    </div>
  )
}

/* ========================================================================== */
/* Compliance domain card                                                     */
/* ========================================================================== */

function ComplianceDomainCard({
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
  tone: 'teal' | 'amber' | 'ink'
  metrics: {
    icon: React.ComponentType<{ className?: string }>
    label: string
    value: string
    emphasis?: 'success' | 'warning' | 'danger'
  }[]
}) {
  const toneStyles = {
    teal: {
      icon: 'bg-[#EAF4EE] text-[#12613E]',
    },
    amber: {
      icon: 'bg-[#F8EEE6] text-[#B85C12]',
    },
    ink: {
      icon: 'bg-ink/[0.05] text-ink/60',
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
                    metric.emphasis === 'success'
                      ? 'text-[#12613E]'
                      : metric.emphasis === 'warning'
                        ? 'text-[#B85C12]'
                        : metric.emphasis === 'danger'
                          ? 'text-brick'
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
          <span>Open detailed controls</span>
          <ArrowUpRight className="h-3.5 w-3.5 text-ink/30" />
        </button>

      </CardBody>
    </Card>
  )
}

/* ========================================================================== */
/* Coverage card                                                              */
/* ========================================================================== */

function CoverageCard({
  title,
  value,
  icon: Icon,
}: {
  title: string
  value: string
  icon: React.ComponentType<{ className?: string }>
}) {
  const percentage = Number.parseInt(value, 10)

  return (
    <div
      className="
        group
        rounded-[18px]
        border
        border-ink/[0.07]
        bg-white
        p-4
        transition
        duration-300
        hover:-translate-y-0.5
        hover:shadow-[0_12px_30px_rgba(20,40,30,0.06)]
      "
    >

      <div className="flex items-start justify-between gap-3">

        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#EAF4EE] text-[#12613E]">
          <Icon className="h-4 w-4" />
        </div>

        <span className="font-display text-[21px] font-semibold tracking-[-0.03em] text-ink">
          {value}
        </span>

      </div>

      <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.08em] text-ink/45">
        {title}
      </p>

      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-ink/[0.06]">
        <div
          className="h-full rounded-full bg-[#12613E] transition-all duration-700"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="mt-2 flex items-center justify-between">
        <span className="text-[9px] text-ink/35">
          Coverage
        </span>

        <span className="text-[9px] font-semibold text-[#12613E]">
          {percentage >= 98 ? 'Near complete' : 'In good standing'}
        </span>
      </div>

    </div>
  )
}