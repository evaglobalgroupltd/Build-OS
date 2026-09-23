import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Clock3,
  DollarSign,
  Package,
  ShoppingCart,
  Sparkles,
  Star,
  Store,
  TrendingUp,
  Users,
  XCircle,
} from 'lucide-react'

import { Card } from '@/components/ui/Card'

interface MetricCardProps {
  label: string
  value: string
  description: string
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon: typeof Store
  accent?: 'copper' | 'green' | 'ink'
}

function MetricCard({
  label,
  value,
  description,
  change,
  changeType = 'neutral',
  icon: Icon,
  accent = 'ink',
}: MetricCardProps) {
  const accentStyles = {
    copper: {
      icon: 'bg-[#B85C12]/10 text-[#B85C12]',
      glow: 'from-[#B85C12]/[0.08]',
    },
    green: {
      icon: 'bg-[#173629]/10 text-[#173629]',
      glow: 'from-[#173629]/[0.07]',
    },
    ink: {
      icon: 'bg-ink/5 text-ink/60',
      glow: 'from-ink/[0.04]',
    },
  }

  return (
    <Card className="group relative overflow-hidden p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(23,54,41,0.08)]">
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accentStyles[accent].glow} via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
      />

      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/40">
            {label}
          </p>

          <p className="mt-2 font-display text-[26px] font-semibold tracking-tight text-ink">
            {value}
          </p>

          <p className="mt-1 max-w-[220px] text-xs leading-5 text-ink/40">
            {description}
          </p>

          {change && (
            <div className="mt-3 flex items-center gap-1.5 text-xs">
              {changeType === 'positive' && (
                <ArrowUpRight className="h-3.5 w-3.5 text-emerald-600" />
              )}

              {changeType === 'negative' && (
                <ArrowDownRight className="h-3.5 w-3.5 text-red-500" />
              )}

              <span
                className={
                  changeType === 'positive'
                    ? 'font-semibold text-emerald-600'
                    : changeType === 'negative'
                      ? 'font-semibold text-red-500'
                      : 'text-ink/45'
                }
              >
                {change}
              </span>
            </div>
          )}
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${accentStyles[accent].icon}`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </Card>
  )
}

interface PerformanceRowProps {
  label: string
  value: number
  description: string
}

function PerformanceRow({
  label,
  value,
  description,
}: PerformanceRowProps) {
  return (
    <div className="group">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-ink">{label}</p>

          <p className="mt-0.5 text-xs leading-5 text-ink/40">
            {description}
          </p>
        </div>

        <span className="font-display text-sm font-semibold text-ink">
          {value}%
        </span>
      </div>

      <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-ink/[0.06]">
        <div
          className="h-full rounded-full bg-[#B85C12] transition-all duration-500 group-hover:bg-[#D88A4B]"
          style={{
            width: `${Math.min(Math.max(value, 0), 100)}%`,
          }}
        />
      </div>
    </div>
  )
}

export function MarketplaceAnalytics() {
  const marketplaceMetrics = [
    {
      label: 'Marketplace GMV',
      value: '₦126.8M',
      description: 'Total value of marketplace transactions',
      change: '+24.6% vs previous period',
      changeType: 'positive' as const,
      icon: DollarSign,
      accent: 'copper' as const,
    },
    {
      label: 'Active Vendors',
      value: '284',
      description: 'Verified businesses and service providers',
      change: '+38 this month',
      changeType: 'positive' as const,
      icon: Store,
      accent: 'green' as const,
    },
    {
      label: 'Active Listings',
      value: '4,862',
      description: 'Products, equipment and services available',
      change: '+12.4%',
      changeType: 'positive' as const,
      icon: Package,
      accent: 'copper' as const,
    },
    {
      label: 'Completed Orders',
      value: '1,746',
      description: 'Successfully fulfilled marketplace orders',
      change: '+18.9%',
      changeType: 'positive' as const,
      icon: CheckCircle2,
      accent: 'green' as const,
    },
  ]

  const orderMetrics = [
    {
      label: 'Pending Orders',
      value: '184',
      description: 'Orders currently awaiting fulfilment',
      icon: Clock3,
      accent: 'copper' as const,
    },
    {
      label: 'In Delivery',
      value: '96',
      description: 'Orders currently in transit',
      icon: Package,
      accent: 'green' as const,
    },
    {
      label: 'Disputed Orders',
      value: '17',
      description: 'Orders currently under dispute',
      icon: AlertTriangle,
      accent: 'copper' as const,
    },
    {
      label: 'Cancelled Orders',
      value: '31',
      description: 'Orders cancelled during the period',
      icon: XCircle,
      accent: 'ink' as const,
    },
  ]

  const marketplacePerformance = [
    {
      label: 'Order Fulfilment',
      value: 94,
      description: 'Orders successfully completed',
    },
    {
      label: 'On-Time Delivery',
      value: 91,
      description: 'Orders delivered within expected timeframe',
    },
    {
      label: 'Vendor Reliability',
      value: 93,
      description: 'Vendor delivery and fulfilment performance',
    },
    {
      label: 'Customer Satisfaction',
      value: 95,
      description: 'Average customer marketplace rating',
    },
    {
      label: 'Listing Quality',
      value: 89,
      description: 'Listings meeting marketplace standards',
    },
  ]

  const categories = [
    {
      name: 'Building Materials',
      listings: '1,842',
      orders: '742',
      volume: '₦48.6M',
      growth: '+21%',
    },
    {
      name: 'Equipment & Machinery',
      listings: '624',
      orders: '186',
      volume: '₦31.4M',
      growth: '+17%',
    },
    {
      name: 'Tools & Hardware',
      listings: '1,126',
      orders: '428',
      volume: '₦18.7M',
      growth: '+28%',
    },
    {
      name: 'Professional Services',
      listings: '738',
      orders: '274',
      volume: '₦16.2M',
      growth: '+31%',
    },
    {
      name: 'Logistics & Delivery',
      listings: '532',
      orders: '116',
      volume: '₦11.9M',
      growth: '+14%',
    },
  ]

  const topVendors = [
    {
      name: 'BuildMart Supplies',
      category: 'Building Materials',
      orders: 128,
      volume: '₦8.4M',
      rating: '4.9',
      fulfilment: '98%',
    },
    {
      name: 'ProBuild Equipment',
      category: 'Equipment & Machinery',
      orders: 94,
      volume: '₦6.8M',
      rating: '4.8',
      fulfilment: '96%',
    },
    {
      name: 'Prime Hardware',
      category: 'Tools & Hardware',
      orders: 87,
      volume: '₦4.2M',
      rating: '4.8',
      fulfilment: '95%',
    },
    {
      name: 'ExpertBuild Services',
      category: 'Professional Services',
      orders: 72,
      volume: '₦3.9M',
      rating: '4.9',
      fulfilment: '97%',
    },
  ]

  return (
    <div className="space-y-8">
      {/* =========================================================
          MARKETPLACE HERO
      ========================================================= */}
      <section className="relative overflow-hidden rounded-[28px] bg-[#173629] px-6 py-8 text-white shadow-[0_24px_70px_rgba(23,54,41,0.16)] sm:px-8 lg:px-10 lg:py-10">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#B85C12]/20 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-36 left-1/3 h-72 w-72 rounded-full bg-white/[0.04] blur-3xl" />

        <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.07]">
                <Store className="h-5 w-5 text-[#D88A4B]" />
              </div>

              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                Marketplace Intelligence
              </span>
            </div>

            <h1 className="mt-5 max-w-2xl font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[42px] lg:leading-[1.08]">
              The marketplace,
              <br />
              <span className="text-[#D88A4B]">at a glance.</span>
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/55 sm:text-[15px]">
              Monitor marketplace activity, vendor performance, order
              fulfilment, transaction volume, customer satisfaction and
              commercial health from one command surface.
            </p>
          </div>

          <div className="flex shrink-0 flex-col items-start gap-3 lg:items-end">
            <div className="flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-300/[0.08] px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-200">
                Marketplace growing
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-white/40">
              <TrendingUp className="h-4 w-4 text-[#D88A4B]" />
              +24.6% GMV growth
            </div>
          </div>
        </div>

        <div className="relative mt-9 grid gap-3 border-t border-white/[0.08] pt-6 sm:grid-cols-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
              Marketplace GMV
            </p>

            <p className="mt-1 font-display text-xl font-semibold text-white">
              ₦126.8M
            </p>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
              Active vendors
            </p>

            <p className="mt-1 font-display text-xl font-semibold text-white">
              284
            </p>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
              Active listings
            </p>

            <p className="mt-1 font-display text-xl font-semibold text-[#D88A4B]">
              4,862
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          MARKETPLACE OVERVIEW
      ========================================================= */}
      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B85C12]">
              Commercial overview
            </p>

            <h2 className="mt-1 font-display text-xl font-semibold tracking-tight text-ink">
              Marketplace at scale
            </h2>

            <p className="mt-1 text-xs text-ink/40">
              Core marketplace activity and commercial performance
            </p>
          </div>

          <div className="hidden items-center gap-2 text-xs font-medium text-ink/35 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Positive movement across core indicators
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {marketplaceMetrics.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </div>
      </section>

      {/* =========================================================
          ORDER ACTIVITY
      ========================================================= */}
      <section>
        <div className="mb-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B85C12]">
            Order intelligence
          </p>

          <h2 className="mt-1 font-display text-xl font-semibold tracking-tight text-ink">
            Marketplace order position
          </h2>

          <p className="mt-1 text-xs text-ink/40">
            Current order pipeline and fulfilment exposure
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {orderMetrics.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </div>
      </section>

      {/* =========================================================
          HEALTH + PERFORMANCE
      ========================================================= */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="relative overflow-hidden bg-[#17251D] p-6 text-white shadow-[0_20px_60px_rgba(23,54,41,0.12)]">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#B85C12]/15 blur-3xl" />

          <div className="relative flex items-start justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-white/40">
                Marketplace health
              </p>

              <h2 className="mt-1 font-display text-xl font-semibold text-white">
                Overall score
              </h2>
            </div>

            <BarChart3 className="h-5 w-5 text-[#D88A4B]" />
          </div>

          <div className="relative mt-8 flex flex-col items-center">
            <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-[11px] border-white/[0.08]">
              <div
                className="absolute inset-[-11px] rounded-full border-[11px] border-transparent border-t-[#B85C12] border-r-[#B85C12] rotate-[20deg]"
                aria-hidden="true"
              />

              <div className="text-center">
                <p className="font-display text-5xl font-semibold tracking-tight text-white">
                  93
                </p>

                <p className="text-xs font-medium text-white/35">/ 100</p>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 rounded-full border border-emerald-300/10 bg-emerald-300/[0.08] px-3 py-1.5 text-xs font-semibold text-emerald-200">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Healthy marketplace
            </div>

            <p className="mt-4 text-center text-xs leading-5 text-white/40">
              Overall score combines fulfilment, vendor reliability, customer
              satisfaction, listing quality and transaction health.
            </p>
          </div>
        </Card>

        <Card className="p-6 lg:col-span-2">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#B85C12]">
                Performance intelligence
              </p>

              <h2 className="mt-1 font-display text-xl font-semibold tracking-tight text-ink">
                Marketplace performance
              </h2>

              <p className="mt-1 text-xs text-ink/40">
                Operational signals across the marketplace ecosystem
              </p>
            </div>

            <div className="hidden h-9 w-9 items-center justify-center rounded-xl bg-[#173629]/[0.06] sm:flex">
              <TrendingUp className="h-4 w-4 text-[#173629]/70" />
            </div>
          </div>

          <div className="mt-8 space-y-6">
            {marketplacePerformance.map((metric) => (
              <PerformanceRow key={metric.label} {...metric} />
            ))}
          </div>
        </Card>
      </div>

      {/* =========================================================
          CATEGORY PERFORMANCE
      ========================================================= */}
      <Card className="overflow-hidden">
        <div className="flex flex-col justify-between gap-3 border-b border-line px-6 py-6 sm:flex-row sm:items-center sm:px-7">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#B85C12]">
              Marketplace structure
            </p>

            <h2 className="mt-1 font-display text-xl font-semibold tracking-tight text-ink">
              Category performance
            </h2>

            <p className="mt-1 text-xs text-ink/40">
              Commercial activity across major marketplace categories
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-ink/35">
            <Package className="h-4 w-4" />
            5 active categories
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px]">
            <thead>
              <tr className="border-b border-line bg-ink/[0.015] text-left">
                <th className="px-6 py-3.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/35">
                  Category
                </th>

                <th className="px-6 py-3.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/35">
                  Listings
                </th>

                <th className="px-6 py-3.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/35">
                  Orders
                </th>

                <th className="px-6 py-3.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/35">
                  Transaction volume
                </th>

                <th className="px-6 py-3.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/35">
                  Growth
                </th>

                <th className="px-6 py-3.5" />
              </tr>
            </thead>

            <tbody className="divide-y divide-line">
              {categories.map((category, index) => (
                <tr
                  key={category.name}
                  className="group transition-colors hover:bg-[#173629]/[0.018]"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#173629]/[0.05] text-[10px] font-bold text-[#173629]/60">
                        0{index + 1}
                      </div>

                      <p className="text-sm font-semibold text-ink">
                        {category.name}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-5 text-sm text-ink/55">
                    {category.listings}
                  </td>

                  <td className="px-6 py-5 text-sm text-ink/55">
                    {category.orders}
                  </td>

                  <td className="px-6 py-5">
                    <p className="text-sm font-semibold text-ink">
                      {category.volume}
                    </p>
                  </td>

                  <td className="px-6 py-5">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/[0.08] px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                      <ArrowUpRight className="h-3 w-3" />
                      {category.growth}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-right">
                    <div className="ml-auto flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink/25 transition-all group-hover:border-ink/10 group-hover:text-ink/60">
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* =========================================================
          TOP VENDORS
      ========================================================= */}
      <Card className="overflow-hidden">
        <div className="flex flex-col justify-between gap-3 border-b border-line px-6 py-6 sm:flex-row sm:items-center sm:px-7">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#B85C12]">
              Vendor intelligence
            </p>

            <h2 className="mt-1 font-display text-xl font-semibold tracking-tight text-ink">
              Top marketplace vendors
            </h2>

            <p className="mt-1 text-xs text-ink/40">
              High-performing businesses across the marketplace
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-[#173629]/[0.05] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#173629]/60">
            <Users className="h-3.5 w-3.5" />
            Performance leaders
          </div>
        </div>

        <div className="divide-y divide-line">
          {topVendors.map((vendor, index) => (
            <div
              key={vendor.name}
              className="group px-6 py-5 transition-colors hover:bg-[#173629]/[0.018] sm:px-7"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
                <div className="flex min-w-0 flex-1 items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#173629]/[0.06] font-display text-sm font-semibold text-[#173629]">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-ink">
                      {vendor.name}
                    </p>

                    <p className="mt-1 text-xs text-ink/40">
                      {vendor.category}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4 lg:min-w-[470px]">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-ink/30">
                      Orders
                    </p>

                    <p className="mt-1 text-sm font-semibold text-ink">
                      {vendor.orders}
                    </p>
                  </div>

                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-ink/30">
                      Volume
                    </p>

                    <p className="mt-1 text-sm font-semibold text-ink">
                      {vendor.volume}
                    </p>
                  </div>

                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-ink/30">
                      Rating
                    </p>

                    <p className="mt-1 flex items-center gap-1 text-sm font-semibold text-ink">
                      <Star className="h-3.5 w-3.5 fill-[#B85C12] text-[#B85C12]" />
                      {vendor.rating}
                    </p>
                  </div>

                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-ink/30">
                      Fulfilment
                    </p>

                    <p className="mt-1 text-sm font-semibold text-ink">
                      {vendor.fulfilment}
                    </p>
                  </div>
                </div>

                <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-ink/25 transition-all group-hover:border-ink/10 group-hover:text-ink/60 lg:flex">
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* =========================================================
          MARKETPLACE HEALTH
      ========================================================= */}
      <section>
        <div className="mb-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B85C12]">
            Commercial signals
          </p>

          <h2 className="mt-1 font-display text-xl font-semibold tracking-tight text-ink">
            Marketplace health
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="group relative overflow-hidden p-6 transition-all duration-300 hover:-translate-y-0.5">
            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[#173629]/[0.05] blur-3xl" />

            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#173629]/[0.07]">
                  <ShoppingCart className="h-5 w-5 text-[#173629]/70" />
                </div>

                <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-emerald-700">
                  Positive
                </span>
              </div>

              <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.15em] text-ink/35">
                Conversion rate
              </p>

              <p className="mt-1 font-display text-3xl font-semibold tracking-tight text-ink">
                7.8%
              </p>

              <p className="mt-2 text-xs leading-5 text-ink/40">
                Percentage of marketplace visitors who proceed to an order.
              </p>
            </div>
          </Card>

          <Card className="group relative overflow-hidden p-6 transition-all duration-300 hover:-translate-y-0.5">
            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[#B85C12]/[0.05] blur-3xl" />

            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#B85C12]/10">
                  <Users className="h-5 w-5 text-[#B85C12]" />
                </div>

                <span className="rounded-full bg-[#B85C12]/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#B85C12]">
                  Strong
                </span>
              </div>

              <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.15em] text-ink/35">
                Repeat buyers
              </p>

              <p className="mt-1 font-display text-3xl font-semibold tracking-tight text-ink">
                64.2%
              </p>

              <p className="mt-2 text-xs leading-5 text-ink/40">
                Customers who have completed more than one marketplace
                transaction.
              </p>
            </div>
          </Card>

          <Card className="group relative overflow-hidden p-6 transition-all duration-300 hover:-translate-y-0.5">
            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-amber-500/[0.05] blur-3xl" />

            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/10">
                  <AlertTriangle className="h-5 w-5 text-amber-700" />
                </div>

                <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-amber-700">
                  Monitor
                </span>
              </div>

              <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.15em] text-ink/35">
                Dispute rate
              </p>

              <p className="mt-1 font-display text-3xl font-semibold tracking-tight text-ink">
                0.97%
              </p>

              <p className="mt-2 text-xs leading-5 text-ink/40">
                Percentage of marketplace orders currently entering dispute.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* =========================================================
          EXECUTIVE SIGNAL
      ========================================================= */}
      <section className="relative overflow-hidden rounded-[24px] bg-[#17251D] px-6 py-6 text-white shadow-[0_18px_55px_rgba(23,54,41,0.12)] sm:px-7">
        <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#B85C12]/15 blur-3xl" />

        <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06]">
              <Sparkles className="h-5 w-5 text-[#D88A4B]" />
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#D88A4B]">
                Executive signal
              </p>

              <h2 className="mt-1 font-display text-lg font-semibold text-white">
                Marketplace momentum remains strong.
              </h2>

              <p className="mt-1 max-w-2xl text-xs leading-5 text-white/45">
                GMV growth, vendor expansion, completed orders and customer
                satisfaction are all contributing to a healthy marketplace
                operating profile.
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3">
            <TrendingUp className="h-4 w-4 text-[#D88A4B]" />

            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-white/30">
                GMV growth
              </p>

              <p className="font-display text-lg font-semibold text-white">
                +24.6%
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}