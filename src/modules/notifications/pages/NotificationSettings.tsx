import { useState } from 'react'
import {
  Bell,
  Check,
  ChevronRight,
  Mail,
  MessageSquare,
  Smartphone,
  ShieldAlert,
  Wallet,
  ClipboardCheck,
  Clock3,
  Users,
  Settings2,
} from 'lucide-react'

type NotificationPreference = {
  id: string
  title: string
  description: string
  icon: React.ElementType
  email: boolean
  push: boolean
  sms: boolean
}

const initialPreferences: NotificationPreference[] = [
  {
    id: 'project',
    title: 'Project Updates',
    description: 'Progress, milestones, approvals and important project activity.',
    icon: ClipboardCheck,
    email: true,
    push: true,
    sms: false,
  },
  {
    id: 'risk',
    title: 'Risk Alerts',
    description: 'Budget, schedule, quality and other project risk warnings.',
    icon: ShieldAlert,
    email: true,
    push: true,
    sms: true,
  },
  {
    id: 'payments',
    title: 'Payments & Escrow',
    description: 'Payment confirmations, releases, funding and transaction activity.',
    icon: Wallet,
    email: true,
    push: true,
    sms: true,
  },
  {
    id: 'deadlines',
    title: 'Deadlines & Reminders',
    description: 'Upcoming milestones, required actions and overdue activities.',
    icon: Clock3,
    email: true,
    push: true,
    sms: false,
  },
  {
    id: 'team',
    title: 'Team Activity',
    description: 'Messages, assignments, mentions and collaboration updates.',
    icon: Users,
    email: false,
    push: true,
    sms: false,
  },
]

const frequencyOptions = [
  {
    value: 'instant',
    label: 'Instant',
    description: 'Receive important notifications as they happen.',
  },
  {
    value: 'daily',
    label: 'Daily digest',
    description: 'Receive a summary of activity once per day.',
  },
  {
    value: 'weekly',
    label: 'Weekly digest',
    description: 'Receive a weekly summary of non-critical activity.',
  },
]

export function NotificationSettings() {
  const [preferences, setPreferences] =
    useState<NotificationPreference[]>(initialPreferences)

  const [frequency, setFrequency] = useState('instant')
  const [quietHours, setQuietHours] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const toggleChannel = (
    preferenceId: string,
    channel: 'email' | 'push' | 'sms',
  ) => {
    setPreferences((current) =>
      current.map((preference) =>
        preference.id === preferenceId
          ? {
              ...preference,
              [channel]: !preference[channel],
            }
          : preference,
      ),
    )

    setSaved(false)
  }

  const toggleAll = (channel: 'email' | 'push' | 'sms') => {
    const enabled = preferences.some((preference) => preference[channel])

    setPreferences((current) =>
      current.map((preference) => ({
        ...preference,
        [channel]: !enabled,
      })),
    )

    setSaved(false)
  }

  const handleSave = async () => {
    setSaving(true)
    setSaved(false)

    // Replace with monitoring/notifications API call when backend is connected.
    await new Promise((resolve) => setTimeout(resolve, 500))

    setSaving(false)
    setSaved(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink text-paper">
              <Bell className="h-4 w-4" />
            </div>

            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-ink/40">
              Account preferences
            </span>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-ink">
            Notification Settings
          </h1>

          <p className="mt-1 max-w-2xl text-sm text-ink/55">
            Control how Build OS keeps you informed about projects, risks,
            payments, deadlines and team activity.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {saved && (
            <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-700">
              <Check className="h-3.5 w-3.5" />
              Changes saved
            </span>
          )}

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center justify-center rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-paper transition hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save changes'}
          </button>
        </div>
      </div>

      {/* Notification channels */}
      <section className="overflow-hidden rounded-2xl border border-ink/10 bg-white">
        <div className="border-b border-ink/10 px-5 py-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5">
              <Settings2 className="h-4 w-4 text-ink/70" />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-ink">
                Notification channels
              </h2>
              <p className="mt-0.5 text-xs text-ink/50">
                Choose where you want to receive each type of notification.
              </p>
            </div>
          </div>
        </div>

        {/* Channel legend */}
        <div className="hidden border-b border-ink/10 bg-ink/[0.02] px-5 py-3 md:grid md:grid-cols-[minmax(0,1fr)_90px_90px_90px] md:items-center">
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink/35">
            Notification
          </span>

          <ChannelHeader
            icon={Mail}
            label="Email"
            onClick={() => toggleAll('email')}
          />

          <ChannelHeader
            icon={Smartphone}
            label="Push"
            onClick={() => toggleAll('push')}
          />

          <ChannelHeader
            icon={MessageSquare}
            label="SMS"
            onClick={() => toggleAll('sms')}
          />
        </div>

        <div className="divide-y divide-ink/10">
          {preferences.map((preference) => {
            const Icon = preference.icon

            return (
              <div
                key={preference.id}
                className="px-5 py-5 transition hover:bg-ink/[0.015]"
              >
                <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_90px_90px_90px] md:items-center">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink/5">
                      <Icon className="h-4 w-4 text-ink/60" />
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-ink">
                        {preference.title}
                      </h3>

                      <p className="mt-1 max-w-xl text-xs leading-5 text-ink/50">
                        {preference.description}
                      </p>
                    </div>
                  </div>

                  <MobileChannelToggle
                    icon={Mail}
                    label="Email"
                    checked={preference.email}
                    onChange={() =>
                      toggleChannel(preference.id, 'email')
                    }
                  />

                  <MobileChannelToggle
                    icon={Smartphone}
                    label="Push"
                    checked={preference.push}
                    onChange={() =>
                      toggleChannel(preference.id, 'push')
                    }
                  />

                  <MobileChannelToggle
                    icon={MessageSquare}
                    label="SMS"
                    checked={preference.sms}
                    onChange={() =>
                      toggleChannel(preference.id, 'sms')
                    }
                  />
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Frequency */}
      <section className="rounded-2xl border border-ink/10 bg-white">
        <div className="border-b border-ink/10 px-5 py-4">
          <h2 className="text-sm font-semibold text-ink">
            Notification frequency
          </h2>
          <p className="mt-0.5 text-xs text-ink/50">
            Decide how often non-critical notifications are delivered.
          </p>
        </div>

        <div className="divide-y divide-ink/10">
          {frequencyOptions.map((option) => {
            const selected = frequency === option.value

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  setFrequency(option.value)
                  setSaved(false)
                }}
                className="flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-ink/[0.02]"
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                    selected
                      ? 'border-ink bg-ink'
                      : 'border-ink/20 bg-white'
                  }`}
                >
                  {selected && (
                    <span className="h-2 w-2 rounded-full bg-paper" />
                  )}
                </span>

                <span className="flex-1">
                  <span className="block text-sm font-medium text-ink">
                    {option.label}
                  </span>
                  <span className="mt-0.5 block text-xs text-ink/45">
                    {option.description}
                  </span>
                </span>

                <ChevronRight className="hidden h-4 w-4 text-ink/20 sm:block" />
              </button>
            )
          })}
        </div>
      </section>

      {/* Quiet hours */}
      <section className="rounded-2xl border border-ink/10 bg-white">
        <div className="flex items-center justify-between gap-4 px-5 py-5">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink/5">
              <Clock3 className="h-4 w-4 text-ink/60" />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-ink">
                Quiet hours
              </h2>
              <p className="mt-1 text-xs leading-5 text-ink/50">
                Reduce non-critical notifications during your selected
                quiet period. Critical risk and security alerts may still be
                delivered.
              </p>
            </div>
          </div>

          <Toggle
            checked={quietHours}
            onChange={() => {
              setQuietHours((current) => !current)
              setSaved(false)
            }}
          />
        </div>

        {quietHours && (
          <div className="border-t border-ink/10 bg-ink/[0.02] px-5 py-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <TimeInput label="Start" value="22:00" />
              <TimeInput label="End" value="07:00" />
            </div>
          </div>
        )}
      </section>

      {/* System note */}
      <div className="flex items-start gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/5 px-5 py-4">
        <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />

        <div>
          <p className="text-xs font-semibold text-amber-900">
            Critical notifications
          </p>
          <p className="mt-1 text-xs leading-5 text-amber-900/60">
            Build OS may deliver critical security, payment, compliance and
            high-severity project risk alerts regardless of your general
            notification preferences.
          </p>
        </div>
      </div>

      {/* Mobile save action */}
      <div className="flex justify-end md:hidden">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="w-full rounded-xl bg-ink px-4 py-3 text-xs font-semibold text-paper disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save changes'}
        </button>
      </div>
    </div>
  )
}

function ChannelHeader({
  icon: Icon,
  label,
  onClick,
}: {
  icon: React.ElementType
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-center gap-1.5 text-[10px] font-medium text-ink/45 transition hover:text-ink"
      title={`Toggle all ${label.toLowerCase()} notifications`}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  )
}

function MobileChannelToggle({
  icon: Icon,
  label,
  checked,
  onChange,
}: {
  icon: React.ElementType
  label: string
  checked: boolean
  onChange: () => void
}) {
  return (
    <div className="flex items-center justify-between md:justify-center">
      <span className="flex items-center gap-2 text-xs text-ink/45 md:hidden">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </span>

      <Toggle checked={checked} onChange={onChange} />
    </div>
  )
}

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean
  onChange: () => void
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`relative h-6 w-11 shrink-0 rounded-full transition ${
        checked ? 'bg-ink' : 'bg-ink/10'
      }`}
    >
      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
          checked ? 'left-6' : 'left-1'
        }`}
      />
    </button>
  )
}

function TimeInput({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[9px] uppercase tracking-[0.15em] text-ink/40">
        {label}
      </span>

      <input
        type="time"
        defaultValue={value}
        className="w-full rounded-xl border border-ink/10 bg-white px-3 py-2.5 text-sm text-ink outline-none transition focus:border-ink/30"
      />
    </label>
  )
}