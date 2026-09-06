import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Download,
  FileText,
  HardHat,
  Package,
  Scale,
  ShieldCheck,
  Wallet,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'

const projectMetrics = [
  {
    label: 'Project Progress',
    value: '74%',
    icon: CheckCircle2,
  },
  {
    label: 'Budget Utilized',
    value: '₦348M',
    icon: Wallet,
  },
  {
    label: 'Milestones',
    value: '18 / 24',
    icon: FileText,
  },
  {
    label: 'Team Members',
    value: '47',
    icon: HardHat,
  },
]

const milestones = [
  {
    name: 'Site Preparation',
    status: 'Completed',
    completion: '100%',
  },
  {
    name: 'Foundation Works',
    status: 'Completed',
    completion: '100%',
  },
  {
    name: 'Structural Framework',
    status: 'In Progress',
    completion: '82%',
  },
  {
    name: 'Roof Installation',
    status: 'Pending',
    completion: '0%',
  },
]

const activities = [
  {
    title: 'Milestone Approved',
    description: 'Foundation milestone verified by Project Manager',
    date: '24 Aug 2026',
  },
  {
    title: 'Escrow Release',
    description: 'Labour payment released',
    date: '23 Aug 2026',
  },
  {
    title: 'Material Delivery',
    description: 'Cement and reinforcement materials delivered',
    date: '22 Aug 2026',
  },
  {
    title: 'Inspection Completed',
    description: 'Structural inspection passed',
    date: '21 Aug 2026',
  },
]

export function ProjectReports() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader
          title="Project Report"
          subtitle="Comprehensive reporting for a single construction project"
        />

        <CardBody>
          <div className="flex flex-wrap items-center gap-3">
            <select className="rounded-xl border border-line bg-background px-3 py-2 text-sm">
              <option>Abuja Smart Estate</option>
              <option>Lekki Commercial Plaza</option>
              <option>Kano Housing Scheme</option>
            </select>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2 text-sm font-medium text-white"
            >
              <Download className="h-4 w-4" />
              Export Project Report
            </button>
          </div>
        </CardBody>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {projectMetrics.map((item) => {
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
              title="Milestone Progress"
              subtitle="Project delivery tracking"
            />

            <CardBody>
              <div className="space-y-4">
                {milestones.map((milestone) => (
                  <div
                    key={milestone.name}
                    className="rounded-xl border border-line p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">
                          {milestone.name}
                        </h3>

                        <p className="mt-1 text-xs text-ink/45">
                          {milestone.status}
                        </p>
                      </div>

                      <span className="font-semibold">
                        {milestone.completion}
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
            title="Project Health"
            subtitle="Risk and quality indicators"
          />

          <CardBody>
            <div className="space-y-3">
              <ProjectMetric
                icon={CheckCircle2}
                label="Quality Score"
                value="96%"
              />

              <ProjectMetric
                icon={Clock3}
                label="Schedule Health"
                value="91%"
              />

              <ProjectMetric
                icon={AlertTriangle}
                label="Risk Alerts"
                value="3"
              />

              <ProjectMetric
                icon={ShieldCheck}
                label="Compliance Score"
                value="98%"
              />
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader
            title="Financial Summary"
            subtitle="Project financial performance"
          />

          <CardBody>
            <div className="space-y-3">
              <ProjectMetric
                icon={Wallet}
                label="Approved Budget"
                value="₦470M"
              />

              <ProjectMetric
                icon={Wallet}
                label="Spent"
                value="₦348M"
              />

              <ProjectMetric
                icon={Wallet}
                label="Remaining"
                value="₦122M"
              />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Procurement"
            subtitle="Materials and supplier activity"
          />

          <CardBody>
            <div className="space-y-3">
              <ProjectMetric
                icon={Package}
                label="Orders"
                value="82"
              />

              <ProjectMetric
                icon={Package}
                label="Delivered"
                value="76"
              />

              <ProjectMetric
                icon={Package}
                label="Pending"
                value="6"
              />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Disputes"
            subtitle="Issue management"
          />

          <CardBody>
            <div className="space-y-3">
              <ProjectMetric
                icon={Scale}
                label="Open Disputes"
                value="1"
              />

              <ProjectMetric
                icon={Scale}
                label="Resolved"
                value="5"
              />

              <ProjectMetric
                icon={AlertTriangle}
                label="Escalated"
                value="0"
              />
            </div>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader
          title="Recent Project Activity"
          subtitle="Latest project events and actions"
        />

        <CardBody>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={`${activity.title}-${activity.date}`}
                className="rounded-xl border border-line p-4"
              >
                <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h3 className="font-medium">
                      {activity.title}
                    </h3>

                    <p className="mt-1 text-sm text-ink/55">
                      {activity.description}
                    </p>
                  </div>

                  <span className="text-xs text-ink/45">
                    {activity.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

function ProjectMetric({
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

      <span className="font-semibold">
        {value}
      </span>
    </div>
  )
}