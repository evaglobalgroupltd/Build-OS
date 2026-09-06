import {
  Bell,
  Globe,
  KeyRound,
  Laptop,
  Lock,
  Mail,
  Moon,
  Shield,
  Smartphone,
  User,
  CheckCircle2,
  AlertTriangle,
  Fingerprint,
  Save,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'

const securityEvents = [
  {
    action: 'Successful Login',
    device: 'MacBook Pro • Chrome',
    location: 'Abuja, Nigeria',
    time: '2 hours ago',
  },
  {
    action: 'Password Updated',
    device: 'MacBook Pro',
    location: 'Abuja, Nigeria',
    time: '7 days ago',
  },
  {
    action: 'Two-Factor Authentication Enabled',
    device: 'iPhone',
    location: 'Abuja, Nigeria',
    time: '14 days ago',
  },
]

export function AccountSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader
          title="Account Settings"
          subtitle="Manage your profile, security, notifications and platform preferences"
        />

        <CardBody>
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-ink/5">
              <User className="h-8 w-8 text-ink/50" />
            </div>

            <div>
              <h2 className="text-lg font-semibold">
                Ahmed Muhammed
              </h2>

              <p className="text-sm text-ink/50">
                CEO • Hamd Tech Ltd
              </p>

              <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-success/10 px-3 py-1 text-xs font-medium">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Verified Account
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader
            title="Profile Information"
            subtitle="Personal account details"
          />

          <CardBody>
            <div className="space-y-4">
              <SettingField
                label="Full Name"
                value="Ahmed Muhammed"
              />

              <SettingField
                label="Email Address"
                value="ahmed@example.com"
              />

              <SettingField
                label="Phone Number"
                value="+234 XXX XXX XXXX"
              />

              <SettingField
                label="Role"
                value="Client Administrator"
              />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Security Status"
            subtitle="Authentication and account protection"
          />

          <CardBody>
            <div className="space-y-3">
              <SettingMetric
                icon={Shield}
                label="Security Score"
                value="96%"
              />

              <SettingMetric
                icon={Fingerprint}
                label="2FA Status"
                value="Enabled"
              />

              <SettingMetric
                icon={KeyRound}
                label="Password Strength"
                value="Strong"
              />

              <SettingMetric
                icon={Laptop}
                label="Active Devices"
                value="3"
              />
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Card>
          <CardHeader
            title="Notifications"
            subtitle="Communication preferences"
          />

          <CardBody>
            <div className="space-y-4">
              <ToggleRow
                icon={Bell}
                title="Project Updates"
                enabled
              />

              <ToggleRow
                icon={Mail}
                title="Email Notifications"
                enabled
              />

              <ToggleRow
                icon={Smartphone}
                title="SMS Alerts"
              />

              <ToggleRow
                icon={AlertTriangle}
                title="Risk Alerts"
                enabled
              />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Privacy"
            subtitle="Data visibility and access"
          />

          <CardBody>
            <div className="space-y-4">
              <ToggleRow
                icon={Lock}
                title="Profile Visibility"
                enabled
              />

              <ToggleRow
                icon={Shield}
                title="Security Notifications"
                enabled
              />

              <ToggleRow
                icon={Fingerprint}
                title="Login Verification"
                enabled
              />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Preferences"
            subtitle="Personalization settings"
          />

          <CardBody>
            <div className="space-y-3">
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
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader
          title="Recent Security Activity"
          subtitle="Recent logins and security events"
        />

        <CardBody>
          <div className="space-y-4">
            {securityEvents.map((event) => (
              <div
                key={`${event.action}-${event.time}`}
                className="rounded-xl border border-line p-4"
              >
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h3 className="font-medium">
                      {event.action}
                    </h3>

                    <p className="mt-1 text-sm text-ink/50">
                      {event.device}
                    </p>

                    <p className="text-xs text-ink/40">
                      {event.location}
                    </p>
                  </div>

                  <span className="text-xs text-ink/45">
                    {event.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <div className="flex justify-end">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3 text-sm font-medium text-white"
            >
              <Save className="h-4 w-4" />
              Save Changes
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

function SettingMetric({
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

function SettingField({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-ink/40">
        {label}
      </label>

      <input
        value={value}
        readOnly
        className="w-full rounded-xl border border-line bg-background px-3 py-2"
      />
    </div>
  )
}

function ToggleRow({
  icon: Icon,
  title,
  enabled = false,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  enabled?: boolean
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-paper-2 p-3">
      <div className="flex items-center gap-3">
        <Icon className="h-4 w-4 text-ink/50" />
        <span className="text-sm font-medium">
          {title}
        </span>
      </div>

      <div
        className={`h-6 w-11 rounded-full transition ${
          enabled ? 'bg-ink' : 'bg-ink/15'
        }`}
      />
    </div>
  )
}