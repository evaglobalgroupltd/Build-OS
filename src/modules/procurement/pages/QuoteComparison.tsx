import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Package,
  ShieldCheck,
  Star,
  TrendingDown,
  Truck,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

type Quote = {
  id: string
  supplier: string
  amount: number
  deliveryDays: number
  validUntil: string
  paymentTerms: string
  deliveryIncluded: boolean
  documentationIncluded: boolean
  notes: string
  status: 'recommended' | 'received' | 'under review'
}

const quotes: Quote[] = [
  {
    id: 'QT-2026-021',
    supplier: 'Prime Build Materials Ltd.',
    amount: 1950000,
    deliveryDays: 3,
    validUntil: 'Sep 05, 2026',
    paymentTerms: '50% advance, 50% on delivery',
    deliveryIncluded: true,
    documentationIncluded: true,
    notes: 'Includes site delivery and material documentation.',
    status: 'recommended',
  },
  {
    id: 'QT-2026-020',
    supplier: 'BuildRight Supplies',
    amount: 2025000,
    deliveryDays: 5,
    validUntil: 'Sep 04, 2026',
    paymentTerms: '50% advance, balance on delivery',
    deliveryIncluded: true,
    documentationIncluded: true,
    notes: 'Delivery available within five working days.',
    status: 'received',
  },
  {
    id: 'QT-2026-019',
    supplier: 'Capital Construction Supply',
    amount: 2110000,
    deliveryDays: 4,
    validUntil: 'Sep 03, 2026',
    paymentTerms: '30 days from delivery',
    deliveryIncluded: false,
    documentationIncluded: true,
    notes: 'Transport charged separately.',
    status: 'received',
  },
]

const request = {
  id: 'MR-014',
  project: 'Maitama Duplex Construction',
  item: '12mm High Tensile Steel Bar',
  quantity: '2 tonnes',
  requestedDate: 'Aug 26, 2026',
}

export function QuoteComparison() {
  const lowestPrice = Math.min(...quotes.map((quote) => quote.amount))
  const fastestDelivery = Math.min(
    ...quotes.map((quote) => quote.deliveryDays),
  )

  const recommendedQuote =
    quotes.find((quote) => quote.status === 'recommended') ?? quotes[0]

  const savingsAgainstHighest =
    Math.max(...quotes.map((quote) => quote.amount)) -
    recommendedQuote.amount

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/35">
            Procurement / Quote comparison
          </p>

          <h1 className="mt-1 text-xl font-semibold text-ink">
            Compare supplier quotes
          </h1>

          <p className="mt-1 max-w-2xl text-xs leading-5 text-ink/45">
            Review supplier pricing, delivery terms and commercial conditions
            before making a supplier selection.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-xl border border-line px-4 py-2.5 text-xs font-semibold text-ink/60 hover:bg-ink/[0.03] hover:text-ink"
          >
            Back to quotations
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white hover:opacity-90"
          >
            Select supplier
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Request context */}
      <Card>
        <CardBody>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink/5">
                <Package className="h-4 w-4 text-ink/50" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-mono text-xs font-semibold text-ink">
                    {request.id}
                  </p>

                  <Badge tone="amber">Quotation review</Badge>
                </div>

                <p className="mt-1 text-sm font-semibold text-ink">
                  {request.item}
                </p>

                <p className="mt-0.5 text-xs text-ink/40">
                  {request.quantity} · {request.project}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
              <ContextValue
                label="Requested"
                value={request.requestedDate}
              />

              <ContextValue
                label="Suppliers"
                value={`${quotes.length}`}
              />

              <ContextValue
                label="Quotes"
                value={`${quotes.length}`}
              />
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Comparison summary */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          icon={TrendingDown}
          label="Lowest quote"
          value={formatCurrency(lowestPrice)}
          description="Best quoted price"
        />

        <SummaryCard
          icon={Truck}
          label="Fastest delivery"
          value={`${fastestDelivery} days`}
          description="Shortest supplier lead time"
        />

        <SummaryCard
          icon={Star}
          label="Recommended"
          value={recommendedQuote.supplier}
          description="Current preferred supplier"
          compact
        />

        <SummaryCard
          icon={CheckCircle2}
          label="Potential saving"
          value={formatCurrency(savingsAgainstHighest)}
          description="Against highest quotation"
        />
      </div>

      {/* Side-by-side comparison */}
      <Card className="overflow-hidden">
        <CardHeader
          title="Supplier comparison"
          subtitle="Commercial comparison for the selected material request."
        />

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse">
            <thead>
              <tr className="border-b border-line bg-ink/[0.02]">
                <th className="w-[190px] px-6 py-4 text-left text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                  Comparison
                </th>

                {quotes.map((quote) => (
                  <th
                    key={quote.id}
                    className="min-w-[230px] border-l border-line px-5 py-4 text-left"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold text-ink">
                          {quote.supplier}
                        </p>

                        <p className="mt-1 font-mono text-[9px] text-ink/30">
                          {quote.id}
                        </p>
                      </div>

                      {quote.status === 'recommended' && (
                        <Badge tone="teal">
                          <span className="inline-flex items-center gap-1">
                            <Star className="h-2.5 w-2.5" />
                            Recommended
                          </span>
                        </Badge>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              <ComparisonRow label="Quoted amount">
                {quotes.map((quote) => (
                  <ComparisonValue key={quote.id}>
                    <span className="text-sm font-semibold text-ink">
                      {formatCurrency(quote.amount)}
                    </span>

                    {quote.amount === lowestPrice && (
                      <span className="mt-1 flex items-center gap-1 text-[9px] font-semibold text-teal-700">
                        <TrendingDown className="h-2.5 w-2.5" />
                        Lowest price
                      </span>
                    )}
                  </ComparisonValue>
                ))}
              </ComparisonRow>

              <ComparisonRow label="Delivery time">
                {quotes.map((quote) => (
                  <ComparisonValue key={quote.id}>
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ink">
                      <Truck className="h-3 w-3 text-ink/30" />
                      {quote.deliveryDays} days
                    </span>

                    {quote.deliveryDays === fastestDelivery && (
                      <span className="mt-1 text-[9px] font-semibold text-teal-700">
                        Fastest delivery
                      </span>
                    )}
                  </ComparisonValue>
                ))}
              </ComparisonRow>

              <ComparisonRow label="Quote validity">
                {quotes.map((quote) => (
                  <ComparisonValue key={quote.id}>
                    <span className="inline-flex items-center gap-1.5 text-xs text-ink/60">
                      <CalendarDays className="h-3 w-3 text-ink/30" />
                      {quote.validUntil}
                    </span>
                  </ComparisonValue>
                ))}
              </ComparisonRow>

              <ComparisonRow label="Payment terms">
                {quotes.map((quote) => (
                  <ComparisonValue key={quote.id}>
                    <span className="text-xs leading-4 text-ink/60">
                      {quote.paymentTerms}
                    </span>
                  </ComparisonValue>
                ))}
              </ComparisonRow>

              <ComparisonRow label="Site delivery">
                {quotes.map((quote) => (
                  <ComparisonValue key={quote.id}>
                    <BooleanValue value={quote.deliveryIncluded} />
                  </ComparisonValue>
                ))}
              </ComparisonRow>

              <ComparisonRow label="Documentation">
                {quotes.map((quote) => (
                  <ComparisonValue key={quote.id}>
                    <BooleanValue
                      value={quote.documentationIncluded}
                    />
                  </ComparisonValue>
                ))}
              </ComparisonRow>

              <ComparisonRow label="Notes">
                {quotes.map((quote) => (
                  <ComparisonValue key={quote.id}>
                    <p className="text-[11px] leading-4 text-ink/45">
                      {quote.notes}
                    </p>
                  </ComparisonValue>
                ))}
              </ComparisonRow>

              <tr className="border-t border-line">
                <td className="px-6 py-5">
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                    Decision
                  </span>
                </td>

                {quotes.map((quote) => (
                  <td
                    key={quote.id}
                    className="border-l border-line px-5 py-5"
                  >
                    <button
                      type="button"
                      className={
                        quote.status === 'recommended'
                          ? 'inline-flex w-full items-center justify-center gap-2 rounded-xl bg-ink px-3 py-2.5 text-[11px] font-semibold text-white hover:opacity-90'
                          : 'inline-flex w-full items-center justify-center gap-2 rounded-xl border border-line px-3 py-2.5 text-[11px] font-semibold text-ink/60 hover:bg-ink/[0.03] hover:text-ink'
                      }
                    >
                      {quote.status === 'recommended'
                        ? 'Select supplier'
                        : 'Select this quote'}

                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Recommendation */}
      <Card>
        <CardHeader
          title="Procurement recommendation"
          subtitle="Current recommendation based on the available quotation information."
        />

        <CardBody>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-500/10">
                <ShieldCheck className="h-4 w-4 text-teal-700" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold text-ink">
                    {recommendedQuote.supplier}
                  </p>

                  <Badge tone="teal">Recommended</Badge>
                </div>

                <p className="mt-1 max-w-2xl text-xs leading-5 text-ink/45">
                  The current recommendation combines the lowest quoted
                  price with the fastest delivery and includes site delivery
                  and supporting documentation.
                </p>
              </div>
            </div>

            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                className="rounded-xl border border-line px-4 py-2.5 text-xs font-semibold text-ink/60 hover:bg-ink/[0.03] hover:text-ink"
              >
                Keep reviewing
              </button>

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white hover:opacity-90"
              >
                Select {recommendedQuote.supplier}
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Review note */}
      <div className="flex items-start gap-3 rounded-xl border border-line bg-ink/[0.02] px-4 py-3">
        <Clock3 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink/35" />

        <p className="text-[11px] leading-4 text-ink/40">
          Supplier selection should be recorded against the material request
          before proceeding to fund reservation and purchase order creation.
        </p>
      </div>
    </div>
  )
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  description,
  compact = false,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  description: string
  compact?: boolean
}) {
  return (
    <Card>
      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5">
            <Icon className="h-4 w-4 text-ink/50" />
          </div>

          <p
            className={
              compact
                ? 'max-w-[150px] truncate text-sm font-semibold text-ink'
                : 'text-xl font-semibold text-ink'
            }
          >
            {value}
          </p>
        </div>

        <p className="mt-4 text-[10px] font-semibold uppercase tracking-wide text-ink/35">
          {label}
        </p>

        <p className="mt-1 text-xs text-ink/40">{description}</p>
      </div>
    </Card>
  )
}

function ContextValue({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div>
      <p className="text-[9px] font-semibold uppercase tracking-wide text-ink/30">
        {label}
      </p>

      <p className="mt-1 text-xs font-semibold text-ink">{value}</p>
    </div>
  )
}

function ComparisonRow({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <tr className="border-b border-line last:border-0">
      <td className="px-6 py-5 align-top">
        <span className="text-xs font-medium text-ink/55">{label}</span>
      </td>

      {children}
    </tr>
  )
}

function ComparisonValue({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <td className="border-l border-line px-5 py-5 align-top">
      <div className="flex min-h-[24px] flex-col">{children}</div>
    </td>
  )
}

function BooleanValue({ value }: { value: boolean }) {
  return value ? (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-teal-700">
      <CheckCircle2 className="h-3.5 w-3.5" />
      Included
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 text-xs text-ink/35">
      <FileText className="h-3.5 w-3.5" />
      Not included
    </span>
  )
}

function formatCurrency(amount: number) {
  return `₦${amount.toLocaleString('en-NG')}`
}