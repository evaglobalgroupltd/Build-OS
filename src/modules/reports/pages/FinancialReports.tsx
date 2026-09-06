import {
  ArrowDownCircle,
  ArrowUpCircle,
  Download,
  Landmark,
  Receipt,
  Wallet,
  AlertTriangle,
  TrendingUp,
  Banknote,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'

const financialSummary = [
  {
    label: 'Escrow Balance',
    value: '₦2.84B',
    icon: Wallet,
  },
  {
    label: 'Funds Released',
    value: '₦1.26B',
    icon: ArrowUpCircle,
  },
  {
    label: 'Procurement Spend',
    value: '₦847M',
    icon: Receipt,
  },
  {
    label: 'Refunds',
    value: '₦42M',
    icon: ArrowDownCircle,
  },
]

const walletBreakdown = [
  {
    wallet: 'Material Wallet',
    amount: '₦940M',
  },
  {
    wallet: 'Labour Wallet',
    amount: '₦620M',
  },
  {
    wallet: 'Professional Wallet',
    amount: '₦180M',
  },
  {
    wallet: 'Monitoring Wallet',
    amount: '₦74M',
  },
  {
    wallet: 'Contingency Wallet',
    amount: '₦95M',
  },
]

const recentTransactions = [
  {
    reference: 'ESC-2026-00014',
    description: 'Foundation milestone payment',
    amount: '₦12,500,000',
    status: 'Released',
    date: '24 Aug 2026',
  },
  {
    reference: 'ESC-2026-00013',
    description: 'Material procurement reservation',
    amount: '₦8,200,000',
    status: 'Reserved',
    date: '24 Aug 2026',
  },
  {
    reference: 'ESC-2026-00012',
    description: 'Supplier delivery payment',
    amount: '₦4,850,000',
    status: 'Released',
    date: '23 Aug 2026',
  },
  {
    reference: 'ESC-2026-00011',
    description: 'Disputed payment',
    amount: '₦2,300,000',
    status: 'Frozen',
    date: '22 Aug 2026',
  },
]

export function FinancialReports() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader
          title="Financial Reports"
          subtitle="Escrow, budgets, procurement spending, releases, refunds and reconciliation"
        />

        <CardBody>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2 text-sm font-medium text-white"
          >
            <Download className="h-4 w-4" />
            Export Financial Report
          </button>
        </CardBody>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {financialSummary.map((item) => {
          const Icon = item.icon

          return (
            <Card key={item.label}>
              <CardBody>
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-ink/5 p-3">
                    <Icon className="h-5 w-5 text-ink/60" />
                  </div>

                  <div>
                    <p className="text-xs text-ink/45">
                      {item.label}
                    </p>

                    <h3 className="text-2xl font-semibold text-ink">
                      {item.value}
                    </h3>
                  </div>
                </div>
              </CardBody>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <Card>
            <CardHeader
              title="Recent Financial Activity"
              subtitle="Escrow releases, reservations, refunds and payment actions"
            />

            <CardBody>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div
                    key={transaction.reference}
                    className="flex flex-col gap-3 rounded-xl border border-line p-4 lg:flex-row lg:items-center lg:justify-between"
                  >
                    <div>
                      <h3 className="font-medium text-ink">
                        {transaction.description}
                      </h3>

                      <p className="mt-1 text-xs text-ink/45">
                        {transaction.reference}
                      </p>
                    </div>

                    <div className="flex items-center gap-6">
                      <span className="font-semibold text-ink">
                        {transaction.amount}
                      </span>

                      <span className="rounded-full bg-paper-2 px-3 py-1 text-xs font-medium">
                        {transaction.status}
                      </span>

                      <span className="text-xs text-ink/45">
                        {transaction.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        <Card>
          <CardHeader
            title="Wallet Allocation"
            subtitle="Escrow wallet balances"
          />

          <CardBody>
            <div className="space-y-3">
              {walletBreakdown.map((wallet) => (
                <div
                  key={wallet.wallet}
                  className="flex items-center justify-between rounded-xl bg-paper-2 p-3"
                >
                  <span className="text-sm text-ink/60">
                    {wallet.wallet}
                  </span>

                  <span className="font-semibold text-ink">
                    {wallet.amount}
                  </span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader
            title="Budget Performance"
            subtitle="Project financial efficiency"
          />

          <CardBody>
            <div className="space-y-3">
              <FinancialMetric
                icon={TrendingUp}
                label="Budget Utilization"
                value="81%"
              />

              <FinancialMetric
                icon={Banknote}
                label="Approved Spend"
                value="₦1.41B"
              />

              <FinancialMetric
                icon={Receipt}
                label="Procurement Cost"
                value="₦847M"
              />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Escrow Controls"
            subtitle="Governance and payment oversight"
          />

          <CardBody>
            <div className="space-y-3">
              <FinancialMetric
                icon={Wallet}
                label="Pending Releases"
                value="₦92M"
              />

              <FinancialMetric
                icon={AlertTriangle}
                label="Frozen Payments"
                value="₦17M"
              />

              <FinancialMetric
                icon={ArrowDownCircle}
                label="Refund Queue"
                value="₦8M"
              />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Financial Reconciliation"
            subtitle="Platform financial health"
          />

          <CardBody>
            <div className="space-y-3">
              <FinancialMetric
                icon={Landmark}
                label="Reconciled Transactions"
                value="99.4%"
              />

              <FinancialMetric
                icon={Receipt}
                label="Outstanding Reviews"
                value="23"
              />

              <FinancialMetric
                icon={Banknote}
                label="Refund Processed"
                value="₦42M"
              />
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

function FinancialMetric({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-paper-2 p-3">
      <div className="flex items-center gap-3">
        <Icon className="h-4 w-4 text-ink/50" />
        <span className="text-sm text-ink/60">
          {label}
        </span>
      </div>

      <span className="font-semibold text-ink">
        {value}
      </span>
    </div>
  )
}