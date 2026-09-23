import type { ComponentType } from 'react'

import {
  BadgeCheck,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileCheck2,
  Globe2,
  Mail,
  MapPin,
  Package,
  Phone,
  ShieldCheck,
  Star,
  TrendingUp,
  Truck,
  Warehouse,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'

const supplier = {
  name: 'Prime Build Materials Ltd.',
  initials: 'PB',
  registration: 'RC 2198473',
  category: 'Construction Materials Supplier',
  location: 'Abuja, Nigeria',
  website: 'www.primebuildmaterials.example',
  email: 'sales@primebuildmaterials.example',
  phone: '+234 800 000 0000',

  verified: true,
  trustScore: 94,
  rating: 4.9,
  reviews: 67,
  yearsExperience: 11,

  completedDeliveries: 128,
  activeOrders: 14,
  catalogueItems: 86,
  deliveryAcceptance: 98,
  onTimeDelivery: 96,
  compliance: 99,

  deliveryCoverage: 'FCT + 5 States',
}

const categories = [
  'Cement & Concrete',
  'Steel & Reinforcement',
  'Blocks & Masonry',
  'Roofing',
  'Finishing',
  'Plumbing',
  'Electrical',
]

const verificationItems = [
  'CAC registration verified',
  'Tax identification verified',
  'Business identity verified',
  'Bank account verified',
  'Warehouse verified',
  'Product catalogue approved',
  'Delivery capability verified',
  'Compliance documentation reviewed',
]

const products = [
  {
    name: 'Dangote Cement',
    category: 'Cement & Concrete',
    specification: '42.5R Grade Portland Cement',
    price: '₦11,250',
    stock: 'In Stock',
  },
  {
    name: 'High Yield Reinforcement Bar',
    category: 'Steel & Reinforcement',
    specification: '12mm High Tensile Steel Bar',
    price: '₦18,500',
    stock: 'In Stock',
  },
  {
    name: 'Premium Sandcrete Block',
    category: 'Blocks & Masonry',
    specification: '9-inch Load Bearing Block',
    price: '₦850',
    stock: 'Low Stock',
  },
  {
    name: 'Long Span Aluminium Roofing',
    category: 'Roofing',
    specification: '0.55mm Long Span Aluminium',
    price: '₦14,800',
    stock: 'In Stock',
  },
]

const recentDeliveries = [
  {
    project: 'Gwarinpa Residential Development',
    materials: 'Cement, reinforcement and blocks',
    value: '₦8.4M',
    rating: '4.9',
    status: 'Delivered',
  },
  {
    project: 'Maitama Duplex Construction',
    materials: 'Roofing and finishing materials',
    value: '₦12.6M',
    rating: '4.8',
    status: 'Delivered',
  },
  {
    project: 'Jabi Commercial Renovation',
    materials: 'Plumbing and electrical materials',
    value: '₦5.2M',
    rating: '4.9',
    status: 'In Transit',
  },
]

export function Market_PlaceProfile() {
  return (
    <div className="space-y-6">
      {/* ================================================================
          SUPPLIER HERO
      ================================================================ */}
      <Card className="group relative overflow-hidden border-0 bg-[#0B1220] text-white shadow-[0_20px_60px_rgba(11,18,32,0.12)]">
        {/* Ambient light */}
        <div className="pointer-events-none absolute -right-32 -top-40 h-96 w-96 rounded-full bg-[#1657FF]/20 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-[#34A6FF]/10 blur-3xl" />

        {/* Subtle grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '34px 34px',
          }}
        />

        <div className="relative px-6 py-7 sm:px-8 sm:py-8">
          <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
            {/* Identity */}
            <div className="flex min-w-0 items-start gap-4 sm:gap-5">
              <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.07] text-lg font-bold tracking-wide text-white shadow-lg sm:h-[72px] sm:w-[72px]">
                {supplier.initials}

                {supplier.verified && (
                  <span className="absolute -bottom-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full border-[3px] border-[#0B1220] bg-[#1657FF] shadow-lg">
                    <BadgeCheck className="h-3.5 w-3.5 text-white" />
                  </span>
                )}
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2.5">
                  <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-[#34A6FF]">
                    Verified marketplace supplier
                  </p>
                </div>

                <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  {supplier.name}
                </h1>

                <p className="mt-1 text-sm text-white/50">
                  {supplier.category}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-medium text-white/40">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    {supplier.location}
                  </span>

                  <span className="inline-flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5" />
                    {supplier.registration}
                  </span>

                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {supplier.yearsExperience} years experience
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-xs font-semibold text-white/75 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/[0.1] hover:text-white"
              >
                <Mail className="h-3.5 w-3.5" />
                Contact supplier
              </button>

              <button
                type="button"
                className="group/cta inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-xs font-semibold text-[#0B1220] shadow-lg shadow-black/10 transition-all hover:-translate-y-0.5 hover:bg-white/95"
              >
                Request quotation

                <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover/cta:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Key metrics */}
        <div className="relative grid border-t border-white/10 sm:grid-cols-2 xl:grid-cols-4">
          <ProfileMetric
            icon={ShieldCheck}
            label="Trust score"
            value={`${supplier.trustScore}/100`}
            description="Excellent marketplace standing"
            dark
          />

          <ProfileMetric
            icon={Star}
            label="Client rating"
            value={supplier.rating.toString()}
            description={`${supplier.reviews} verified reviews`}
            dark
          />

          <ProfileMetric
            icon={Truck}
            label="Deliveries"
            value={supplier.completedDeliveries.toString()}
            description="Verified completed deliveries"
            dark
          />

          <ProfileMetric
            icon={Clock3}
            label="On-time delivery"
            value={`${supplier.onTimeDelivery}%`}
            description="Orders delivered on schedule"
            dark
          />
        </div>
      </Card>

      {/* ================================================================
          MAIN CONTENT
      ================================================================ */}
      <div className="grid gap-6 xl:grid-cols-3">
        {/* ================================================================
            MAIN COLUMN
        ================================================================ */}
        <div className="space-y-6 xl:col-span-2">
          {/* Supplier information */}
          <Card>
            <CardHeader
              title="Supplier profile"
              subtitle="Business identity, operating details and marketplace capabilities"
            />

            <CardBody>
              <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                <InfoItem
                  icon={Building2}
                  label="Legal entity"
                  value={supplier.name}
                />

                <InfoItem
                  icon={FileCheck2}
                  label="Registration"
                  value={supplier.registration}
                />

                <InfoItem
                  icon={MapPin}
                  label="Operating location"
                  value={supplier.location}
                />

                <InfoItem
                  icon={Warehouse}
                  label="Warehouse"
                  value="Verified warehouse"
                />

                <InfoItem
                  icon={Mail}
                  label="Business email"
                  value={supplier.email}
                />

                <InfoItem
                  icon={Phone}
                  label="Business phone"
                  value={supplier.phone}
                />

                <InfoItem
                  icon={Globe2}
                  label="Website"
                  value={supplier.website}
                />

                <InfoItem
                  icon={Truck}
                  label="Delivery coverage"
                  value={supplier.deliveryCoverage}
                />
              </div>

              <div className="mt-7 border-t border-line pt-6">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-ink/35">
                    Material categories
                  </p>

                  <span className="text-[10px] font-medium text-ink/30">
                    {categories.length} categories
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <span
                      key={category}
                      className="rounded-full border border-line bg-paper-2 px-3 py-1.5 text-xs font-medium text-ink/55 transition-colors hover:border-ink/15 hover:text-ink"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>

          {/* ============================================================
              CATALOGUE
          ============================================================ */}
          <Card className="overflow-hidden">
            <CardHeader
              title="Marketplace catalogue"
              subtitle="Approved materials currently available from this supplier"
            />

            <div className="divide-y divide-line">
              {products.map((product) => (
                <div
                  key={product.name}
                  className="group/product flex flex-col gap-4 px-6 py-5 transition-colors hover:bg-paper-2/60 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-start gap-3.5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-paper-2 transition-colors group-hover/product:border-[#1657FF]/10 group-hover/product:bg-[#1657FF]/5">
                      <Package className="h-4 w-4 text-ink/40 transition-colors group-hover/product:text-[#1657FF]" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-semibold text-ink">
                          {product.name}
                        </h3>

                        <StockBadge status={product.stock} />
                      </div>

                      <p className="mt-1 text-[10px] font-medium uppercase tracking-wide text-ink/35">
                        {product.category}
                      </p>

                      <p className="mt-1 text-xs text-ink/45">
                        {product.specification}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center justify-between gap-5 sm:justify-end">
                    <div>
                      <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.14em] text-ink/30">
                        Starting price
                      </p>

                      <p className="mt-1 font-display text-sm font-semibold text-ink">
                        {product.price}
                      </p>
                    </div>

                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-line text-ink/25 transition-all group-hover/product:border-ink/10 group-hover/product:bg-white group-hover/product:text-ink/60">
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-line bg-paper-2/40 px-6 py-4">
              <button
                type="button"
                className="group/link inline-flex items-center gap-1.5 text-xs font-semibold text-ink/55 transition-colors hover:text-ink"
              >
                View full catalogue

                <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5" />
              </button>
            </div>
          </Card>

          {/* ============================================================
              PERFORMANCE
          ============================================================ */}
          <Card>
            <CardHeader
              title="Delivery performance"
              subtitle="Verified indicators contributing to supplier reliability"
            />

            <CardBody>
              <div className="space-y-7">
                <PerformanceRow
                  label="Delivery completion"
                  value={97}
                  description="Orders successfully completed"
                />

                <PerformanceRow
                  label="On-time delivery"
                  value={supplier.onTimeDelivery}
                  description="Deliveries completed within agreed schedules"
                />

                <PerformanceRow
                  label="Delivery acceptance"
                  value={supplier.deliveryAcceptance}
                  description="Deliveries accepted after project verification"
                />

                <PerformanceRow
                  label="Product quality"
                  value={94}
                  description="Based on verified procurement and client feedback"
                />

                <PerformanceRow
                  label="Platform compliance"
                  value={supplier.compliance}
                  description="Business, catalogue and procurement compliance"
                />
              </div>
            </CardBody>
          </Card>

          {/* ============================================================
              RECENT ACTIVITY
          ============================================================ */}
          <Card className="overflow-hidden">
            <CardHeader
              title="Recent procurement activity"
              subtitle="Verified deliveries from Build OS projects"
            />

            <div className="divide-y divide-line">
              {recentDeliveries.map((delivery) => (
                <div
                  key={delivery.project}
                  className="group/delivery px-6 py-5 transition-colors hover:bg-paper-2/50"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 items-start gap-3">
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-paper-2">
                        <Truck className="h-4 w-4 text-ink/40" />
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-sm font-semibold text-ink">
                            {delivery.project}
                          </h3>

                          <DeliveryStatus status={delivery.status} />
                        </div>

                        <p className="mt-1.5 text-xs text-ink/40">
                          {delivery.materials}
                        </p>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-7 text-xs">
                      <div>
                        <p className="text-[10px] text-ink/35">
                          Order value
                        </p>

                        <p className="mt-1 font-semibold text-ink">
                          {delivery.value}
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] text-ink/35">
                          Rating
                        </p>

                        <p className="mt-1 flex items-center gap-1 font-semibold text-ink">
                          <Star className="h-3.5 w-3.5 fill-current text-amber-500" />
                          {delivery.rating}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* ================================================================
            SIDEBAR
        ================================================================ */}
        <div className="space-y-6">
          {/* ============================================================
              TRUST SCORE
          ============================================================ */}
          <Card className="overflow-hidden">
            <div className="border-b border-line bg-[#0B1220] px-6 py-5 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-white/35">
                    Build OS intelligence
                  </p>

                  <h2 className="mt-1 font-display text-lg font-semibold">
                    Supplier standing
                  </h2>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06]">
                  <TrendingUp className="h-4 w-4 text-[#34A6FF]" />
                </div>
              </div>
            </div>

            <CardBody>
              <div className="flex justify-center">
                <TrustRing score={supplier.trustScore} />
              </div>

              <div className="mt-5 flex justify-center">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/15 bg-emerald-500/8 px-3 py-1.5 text-[10px] font-semibold text-emerald-700">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Excellent standing
                </span>
              </div>

              <p className="mt-4 text-center text-xs leading-5 text-ink/45">
                Trust score is calculated from verification, delivery
                performance, quality, client feedback, compliance and dispute
                history.
              </p>
            </CardBody>
          </Card>

          {/* ============================================================
              VERIFICATION
          ============================================================ */}
          <Card>
            <CardHeader
              title="Verification"
              subtitle="Credentials reviewed by Build OS"
            />

            <CardBody>
              <div className="space-y-2">
                {verificationItems.map((item) => (
                  <div
                    key={item}
                    className="group/verification flex items-center gap-3 rounded-xl border border-transparent bg-paper-2 px-3 py-3 transition-all hover:border-emerald-500/10 hover:bg-emerald-500/[0.025]"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    </div>

                    <span className="text-xs font-medium text-ink/60">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                <span className="text-[10px] font-medium text-ink/35">
                  Verification status
                </span>

                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Verified
                </span>
              </div>
            </CardBody>
          </Card>

          {/* ============================================================
              MARKETPLACE ACTIVITY
          ============================================================ */}
          <Card>
            <CardHeader
              title="Marketplace activity"
              subtitle="Current supplier activity"
            />

            <CardBody>
              <div className="space-y-4">
                <ActivityMetric
                  label="Catalogue items"
                  value={supplier.catalogueItems.toString()}
                />

                <ActivityMetric
                  label="Active orders"
                  value={supplier.activeOrders.toString()}
                />

                <ActivityMetric
                  label="Completed deliveries"
                  value={supplier.completedDeliveries.toString()}
                />

                <ActivityMetric
                  label="Client rating"
                  value={`${supplier.rating} / 5`}
                />

                <ActivityMetric
                  label="Compliance"
                  value={`${supplier.compliance}%`}
                />
              </div>
            </CardBody>
          </Card>

          {/* ============================================================
              PAYMENT PROTECTION
          ============================================================ */}
          <Card className="overflow-hidden">
            <div className="border-b border-line bg-paper-2 px-6 py-5">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-ink/35">
                Procurement control
              </p>

              <h2 className="mt-1 font-display text-lg font-semibold text-ink">
                Payment protection
              </h2>

              <p className="mt-1 text-xs text-ink/40">
                Build OS procurement workflow
              </p>
            </div>

            <CardBody>
              <div className="flex gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#1657FF]/10 bg-[#1657FF]/5">
                  <ShieldCheck className="h-4 w-4 text-[#1657FF]" />
                </div>

                <div>
                  <p className="text-xs font-semibold text-ink">
                    Controlled supplier payment
                  </p>

                  <p className="mt-1.5 text-xs leading-5 text-ink/45">
                    Payment is released only after delivery evidence is
                    uploaded, verified and accepted through the Build OS
                    procurement workflow.
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}

/* ==========================================================================
   PROFILE METRIC
========================================================================== */

function ProfileMetric({
  icon: Icon,
  label,
  value,
  description,
  dark = false,
}: {
  icon: ComponentType<{ className?: string }>
  label: string
  value: string
  description: string
  dark?: boolean
}) {
  return (
    <div
      className={
        dark
          ? 'border-b border-white/10 px-6 py-5 last:border-b-0 sm:px-7 xl:border-b-0 xl:border-r xl:last:border-r-0'
          : 'px-6 py-5 sm:px-7'
      }
    >
      <div className="flex items-center gap-3">
        <div
          className={
            dark
              ? 'flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06]'
              : 'flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5'
          }
        >
          <Icon
            className={
              dark
                ? 'h-4 w-4 text-[#34A6FF]'
                : 'h-4 w-4 text-ink/55'
            }
          />
        </div>

        <div>
          <p
            className={
              dark
                ? 'text-[9px] font-semibold uppercase tracking-[0.14em] text-white/30'
                : 'text-[10px] font-semibold uppercase tracking-wide text-ink/35'
            }
          >
            {label}
          </p>

          <p
            className={
              dark
                ? 'mt-0.5 font-display text-xl font-semibold text-white'
                : 'mt-0.5 font-display text-xl font-semibold text-ink'
            }
          >
            {value}
          </p>
        </div>
      </div>

      <p
        className={
          dark
            ? 'mt-3 text-[10px] text-white/35'
            : 'mt-3 text-xs text-ink/40'
        }
      >
        {description}
      </p>
    </div>
  )
}

/* ==========================================================================
   TRUST RING
========================================================================== */

function TrustRing({
  score,
}: {
  score: number
}) {
  const safeScore = Math.min(Math.max(score, 0), 100)

  return (
    <div
      className="relative flex h-36 w-36 items-center justify-center rounded-full"
      style={{
        background: `conic-gradient(#1657FF ${safeScore}%, rgba(11,18,32,0.06) ${safeScore}% 100%)`,
      }}
    >
      <div className="absolute inset-[9px] flex flex-col items-center justify-center rounded-full bg-white shadow-inner">
        <p className="font-display text-3xl font-bold tracking-tight text-ink">
          {safeScore}
        </p>

        <p className="mt-0.5 font-mono text-[8px] font-semibold uppercase tracking-[0.15em] text-ink/35">
          Trust score
        </p>
      </div>
    </div>
  )
}

/* ==========================================================================
   INFO ITEM
========================================================================== */

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="group/info flex gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink/5 transition-colors group-hover/info:bg-[#1657FF]/5">
        <Icon className="h-4 w-4 text-ink/45 transition-colors group-hover/info:text-[#1657FF]" />
      </div>

      <div className="min-w-0">
        <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.14em] text-ink/30">
          {label}
        </p>

        <p className="mt-1 truncate text-sm font-medium text-ink">
          {value}
        </p>
      </div>
    </div>
  )
}

/* ==========================================================================
   PERFORMANCE ROW
========================================================================== */

function PerformanceRow({
  label,
  value,
  description,
}: {
  label: string
  value: number
  description: string
}) {
  const safeValue = Math.min(Math.max(value, 0), 100)

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-ink">{label}</p>

          <p className="mt-0.5 text-xs text-ink/40">{description}</p>
        </div>

        <span className="font-display text-sm font-semibold text-ink">
          {safeValue}%
        </span>
      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-ink/5">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#1657FF] to-[#34A6FF] transition-all duration-700"
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  )
}

/* ==========================================================================
   STOCK BADGE
========================================================================== */

function StockBadge({
  status,
}: {
  status: string
}) {
  const styles =
    status === 'In Stock'
      ? 'border-emerald-500/10 bg-emerald-500/8 text-emerald-700'
      : status === 'Low Stock'
        ? 'border-amber-500/10 bg-amber-500/8 text-amber-700'
        : 'border-rose-500/10 bg-rose-500/8 text-rose-700'

  return (
    <span
      className={`rounded-full border px-2 py-1 text-[9px] font-semibold ${styles}`}
    >
      {status}
    </span>
  )
}

/* ==========================================================================
   DELIVERY STATUS
========================================================================== */

function DeliveryStatus({
  status,
}: {
  status: string
}) {
  const styles =
    status === 'Delivered'
      ? 'border-emerald-500/10 bg-emerald-500/8 text-emerald-700'
      : 'border-amber-500/10 bg-amber-500/8 text-amber-700'

  return (
    <span
      className={`rounded-full border px-2 py-1 text-[9px] font-semibold ${styles}`}
    >
      {status}
    </span>
  )
}

/* ==========================================================================
   ACTIVITY METRIC
========================================================================== */

function ActivityMetric({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="flex items-center justify-between border-b border-line pb-3 last:border-0 last:pb-0">
      <span className="text-xs text-ink/45">{label}</span>

      <span className="font-display text-sm font-semibold text-ink">
        {value}
      </span>
    </div>
  )
}