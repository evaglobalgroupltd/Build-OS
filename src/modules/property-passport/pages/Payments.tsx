import {
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  FileCheck2,
  FileText,
  ShieldCheck,
  Wallet,
} from 'lucide-react'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'

/**
 * Payments — Digital Property Passport module
 * BRD reference: Sec. 20.4
 *
 * Full payment record for the property, retained as part of the
 * Digital Property Passport.
 *
 * TODO:
 * - Replace static data with API-backed payment records.
 * - Add payment detail view.
 * - Add receipt/document preview and download.
 * - Link payments to the relevant project financial records.
 * - Add transaction history once the backend payment model is defined.
 */

type PaymentStatus = 'Paid' | 'Pending'

const payments = [
  {
    id: 'PAY-001',
    description: 'Initial Project Payment',
    reference: 'PAY-2026-001',
    amount: '₦5,000,000',
    date: '05 May 2026',
    status: 'Paid' as PaymentStatus,
    document: 'payment-receipt-001.pdf',
  },
  {
    id: 'PAY-002',
    description: 'Project Milestone Payment',
    reference: 'PAY-2026-002',
    amount: '₦7,500,000',
    date: '30 Jun 2026',
    status: 'Paid' as PaymentStatus,
    document: 'payment-receipt-002.pdf',
  },
  {
    id: 'PAY-003',
    description: 'Final Project Payment',
    reference: 'PAY-2026-003',
    amount: '₦2,500,000',
    date: '29 Aug 2026',
    status: 'Pending' as PaymentStatus,
    document: null,
  },
]

export function Payments() {
  const paidPayments = payments.filter(
    (payment) => payment.status === 'Paid',
  )

  const pendingPayments = payments.filter(
    (payment) => payment.status === 'Pending',
  )

  return (
    <div className="space-y-6">
      <Card>
        <div className="border-b border-line bg-paper-2 px-6 py-6 sm:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink/5">
                  <Wallet className="h-4 w-4 text-ink/55" />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/40">
                    Digital Property Passport
                  </p>

                  <h1 className="mt-0.5 font-display text-2xl font-semibold tracking-tight text-ink">
                    Payments
                  </h1>
                </div>
              </div>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/50">
                Full payment record for the property, retained as part of the
                project's permanent Digital Property Passport.
              </p>
            </div>

            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-700">
              <ShieldCheck className="h-3.5 w-3.5" />
              Passport record
            </span>
          </div>
        </div>

        <CardBody>
          <div className="grid gap-4 sm:grid-cols-3">
            <SummaryMetric
              icon={CreditCard}
              label="Transactions"
              value={payments.length.toString()}
              description="Recorded payment entries"
            />

            <SummaryMetric
              icon={CheckCircle2}
              label="Paid"
              value={paidPayments.length.toString()}
              description="Completed payments"
            />

            <SummaryMetric
              icon={Wallet}
              label="Pending"
              value={pendingPayments.length.toString()}
              description="Payments awaiting completion"
            />
          </div>
        </CardBody>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader
          title="Payment history"
          subtitle="Payment records retained in the Digital Property Passport"
        />

        <div className="divide-y divide-line">
          {payments.map((payment) => (
            <div
              key={payment.id}
              className="px-6 py-5 transition-colors hover:bg-ink/[0.02]"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex min-w-0 items-start gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      payment.status === 'Paid'
                        ? 'bg-emerald-500/10'
                        : 'bg-amber-500/10'
                    }`}
                  >
                    {payment.status === 'Paid' ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <CreditCard className="h-4 w-4 text-amber-600" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-sm font-semibold text-ink">
                        {payment.description}
                      </h2>

                      <span
                        className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
                          payment.status === 'Paid'
                            ? 'bg-emerald-500/10 text-emerald-700'
                            : 'bg-amber-500/10 text-amber-700'
                        }`}
                      >
                        {payment.status}
                      </span>
                    </div>

                    <p className="mt-1 text-xs text-ink/40">
                      {payment.id} · {payment.reference}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 flex-wrap items-center gap-5">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                      Amount
                    </p>

                    <p className="mt-1 text-sm font-semibold text-ink">
                      {payment.amount}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                      Date
                    </p>

                    <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-ink/60">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {payment.date}
                    </p>
                  </div>

                  {payment.document ? (
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-white px-3 py-2 text-xs font-semibold text-ink transition-colors hover:bg-ink/[0.03]"
                    >
                      <FileText className="h-3.5 w-3.5" />
                      Receipt
                    </button>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-xl border border-dashed border-line px-3 py-2 text-xs font-medium text-ink/35">
                      No receipt
                    </span>
                  )}

                  <ChevronRight className="hidden h-4 w-4 text-ink/25 sm:block" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader
            title="Payment records"
            subtitle="Financial records associated with the property"
          />

          <CardBody>
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink/5">
                <CreditCard className="h-4 w-4 text-ink/55" />
              </div>

              <p className="text-xs leading-5 text-ink/50">
                Payment entries should remain linked to the relevant project
                and property record, providing a complete financial history
                within the Digital Property Passport.
              </p>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Supporting documents"
            subtitle="Receipts and payment documentation"
          />

          <CardBody>
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink/5">
                <FileCheck2 className="h-4 w-4 text-ink/55" />
              </div>

              <p className="text-xs leading-5 text-ink/50">
                Payment receipts and supporting records should remain available
                alongside their corresponding transactions in the permanent
                property archive.
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

function SummaryMetric({
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
    <div className="rounded-2xl border border-line bg-paper-2 px-5 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink/5">
          <Icon className="h-4 w-4 text-ink/50" />
        </div>

        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
            {label}
          </p>

          <p className="mt-0.5 truncate font-display text-xl font-semibold text-ink">
            {value}
          </p>
        </div>
      </div>

      <p className="mt-3 text-xs text-ink/40">{description}</p>
    </div>
  )
}