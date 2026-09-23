import { useMemo, useState } from 'react'
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileText,
  Package,
  Plus,
  ShieldCheck,
  Star,
  TrendingDown,
  Zap,
} from 'lucide-react'
import { type ComponentType } from 'react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

type QuoteStatus =
  | 'received'
  | 'under review'
  | 'recommended'
  | 'selected'
  | 'rejected'

type Quotation = {
  id: string
  supplierName: string
  requestId: string
  projectName: string
  itemSummary: string
  amount: number
  currency: string
  deliveryDays: number
  validUntil: string
  status: QuoteStatus
  submittedDate: string
  notes?: string
}

const quotations: Quotation[] = [
  {
    id: 'QT-2026-021',
    supplierName: 'Prime Build Materials Ltd.',
    requestId: 'MR-014',
    projectName: 'Maitama Duplex Construction',
    itemSummary: '12mm High Tensile Steel Bar — 2 tonnes',
    amount: 1950000,
    currency: '₦',
    deliveryDays: 3,
    validUntil: 'Sep 05, 2026',
    status: 'recommended',
    submittedDate: 'Aug 28, 2026',
    notes: 'Includes site delivery and material documentation.',
  },
  {
    id: 'QT-2026-020',
    supplierName: 'BuildRight Supplies',
    requestId: 'MR-014',
    projectName: 'Maitama Duplex Construction',
    itemSummary: '12mm High Tensile Steel Bar — 2 tonnes',
    amount: 2025000,
    currency: '₦',
    deliveryDays: 5,
    validUntil: 'Sep 04, 2026',
    status: 'received',
    submittedDate: 'Aug 29, 2026',
  },
  {
    id: 'QT-2026-019',
    supplierName: 'Capital Construction Supply',
    requestId: 'MR-014',
    projectName: 'Maitama Duplex Construction',
    itemSummary: '12mm High Tensile Steel Bar — 2 tonnes',
    amount: 2110000,
    currency: '₦',
    deliveryDays: 4,
    validUntil: 'Sep 03, 2026',
    status: 'received',
    submittedDate: 'Aug 29, 2026',
  },
  {
    id: 'QT-2026-018',
    supplierName: 'Electrical Hub Nigeria',
    requestId: 'MR-013',
    projectName: 'Gwarinpa Residential Development',
    itemSummary: 'Electrical conduits and fittings',
    amount: 485000,
    currency: '₦',
    deliveryDays: 4,
    validUntil: 'Sep 02, 2026',
    status: 'under review',
    submittedDate: 'Aug 30, 2026',
  },
]

const statusConfig = {
  received: {
    label: 'Received',
    tone: 'amber' as const,
    icon: Clock3,
  },
  'under review': {
    label: 'Under review',
    tone: 'amber' as const,
    icon: FileText,
  },
  recommended: {
    label: 'Recommended',
    tone: 'teal' as const,
    icon: Star,
  },
  selected: {
    label: 'Selected',
    tone: 'teal' as const,
    icon: CheckCircle2,
  },
  rejected: {
    label: 'Rejected',
    tone: 'amber' as const,
    icon: ShieldCheck,
  },
}

export function Quotations() {
  const [selectedRequest, setSelectedRequest] = useState('all')

  const requestIds = useMemo(
    () => [...new Set(quotations.map((quote) => quote.requestId))],
    [],
  )

  const filteredQuotes =
    selectedRequest === 'all'
      ? quotations
      : quotations.filter((quote) => quote.requestId === selectedRequest)

  const receivedCount = quotations.filter(
    (quote) =>
      quote.status === 'received' || quote.status === 'under review',
  ).length

  const recommendedCount = quotations.filter(
    (quote) => quote.status === 'recommended',
  ).length

  const selectedCount = quotations.filter(
    (quote) => quote.status === 'selected',
  ).length

  const totalQuotedValue = quotations.reduce(
    (sum, quote) => sum + quote.amount,
    0,
  )

  const recommendedQuote = quotations.find(
    (quote) => quote.status === 'recommended',
  )

  return (
    <div className="space-y-7 pb-8">
      {/* Page header */}
      <section className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/35">
              Commercial evaluation
            </p>

            <span className="h-1 w-1 rounded-full bg-ink/20" />

            <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-ink/30">
              {quotations.length.toString().padStart(2, '0')} quotations
            </span>
          </div>

          <h1 className="mt-2 text-[27px] font-semibold tracking-[-0.035em] text-ink sm:text-[31px]">
            Quotations
          </h1>

          <p className="mt-2 max-w-2xl text-[13px] leading-6 text-ink/45">
            Review supplier offers, compare commercial terms, and move
            preferred quotations toward supplier selection.
          </p>
        </div>

        <button
          type="button"
          className="group inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-ink px-5 text-xs font-semibold text-white shadow-[0_10px_24px_rgba(20,40,30,0.12)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(20,40,30,0.16)]"
        >
          <Plus className="h-3.5 w-3.5" />
          Request quotation
          <ArrowRight className="h-3.5 w-3.5 opacity-50 transition-transform group-hover:translate-x-0.5" />
        </button>
      </section>

      {/* Executive overview */}
      <section className="overflow-hidden rounded-[24px] bg-ink p-5 text-white shadow-[0_18px_45px_rgba(20,40,30,0.10)] sm:p-6 lg:p-7">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
                <Star className="h-3.5 w-3.5 text-white/75" />
              </span>

              <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/40">
                Supplier evaluation
              </p>
            </div>

            <h2 className="mt-4 text-xl font-semibold tracking-[-0.025em] sm:text-2xl">
              Compare before you commit.
            </h2>

            <p className="mt-2 max-w-lg text-xs leading-5 text-white/45">
              Keep pricing, delivery commitments and supplier responses
              visible while every quotation moves through review.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2 self-start rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 lg:self-auto">
            <span className="h-1.5 w-1.5 rounded-full bg-[#8CC9A5]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/55">
              Evaluation active
            </span>
          </div>
        </div>

        <div className="mt-7 grid gap-2 border-t border-white/[0.08] pt-5 sm:grid-cols-3">
          <OverviewMetric
            label="Awaiting review"
            value={receivedCount}
          />

          <OverviewMetric
            label="Recommended"
            value={recommendedCount}
          />

          <OverviewMetric
            label="Quoted value"
            value={formatCurrency(totalQuotedValue)}
          />
        </div>
      </section>

      {/* Summary metrics */}
      <section>
        <SectionEyebrow label="Evaluation snapshot" />

        <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            icon={Clock3}
            label="Awaiting review"
            value={receivedCount}
            description="Quotes requiring review"
            accent="amber"
          />

          <SummaryCard
            icon={Star}
            label="Recommended"
            value={recommendedCount}
            description="Preferred supplier quotes"
            accent="teal"
          />

          <SummaryCard
            icon={CheckCircle2}
            label="Selected"
            value={selectedCount}
            description="Supplier selections"
            accent="teal"
          />

          <SummaryCard
            icon={TrendingDown}
            label="Quoted value"
            value={formatCurrency(totalQuotedValue)}
            description="Combined quotation value"
            accent="neutral"
          />
        </div>
      </section>

      {/* Request filter */}
      <Card className="overflow-hidden">
        <CardBody>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-ink/[0.045]">
                <FileText className="h-4 w-4 text-ink/50" />
              </div>

              <div>
                <p className="text-xs font-semibold text-ink">
                  Compare quotations by request
                </p>

                <p className="mt-1 text-[11px] leading-4 text-ink/40">
                  Focus the workspace on one material request when comparing
                  supplier offers.
                </p>
              </div>
            </div>

            <div className="relative shrink-0">
              <select
                value={selectedRequest}
                onChange={(event) => setSelectedRequest(event.target.value)}
                className="h-10 min-w-[180px] appearance-none rounded-full border border-ink/[0.08] bg-white pl-4 pr-10 text-[11px] font-semibold text-ink outline-none shadow-[0_4px_14px_rgba(20,40,30,0.04)] transition-all hover:border-ink/[0.14] focus:border-ink/20 focus:ring-4 focus:ring-ink/[0.04]"
              >
                <option value="all">All requests</option>

                {requestIds.map((requestId) => (
                  <option key={requestId} value={requestId}>
                    {requestId}
                  </option>
                ))}
              </select>

              <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink/35" />
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Recommended spotlight */}
      {selectedRequest === 'all' && recommendedQuote && (
        <RecommendedSpotlight quote={recommendedQuote} />
      )}

      {/* Quotations */}
      <Card className="overflow-hidden">
        <CardHeader
          title="Supplier quotations"
          subtitle="Quotes received against active material requests."
          action={
            <div className="flex items-center gap-2">
              <span className="hidden text-[10px] font-medium uppercase tracking-[0.1em] text-ink/30 sm:inline">
                Evaluation register
              </span>

              <Badge tone="amber">
                {filteredQuotes.length.toString().padStart(2, '0')}{' '}
                {filteredQuotes.length === 1 ? 'quote' : 'quotes'}
              </Badge>
            </div>
          }
        />

        <div className="divide-y divide-line">
          {filteredQuotes.map((quote) => (
            <QuotationRow key={quote.id} quote={quote} />
          ))}

          {filteredQuotes.length === 0 && <EmptyQuotations />}
        </div>
      </Card>

      {/* Comparison */}
      {selectedRequest !== 'all' && filteredQuotes.length > 0 && (
        <QuotationComparison quotes={filteredQuotes} />
      )}
    </div>
  )
}

function RecommendedSpotlight({
  quote,
}: {
  quote: Quotation
}) {
  return (
    <section className="overflow-hidden rounded-[20px] border border-[#12613E]/10 bg-[#EAF4EE]/45 p-5 sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-[#12613E] text-white shadow-[0_8px_18px_rgba(18,97,62,0.14)]">
            <Star className="h-4 w-4" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#12613E]/60">
                Current recommendation
              </p>

              <Badge tone="teal">Recommended</Badge>
            </div>

            <h3 className="mt-1.5 text-sm font-semibold tracking-[-0.01em] text-ink">
              {quote.supplierName}
            </h3>

            <p className="mt-1 text-[11px] leading-5 text-ink/45">
              {quote.itemSummary}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:min-w-[380px]">
          <SpotlightMetric
            label="Quote"
            value={formatCurrency(quote.amount)}
          />

          <SpotlightMetric
            label="Delivery"
            value={`${quote.deliveryDays} days`}
          />

          <SpotlightMetric
            label="Valid until"
            value={quote.validUntil}
          />
        </div>
      </div>
    </section>
  )
}

function QuotationRow({
  quote,
}: {
  quote: Quotation
}) {
  const config = statusConfig[quote.status]
  const StatusIcon = config.icon

  const isRecommended = quote.status === 'recommended'
  const isSelected = quote.status === 'selected'

  return (
    <div className="group relative px-5 py-5 transition-colors hover:bg-ink/[0.018] sm:px-6">
      {/* Status rail */}
      <div
        className={[
          'absolute bottom-5 left-0 top-5 w-[2px] rounded-r-full',
          isRecommended || isSelected
            ? 'bg-[#12613E]/55'
            : 'bg-[#B85C12]/40',
        ].join(' ')}
      />

      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        {/* Quote identity */}
        <div className="flex min-w-0 items-start gap-3.5">
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-[15px] border border-ink/[0.06] bg-ink/[0.035] transition-all group-hover:bg-ink/[0.055]">
            <Package className="h-4 w-4 text-ink/50" />

            <span
              className={[
                'absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full ring-2 ring-white',
                isRecommended || isSelected
                  ? 'bg-[#12613E]'
                  : 'bg-[#B85C12]',
              ].join(' ')}
            />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-mono text-[11px] font-semibold tracking-[-0.01em] text-ink">
                {quote.id}
              </p>

              <Badge tone={config.tone}>
                <span className="inline-flex items-center gap-1.5">
                  <StatusIcon className="h-3 w-3" />
                  {config.label}
                </span>
              </Badge>
            </div>

            <p className="mt-1.5 text-[14px] font-semibold tracking-[-0.01em] text-ink">
              {quote.supplierName}
            </p>

            <p className="mt-1 text-[11px] leading-5 text-ink/45">
              {quote.itemSummary}
            </p>

            <div className="mt-1 flex flex-wrap items-center gap-x-2 text-[10px] text-ink/30">
              <span>{quote.requestId}</span>

              <span className="h-1 w-1 rounded-full bg-ink/15" />

              <span>{quote.projectName}</span>
            </div>
          </div>
        </div>

        {/* Commercial terms */}
        <div className="grid grid-cols-2 gap-x-5 gap-y-4 sm:grid-cols-3 xl:flex xl:items-center xl:gap-7">
          <Info
            label="Quoted amount"
            value={formatCurrency(quote.amount)}
            emphasis
          />

          <Info
            label="Delivery"
            value={`${quote.deliveryDays} days`}
          />

          <Info
            label="Valid until"
            value={quote.validUntil}
          />

          <button
            type="button"
            aria-label={`View quotation ${quote.id}`}
            className="col-span-2 flex h-9 w-9 items-center justify-center rounded-full border border-ink/[0.07] text-ink/30 transition-all hover:border-ink/15 hover:bg-ink/[0.04] hover:text-ink sm:col-span-1"
          >
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>

      {/* Notes */}
      {quote.notes && (
        <div className="mt-5 rounded-[15px] border border-ink/[0.05] bg-ink/[0.025] px-4 py-3">
          <div className="flex items-start gap-2.5">
            <FileText className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink/25" />

            <p className="text-[11px] leading-5 text-ink/45">
              {quote.notes}
            </p>
          </div>
        </div>
      )}

      {/* Recommendation action */}
      {isRecommended && (
        <div className="mt-5 flex flex-col gap-3 rounded-[16px] border border-[#12613E]/10 bg-[#EAF4EE]/45 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#12613E]/10 text-[#12613E]">
              <Star className="h-3.5 w-3.5" />
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#12613E]/65">
                Recommended supplier
              </p>

              <p className="mt-1 text-[11px] leading-5 text-ink/45">
                This quotation is currently marked as the preferred option
                for the request.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="group inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-ink px-3.5 py-2 text-[10px] font-semibold text-white shadow-[0_6px_16px_rgba(20,40,30,0.10)] transition-all hover:-translate-y-0.5 hover:shadow-[0_9px_20px_rgba(20,40,30,0.14)]"
          >
            Select supplier
            <ArrowRight className="h-3 w-3 opacity-60 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      )}
    </div>
  )
}

function QuotationComparison({
  quotes,
}: {
  quotes: Quotation[]
}) {
  const lowestQuote = Math.min(...quotes.map((quote) => quote.amount))
  const fastestDelivery = Math.min(
    ...quotes.map((quote) => quote.deliveryDays),
  )

  return (
    <Card className="overflow-hidden">
      <CardHeader
        title="Quotation comparison"
        subtitle="Compare price and delivery terms before selecting a supplier."
        action={
          <div className="flex items-center gap-2">
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.1em] text-ink/30 sm:inline">
              Commercial view
            </span>

            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink/[0.04]">
              <TrendingDown className="h-3.5 w-3.5 text-ink/40" />
            </span>
          </div>
        }
      />

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse">
          <thead>
            <tr className="border-b border-line bg-ink/[0.018]">
              <th className="px-6 py-3.5 text-left text-[9px] font-semibold uppercase tracking-[0.12em] text-ink/30">
                Supplier
              </th>

              <th className="px-4 py-3.5 text-right text-[9px] font-semibold uppercase tracking-[0.12em] text-ink/30">
                Quote
              </th>

              <th className="px-4 py-3.5 text-right text-[9px] font-semibold uppercase tracking-[0.12em] text-ink/30">
                Delivery
              </th>

              <th className="px-4 py-3.5 text-right text-[9px] font-semibold uppercase tracking-[0.12em] text-ink/30">
                Valid until
              </th>

              <th className="px-6 py-3.5 text-right text-[9px] font-semibold uppercase tracking-[0.12em] text-ink/30">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {quotes.map((quote) => {
              const isLowest = quote.amount === lowestQuote
              const isFastest = quote.deliveryDays === fastestDelivery
              const isRecommended = quote.status === 'recommended'

              return (
                <tr
                  key={quote.id}
                  className={[
                    'border-b border-line last:border-0 transition-colors hover:bg-ink/[0.018]',
                    isRecommended ? 'bg-[#EAF4EE]/25' : '',
                  ].join(' ')}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={[
                          'flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px]',
                          isRecommended
                            ? 'bg-[#EAF4EE] text-[#12613E]'
                            : 'bg-ink/[0.045] text-ink/40',
                        ].join(' ')}
                      >
                        {isRecommended ? (
                          <Star className="h-3.5 w-3.5" />
                        ) : (
                          <Package className="h-3.5 w-3.5" />
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-[11px] font-semibold text-ink">
                          {quote.supplierName}
                        </p>

                        <p className="mt-0.5 font-mono text-[9px] text-ink/30">
                          {quote.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-right">
                    <p className="text-[11px] font-semibold text-ink">
                      {formatCurrency(quote.amount)}
                    </p>

                    {isLowest && (
                      <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-[#EAF4EE] px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.08em] text-[#12613E]">
                        <TrendingDown className="h-2.5 w-2.5" />
                        Lowest
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-4 text-right">
                    <p className="text-[11px] font-medium text-ink">
                      {quote.deliveryDays} days
                    </p>

                    {isFastest && (
                      <span className="mt-1 inline-flex items-center gap-1 text-[8px] font-semibold uppercase tracking-[0.08em] text-[#12613E]">
                        <Zap className="h-2.5 w-2.5" />
                        Fastest
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-4 text-right text-[11px] text-ink/50">
                    {quote.validUntil}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <Badge tone={statusConfig[quote.status].tone}>
                      {statusConfig[quote.status].label}
                    </Badge>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="border-t border-line bg-ink/[0.018] px-6 py-3.5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[10px] text-ink/35">
            Comparison is based on quoted amount and stated delivery
            commitment.
          </p>

          <span className="text-[9px] font-semibold uppercase tracking-[0.1em] text-ink/25">
            {quotes.length} supplier options
          </span>
        </div>
      </div>
    </Card>
  )
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  description,
  accent,
}: {
  icon: ComponentType<{ className?: string }>
  label: string
  value: number | string
  description: string
  accent: 'neutral' | 'amber' | 'teal'
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
        <div className="flex items-start justify-between gap-4">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-[12px] ${styles.icon}`}
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

          <p className="mt-1 text-[21px] font-semibold tracking-[-0.03em] text-ink">
            {typeof value === 'number'
              ? value.toString().padStart(2, '0')
              : value}
          </p>

          <p className="mt-1 text-[11px] text-ink/40">
            {description}
          </p>
        </div>
      </div>
    </Card>
  )
}

function OverviewMetric({
  label,
  value,
}: {
  label: string
  value: number | string
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-[14px] border border-white/[0.06] bg-white/[0.035] px-4 py-3.5">
      <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-white/35">
        {label}
      </span>

      <span className="text-sm font-semibold tracking-[-0.01em] text-white/85">
        {typeof value === 'number'
          ? value.toString().padStart(2, '0')
          : value}
      </span>
    </div>
  )
}

function SpotlightMetric({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="rounded-[13px] border border-[#12613E]/10 bg-white/65 px-3.5 py-3">
      <p className="text-[8px] font-semibold uppercase tracking-[0.1em] text-ink/30">
        {label}
      </p>

      <p className="mt-1 text-[11px] font-semibold text-ink">
        {value}
      </p>
    </div>
  )
}

function Info({
  label,
  value,
  emphasis = false,
}: {
  label: string
  value: string
  emphasis?: boolean
}) {
  return (
    <div className="min-w-0">
      <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-ink/30">
        {label}
      </p>

      <p
        className={[
          'mt-1 max-w-[155px] truncate text-[11px]',
          emphasis
            ? 'font-semibold text-ink'
            : 'font-medium text-ink/70',
        ].join(' ')}
      >
        {value}
      </p>
    </div>
  )
}

function EmptyQuotations() {
  return (
    <div className="px-6 py-14 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[16px] border border-ink/[0.07] bg-ink/[0.025]">
        <FileText className="h-5 w-5 text-ink/25" />
      </div>

      <p className="mt-4 text-sm font-semibold text-ink">
        No quotations found
      </p>

      <p className="mx-auto mt-1.5 max-w-sm text-[11px] leading-5 text-ink/40">
        Supplier quotations for this request will appear here once submitted.
      </p>
    </div>
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