
import {
  BadgeCheck,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  FileCheck2,
  Globe2,
  Mail,
  MapPin,
  Package,
  Phone,
  ShieldCheck,
  ShoppingCart,
  Star,
  TrendingUp,
  Truck,
  Warehouse,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'

const supplier = {
  name: 'Prime Build Materials Ltd.',
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

  completedDeliveries: 128,
  activeOrders: 14,
  yearsExperience: 11,

  onTimeDelivery: 96,
  deliveryAcceptance: 98,
  compliance: 99,

  catalogueItems: 86,
  deliveryZones: 'FCT + 5 States',
}

const verificationItems = [
  'Company registration',
  'Tax identification',
  'Business identity',
  'Bank account verification',
  'Warehouse verification',
  'Product catalogue approval',
  'Delivery capability',
  'Compliance documentation',
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

const deliveryHistory = [
  {
    project: 'Gwarinpa Residential Development',
    materials: 'Cement, reinforcement and blocks',
    status: 'Delivered',
    value: '₦8.4M',
    rating: '4.9',
  },
  {
    project: 'Maitama Duplex Construction',
    materials: 'Roofing and finishing materials',
    status: 'Delivered',
    value: '₦12.6M',
    rating: '4.8',
  },
  {
    project: 'Jabi Commercial Renovation',
    materials: 'Plumbing and electrical materials',
    status: 'In Transit',
    value: '₦5.2M',
    rating: '4.9',
  },
]

const categories = [
  'Cement & Concrete',
  'Steel & Reinforcement',
  'Blocks & Masonry',
  'Roofing',
  'Finishing',
  'Plumbing',
  'Electrical',
]

export function MarketDetails() {
  return (
    <div className="space-y-7 pb-8">

      {/* ===================================================== */}
      {/* Supplier Hero                                         */}
      {/* ===================================================== */}

      <section
        aria-label="Supplier overview"
        className="
          relative
          overflow-hidden
          rounded-[28px]
          bg-ink
          text-white
          shadow-[0_24px_70px_rgba(11,18,32,0.12)]
        "
      >
        {/* Ambient decoration */}

        <div className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-white/[0.035]" />

        <div className="pointer-events-none absolute -bottom-40 left-[35%] h-80 w-80 rounded-full bg-[#1657FF]/[0.10]" />

        <div className="pointer-events-none absolute right-[25%] top-[22%] h-28 w-28 rounded-full border border-white/[0.05]" />

        <div className="relative px-6 py-7 sm:px-8 sm:py-9 lg:px-10">

          <div className="flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">

            {/* Identity */}

            <div className="flex min-w-0 items-start gap-4 sm:gap-5">

              <div
                className="
                  flex
                  h-[68px]
                  w-[68px]
                  shrink-0
                  items-center
                  justify-center
                  rounded-[21px]
                  border
                  border-white/[0.10]
                  bg-white/[0.08]
                  font-display
                  text-xl
                  font-semibold
                  tracking-[-0.04em]
                  text-white
                  shadow-[0_12px_30px_rgba(0,0,0,0.15)]
                "
              >
                PB
              </div>

              <div className="min-w-0">

                <div className="flex flex-wrap items-center gap-2.5">

                  <h1 className="font-display text-[25px] font-semibold leading-tight tracking-[-0.035em] sm:text-[31px]">
                    {supplier.name}
                  </h1>

                  {supplier.verified && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/15 bg-emerald-400/[0.10] px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.05em] text-emerald-200">
                      <BadgeCheck className="h-3.5 w-3.5" />
                      Verified supplier
                    </span>
                  )}

                </div>

                <p className="mt-1.5 text-[12px] text-white/45">
                  {supplier.category}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] text-white/40">

                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3 w-3" />
                    {supplier.location}
                  </span>

                  <span className="inline-flex items-center gap-1.5">
                    <Building2 className="h-3 w-3" />
                    {supplier.registration}
                  </span>

                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-3 w-3" />
                    {supplier.yearsExperience} years experience
                  </span>

                </div>

              </div>

            </div>

            {/* Actions */}

            <div className="flex flex-wrap gap-2.5">

              <button
                type="button"
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/[0.12]
                  bg-white/[0.06]
                  px-4
                  py-2.5
                  text-[10.5px]
                  font-semibold
                  text-white/75
                  backdrop-blur-sm
                  transition
                  hover:bg-white/[0.11]
                  hover:text-white
                "
              >
                <Mail className="h-3.5 w-3.5" />
                Contact supplier
              </button>

              <button
                type="button"
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-white
                  px-4
                  py-2.5
                  text-[10.5px]
                  font-bold
                  text-ink
                  transition
                  hover:-translate-y-0.5
                  hover:bg-white/90
                "
              >
                <ShoppingCart className="h-3.5 w-3.5" />
                View catalogue
                <ChevronRight className="h-3.5 w-3.5" />
              </button>

            </div>

          </div>

          {/* Executive metrics */}

          <div className="mt-8 grid grid-cols-2 border-t border-white/[0.08] pt-6 sm:grid-cols-4">

            <HeroMetric
              label="Trust score"
              value={`${supplier.trustScore}/100`}
              description="Marketplace standing"
              accent
            />

            <HeroMetric
              label="Client rating"
              value={supplier.rating.toString()}
              description={`${supplier.reviews} verified reviews`}
            />

            <HeroMetric
              label="Deliveries"
              value={supplier.completedDeliveries.toString()}
              description="Completed successfully"
            />

            <HeroMetric
              label="On-time"
              value={`${supplier.onTimeDelivery}%`}
              description="Schedule adherence"
            />

          </div>

        </div>
      </section>

      {/* ===================================================== */}
      {/* Main Layout                                           */}
      {/* ===================================================== */}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(310px,0.65fr)]">

        {/* =================================================== */}
        {/* Primary Column                                      */}
        {/* =================================================== */}

        <div className="space-y-6">

          {/* Company profile */}

          <Card>

            <CardHeader
              title="Supplier profile"
              subtitle="Business identity, operating capability and marketplace coverage"
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
                  label="Catalogue"
                  value={`${supplier.catalogueItems} approved materials`}
                />

                <InfoItem
                  icon={Mail}
                  label="Business email"
                  value={supplier.email}
                />

                <InfoItem
                  icon={Phone}
                  label="Phone"
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
                  value={supplier.deliveryZones}
                />

              </div>

              {/* Categories */}

              <div className="mt-7 border-t border-line pt-6">

                <div className="flex items-end justify-between gap-4">

                  <div>
                    <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-ink/30">
                      Catalogue coverage
                    </p>

                    <p className="mt-1 text-[12px] font-semibold text-ink">
                      Material categories
                    </p>
                  </div>

                  <span className="text-[10px] font-medium text-ink/35">
                    {categories.length} categories
                  </span>

                </div>

                <div className="mt-4 flex flex-wrap gap-2">

                  {categories.map((category) => (
                    <span
                      key={category}
                      className="
                        rounded-full
                        border
                        border-line
                        bg-paper-2
                        px-3
                        py-1.5
                        text-[10px]
                        font-medium
                        text-ink/55
                        transition
                        hover:border-ink/[0.12]
                        hover:bg-white
                        hover:text-ink
                      "
                    >
                      {category}
                    </span>
                  ))}

                </div>

              </div>

            </CardBody>

          </Card>

          {/* ================================================= */}
          {/* Catalogue                                        */}
          {/* ================================================= */}

          <Card className="overflow-hidden">

            <CardHeader
              title="Marketplace catalogue"
              subtitle="Approved materials currently available through this supplier"
            />

            <div className="divide-y divide-line">

              {products.map((product, index) => (

                <div
                  key={product.name}
                  className="
                    group
                    px-5
                    py-5
                    transition
                    duration-200
                    hover:bg-paper-2
                    sm:px-6
                  "
                >

                  <div className="flex items-center gap-4">

                    {/* Index / material identity */}

                    <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink text-[9px] font-bold tracking-[0.08em] text-white sm:flex">
                      {String(index + 1).padStart(2, '0')}
                    </div>

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink/[0.045] text-ink/40 sm:hidden">
                      <Package className="h-4 w-4" />
                    </div>

                    {/* Product */}

                    <div className="min-w-0 flex-1">

                      <div className="flex flex-wrap items-center gap-2">

                        <h3 className="text-[12.5px] font-semibold text-ink">
                          {product.name}
                        </h3>

                        <StockBadge status={product.stock} />

                      </div>

                      <p className="mt-1 text-[9.5px] font-bold uppercase tracking-[0.08em] text-ink/28">
                        {product.category}
                      </p>

                      <p className="mt-1 text-[10.5px] text-ink/40">
                        {product.specification}
                      </p>

                    </div>

                    {/* Price */}

                    <div className="hidden shrink-0 text-right sm:block">

                      <p className="text-[8.5px] font-bold uppercase tracking-[0.12em] text-ink/25">
                        Starting price
                      </p>

                      <p className="mt-1 font-display text-[16px] font-semibold tracking-[-0.02em] text-ink">
                        {product.price}
                      </p>

                    </div>

                    <ChevronRight className="h-4 w-4 shrink-0 text-ink/20 transition-transform group-hover:translate-x-0.5 group-hover:text-[#1657FF]" />

                  </div>

                  {/* Mobile price */}

                  <div className="mt-4 flex items-center justify-between border-t border-line pt-3 sm:hidden">

                    <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-ink/25">
                      Starting price
                    </span>

                    <span className="font-display text-[16px] font-semibold text-ink">
                      {product.price}
                    </span>

                  </div>

                </div>

              ))}

            </div>

            <div className="border-t border-line px-6 py-4">

              <button
                type="button"
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  text-[10.5px]
                  font-bold
                  text-ink/45
                  transition
                  hover:text-[#1657FF]
                "
              >
                View full catalogue
                <ChevronRight className="h-3.5 w-3.5" />
              </button>

            </div>

          </Card>

          {/* ================================================= */}
          {/* Performance                                      */}
          {/* ================================================= */}

          <Card>

            <CardHeader
              title="Delivery performance"
              subtitle="Operational indicators contributing to procurement reliability"
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
                  description="Deliveries completed within the agreed schedule"
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
                  label="Compliance"
                  value={supplier.compliance}
                  description="Business, catalogue and platform compliance"
                />

              </div>

            </CardBody>

          </Card>

          {/* ================================================= */}
          {/* Procurement history                              */}
          {/* ================================================= */}

          <Card className="overflow-hidden">

            <CardHeader
              title="Procurement activity"
              subtitle="Recent Build OS project deliveries and supplier performance"
            />

            <div className="divide-y divide-line">

              {deliveryHistory.map((delivery) => (

                <div
                  key={delivery.project}
                  className="
                    group
                    px-5
                    py-5
                    transition
                    hover:bg-paper-2
                    sm:px-6
                  "
                >

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div className="min-w-0">

                      <div className="flex flex-wrap items-center gap-2">

                        <h3 className="text-[12.5px] font-semibold text-ink">
                          {delivery.project}
                        </h3>

                        <DeliveryStatus status={delivery.status} />

                      </div>

                      <p className="mt-2 text-[10.5px] text-ink/40">
                        {delivery.materials}
                      </p>

                    </div>

                    <div className="flex shrink-0 items-center gap-7">

                      <div>
                        <p className="text-[8.5px] font-bold uppercase tracking-[0.1em] text-ink/25">
                          Order value
                        </p>

                        <p className="mt-1 text-[11.5px] font-semibold text-ink">
                          {delivery.value}
                        </p>
                      </div>

                      <div>
                        <p className="text-[8.5px] font-bold uppercase tracking-[0.1em] text-ink/25">
                          Rating
                        </p>

                        <p className="mt-1 flex items-center gap-1 text-[11.5px] font-semibold text-ink">
                          <Star className="h-3 w-3 fill-current" />
                          {delivery.rating}
                        </p>
                      </div>

                      <ChevronRight className="hidden h-4 w-4 text-ink/20 transition-transform group-hover:translate-x-0.5 sm:block" />

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </Card>

        </div>

        {/* =================================================== */}
        {/* Intelligence Rail                                  */}
        {/* =================================================== */}

        <aside className="space-y-6">

          {/* Trust score */}

          <Card className="overflow-hidden">

            <div className="border-b border-line bg-paper-2 px-5 py-5">

              <div className="flex items-start justify-between gap-4">

                <div>
                  <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-ink/30">
                    Build OS intelligence
                  </p>

                  <h2 className="mt-1 font-display text-[17px] font-semibold tracking-[-0.025em] text-ink">
                    Supplier standing
                  </h2>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1657FF]/[0.07] text-[#1657FF]">
                  <TrendingUp className="h-4 w-4" />
                </div>

              </div>

            </div>

            <CardBody className="p-5">

              <div className="flex items-center justify-center">

                <div
                  className="
                    relative
                    flex
                    h-[148px]
                    w-[148px]
                    items-center
                    justify-center
                    rounded-full
                    border-[10px]
                    border-ink/[0.06]
                  "
                >

                  <div className="absolute inset-[-10px] rounded-full border-[10px] border-transparent border-l-[#1657FF] border-t-[#1657FF] rotate-[35deg]" />

                  <div className="text-center">

                    <p className="font-display text-[34px] font-semibold leading-none tracking-[-0.05em] text-ink">
                      {supplier.trustScore}
                    </p>

                    <p className="mt-1 font-mono text-[8px] font-semibold tracking-[0.13em] text-ink/30">
                      OUT OF 100
                    </p>

                  </div>

                </div>

              </div>

              <div className="mt-5 flex justify-center">

                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/[0.08] px-3 py-1.5 text-[9.5px] font-bold uppercase tracking-[0.05em] text-emerald-700">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Excellent standing
                </span>

              </div>

              <p className="mt-4 text-center text-[10.5px] leading-5 text-ink/40">
                Based on verification, delivery performance, product quality,
                client feedback, compliance and dispute history.
              </p>

            </CardBody>

          </Card>

          {/* Verification */}

          <Card>

            <CardHeader
              title="Verification"
              subtitle="Credentials reviewed by Build OS"
            />

            <CardBody className="p-5">

              <div className="space-y-2">

                {verificationItems.map((item) => (

                  <div
                    key={item}
                    className="
                      group
                      flex
                      items-center
                      gap-3
                      rounded-xl
                      border
                      border-transparent
                      bg-paper-2
                      px-3
                      py-2.5
                      transition
                      hover:border-emerald-500/10
                      hover:bg-emerald-500/[0.025]
                    "
                  >

                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/[0.08]">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    </div>

                    <span className="min-w-0 flex-1 text-[10.5px] font-medium text-ink/60">
                      {item}
                    </span>

                    <BadgeCheck className="h-3 w-3 shrink-0 text-emerald-500/60" />

                  </div>

                ))}

              </div>

              <div className="mt-5 flex items-center justify-between border-t border-line pt-4">

                <span className="text-[9.5px] font-medium text-ink/35">
                  Verification status
                </span>

                <span className="inline-flex items-center gap-1.5 text-[9.5px] font-bold text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Fully verified
                </span>

              </div>

            </CardBody>

          </Card>

          {/* Activity summary */}

          <Card>

            <CardHeader
              title="Marketplace activity"
              subtitle="Current supplier activity"
            />

            <CardBody className="p-5">

              <div className="space-y-4">

                <ActivityMetric
                  icon={Package}
                  label="Catalogue items"
                  value={supplier.catalogueItems.toString()}
                />

                <ActivityMetric
                  icon={Truck}
                  label="Active orders"
                  value={supplier.activeOrders.toString()}
                />

                <ActivityMetric
                  icon={CheckCircle2}
                  label="Completed deliveries"
                  value={supplier.completedDeliveries.toString()}
                />

                <ActivityMetric
                  icon={Star}
                  label="Client rating"
                  value={`${supplier.rating} / 5`}
                />

                <ActivityMetric
                  icon={ShieldCheck}
                  label="Compliance"
                  value={`${supplier.compliance}%`}
                />

              </div>

            </CardBody>

          </Card>

          {/* Payment protection */}

          <div
            className="
              overflow-hidden
              rounded-[22px]
              bg-ink
              p-5
              text-white
              shadow-[0_16px_40px_rgba(11,18,32,0.10)]
            "
          >

            <div className="flex items-center justify-between">

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.08]">
                <ClipboardCheck className="h-4 w-4 text-white/70" />
              </div>

              <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.15em] text-white/25">
                Protected flow
              </span>

            </div>

            <p className="mt-5 text-[11.5px] font-semibold text-white/90">
              Payment protection
            </p>

            <p className="mt-2 text-[10px] leading-5 text-white/40">
              Supplier payment is released only after delivery evidence is
              uploaded and the materials are verified and accepted through
              the Build OS procurement workflow.
            </p>

            <div className="mt-4 flex items-center gap-2 text-[9px] font-semibold text-white/45">
              <ShieldCheck className="h-3.5 w-3.5 text-[#34A6FF]" />
              Escrow-controlled procurement
            </div>

          </div>

        </aside>

      </div>

    </div>
  )
}

/* ========================================================= */
/* Hero Metric                                               */
/* ========================================================= */

function HeroMetric({
  label,
  value,
  description,
  accent = false,
}: {
  label: string
  value: string
  description: string
  accent?: boolean
}) {
  return (
    <div className="border-r border-white/[0.08] px-4 first:pl-0 last:border-r-0 sm:px-5">

      <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.15em] text-white/30">
        {label}
      </p>

      <p
        className={`
          mt-1
          font-display
          text-[21px]
          font-semibold
          tracking-[-0.035em]
          ${accent ? 'text-[#7CB8FF]' : 'text-white'}
        `}
      >
        {value}
      </p>

      <p className="mt-0.5 text-[9px] text-white/30">
        {description}
      </p>

    </div>
  )
}

/* ========================================================= */
/* Information Item                                          */
/* ========================================================= */

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

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-paper-2 text-ink/40 ring-1 ring-ink/[0.03]">
        <Icon className="h-3.5 w-3.5" />
      </div>

      <div className="min-w-0">

        <p className="font-mono text-[8.5px] font-semibold uppercase tracking-[0.11em] text-ink/28">
          {label}
        </p>

        <p className="mt-1 truncate text-[11.5px] font-semibold text-ink">
          {value}
        </p>

      </div>

    </div>
  )
}

/* ========================================================= */
/* Performance Row                                           */
/* ========================================================= */

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

      <div className="flex items-start justify-between gap-5">

        <div className="min-w-0">

          <p className="text-[11.5px] font-semibold text-ink">
            {label}
          </p>

          <p className="mt-0.5 text-[9.5px] leading-4 text-ink/35">
            {description}
          </p>

        </div>

        <span className="shrink-0 font-display text-[15px] font-semibold tracking-[-0.02em] text-ink">
          {safeValue}%
        </span>

      </div>

      <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-ink/[0.06]">

        <div
          className="h-full rounded-full bg-[#1657FF] transition-all duration-700"
          style={{ width: `${safeValue}%` }}
        />

      </div>

    </div>
  )
}

/* ========================================================= */
/* Stock Badge                                               */
/* ========================================================= */

function StockBadge({
  status,
}: {
  status: string
}) {
  const styles =
    status === 'In Stock'
      ? 'bg-emerald-500/[0.08] text-emerald-700'
      : status === 'Low Stock'
        ? 'bg-amber-500/[0.08] text-amber-700'
        : 'bg-rose-500/[0.08] text-rose-700'

  return (
    <span
      className={`
        rounded-full
        px-2
        py-1
        text-[8.5px]
        font-bold
        uppercase
        tracking-[0.04em]
        ${styles}
      `}
    >
      {status}
    </span>
  )
}

/* ========================================================= */
/* Delivery Status                                           */
/* ========================================================= */

function DeliveryStatus({
  status,
}: {
  status: string
}) {
  const styles =
    status === 'Delivered'
      ? 'bg-emerald-500/[0.08] text-emerald-700'
      : 'bg-amber-500/[0.08] text-amber-700'

  return (
    <span
      className={`
        rounded-full
        px-2
        py-1
        text-[8.5px]
        font-bold
        uppercase
        tracking-[0.04em]
        ${styles}
      `}
    >
      {status}
    </span>
  )
}

/* ========================================================= */
/* Activity Metric                                           */
/* ========================================================= */

function ActivityMetric({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3 border-b border-line pb-3 last:border-0 last:pb-0">

      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-paper-2 text-ink/35">
        <Icon className="h-3.5 w-3.5" />
      </div>

      <span className="min-w-0 flex-1 text-[10.5px] text-ink/40">
        {label}
      </span>

      <span className="text-[11.5px] font-semibold text-ink">
        {value}
      </span>

    </div>
  )
}