import type { ComponentType } from 'react'

import {
  AlertTriangle,
  ArrowUpRight,
  BarChart3,
  Building2,
  ChevronRight,
  Clock3,
  FileCheck2,
  FolderKanban,
  Package,
  ShieldCheck,
  ShoppingCart,
  TrendingUp,
  Users,
  WalletCards,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'

/* -------------------------------------------------------------------------- */
/* Data                                                                       */
/* -------------------------------------------------------------------------- */

const organization = {
  name: 'BuildRight Construction Ltd.',
  registration: 'RC 1847291',
  type: 'Construction Company',
  location: 'Abuja, Nigeria',
  status: 'Verified',
  trustScore: 91,
}

const projects = [
  {
    name: 'Abuja Residential Development',
    location: 'Gwarinpa, Abuja',
    progress: 74,
    budget: '₦84.5M',
    status: 'On Track',
    milestone: 'Finishing Works',
  },
  {
    name: 'Maitama Luxury Duplex',
    location: 'Maitama, Abuja',
    progress: 52,
    budget: '₦126.8M',
    status: 'At Risk',
    milestone: 'Structural Works',
  },
  {
    name: 'Jabi Commercial Renovation',
    location: 'Jabi, Abuja',
    progress: 91,
    budget: '₦42.3M',
    status: 'On Track',
    milestone: 'Final Completion',
  },
]

const activities = [
  {
    title: 'Milestone evidence submitted',
    description: 'Abuja Residential Development · Finishing Works',
    time: '24 min ago',
    icon: FileCheck2,
  },
  {
    title: 'Material request approved',
    description: '120 bags of cement · Jabi Commercial Renovation',
    time: '2 hrs ago',
    icon: ShoppingCart,
  },
  {
    title: 'New member joined',
    description: 'Fatima Bello · Procurement Manager',
    time: 'Yesterday',
    icon: Users,
  },
  {
    title: 'Weekly project report submitted',
    description: 'Maitama Luxury Duplex',
    time: 'Yesterday',
    icon: BarChart3,
  },
]

const attentionItems = [
  {
    title: 'Milestone approval required',
    description: 'Finishing Works · Abuja Residential Development',
    action: 'Review milestone',
    priority: 'High',
  },
  {
    title: 'Project risk requires attention',
    description: 'Maitama Luxury Duplex is 8 days behind schedule.',
    action: 'View project',
    priority: 'Medium',
  },
  {
    title: 'Supplier quotation pending',
    description: 'Electrical materials · Jabi Commercial Renovation',
    action: 'Review quotation',
    priority: 'Medium',
  },
]

/* -------------------------------------------------------------------------- */
/* Dashboard                                                                  */
/* -------------------------------------------------------------------------- */

export function OrganizationDashboard() {
  return (
    <div className="space-y-7 pb-8">
      {/* ------------------------------------------------------------------ */}
      {/* Executive hero                                                      */}
      {/* ------------------------------------------------------------------ */}

      <section className="relative overflow-hidden rounded-[24px] border border-ink/[0.07] bg-white shadow-[0_18px_50px_rgba(20,40,30,0.08)]">
        <div className="absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#12613E]/[0.07] blur-3xl" />
        <div className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-[#B85C12]/[0.045] blur-3xl" />

        <div className="relative px-5 py-6 sm:px-7 sm:py-7 lg:px-8">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#12613E]/10 bg-[#12613E]/[0.06] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#12613E]">
                  <Building2 className="h-3 w-3" />
                  Organization overview
                </span>

                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/25">
                  Build OS workspace
                </span>
              </div>

              <div className="mt-5 flex items-start gap-4">
                <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-[15px] bg-[#18271F] shadow-[0_10px_25px_rgba(24,39,31,0.14)] sm:flex">
                  <Building2 className="h-5 w-5 text-white" />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h1 className="font-display text-3xl font-semibold tracking-[-0.035em] text-[#18271F] sm:text-4xl">
                      {organization.name}
                    </h1>

                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#12613E]/[0.08] px-2.5 py-1 text-[10px] font-semibold text-[#12613E]">
                      <ShieldCheck className="h-3 w-3" />
                      {organization.status}
                    </span>
                  </div>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/45">
                    Organization portfolio, financial position and operational
                    activity across your Build OS workspace.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-ink/40">
                <HeroMeta
                  label="Registration"
                  value={organization.registration}
                />

                <HeroMeta label="Location" value={organization.location} />

                <HeroMeta
                  label="Trust score"
                  value={`${organization.trustScore}/100`}
                  accent
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-ink/[0.08] bg-white px-4 text-xs font-semibold text-ink/60 shadow-sm transition-all hover:border-ink/[0.14] hover:text-ink"
              >
                Organization settings
              </button>

              <button
                type="button"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#18271F] px-5 text-xs font-semibold text-white shadow-[0_10px_24px_rgba(24,39,31,0.16)] transition-all hover:-translate-y-0.5 hover:bg-[#12613E]"
              >
                <FolderKanban className="h-3.5 w-3.5" />
                View projects
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Organization profile                                                */}
      {/* ------------------------------------------------------------------ */}

      <Card>
        <CardBody>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <OrganizationInfo
              label="Organization type"
              value={organization.type}
              icon={Building2}
            />

            <OrganizationInfo
              label="Registration"
              value={organization.registration}
              icon={FileCheck2}
            />

            <OrganizationInfo
              label="Operating location"
              value={organization.location}
              icon={Building2}
            />

            <OrganizationInfo
              label="Trust score"
              value={`${organization.trustScore}/100`}
              icon={ShieldCheck}
              accent
            />
          </div>
        </CardBody>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* Executive metrics                                                   */}
      {/* ------------------------------------------------------------------ */}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          icon={FolderKanban}
          label="Active projects"
          value="12"
          description="9 on track · 3 need attention"
          trend="+2 this month"
          tone="green"
        />

        <MetricCard
          icon={Users}
          label="Organization members"
          value="24"
          description="21 active · 3 pending"
          trend="+4 this month"
          tone="neutral"
        />

        <MetricCard
          icon={WalletCards}
          label="Escrow exposure"
          value="₦186.4M"
          description="Across active projects"
          trend="+12.8%"
          tone="bronze"
        />

        <MetricCard
          icon={ShoppingCart}
          label="Procurement"
          value="₦42.8M"
          description="Current project procurement"
          trend="+8.4%"
          tone="neutral"
        />
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Portfolio + attention                                               */}
      {/* ------------------------------------------------------------------ */}

      <div className="grid gap-6 xl:grid-cols-3">
        {/* Active projects */}
        <Card className="overflow-hidden xl:col-span-2">
          <CardHeader
            title="Active projects"
            subtitle="Current organization project portfolio"
            action={
              <span className="hidden rounded-full bg-ink/[0.04] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/35 sm:inline-flex">
                12 active
              </span>
            }
          />

          <div className="divide-y divide-ink/[0.055]">
            {projects.map((project, index) => (
              <ProjectRow
                key={project.name}
                project={project}
                index={index}
              />
            ))}
          </div>

          <div className="border-t border-ink/[0.06] px-6 py-4">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#12613E] transition-colors hover:text-[#0E4C31]"
            >
              View all projects
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </Card>

        {/* Attention */}
        <Card className="overflow-hidden">
          <CardHeader
            title="Requires attention"
            subtitle="Actions that may need organization review"
            action={
              <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-rose-500/10 px-2 text-[10px] font-bold text-rose-700">
                {attentionItems.length}
              </span>
            }
          />

          <div className="divide-y divide-ink/[0.055]">
            {attentionItems.map((item) => (
              <AttentionItem key={item.title} item={item} />
            ))}
          </div>

          <div className="border-t border-ink/[0.06] bg-[#FBFCFA] px-5 py-4">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink/55 transition-colors hover:text-[#12613E]"
            >
              View all exceptions
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </Card>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Procurement + financial position                                   */}
      {/* ------------------------------------------------------------------ */}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Procurement */}
        <Card>
          <CardHeader
            title="Procurement overview"
            subtitle="Current procurement activity across projects"
            action={
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#12613E]/[0.07] text-[#12613E]">
                <ShoppingCart className="h-3.5 w-3.5" />
              </div>
            }
          />

          <CardBody>
            <div className="grid gap-3 sm:grid-cols-2">
              <OperationalMetric
                icon={ShoppingCart}
                label="Open requests"
                value="18"
                description="Awaiting quotation or approval"
              />

              <OperationalMetric
                icon={Package}
                label="In transit"
                value="7"
                description="Supplier deliveries underway"
              />

              <OperationalMetric
                icon={ShieldCheck}
                label="Verified deliveries"
                value="146"
                description="Successfully accepted"
              />

              <OperationalMetric
                icon={Clock3}
                label="Pending acceptance"
                value="4"
                description="Require site verification"
              />
            </div>

            <div className="mt-6 rounded-2xl border border-ink/[0.055] bg-[#FAFBF9] p-4">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold text-[#18271F]">
                    Procurement efficiency
                  </p>

                  <p className="mt-1 text-[11px] text-ink/38">
                    Verified orders completed successfully
                  </p>
                </div>

                <span className="font-display text-xl font-semibold text-[#18271F]">
                  96%
                </span>
              </div>

              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-ink/[0.06]">
                <div
                  className="h-full rounded-full bg-[#12613E]"
                  style={{ width: '96%' }}
                />
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Financial position */}
        <Card>
          <CardHeader
            title="Financial position"
            subtitle="Organization-level project funding overview"
            action={
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#B85C12]/[0.08] text-[#B85C12]">
                <WalletCards className="h-3.5 w-3.5" />
              </div>
            }
          />

          <CardBody>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/30">
                  Total project value
                </p>

                <p className="mt-1 font-display text-3xl font-semibold tracking-[-0.03em] text-[#18271F]">
                  ₦412.8M
                </p>
              </div>

              <div className="flex items-center gap-1 rounded-full bg-[#12613E]/[0.07] px-2.5 py-1.5 text-[10px] font-semibold text-[#12613E]">
                <TrendingUp className="h-3 w-3" />
                14.6%
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <FinancialRow
                label="Funded in escrow"
                value="₦286.4M"
                percentage={69}
                tone="green"
              />

              <FinancialRow
                label="Released"
                value="₦100.2M"
                percentage={24}
                tone="bronze"
              />

              <FinancialRow
                label="Reserved"
                value="₦26.2M"
                percentage={7}
                tone="neutral"
              />
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-ink/[0.06] pt-4">
              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/30">
                Available position
              </span>

              <span className="text-sm font-semibold text-[#18271F]">
                ₦26.2M
              </span>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Recent activity                                                     */}
      {/* ------------------------------------------------------------------ */}

      <Card className="overflow-hidden">
        <CardHeader
          title="Recent activity"
          subtitle="Latest actions across the organization"
          action={
            <span className="hidden text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/30 sm:inline">
              Live activity
            </span>
          }
        />

        <div className="divide-y divide-ink/[0.055]">
          {activities.map((activity) => (
            <ActivityRow
              key={`${activity.title}-${activity.time}`}
              activity={activity}
            />
          ))}
        </div>

        <div className="border-t border-ink/[0.06] px-6 py-4">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#12613E] transition-colors hover:text-[#0E4C31]"
          >
            View activity history
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </Card>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Hero metadata                                                              */
/* -------------------------------------------------------------------------- */

function HeroMeta({
  label,
  value,
  accent = false,
}: {
  label: string
  value: string
  accent?: boolean
}) {
  return (
    <div className="flex items-center gap-2">
      <span className={accent ? 'font-semibold text-[#12613E]' : 'font-semibold text-ink/65'}>
        {value}
      </span>

      <span>{label}</span>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Organization information                                                   */
/* -------------------------------------------------------------------------- */

function OrganizationInfo({
  icon: Icon,
  label,
  value,
  accent = false,
}: {
  icon: ComponentType<{ className?: string }>
  label: string
  value: string
  accent?: boolean
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
          accent
            ? 'bg-[#12613E]/[0.07] text-[#12613E]'
            : 'bg-ink/[0.045] text-ink/50'
        }`}
      >
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0">
        <p className="text-[9px] font-semibold uppercase tracking-[0.13em] text-ink/30">
          {label}
        </p>

        <p
          className={`mt-1 truncate text-sm font-medium ${
            accent ? 'text-[#12613E]' : 'text-[#18271F]'
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* KPI card                                                                   */
/* -------------------------------------------------------------------------- */

function MetricCard({
  icon: Icon,
  label,
  value,
  description,
  trend,
  tone,
}: {
  icon: ComponentType<{ className?: string }>
  label: string
  value: string
  description: string
  trend: string
  tone: 'green' | 'bronze' | 'neutral'
}) {
  const toneClasses = {
    green: {
      icon: 'bg-[#12613E]/[0.07] text-[#12613E]',
      trend: 'bg-[#12613E]/[0.07] text-[#12613E]',
    },
    bronze: {
      icon: 'bg-[#B85C12]/[0.08] text-[#B85C12]',
      trend: 'bg-[#B85C12]/[0.08] text-[#A4510F]',
    },
    neutral: {
      icon: 'bg-ink/[0.05] text-ink/50',
      trend: 'bg-ink/[0.04] text-ink/45',
    },
  } as const

  return (
    <Card className="relative overflow-hidden">
      <div
        className={`absolute left-0 top-0 h-full w-0.5 ${
          tone === 'green'
            ? 'bg-[#12613E]'
            : tone === 'bronze'
              ? 'bg-[#B85C12]'
              : 'bg-ink/15'
        }`}
      />

      <CardBody>
        <div className="flex items-center justify-between gap-3">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-xl ${toneClasses[tone].icon}`}
          >
            <Icon className="h-4 w-4" />
          </div>

          <span
            className={`rounded-full px-2.5 py-1 text-[9px] font-semibold ${toneClasses[tone].trend}`}
          >
            {trend}
          </span>
        </div>

        <p className="mt-5 text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/30">
          {label}
        </p>

        <p className="mt-1 font-display text-2xl font-semibold tracking-[-0.025em] text-[#18271F]">
          {value}
        </p>

        <p className="mt-1 text-[11px] text-ink/38">{description}</p>
      </CardBody>
    </Card>
  )
}

/* -------------------------------------------------------------------------- */
/* Project row                                                                */
/* -------------------------------------------------------------------------- */

function ProjectRow({
  project,
  index,
}: {
  project: (typeof projects)[number]
  index: number
}) {
  const isRisk = project.status === 'At Risk'

  return (
    <div className="group px-5 py-5 transition-colors hover:bg-[#FBFCFA] sm:px-6">
      <div className="flex flex-col gap-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 gap-3.5">
            <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-ink/[0.06] bg-[#FAFBF9] text-[9px] font-bold text-ink/30 sm:flex">
              0{index + 1}
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-semibold text-[#18271F]">
                  {project.name}
                </h3>

                <ProjectStatus status={project.status} />
              </div>

              <p className="mt-1 text-xs text-ink/38">
                {project.location}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-ink/28">
                Budget
              </p>

              <p className="mt-1 text-sm font-semibold text-[#18271F]">
                {project.budget}
              </p>
            </div>

            <ChevronRight className="h-4 w-4 text-ink/20 transition-transform group-hover:translate-x-0.5 group-hover:text-[#12613E]" />
          </div>
        </div>

        <div>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.13em] text-ink/28">
                Current milestone
              </p>

              <p className="mt-1 text-xs font-medium text-ink/58">
                {project.milestone}
              </p>
            </div>

            <span className="font-display text-lg font-semibold text-[#18271F]">
              {project.progress}%
            </span>
          </div>

          <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-ink/[0.055]">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isRisk ? 'bg-[#B85C12]' : 'bg-[#12613E]'
              }`}
              style={{ width: `${project.progress}%` }}
            />
          </div>

          <div className="mt-2 flex items-center justify-between">
            <span className="text-[10px] text-ink/30">
              Project delivery progress
            </span>

            <span className="text-[10px] font-medium text-ink/35 sm:hidden">
              {project.budget}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Attention item                                                             */
/* -------------------------------------------------------------------------- */

function AttentionItem({
  item,
}: {
  item: (typeof attentionItems)[number]
}) {
  const high = item.priority === 'High'

  return (
    <div className="group px-5 py-4.5 transition-colors hover:bg-[#FBFCFA]">
      <div className="flex gap-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
            high
              ? 'bg-rose-500/[0.08] text-rose-700'
              : 'bg-[#B85C12]/[0.08] text-[#A4510F]'
          }`}
        >
          <AlertTriangle className="h-3.5 w-3.5" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs font-semibold text-[#18271F]">
              {item.title}
            </p>

            <PriorityBadge priority={item.priority} />
          </div>

          <p className="mt-1 text-[11px] leading-5 text-ink/40">
            {item.description}
          </p>

          <button
            type="button"
            className="mt-3 inline-flex items-center gap-1 text-[10px] font-semibold text-ink/50 transition-colors hover:text-[#12613E]"
          >
            {item.action}
            <ArrowUpRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Operational metric                                                         */
/* -------------------------------------------------------------------------- */

function OperationalMetric({
  icon: Icon,
  label,
  value,
  description,
}: {
  icon: ComponentType<{ className?: string }>
  label: string
  value: string
  description: string
}) {
  return (
    <div className="rounded-[17px] border border-ink/[0.055] bg-[#FAFBF9] p-4 transition-colors hover:bg-white">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-ink/50 shadow-sm">
        <Icon className="h-3.5 w-3.5" />
      </div>

      <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.1em] text-ink/32">
        {label}
      </p>

      <p className="mt-1 font-display text-xl font-semibold text-[#18271F]">
        {value}
      </p>

      <p className="mt-1 text-[10px] leading-4 text-ink/35">
        {description}
      </p>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Financial row                                                              */
/* -------------------------------------------------------------------------- */

function FinancialRow({
  label,
  value,
  percentage,
  tone,
}: {
  label: string
  value: string
  percentage: number
  tone: 'green' | 'bronze' | 'neutral'
}) {
  const barClass = {
    green: 'bg-[#12613E]',
    bronze: 'bg-[#B85C12]',
    neutral: 'bg-ink/20',
  } as const

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <span className="text-xs text-ink/45">{label}</span>

        <span className="text-xs font-semibold text-[#18271F]">
          {value}
        </span>
      </div>

      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink/[0.055]">
        <div
          className={`h-full rounded-full ${barClass[tone]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Activity row                                                               */
/* -------------------------------------------------------------------------- */

function ActivityRow({
  activity,
}: {
  activity: (typeof activities)[number]
}) {
  const Icon = activity.icon

  return (
    <div className="flex items-start gap-4 px-5 py-4 transition-colors hover:bg-[#FBFCFA] sm:px-6">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#12613E]/[0.06] text-[#12613E]">
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-[#18271F]">
          {activity.title}
        </p>

        <p className="mt-1 text-xs text-ink/38">
          {activity.description}
        </p>
      </div>

      <span className="shrink-0 text-[10px] text-ink/30">
        {activity.time}
      </span>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Status badges                                                              */
/* -------------------------------------------------------------------------- */

function ProjectStatus({
  status,
}: {
  status: string
}) {
  const isRisk = status === 'At Risk'

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-semibold ${
        isRisk
          ? 'bg-[#B85C12]/[0.09] text-[#A4510F]'
          : 'bg-[#12613E]/[0.08] text-[#12613E]'
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isRisk ? 'bg-[#B85C12]' : 'bg-[#12613E]'
        }`}
      />

      {status}
    </span>
  )
}

function PriorityBadge({
  priority,
}: {
  priority: string
}) {
  const high = priority === 'High'

  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${
        high
          ? 'bg-rose-500/[0.08] text-rose-700'
          : 'bg-[#B85C12]/[0.08] text-[#A4510F]'
      }`}
    >
      {priority}
    </span>
  )
}