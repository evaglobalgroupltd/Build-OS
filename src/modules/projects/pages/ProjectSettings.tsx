import { useState } from 'react'
import {
  ArrowUpRight,
  Bell,
  Check,
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
    <div className="space-y-7">
      {/* ------------------------------------------------------------------ */}
      {/* Header                                                             */}
      {/* ------------------------------------------------------------------ */}

      <section
        aria-label="Project settings header"
        className="
          relative overflow-hidden rounded-[24px]
          bg-[#18271F]
          shadow-[0_18px_50px_rgba(20,40,30,0.10)]
        "
      >
        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-white/[0.04] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 left-1/3 h-48 w-48 rounded-full bg-[#B8D9C4]/[0.04] blur-3xl" />

        <div className="relative flex flex-col gap-7 p-6 sm:p-7 lg:flex-row lg:items-end lg:justify-between lg:p-8">
          <div className="min-w-0">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white/[0.09] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-white/65">
                Project governance
              </span>

              <span className="h-1 w-1 rounded-full bg-white/20" />

              <span className="font-mono text-[9px] text-white/35">
                {projectId || 'Current project'}
              </span>
            </div>

            <h1 className="font-display text-[29px] font-semibold leading-tight tracking-[-0.035em] text-white sm:text-[34px]">
              Project Settings
            </h1>

            <p className="mt-3 max-w-2xl text-[11px] leading-5 text-white/45 sm:text-xs">
              Configure the controls, notifications and access rules that
              govern how this project operates.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            {saved && (
              <div className="flex items-center gap-2 rounded-full bg-white/[0.08] px-3.5 py-2.5 text-[10px] font-semibold text-white/70">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#B8D9C4] text-[#18271F]">
                  <Check size={10} strokeWidth={3} />
                </span>
                Changes saved
              </div>
            )}

            <button
              type="button"
              onClick={handleSave}
              className="
                group inline-flex items-center justify-center gap-2
                rounded-full bg-white px-5 py-2.5
                text-[10px] font-bold text-ink
                transition duration-300
                hover:-translate-y-0.5 hover:bg-white/90
              "
            >
              <Save
                size={13}
                className="transition-transform duration-300 group-hover:scale-105"
              />
              Save changes
            </button>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Settings layout                                                    */}
      {/* ------------------------------------------------------------------ */}

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(300px,0.75fr)]">
        <div className="space-y-5">
          {/* -------------------------------------------------------------- */}
          {/* Workflow controls                                              */}
          {/* -------------------------------------------------------------- */}

          <Card className="overflow-hidden">
            <CardHeader
              title="Project workflow"
              subtitle="Controls that protect evidence, approvals and project delivery."
            />

            <CardBody className="divide-y divide-ink/[0.06]">
              <SettingRow
                icon={ShieldCheck}
                eyebrow="Verification"
                title="Require milestone evidence"
                description="Milestones must include supporting evidence before they can proceed to verification."
                enabled={requireEvidence}
                control={
                  <Toggle
                    checked={requireEvidence}
                    onChange={setRequireEvidence}
                  />
                }
              />

              <SettingRow
                icon={FileCheck2}
                eyebrow="Approval"
                title="Require client approval"
                description="Client approval is required for milestone decisions before associated payment actions."
                enabled={requireApproval}
                control={
                  <Toggle
                    checked={requireApproval}
                    onChange={setRequireApproval}
                  />
                }
              />

              <SettingRow
                icon={Clock3}
                eyebrow="Reporting"
                title="Weekly progress reports"
                description="Receive a consolidated progress report from the project team each week."
                enabled={weeklyReports}
                control={
                  <Toggle
                    checked={weeklyReports}
                    onChange={setWeeklyReports}
                  />
                }
              />
            </CardBody>
          </Card>

          {/* -------------------------------------------------------------- */}
          {/* Notifications                                                   */}
          {/* -------------------------------------------------------------- */}

          <Card className="overflow-hidden">
            <CardHeader
              title="Notifications"
              subtitle="Control which project events should generate alerts."
            />

            <CardBody className="divide-y divide-ink/[0.06]">
              <SettingRow
                icon={Bell}
                eyebrow="Master control"
                title="Project notifications"
                description="Enable notifications for important project activity and events."
                enabled={notifications}
                control={
                  <Toggle
                    checked={notifications}
                    onChange={setNotifications}
                  />
                }
              />

              <SettingRow
                icon={FileCheck2}
                eyebrow="Milestones"
                title="Milestone alerts"
                description="Notify you when milestones are submitted, verified or require approval."
                enabled={milestoneAlerts}
                disabled={!notifications}
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
                eyebrow="Financial"
                title="Payment alerts"
                description="Notify you when payment or escrow actions require attention."
                enabled={paymentAlerts}
                disabled={!notifications}
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
                eyebrow="Documents"
                title="Document alerts"
                description="Notify you when project documents are uploaded or require review."
                enabled={documentAlerts}
                disabled={!notifications}
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

          {/* -------------------------------------------------------------- */}
          {/* Project access                                                  */}
          {/* -------------------------------------------------------------- */}

          <Card className="overflow-hidden">
            <CardHeader
              title="Project access"
              subtitle="Manage participants and the permissions connected to this project."
            />

            <CardBody className="space-y-2.5">
              <AccessRow
                icon={Users}
                eyebrow="Participants"
                title="Project team"
                description="Contractors, professionals and other assigned project participants."
                value="Manage team"
              />

              <AccessRow
                icon={ShieldCheck}
                eyebrow="Client permissions"
                title="Client access"
                description="Client visibility, review and approval permissions."
                value="Manage access"
              />

              <AccessRow
                icon={Lock}
                eyebrow="Protection"
                title="Security & audit"
                description="Role permissions, audit logging and project-level security controls."
                value="View controls"
              />
            </CardBody>
          </Card>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Side panel                                                        */}
        {/* ---------------------------------------------------------------- */}

        <div className="space-y-5">
          {/* Project controls */}
          <Card className="overflow-hidden">
            <CardHeader
              title="Project controls"
              subtitle="Live safeguards currently protecting this workspace."
            />

            <CardBody className="space-y-2">
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

          {/* Governance summary */}
          <div className="overflow-hidden rounded-[20px] bg-[#F7F8F6]">
            <div className="border-b border-ink/[0.06] px-5 py-4">
              <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-ink/35">
                Governance status
              </p>

              <div className="mt-2 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EAF4EE] text-[#12613E]">
                  <ShieldCheck size={12} />
                </span>

                <p className="font-display text-sm font-semibold text-ink">
                  Protected workflow
                </p>
              </div>
            </div>

            <div className="space-y-3 p-5">
              <GovernanceItem
                label="Evidence verification"
                enabled={requireEvidence}
              />

              <GovernanceItem
                label="Client approval"
                enabled={requireApproval}
              />

              <GovernanceItem
                label="Audit controls"
                enabled
              />

              <GovernanceItem
                label="Role permissions"
                enabled
              />
            </div>
          </div>

          {/* Change control */}
          <Card className="overflow-hidden">
            <CardHeader
              title="Change control"
              subtitle="Scope, cost and timeline changes."
            />

            <CardBody>
              <div className="rounded-[18px] border border-[#B85C12]/10 bg-[#FBF7F3] p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F8EEE6] text-[#B85C12]">
                    <Lock size={14} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold text-ink">
                      Formal change workflow protected
                    </p>

                    <p className="mt-1.5 text-[10px] leading-5 text-ink/45">
                      Settings cannot bypass the formal Change Request
                      process. Changes affecting scope, cost, timeline or
                      payment must follow the appropriate approval workflow.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="
                    group mt-4 inline-flex items-center gap-1.5
                    text-[10px] font-bold text-ink/55
                    transition hover:text-[#B85C12]
                  "
                >
                  Open change requests
                  <ArrowUpRight
                    size={12}
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </button>
              </div>
            </CardBody>
          </Card>

          {/* Project ID */}
          <Card className="overflow-hidden">
            <CardHeader
              title="Project reference"
              subtitle="Used by project services and audit records."
            />

            <CardBody>
              <div className="flex items-center justify-between gap-3 rounded-[16px] border border-ink/[0.06] bg-[#FAFBFA] px-4 py-3.5">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-ink/30">
                    Project ID
                  </p>

                  <p className="mt-1 font-mono text-[10px] font-medium text-ink/55">
                    {projectId || 'Current project'}
                  </p>
                </div>

                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-ink/25 shadow-[0_3px_12px_rgba(20,40,30,0.04)]">
                  <FileCheck2 size={13} />
                </span>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Governance notice                                                  */}
      {/* ------------------------------------------------------------------ */}

      <section
        aria-label="Project governance notice"
        className="overflow-hidden rounded-[20px] border border-ink/[0.07] bg-white"
      >
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:p-6">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF4EE] text-[#12613E]">
            <ShieldCheck size={15} />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-[11px] font-bold text-ink">
                Project governance
              </p>

              <span className="rounded-full bg-[#EAF4EE] px-2 py-1 text-[8px] font-bold uppercase tracking-[0.10em] text-[#12613E]">
                Protected
              </span>
            </div>

            <p className="mt-1.5 max-w-4xl text-[10.5px] leading-5 text-ink/40">
              These settings control how the project workspace behaves. They
              do not override role permissions, evidence verification,
              payment controls, dispute handling or formal change approval.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Shared components                                                          */
/* -------------------------------------------------------------------------- */

function SettingRow({
  icon: Icon,
  eyebrow,
  title,
  description,
  enabled,
  disabled = false,
  control,
}: {
  icon: React.ElementType
  eyebrow: string
  title: string
  description: string
  enabled: boolean
  disabled?: boolean
  control: React.ReactNode
}) {
  return (
    <div
      className={[
        'group flex items-start gap-4 py-5 transition',
        disabled ? 'opacity-45' : '',
      ].join(' ')}
    >
      <div
        className={[
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition duration-300',
          enabled
            ? 'bg-[#EAF4EE] text-[#12613E]'
            : 'bg-ink/[0.05] text-ink/35',
          !disabled && 'group-hover:scale-[1.03]',
        ].join(' ')}
      >
        <Icon size={16} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-ink/30">
          {eyebrow}
        </p>

        <p className="mt-1 text-[11px] font-semibold text-ink sm:text-xs">
          {title}
        </p>

        <p className="mt-1 max-w-xl text-[10.5px] leading-5 text-ink/40">
          {description}
        </p>
      </div>

      <div className="shrink-0 pt-1">{control}</div>
    </div>
  )
}

function AccessRow({
  icon: Icon,
  eyebrow,
  title,
  description,
  value,
}: {
  icon: React.ElementType
  eyebrow: string
  title: string
  description: string
  value: string
}) {
  return (
    <button
      type="button"
      className="
        group flex w-full items-center gap-3
        rounded-[17px] border border-ink/[0.06]
        bg-[#FCFDFC] p-3.5 text-left
        transition duration-300
        hover:-translate-y-0.5
        hover:border-ink/[0.11]
        hover:bg-white
        hover:shadow-[0_10px_28px_rgba(20,40,30,0.05)]
      "
    >
      <div
        className="
          flex h-10 w-10 shrink-0 items-center justify-center
          rounded-xl bg-ink/[0.05] text-ink/40
          transition duration-300
          group-hover:bg-[#EAF4EE]
          group-hover:text-[#12613E]
        "
      >
        <Icon size={15} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[8px] font-bold uppercase tracking-[0.12em] text-ink/30">
          {eyebrow}
        </p>

        <p className="mt-1 text-[11px] font-semibold text-ink">
          {title}
        </p>

        <p className="mt-1 text-[10px] leading-4 text-ink/35">
          {description}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-1.5 text-ink/25 transition group-hover:text-ink/55">
        <span className="hidden text-[9px] font-bold sm:block">
          {value}
        </span>

        <ChevronRight
          size={14}
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      </div>
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
    <div className="flex items-center justify-between gap-4 rounded-[14px] px-3 py-3 transition hover:bg-ink/[0.02]">
      <div className="flex min-w-0 items-center gap-2.5">
        <span
          className={[
            'h-1.5 w-1.5 shrink-0 rounded-full',
            enabled ? 'bg-[#12613E]' : 'bg-ink/20',
          ].join(' ')}
        />

        <span className="truncate text-[10.5px] font-medium text-ink/55">
          {label}
        </span>
      </div>

      <Badge tone={enabled ? 'teal' : 'neutral'}>
        {enabled ? 'Enabled' : 'Off'}
      </Badge>
    </div>
  )
}

function GovernanceItem({
  label,
  enabled,
}: {
  label: string
  enabled: boolean
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        className={[
          'flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
          enabled
            ? 'bg-[#EAF4EE] text-[#12613E]'
            : 'bg-ink/[0.05] text-ink/25',
        ].join(' ')}
      >
        {enabled ? <Check size={10} strokeWidth={3} /> : null}
      </span>

      <span className="text-[10px] font-medium text-ink/50">
        {label}
      </span>
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
        'relative h-7 w-12 rounded-full transition-all duration-300',
        checked
          ? 'bg-[#12613E] shadow-[0_4px_14px_rgba(18,97,62,0.18)]'
          : 'bg-ink/[0.10]',
        disabled
          ? 'cursor-not-allowed opacity-35'
          : 'cursor-pointer hover:opacity-90',
      ].join(' ')}
    >
      <span
        className={[
          'absolute top-1 h-5 w-5 rounded-full bg-white shadow-[0_2px_7px_rgba(0,0,0,0.14)] transition-all duration-300',
          checked ? 'left-6' : 'left-1',
        ].join(' ')}
      />
    </button>
  )
}