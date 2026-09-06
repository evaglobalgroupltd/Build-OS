import { useMemo, useState } from 'react'
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  Package,
  Plus,
  ShieldCheck,
  Star,
  TrendingDown,
} from 'lucide-react'

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/35">
            Procurement
          </p>

          <h1 className="mt-1 text-xl font-semibold text-ink">
            Quotations
          </h1>

          <p className="mt-1 max-w-2xl text-xs leading-5 text-ink/45">
            Review supplier quotations, compare pricing and delivery terms,
            and select the preferred supplier.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
        >
          <Plus className="h-3.5 w-3.5" />
          Request quotation
        </button>
      </div>

      {/* Summary */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          icon={Clock3}
          label="Awaiting review"
          value={receivedCount}
          description="Quotes requiring review"
        />

        <SummaryCard
          icon={Star}
          label="Recommended"
          value={recommendedCount}
          description="Preferred supplier quotes"
        />

        <SummaryCard
          icon={CheckCircle2}
          label="Selected"
          value={selectedCount}
          description="Supplier selections"
        />

        <SummaryCard
          icon={TrendingDown}
          label="Quoted value"
          value={formatCurrency(totalQuotedValue)}
          description="Combined quotation value"
        />
      </div>

      {/* Request filter */}
      <Card>
        <CardBody>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold text-ink">
                Compare quotations by request
              </p>

              <p className="mt-1 text-[11px] text-ink/40">
                Select a material request to compare supplier offers.
              </p>
            </div>

            <select
              value={selectedRequest}
              onChange={(event) => setSelectedRequest(event.target.value)}
              className="rounded-xl border border-line bg-white px-3 py-2.5 text-xs text-ink outline-none focus:border-ink/30 focus:ring-2 focus:ring-ink/5"
            >
              <option value="all">All requests</option>

              {requestIds.map((requestId) => (
                <option key={requestId} value={requestId}>
                  {requestId}
                </option>
              ))}
            </select>
          </div>
        </CardBody>
      </Card>

      {/* Quotations */}
      <Card className="overflow-hidden">
        <CardHeader
          title="Supplier quotations"
          subtitle="Quotes received against active material requests."
          action={
            <Badge tone="amber">
              {filteredQuotes.length}{' '}
              {filteredQuotes.length === 1 ? 'quote' : 'quotes'}
            </Badge>
          }
        />

        <div className="divide-y divide-line">
          {filteredQuotes.map((quote) => (
            <QuotationRow key={quote.id} quote={quote} />
          ))}

          {filteredQuotes.length === 0 && (
            <div className="px-6 py-10 text-center">
              <FileText className="mx-auto h-5 w-5 text-ink/25" />

              <p className="mt-3 text-sm font-medium text-ink">
                No quotations found
              </p>

              <p className="mt-1 text-xs text-ink/40">
                Supplier quotations for this request will appear here.
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Comparison */}
      {selectedRequest !== 'all' && filteredQuotes.length > 0 && (
        <QuotationComparison quotes={filteredQuotes} />
      )}
    </div>
  )
}

function QuotationRow({
  quote,
}: {
  quote: Quotation
}) {
  const config = statusConfig[quote.status]
  const StatusIcon = config.icon

  return (
    <div className="px-6 py-5 transition-colors hover:bg-ink/[0.02]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Quote identity */}
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink/5">
            <Package className="h-4 w-4 text-ink/50" />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-mono text-xs font-semibold text-ink">
                {quote.id}
              </p>

              <Badge tone={config.tone}>
                <span className="inline-flex items-center gap-1.5">
                  <StatusIcon className="h-3 w-3" />
                  {config.label}
                </span>
              </Badge>
            </div>

            <p className="mt-1 text-sm font-semibold text-ink">
              {quote.supplierName}
            </p>

            <p className="mt-0.5 text-xs text-ink/40">
              {quote.itemSummary}
            </p>

            <p className="mt-1 text-[10px] text-ink/30">
              Request {quote.requestId} · {quote.projectName}
            </p>
          </div>
        </div>

        {/* Quote terms */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3 lg:flex lg:items-center">
          <Info
            label="Quoted amount"
            value={formatCurrency(quote.amount)}
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
            className="col-span-2 flex h-8 w-8 items-center justify-center rounded-lg text-ink/30 transition-colors hover:bg-ink/5 hover:text-ink sm:col-span-1"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {quote.notes && (
        <div className="mt-4 rounded-xl bg-ink/[0.025] px-4 py-3">
          <p className="text-[11px] leading-4 text-ink/45">
            {quote.notes}
          </p>
        </div>
      )}

      {quote.status === 'recommended' && (
        <div className="mt-4 flex flex-col gap-3 rounded-xl bg-teal-500/5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-2.5">
            <Star className="mt-0.5 h-4 w-4 shrink-0 text-teal-700" />

            <div>
              <p className="text-xs font-semibold text-ink">
                Recommended supplier
              </p>

              <p className="mt-0.5 text-[11px] leading-4 text-ink/45">
                This quotation is currently marked as the preferred option
                for the request.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-ink px-3 py-2 text-[11px] font-semibold text-white hover:opacity-90"
          >
            Select supplier
            <ArrowRight className="h-3 w-3" />
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
      />

      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] border-collapse">
          <thead>
            <tr className="border-b border-line bg-ink/[0.02]">
              <th className="px-6 py-3 text-left text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                Supplier
              </th>

              <th className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                Quote
              </th>

              <th className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                Delivery
              </th>

              <th className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                Valid until
              </th>

              <th className="px-6 py-3 text-right text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {quotes.map((quote) => {
              const isLowest = quote.amount === lowestQuote
              const isFastest = quote.deliveryDays === fastestDelivery

              return (
                <tr
                  key={quote.id}
                  className="border-b border-line last:border-0"
                >
                  <td className="px-6 py-4">
                    <p className="text-xs font-semibold text-ink">
                      {quote.supplierName}
                    </p>

                    <p className="mt-0.5 font-mono text-[10px] text-ink/30">
                      {quote.id}
                    </p>
                  </td>

                  <td className="px-4 py-4 text-right">
                    <p className="text-xs font-semibold text-ink">
                      {formatCurrency(quote.amount)}
                    </p>

                    {isLowest && (
                      <span className="mt-1 inline-flex items-center gap-1 text-[9px] font-semibold text-teal-700">
                        <TrendingDown className="h-2.5 w-2.5" />
                        Lowest
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-4 text-right">
                    <p className="text-xs font-medium text-ink">
                      {quote.deliveryDays} days
                    </p>

                    {isFastest && (
                      <span className="mt-1 text-[9px] font-semibold text-teal-700">
                        Fastest
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-4 text-right text-xs text-ink/50">
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
    </Card>
  )
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: number | string
  description: string
}) {
  return (
    <Card>
      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5">
            <Icon className="h-4 w-4 text-ink/50" />
          </div>

          <p className="text-xl font-semibold text-ink">{value}</p>
        </div>

        <p className="mt-4 text-[10px] font-semibold uppercase tracking-wide text-ink/35">
          {label}
        </p>

        <p className="mt-1 text-xs text-ink/40">{description}</p>
      </div>
    </Card>
  )
}

function Info({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="min-w-0">
      <p className="text-[9px] font-semibold uppercase tracking-wide text-ink/30">
        {label}
      </p>

      <p className="mt-1 max-w-[150px] truncate text-xs font-medium text-ink">
        {value}
      </p>
    </div>
  )
}

function formatCurrency(amount: number) {
  return `₦${amount.toLocaleString('en-NG')}`
}