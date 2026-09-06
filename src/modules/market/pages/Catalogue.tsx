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

  return (
    <div className="space-y-6">
      {/* Marketplace header */}
      <Card className="overflow-hidden">
        <div className="border-b border-line bg-paper-2 px-6 py-6 sm:px-8">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink text-white">
                  <ShoppingCart className="h-5 w-5" />
                </div>

                <div>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/40">
                    Build OS marketplace
                  </p>

                  <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">
                    Materials Market
                  </h1>
                </div>
              </div>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-ink/50">
                Manage your approved construction materials, pricing, stock
                availability and delivery capacity for Build OS procurement
                requests.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-xs font-semibold text-ink transition-colors hover:bg-ink/[0.03]"
              >
                <ClipboardCheck className="h-4 w-4" />
                Procurement requests
              </button>

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
              >
                <Package className="h-4 w-4" />
                Add material
              </button>
            </div>
          </div>
        </div>

        {/* Marketplace metrics */}
        <div className="grid divide-y divide-line sm:grid-cols-2 sm:divide-x sm:divide-y-0 xl:grid-cols-4">
          <MarketMetric
            icon={Package}
            label="Listed materials"
            value={products.length.toString()}
            description="Active catalogue items"
          />

          <MarketMetric
            icon={CheckCircle2}
            label="Available"
            value={inStockProducts.toString()}
            description="Ready for procurement"
          />

          <MarketMetric
            icon={Warehouse}
            label="Low stock"
            value={lowStockProducts.toString()}
            description="Requires attention"
          />

          <MarketMetric
            icon={Truck}
            label="Delivery coverage"
            value="FCT + 3"
            description="Active delivery zones"
          />
        </div>
      </Card>

      {/* Procurement compliance */}
      <Card>
        <CardBody>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-sm font-semibold text-ink">
                    Marketplace verification active
                  </h2>

                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold text-emerald-700">
                    <BadgeCheck className="h-3 w-3" />
                    Verified supplier
                  </span>
                </div>

                <p className="mt-1.5 max-w-3xl text-xs leading-5 text-ink/45">
                  Your catalogue can receive procurement quotation requests
                  because your supplier profile, business details and delivery
                  capability have been verified.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-ink/60 transition-colors hover:text-ink"
            >
              View verification
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </CardBody>
      </Card>

      {/* Catalogue controls */}
      <Card>
        <CardBody>
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="relative w-full xl:max-w-md">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35" />

              <input
                type="search"
                placeholder="Search materials, specifications or categories..."
                className="h-11 w-full rounded-xl border border-line bg-white pl-10 pr-4 text-sm text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-ink/25"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-3.5 py-2.5 text-xs font-medium text-ink/60 hover:bg-paper-2"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Filters
              </button>

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-3.5 py-2.5 text-xs font-medium text-ink/60 hover:bg-paper-2"
              >
                <Boxes className="h-3.5 w-3.5" />
                Availability
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
            {categories.map((category, index) => (
              <button
                key={category}
                type="button"
                className={
                  index === 0
                    ? 'shrink-0 rounded-full bg-ink px-3.5 py-2 text-xs font-semibold text-white'
                    : 'shrink-0 rounded-full border border-line bg-white px-3.5 py-2 text-xs font-medium text-ink/50 transition-colors hover:bg-paper-2 hover:text-ink'
                }
              >
                {category}
              </button>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Catalogue */}
      <div className="grid gap-6 lg:grid-cols-2 2xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Procurement information */}
      <Card className="overflow-hidden">
        <CardHeader
          title="How your materials enter procurement"
          subtitle="Build OS links catalogue items to verified project material requests."
        />

        <CardBody>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <WorkflowStep
              number="01"
              title="Material request"
              description="A contractor submits a project material requirement."
            />

            <WorkflowStep
              number="02"
              title="Supplier quotation"
              description="Verified suppliers provide pricing and delivery terms."
            />

            <WorkflowStep
              number="03"
              title="Fund reservation"
              description="Escrow reserves the approved purchase amount."
            />

            <WorkflowStep
              number="04"
              title="Delivery verification"
              description="Evidence is reviewed before supplier payment release."
            />
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

function ProductCard({
  product,
}: {
  product: MarketProduct
}) {
  const statusStyle = {
    'In Stock':
      'bg-emerald-500/10 text-emerald-700',
    'Low Stock':
      'bg-amber-500/10 text-amber-700',
    'Out of Stock':
      'bg-rose-500/10 text-rose-700',
  }

  const StatusIcon =
    product.stock === 'Out of Stock'
      ? XCircle
      : product.stock === 'Low Stock'
        ? Construction
        : CheckCircle2

  return (
    <Card className="group overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-md">
      {/* Product visual */}
      <div className="flex h-36 items-center justify-between border-b border-line bg-paper-2 p-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-line bg-white font-mono text-xs font-bold tracking-wider text-ink/45">
          {product.imageLabel}
        </div>

        <div className="flex flex-col items-end gap-2">
          {product.verified && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold text-emerald-700">
              <BadgeCheck className="h-3 w-3" />
              Approved
            </span>
          )}

          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusStyle[product.stock]}`}
          >
            <StatusIcon className="h-3 w-3" />
            {product.stock}
          </span>
        </div>
      </div>

      <CardBody>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
              {product.category}
            </p>

            <h3 className="mt-1 text-sm font-semibold leading-5 text-ink">
              {product.name}
            </h3>

            <p className="mt-1 text-xs text-ink/45">
              {product.specification}
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4 border-y border-line py-4">
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
            label="Status"
            value={product.stock}
          />
        </div>

        <div className="mt-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
              Catalogue price
            </p>

            <div className="mt-1 flex items-center gap-1.5">
              <CircleDollarSign className="h-4 w-4 text-ink/40" />

              <p className="font-display text-xl font-semibold text-ink">
                {product.price}
              </p>
            </div>
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-white px-3.5 py-2.5 text-xs font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
          >
            Manage
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </CardBody>
    </Card>
  )
}

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

      <p className="mt-3 text-xs text-ink/40">
        {description}
      </p>
    </div>
  )
}

function ProductDetail({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
        {label}
      </p>

      <p className="mt-1 truncate text-xs font-medium text-ink/65">
        {value}
      </p>
    </div>
  )
}

function WorkflowStep({
  number,
  title,
  description,
}: {
  number: string
  title: string
  description: string
}) {
  return (
    <div className="rounded-xl border border-line bg-paper-2 p-4">
      <span className="font-mono text-[10px] font-semibold text-ink/35">
        {number}
      </span>

      <h3 className="mt-3 text-sm font-semibold text-ink">
        {title}
      </h3>

      <p className="mt-1.5 text-xs leading-5 text-ink/45">
        {description}
      </p>
    </div>
  )
}