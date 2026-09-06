import {
  AlertTriangle,
  BadgeCheck,
  FileCheck2,
  Fingerprint,
  Lock,
  ShieldCheck,
  Users,
  Download,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'

const complianceOverview = [
  {
    label: 'Verified Users',
    value: '12,482',
    icon: BadgeCheck,
  },
  {
    label: 'Pending Reviews',
    value: '216',
    icon: FileCheck2,
  },
  {
    label: 'AML Alerts',
    value: '8',
    icon: AlertTriangle,
  },
  {
    label: 'Suspended Accounts',
    value: '27',
    icon: ShieldCheck,
  },
]

const complianceAlerts = [
  {
    title: 'Expired Contractor Documents',
    category: 'Verification',
    severity: 'Medium',
    count: 14,
  },
  {
    title: 'Outstanding AML Reviews',
    category: 'Financial Compliance',
    severity: 'High',
    count: 8,
  },
  {
    title: 'Supplier Verification Resubmissions',
    category: 'KYC',
    severity: 'Low',
    count: 21,
  },
]

export function ComplianceReports() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader
          title="Compliance Reports"
          subtitle="KYC, AML, verification, regulatory and platform compliance monitoring"
        />

        <CardBody>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2 text-sm font-medium text-white"
          >
            <Download className="h-4 w-4" />
            Export Compliance Report
          </button>
        </CardBody>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {complianceOverview.map((item) => {
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

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader
            title="Identity Verification"
            subtitle="KYC and user verification status"
          />

          <CardBody>
            <div className="space-y-3">
              <ComplianceMetric
                icon={Users}
                label="Verified Users"
                value="12,482"
              />

              <ComplianceMetric
                icon={FileCheck2}
                label="Pending Reviews"
                value="216"
              />

              <ComplianceMetric
                icon={AlertTriangle}
                label="Rejected Applications"
                value="41"
              />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="AML Monitoring"
            subtitle="Financial compliance and risk controls"
          />

          <CardBody>
            <div className="space-y-3">
              <ComplianceMetric
                icon={Fingerprint}
                label="AML Checks"
                value="3,904"
              />

              <ComplianceMetric
                icon={AlertTriangle}
                label="Risk Flags"
                value="17"
              />

              <ComplianceMetric
                icon={ShieldCheck}
                label="Investigations"
                value="8"
              />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Data Protection"
            subtitle="Privacy, access and security controls"
          />

          <CardBody>
            <div className="space-y-3">
              <ComplianceMetric
                icon={Lock}
                label="Access Audits"
                value="1,224"
              />

              <ComplianceMetric
                icon={ShieldCheck}
                label="Security Reviews"
                value="102"
              />

              <ComplianceMetric
                icon={AlertTriangle}
                label="Incidents"
                value="0"
              />
            </div>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader
          title="Compliance Alerts"
          subtitle="Items requiring review or remediation"
        />

        <CardBody>
          <div className="space-y-4">
            {complianceAlerts.map((alert) => (
              <div
                key={alert.title}
                className="flex flex-col gap-3 rounded-xl border border-line p-4 lg:flex-row lg:items-center lg:justify-between"
              >
                <div>
                  <h3 className="font-medium text-ink">
                    {alert.title}
                  </h3>

                  <p className="mt-1 text-xs text-ink/45">
                    {alert.category}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span className="rounded-full bg-paper-2 px-3 py-1 text-xs font-medium">
                    {alert.severity}
                  </span>

                  <span className="text-sm font-semibold text-ink">
                    {alert.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader
          title="Compliance Coverage"
          subtitle="Platform-wide regulatory controls"
        />

        <CardBody>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <CoverageCard
              title="KYC Compliance"
              value="98%"
            />

            <CoverageCard
              title="Business Verification"
              value="96%"
            />

            <CoverageCard
              title="Professional Verification"
              value="94%"
            />

            <CoverageCard
              title="AML Compliance"
              value="99%"
            />
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

function ComplianceMetric({
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

function CoverageCard({
  title,
  value,
}: {
  title: string
  value: string
}) {
  return (
    <div className="rounded-xl border border-line p-4">
      <p className="text-xs uppercase tracking-wide text-ink/40">
        {title}
      </p>

      <h3 className="mt-2 text-2xl font-semibold text-ink">
        {value}
      </h3>
    </div>
  )
}