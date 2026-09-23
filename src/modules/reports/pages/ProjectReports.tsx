import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Download,
  FileText,
  HardHat,
  Package,
  Scale,
  ShieldCheck,
  Wallet,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'

const projectMetrics = [
  {
    label: 'Project Progress',
    value: '74%',
    detail: 'Overall delivery',
    icon: CheckCircle2,
    tone: 'teal',
  },
  {
    label: 'Budget Utilized',
    value: '₦348M',
    detail: 'Of ₦470M approved',
    icon: Wallet,
    tone: 'ink',
  },
  {
    label: 'Milestones',
    value: '18 / 24',
    detail: '75% completed',
    icon: FileText,
    tone: 'amber',
  },
  {
    label: 'Team Members',
    value: '47',
    detail: 'Active project team',
    icon: HardHat,
    tone: 'ink',
  },
] as const

const milestones = [
  {
    name: 'Site Preparation',
    status: 'Completed',
    completion: 100,
  },
  {
    name: 'Foundation Works',
    status: 'Completed',
    completion: 100,
  },
  {
    name: 'Structural Framework',
    status: 'In Progress',
    completion: 82,
  },
  {
    name: 'Roof Installation',
    status: 'Pending',
    completion: 0,
  },
]

const activities = [
  {
    title: 'Milestone Approved',
    description: 'Foundation milestone verified by Project Manager',
    date: '24 Aug 2026',
    tone: 'teal',
  },
  {
    title: 'Escrow Release',
    description: 'Labour payment released',
    date: '23 Aug 2026',
    tone: 'ink',
  },
  {
    title: 'Material Delivery',
    description: 'Cement and reinforcement materials delivered',
    date: '22 Aug 2026',
    tone: 'amber',
  },
  {
    title: 'Inspection Completed',
    description: 'Structural inspection passed',
    date: '21 Aug 2026',
    tone: 'teal',
  },
] as const

const metricToneStyles = {
  teal: {
    icon: 'bg-[#EAF4EE] text-[#12613E]',
    value: 'text-[#12613E]',
  },
  ink: {
    icon: 'bg-ink/[0.05] text-ink/55',
    value: 'text-ink',
  },
  amber: {
    icon: 'bg-[#F8EEE6] text-[#B85C12]',
    value: 'text-[#B85C12]',
  },
  brick: {
    icon: 'bg-brick-light/50 text-brick',
    value: 'text-brick',
  },
} as const

const milestoneStatusStyles = {
  Completed: {
    badge: 'bg-[#EAF4EE] text-[#12613E]',
    dot: 'bg-[#12613E]',
    bar: 'bg-[#12613E]',
    number: 'bg-[#EAF4EE] text-[#12613E]',
  },
  'In Progress': {
    badge: 'bg-[#F8EEE6] text-[#B85C12]',
    dot: 'bg-[#B85C12]',
    bar: 'bg-[#B85C12]',
    number: 'bg-[#F8EEE6] text-[#B85C12]',
  },
  Pending: {
    badge: 'bg-ink/[0.05] text-ink/45',
    dot: 'bg-ink/25',
    bar: 'bg-ink/20',
    number: 'bg-ink/[0.05] text-ink/40',
  },
} as const

export function ProjectReports() {
  const budgetUsage = 74
  const remainingBudget = 122

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------------ */}
      {/* Project Header                                                       */}
      {/* ------------------------------------------------------------------ */}

      <Card className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#12613E]/[0.045] blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-36 w-36 rounded-full bg-[#B85C12]/[0.025] blur-3xl" />

        <CardBody className="relative">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#12613E]" />

                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/45">
                  Project control centre
                </span>
              </div>

              <h1 className="font-display text-[30px] font-semibold tracking-[-0.04em] text-ink sm:text-[34px]">
                Project Report
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-ink/50">
                Comprehensive delivery, financial, procurement, quality and
                risk reporting for an active construction project.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <select
                  aria-label="Select project"
                  className="h-10 appearance-none rounded-full border border-line bg-white py-2 pl-4 pr-10 text-sm font-medium text-ink outline-none transition hover:border-ink/15 focus:border-ink/20"
                  defaultValue="Abuja Smart Estate"
                >
                  <option>Abuja Smart Estate</option>
                  <option>Lekki Commercial Plaza</option>
                  <option>Kano Housing Scheme</option>
                </select>

                <ChevronRight className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rotate-90 text-ink/40" />
              </div>

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-white shadow-[0_8px_24px_rgba(20,40,30,0.14)] transition hover:-translate-y-0.5 hover:bg-[#24372D]"
              >
                <Download className="h-4 w-4" />
                Export Report
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-4">
            <ProjectMeta label="Project" value="Abuja Smart Estate" />
            <ProjectMeta label="Current stage" value="Construction" />
            <ProjectMeta label="Portfolio status" value="On Track" tone="teal" />
          </div>
        </CardBody>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* Project Summary                                                      */}
      {/* ------------------------------------------------------------------ */}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {projectMetrics.map((item) => {
          const Icon = item.icon
          const tone = metricToneStyles[item.tone]

          return (
            <Card
              key={item.label}
              className="group transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(20,40,30,0.07)]"
            >
              <CardBody>
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-[14px] ${tone.icon}`}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </div>

                  <ArrowUpRight className="h-4 w-4 text-ink/15 transition group-hover:text-ink/40" />
                </div>

                <div className="mt-5">
                  <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink/40">
                    {item.label}
                  </p>

                  <h3
                    className={`mt-1 font-display text-[27px] font-semibold tracking-[-0.035em] tabular-nums ${tone.value}`}
                  >
                    {item.value}
                  </h3>

                  <p className="mt-1 text-xs text-ink/40">
                    {item.detail}
                  </p>
                </div>
              </CardBody>
            </Card>
          )
        })}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Milestones + Project Health                                          */}
      {/* ------------------------------------------------------------------ */}

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <Card className="overflow-hidden">
            <CardHeader
              title="Milestone Progress"
              subtitle="Project delivery tracking across the current construction lifecycle"
            />

            <CardBody className="pt-0">
              <div className="space-y-1">
                {milestones.map((milestone, index) => {
                  const status =
                    milestoneStatusStyles[
                      milestone.status as keyof typeof milestoneStatusStyles
                    ]

                  return (
                    <div
                      key={milestone.name}
                      className="group relative flex gap-4 py-4"
                    >
                      <div className="relative flex w-9 shrink-0 justify-center">
                        <div
                          className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-[12px] text-xs font-semibold ${status.number}`}
                        >
                          {milestone.completion === 100 ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : (
                            index + 1
                          )}
                        </div>

                        {index < milestones.length - 1 && (
                          <div className="absolute left-1/2 top-9 h-[calc(100%+2px)] w-px -translate-x-1/2 bg-line" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-sm font-semibold text-ink">
                                {milestone.name}
                              </h3>

                              <span
                                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-semibold ${status.badge}`}
                              >
                                <span
                                  className={`h-1 w-1 rounded-full ${status.dot}`}
                                />
                                {milestone.status}
                              </span>
                            </div>

                            <p className="mt-1 text-[11px] text-ink/40">
                              Delivery milestone {index + 1} of{' '}
                              {milestones.length}
                            </p>
                          </div>

                          <span className="font-display text-[18px] font-semibold tabular-nums text-ink">
                            {milestone.completion}%
                          </span>
                        </div>

                        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-ink/[0.06]">
                          <div
                            className={`h-full rounded-full transition-all ${status.bar}`}
                            style={{
                              width: `${milestone.completion}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-5 flex items-center justify-between rounded-2xl bg-paper-2 px-4 py-3.5">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-ink/35">
                    Overall milestone completion
                  </p>

                  <p className="mt-1 text-xs text-ink/45">
                    18 of 24 planned milestones completed
                  </p>
                </div>

                <span className="font-display text-[20px] font-semibold text-[#12613E]">
                  75%
                </span>
              </div>
            </CardBody>
          </Card>
        </div>

        <Card>
          <CardHeader
            title="Project Health"
            subtitle="Risk, schedule and quality indicators"
          />

          <CardBody className="pt-0">
            <div className="space-y-2.5">
              <ProjectMetric
                icon={CheckCircle2}
                label="Quality Score"
                value="96%"
                tone="success"
              />

              <ProjectMetric
                icon={Clock3}
                label="Schedule Health"
                value="91%"
                tone="success"
              />

              <ProjectMetric
                icon={AlertTriangle}
                label="Risk Alerts"
                value="3"
                tone="warning"
              />

              <ProjectMetric
                icon={ShieldCheck}
                label="Compliance Score"
                value="98%"
                tone="success"
              />
            </div>

            <div className="mt-5 rounded-2xl bg-[#EAF4EE] p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white">
                  <ShieldCheck className="h-4 w-4 text-[#12613E]" />
                </div>

                <div>
                  <p className="text-xs font-semibold text-[#12613E]">
                    Overall project health
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-[#12613E]/70">
                    Delivery remains within the current approved control
                    thresholds.
                  </p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Financial / Procurement / Disputes                                  */}
      {/* ------------------------------------------------------------------ */}

      <div className="grid gap-6 lg:grid-cols-3">
        <ProjectControlCard
          eyebrow="Treasury"
          title="Financial Summary"
          subtitle="Project financial performance"
          icon={Wallet}
          tone="teal"
          metrics={[
            {
              icon: Wallet,
              label: 'Approved Budget',
              value: '₦470M',
            },
            {
              icon: Wallet,
              label: 'Spent',
              value: '₦348M',
            },
            {
              icon: Wallet,
              label: 'Remaining',
              value: '₦122M',
              tone: 'success',
            },
          ]}
          footer={
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-ink/35">
                  Budget utilized
                </span>

                <span className="text-xs font-semibold text-ink">
                  {budgetUsage}%
                </span>
              </div>

              <div className="h-1.5 overflow-hidden rounded-full bg-ink/[0.06]">
                <div
                  className="h-full rounded-full bg-[#12613E]"
                  style={{ width: `${budgetUsage}%` }}
                />
              </div>
            </div>
          }
        />

        <ProjectControlCard
          eyebrow="Operations"
          title="Procurement"
          subtitle="Materials and supplier activity"
          icon={Package}
          tone="amber"
          metrics={[
            {
              icon: Package,
              label: 'Orders',
              value: '82',
            },
            {
              icon: Package,
              label: 'Delivered',
              value: '76',
              tone: 'success',
            },
            {
              icon: Package,
              label: 'Pending',
              value: '6',
              tone: 'warning',
            },
          ]}
        />

        <ProjectControlCard
          eyebrow="Resolution"
          title="Disputes"
          subtitle="Issue management and escalation"
          icon={Scale}
          tone="brick"
          metrics={[
            {
              icon: Scale,
              label: 'Open Disputes',
              value: '1',
              tone: 'warning',
            },
            {
              icon: Scale,
              label: 'Resolved',
              value: '5',
              tone: 'success',
            },
            {
              icon: AlertTriangle,
              label: 'Escalated',
              value: '0',
              tone: 'success',
            },
          ]}
        />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Recent Activity                                                      */}
      {/* ------------------------------------------------------------------ */}

      <Card className="overflow-hidden">
        <CardHeader
          title="Recent Project Activity"
          subtitle="Latest project events, approvals and operational actions"
        />

        <CardBody className="pt-0">
          <div className="divide-y divide-line">
            {activities.map((activity) => {
              const tone =
                activity.tone === 'teal'
                  ? {
                      icon: 'bg-[#EAF4EE] text-[#12613E]',
                      dot: 'bg-[#12613E]',
                    }
                  : activity.tone === 'amber'
                    ? {
                        icon: 'bg-[#F8EEE6] text-[#B85C12]',
                        dot: 'bg-[#B85C12]',
                      }
                    : {
                        icon: 'bg-ink/[0.05] text-ink/55',
                        dot: 'bg-ink/30',
                      }

              return (
                <div
                  key={`${activity.title}-${activity.date}`}
                  className="group flex flex-col gap-3 py-4 first:pt-1 last:pb-1 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-center gap-3.5">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] ${tone.icon}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${tone.dot}`} />
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-ink">
                        {activity.title}
                      </h3>

                      <p className="mt-1 truncate text-xs text-ink/45">
                        {activity.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pl-[54px] sm:pl-0">
                    <span className="text-[11px] text-ink/35">
                      {activity.date}
                    </span>

                    <ChevronRight className="h-4 w-4 text-ink/15 transition group-hover:translate-x-0.5 group-hover:text-ink/40" />
                  </div>
                </div>
              )
            })}
          </div>

          <button
            type="button"
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-line bg-paper-2 px-4 py-3 text-xs font-semibold text-ink/55 transition hover:border-ink/10 hover:bg-white hover:text-ink"
          >
            View complete project activity
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </CardBody>
      </Card>
    </div>
  )
}

function ProjectMeta({
  label,
  value,
  tone = 'default',
}: {
  label: string
  value: string
  tone?: 'default' | 'teal'
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/30">
        {label}
      </span>

      <span
        className={`text-xs font-medium ${
          tone === 'teal' ? 'text-[#12613E]' : 'text-ink/60'
        }`}
      >
        {value}
      </span>
    </div>
  )
}

function ProjectMetric({
  icon: Icon,
  label,
  value,
  tone = 'default',
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  tone?: 'default' | 'success' | 'warning' | 'danger'
}) {
  const valueStyles = {
    default: 'text-ink',
    success: 'text-[#12613E]',
    warning: 'text-[#B85C12]',
    danger: 'text-brick',
  } as const

  return (
    <div className="flex items-center justify-between rounded-2xl bg-paper-2 px-3.5 py-3">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white">
          <Icon className="h-3.5 w-3.5 text-ink/45" />
        </div>

        <span className="truncate text-xs text-ink/55">
          {label}
        </span>
      </div>

      <span
        className={`ml-3 shrink-0 text-sm font-semibold tabular-nums ${valueStyles[tone]}`}
      >
        {value}
      </span>
    </div>
  )
}

function ProjectControlCard({
  eyebrow,
  title,
  subtitle,
  icon: Icon,
  tone,
  metrics,
  footer,
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
    tone?: 'success' | 'warning' | 'danger'
  }[]
  footer?: React.ReactNode
}) {
  const toneStyles = {
    teal: 'bg-[#EAF4EE] text-[#12613E]',
    amber: 'bg-[#F8EEE6] text-[#B85C12]',
    brick: 'bg-brick-light/50 text-brick',
  } as const

  const valueStyles = {
    success: 'text-[#12613E]',
    warning: 'text-[#B85C12]',
    danger: 'text-brick',
    default: 'text-ink',
  } as const

  return (
    <Card className="group transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(20,40,30,0.06)]">
      <CardBody>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-ink/35">
              {eyebrow}
            </p>

            <h2 className="mt-1 font-display text-[19px] font-semibold tracking-[-0.025em] text-ink">
              {title}
            </h2>

            <p className="mt-1 text-xs leading-5 text-ink/40">
              {subtitle}
            </p>
          </div>

          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] ${toneStyles[tone]}`}
          >
            <Icon className="h-[18px] w-[18px]" />
          </div>
        </div>

        <div className="mt-5 space-y-2.5">
          {metrics.map((metric) => {
            const MetricIcon = metric.icon

            return (
              <div
                key={metric.label}
                className="flex items-center justify-between rounded-2xl bg-paper-2 px-3.5 py-3"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white">
                    <MetricIcon className="h-3.5 w-3.5 text-ink/45" />
                  </div>

                  <span className="truncate text-xs text-ink/55">
                    {metric.label}
                  </span>
                </div>

                <span
                  className={`ml-3 shrink-0 text-sm font-semibold tabular-nums ${
                    valueStyles[metric.tone ?? 'default']
                  }`}
                >
                  {metric.value}
                </span>
              </div>
            )
          })}
        </div>

        {footer}

        {!footer && (
          <button
            type="button"
            className="mt-4 flex w-full items-center justify-between rounded-xl px-1 py-1 text-xs font-semibold text-ink/45 transition hover:text-ink"
          >
            <span>Open detailed controls</span>

            <ChevronRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
          </button>
        )}
      </CardBody>
    </Card>
  )
}