import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Clock3,
  DollarSign,
  Package,
  ShoppingCart,
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
}

function MetricCard({
  label,
  value,
  description,
  change,
  changeType = 'neutral',
  icon: Icon,
}: MetricCardProps) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-ink/45">
            {label}
          </p>

          <p className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">
            {value}
          </p>

          <p className="mt-1 text-xs leading-5 text-ink/40">
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
                    ? 'font-medium text-emerald-600'
                    : changeType === 'negative'
                      ? 'font-medium text-red-500'
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
  description: string
}

function PerformanceRow({
  label,
  value,
  description,
}: ProgressRowProps) {
  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-ink">
            {label}
          </p>

          <p className="mt-0.5 text-xs text-ink/40">
            {description}
          </p>
        </div>

        <span className="text-sm font-semibold text-ink">
          {value}%
        </span>
      </div>

      <div className="mt-2 h-2 overflow-hidden rounded-full bg-ink/5">
        <div
          className="h-full rounded-full bg-ink transition-all duration-500"
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
    },
    {
      label: 'Active Vendors',
      value: '284',
      description: 'Verified businesses and service providers',
      change: '+38 this month',
      changeType: 'positive' as const,
      icon: Store,
    },
    {
      label: 'Active Listings',
      value: '4,862',
      description: 'Products, equipment and services available',
      change: '+12.4%',
      changeType: 'positive' as const,
      icon: Package,
    },
    {
      label: 'Completed Orders',
      value: '1,746',
      description: 'Successfully fulfilled marketplace orders',
      change: '+18.9%',
      changeType: 'positive' as const,
      icon: CheckCircle2,
    },
  ]

  const orderMetrics = [
    {
      label: 'Pending Orders',
      value: '184',
      description: 'Orders currently awaiting fulfilment',
      icon: Clock3,
    },
    {
      label: 'In Delivery',
      value: '96',
      description: 'Orders currently in transit',
      icon: Package,
    },
    {
      label: 'Disputed Orders',
      value: '17',
      description: 'Orders currently under dispute',
      icon: AlertTriangle,
    },
    {
      label: 'Cancelled Orders',
      value: '31',
      description: 'Orders cancelled during the period',
      icon: XCircle,
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5">
              <Store className="h-5 w-5 text-ink/70" />
            </div>

            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/40">
              Marketplace Intelligence
            </span>
          </div>

          <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Marketplace Analytics
          </h1>

          <p className="mt-1 max-w-2xl text-sm leading-6 text-ink/50">
            Monitor marketplace activity, vendor performance, order
            fulfilment, transaction volume, customer satisfaction and
            marketplace health.
          </p>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-line bg-white px-3 py-2 text-xs font-medium text-ink/60">
          <TrendingUp className="h-4 w-4 text-emerald-600" />
          Marketplace growing
        </div>
      </div>

      {/* Marketplace overview */}
      <section>
        <div className="mb-3">
          <h2 className="font-display text-base font-semibold text-ink">
            Marketplace overview
          </h2>

          <p className="mt-0.5 text-xs text-ink/40">
            Core marketplace activity and commercial performance
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {marketplaceMetrics.map((metric) => (
            <MetricCard
              key={metric.label}
              {...metric}
            />
          ))}
        </div>
      </section>

      {/* Orders */}
      <section>
        <div className="mb-3">
          <h2 className="font-display text-base font-semibold text-ink">
            Order activity
          </h2>

          <p className="mt-0.5 text-xs text-ink/40">
            Current marketplace order position
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {orderMetrics.map((metric) => (
            <MetricCard
              key={metric.label}
              label={metric.label}
              value={metric.value}
              description={metric.description}
              icon={metric.icon}
            />
          ))}
        </div>
      </section>

      {/* Performance + trust */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-1">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                Marketplace health
              </p>

              <h2 className="mt-1 font-display text-lg font-semibold text-ink">
                Overall score
              </h2>
            </div>

            <BarChart3 className="h-5 w-5 text-ink/45" />
          </div>

          <div className="mt-8 flex flex-col items-center">
            <div className="flex h-36 w-36 items-center justify-center rounded-full border-[10px] border-ink/10">
              <div className="text-center">
                <p className="font-display text-4xl font-bold tracking-tight text-ink">
                  93
                </p>

                <p className="text-xs font-medium text-ink/40">
                  / 100
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-700">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Healthy marketplace
            </div>

            <p className="mt-4 text-center text-xs leading-5 text-ink/45">
              Overall score combines fulfilment, vendor reliability,
              customer satisfaction, listing quality and transaction health.
            </p>
          </div>
        </Card>

        <Card className="p-6 lg:col-span-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
              Performance indicators
            </p>

            <h2 className="mt-1 font-display text-lg font-semibold text-ink">
              Marketplace performance
            </h2>
          </div>

          <div className="mt-7 space-y-6">
            {marketplacePerformance.map((metric) => (
              <PerformanceRow
                key={metric.label}
                {...metric}
              />
            ))}
          </div>
        </Card>
      </div>

      {/* Categories */}
      <Card className="overflow-hidden">
        <div className="border-b border-line px-6 py-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
            Marketplace structure
          </p>

          <h2 className="mt-1 font-display text-lg font-semibold text-ink">
            Category performance
          </h2>

          <p className="mt-1 text-xs text-ink/40">
            Activity across major marketplace categories
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px]">
            <thead>
              <tr className="border-b border-line text-left">
                <th className="px-6 py-3 text-[10px] font-semibold uppercase tracking-wide text-ink/40">
                  Category
                </th>

                <th className="px-6 py-3 text-[10px] font-semibold uppercase tracking-wide text-ink/40">
                  Listings
                </th>

                <th className="px-6 py-3 text-[10px] font-semibold uppercase tracking-wide text-ink/40">
                  Orders
                </th>

                <th className="px-6 py-3 text-[10px] font-semibold uppercase tracking-wide text-ink/40">
                  Transaction volume
                </th>

                <th className="px-6 py-3 text-[10px] font-semibold uppercase tracking-wide text-ink/40">
                  Growth
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-line">
              {categories.map((category) => (
                <tr
                  key={category.name}
                  className="transition-colors hover:bg-ink/[0.02]"
                >
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-ink">
                      {category.name}
                    </p>
                  </td>

                  <td className="px-6 py-4 text-sm text-ink/60">
                    {category.listings}
                  </td>

                  <td className="px-6 py-4 text-sm text-ink/60">
                    {category.orders}
                  </td>

                  <td className="px-6 py-4 text-sm font-semibold text-ink">
                    {category.volume}
                  </td>

                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                      {category.growth}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Top vendors */}
      <Card className="overflow-hidden">
        <div className="flex flex-col justify-between gap-3 border-b border-line px-6 py-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
              Vendor performance
            </p>

            <h2 className="mt-1 font-display text-lg font-semibold text-ink">
              Top marketplace vendors
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs text-ink/45">
            <Users className="h-4 w-4" />
            Ranked by marketplace performance
          </div>
        </div>

        <div className="divide-y divide-line">
          {topVendors.map((vendor, index) => (
            <div
              key={vendor.name}
              className="px-6 py-5 transition-colors hover:bg-ink/[0.02]"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink/5 text-xs font-bold text-ink/50">
                    #{index + 1}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-ink">
                      {vendor.name}
                    </p>

                    <p className="mt-0.5 text-xs text-ink/40">
                      {vendor.category}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-ink/35">
                      Orders
                    </p>

                    <p className="mt-1 text-sm font-semibold text-ink">
                      {vendor.orders}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-ink/35">
                      Volume
                    </p>

                    <p className="mt-1 text-sm font-semibold text-ink">
                      {vendor.volume}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-ink/35">
                      Rating
                    </p>

                    <p className="mt-1 flex items-center gap-1 text-sm font-semibold text-ink">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      {vendor.rating}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-ink/35">
                      Fulfilment
                    </p>

                    <p className="mt-1 text-sm font-semibold text-ink">
                      {vendor.fulfilment}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Marketplace health */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
            <ShoppingCart className="h-5 w-5 text-emerald-600" />
          </div>

          <p className="mt-5 text-xs font-medium uppercase tracking-wide text-ink/40">
            Conversion rate
          </p>

          <p className="mt-1 font-display text-2xl font-semibold text-ink">
            7.8%
          </p>

          <p className="mt-2 text-xs leading-5 text-ink/40">
            Percentage of marketplace visitors who proceed to an order.
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink/5">
            <Users className="h-5 w-5 text-ink/60" />
          </div>

          <p className="mt-5 text-xs font-medium uppercase tracking-wide text-ink/40">
            Repeat buyers
          </p>

          <p className="mt-1 font-display text-2xl font-semibold text-ink">
            64.2%
          </p>

          <p className="mt-2 text-xs leading-5 text-ink/40">
            Customers who have completed more than one marketplace
            transaction.
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10">
            <AlertTriangle className="h-5 w-5 text-amber-700" />
          </div>

          <p className="mt-5 text-xs font-medium uppercase tracking-wide text-ink/40">
            Dispute rate
          </p>

          <p className="mt-1 font-display text-2xl font-semibold text-ink">
            0.97%
          </p>

          <p className="mt-2 text-xs leading-5 text-ink/40">
            Percentage of marketplace orders currently entering dispute.
          </p>
        </Card>
      </div>
    </div>
  )
}