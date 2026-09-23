
import {
  BadgeCheck,
  Boxes,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  Construction,
  Package,
  Search,
  ShieldCheck,
  ShoppingCart,
  SlidersHorizontal,
  Truck,
  Warehouse,
  XCircle,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'

type ProductStatus = 'In Stock' | 'Low Stock' | 'Out of Stock'

interface MarketProduct {
  id: string
  name: string
  category: string
  specification: string
  unit: string
  price: string
  stock: ProductStatus
  quantity: string
  delivery: string
  verified: boolean
  imageLabel: string
}

const products: MarketProduct[] = [
  {
    id: 'cement-001',
    name: 'Dangote Cement',
    category: 'Cement & Concrete',
    specification: '42.5R Grade Portland Cement',
    unit: '50kg bag',
    price: '₦11,250',
    stock: 'In Stock',
    quantity: '1,240 bags available',
    delivery: '1–2 days',
    verified: true,
    imageLabel: 'CEM',
  },
  {
    id: 'steel-002',
    name: 'High Yield Reinforcement Bar',
    category: 'Steel & Reinforcement',
    specification: '12mm High Tensile Steel Bar',
    unit: 'Length',
    price: '₦18,500',
    stock: 'In Stock',
    quantity: '620 lengths available',
    delivery: '2–3 days',
    verified: true,
    imageLabel: 'STEEL',
  },
  {
    id: 'block-003',
    name: 'Premium Sandcrete Block',
    category: 'Blocks & Masonry',
    specification: '9-inch Load Bearing Block',
    unit: 'Piece',
    price: '₦850',
    stock: 'Low Stock',
    quantity: '180 blocks available',
    delivery: 'Same day',
    verified: true,
    imageLabel: 'BLOCK',
  },
  {
    id: 'roof-004',
    name: 'Long Span Aluminium Roofing',
    category: 'Roofing',
    specification: '0.55mm Long Span Aluminium',
    unit: 'Square metre',
    price: '₦14,800',
    stock: 'In Stock',
    quantity: 'Available on request',
    delivery: '3–5 days',
    verified: true,
    imageLabel: 'ROOF',
  },
  {
    id: 'tile-005',
    name: 'Premium Porcelain Floor Tile',
    category: 'Finishing',
    specification: '60 × 60cm Porcelain Tile',
    unit: 'Carton',
    price: '₦38,500',
    stock: 'In Stock',
    quantity: '340 cartons available',
    delivery: '2–4 days',
    verified: true,
    imageLabel: 'TILE',
  },
  {
    id: 'pipe-006',
    name: 'PVC Plumbing Pipe',
    category: 'Plumbing',
    specification: '110mm Heavy Duty PVC',
    unit: '6 metre length',
    price: '₦9,800',
    stock: 'Out of Stock',
    quantity: 'Restocking in progress',
    delivery: 'Unavailable',
    verified: true,
    imageLabel: 'PVC',
  },
]

const categories = [
  'All materials',
  'Cement & Concrete',
  'Steel & Reinforcement',
  'Blocks & Masonry',
  'Roofing',
  'Finishing',
  'Plumbing',
  'Electrical',
]

export function Catalogue() {
  const inStockProducts = products.filter(
    (product) => product.stock === 'In Stock',
  ).length

  const lowStockProducts = products.filter(
    (product) => product.stock === 'Low Stock',
  ).length

  const outOfStockProducts = products.filter(
    (product) => product.stock === 'Out of Stock',
  ).length

  return (
    <div className="space-y-7 pb-8">

      {/* ===================================================== */}
      {/* Marketplace Hero                                      */}
      {/* ===================================================== */}

      <section
        aria-label="Materials marketplace overview"
        className="
          relative
          overflow-hidden
          rounded-[28px]
          bg-ink
          text-white
          shadow-[0_24px_70px_rgba(11,18,32,0.12)]
        "
      >
        {/* Decorative atmosphere */}

        <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-white/[0.035]" />
        <div className="pointer-events-none absolute -bottom-40 left-[35%] h-80 w-80 rounded-full bg-[#1657FF]/[0.10]" />
        <div className="pointer-events-none absolute right-[18%] top-[30%] h-24 w-24 rounded-full border border-white/[0.05]" />

        <div className="relative px-6 py-7 sm:px-8 sm:py-9 lg:px-10">

          <div className="flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">

            <div className="max-w-2xl">

              <div className="mb-5 flex items-center gap-2.5">

                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.09] ring-1 ring-white/[0.08]">
                  <ShoppingCart className="h-4 w-4 text-white/80" />
                </span>

                <div>
                  <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-white/40">
                    Build OS · Procurement
                  </p>

                  <p className="mt-0.5 text-[11px] font-medium text-white/60">
                    Materials marketplace
                  </p>
                </div>

              </div>

              <h1 className="max-w-xl font-display text-[30px] font-semibold leading-[1.05] tracking-[-0.045em] sm:text-[38px] lg:text-[42px]">
                Materials, pricing and fulfilment — in one place.
              </h1>

              <p className="mt-4 max-w-xl text-[12.5px] leading-6 text-white/50 sm:text-[13px]">
                Manage approved construction materials, catalogue pricing,
                inventory availability and delivery capacity for verified
                Build OS procurement activity.
              </p>

            </div>

            <div className="flex shrink-0 flex-wrap gap-2.5">

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
                  text-[11px]
                  font-semibold
                  text-white/80
                  backdrop-blur-sm
                  transition
                  hover:bg-white/[0.11]
                  hover:text-white
                "
              >
                <ClipboardCheck className="h-3.5 w-3.5" />
                Procurement requests
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
                  text-[11px]
                  font-bold
                  text-ink
                  transition
                  hover:-translate-y-0.5
                  hover:bg-white/90
                "
              >
                <Package className="h-3.5 w-3.5" />
                Add material
              </button>

            </div>

          </div>

          {/* Hero summary */}

          <div className="mt-8 grid grid-cols-2 border-t border-white/[0.08] pt-6 sm:grid-cols-4">

            <HeroMetric
              label="Catalogue"
              value={products.length.toString().padStart(2, '0')}
              description="Listed materials"
            />

            <HeroMetric
              label="Available"
              value={inStockProducts.toString().padStart(2, '0')}
              description="Ready to procure"
            />

            <HeroMetric
              label="Attention"
              value={lowStockProducts.toString().padStart(2, '0')}
              description="Low stock"
            />

            <HeroMetric
              label="Coverage"
              value="FCT + 3"
              description="Delivery zones"
            />

          </div>

        </div>
      </section>

      {/* ===================================================== */}
      {/* Verification Banner                                   */}
      {/* ===================================================== */}

      <Card className="overflow-hidden">

        <CardBody className="p-0">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">

            <div className="flex items-start gap-4 px-5 py-5 sm:px-6">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1657FF]/[0.08] text-[#1657FF]">
                <ShieldCheck className="h-[18px] w-[18px]" />
              </div>

              <div className="min-w-0">

                <div className="flex flex-wrap items-center gap-2">

                  <h2 className="text-[12.5px] font-semibold text-ink">
                    Marketplace verification active
                  </h2>

                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/[0.08] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.04em] text-emerald-700">
                    <BadgeCheck className="h-3 w-3" />
                    Verified supplier
                  </span>

                </div>

                <p className="mt-1.5 max-w-3xl text-[11px] leading-5 text-ink/45">
                  Your supplier profile, business details and delivery
                  capability have been verified for Build OS procurement.
                </p>

              </div>

            </div>

            <button
              type="button"
              className="
                mx-5 mb-5
                inline-flex
                items-center
                gap-1.5
                self-start
                text-[10.5px]
                font-bold
                text-ink/45
                transition
                hover:text-[#1657FF]
                lg:mx-6
                lg:mb-0
                lg:self-auto
              "
            >
              View verification
              <ChevronRight className="h-3.5 w-3.5" />
            </button>

          </div>

        </CardBody>
      </Card>

      {/* ===================================================== */}
      {/* Catalogue Controls                                    */}
      {/* ===================================================== */}

      <section aria-label="Catalogue search and filters">

        <Card>

          <CardBody className="p-5 sm:p-6">

            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

              <div className="relative w-full xl:max-w-[440px]">

                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/30" />

                <input
                  type="search"
                  placeholder="Search materials, specifications or categories..."
                  className="
                    h-11.5
                    w-full
                    rounded-2xl
                    border
                    border-line
                    bg-paper-2
                    pl-11
                    pr-4
                    text-[12px]
                    text-ink
                    outline-none
                    transition
                    placeholder:text-ink/30
                    hover:border-ink/[0.12]
                    focus:border-[#1657FF]/30
                    focus:bg-white
                    focus:ring-4
                    focus:ring-[#1657FF]/[0.05]
                  "
                />

              </div>

              <div className="flex flex-wrap items-center gap-2">

                <button
                  type="button"
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-line
                    bg-white
                    px-3.5
                    py-2.5
                    text-[10.5px]
                    font-semibold
                    text-ink/55
                    transition
                    hover:border-ink/[0.15]
                    hover:bg-paper-2
                    hover:text-ink
                  "
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  Filters
                </button>

                <button
                  type="button"
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-line
                    bg-white
                    px-3.5
                    py-2.5
                    text-[10.5px]
                    font-semibold
                    text-ink/55
                    transition
                    hover:border-ink/[0.15]
                    hover:bg-paper-2
                    hover:text-ink
                  "
                >
                  <Boxes className="h-3.5 w-3.5" />
                  Availability
                </button>

              </div>

            </div>

            {/* Category navigation */}

            <div className="mt-5 border-t border-line pt-4">

              <div className="flex gap-2 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

                {categories.map((category, index) => (

                  <button
                    key={category}
                    type="button"
                    className={
                      index === 0
                        ? `
                          shrink-0
                          rounded-full
                          bg-ink
                          px-4
                          py-2
                          text-[10.5px]
                          font-bold
                          text-white
                          shadow-[0_5px_15px_rgba(11,18,32,0.12)]
                        `
                        : `
                          shrink-0
                          rounded-full
                          border
                          border-line
                          bg-white
                          px-4
                          py-2
                          text-[10.5px]
                          font-medium
                          text-ink/45
                          transition
                          hover:border-ink/[0.15]
                          hover:bg-paper-2
                          hover:text-ink
                        `
                    }
                  >
                    {category}
                  </button>

                ))}

              </div>

            </div>

          </CardBody>

        </Card>

      </section>

      {/* ===================================================== */}
      {/* Catalogue heading                                     */}
      {/* ===================================================== */}

      <div className="flex items-end justify-between gap-4">

        <div>

          <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-ink/30">
            Supplier catalogue
          </p>

          <h2 className="mt-1 font-display text-[22px] font-semibold tracking-[-0.035em] text-ink">
            Approved materials
          </h2>

          <p className="mt-1 text-[11px] text-ink/40">
            {products.length} materials currently listed
          </p>

        </div>

        <div className="hidden items-center gap-2 text-[10px] font-medium text-ink/35 sm:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          {inStockProducts} available
          <span className="mx-1 h-3 w-px bg-line" />
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          {lowStockProducts} attention
        </div>

      </div>

      {/* ===================================================== */}
      {/* Product Grid                                          */}
      {/* ===================================================== */}

      <div className="grid gap-5 lg:grid-cols-2 2xl:grid-cols-3">

        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </div>

      {/* ===================================================== */}
      {/* Procurement Workflow                                  */}
      {/* ===================================================== */}

      <Card className="overflow-hidden">

        <CardHeader
          title="From catalogue to verified delivery"
          subtitle="Build OS connects listed materials to the procurement and escrow lifecycle."
        />

        <CardBody className="pt-3">

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">

            <WorkflowStep
              number="01"
              title="Material request"
              description="A contractor submits a project requirement with quantity and specifications."
              icon={ClipboardCheck}
            />

            <WorkflowStep
              number="02"
              title="Supplier quotation"
              description="Verified suppliers respond with pricing, availability and delivery terms."
              icon={CircleDollarSign}
            />

            <WorkflowStep
              number="03"
              title="Fund reservation"
              description="The approved purchase amount is reserved through the project escrow flow."
              icon={ShieldCheck}
            />

            <WorkflowStep
              number="04"
              title="Delivery verification"
              description="Delivery evidence is reviewed before the supplier payment is released."
              icon={Truck}
            />

          </div>

        </CardBody>
      </Card>

      {/* ===================================================== */}
      {/* Inventory footer signal                               */}
      {/* ===================================================== */}

      <div className="flex flex-col gap-3 rounded-2xl border border-line bg-paper-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-3">

          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-ink/50 ring-1 ring-ink/[0.06]">
            <Warehouse className="h-3.5 w-3.5" />
          </div>

          <div>
            <p className="text-[10.5px] font-semibold text-ink">
              Inventory requires regular updates
            </p>

            <p className="mt-0.5 text-[9.5px] text-ink/40">
              Keep availability and delivery commitments accurate for active procurement.
            </p>
          </div>

        </div>

        <button
          type="button"
          className="inline-flex items-center gap-1 text-[10px] font-bold text-[#1657FF] transition hover:text-[#0f45d0]"
        >
          Update inventory
          <ChevronRight className="h-3.5 w-3.5" />
        </button>

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
}: {
  label: string
  value: string
  description: string
}) {
  return (
    <div className="border-r border-white/[0.08] px-4 first:pl-0 last:border-r-0 sm:px-5">

      <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/35">
        {label}
      </p>

      <p className="mt-1 font-display text-[22px] font-semibold tracking-[-0.03em] text-white">
        {value}
      </p>

      <p className="mt-0.5 text-[9.5px] text-white/35">
        {description}
      </p>

    </div>
  )
}

/* ========================================================= */
/* Product Card                                              */
/* ========================================================= */

function ProductCard({
  product,
}: {
  product: MarketProduct
}) {
  const statusStyle = {
    'In Stock': {
      wrapper: 'bg-emerald-500/[0.08] text-emerald-700 ring-emerald-500/10',
      dot: 'bg-emerald-500',
    },
    'Low Stock': {
      wrapper: 'bg-amber-500/[0.08] text-amber-700 ring-amber-500/10',
      dot: 'bg-amber-500',
    },
    'Out of Stock': {
      wrapper: 'bg-rose-500/[0.08] text-rose-700 ring-rose-500/10',
      dot: 'bg-rose-500',
    },
  }

  const status = statusStyle[product.stock]

  const StatusIcon =
    product.stock === 'Out of Stock'
      ? XCircle
      : product.stock === 'Low Stock'
        ? Construction
        : CheckCircle2

  return (
    <Card
      className="
        group
        overflow-hidden
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-ink/[0.12]
        hover:shadow-[0_20px_45px_rgba(11,18,32,0.08)]
      "
    >

      {/* Product visual */}

      <div className="relative h-[178px] overflow-hidden border-b border-line bg-paper-2">

        {/* Soft technical background */}

        <div className="absolute inset-0 opacity-70">
          <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full border border-ink/[0.04]" />
          <div className="absolute -bottom-20 -left-8 h-40 w-40 rounded-full bg-[#1657FF]/[0.025]" />
          <div className="absolute right-10 bottom-5 h-px w-24 bg-ink/[0.05]" />
        </div>

        {/* Material identity */}

        <div className="absolute left-5 top-5">

          <div
            className="
              flex
              h-[68px]
              w-[68px]
              items-center
              justify-center
              rounded-[20px]
              border
              border-ink/[0.07]
              bg-white
              font-mono
              text-[9px]
              font-bold
              tracking-[0.16em]
              text-ink/35
              shadow-[0_10px_25px_rgba(11,18,32,0.05)]
              transition
              duration-300
              group-hover:-translate-y-1
              group-hover:shadow-[0_14px_30px_rgba(11,18,32,0.08)]
            "
          >
            {product.imageLabel}
          </div>

        </div>

        {/* Category marker */}

        <div className="absolute bottom-5 left-5">

          <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-ink/25">
            Material
          </p>

          <p className="mt-1 text-[10px] font-semibold text-ink/45">
            {product.category}
          </p>

        </div>

        {/* Status stack */}

        <div className="absolute right-5 top-5 flex flex-col items-end gap-2">

          {product.verified && (
            <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1.5 text-[8.5px] font-bold uppercase tracking-[0.06em] text-emerald-700 shadow-sm ring-1 ring-emerald-500/10 backdrop-blur">
              <BadgeCheck className="h-3 w-3" />
              Approved
            </span>
          )}

          <span
            className={`
              inline-flex
              items-center
              gap-1.5
              rounded-full
              px-2.5
              py-1.5
              text-[8.5px]
              font-bold
              uppercase
              tracking-[0.06em]
              ring-1
              ${status.wrapper}
            `}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
            {product.stock}
          </span>

        </div>

      </div>

      <CardBody className="p-5">

        {/* Identity */}

        <div className="min-w-0">

          <div className="flex items-start justify-between gap-4">

            <div className="min-w-0">

              <p className="text-[9px] font-bold uppercase tracking-[0.13em] text-ink/30">
                {product.category}
              </p>

              <h3 className="mt-1.5 text-[14px] font-semibold leading-5 tracking-[-0.01em] text-ink">
                {product.name}
              </h3>

              <p className="mt-1 text-[10.5px] leading-5 text-ink/40">
                {product.specification}
              </p>

            </div>

            <div className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-paper-2 text-ink/25 sm:flex">
              <Package className="h-3.5 w-3.5" />
            </div>

          </div>

        </div>

        {/* Details */}

        <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 border-y border-line py-4">

          <ProductDetail
            label="Unit"
            value={product.unit}
          />

          <ProductDetail
            label="Availability"
            value={product.quantity}
          />

          <ProductDetail
            label="Delivery"
            value={product.delivery}
          />

          <ProductDetail
            label="Stock status"
            value={product.stock}
            emphasized={product.stock !== 'Out of Stock'}
          />

        </div>

        {/* Footer */}

        <div className="mt-5 flex items-end justify-between gap-4">

          <div className="min-w-0">

            <p className="text-[8.5px] font-bold uppercase tracking-[0.13em] text-ink/30">
              Catalogue price
            </p>

            <div className="mt-1.5 flex items-center gap-1.5">

              <CircleDollarSign className="h-3.5 w-3.5 shrink-0 text-ink/25" />

              <p className="font-display text-[21px] font-semibold tracking-[-0.035em] text-ink">
                {product.price}
              </p>

            </div>

          </div>

          <button
            type="button"
            className="
              inline-flex
              shrink-0
              items-center
              gap-1.5
              rounded-xl
              bg-ink
              px-3.5
              py-2.5
              text-[10px]
              font-bold
              text-white
              transition
              duration-200
              hover:-translate-y-0.5
              hover:bg-[#1657FF]
              hover:shadow-[0_8px_20px_rgba(22,87,255,0.18)]
            "
          >
            Manage
            <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>

        </div>

      </CardBody>

    </Card>
  )
}

/* ========================================================= */
/* Product Detail                                            */
/* ========================================================= */

function ProductDetail({
  label,
  value,
  emphasized = false,
}: {
  label: string
  value: string
  emphasized?: boolean
}) {
  return (
    <div className="min-w-0">

      <p className="text-[8.5px] font-bold uppercase tracking-[0.11em] text-ink/28">
        {label}
      </p>

      <p
        className={`
          mt-1
          truncate
          text-[10.5px]
          font-semibold
          ${emphasized ? 'text-ink/70' : 'text-ink/50'}
        `}
      >
        {value}
      </p>

    </div>
  )
}

/* ========================================================= */
/* Market Metric                                             */
/* ========================================================= */

function MarketMetric({
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

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/[0.045]">
          <Icon className="h-4 w-4 text-ink/45" />
        </div>

        <div>

          <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-ink/30">
            {label}
          </p>

          <p className="mt-0.5 font-display text-[21px] font-semibold tracking-[-0.03em] text-ink">
            {value}
          </p>

        </div>

      </div>

      <p className="mt-3 text-[10px] text-ink/35">
        {description}
      </p>

    </div>
  )
}

/* ========================================================= */
/* Workflow Step                                             */
/* ========================================================= */

function WorkflowStep({
  number,
  title,
  description,
  icon: Icon,
}: {
  number: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <div
      className="
        group
        relative
        rounded-2xl
        border
        border-line
        bg-paper-2
        p-4
        transition
        duration-200
        hover:-translate-y-0.5
        hover:border-ink/[0.12]
        hover:bg-white
      "
    >

      <div className="flex items-center justify-between">

        <span className="font-mono text-[9px] font-bold tracking-[0.12em] text-ink/25">
          {number}
        </span>

        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-ink/35 ring-1 ring-ink/[0.05] transition group-hover:text-[#1657FF]">
          <Icon className="h-3.5 w-3.5" />
        </div>

      </div>

      <h3 className="mt-4 text-[11.5px] font-semibold text-ink">
        {title}
      </h3>

      <p className="mt-1.5 text-[10px] leading-5 text-ink/40">
        {description}
      </p>

    </div>
  )
}
