import { useMemo, useState } from 'react'
import { Users, BadgeCheck, Wallet, Gavel, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'
import { AdminLayout } from '@/layouts/AdminLayout'
import { StatCard } from '@/components/ui/StatCard'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { StagePill } from '@/modules/projects/components/StagePill'
import { Badge } from '@/components/ui/Badge'
import { EscrowTrendChart } from '@/components/charts/EscrowTrendChart'
import { ProjectProgressChart } from '@/components/charts/ProjectProgressChart'
import { projects, disputes, escrowMonthlyTrend } from '@/data/mockData'
import type { Project } from '@/modules/projects/types'

type SortKey = 'name' | 'clientName' | 'escrowBalance' | 'openDisputes'
type SortDirection = 'asc' | 'desc'

const columns: { key: SortKey; label: string }[] = [
  { key: 'name', label: 'Project' },
  { key: 'clientName', label: 'Client' },
  { key: 'escrowBalance', label: 'Escrow' },
  { key: 'openDisputes', label: 'Disputes' },
]

export function AdminDashboard() {
  const totalEscrowVolume = projects.reduce((sum, p) => sum + p.escrowBalance, 0)
  const [sortKey, setSortKey] = useState<SortKey>('name')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

  function toggleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDirection('asc')
    }
  }

  const sortedProjects = useMemo(() => {
    const copy: Project[] = [...projects]
    copy.sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]
      const cmp = typeof aVal === 'number' && typeof bVal === 'number' ? aVal - bVal : String(aVal).localeCompare(String(bVal))
      return sortDirection === 'asc' ? cmp : -cmp
    })
    return copy
  }, [sortKey, sortDirection])

  return (
    <AdminLayout title="Platform Overview">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total users" value="1,204" icon={Users} tone="ink" />
        <StatCard label="Verification queue" value="18" icon={BadgeCheck} tone="amber" />
        <StatCard
          label="Escrow volume"
          value={`₦${(totalEscrowVolume / 1_000_000).toFixed(1)}M`}
          icon={Wallet}
          tone="teal"
        />
        <StatCard label="Open disputes" value={String(disputes.length)} icon={Gavel} tone="brick" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Platform escrow activity" subtitle="Deposits vs. releases, last 6 months" />
          <CardBody>
            <EscrowTrendChart data={escrowMonthlyTrend} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Project progress" subtitle="All active projects" />
          <CardBody>
            <ProjectProgressChart
              data={projects.map((p) => ({ name: p.name, progressPercent: p.progressPercent }))}
            />
          </CardBody>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader title="All active projects" subtitle="Platform-wide monitoring — click a column to sort" />
          <CardBody>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-line text-xs uppercase tracking-wide text-ink/40">
                    {columns.map((col) => (
                      <th key={col.key} className="pb-2 font-medium">
                        <button
                          onClick={() => toggleSort(col.key)}
                          className="flex items-center gap-1 hover:text-ink/70"
                        >
                          {col.label}
                          {sortKey === col.key ? (
                            sortDirection === 'asc' ? (
                              <ArrowUp size={12} />
                            ) : (
                              <ArrowDown size={12} />
                            )
                          ) : (
                            <ArrowUpDown size={12} className="opacity-30" />
                          )}
                        </button>
                      </th>
                    ))}
                    <th className="pb-2 font-medium">Stage</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedProjects.map((p) => (
                    <tr key={p.id} className="border-b border-line/60 last:border-0">
                      <td className="py-3 font-medium text-ink">{p.name}</td>
                      <td className="py-3 text-ink/60">{p.clientName}</td>
                      <td className="py-3 font-mono text-ink/70">
                        ₦{(p.escrowBalance / 1_000_000).toFixed(1)}M
                      </td>
                      <td className="py-3">
                        {p.openDisputes > 0 ? (
                          <Badge tone="brick">{p.openDisputes}</Badge>
                        ) : (
                          <span className="text-ink/30">—</span>
                        )}
                      </td>
                      <td className="py-3">
                        <StagePill stage={p.stage} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </div>
    </AdminLayout>
  )
}
