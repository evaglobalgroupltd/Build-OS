import { useState, type ComponentType } from 'react'
import {
  AlertTriangle,
  Bell,
  Check,
  CheckCircle2,
  Fingerprint,
  Globe,
  KeyRound,
  Laptop,
  Lock,
  Mail,
  Moon,
  Save,
  Shield,
  Smartphone,
  User,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'

const securityEvents = [
  {
    action: 'Successful Login',
    device: 'MacBook Pro • Chrome',
    location: 'Abuja, Nigeria',
    time: '2 hours ago',
    type: 'login',
  },
  {
    action: 'Password Updated',
    device: 'MacBook Pro',
    location: 'Abuja, Nigeria',
    time: '7 days ago',
    type: 'security',
  },
  {
    action: 'Two-Factor Authentication Enabled',
    device: 'iPhone',
    location: 'Abuja, Nigeria',
    time: '14 days ago',
    type: 'security',
  },
] as const

export function AccountSettings() {
  const [preferences, setPreferences] = useState({
    projectUpdates: true,
    emailNotifications: true,
    smsAlerts: false,
    riskAlerts: true,
    profileVisibility: true,
    securityNotifications: true,
    loginVerification: true,
  })

  const [saved, setSaved] = useState(false)

  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences((current) => ({
      ...current,
      [key]: !current[key],
    }))

    setSaved(false)
  }

  const handleSave = () => {
    setSaved(true)
  }

  return (
    <div className="space-y-8">
      {/* ------------------------------------------------------------------ */}
      {/* Hero */}
      {/* ------------------------------------------------------------------ */}

      <section className="relative overflow-hidden rounded-[24px] border border-ink/[0.07] bg-white px-6 py-7 shadow-[0_18px_50px_rgba(20,40,30,0.08)] sm:px-8 sm:py-8">
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#12613E]/[0.07] blur-3xl" />
        <div className="pointer-events-none absolute bottom-[-80px] left-1/3 h-48 w-48 rounded-full bg-[#B85C12]/[0.05] blur-3xl" />

        <div className="relative flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#12613E]/[0.08] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#12613E]">
                Account centre
              </span>

              <span className="rounded-full border border-ink/[0.07] bg-white px-3 py-1.5 text-[11px] font-medium text-ink/50">
                Personal settings
              </span>
            </div>

            <h1 className="font-display text-3xl font-semibold tracking-[-0.04em] text-ink sm:text-4xl">
              Account settings.
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/55 sm:text-[15px]">
              Manage your account identity, security posture, communication
              preferences and personal platform experience from one secure
              workspace.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:flex sm:items-center">
            <HeroMeta
              label="Security"
              value="96%"
            />

            <HeroMeta
              label="2FA"
              value="Enabled"
            />

            <HeroMeta
              label="Devices"
              value="3"
            />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Identity + Security */}
      {/* ------------------------------------------------------------------ */}

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader
            title="Account identity"
            subtitle="Your primary Build OS account information"
          />

          <CardBody>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-[20px] bg-[#12613E]/[0.08]">
                  <User className="h-7 w-7 text-[#12613E]" />

                  <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[#12613E] text-white">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                </div>

                <div>
                  <h2 className="text-lg font-semibold tracking-[-0.02em] text-ink">
                    Ahmed Muhammed
                  </h2>

                  <p className="mt-1 text-sm text-ink/50">
                    CEO • Hamd Tech Ltd
                  </p>

                  <div className="mt-2 flex items-center gap-2 text-xs font-medium text-[#12613E]">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Verified account
                  </div>
                </div>
              </div>

              <div className="rounded-[16px] border border-[#12613E]/10 bg-[#12613E]/[0.04] px-4 py-3 sm:min-w-[150px]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/35">
                  Account status
                </p>

                <p className="mt-1.5 text-sm font-semibold text-[#12613E]">
                  Active & protected
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Security posture"
            subtitle="Authentication and account protection"
          />

          <CardBody>
            <div className="grid gap-2">
              <SettingMetric
                icon={Shield}
                label="Security score"
                value="96%"
                accent="green"
              />

              <SettingMetric
                icon={Fingerprint}
                label="Two-factor authentication"
                value="Enabled"
                accent="green"
              />

              <SettingMetric
                icon={KeyRound}
                label="Password strength"
                value="Strong"
                accent="bronze"
              />

              <SettingMetric
                icon={Laptop}
                label="Active devices"
                value="3"
              />
            </div>
          </CardBody>
        </Card>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Profile */}
      {/* ------------------------------------------------------------------ */}

      <Card>
        <CardHeader
          title="Profile information"
          subtitle="Personal details associated with your account"
        />

        <CardBody>
          <div className="grid gap-5 md:grid-cols-2">
            <SettingField
              label="Full name"
              value="Ahmed Muhammed"
            />

            <SettingField
              label="Email address"
              value="ahmed@example.com"
            />

            <SettingField
              label="Phone number"
              value="+234 XXX XXX XXXX"
            />

            <SettingField
              label="Role"
              value="Client Administrator"
            />
          </div>

          <div className="mt-5 flex items-start gap-3 rounded-[16px] border border-ink/[0.06] bg-paper-2 p-4">
            <Shield className="mt-0.5 h-4 w-4 shrink-0 text-[#12613E]" />

            <p className="text-xs leading-5 text-ink/50">
              Identity and role information may be controlled by your
              organization administrator and cannot always be changed from
              personal settings.
            </p>
          </div>
        </CardBody>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* Preferences */}
      {/* ------------------------------------------------------------------ */}

      <div className="grid gap-6 xl:grid-cols-3">
        <PreferenceCard
          title="Notifications"
          subtitle="Communication preferences"
        >
          <ToggleRow
            icon={Bell}
            title="Project updates"
            description="Milestones and project activity"
            enabled={preferences.projectUpdates}
            onToggle={() => togglePreference('projectUpdates')}
          />

          <ToggleRow
            icon={Mail}
            title="Email notifications"
            description="Important platform activity"
            enabled={preferences.emailNotifications}
            onToggle={() => togglePreference('emailNotifications')}
          />

          <ToggleRow
            icon={Smartphone}
            title="SMS alerts"
            description="Critical alerts by SMS"
            enabled={preferences.smsAlerts}
            onToggle={() => togglePreference('smsAlerts')}
          />

          <ToggleRow
            icon={AlertTriangle}
            title="Risk alerts"
            description="Project risks and exceptions"
            enabled={preferences.riskAlerts}
            onToggle={() => togglePreference('riskAlerts')}
            accent
          />
        </PreferenceCard>

        <PreferenceCard
          title="Privacy & access"
          subtitle="Data visibility and verification"
        >
          <ToggleRow
            icon={Lock}
            title="Profile visibility"
            description="Allow organization members to view your profile"
            enabled={preferences.profileVisibility}
            onToggle={() => togglePreference('profileVisibility')}
          />

          <ToggleRow
            icon={Shield}
            title="Security notifications"
            description="Receive account security events"
            enabled={preferences.securityNotifications}
            onToggle={() => togglePreference('securityNotifications')}
          />

          <ToggleRow
            icon={Fingerprint}
            title="Login verification"
            description="Require additional sign-in verification"
            enabled={preferences.loginVerification}
            onToggle={() => togglePreference('loginVerification')}
          />
        </PreferenceCard>

        <Card>
          <CardHeader
            title="Preferences"
            subtitle="Personalization and regional settings"
          />

          <CardBody>
            <div className="space-y-2">
              <SettingMetric
                icon={Globe}
                label="Language"
                value="English"
              />

              <SettingMetric
                icon={Moon}
                label="Theme"
                value="System"
              />

              <SettingMetric
                icon={Globe}
                label="Timezone"
                value="Africa/Lagos"
              />
            </div>

            <div className="mt-5 rounded-[16px] border border-ink/[0.06] bg-paper-2 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/35">
                Regional preference
              </p>

              <p className="mt-2 text-sm font-medium text-ink">
                Africa/Lagos
              </p>

              <p className="mt-1 text-xs leading-5 text-ink/45">
                Dates, deadlines and scheduled platform activity use this
                timezone.
              </p>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Security activity */}
      {/* ------------------------------------------------------------------ */}

      <Card>
        <CardHeader
          title="Recent security activity"
          subtitle="Recent authentication and account security events"
        />

        <CardBody>
          <div className="divide-y divide-ink/[0.06]">
            {securityEvents.map((event) => (
              <SecurityEventRow
                key={`${event.action}-${event.time}`}
                action={event.action}
                device={event.device}
                location={event.location}
                time={event.time}
                type={event.type}
              />
            ))}
          </div>

          <div className="mt-5 flex items-start gap-3 rounded-[16px] border border-[#B85C12]/10 bg-[#B85C12]/[0.04] p-4">
            <Shield className="mt-0.5 h-4 w-4 shrink-0 text-[#B85C12]" />

            <div>
              <p className="text-sm font-semibold text-ink">
                Protect your account
              </p>

              <p className="mt-1 text-xs leading-5 text-ink/50">
                If you do not recognize an activity, review your active
                sessions and update your password immediately.
              </p>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* Save */}
      {/* ------------------------------------------------------------------ */}

      <div className="sticky bottom-4 z-10">
        <div className="flex flex-col gap-3 rounded-[20px] border border-ink/[0.07] bg-white/95 p-4 shadow-[0_18px_50px_rgba(20,40,30,0.12)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#12613E]/[0.08]">
              {saved ? (
                <CheckCircle2 className="h-4 w-4 text-[#12613E]" />
              ) : (
                <Shield className="h-4 w-4 text-[#12613E]" />
              )}
            </div>

            <div>
              <p className="text-sm font-semibold text-ink">
                {saved ? 'Changes saved' : 'Account preferences'}
              </p>

              <p className="text-xs text-ink/45">
                {saved
                  ? 'Your preferences have been updated.'
                  : 'Review your preferences before saving.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#18271F] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(24,39,31,0.16)] transition hover:-translate-y-0.5 hover:bg-[#12613E] focus:outline-none focus:ring-2 focus:ring-[#12613E]/30 focus:ring-offset-2"
          >
            {saved ? (
              <Check className="h-4 w-4" />
            ) : (
              <Save className="h-4 w-4" />
            )}

            {saved ? 'Saved' : 'Save changes'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// Supporting components
// ============================================================================

function HeroMeta({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="min-w-0 rounded-[16px] border border-ink/[0.07] bg-paper-2 px-4 py-3 sm:min-w-[100px]">
      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/35">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-ink">
        {value}
      </p>
    </div>
  )
}

function SettingMetric({
  icon: Icon,
  label,
  value,
  accent = 'neutral',
}: {
  icon: ComponentType<{ className?: string }>
  label: string
  value: string
  accent?: 'green' | 'bronze' | 'neutral'
}) {
  const iconClass =
    accent === 'green'
      ? 'bg-[#12613E]/[0.08] text-[#12613E]'
      : accent === 'bronze'
        ? 'bg-[#B85C12]/[0.08] text-[#B85C12]'
        : 'bg-ink/[0.05] text-ink/45'

  return (
    <div className="flex items-center justify-between gap-4 rounded-[16px] border border-ink/[0.05] bg-paper-2 p-3.5">
      <div className="flex min-w-0 items-center gap-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
        >
          <Icon className="h-4 w-4" />
        </div>

        <span className="text-sm text-ink/60">
          {label}
        </span>
      </div>

      <span className="shrink-0 text-sm font-semibold text-ink">
        {value}
      </span>
    </div>
  )
}

function SettingField({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div>
      <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/40">
        {label}
      </label>

      <input
        value={value}
        readOnly
        className="w-full rounded-[14px] border border-ink/[0.07] bg-paper-2 px-4 py-3 text-sm font-medium text-ink outline-none"
      />
    </div>
  )
}

function PreferenceCard({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <Card>
      <CardHeader
        title={title}
        subtitle={subtitle}
      />

      <CardBody>
        <div className="space-y-2">
          {children}
        </div>
      </CardBody>
    </Card>
  )
}

function ToggleRow({
  icon: Icon,
  title,
  description,
  enabled = false,
  onToggle,
  accent = false,
}: {
  icon: ComponentType<{ className?: string }>
  title: string
  description: string
  enabled?: boolean
  onToggle: () => void
  accent?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={enabled}
      className="group flex w-full items-center justify-between gap-4 rounded-[16px] border border-transparent bg-paper-2 p-3.5 text-left transition hover:border-ink/[0.07] hover:bg-white"
    >
      <span className="flex min-w-0 items-center gap-3">
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
            accent
              ? 'bg-[#B85C12]/[0.08] text-[#B85C12]'
              : enabled
                ? 'bg-[#12613E]/[0.08] text-[#12613E]'
                : 'bg-ink/[0.05] text-ink/40'
          }`}
        >
          <Icon className="h-4 w-4" />
        </span>

        <span className="min-w-0">
          <span className="block text-sm font-medium text-ink">
            {title}
          </span>

          <span className="mt-0.5 block text-[11px] leading-4 text-ink/40">
            {description}
          </span>
        </span>
      </span>

      <span
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          enabled ? 'bg-[#12613E]' : 'bg-ink/15'
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </span>
    </button>
  )
}

function SecurityEventRow({
  action,
  device,
  location,
  time,
  type,
}: {
  action: string
  device: string
  location: string
  time: string
  type: 'login' | 'security'
}) {
  return (
    <div className="flex flex-col gap-4 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#12613E]/[0.07] text-[#12613E]">
          {type === 'login' ? (
            <Laptop className="h-4 w-4" />
          ) : (
            <Shield className="h-4 w-4" />
          )}
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-semibold text-ink">
              {action}
            </h3>

            <span className="rounded-full bg-[#12613E]/[0.07] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#12613E]">
              Verified
            </span>
          </div>

          <p className="mt-1 text-xs text-ink/50">
            {device}
          </p>

          <p className="mt-0.5 text-[11px] text-ink/35">
            {location}
          </p>
        </div>
      </div>

      <span className="shrink-0 text-xs font-medium text-ink/40 sm:text-right">
        {time}
      </span>
    </div>
  )
}