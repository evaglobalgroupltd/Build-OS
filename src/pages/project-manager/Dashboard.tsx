import { Building2, ClipboardCheck, TriangleAlert, ListChecks } from 'lucide-react'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { StatCard } from '@/components/ui/StatCard'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { StagePill } from '@/modules/projects/components/StagePill'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { projects } from '@/data/mockData'
import { useAuth } from '@/context/AuthContext'

export function ProjectManagerDashboard() {
  const { user } = useAuth()

  return (
    <DashboardLayout title="Overview">
      <p className="mb-6 text-sm text-ink/50">Welcome back, {user.fullName.split(' ')[0]}.</p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Assigned projects" value={String(projects.length)} icon={Building2} tone="ink" />
        <StatCard label="Pending inspections" value="2" icon={ClipboardCheck} tone="amber" />
        <StatCard label="Milestones to verify" value="3" icon={ListChecks} tone="teal" />
        <StatCard label="Risk alerts" value="1" icon={TriangleAlert} tone="brick" />
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader title="Assigned projects" subtitle="Verification and monitoring status" />
          <CardBody className="space-y-4">
            {projects.map((p) => (
              <div key={p.id} className="rounded-md border border-line p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-display text-sm font-semibold text-ink">{p.name}</p>
                    <p className="text-xs text-ink/50">{p.location}</p>
                  </div>
                  <StagePill stage={p.stage} />
                </div>
                <div className="mt-3">
                  <ProgressBar percent={p.progressPercent} tone="teal" />
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  )
}
