import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  BarChart3,
  Briefcase,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Download,
  FolderKanban,
  Scale,
  ShieldCheck,
  Wallet,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'

const portfolioStats = [
  {
    label: 'Active Projects',
    value: '184',
    detail: 'Across active developments',
    icon: FolderKanban,
    tone: 'teal',
  },
  {
    label: 'Portfolio Value',
    value: '₦8.6B',
    detail: 'Current managed value',
    icon: Wallet,
    tone: 'ink',
  },
  {
    label: 'Contractors',
    value: '412',
    detail: 'Registered delivery partners',
    icon: Briefcase,
    tone: 'amber',
  },
  {
    label: 'Suppliers',
    value: '289',
    detail: 'Verified supply partners',
    icon: Building2,
    tone: 'brick',
  },
] as const

const portfolioProjects = [
  {
    name: 'Abuja Smart Estate',
    progress: 78,
    status: 'On Track',
    budget: '₦520M',
    stage: 'Construction',
  },
  {
    name: 'Lekki Commercial Plaza',
    progress: 61,
    status: 'At Risk',
    budget: '₦1.2B',
    stage: 'Structure',
  },
  {
    name: 'Kano Housing Scheme',
    progress: 92,
    status: 'Near Completion',
    budget: '₦870M',
    stage: 'Finishing',
  },
  {
    name: 'Port Harcourt Towers',
    progress: 44,
    status: 'Delayed',
    budget: '₦650M',
    stage: 'Foundation',
  },
]

const managementAlerts = [
  {
    title: 'Projects Behind Schedule',
    value: '12',
    severity: 'High',
  },
  {
    title: 'Pending Approvals',
    value: '47',
    severity: 'Medium',
  },
  {
    title: 'Compliance Reviews',
    value: '19',
    severity: 'Medium',
  },
  {
    title: 'Open Disputes',
    value: '8',
    severity: 'High',
  },
]

const summaryToneStyles = {
  teal: {
    icon: 'bg-[#EAF4EE] text-[#12613E]',
    value: 'text-[#12613E]',
  },
  ink: {
    icon: 'bg-ink/[0.05] text-ink/60',
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

const projectStatusStyles = {
  'On Track': {
    badge: 'bg-[#EAF4EE] text-[#12613E]',
    dot: 'bg-[#12613E]',
    progress: 'bg-[#12613E]',
  },
  'Near Completion': {
    badge: 'bg-[#EAF4EE] text-[#12613E]',
    dot: 'bg-[#12613E]',
    progress: 'bg-[#12613E]',
  },
  'At Risk': {
    badge: 'bg-[#F8EEE6] text-[#B85C12]',
    dot: 'bg-[#B85C12]',
    progress: 'bg-[#B85C12]',
  },
  Delayed: {
    badge: 'bg-brick-light/50 text-brick',
    dot: 'bg-brick',
    progress: 'bg-brick',
  },
} as const

const alertStyles = {
  High: {
    badge: 'bg-brick-light/50 text-brick',
    dot: 'bg-brick',
  },
  Medium: {
    badge: 'bg-[#F8EEE6] text-[#B85C12]',
    dot: 'bg-[#B85C12]',
  },
} as const

export function ManagementReports() {
  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------------ */}
      {/* Executive Header                                                     */}
      {/* ------------------------------------------------------------------ */}

      <Card className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#12613E]/[0.045] blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-[#B85C12]/[0.025] blur-3xl" />

        <CardBody className="relative">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#12613E]" />

                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/45">
                  Executive command centre
                </span>
              </div>

              <h1 className="font-display text-[30px] font-semibold tracking-[-0.04em] text-ink sm:text-[34px]">
                Management Reports
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-ink/50">
                Executive oversight across portfolio delivery, financial
                performance, procurement, compliance and operational risk.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2.5 text-sm font-medium text-ink transition hover:border-ink/15 hover:bg-paper-2"
              >
                <BarChart3 className="h-4 w-4 text-ink/50" />
                Portfolio View
              </button>

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-white shadow-[0_8px_24px_rgba(20,40,30,0.14)] transition hover:-translate-y-0.5 hover:bg-[#24372D]"
              >
                <Download className="h-4 w-4" />
                Export Report
              </button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* Portfolio Summary                                                    */}
      {/* ------------------------------------------------------------------ */}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {portfolioStats.map((item) => {
          const Icon = item.icon
          const tone = summaryToneStyles[item.tone]

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
      {/* Portfolio + Alerts                                                   */}
      {/* ------------------------------------------------------------------ */}

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <Card className="overflow-hidden">
            <CardHeader
              title="Portfolio Overview"
              subtitle="Cross-project monitoring and delivery performance"
            />

            <CardBody className="pt-0">
              <div className="divide-y divide-line">
                {portfolioProjects.map((project) => {
                  const status =
                    projectStatusStyles[
                      project.status as keyof typeof projectStatusStyles
                    ]

                  return (
                    <div
                      key={project.name}
                      className="group py-5 first:pt-1 last:pb-1"
                    >
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="min-w-0">
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] ${status.badge}`}
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${status.dot}`}
                              />
                            </div>

                            <div className="min-w-0">
                              <h3 className="truncate text-sm font-semibold text-ink">
                                {project.name}
                              </h3>

                              <div className="mt-1 flex items-center gap-2">
                                <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-ink/35">
                                  {project.stage}
                                </span>

                                <span className="h-1 w-1 rounded-full bg-ink/15" />

                                <span className="text-[11px] text-ink/40">
                                  Budget {project.budget}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 pl-[52px] lg:pl-0">
                          <div className="min-w-[145px] flex-1 lg:flex-none">
                            <div className="mb-1.5 flex items-center justify-between">
                              <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-ink/30">
                                Progress
                              </span>

                              <span className="text-xs font-semibold tabular-nums text-ink">
                                {project.progress}%
                              </span>
                            </div>

                            <div className="h-1.5 overflow-hidden rounded-full bg-ink/[0.06]">
                              <div
                                className={`h-full rounded-full transition-all ${status.progress}`}
                                style={{
                                  width: `${project.progress}%`,
                                }}
                              />
                            </div>
                          </div>

                          <span
                            className={`hidden shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-semibold sm:inline-flex ${status.badge}`}
                          >
                            <span
                              className={`h-1 w-1 rounded-full ${status.dot}`}
                            />
                            {project.status}
                          </span>

                          <ChevronRight className="h-4 w-4 shrink-0 text-ink/20 transition group-hover:translate-x-0.5 group-hover:text-ink/45" />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <button
                type="button"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-line bg-paper-2 px-4 py-3 text-xs font-semibold text-ink/55 transition hover:border-ink/10 hover:bg-white hover:text-ink"
              >
                Open portfolio register
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </CardBody>
          </Card>
        </div>

        {/* Management Alerts */}
        <Card className="overflow-hidden">
          <CardHeader
            title="Management Alerts"
            subtitle="Items requiring leadership attention"
          />

          <CardBody className="pt-0">
            <div className="divide-y divide-line">
              {managementAlerts.map((alert) => {
                const severity =
                  alertStyles[
                    alert.severity as keyof typeof alertStyles
                  ]

                return (
                  <div
                    key={alert.title}
                    className="group flex items-center justify-between gap-4 py-4 first:pt-1 last:pb-1"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] ${severity.badge}`}
                      >
                        <AlertTriangle className="h-4 w-4" />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-ink">
                          {alert.title}
                        </p>

                        <div className="mt-1 flex items-center gap-2">
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${severity.dot}`}
                          />

                          <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-ink/35">
                            {alert.severity} priority
                          </span>
                        </div>
                      </div>
                    </div>

                    <span className="font-display text-[21px] font-semibold tabular-nums text-ink">
                      {alert.value}
                    </span>
                  </div>
                )
              })}
            </div>

            <div className="mt-5 rounded-2xl bg-paper-2 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white">
                  <Activity className="h-4 w-4 text-ink/45" />
                </div>

                <div>
                  <p className="text-xs font-semibold text-ink">
                    Executive attention
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-ink/40">
                    86 items currently require review across the managed
                    portfolio.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="mt-4 flex w-full items-center justify-between rounded-xl px-1 py-1 text-xs font-semibold text-ink/45 transition hover:text-ink"
            >
              <span>Review management queue</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </CardBody>
        </Card>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Executive Control Domains                                            */}
      {/* ------------------------------------------------------------------ */}

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
        <ManagementControlCard
          eyebrow="Delivery"
          title="Project Delivery"
          subtitle="Execution health"
          icon={CheckCircle2}
          tone="teal"
          metrics={[
            {
              icon: CheckCircle2,
              label: 'Completed Milestones',
              value: '1,248',
              tone: 'success',
            },
            {
              icon: Clock3,
              label: 'Delayed Milestones',
              value: '43',
              tone: 'warning',
            },
            {
              icon: FolderKanban,
              label: 'Active Projects',
              value: '184',
            },
          ]}
        />

        <ManagementControlCard
          eyebrow="Treasury"
          title="Financial Overview"
          subtitle="Portfolio spend"
          icon={Wallet}
          tone="ink"
          metrics={[
            {
              icon: Wallet,
              label: 'Escrow Volume',
              value: '₦8.6B',
            },
            {
              icon: BarChart3,
              label: 'Budget Usage',
              value: '76%',
              tone: 'success',
            },
            {
              icon: Activity,
              label: 'Monthly Spend',
              value: '₦412M',
            },
          ]}
        />

        <ManagementControlCard
          eyebrow="Governance"
          title="Compliance Status"
          subtitle="Governance monitoring"
          icon={ShieldCheck}
          tone="teal"
          metrics={[
            {
              icon: ShieldCheck,
              label: 'Verified Users',
              value: '98%',
              tone: 'success',
            },
            {
              icon: AlertTriangle,
              label: 'Risk Flags',
              value: '14',
              tone: 'warning',
            },
            {
              icon: CheckCircle2,
              label: 'Compliance Score',
              value: '96%',
              tone: 'success',
            },
          ]}
        />

        <ManagementControlCard
          eyebrow="Risk"
          title="Disputes & Risks"
          subtitle="Operational controls"
          icon={Scale}
          tone="amber"
          metrics={[
            {
              icon: Scale,
              label: 'Open Disputes',
              value: '8',
              tone: 'danger',
            },
            {
              icon: AlertTriangle,
              label: 'Risk Cases',
              value: '12',
              tone: 'warning',
            },
            {
              icon: CheckCircle2,
              label: 'Resolved Issues',
              value: '124',
              tone: 'success',
            },
          ]}
        />
      </div>
    </div>
  )
}

function ManagementControlCard({
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
    tone?: 'success' | 'warning' | 'danger'
  }[]
}) {
  const toneStyles = {
    teal: 'bg-[#EAF4EE] text-[#12613E]',
    amber: 'bg-[#F8EEE6] text-[#B85C12]',
    ink: 'bg-ink/[0.05] text-ink/55',
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

        <button
          type="button"
          className="mt-4 flex w-full items-center justify-between rounded-xl px-1 py-1 text-xs font-semibold text-ink/45 transition hover:text-ink"
        >
          <span>Open detailed controls</span>

          <ChevronRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
        </button>
      </CardBody>
    </Card>
  )
}