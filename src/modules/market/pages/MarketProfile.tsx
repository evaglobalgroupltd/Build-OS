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
      {/* Profile header */}
      <Card className="overflow-hidden">
        <div className="border-b border-line bg-paper-2 px-6 py-7 sm:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex min-w-0 items-start gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-ink text-lg font-bold text-white shadow-sm">
                {supplier.initials}
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">
                    {supplier.name}
                  </h1>

                  {supplier.verified && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                      <BadgeCheck className="h-3.5 w-3.5" />
                      Verified supplier
                    </span>
                  )}
                </div>

                <p className="mt-1 text-sm text-ink/50">
                  {supplier.category}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ink/45">
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

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-xs font-semibold text-ink transition-colors hover:bg-ink/[0.03]"
              >
                <Mail className="h-3.5 w-3.5" />
                Contact supplier
              </button>

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
              >
                Request quotation
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Key metrics */}
        <div className="grid divide-y divide-line sm:grid-cols-2 sm:divide-x sm:divide-y-0 xl:grid-cols-4">
          <ProfileMetric
            icon={ShieldCheck}
            label="Trust score"
            value={`${supplier.trustScore}/100`}
            description="Excellent marketplace standing"
          />

          <ProfileMetric
            icon={Star}
            label="Client rating"
            value={supplier.rating.toString()}
            description={`${supplier.reviews} verified reviews`}
          />

          <ProfileMetric
            icon={Truck}
            label="Deliveries"
            value={supplier.completedDeliveries.toString()}
            description="Verified completed deliveries"
          />

          <ProfileMetric
            icon={Clock3}
            label="On-time delivery"
            value={`${supplier.onTimeDelivery}%`}
            description="Orders delivered on schedule"
          />
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-3">
        {/* Main column */}
        <div className="space-y-6 xl:col-span-2">
          {/* Supplier information */}
          <Card>
            <CardHeader
              title="Supplier profile"
              subtitle="Business information and marketplace capabilities"
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
                <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                  Material categories
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <span
                      key={category}
                      className="rounded-full border border-line bg-paper-2 px-3 py-1.5 text-xs font-medium text-ink/60"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Catalogue */}
          <Card className="overflow-hidden">
            <CardHeader
              title="Marketplace catalogue"
              subtitle="Approved materials currently available from this supplier"
            />

            <div className="divide-y divide-line">
              {products.map((product) => (
                <div
                  key={product.name}
                  className="flex flex-col gap-4 px-6 py-5 transition-colors hover:bg-ink/[0.02] sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink/5">
                      <Package className="h-4 w-4 text-ink/50" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-semibold text-ink">
                          {product.name}
                        </h3>

                        <StockBadge status={product.stock} />
                      </div>

                      <p className="mt-1 text-xs text-ink/40">
                        {product.category}
                      </p>

                      <p className="mt-1 text-xs text-ink/50">
                        {product.specification}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-5">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                        Starting price
                      </p>

                      <p className="mt-1 text-sm font-semibold text-ink">
                        {product.price}
                      </p>
                    </div>

                    <ChevronRight className="h-4 w-4 text-ink/30" />
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-line px-6 py-4">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink/60 transition-colors hover:text-ink"
              >
                View full catalogue
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </Card>

          {/* Delivery performance */}
          <Card>
            <CardHeader
              title="Delivery performance"
              subtitle="Verified indicators contributing to supplier reliability"
            />

            <CardBody>
              <div className="space-y-6">
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

          {/* Recent procurement activity */}
          <Card className="overflow-hidden">
            <CardHeader
              title="Recent procurement activity"
              subtitle="Verified deliveries from Build OS projects"
            />

            <div className="divide-y divide-line">
              {recentDeliveries.map((delivery) => (
                <div
                  key={delivery.project}
                  className="px-6 py-5 transition-colors hover:bg-ink/[0.02]"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-semibold text-ink">
                          {delivery.project}
                        </h3>

                        <DeliveryStatus status={delivery.status} />
                      </div>

                      <p className="mt-2 text-xs text-ink/45">
                        {delivery.materials}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-7 text-xs">
                      <div>
                        <p className="text-ink/40">Order value</p>

                        <p className="mt-1 font-semibold text-ink">
                          {delivery.value}
                        </p>
                      </div>

                      <div>
                        <p className="text-ink/40">Rating</p>

                        <p className="mt-1 flex items-center gap-1 font-semibold text-ink">
                          <Star className="h-3.5 w-3.5 fill-current" />
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

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Trust score */}
          <Card className="overflow-hidden">
            <div className="border-b border-line bg-paper-2 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                    Build OS trust
                  </p>

                  <h2 className="mt-1 font-display text-lg font-semibold text-ink">
                    Supplier standing
                  </h2>
                </div>

                <TrendingUpIcon />
              </div>
            </div>

            <CardBody>
              <div className="flex justify-center">
                <div className="flex h-32 w-32 items-center justify-center rounded-full border-[9px] border-ink/10">
                  <div className="text-center">
                    <p className="font-display text-3xl font-bold tracking-tight text-ink">
                      {supplier.trustScore}
                    </p>

                    <p className="text-[10px] font-medium text-ink/40">
                      OUT OF 100
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex justify-center">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-700">
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

          {/* Verification */}
          <Card>
            <CardHeader
              title="Verification"
              subtitle="Credentials reviewed by Build OS"
            />

            <CardBody>
              <div className="space-y-3">
                {verificationItems.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl bg-paper-2 px-3 py-3"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    </div>

                    <span className="text-xs font-medium text-ink/65">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 border-t border-line pt-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-ink/40">Verification status</span>

                  <span className="font-semibold text-emerald-700">
                    Verified
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Marketplace activity */}
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

          {/* Procurement protection */}
          <Card>
            <CardHeader
              title="Payment protection"
              subtitle="Build OS procurement control"
            />

            <CardBody>
              <div className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink/5">
                  <ShieldCheck className="h-4 w-4 text-ink/55" />
                </div>

                <p className="text-xs leading-5 text-ink/50">
                  Supplier payment is released only after delivery evidence is
                  uploaded, verified and accepted through the Build OS
                  procurement workflow.
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}

function ProfileMetric({
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
    <div className="px-6 py-5 sm:px-7">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5">
          <Icon className="h-4 w-4 text-ink/55" />
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
            {label}
          </p>

          <p className="mt-0.5 font-display text-xl font-semibold text-ink">
            {value}
          </p>
        </div>
      </div>

      <p className="mt-3 text-xs text-ink/40">{description}</p>
    </div>
  )
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="flex gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink/5">
        <Icon className="h-4 w-4 text-ink/50" />
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
          {label}
        </p>

        <p className="mt-1 truncate text-sm font-medium text-ink">{value}</p>
      </div>
    </div>
  )
}

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

        <span className="text-sm font-semibold text-ink">
          {safeValue}%
        </span>
      </div>

      <div className="mt-2 h-2 overflow-hidden rounded-full bg-ink/5">
        <div
          className="h-full rounded-full bg-ink transition-all duration-500"
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  )
}

function StockBadge({ status }: { status: string }) {
  const styles =
    status === 'In Stock'
      ? 'bg-emerald-500/10 text-emerald-700'
      : status === 'Low Stock'
        ? 'bg-amber-500/10 text-amber-700'
        : 'bg-rose-500/10 text-rose-700'

  return (
    <span
      className={`rounded-full px-2 py-1 text-[10px] font-semibold ${styles}`}
    >
      {status}
    </span>
  )
}

function DeliveryStatus({ status }: { status: string }) {
  const styles =
    status === 'Delivered'
      ? 'bg-emerald-500/10 text-emerald-700'
      : 'bg-amber-500/10 text-amber-700'

  return (
    <span
      className={`rounded-full px-2 py-1 text-[10px] font-semibold ${styles}`}
    >
      {status}
    </span>
  )
}

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

      <span className="text-sm font-semibold text-ink">{value}</span>
    </div>
  )
}

function TrendingUpIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 text-emerald-600"
      aria-hidden="true"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  )
}