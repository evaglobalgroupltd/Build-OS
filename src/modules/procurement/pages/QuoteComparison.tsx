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
import { type ReactNode } from 'react'

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

  const highestPrice = Math.max(
    ...quotes.map((quote) => quote.amount),
  )

  const fastestDelivery = Math.min(
    ...quotes.map((quote) => quote.deliveryDays),
  )

  const recommendedQuote =
    quotes.find((quote) => quote.status === 'recommended') ?? quotes[0]

  const savingsAgainstHighest =
    highestPrice - recommendedQuote.amount

  const recommendationIsLowest =
    recommendedQuote.amount === lowestPrice

  const recommendationIsFastest =
    recommendedQuote.deliveryDays === fastestDelivery

  return (
    <div className="space-y-7 pb-8">
      {/* Page header */}
      <section className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/35">
              Procurement control
            </p>

            <span className="h-1 w-1 rounded-full bg-ink/20" />

            <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-ink/30">
              {request.id}
            </span>
          </div>

          <h1 className="mt-2 text-[27px] font-semibold tracking-[-0.035em] text-ink sm:text-[31px]">
            Compare supplier quotes
          </h1>

          <p className="mt-2 max-w-2xl text-[13px] leading-6 text-ink/45">
            Evaluate pricing, delivery commitments and commercial conditions
            before confirming the supplier for this material request.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-ink/[0.08] bg-white px-4 text-[11px] font-semibold text-ink/60 shadow-[0_4px_14px_rgba(20,40,30,0.03)] transition-all hover:border-ink/15 hover:bg-ink/[0.025] hover:text-ink"
          >
            <ArrowRight className="h-3.5 w-3.5 rotate-180 opacity-50" />
            Back to quotations
          </button>

          <button
            type="button"
            className="group inline-flex h-10 items-center justify-center gap-2 rounded-full bg-ink px-5 text-[11px] font-semibold text-white shadow-[0_8px_20px_rgba(20,40,30,0.11)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_25px_rgba(20,40,30,0.15)]"
          >
            Select supplier
            <ArrowRight className="h-3.5 w-3.5 opacity-55 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </section>

      {/* Request context */}
      <section className="overflow-hidden rounded-[22px] border border-ink/[0.07] bg-white shadow-[0_10px_30px_rgba(20,40,30,0.04)]">
        <div className="border-b border-ink/[0.06] bg-ink/[0.018] px-5 py-3.5 sm:px-6">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-ink/30">
              Material request
            </p>

            <Badge tone="amber">Quotation review</Badge>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex min-w-0 items-start gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[15px] bg-ink/[0.045]">
                <Package className="h-4 w-4 text-ink/50" />
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-mono text-[11px] font-semibold text-ink">
                    {request.id}
                  </p>

                  <span className="h-1 w-1 rounded-full bg-ink/15" />

                  <span className="text-[9px] font-medium uppercase tracking-[0.1em] text-ink/30">
                    Active request
                  </span>
                </div>

                <h2 className="mt-1.5 text-[15px] font-semibold tracking-[-0.015em] text-ink">
                  {request.item}
                </h2>

                <p className="mt-1 text-[11px] text-ink/40">
                  {request.quantity} · {request.project}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:min-w-[390px]">
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
        </div>
      </section>

      {/* Comparison snapshot */}
      <section>
        <SectionEyebrow label="Decision snapshot" />

        <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            icon={TrendingDown}
            label="Lowest quote"
            value={formatCurrency(lowestPrice)}
            description="Best quoted price"
            accent="teal"
          />

          <SummaryCard
            icon={Truck}
            label="Fastest delivery"
            value={`${fastestDelivery} days`}
            description="Shortest supplier lead time"
            accent="amber"
          />

          <SummaryCard
            icon={Star}
            label="Recommended"
            value={recommendedQuote.supplier}
            description="Current preferred supplier"
            accent="teal"
            compact
          />

          <SummaryCard
            icon={CheckCircle2}
            label="Potential saving"
            value={formatCurrency(savingsAgainstHighest)}
            description="Against highest quotation"
            accent="neutral"
          />
        </div>
      </section>

      {/* Recommendation intelligence */}
      <section className="overflow-hidden rounded-[22px] border border-[#12613E]/10 bg-[#EAF4EE]/45">
        <div className="flex flex-col gap-6 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between lg:p-7">
          <div className="flex items-start gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[15px] bg-[#12613E] text-white shadow-[0_8px_20px_rgba(18,97,62,0.14)]">
              <ShieldCheck className="h-4 w-4" />
            </div>

            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#12613E]/60">
                  Current recommendation
                </p>

                <Badge tone="teal">Recommended</Badge>
              </div>

              <h2 className="mt-1.5 text-base font-semibold tracking-[-0.015em] text-ink">
                {recommendedQuote.supplier}
              </h2>

              <p className="mt-1.5 text-[11px] leading-5 text-ink/45">
                {recommendedQuote.notes}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:min-w-[390px]">
            <DecisionSignal
              label="Price"
              value={
                recommendationIsLowest
                  ? 'Lowest'
                  : formatCurrency(recommendedQuote.amount)
              }
              positive={recommendationIsLowest}
            />

            <DecisionSignal
              label="Delivery"
              value={
                recommendationIsFastest
                  ? 'Fastest'
                  : `${recommendedQuote.deliveryDays} days`
              }
              positive={recommendationIsFastest}
            />

            <DecisionSignal
              label="Site delivery"
              value={
                recommendedQuote.deliveryIncluded
                  ? 'Included'
                  : 'Excluded'
              }
              positive={recommendedQuote.deliveryIncluded}
            />
          </div>
        </div>
      </section>

      {/* Supplier comparison */}
      <Card className="overflow-hidden">
        <CardHeader
          title="Supplier comparison"
          subtitle="Commercial comparison for the selected material request."
          action={
            <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-ink/25">
              {quotes.length} supplier options
            </span>
          }
        />

        <div className="overflow-x-auto">
          <table className="w-full min-w-[940px] border-collapse">
            <thead>
              <tr className="border-b border-line bg-ink/[0.018]">
                <th className="w-[185px] px-6 py-4 text-left text-[9px] font-semibold uppercase tracking-[0.13em] text-ink/30">
                  Commercial factor
                </th>

                {quotes.map((quote) => (
                  <th
                    key={quote.id}
                    className={[
                      'min-w-[250px] border-l border-line px-5 py-4 text-left',
                      quote.status === 'recommended'
                        ? 'bg-[#EAF4EE]/35'
                        : '',
                    ].join(' ')}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-xs font-semibold text-ink">
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
                  <ComparisonValue
                    key={quote.id}
                    highlighted={quote.status === 'recommended'}
                  >
                    <span className="text-[14px] font-semibold tracking-[-0.015em] text-ink">
                      {formatCurrency(quote.amount)}
                    </span>

                    {quote.amount === lowestPrice && (
                      <Signal label="Lowest price" icon={TrendingDown} />
                    )}
                  </ComparisonValue>
                ))}
              </ComparisonRow>

              <ComparisonRow label="Delivery time">
                {quotes.map((quote) => (
                  <ComparisonValue
                    key={quote.id}
                    highlighted={quote.status === 'recommended'}
                  >
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ink">
                      <Truck className="h-3 w-3 text-ink/30" />
                      {quote.deliveryDays} days
                    </span>

                    {quote.deliveryDays === fastestDelivery && (
                      <Signal label="Fastest delivery" icon={Truck} />
                    )}
                  </ComparisonValue>
                ))}
              </ComparisonRow>

              <ComparisonRow label="Quote validity">
                {quotes.map((quote) => (
                  <ComparisonValue
                    key={quote.id}
                    highlighted={quote.status === 'recommended'}
                  >
                    <span className="inline-flex items-center gap-1.5 text-xs text-ink/60">
                      <CalendarDays className="h-3 w-3 text-ink/30" />
                      {quote.validUntil}
                    </span>
                  </ComparisonValue>
                ))}
              </ComparisonRow>

              <ComparisonRow label="Payment terms">
                {quotes.map((quote) => (
                  <ComparisonValue
                    key={quote.id}
                    highlighted={quote.status === 'recommended'}
                  >
                    <span className="block max-w-[210px] text-[11px] leading-5 text-ink/55">
                      {quote.paymentTerms}
                    </span>
                  </ComparisonValue>
                ))}
              </ComparisonRow>

              <ComparisonRow label="Site delivery">
                {quotes.map((quote) => (
                  <ComparisonValue
                    key={quote.id}
                    highlighted={quote.status === 'recommended'}
                  >
                    <BooleanValue value={quote.deliveryIncluded} />
                  </ComparisonValue>
                ))}
              </ComparisonRow>

              <ComparisonRow label="Documentation">
                {quotes.map((quote) => (
                  <ComparisonValue
                    key={quote.id}
                    highlighted={quote.status === 'recommended'}
                  >
                    <BooleanValue
                      value={quote.documentationIncluded}
                    />
                  </ComparisonValue>
                ))}
              </ComparisonRow>

              <ComparisonRow label="Supplier notes">
                {quotes.map((quote) => (
                  <ComparisonValue
                    key={quote.id}
                    highlighted={quote.status === 'recommended'}
                  >
                    <p className="max-w-[220px] text-[11px] leading-5 text-ink/45">
                      {quote.notes}
                    </p>
                  </ComparisonValue>
                ))}
              </ComparisonRow>

              <tr className="border-t border-line">
                <td className="bg-ink/[0.018] px-6 py-5">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.13em] text-ink/30">
                    Decision
                  </span>
                </td>

                {quotes.map((quote) => (
                  <td
                    key={quote.id}
                    className={[
                      'border-l border-line px-5 py-5',
                      quote.status === 'recommended'
                        ? 'bg-[#EAF4EE]/25'
                        : '',
                    ].join(' ')}
                  >
                    <button
                      type="button"
                      className={
                        quote.status === 'recommended'
                          ? 'group inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-3.5 py-2.5 text-[10px] font-semibold text-white shadow-[0_6px_16px_rgba(20,40,30,0.10)] transition-all hover:-translate-y-0.5 hover:shadow-[0_9px_20px_rgba(20,40,30,0.14)]'
                          : 'group inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink/[0.08] bg-white px-3.5 py-2.5 text-[10px] font-semibold text-ink/55 transition-all hover:border-ink/15 hover:bg-ink/[0.025] hover:text-ink'
                      }
                    >
                      {quote.status === 'recommended'
                        ? 'Select supplier'
                        : 'Select this quote'}

                      <ArrowRight className="h-3 w-3 opacity-50 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Final recommendation */}
      <Card className="overflow-hidden">
        <CardHeader
          title="Procurement recommendation"
          subtitle="Review the current recommendation before recording the supplier selection."
        />

        <CardBody>
          <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-[#EAF4EE] text-[#12613E]">
                <ShieldCheck className="h-4 w-4" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold text-ink">
                    {recommendedQuote.supplier}
                  </p>

                  <Badge tone="teal">Recommended</Badge>
                </div>

                <p className="mt-1.5 max-w-2xl text-[11px] leading-5 text-ink/45">
                  The current recommendation combines the available pricing,
                  delivery and commercial information. Final supplier
                  selection should be recorded against the material request.
                </p>
              </div>
            </div>

            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <button
                type="button"
                className="inline-flex h-10 items-center justify-center rounded-full border border-ink/[0.08] px-4 text-[10px] font-semibold text-ink/55 transition-colors hover:bg-ink/[0.025] hover:text-ink"
              >
                Keep reviewing
              </button>

              <button
                type="button"
                className="group inline-flex h-10 items-center justify-center gap-2 rounded-full bg-ink px-5 text-[10px] font-semibold text-white shadow-[0_7px_18px_rgba(20,40,30,0.10)] transition-all hover:-translate-y-0.5"
              >
                Select {recommendedQuote.supplier}
                <ArrowRight className="h-3 w-3 opacity-55 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Workflow note */}
      <div className="flex items-start gap-3 rounded-[16px] border border-ink/[0.06] bg-ink/[0.02] px-4 py-3.5">
        <Clock3 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink/30" />

        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-ink/30">
            Next procurement stage
          </p>

          <p className="mt-1 text-[11px] leading-5 text-ink/40">
            Once supplier selection is confirmed, the request can proceed to
            fund reservation and purchase order creation.
          </p>
        </div>
      </div>
    </div>
  )
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  description,
  accent,
  compact = false,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  description: string
  accent: 'neutral' | 'amber' | 'teal'
  compact?: boolean
}) {
  const accentStyles = {
    neutral: {
      rail: 'bg-ink/20',
      icon: 'bg-ink/[0.045] text-ink/50',
    },
    amber: {
      rail: 'bg-[#B85C12]/55',
      icon: 'bg-[#F7EFE8] text-[#B85C12]',
    },
    teal: {
      rail: 'bg-[#12613E]/55',
      icon: 'bg-[#EAF4EE] text-[#12613E]',
    },
  }

  const styles = accentStyles[accent]

  return (
    <Card className="relative overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(20,40,30,0.06)]">
      <div
        className={`absolute bottom-4 left-0 top-4 w-[2px] rounded-r-full ${styles.rail}`}
      />

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] ${styles.icon}`}
          >
            <Icon className="h-4 w-4" />
          </div>

          <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-ink/25">
            Live
          </span>
        </div>

        <div className="mt-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/35">
            {label}
          </p>

          <p
            className={[
              'mt-1 font-semibold tracking-[-0.025em] text-ink',
              compact
                ? 'max-w-[210px] truncate text-[14px]'
                : 'text-[21px]',
            ].join(' ')}
          >
            {value}
          </p>

          <p className="mt-1 text-[11px] text-ink/40">
            {description}
          </p>
        </div>
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
    <div className="rounded-[13px] border border-ink/[0.06] bg-ink/[0.018] px-3.5 py-3">
      <p className="text-[8px] font-semibold uppercase tracking-[0.1em] text-ink/30">
        {label}
      </p>

      <p className="mt-1 text-[11px] font-semibold text-ink">
        {value}
      </p>
    </div>
  )
}

function DecisionSignal({
  label,
  value,
  positive,
}: {
  label: string
  value: string
  positive: boolean
}) {
  return (
    <div className="rounded-[13px] border border-[#12613E]/10 bg-white/65 px-3 py-3">
      <p className="text-[8px] font-semibold uppercase tracking-[0.1em] text-ink/30">
        {label}
      </p>

      <div className="mt-1.5 flex items-center gap-1.5">
        {positive && (
          <CheckCircle2 className="h-3 w-3 shrink-0 text-[#12613E]" />
        )}

        <p
          className={[
            'truncate text-[10px] font-semibold',
            positive ? 'text-[#12613E]' : 'text-ink',
          ].join(' ')}
        >
          {value}
        </p>
      </div>
    </div>
  )
}

function ComparisonRow({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <tr className="border-b border-line last:border-0">
      <td className="bg-ink/[0.012] px-6 py-5 align-top">
        <span className="text-[11px] font-semibold text-ink/50">
          {label}
        </span>
      </td>

      {children}
    </tr>
  )
}

function ComparisonValue({
  children,
  highlighted = false,
}: {
  children: ReactNode
  highlighted?: boolean
}) {
  return (
    <td
      className={[
        'border-l border-line px-5 py-5 align-top',
        highlighted ? 'bg-[#EAF4EE]/20' : '',
      ].join(' ')}
    >
      <div className="flex min-h-[24px] flex-col">{children}</div>
    </td>
  )
}

function Signal({
  label,
  icon: Icon,
}: {
  label: string
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <span className="mt-1.5 inline-flex w-fit items-center gap-1 rounded-full bg-[#EAF4EE] px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.07em] text-[#12613E]">
      <Icon className="h-2.5 w-2.5" />
      {label}
    </span>
  )
}

function BooleanValue({ value }: { value: boolean }) {
  return value ? (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#12613E]">
      <CheckCircle2 className="h-3.5 w-3.5" />
      Included
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-ink/35">
      <span className="h-3.5 w-3.5 rounded-full border border-ink/15" />
      Not included
    </span>
  )
}

function SectionEyebrow({
  label,
}: {
  label: string
}) {
  return (
    <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-ink/30">
      {label}
    </p>
  )
}

function formatCurrency(amount: number) {
  return `₦${amount.toLocaleString('en-NG')}`
}