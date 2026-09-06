import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Award,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  Construction,
  DollarSign,
  FileCheck2,
  Flag,
  ShieldCheck,
  Star,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react'

import { Card } from '@/components/ui/Card'

interface MetricCardProps {
  label: string
  value: string
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon: typeof TrendingUp
}

function MetricCard({
  label,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
}: MetricCardProps) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-ink/45">
            {label}
          </p>

          <p className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">
            {value}
          </p>

          {change && (
            <div className="mt-2 flex items-center gap-1.5 text-xs">
              {changeType === 'positive' && (
                <ArrowUpRight className="h-3.5 w-3.5 text-emerald-600" />
              )}

              {changeType === 'negative' && (
                <ArrowDownRight className="h-3.5 w-3.5 text-red-500" />
              )}

              <span
                className={
                  changeType === 'positive'
                    ? 'text-emerald-600'
                    : changeType === 'negative'
                      ? 'text-red-500'
                      : 'text-ink/45'
                }
              >
                {change}
              </span>
            </div>
          )}
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink/5">
          <Icon className="h-5 w-5 text-ink/60" />
        </div>
      </div>
    </Card>
  )
}

interface ProgressRowProps {
  label: string
  value: number
  description?: string
}

function ProgressRow({
  label,
  value,
  description,
}: ProgressRowProps) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-ink">{label}</p>

          {description && (
            <p className="mt-0.5 text-xs text-ink/40">{description}</p>
          )}
        </div>

        <span className="text-sm font-semibold text-ink">
          {value}%
        </span>
      </div>

      <div className="mt-2 h-2 overflow-hidden rounded-full bg-ink/5">
        <div
          className="h-full rounded-full bg-ink transition-all duration-500"
          style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
        />
      </div>
    </div>
  )
}

export function ContractorAnalytics() {
  const performanceMetrics = [
    {
      label: 'Projects Completed',
      value: '18',
      change: '+4 this year',
      changeType: 'positive' as const,
      icon: CheckCircle2,
    },
    {
      label: 'On-Time Delivery',
      value: '94%',
      change: '+6.2% vs previous period',
      changeType: 'positive' as const,
      icon: Clock3,
    },
    {
      label: 'Client Satisfaction',
      value: '4.8 / 5',
      change: '+0.3 rating',
      changeType: 'positive' as const,
      icon: Star,
    },
    {
      label: 'Trust Score',
      value: '91 / 100',
      change: 'Excellent standing',
      changeType: 'positive' as const,
      icon: ShieldCheck,
    },
  ]

  const financialMetrics = [
    {
      label: 'Contract Value',
      value: '₦84.6M',
      change: '+18.4%',
      changeType: 'positive' as const,
      icon: DollarSign,
    },
    {
      label: 'Milestones Approved',
      value: '67',
      change: '98% approval rate',
      changeType: 'positive' as const,
      icon: Target,
    },
    {
      label: 'Active Projects',
      value: '6',
      change: '3 milestones due',
      changeType: 'neutral' as const,
      icon: BriefcaseBusiness,
    },
    {
      label: 'Disputed Payments',
      value: '1',
      change: '₦420K currently affected',
      changeType: 'negative' as const,
      icon: AlertTriangle,
    },
  ]

  const trustFactors = [
    {
      label: 'Project Completion',
      value: 96,
      description: 'Successful completion history',
    },
    {
      label: 'On-Time Performance',
      value: 94,
      description: 'Milestones delivered on schedule',
    },
    {
      label: 'Quality Performance',
      value: 92,
      description: 'Inspection and client quality ratings',
    },
    {
      label: 'Client Satisfaction',
      value: 96,
      description: 'Average client feedback score',
    },
    {
      label: 'Compliance',
      value: 98,
      description: 'Verification and documentation status',
    },
  ]

  const recentProjects = [
    {
      name: 'Gwarinpa Residential Development',
      status: 'Completed',
      progress: 100,
      value: '₦24.5M',
      rating: '4.9',
    },
    {
      name: 'Maitama Duplex Construction',
      status: 'In Progress',
      progress: 72,
      value: '₦38.2M',
      rating: '4.8',
    },
    {
      name: 'Jabi Commercial Renovation',
      status: 'In Progress',
      progress: 54,
      value: '₦12.8M',
      rating: '4.7',
    },
    {
      name: 'Wuse II Office Fit-Out',
      status: 'Completed',
      progress: 100,
      value: '₦9.1M',
      rating: '5.0',
    },
  ]

  const riskItems = [
    {
      title: 'Payment dispute requires response',
      description:
        'A client dispute has frozen one payment line pending review.',
      severity: 'High',
      icon: AlertTriangle,
    },
    {
      title: 'Three milestones approaching deadline',
      description:
        'Upcoming milestone submissions require evidence within 7 days.',
      severity: 'Medium',
      icon: Clock3,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5">
              <Construction className="h-5 w-5 text-ink/70" />
            </div>

            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/40">
              Contractor Intelligence
            </span>
          </div>

          <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Contractor Analytics
          </h1>

          <p className="mt-1 max-w-2xl text-sm leading-6 text-ink/50">
            Monitor project performance, financial activity, delivery quality
            and the factors contributing to your Build OS trust score.
          </p>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-line bg-white px-3 py-2 text-xs font-medium text-ink/60">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          Verified Contractor
        </div>
      </div>

      {/* Performance overview */}
      <section>
        <div className="mb-3">
          <h2 className="font-display text-base font-semibold text-ink">
            Performance overview
          </h2>
          <p className="mt-0.5 text-xs text-ink/40">
            Current contractor performance indicators
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {performanceMetrics.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </div>
      </section>

      {/* Financial overview */}
      <section>
        <div className="mb-3">
          <h2 className="font-display text-base font-semibold text-ink">
            Commercial performance
          </h2>
          <p className="mt-0.5 text-xs text-ink/40">
            Contract, milestone and payment activity
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {financialMetrics.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </div>
      </section>

      {/* Trust score + performance breakdown */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                Trust score
              </p>

              <h2 className="mt-1 font-display text-lg font-semibold text-ink">
                Contractor standing
              </h2>
            </div>

            <Award className="h-5 w-5 text-ink/50" />
          </div>

          <div className="mt-8 flex flex-col items-center">
            <div className="flex h-36 w-36 items-center justify-center rounded-full border-[10px] border-ink/10">
              <div className="text-center">
                <p className="font-display text-4xl font-bold tracking-tight text-ink">
                  91
                </p>
                <p className="text-xs font-medium text-ink/40">
                  / 100
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-700">
              <TrendingUp className="h-3.5 w-3.5" />
              Excellent standing
            </div>

            <p className="mt-4 text-center text-xs leading-5 text-ink/45">
              Your score reflects delivery history, quality, compliance,
              client feedback and dispute performance.
            </p>
          </div>
        </Card>

        <Card className="p-6 lg:col-span-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
              Trust score breakdown
            </p>

            <h2 className="mt-1 font-display text-lg font-semibold text-ink">
              Performance factors
            </h2>
          </div>

          <div className="mt-7 space-y-6">
            {trustFactors.map((factor) => (
              <ProgressRow
                key={factor.label}
                label={factor.label}
                value={factor.value}
                description={factor.description}
              />
            ))}
          </div>
        </Card>
      </div>

      {/* Project performance */}
      <Card className="overflow-hidden">
        <div className="border-b border-line px-6 py-5">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                Delivery record
              </p>

              <h2 className="mt-1 font-display text-lg font-semibold text-ink">
                Recent projects
              </h2>
            </div>

            <div className="flex items-center gap-2 text-xs text-ink/45">
              <FileCheck2 className="h-4 w-4" />
              Performance history
            </div>
          </div>
        </div>

        <div className="divide-y divide-line">
          {recentProjects.map((project) => (
            <div
              key={project.name}
              className="px-6 py-5 transition-colors hover:bg-ink/[0.02]"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-semibold text-ink">
                      {project.name}
                    </h3>

                    <span
                      className={
                        project.status === 'Completed'
                          ? 'rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold text-emerald-700'
                          : 'rounded-full bg-amber-500/10 px-2 py-1 text-[10px] font-semibold text-amber-700'
                      }
                    >
                      {project.status}
                    </span>
                  </div>

                  <div className="mt-3 max-w-xl">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-ink/40">Project progress</span>
                      <span className="font-medium text-ink/60">
                        {project.progress}%
                      </span>
                    </div>

                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink/5">
                      <div
                        className="h-full rounded-full bg-ink"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-xs sm:grid-cols-3">
                  <div>
                    <p className="text-ink/40">Contract</p>
                    <p className="mt-1 font-semibold text-ink">
                      {project.value}
                    </p>
                  </div>

                  <div>
                    <p className="text-ink/40">Client rating</p>
                    <p className="mt-1 flex items-center gap-1 font-semibold text-ink">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      {project.rating}
                    </p>
                  </div>

                  <div className="hidden sm:block">
                    <p className="text-ink/40">Delivery</p>
                    <p className="mt-1 font-semibold text-ink">
                      {project.progress === 100
                        ? 'Completed'
                        : 'On track'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Risk and attention */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                Risk monitoring
              </p>

              <h2 className="mt-1 font-display text-lg font-semibold text-ink">
                Items requiring attention
              </h2>
            </div>

            <Flag className="h-5 w-5 text-ink/45" />
          </div>

          <div className="mt-6 space-y-3">
            {riskItems.map((item) => {
              const Icon = item.icon

              return (
                <div
                  key={item.title}
                  className="flex gap-3 rounded-xl border border-line bg-paper-2 p-4"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink/5">
                    <Icon className="h-4 w-4 text-ink/60" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold text-ink">
                        {item.title}
                      </p>

                      <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] font-semibold text-red-600">
                        {item.severity}
                      </span>
                    </div>

                    <p className="mt-1 text-xs leading-5 text-ink/45">
                      {item.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                Marketplace readiness
              </p>

              <h2 className="mt-1 font-display text-lg font-semibold text-ink">
                Contractor profile strength
              </h2>
            </div>

            <Users className="h-5 w-5 text-ink/45" />
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between rounded-xl bg-paper-2 p-4">
              <div>
                <p className="text-sm font-medium text-ink">
                  Verification
                </p>
                <p className="mt-0.5 text-xs text-ink/40">
                  Company and professional credentials
                </p>
              </div>

              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            </div>

            <div className="flex items-center justify-between rounded-xl bg-paper-2 p-4">
              <div>
                <p className="text-sm font-medium text-ink">
                  Portfolio
                </p>
                <p className="mt-0.5 text-xs text-ink/40">
                  18 completed projects displayed
                </p>
              </div>

              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            </div>

            <div className="flex items-center justify-between rounded-xl bg-paper-2 p-4">
              <div>
                <p className="text-sm font-medium text-ink">
                  Client feedback
                </p>
                <p className="mt-0.5 text-xs text-ink/40">
                  4.8 average rating across completed work
                </p>
              </div>

              <Star className="h-5 w-5 fill-current text-ink/60" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}