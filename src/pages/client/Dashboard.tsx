import { Building2, Wallet, ClipboardList, Gavel } from 'lucide-react'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { StatCard } from '@/components/ui/StatCard'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { ProjectCard } from '@/modules/projects/components/ProjectCard'
import { ProjectProgressChart } from '@/components/charts/ProjectProgressChart'
import { SkeletonCard } from '@/components/feedback/Skeleton'
import { useMockLoading } from '@/hooks/useMockLoading'
import { projects, disputes } from '@/data/mockData'
import { useAuth } from '@/context/AuthContext'

export function ClientDashboard() {
  const { user } = useAuth()

  const { data, isLoading } = useMockLoading(() => {
    const myProjects = projects.filter((p) => p.clientName === user.fullName)
    return {
      myProjects,
      totalEscrow: myProjects.reduce((sum, p) => sum + p.escrowBalance, 0),
      pendingApprovals: myProjects.reduce((sum, p) => sum + p.pendingApprovals, 0),
    }
  })

  return (
    <DashboardLayout title="Overview">
      <div className="mb-6">
        <p className="text-sm text-ink/50">Welcome back, {user.fullName.split(' ')[0]}.</p>
      </div>

      {isLoading || !data ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Active projects" value={String(data.myProjects.length)} icon={Building2} tone="ink" />
            <StatCard
              label="Escrow balance"
              value={`₦${(data.totalEscrow / 1_000_000).toFixed(1)}M`}
              icon={Wallet}
              tone="teal"
              hint="Held securely until milestones clear"
            />
            <StatCard label="Pending approvals" value={String(data.pendingApprovals)} icon={ClipboardList} tone="amber" />
            <StatCard label="Open disputes" value={String(disputes.length)} icon={Gavel} tone="brick" />
          </div>

          {data.myProjects.length > 0 && (
            <Card className="mt-6">
              <CardHeader title="Progress across your projects" />
              <CardBody>
                <ProjectProgressChart
                  data={data.myProjects.map((p) => ({ name: p.name, progressPercent: p.progressPercent }))}
                />
              </CardBody>
            </Card>
          )}

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader title="Your projects" subtitle="Status across all active builds" />
              <CardBody className="space-y-4">
                {data.myProjects.map((p) => (
                  <ProjectCard key={p.id} project={p} />
                ))}
              </CardBody>
            </Card>

            <Card>
              <CardHeader title="Open disputes" subtitle="Requiring your input" />
              <CardBody className="space-y-3">
                {disputes.length === 0 && <p className="text-sm text-ink/50">No open disputes.</p>}
                {disputes.map((d) => (
                  <div key={d.id} className="rounded-md border border-brick/20 bg-brick-light p-3">
                    <p className="text-xs font-semibold text-brick">{d.category}</p>
                    <p className="mt-1 text-xs text-ink/60">
                      vs {d.respondent} · ₦{(d.amount / 1_000_000).toFixed(2)}M
                    </p>
                    <p className="mt-1 font-mono text-[10px] uppercase text-ink/40">{d.status.replace('_', ' ')}</p>
                  </div>
                ))}
              </CardBody>
            </Card>
          </div>
        </>
      )}
    </DashboardLayout>
  )
}
