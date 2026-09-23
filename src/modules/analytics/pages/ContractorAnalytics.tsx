import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  ArrowUpRight as ExternalArrow,
  Award,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  Clock3,
  Construction,
  DollarSign,
  FileCheck2,
  Flag,
  ShieldCheck,
  Sparkles,
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
  accent?: 'copper' | 'green' | 'ink'
}

function MetricCard({
  label,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  accent = 'ink',
}: MetricCardProps) {
  const accentClasses = {
    copper: {
      icon: 'bg-[#F8EEE6] text-[#B85C12]',
      glow: 'group-hover:border-[#B85C12]/20',
    },
    green: {
      icon: 'bg-[#EAF3EE] text-[#12613E]',
      glow: 'group-hover:border-[#12613E]/20',
    },
    ink: {
      icon: 'bg-ink/[0.05] text-ink/60',
      glow: 'group-hover:border-ink/15',
    },
  }

  return (
    <Card
      className={[
        'group relative overflow-hidden border border-ink/[0.07] bg-white p-5',
        'transition-all duration-300 hover:-translate-y-0.5',
        'hover:shadow-[0_18px_45px_rgba(20,40,30,0.07)]',
        accentClasses[accent].glow,
      ].join(' ')}
    >
      <div className="absolute right-0 top-0 h-20 w-20 translate-x-8 -translate-y-8 rounded-full bg-ink/[0.025] transition-transform duration-500 group-hover:scale-150" />

      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink/40">
            {label}
          </p>

          <p className="mt-2 font-display text-[27px] font-semibold tracking-[-0.035em] text-ink">
            {value}
          </p>

          {change && (
            <div className="mt-2.5 flex items-center gap-1.5 text-[11px]">
              {changeType === 'positive' && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#EAF3EE]">
                  <ArrowUpRight className="h-3 w-3 text-[#12613E]" />
                </span>
              )}

              {changeType === 'negative' && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F9EAEA]">
                  <ArrowDownRight className="h-3 w-3 text-[#B54747]" />
                </span>
              )}

              <span
                className={
                  changeType === 'positive'
                    ? 'font-semibold text-[#12613E]'
                    : changeType === 'negative'
                      ? 'font-semibold text-[#B54747]'
                      : 'font-medium text-ink/45'
                }
              >
                {change}
              </span>
            </div>
          )}
        </div>

        <div
          className={[
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
            accentClasses[accent].icon,
          ].join(' ')}
        >
          <Icon className="h-[17px] w-[17px]" strokeWidth={1.8} />
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
  const normalized = Math.min(Math.max(value, 0), 100)

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[12px] font-semibold text-ink">
            {label}
          </p>

          {description && (
            <p className="mt-1 text-[10px] leading-4 text-ink/40">
              {description}
            </p>
          )}
        </div>

        <span className="shrink-0 font-display text-sm font-semibold text-ink">
          {value}%
        </span>
      </div>

      <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-ink/[0.07]">
        <div
          className="h-full rounded-full bg-[#12613E] transition-all duration-700"
          style={{ width: `${normalized}%` }}
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
      accent: 'green' as const,
    },
    {
      label: 'On-Time Delivery',
      value: '94%',
      change: '+6.2% vs previous period',
      changeType: 'positive' as const,
      icon: Clock3,
      accent: 'green' as const,
    },
    {
      label: 'Client Satisfaction',
      value: '4.8 / 5',
      change: '+0.3 rating',
      changeType: 'positive' as const,
      icon: Star,
      accent: 'copper' as const,
    },
    {
      label: 'Trust Score',
      value: '91 / 100',
      change: 'Excellent standing',
      changeType: 'positive' as const,
      icon: ShieldCheck,
      accent: 'copper' as const,
    },
  ]

  const financialMetrics = [
    {
      label: 'Contract Value',
      value: '₦84.6M',
      change: '+18.4%',
      changeType: 'positive' as const,
      icon: DollarSign,
      accent: 'green' as const,
    },
    {
      label: 'Milestones Approved',
      value: '67',
      change: '98% approval rate',
      changeType: 'positive' as const,
      icon: Target,
      accent: 'green' as const,
    },
    {
      label: 'Active Projects',
      value: '6',
      change: '3 milestones due',
      changeType: 'neutral' as const,
      icon: BriefcaseBusiness,
      accent: 'ink' as const,
    },
    {
      label: 'Disputed Payments',
      value: '1',
      change: '₦420K currently affected',
      changeType: 'negative' as const,
      icon: AlertTriangle,
      accent: 'copper' as const,
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
    <div className="space-y-7">

      {/* ------------------------------------------------------- */}
      {/* Premium analytics header */}
      {/* ------------------------------------------------------- */}

      <div className="relative overflow-hidden rounded-[24px] bg-[#173629] px-6 py-7 shadow-[0_20px_55px_rgba(20,40,30,0.12)] sm:px-8 sm:py-8">
        <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-white/[0.035]" />
        <div className="absolute -bottom-28 right-24 h-48 w-48 rounded-full bg-[#B85C12]/[0.08]" />

        <div className="relative flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D88A4B]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">
                Contractor intelligence
              </span>
            </div>

            <h1 className="max-w-2xl font-display text-[30px] font-semibold leading-tight tracking-[-0.035em] text-white sm:text-[36px]">
              Performance, reputation and commercial intelligence.
            </h1>

            <p className="mt-2 max-w-2xl text-[12px] leading-5 text-white/55">
              A complete view of your delivery record, financial activity,
              project performance and the factors shaping your Build OS
              standing.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-3.5 py-2.5">
            <ShieldCheck className="h-4 w-4 text-[#D88A4B]" />
            <span className="text-[11px] font-semibold text-white/80">
              Verified Contractor
            </span>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------- */}
      {/* Performance overview */}
      {/* ------------------------------------------------------- */}

      <section>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-ink/35">
              Performance
            </p>

            <h2 className="mt-1 font-display text-xl font-semibold tracking-[-0.025em] text-ink">
              Delivery record
            </h2>
          </div>

          <span className="hidden text-[10px] font-medium text-ink/35 sm:block">
            Current performance indicators
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {performanceMetrics.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------- */}
      {/* Commercial performance */}
      {/* ------------------------------------------------------- */}

      <section>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-ink/35">
              Commercial
            </p>

            <h2 className="mt-1 font-display text-xl font-semibold tracking-[-0.025em] text-ink">
              Financial position
            </h2>
          </div>

          <span className="hidden text-[10px] font-medium text-ink/35 sm:block">
            Contracts, milestones and payment activity
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {financialMetrics.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------- */}
      {/* Trust intelligence */}
      {/* ------------------------------------------------------- */}

      <section className="grid gap-5 lg:grid-cols-[minmax(280px,0.72fr)_minmax(0,1.28fr)]">

        {/* Trust score hero */}
        <div className="relative overflow-hidden rounded-[24px] bg-[#17251D] p-6 text-white shadow-[0_18px_50px_rgba(20,40,30,0.11)]">
          <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#B85C12]/[0.08]" />

          <div className="relative flex items-start justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/40">
                Trust score
              </p>

              <h2 className="mt-1 font-display text-xl font-semibold">
                Contractor standing
              </h2>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.08]">
              <Award className="h-4 w-4 text-[#D88A4B]" />
            </div>
          </div>

          <div className="relative mt-8 flex flex-col items-center">
            <div className="relative flex h-44 w-44 items-center justify-center rounded-full border-[10px] border-white/[0.07]">
              <div className="absolute inset-[-10px] rounded-full border-[10px] border-transparent border-l-[#B85C12] border-t-[#B85C12] rotate-[25deg]" />

              <div className="text-center">
                <p className="font-display text-[46px] font-semibold leading-none tracking-[-0.05em]">
                  91
                </p>

                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/35">
                  out of 100
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2 rounded-full bg-[#12613E]/35 px-3 py-1.5">
              <TrendingUp className="h-3.5 w-3.5 text-[#72C49A]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#A8E0C1]">
                Excellent standing
              </span>
            </div>

            <p className="mt-4 max-w-xs text-center text-[11px] leading-5 text-white/45">
              Your score reflects delivery history, quality, compliance,
              client feedback and dispute performance.
            </p>
          </div>

          <div className="relative mt-7 grid grid-cols-3 divide-x divide-white/[0.08] border-t border-white/[0.08] pt-5">
            <div className="text-center">
              <p className="font-display text-lg font-semibold">96%</p>
              <p className="mt-0.5 text-[9px] text-white/35">Completion</p>
            </div>

            <div className="text-center">
              <p className="font-display text-lg font-semibold">94%</p>
              <p className="mt-0.5 text-[9px] text-white/35">On-time</p>
            </div>

            <div className="text-center">
              <p className="font-display text-lg font-semibold">98%</p>
              <p className="mt-0.5 text-[9px] text-white/35">Compliance</p>
            </div>
          </div>
        </div>

        {/* Trust breakdown */}
        <Card className="p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-ink/35">
                Trust intelligence
              </p>

              <h2 className="mt-1 font-display text-xl font-semibold tracking-[-0.025em] text-ink">
                Performance factors
              </h2>

              <p className="mt-1 text-[11px] text-ink/40">
                The operational signals behind your current standing.
              </p>
            </div>

            <div className="hidden h-9 w-9 items-center justify-center rounded-xl bg-[#F4F7F4] sm:flex">
              <Sparkles className="h-4 w-4 text-[#12613E]" />
            </div>
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
      </section>

      {/* ------------------------------------------------------- */}
      {/* Recent projects */}
      {/* ------------------------------------------------------- */}

      <Card className="overflow-hidden">
        <div className="border-b border-ink/[0.07] px-5 py-5 sm:px-6">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-ink/35">
                Delivery record
              </p>

              <h2 className="mt-1 font-display text-xl font-semibold tracking-[-0.025em] text-ink">
                Recent projects
              </h2>
            </div>

            <div className="flex items-center gap-2 rounded-full bg-ink/[0.035] px-3 py-1.5 text-[10px] font-semibold text-ink/45">
              <FileCheck2 className="h-3.5 w-3.5" />
              Performance history
            </div>
          </div>
        </div>

        <div className="divide-y divide-ink/[0.06]">
          {recentProjects.map((project, index) => (
            <div
              key={project.name}
              className="group px-5 py-5 transition-colors duration-200 hover:bg-[#F8FAF8] sm:px-6"
            >
              <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

                <div className="flex min-w-0 items-start gap-4">
                  <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F4F7F4] text-[10px] font-bold text-ink/40 sm:flex">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-[13px] font-semibold text-ink">
                        {project.name}
                      </h3>

                      <span
                        className={
                          project.status === 'Completed'
                            ? 'rounded-full bg-[#EAF3EE] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.06em] text-[#12613E]'
                            : 'rounded-full bg-[#F8EEE6] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.06em] text-[#B85C12]'
                        }
                      >
                        {project.status}
                      </span>
                    </div>

                    <div className="mt-3 max-w-xl">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-medium text-ink/40">
                          Project progress
                        </span>

                        <span className="font-bold text-ink/60">
                          {project.progress}%
                        </span>
                      </div>

                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink/[0.07]">
                        <div
                          className={[
                            'h-full rounded-full transition-all duration-700',
                            project.progress === 100
                              ? 'bg-[#12613E]'
                              : 'bg-[#B85C12]',
                          ].join(' ')}
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-8 xl:justify-end">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.08em] text-ink/35">
                      Contract
                    </p>

                    <p className="mt-1 font-display text-sm font-semibold text-ink">
                      {project.value}
                    </p>
                  </div>

                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.08em] text-ink/35">
                      Client rating
                    </p>

                    <p className="mt-1 flex items-center gap-1 font-display text-sm font-semibold text-ink">
                      <Star className="h-3.5 w-3.5 fill-current text-[#B85C12]" />
                      {project.rating}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/[0.08] text-ink/35 transition-all duration-200 hover:border-[#B85C12]/30 hover:text-[#B85C12]"
                    aria-label={`Open ${project.name}`}
                  >
                    <ExternalArrow className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* ------------------------------------------------------- */}
      {/* Risk monitoring + marketplace readiness */}
      {/* ------------------------------------------------------- */}

      <section className="grid gap-5 lg:grid-cols-2">

        {/* Risk */}
        <Card className="overflow-hidden">
          <div className="border-b border-ink/[0.07] px-5 py-5 sm:px-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-ink/35">
                  Risk monitoring
                </p>

                <h2 className="mt-1 font-display text-xl font-semibold tracking-[-0.025em] text-ink">
                  Items requiring attention
                </h2>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F8EEE6] text-[#B85C12]">
                <Flag className="h-4 w-4" />
              </div>
            </div>
          </div>

          <div className="space-y-3 p-5 sm:p-6">
            {riskItems.map((item) => {
              const Icon = item.icon

              const isHigh = item.severity === 'High'

              return (
                <div
                  key={item.title}
                  className={[
                    'group flex gap-3 rounded-2xl border p-4 transition-all duration-200',
                    isHigh
                      ? 'border-[#B85C12]/15 bg-[#FDF8F4] hover:border-[#B85C12]/25'
                      : 'border-ink/[0.06] bg-[#F8FAF8] hover:border-ink/[0.12]',
                  ].join(' ')}
                >
                  <div
                    className={[
                      'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl',
                      isHigh
                        ? 'bg-[#F8EEE6] text-[#B85C12]'
                        : 'bg-ink/[0.05] text-ink/55',
                    ].join(' ')}
                  >
                    <Icon className="h-4 w-4" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-[12px] font-semibold text-ink">
                        {item.title}
                      </p>

                      <span
                        className={
                          isHigh
                            ? 'rounded-full bg-[#B85C12]/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.06em] text-[#B85C12]'
                            : 'rounded-full bg-ink/[0.05] px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.06em] text-ink/45'
                        }
                      >
                        {item.severity}
                      </span>
                    </div>

                    <p className="mt-1 text-[11px] leading-5 text-ink/45">
                      {item.description}
                    </p>

                    <button
                      type="button"
                      className="mt-2 flex items-center gap-1 text-[10px] font-bold text-[#B85C12] opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      Review item
                      <ExternalArrow className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>

        {/* Marketplace readiness */}
        <div className="relative overflow-hidden rounded-[24px] bg-[#173629] p-6 text-white shadow-[0_18px_50px_rgba(20,40,30,0.10)]">
          <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-white/[0.035]" />

          <div className="relative flex items-start justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/40">
                Marketplace readiness
              </p>

              <h2 className="mt-1 font-display text-xl font-semibold">
                Contractor profile strength
              </h2>

              <p className="mt-1 max-w-md text-[11px] leading-5 text-white/45">
                Strong profile signals improve the quality of opportunities
                surfaced to your business.
              </p>
            </div>

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.08]">
              <Users className="h-4 w-4 text-white/65" />
            </div>
          </div>

          <div className="relative mt-7 space-y-2.5">
            <div className="flex items-center justify-between rounded-2xl border border-white/[0.07] bg-white/[0.055] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#12613E]/50">
                  <Check className="h-3.5 w-3.5 text-[#9BE0BA]" />
                </div>

                <div>
                  <p className="text-[11px] font-semibold text-white/85">
                    Verification
                  </p>

                  <p className="mt-0.5 text-[9px] text-white/35">
                    Company and professional credentials
                  </p>
                </div>
              </div>

              <CheckCircle2 className="h-4 w-4 text-[#72C49A]" />
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-white/[0.07] bg-white/[0.055] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#12613E]/50">
                  <Check className="h-3.5 w-3.5 text-[#9BE0BA]" />
                </div>

                <div>
                  <p className="text-[11px] font-semibold text-white/85">
                    Portfolio
                  </p>

                  <p className="mt-0.5 text-[9px] text-white/35">
                    18 completed projects displayed
                  </p>
                </div>
              </div>

              <CheckCircle2 className="h-4 w-4 text-[#72C49A]" />
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-white/[0.07] bg-white/[0.055] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#B85C12]/20">
                  <Star className="h-3.5 w-3.5 text-[#D88A4B]" />
                </div>

                <div>
                  <p className="text-[11px] font-semibold text-white/85">
                    Client feedback
                  </p>

                  <p className="mt-0.5 text-[9px] text-white/35">
                    4.8 average rating across completed work
                  </p>
                </div>
              </div>

              <span className="font-display text-sm font-semibold text-white/80">
                4.8
              </span>
            </div>
          </div>

          <button
            type="button"
            className="relative mt-5 flex items-center gap-2 text-[11px] font-bold text-white transition-colors hover:text-[#D88A4B]"
          >
            Strengthen profile
            <ExternalArrow className="h-3.5 w-3.5" />
          </button>
        </div>
      </section>

      {/* ------------------------------------------------------- */}
      {/* Bottom insight */}
      {/* ------------------------------------------------------- */}

      <div className="flex flex-col gap-4 rounded-[20px] border border-ink/[0.07] bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F4F7F4] text-[#12613E]">
            <Sparkles className="h-3.5 w-3.5" />
          </div>

          <div>
            <p className="text-[11px] font-semibold text-ink">
              Your strongest signal is delivery consistency.
            </p>

            <p className="mt-0.5 text-[10px] leading-4 text-ink/40">
              Maintaining on-time milestones and high client satisfaction
              continues to support your contractor standing.
            </p>
          </div>
        </div>

        <button
          type="button"
          className="flex shrink-0 items-center gap-1.5 text-[10px] font-bold text-[#B85C12]"
        >
          View full performance history
          <ExternalArrow className="h-3 w-3" />
        </button>
      </div>
    </div>
  )
}