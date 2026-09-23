import {
  ArrowUpRight,
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

  const totalPaid = paidPayments.reduce(
    (total, payment) => total + parseAmount(payment.amount),
    0,
  )

  const totalPending = pendingPayments.reduce(
    (total, payment) => total + parseAmount(payment.amount),
    0,
  )

  const totalValue = totalPaid + totalPending

  const paidPercentage =
    totalValue > 0 ? Math.round((totalPaid / totalValue) * 100) : 0

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------------ */}
      {/* Page header                                                         */}
      {/* ------------------------------------------------------------------ */}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#1657FF]" />

            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1657FF]">
              Digital Property Passport
            </p>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <h1 className="font-display text-3xl font-semibold tracking-[-0.035em] text-ink sm:text-4xl">
              Payments
            </h1>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/15 bg-emerald-500/[0.06] px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
              <ShieldCheck className="h-3 w-3" />
              Passport record
            </span>
          </div>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/45">
            A complete financial record of payments associated with the
            property, retained within its permanent Digital Property Passport.
          </p>
        </div>

        <div className="flex w-fit items-center gap-2 rounded-full border border-line bg-white px-3.5 py-2 text-xs font-semibold text-ink shadow-[0_8px_24px_rgba(11,18,32,0.04)]">
          <Wallet className="h-3.5 w-3.5 text-[#1657FF]" />
          {payments.length} transactions
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Financial overview                                                  */}
      {/* ------------------------------------------------------------------ */}

      <Card className="relative overflow-hidden border-0 bg-[#0B1220] text-white shadow-[0_18px_50px_rgba(11,18,32,0.14)]">
        <div className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full bg-[#1657FF]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-[#34A6FF]/10 blur-3xl" />

        <CardBody className="relative p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.07]">
                  <Wallet className="h-4 w-4 text-[#6FA3FF]" />
                </div>

                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/35">
                    Property financial record
                  </p>

                  <p className="mt-0.5 text-sm font-semibold text-white/80">
                    Payment position
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-end gap-x-5 gap-y-2">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/30">
                    Total recorded
                  </p>

                  <p className="mt-1 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    {formatNaira(totalValue)}
                  </p>
                </div>

                <div className="mb-1 h-8 w-px bg-white/10" />

                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/30">
                    Paid
                  </p>

                  <p className="mt-1 text-sm font-semibold text-emerald-300">
                    {formatNaira(totalPaid)}
                  </p>
                </div>

                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/30">
                    Pending
                  </p>

                  <p className="mt-1 text-sm font-semibold text-amber-300">
                    {formatNaira(totalPending)}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/15 bg-emerald-400/10 px-3 py-1.5 text-[10px] font-semibold text-emerald-300">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {paidPayments.length} paid
                </span>

                {pendingPayments.length > 0 && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/15 bg-amber-400/10 px-3 py-1.5 text-[10px] font-semibold text-amber-300">
                    <CreditCard className="h-3.5 w-3.5" />
                    {pendingPayments.length} pending
                  </span>
                )}
              </div>
            </div>

            <div className="flex shrink-0 flex-col items-center justify-center">
              <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-white/10 bg-white/[0.035]">
                <div
                  className="absolute inset-2 rounded-full"
                  style={{
                    background: `conic-gradient(#34A6FF ${paidPercentage}%, rgba(255,255,255,0.08) ${paidPercentage}% 100%)`,
                  }}
                />

                <div className="relative flex h-[104px] w-[104px] flex-col items-center justify-center rounded-full bg-[#0B1220]">
                  <span className="font-display text-3xl font-semibold tracking-tight text-white">
                    {paidPercentage}%
                  </span>

                  <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/35">
                    Paid
                  </span>
                </div>
              </div>

              <p className="mt-3 text-[10px] font-medium text-white/30">
                Recorded payment position
              </p>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* Summary metrics                                                     */}
      {/* ------------------------------------------------------------------ */}

      <div className="grid gap-3 sm:grid-cols-3">
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
          description={formatNaira(totalPaid)}
          accent="green"
        />

        <SummaryMetric
          icon={Wallet}
          label="Pending"
          value={pendingPayments.length.toString()}
          description={formatNaira(totalPending)}
          accent="amber"
        />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Payment history                                                     */}
      {/* ------------------------------------------------------------------ */}

      <Card className="overflow-hidden">
        <CardHeader
          title="Payment history"
          subtitle="Financial transactions retained in the Digital Property Passport"
        />

        <div className="divide-y divide-line">
          {payments.map((payment, index) => (
            <div
              key={payment.id}
              className="group relative px-5 py-5 transition-colors hover:bg-[#1657FF]/[0.018] sm:px-6"
            >
              <div
                className={`absolute inset-y-0 left-0 w-0.5 ${
                  payment.status === 'Paid'
                    ? 'bg-emerald-500/70'
                    : 'bg-amber-500/70'
                }`}
              />

              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex min-w-0 items-start gap-3.5">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-semibold ${
                      payment.status === 'Paid'
                        ? 'bg-emerald-500/[0.07] text-emerald-700'
                        : 'bg-amber-500/[0.07] text-amber-700'
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <div className="flex min-w-0 items-start gap-3">
                    <div
                      className={`hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl border sm:flex ${
                        payment.status === 'Paid'
                          ? 'border-emerald-500/10 bg-emerald-500/[0.035]'
                          : 'border-amber-500/10 bg-amber-500/[0.035]'
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

                        <StatusBadge status={payment.status} />
                      </div>

                      <p className="mt-1 text-xs text-ink/40">
                        {payment.id} · {payment.reference}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex shrink-0 flex-wrap items-center gap-4 pl-[54px] sm:pl-0">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-ink/30">
                      Amount
                    </p>

                    <p className="mt-1 font-display text-sm font-semibold tracking-tight text-ink">
                      {payment.amount}
                    </p>
                  </div>

                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-ink/30">
                      Date
                    </p>

                    <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-ink/60">
                      <CalendarDays className="h-3.5 w-3.5 text-ink/30" />
                      {payment.date}
                    </p>
                  </div>

                  {payment.document ? (
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-2 text-xs font-semibold text-ink shadow-[0_5px_18px_rgba(11,18,32,0.035)] transition-all hover:border-[#1657FF]/20 hover:bg-[#1657FF]/[0.035] hover:text-[#1657FF]"
                    >
                      <FileText className="h-3.5 w-3.5" />
                      Receipt
                      <ArrowUpRight className="h-3 w-3 opacity-40" />
                    </button>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-line px-3.5 py-2 text-[10px] font-medium text-ink/35">
                      No receipt
                    </span>
                  )}

                  <ChevronRight className="hidden h-4 w-4 text-ink/20 transition-transform group-hover:translate-x-0.5 group-hover:text-[#1657FF]/50 sm:block" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* Financial records                                                   */}
      {/* ------------------------------------------------------------------ */}

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader
            title="Payment records"
            subtitle="Financial records associated with the property"
          />

          <CardBody>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1657FF]/[0.07]">
                <CreditCard className="h-4 w-4 text-[#1657FF]" />
              </div>

              <div>
                <p className="text-sm font-semibold text-ink">
                  Complete financial history
                </p>

                <p className="mt-1.5 text-xs leading-5 text-ink/45">
                  Payment entries should remain linked to the relevant project
                  and property record, providing a traceable financial history
                  within the Digital Property Passport.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full border border-line bg-paper-2 px-2.5 py-1 text-[10px] font-medium text-ink/50">
                    {payments.length} transactions
                  </span>

                  <span className="rounded-full border border-line bg-paper-2 px-2.5 py-1 text-[10px] font-medium text-ink/50">
                    {formatNaira(totalValue)} recorded
                  </span>
                </div>
              </div>
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
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                <FileCheck2 className="h-4 w-4 text-emerald-600" />
              </div>

              <div>
                <p className="text-sm font-semibold text-ink">
                  Transaction evidence
                </p>

                <p className="mt-1.5 text-xs leading-5 text-ink/45">
                  Payment receipts and supporting records should remain
                  available alongside their corresponding transactions in the
                  permanent property archive.
                </p>

                <div className="mt-4 flex items-center gap-2">
                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                    {paidPayments.length} receipts available
                  </span>

                  {pendingPayments.length > 0 && (
                    <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-[10px] font-semibold text-amber-700">
                      {pendingPayments.length} awaiting
                    </span>
                  )}
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Permanent record notice                                             */}
      {/* ------------------------------------------------------------------ */}

      <div className="rounded-[22px] border border-[#1657FF]/10 bg-[#1657FF]/[0.035] p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#1657FF]/[0.08]">
            <ShieldCheck className="h-4 w-4 text-[#1657FF]" />
          </div>

          <div>
            <p className="text-sm font-semibold text-ink">
              Permanent financial record
            </p>

            <p className="mt-1 text-xs leading-5 text-ink/45">
              Payment history and supporting transaction documentation should
              remain linked to the relevant project and property records
              throughout the project lifecycle.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Shared components                                                          */
/* -------------------------------------------------------------------------- */

function SummaryMetric({
  icon: Icon,
  label,
  value,
  description,
  accent = 'ink',
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  description: string
  accent?: 'blue' | 'green' | 'amber' | 'ink'
}) {
  const accentClasses = {
    blue: 'bg-[#1657FF]/[0.07] text-[#1657FF]',
    green: 'bg-emerald-500/10 text-emerald-600',
    amber: 'bg-amber-500/10 text-amber-600',
    ink: 'bg-ink/5 text-ink/50',
  }

  return (
    <div className="group rounded-[18px] border border-line bg-paper-2 px-5 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_12px_30px_rgba(11,18,32,0.055)]">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${accentClasses[accent]}`}
        >
          <Icon className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-ink/30">
            {label}
          </p>

          <p className="mt-0.5 truncate font-display text-xl font-semibold tracking-tight text-ink">
            {value}
          </p>
        </div>
      </div>

      <p className="mt-3 text-xs text-ink/40">{description}</p>
    </div>
  )
}

function StatusBadge({ status }: { status: PaymentStatus }) {
  const isPaid = status === 'Paid'

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
        isPaid
          ? 'bg-emerald-500/10 text-emerald-700'
          : 'bg-amber-500/10 text-amber-700'
      }`}
    >
      {isPaid ? (
        <CheckCircle2 className="h-3 w-3" />
      ) : (
        <CreditCard className="h-3 w-3" />
      )}

      {status}
    </span>
  )
}

/* -------------------------------------------------------------------------- */
/* Formatting helpers                                                         */
/* -------------------------------------------------------------------------- */

function parseAmount(value: string) {
  return Number(value.replace(/[₦,\s]/g, ''))
}

function formatNaira(value: number) {
  return `₦${value.toLocaleString('en-NG')}`
}