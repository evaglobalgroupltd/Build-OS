import {
  Activity,
  AlertTriangle,
  BarChart3,
  Briefcase,
  Building2,
  CheckCircle2,
  Clock3,
  Download,
  FolderKanban,
  Scale,
  ShieldCheck,
  Wallet,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'

const portfolioStats = [
  {
    label: 'Active Projects',
    value: '184',
    icon: FolderKanban,
  },
  {
    label: 'Portfolio Value',
    value: '₦8.6B',
    icon: Wallet,
  },
  {
    label: 'Contractors',
    value: '412',
    icon: Briefcase,
  },
  {
    label: 'Suppliers',
    value: '289',
    icon: Building2,
  },
]

const portfolioProjects = [
  {
    name: 'Abuja Smart Estate',
    progress: '78%',
    status: 'On Track',
    budget: '₦520M',
  },
  {
    name: 'Lekki Commercial Plaza',
    progress: '61%',
    status: 'At Risk',
    budget: '₦1.2B',
  },
  {
    name: 'Kano Housing Scheme',
    progress: '92%',
    status: 'Near Completion',
    budget: '₦870M',
  },
  {
    name: 'Port Harcourt Towers',
    progress: '44%',
    status: 'Delayed',
    budget: '₦650M',
  },
]

const managementAlerts = [
  {
    title: 'Projects Behind Schedule',
    value: '12',
    severity: 'High',
  },
  {
    title: 'Pending Approvals',
    value: '47',
    severity: 'Medium',
  },
  {
    title: 'Compliance Reviews',
    value: '19',
    severity: 'Medium',
  },
  {
    title: 'Open Disputes',
    value: '8',
    severity: 'High',
  },
]

export function ManagementReports() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader
          title="Management Reports"
          subtitle="Executive oversight across projects, finances, procurement, compliance and operations"
        />

        <CardBody>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2 text-sm font-medium text-white"
          >
            <Download className="h-4 w-4" />
            Export Management Report
          </button>
        </CardBody>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {portfolioStats.map((item) => {
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

                    <h3 className="text-2xl font-semibold">
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
              title="Portfolio Overview"
              subtitle="Cross-project monitoring and delivery performance"
            />

            <CardBody>
              <div className="space-y-4">
                {portfolioProjects.map((project) => (
                  <div
                    key={project.name}
                    className="rounded-xl border border-line p-4"
                  >
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <h3 className="font-medium text-ink">
                          {project.name}
                        </h3>

                        <p className="mt-1 text-xs text-ink/45">
                          Budget: {project.budget}
                        </p>
                      </div>

                      <div className="flex items-center gap-6">
                        <span className="font-semibold">
                          {project.progress}
                        </span>

                        <span className="rounded-full bg-paper-2 px-3 py-1 text-xs font-medium">
                          {project.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        <Card>
          <CardHeader
            title="Management Alerts"
            subtitle="Items requiring leadership attention"
          />

          <CardBody>
            <div className="space-y-3">
              {managementAlerts.map((alert) => (
                <div
                  key={alert.title}
                  className="flex items-center justify-between rounded-xl bg-paper-2 p-3"
                >
                  <div>
                    <p className="text-sm text-ink/60">
                      {alert.title}
                    </p>

                    <p className="text-xs text-ink/40">
                      {alert.severity} Priority
                    </p>
                  </div>

                  <span className="text-lg font-semibold">
                    {alert.value}
                  </span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <Card>
          <CardHeader
            title="Project Delivery"
            subtitle="Execution health"
          />

          <CardBody>
            <div className="space-y-3">
              <ManagementMetric
                icon={CheckCircle2}
                label="Completed Milestones"
                value="1,248"
              />

              <ManagementMetric
                icon={Clock3}
                label="Delayed Milestones"
                value="43"
              />

              <ManagementMetric
                icon={FolderKanban}
                label="Active Projects"
                value="184"
              />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Financial Overview"
            subtitle="Portfolio spend"
          />

          <CardBody>
            <div className="space-y-3">
              <ManagementMetric
                icon={Wallet}
                label="Escrow Volume"
                value="₦8.6B"
              />

              <ManagementMetric
                icon={BarChart3}
                label="Budget Usage"
                value="76%"
              />

              <ManagementMetric
                icon={Activity}
                label="Monthly Spend"
                value="₦412M"
              />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Compliance Status"
            subtitle="Governance monitoring"
          />

          <CardBody>
            <div className="space-y-3">
              <ManagementMetric
                icon={ShieldCheck}
                label="Verified Users"
                value="98%"
              />

              <ManagementMetric
                icon={AlertTriangle}
                label="Risk Flags"
                value="14"
              />

              <ManagementMetric
                icon={CheckCircle2}
                label="Compliance Score"
                value="96%"
              />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Disputes & Risks"
            subtitle="Operational controls"
          />

          <CardBody>
            <div className="space-y-3">
              <ManagementMetric
                icon={Scale}
                label="Open Disputes"
                value="8"
              />

              <ManagementMetric
                icon={AlertTriangle}
                label="Risk Cases"
                value="12"
              />

              <ManagementMetric
                icon={CheckCircle2}
                label="Resolved Issues"
                value="124"
              />
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

function ManagementMetric({
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