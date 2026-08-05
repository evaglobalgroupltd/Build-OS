import { Mail, FileText, FolderCheck, Wallet } from 'lucide-react'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { StatCard } from '@/components/ui/StatCard'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { useAuth } from '@/context/AuthContext'

const invitations = [
  { id: 1, project: 'Abuja Terrace (3 Units)', service: 'Structural Engineering Review', status: 'New' },
  { id: 2, project: 'Lekki 4-Bedroom Duplex', service: 'Interior Design Consultation', status: 'Proposal sent' },
]

export function ProfessionalDashboard() {
  const { user } = useAuth()

  return (
    <DashboardLayout title="Overview">
      <p className="mb-6 text-sm text-ink/50">Welcome back, {user.fullName.split(' ')[0]}.</p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Service invitations" value="2" icon={Mail} tone="amber" />
        <StatCard label="Proposals sent" value="1" icon={FileText} tone="ink" />
        <StatCard label="Deliverables due" value="1" icon={FolderCheck} tone="teal" />
        <StatCard label="Payments this month" value="₦450K" icon={Wallet} tone="teal" />
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader title="Service invitations" />
          <CardBody className="space-y-3">
            {invitations.map((i) => (
              <div key={i.id} className="flex items-center justify-between rounded-md border border-line p-3">
                <div>
                  <p className="text-sm font-medium text-ink">{i.service}</p>
                  <p className="mt-0.5 text-xs text-ink/50">{i.project}</p>
                </div>
                <Badge tone={i.status === 'New' ? 'amber' : 'neutral'}>{i.status}</Badge>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  )
}
