import {
  Download,
  FileSearch,
  ShieldCheck,
  Activity,
  AlertTriangle,
  Wallet,
  Scale,
  Users,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'

const auditSummary = [
  {
    label: 'Audit Events',
    value: '28,451',
    icon: Activity,
  },
  {
    label: 'Compliance Logs',
    value: '4,102',
    icon: ShieldCheck,
  },
  {
    label: 'Escrow Actions',
    value: '8,933',
    icon: Wallet,
  },
  {
    label: 'Dispute Records',
    value: '247',
    icon: Scale,
  },
]

const recentAuditEvents = [
  {
    action: 'Escrow Release Approved',
    actor: 'Build OS Admin',
    category: 'Escrow',
    date: '2026-08-24 14:33',
    status: 'Completed',
  },
  {
    action: 'Supplier Verification Approved',
    actor: 'Compliance Officer',
    category: 'Verification',
    date: '2026-08-24 12:08',
    status: 'Completed',
  },
  {
    action: 'Dispute Escalated',
    actor: 'Dispute Officer',
    category: 'Dispute',
    date: '2026-08-24 10:11',
    status: 'Under Review',
  },
  {
    action: 'Contractor Suspended',
    actor: 'Risk Team',
    category: 'Compliance',
    date: '2026-08-23 18:20',
    status: 'Flagged',
  },
]

export function AuditReports() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader
          title="Audit Reports"
          subtitle="Immutable audit trail, compliance records and platform activity monitoring"
        />

        <CardBody>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2 text-sm font-medium text-white"
            >
              <Download className="h-4 w-4" />
              Export Audit Log
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-line px-4 py-2 text-sm font-medium"
            >
              <FileSearch className="h-4 w-4" />
              Advanced Search
            </button>
          </div>
        </CardBody>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {auditSummary.map((item) => {
          const Icon = item.icon

          return (
            <Card key={item.label}>
              <CardBody>
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-ink/5 p-3">
                    <Icon className="h-5 w-5 text-ink/60" />
                  </div>

                  <div>
                    <p className="text-xs text-ink/50">
                      {item.label}
                    </p>

                    <h3 className="text-xl font-semibold">
                      {item.value}
                    </h3>
                  </div>
                </div>
              </CardBody>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader
          title="Recent Audit Activity"
          subtitle="System-generated audit events across verification, escrow, compliance and disputes"
        />

        <CardBody>
          <div className="space-y-4">
            {recentAuditEvents.map((event) => (
              <div
                key={`${event.action}-${event.date}`}
                className="flex flex-col gap-3 rounded-xl border border-line p-4 lg:flex-row lg:items-center lg:justify-between"
              >
                <div>
                  <h3 className="font-medium text-ink">
                    {event.action}
                  </h3>

                  <p className="mt-1 text-xs text-ink/50">
                    {event.actor} • {event.category}
                  </p>
                </div>

                <div className="flex items-center gap-6">
                  <span className="text-xs text-ink/50">
                    {event.date}
                  </span>

                  <span className="rounded-full bg-ink/5 px-3 py-1 text-xs font-medium">
                    {event.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader
            title="Compliance Monitoring"
            subtitle="KYC, AML and verification audit coverage"
          />

          <CardBody>
            <div className="space-y-3">
              <AuditMetric
                icon={ShieldCheck}
                label="Verification Reviews"
                value="1,224"
              />

              <AuditMetric
                icon={Users}
                label="User Compliance Checks"
                value="842"
              />

              <AuditMetric
                icon={AlertTriangle}
                label="Risk Alerts"
                value="14"
              />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Escrow Audit Trail"
            subtitle="Funding, releases, refunds and frozen payments"
          />

          <CardBody>
            <div className="space-y-3">
              <AuditMetric
                icon={Wallet}
                label="Wallet Transactions"
                value="8,933"
              />

              <AuditMetric
                icon={Activity}
                label="Payment Releases"
                value="1,481"
              />

              <AuditMetric
                icon={AlertTriangle}
                label="Frozen Transactions"
                value="27"
              />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Dispute Audit Logs"
            subtitle="Dispute workflow and resolution history"
          />

          <CardBody>
            <div className="space-y-3">
              <AuditMetric
                icon={Scale}
                label="Open Disputes"
                value="31"
              />

              <AuditMetric
                icon={Scale}
                label="Resolved Cases"
                value="216"
              />

              <AuditMetric
                icon={Activity}
                label="Evidence Records"
                value="1,043"
              />
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

function AuditMetric({
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
        <span className="text-sm text-ink/60">{label}</span>
      </div>

      <span className="font-semibold text-ink">
        {value}
      </span>
    </div>
  )
}