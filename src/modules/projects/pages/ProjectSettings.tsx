import { useState } from 'react'
import {
  Bell,
  ChevronRight,
  Clock3,
  FileCheck2,
  Lock,
  Save,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'

type ProjectSettingsProps = {
  projectId?: string
}

type ToggleProps = {
  checked: boolean
  onChange: (value: boolean) => void
  disabled?: boolean
}

export function ProjectSettings({
  projectId,
}: ProjectSettingsProps) {
  const [notifications, setNotifications] = useState(true)
  const [milestoneAlerts, setMilestoneAlerts] = useState(true)
  const [paymentAlerts, setPaymentAlerts] = useState(true)
  const [documentAlerts, setDocumentAlerts] = useState(true)
  const [weeklyReports, setWeeklyReports] = useState(true)
  const [requireEvidence, setRequireEvidence] = useState(true)
  const [requireApproval, setRequireApproval] = useState(true)

  const [saved, setSaved] = useState(false)

  function handleSave() {
    /*
     * Replace with:
     * projectsService.updateProjectSettings(projectId, {...})
     */
    setSaved(true)

    window.setTimeout(() => {
      setSaved(false)
    }, 2500)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/35">
            Project configuration
          </p>

          <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight text-ink">
            Project Settings
          </h1>

          <p className="mt-1 max-w-2xl text-sm leading-6 text-ink/45">
            Manage project notifications, evidence requirements, approval
            controls and project-level access.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saved && (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-teal">
              <FileCheck2 className="h-3.5 w-3.5" />
              Changes saved
            </span>
          )}

          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white"
          >
            <Save className="h-4 w-4" />
            Save changes
          </button>
        </div>
      </div>

      {/* Settings */}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(280px,1fr)]">
        <div className="space-y-6">
          {/* Workflow controls */}
          <Card>
            <CardHeader
              title="Project workflow"
              subtitle="Controls that protect the project's evidence and approval process."
            />

            <CardBody className="divide-y divide-line">
              <SettingRow
                icon={ShieldCheck}
                title="Require milestone evidence"
                description="Milestones should have supporting evidence before they can proceed to verification."
                control={
                  <Toggle
                    checked={requireEvidence}
                    onChange={setRequireEvidence}
                  />
                }
              />

              <SettingRow
                icon={FileCheck2}
                title="Require client approval"
                description="Require client approval for milestone decisions before associated payment actions."
                control={
                  <Toggle
                    checked={requireApproval}
                    onChange={setRequireApproval}
                  />
                }
              />

              <SettingRow
                icon={Clock3}
                title="Weekly progress reports"
                description="Receive a weekly project progress report from the project team."
                control={
                  <Toggle
                    checked={weeklyReports}
                    onChange={setWeeklyReports}
                  />
                }
              />
            </CardBody>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader
              title="Notifications"
              subtitle="Choose which project events should generate notifications."
            />

            <CardBody className="divide-y divide-line">
              <SettingRow
                icon={Bell}
                title="Project notifications"
                description="Enable notifications for important project events."
                control={
                  <Toggle
                    checked={notifications}
                    onChange={setNotifications}
                  />
                }
              />

              <SettingRow
                icon={FileCheck2}
                title="Milestone alerts"
                description="Notify you when milestones are submitted, verified or require approval."
                control={
                  <Toggle
                    checked={milestoneAlerts}
                    onChange={setMilestoneAlerts}
                    disabled={!notifications}
                  />
                }
              />

              <SettingRow
                icon={Clock3}
                title="Payment alerts"
                description="Notify you when project payment or escrow actions require attention."
                control={
                  <Toggle
                    checked={paymentAlerts}
                    onChange={setPaymentAlerts}
                    disabled={!notifications}
                  />
                }
              />

              <SettingRow
                icon={FileCheck2}
                title="Document alerts"
                description="Notify you when project documents are uploaded or require review."
                control={
                  <Toggle
                    checked={documentAlerts}
                    onChange={setDocumentAlerts}
                    disabled={!notifications}
                  />
                }
              />
            </CardBody>
          </Card>

          {/* Project access */}
          <Card>
            <CardHeader
              title="Project access"
              subtitle="Manage the professionals and project participants who can access this project."
            />

            <CardBody className="space-y-3">
              <AccessRow
                icon={Users}
                title="Project team"
                description="Contractors, professionals and other assigned project participants."
                value="Manage team"
              />

              <AccessRow
                icon={ShieldCheck}
                title="Client access"
                description="Client visibility and approval permissions for this project."
                value="Manage access"
              />

              <AccessRow
                icon={Lock}
                title="Security & audit"
                description="Project actions remain subject to role permissions and audit logging."
                value="View controls"
              />
            </CardBody>
          </Card>
        </div>

        {/* Side panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader
              title="Project controls"
              subtitle="Important project-level safeguards."
            />

            <CardBody className="space-y-4">
              <ControlStatus
                label="Evidence before payment"
                enabled={requireEvidence}
              />

              <ControlStatus
                label="Client approval"
                enabled={requireApproval}
              />

              <ControlStatus
                label="Weekly reporting"
                enabled={weeklyReports}
              />
            </CardBody>
          </Card>

          <Card>
            <CardHeader
              title="Change control"
              subtitle="Scope, cost and timeline changes."
            />

            <CardBody>
              <div className="rounded-xl border border-line bg-paper-2 p-4">
                <div className="flex items-start gap-3">
                  <Lock className="mt-0.5 h-4 w-4 shrink-0 text-ink/40" />

                  <div>
                    <p className="text-xs font-semibold text-ink">
                      Protected workflow
                    </p>

                    <p className="mt-1 text-xs leading-5 text-ink/45">
                      Project settings cannot bypass the formal Change Request
                      process. Changes affecting scope, cost, timeline or
                      payment should be handled through that workflow.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold text-ink"
                >
                  Open change requests
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader
              title="Project ID"
              subtitle="Reference used by project services and audit records."
            />

            <CardBody>
              <span className="rounded-lg bg-ink/5 px-3 py-2 font-mono text-[10px] text-ink/50">
                {projectId || 'Current project'}
              </span>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Safety notice */}
      <div className="rounded-xl border border-line bg-paper-2 p-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-ink/35" />

          <div>
            <p className="text-xs font-semibold text-ink">
              Project governance
            </p>

            <p className="mt-1 text-xs leading-5 text-ink/45">
              Settings control how the project workspace behaves. They do not
              override role permissions, evidence verification, payment
              controls, dispute handling or formal change approval.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Shared components                                                           */
/* -------------------------------------------------------------------------- */

function SettingRow({
  icon: Icon,
  title,
  description,
  control,
}: {
  icon: React.ElementType
  title: string
  description: string
  control: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink/5">
        <Icon className="h-4 w-4 text-ink/40" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold text-ink">{title}</p>

        <p className="mt-1 max-w-xl text-[11px] leading-5 text-ink/40">
          {description}
        </p>
      </div>

      <div className="shrink-0">{control}</div>
    </div>
  )
}

function AccessRow({
  icon: Icon,
  title,
  description,
  value,
}: {
  icon: React.ElementType
  title: string
  description: string
  value: string
}) {
  return (
    <button
      type="button"
      className="flex w-full items-center gap-3 rounded-xl border border-line p-3 text-left hover:bg-ink/[0.02]"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink/5">
        <Icon className="h-4 w-4 text-ink/40" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold text-ink">{title}</p>

        <p className="mt-1 text-[10px] leading-4 text-ink/35">
          {description}
        </p>
      </div>

      <ChevronRight className="h-4 w-4 shrink-0 text-ink/25" />
    </button>
  )
}

function ControlStatus({
  label,
  enabled,
}: {
  label: string
  enabled: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-xs text-ink/50">{label}</span>

      <Badge tone={enabled ? 'teal' : 'neutral'}>
        {enabled ? 'Enabled' : 'Off'}
      </Badge>
    </div>
  )
}

function Toggle({
  checked,
  onChange,
  disabled = false,
}: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={[
        'relative h-6 w-11 rounded-full transition-colors',
        checked ? 'bg-ink' : 'bg-ink/10',
        disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer',
      ].join(' ')}
    >
      <span
        className={[
          'absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform',
          checked ? 'left-6' : 'left-1',
        ].join(' ')}
      />
    </button>
  )
}