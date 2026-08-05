import { Wallet as WalletIcon, ArrowDownToLine, ArrowUpFromLine, Lock } from 'lucide-react'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { StatCard } from '@/components/ui/StatCard'
import { Badge } from '@/components/ui/Badge'
import { EscrowTrendChart } from '@/components/charts/EscrowTrendChart'
import { escrowTransactions, escrowMonthlyTrend, projects } from '@/data/mockData'

const typeMeta = {
  deposit: { label: 'Deposit', tone: 'teal', icon: ArrowDownToLine },
  release: { label: 'Release', tone: 'amber', icon: ArrowUpFromLine },
  freeze: { label: 'Frozen', tone: 'brick', icon: Lock },
  refund: { label: 'Refund', tone: 'neutral', icon: ArrowUpFromLine },
} as const

export function Wallet() {
  const totalBalance = projects.reduce((sum, p) => sum + p.escrowBalance, 0)
  const totalDeposited = escrowTransactions
    .filter((t) => t.type === 'deposit')
    .reduce((sum, t) => sum + t.amount, 0)
  const totalReleased = escrowTransactions
    .filter((t) => t.type === 'release')
    .reduce((sum, t) => sum + t.amount, 0)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="Wallet balance"
          value={`₦${(totalBalance / 1_000_000).toFixed(1)}M`}
          icon={WalletIcon}
          tone="teal"
          hint="Held in escrow across all projects"
        />
        <StatCard
          label="Total deposited"
          value={`₦${(totalDeposited / 1_000_000).toFixed(1)}M`}
          icon={ArrowDownToLine}
          tone="ink"
        />
        <StatCard
          label="Total released"
          value={`₦${(totalReleased / 1_000_000).toFixed(1)}M`}
          icon={ArrowUpFromLine}
          tone="amber"
        />
      </div>

      <Card>
        <CardHeader
          title="Escrow activity"
          subtitle="Deposits vs. releases, last 6 months"
          action={
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-ink/50">
                <span className="h-2 w-2 rounded-full bg-teal" /> Deposited
              </span>
              <span className="flex items-center gap-1.5 text-ink/50">
                <span className="h-2 w-2 rounded-full bg-amber" /> Released
              </span>
            </div>
          }
        />
        <CardBody>
          <EscrowTrendChart data={escrowMonthlyTrend} />
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Recent activity" subtitle="Deposits, releases and freezes across your projects" />
        <CardBody className="space-y-3">
          {escrowTransactions.map((t) => {
            const meta = typeMeta[t.type]
            const Icon = meta.icon
            return (
              <div key={t.id} className="flex items-center justify-between rounded-md border border-line p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink/5 text-ink/60">
                    <Icon size={14} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-ink">{t.milestoneLabel}</p>
                    <p className="text-xs text-ink/45">{t.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm text-ink">
                    {t.currency === 'NGN' ? '₦' : '$'}
                    {(t.amount / 1_000_000).toFixed(2)}M
                  </span>
                  <Badge tone={meta.tone}>{meta.label}</Badge>
                </div>
              </div>
            )
          })}
        </CardBody>
      </Card>
    </div>
  )
}
