import { useState } from 'react'
import {
  Bell,
  Check,
  ChevronRight,
  Clock3,
  Mail,
  MessageSquare,
  ShieldAlert,
  Smartphone,
  Wallet,
  ClipboardCheck,
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
    description:
      'Progress, milestones, approvals and important project activity.',
    icon: ClipboardCheck,
    email: true,
    push: true,
    sms: false,
  },
  {
    id: 'risk',
    title: 'Risk Alerts',
    description:
      'Budget, schedule, quality and other project risk warnings.',
    icon: ShieldAlert,
    email: true,
    push: true,
    sms: true,
  },
  {
    id: 'payments',
    title: 'Payments & Escrow',
    description:
      'Payment confirmations, releases, funding and transaction activity.',
    icon: Wallet,
    email: true,
    push: true,
    sms: true,
  },
  {
    id: 'deadlines',
    title: 'Deadlines & Reminders',
    description:
      'Upcoming milestones, required actions and overdue activities.',
    icon: Clock3,
    email: true,
    push: true,
    sms: false,
  },
  {
    id: 'team',
    title: 'Team Activity',
    description:
      'Messages, assignments, mentions and collaboration updates.',
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

  const enabledChannelCount = preferences.reduce(
    (total, preference) =>
      total +
      Number(preference.email) +
      Number(preference.push) +
      Number(preference.sms),
    0,
  )

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
    const enabled = preferences.some(
      (preference) => preference[channel],
    )

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

    // Replace with the notifications/preferences API call
    // when the backend is connected.
    await new Promise((resolve) => setTimeout(resolve, 500))

    setSaving(false)
    setSaved(true)
  }

  return (
    <div className="space-y-8">
      {/* ------------------------------------------------------------------ */}
      {/* Hero                                                               */}
      {/* ------------------------------------------------------------------ */}

      <section className="relative overflow-hidden rounded-[24px] border border-ink/[0.07] bg-white px-6 py-7 shadow-[0_18px_50px_rgba(20,40,30,0.07)] sm:px-8 sm:py-8">
        <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#12613E]/[0.07] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 left-1/3 h-56 w-56 rounded-full bg-[#B85C12]/[0.045] blur-3xl" />

        <div className="relative flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#12613E]/10 bg-[#12613E]/[0.045] px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#12613E]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#12613E]" />
                Account preferences
              </span>

              {saved && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#12613E]/[0.07] px-2.5 py-1.5 text-[10px] font-semibold text-[#12613E]">
                  <Check className="h-3 w-3" />
                  Changes saved
                </span>
              )}
            </div>

            <h1 className="mt-5 font-display text-3xl font-semibold tracking-[-0.04em] text-[#18271F] sm:text-4xl">
              Notification settings
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-ink/50 sm:text-[15px]">
              Control how Build OS keeps you informed about projects, risks,
              payments, deadlines and collaboration activity.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-ink/40">
              <HeroMeta
                label="Channels"
                value={`${enabledChannelCount} active`}
              />
              <HeroMeta
                label="Delivery"
                value={
                  frequency === 'instant'
                    ? 'Instant'
                    : frequency === 'daily'
                      ? 'Daily digest'
                      : 'Weekly digest'
                }
              />
              <HeroMeta
                label="Quiet hours"
                value={quietHours ? 'Enabled' : 'Off'}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="group inline-flex h-11 shrink-0 items-center justify-center gap-2.5 rounded-xl bg-[#18271F] px-5 text-xs font-semibold text-white shadow-[0_12px_28px_rgba(24,39,31,0.14)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#12613E] disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0"
          >
            {saving ? (
              'Saving changes…'
            ) : (
              <>
                Save changes
                <ChevronRight className="h-3.5 w-3.5 opacity-50 transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </button>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Channel configuration                                               */}
      {/* ------------------------------------------------------------------ */}

      <section className="overflow-hidden rounded-[22px] border border-ink/[0.07] bg-white shadow-[0_14px_40px_rgba(20,40,30,0.05)]">
        <SectionHeader
          icon={Settings2}
          eyebrow="Delivery"
          title="Notification channels"
          description="Choose where each category of Build OS activity should be delivered."
        />

        {/* Desktop matrix header */}
        <div className="hidden border-y border-ink/[0.06] bg-[#F8FAF8] px-6 py-3.5 md:grid md:grid-cols-[minmax(0,1fr)_96px_96px_96px] md:items-center">
          <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.17em] text-ink/30">
            Notification category
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

        <div className="divide-y divide-ink/[0.06]">
          {preferences.map((preference) => {
            const Icon = preference.icon

            return (
              <div
                key={preference.id}
                className="group px-5 py-5 transition hover:bg-ink/[0.012] sm:px-6"
              >
                <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_96px_96px_96px] md:items-center">
                  <div className="flex min-w-0 items-start gap-3.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] bg-[#12613E]/[0.055] text-[#12613E] transition duration-200 group-hover:bg-[#12613E]/[0.09]">
                      <Icon className="h-[17px] w-[17px]" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-semibold tracking-[-0.01em] text-[#18271F]">
                          {preference.title}
                        </h3>

                        {preference.id === 'risk' && (
                          <span className="rounded-full bg-rose-50 px-2 py-0.5 font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-rose-700">
                            Priority
                          </span>
                        )}
                      </div>

                      <p className="mt-1 max-w-xl text-xs leading-5 text-ink/45">
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

        <div className="border-t border-ink/[0.06] bg-[#F8FAF8] px-5 py-4 sm:px-6">
          <p className="text-xs leading-5 text-ink/40">
            Channel changes affect future notifications. Critical security,
            payment and risk events may still be delivered through required
            channels.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Frequency                                                           */}
      {/* ------------------------------------------------------------------ */}

      <section className="overflow-hidden rounded-[22px] border border-ink/[0.07] bg-white shadow-[0_14px_40px_rgba(20,40,30,0.045)]">
        <SectionHeader
          icon={Clock3}
          eyebrow="Cadence"
          title="Notification frequency"
          description="Decide how often non-critical activity is delivered."
        />

        <div className="divide-y divide-ink/[0.06]">
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
                className={`group flex w-full items-center gap-4 px-5 py-5 text-left transition sm:px-6 ${
                  selected
                    ? 'bg-[#12613E]/[0.025]'
                    : 'hover:bg-ink/[0.012]'
                }`}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition ${
                    selected
                      ? 'border-[#12613E] bg-[#12613E]'
                      : 'border-ink/15 bg-white group-hover:border-ink/30'
                  }`}
                >
                  {selected && (
                    <span className="h-2 w-2 rounded-full bg-white" />
                  )}
                </span>

                <span className="min-w-0 flex-1">
                  <span
                    className={`block text-sm font-semibold ${
                      selected ? 'text-[#18271F]' : 'text-ink/75'
                    }`}
                  >
                    {option.label}
                  </span>

                  <span className="mt-1 block max-w-2xl text-xs leading-5 text-ink/40">
                    {option.description}
                  </span>
                </span>

                <ChevronRight
                  className={`hidden h-4 w-4 shrink-0 transition sm:block ${
                    selected
                      ? 'text-[#12613E]'
                      : 'text-ink/15 group-hover:text-ink/30'
                  }`}
                />
              </button>
            )
          })}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Quiet hours                                                         */}
      {/* ------------------------------------------------------------------ */}

      <section className="overflow-hidden rounded-[22px] border border-ink/[0.07] bg-white shadow-[0_14px_40px_rgba(20,40,30,0.045)]">
        <div className="flex items-start justify-between gap-5 px-5 py-5 sm:px-6">
          <div className="flex min-w-0 items-start gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] bg-[#B85C12]/[0.07] text-[#B85C12]">
              <Clock3 className="h-[17px] w-[17px]" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-sm font-semibold text-[#18271F]">
                  Quiet hours
                </h2>

                <span
                  className={`rounded-full px-2 py-0.5 font-mono text-[8px] font-semibold uppercase tracking-[0.12em] ${
                    quietHours
                      ? 'bg-[#12613E]/[0.07] text-[#12613E]'
                      : 'bg-ink/[0.04] text-ink/35'
                  }`}
                >
                  {quietHours ? 'Active' : 'Off'}
                </span>
              </div>

              <p className="mt-1.5 max-w-2xl text-xs leading-5 text-ink/45">
                Reduce non-critical notifications during your selected quiet
                period. Critical risk, security and payment alerts may still
                be delivered.
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
          <div className="border-t border-ink/[0.06] bg-[#F8FAF8] px-5 py-5 sm:px-6">
            <div className="mb-4">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-ink/30">
                Quiet period
              </p>

              <p className="mt-1 text-xs text-ink/40">
                Notifications outside critical events will be suppressed
                during this window.
              </p>
            </div>

            <div className="grid max-w-xl gap-4 sm:grid-cols-2">
              <TimeInput label="Start" value="22:00" />
              <TimeInput label="End" value="07:00" />
            </div>
          </div>
        )}
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Important notice                                                    */}
      {/* ------------------------------------------------------------------ */}

      <div className="flex items-start gap-3.5 rounded-[18px] border border-amber-500/15 bg-amber-500/[0.045] px-5 py-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-700">
          <ShieldAlert className="h-4 w-4" />
        </div>

        <div>
          <p className="text-xs font-semibold text-amber-950">
            Critical notifications remain protected
          </p>

          <p className="mt-1 text-xs leading-5 text-amber-950/55">
            Build OS may deliver critical security, payment, compliance and
            high-severity project risk alerts regardless of general delivery
            preferences.
          </p>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Mobile action                                                       */}
      {/* ------------------------------------------------------------------ */}

      <div className="flex justify-end md:hidden">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="w-full rounded-xl bg-[#18271F] px-4 py-3 text-xs font-semibold text-white shadow-[0_10px_24px_rgba(24,39,31,0.12)] transition hover:bg-[#12613E] disabled:cursor-not-allowed disabled:opacity-45"
        >
          {saving ? 'Saving changes…' : 'Save changes'}
        </button>
      </div>

      <div className="flex justify-end border-t border-ink/[0.06] pt-5">
        <span className="rounded-full bg-ink/[0.04] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.13em] text-ink/30">
          Notification preferences
        </span>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Supporting components                                                      */
/* -------------------------------------------------------------------------- */

function HeroMeta({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink/30">
        {label}
      </span>

      <span className="font-medium text-ink/60">{value}</span>
    </div>
  )
}

function SectionHeader({
  icon: Icon,
  eyebrow,
  title,
  description,
}: {
  icon: React.ElementType
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <div className="border-b border-ink/[0.06] px-5 py-5 sm:px-6">
      <div className="flex items-start gap-3.5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] bg-ink/[0.035] text-ink/55">
          <Icon className="h-[17px] w-[17px]" />
        </div>

        <div>
          <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.17em] text-ink/30">
            {eyebrow}
          </p>

          <h2 className="mt-1 text-sm font-semibold tracking-[-0.01em] text-[#18271F]">
            {title}
          </h2>

          <p className="mt-1 text-xs leading-5 text-ink/40">
            {description}
          </p>
        </div>
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
      className="group flex items-center justify-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-ink/35 transition hover:text-[#12613E]"
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
    <div className="flex items-center justify-between gap-4 md:justify-center">
      <span className="flex items-center gap-2 text-xs text-ink/40 md:hidden">
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
      className={`relative h-6 w-11 shrink-0 rounded-full transition duration-200 ${
        checked
          ? 'bg-[#12613E] shadow-[0_4px_12px_rgba(18,97,62,0.18)]'
          : 'bg-ink/[0.10]'
      }`}
    >
      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-[0_1px_4px_rgba(0,0,0,0.16)] transition-all duration-200 ${
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
      <span className="mb-1.5 block font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-ink/35">
        {label}
      </span>

      <input
        type="time"
        defaultValue={value}
        className="w-full rounded-xl border border-ink/[0.09] bg-white px-3.5 py-2.5 text-sm font-medium text-[#18271F] outline-none transition placeholder:text-ink/25 hover:border-ink/15 focus:border-[#12613E]/35 focus:ring-2 focus:ring-[#12613E]/[0.06]"
      />
    </label>
  )
}