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

export function OrganizationDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink">
              <Building2 className="h-5 w-5 text-white" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">
                  {organization.name}
                </h1>

                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                  <ShieldCheck className="h-3 w-3" />
                  {organization.status}
                </span>
              </div>

              <p className="mt-1 text-sm text-ink/45">
                Organization overview and operational activity
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-xs font-semibold text-ink/65 transition-colors hover:bg-ink/[0.03]"
          >
            Organization settings
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
          >
            <FolderKanban className="h-3.5 w-3.5" />
            View projects
          </button>
        </div>
      </div>

      {/* Organization information */}
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
            />
          </div>
        </CardBody>
      </Card>

      {/* KPI cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          icon={FolderKanban}
          label="Active projects"
          value="12"
          description="9 on track · 3 need attention"
          trend="+2 this month"
        />

        <MetricCard
          icon={Users}
          label="Organization members"
          value="24"
          description="21 active · 3 pending"
          trend="+4 this month"
        />

        <MetricCard
          icon={WalletCards}
          label="Escrow exposure"
          value="₦186.4M"
          description="Across active projects"
          trend="+12.8%"
        />

        <MetricCard
          icon={ShoppingCart}
          label="Procurement"
          value="₦42.8M"
          description="Current project procurement"
          trend="+8.4%"
        />
      </div>

      {/* Main grid */}
      <div className="grid gap-6 xl:grid-cols-3">
        {/* Projects */}
        <Card className="overflow-hidden xl:col-span-2">
          <CardHeader
            title="Active projects"
            subtitle="Current organization project portfolio"
          />

          <div className="divide-y divide-line">
            {projects.map((project) => (
              <div
                key={project.name}
                className="px-6 py-5 transition-colors hover:bg-ink/[0.02]"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-semibold text-ink">
                        {project.name}
                      </h3>

                      <ProjectStatus status={project.status} />
                    </div>

                    <p className="mt-1 text-xs text-ink/40">
                      {project.location}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-5">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                        Budget
                      </p>

                      <p className="mt-1 text-sm font-semibold text-ink">
                        {project.budget}
                      </p>
                    </div>

                    <ChevronRight className="h-4 w-4 text-ink/25" />
                  </div>
                </div>

                <div className="mt-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                        Current milestone
                      </p>

                      <p className="mt-1 text-xs font-medium text-ink/60">
                        {project.milestone}
                      </p>
                    </div>

                    <span className="text-sm font-semibold text-ink">
                      {project.progress}%
                    </span>
                  </div>

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-ink/5">
                    <div
                      className="h-full rounded-full bg-ink transition-all duration-500"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-line px-6 py-4">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink/60 transition-colors hover:text-ink"
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
          />

          <div className="divide-y divide-line">
            {attentionItems.map((item) => (
              <div key={item.title} className="px-5 py-4">
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/10">
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-xs font-semibold text-ink">
                        {item.title}
                      </p>

                      <PriorityBadge priority={item.priority} />
                    </div>

                    <p className="mt-1 text-xs leading-5 text-ink/40">
                      {item.description}
                    </p>

                    <button
                      type="button"
                      className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-ink/60 hover:text-ink"
                    >
                      {item.action}
                      <ArrowUpRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Operational overview */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Procurement */}
        <Card>
          <CardHeader
            title="Procurement overview"
            subtitle="Current procurement activity across projects"
          />

          <CardBody>
            <div className="grid gap-4 sm:grid-cols-2">
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

            <div className="mt-6 border-t border-line pt-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-ink">
                    Procurement efficiency
                  </p>

                  <p className="mt-1 text-xs text-ink/40">
                    Verified orders completed successfully
                  </p>
                </div>

                <span className="text-lg font-semibold text-ink">96%</span>
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-ink/5">
                <div
                  className="h-full rounded-full bg-ink"
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
          />

          <CardBody>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                  Total project value
                </p>

                <p className="mt-1 font-display text-3xl font-semibold tracking-tight text-ink">
                  ₦412.8M
                </p>
              </div>

              <div className="flex items-center gap-1 text-xs font-semibold text-emerald-700">
                <TrendingUp className="h-3.5 w-3.5" />
                14.6%
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <FinancialRow
                label="Funded in escrow"
                value="₦286.4M"
                percentage={69}
              />

              <FinancialRow
                label="Released"
                value="₦100.2M"
                percentage={24}
              />

              <FinancialRow
                label="Reserved"
                value="₦26.2M"
                percentage={7}
              />
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Recent activity */}
      <Card className="overflow-hidden">
        <CardHeader
          title="Recent activity"
          subtitle="Latest actions across the organization"
        />

        <div className="divide-y divide-line">
          {activities.map((activity) => {
            const Icon = activity.icon

            return (
              <div
                key={`${activity.title}-${activity.time}`}
                className="flex items-start gap-4 px-6 py-4 transition-colors hover:bg-ink/[0.02]"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink/5">
                  <Icon className="h-4 w-4 text-ink/50" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-ink">
                    {activity.title}
                  </p>

                  <p className="mt-1 text-xs text-ink/40">
                    {activity.description}
                  </p>
                </div>

                <span className="shrink-0 text-[10px] text-ink/35">
                  {activity.time}
                </span>
              </div>
            )
          })}
        </div>

        <div className="border-t border-line px-6 py-4">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink/60 transition-colors hover:text-ink"
          >
            View activity history
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </Card>
    </div>
  )
}

function OrganizationInfo({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink/5">
        <Icon className="h-4 w-4 text-ink/50" />
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
          {label}
        </p>

        <p className="mt-1 truncate text-sm font-medium text-ink">
          {value}
        </p>
      </div>
    </div>
  )
}

function MetricCard({
  icon: Icon,
  label,
  value,
  description,
  trend,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  description: string
  trend: string
}) {
  return (
    <Card>
      <CardBody>
        <div className="flex items-center justify-between">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5">
            <Icon className="h-4 w-4 text-ink/50" />
          </div>

          <span className="text-[10px] font-semibold text-emerald-700">
            {trend}
          </span>
        </div>

        <p className="mt-5 text-[10px] font-semibold uppercase tracking-wide text-ink/35">
          {label}
        </p>

        <p className="mt-1 font-display text-2xl font-semibold tracking-tight text-ink">
          {value}
        </p>

        <p className="mt-1 text-xs text-ink/40">{description}</p>
      </CardBody>
    </Card>
  )
}

function OperationalMetric({
  icon: Icon,
  label,
  value,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  description: string
}) {
  return (
    <div className="rounded-2xl border border-line bg-paper-2 p-4">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
        <Icon className="h-3.5 w-3.5 text-ink/50" />
      </div>

      <p className="mt-4 text-xs font-medium text-ink/50">{label}</p>

      <p className="mt-1 font-display text-xl font-semibold text-ink">
        {value}
      </p>

      <p className="mt-1 text-[11px] leading-4 text-ink/35">
        {description}
      </p>
    </div>
  )
}

function FinancialRow({
  label,
  value,
  percentage,
}: {
  label: string
  value: string
  percentage: number
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-ink/45">{label}</span>

        <span className="text-xs font-semibold text-ink">{value}</span>
      </div>

      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink/5">
        <div
          className="h-full rounded-full bg-ink"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

function ProjectStatus({
  status,
}: {
  status: string
}) {
  const isRisk = status === 'At Risk'

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
        isRisk
          ? 'bg-amber-500/10 text-amber-700'
          : 'bg-emerald-500/10 text-emerald-700'
      }`}
    >
      {status}
    </span>
  )
}

function PriorityBadge({
  priority,
}: {
  priority: string
}) {
  const styles =
    priority === 'High'
      ? 'bg-rose-500/10 text-rose-700'
      : 'bg-amber-500/10 text-amber-700'

  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${styles}`}
    >
      {priority}
    </span>
  )
}