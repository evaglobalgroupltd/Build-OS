import {
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Clock3,
  KeyRound,
  Laptop,
  LogOut,
  Monitor,
  RefreshCw,
  Shield,
  ShieldCheck,
  Smartphone,
  SmartphoneNfc,
  Unlock,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'

/**
 * Security — Users module
 *
 * BRD references:
 * - Sec. 15.1 — User Management / MFA / Account Security
 * - Sec. 15.2 — Verification Status Lifecycle
 * - Sec. 20.1 — Compliance / Access Control / Audit Trail
 * - Sec. 22 — User Management & Identity
 * - Sec. 24 — Login / MFA / Device Recognition / Session Timeout
 *
 * Responsibilities:
 * - Manage password
 * - Manage MFA
 * - Review active sessions/devices
 * - Revoke sessions
 * - Display account security posture
 * - Surface recent security activity
 *
 * TODO:
 * - Connect password mutation to authentication API
 * - Connect MFA setup/verification endpoints
 * - Load sessions from backend
 * - Implement session revocation
 * - Add recovery codes
 * - Add server-side security event history
 */

const securityOverview = {
  score: 96,
  password: 'Strong',
  twoFactor: 'Enabled',
  activeSessions: 3,
  lastPasswordChange: '7 days ago',
}

const activeSessions = [
  {
    id: 'current',
    device: 'MacBook Pro',
    browser: 'Chrome',
    location: 'Abuja, Nigeria',
    lastActive: 'Active now',
    current: true,
    icon: Laptop,
  },
  {
    id: 'iphone',
    device: 'iPhone',
    browser: 'Safari',
    location: 'Abuja, Nigeria',
    lastActive: '2 hours ago',
    current: false,
    icon: Smartphone,
  },
  {
    id: 'mac-safari',
    device: 'MacBook Pro',
    browser: 'Safari',
    location: 'Abuja, Nigeria',
    lastActive: 'Yesterday',
    current: false,
    icon: Monitor,
  },
]

const securityEvents = [
  {
    action: 'Successful login',
    description: 'MacBook Pro • Chrome',
    location: 'Abuja, Nigeria',
    time: '2 hours ago',
    icon: ShieldCheck,
  },
  {
    action: 'Password updated',
    description: 'Password credentials were changed',
    location: 'Abuja, Nigeria',
    time: '7 days ago',
    icon: KeyRound,
  },
  {
    action: 'Two-factor authentication enabled',
    description: 'Authenticator-based MFA was activated',
    location: 'Abuja, Nigeria',
    time: '14 days ago',
    icon: SmartphoneNfc,
  },
]

export function Security() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-ink/40">
            <Shield className="h-3.5 w-3.5" />
            Account
          </div>

          <h1 className="text-2xl font-semibold tracking-tight">
            Security
          </h1>

          <p className="mt-1 max-w-2xl text-sm text-ink/50">
            Protect your account, manage authentication methods and control
            where your account is signed in.
          </p>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-success/10 px-3 py-1.5 text-xs font-medium text-success">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Account protected
        </div>
      </div>

      {/* Security Score */}
      <Card>
        <CardBody>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-success/10">
                <ShieldCheck className="h-8 w-8 text-success" />
              </div>

              <div>
                <p className="text-sm font-medium text-ink/50">
                  Security Score
                </p>

                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-3xl font-semibold tracking-tight">
                    {securityOverview.score}%
                  </span>

                  <span className="text-xs font-medium text-success">
                    Excellent
                  </span>
                </div>

                <p className="mt-1 text-xs text-ink/40">
                  Your account has strong security protection enabled.
                </p>
              </div>
            </div>

            <div className="w-full max-w-sm">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs text-ink/45">
                  Protection level
                </span>

                <span className="text-xs font-semibold">
                  {securityOverview.score}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-ink/10">
                <div
                  className="h-full rounded-full bg-success"
                  style={{
                    width: `${securityOverview.score}%`,
                  }}
                />
              </div>

              <div className="mt-2 flex items-center justify-between text-[11px] text-ink/35">
                <span>Needs attention</span>
                <span>Excellent</span>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Security Controls */}
      <div className="grid gap-6 lg:grid-cols-2">
        <SecurityControl
          icon={KeyRound}
          title="Password"
          description="Keep your password strong and up to date."
          status={securityOverview.password}
          statusType="success"
          action="Change password"
        >
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-paper-2 px-3 py-2.5 text-xs text-ink/45">
            <Clock3 className="h-3.5 w-3.5" />
            Last changed {securityOverview.lastPasswordChange}
          </div>
        </SecurityControl>

        <SecurityControl
          icon={SmartphoneNfc}
          title="Two-Factor Authentication"
          description="Add an additional layer of protection when signing in."
          status={securityOverview.twoFactor}
          statusType="success"
          action="Manage MFA"
        >
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-success/10 px-3 py-2.5 text-xs text-success">
            <ShieldCheck className="h-3.5 w-3.5" />
            Authentication protection is active
          </div>
        </SecurityControl>
      </div>

      {/* Password Security */}
      <Card>
        <CardHeader
          title="Password & Authentication"
          subtitle="Manage the credentials and authentication methods used to protect your account."
        />

        <CardBody>
          <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line">
            <SecurityAction
              icon={KeyRound}
              title="Change password"
              description="Update your account password. You may be asked to authenticate again."
              action="Change"
            />

            <SecurityAction
              icon={SmartphoneNfc}
              title="Two-factor authentication"
              description="Use an authenticator app or supported authentication method when signing in."
              action="Manage"
              badge="Enabled"
            />

            <SecurityAction
              icon={RefreshCw}
              title="Recovery options"
              description="Manage backup authentication methods and recovery codes for account access."
              action="Manage"
              badge="Configured"
            />
          </div>
        </CardBody>
      </Card>

      {/* Active Sessions */}
      <Card>
        <CardHeader
          title="Active Sessions"
          subtitle="Review the devices currently signed in to your Build OS account."
        />

        <CardBody>
          <div className="mb-4 flex items-start gap-3 rounded-2xl border border-line bg-paper-2 p-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-background">
              <Laptop className="h-4 w-4 text-ink/50" />
            </div>

            <div>
              <p className="text-sm font-medium">
                {securityOverview.activeSessions} active devices
              </p>

              <p className="mt-1 text-xs leading-5 text-ink/45">
                If you don't recognize a session, revoke it immediately and
                change your password.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {activeSessions.map((session) => (
              <SessionRow
                key={session.id}
                {...session}
              />
            ))}
          </div>

          <div className="mt-5 flex justify-end">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-line px-4 py-2.5 text-sm font-medium transition hover:bg-paper-2"
            >
              <LogOut className="h-4 w-4" />
              Sign out all other devices
            </button>
          </div>
        </CardBody>
      </Card>

      {/* Login Protection */}
      <Card>
        <CardHeader
          title="Login Protection"
          subtitle="Additional controls that help protect your account from unauthorized access."
        />

        <CardBody>
          <div className="grid gap-3 md:grid-cols-2">
            <ProtectionRow
              icon={ShieldCheck}
              title="Login verification"
              description="Require additional verification when a login requires extra protection."
              enabled
            />

            <ProtectionRow
              icon={Monitor}
              title="Device recognition"
              description="Recognize trusted devices and monitor unfamiliar sign-ins."
              enabled
            />

            <ProtectionRow
              icon={Clock3}
              title="Session timeout"
              description="Automatically expire inactive sessions to reduce account exposure."
              enabled
            />

            <ProtectionRow
              icon={Unlock}
              title="Suspicious login protection"
              description="Additional security controls may be triggered for unusual activity."
              enabled
            />
          </div>
        </CardBody>
      </Card>

      {/* Security Activity */}
      <Card>
        <CardHeader
          title="Recent Security Activity"
          subtitle="A record of recent authentication and account security events."
        />

        <CardBody>
          <div className="space-y-3">
            {securityEvents.map((event) => (
              <SecurityEvent
                key={`${event.action}-${event.time}`}
                {...event}
              />
            ))}
          </div>

          <button
            type="button"
            className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-ink transition hover:opacity-60"
          >
            View full security history
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </CardBody>
      </Card>

      {/* Security Warning */}
      <Card>
        <CardBody>
          <div className="flex flex-col gap-4 rounded-2xl border border-warning/20 bg-warning/5 p-4 sm:flex-row sm:items-start">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-warning/10">
              <AlertTriangle className="h-4 w-4 text-warning" />
            </div>

            <div>
              <h3 className="text-sm font-semibold">
                Keep your account secure
              </h3>

              <p className="mt-1 max-w-3xl text-xs leading-5 text-ink/50">
                Never share your password, authentication codes or recovery
                credentials. Build OS will never ask you to provide these
                details through an unsolicited message.
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

function SecurityControl({
  icon: Icon,
  title,
  description,
  status,
  statusType,
  action,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  status: string
  statusType: 'success' | 'neutral'
  action: string
  children?: React.ReactNode
}) {
  return (
    <Card>
      <CardBody>
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-paper-2">
            <Icon className="h-5 w-5 text-ink/50" />
          </div>

          <span
            className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
              statusType === 'success'
                ? 'bg-success/10 text-success'
                : 'bg-ink/5 text-ink/50'
            }`}
          >
            {status}
          </span>
        </div>

        <h3 className="mt-4 text-sm font-semibold">
          {title}
        </h3>

        <p className="mt-1 text-xs leading-5 text-ink/45">
          {description}
        </p>

        {children}

        <button
          type="button"
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-ink transition hover:opacity-60"
        >
          {action}
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </CardBody>
    </Card>
  )
}

function SecurityAction({
  icon: Icon,
  title,
  description,
  action,
  badge,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  action: string
  badge?: string
}) {
  return (
    <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-paper-2">
          <Icon className="h-4 w-4 text-ink/50" />
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-medium">
              {title}
            </h3>

            {badge && (
              <span className="rounded-full bg-success/10 px-2 py-0.5 text-[9px] font-semibold text-success">
                {badge}
              </span>
            )}
          </div>

          <p className="mt-1 max-w-2xl text-xs leading-5 text-ink/45">
            {description}
          </p>
        </div>
      </div>

      <button
        type="button"
        className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl border border-line px-3.5 py-2 text-xs font-medium transition hover:bg-paper-2"
      >
        {action}
        <ChevronRight className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}

function SessionRow({
  device,
  browser,
  location,
  lastActive,
  current,
  icon: Icon,
}: {
  device: string
  browser: string
  location: string
  lastActive: string
  current: boolean
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-line p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-paper-2">
          <Icon className="h-5 w-5 text-ink/50" />
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-medium">
              {device}
            </h3>

            {current && (
              <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[9px] font-semibold text-success">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                This device
              </span>
            )}
          </div>

          <p className="mt-1 text-xs text-ink/45">
            {browser} · {location}
          </p>

          <p className="mt-1 text-[11px] text-ink/35">
            {lastActive}
          </p>
        </div>
      </div>

      {!current && (
        <button
          type="button"
          className="inline-flex w-fit items-center gap-1.5 rounded-xl border border-line px-3 py-2 text-xs font-medium transition hover:bg-paper-2"
        >
          <LogOut className="h-3.5 w-3.5" />
          Revoke session
        </button>
      )}
    </div>
  )
}

function ProtectionRow({
  icon: Icon,
  title,
  description,
  enabled,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  enabled: boolean
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-paper-2 p-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-background">
        <Icon className="h-4 w-4 text-ink/50" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-sm font-medium">
            {title}
          </h3>

          <div
            className={`h-5 w-9 shrink-0 rounded-full p-0.5 ${
              enabled ? 'bg-ink' : 'bg-ink/15'
            }`}
          >
            <div
              className={`h-4 w-4 rounded-full bg-white transition-transform ${
                enabled ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </div>
        </div>

        <p className="mt-1 text-xs leading-5 text-ink/45">
          {description}
        </p>
      </div>
    </div>
  )
}

function SecurityEvent({
  action,
  description,
  location,
  time,
  icon: Icon,
}: {
  action: string
  description: string
  location: string
  time: string
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-line p-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-paper-2">
        <Icon className="h-4 w-4 text-ink/50" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <h3 className="text-sm font-medium">
            {action}
          </h3>

          <span className="text-[11px] text-ink/35">
            {time}
          </span>
        </div>

        <p className="mt-1 text-xs text-ink/45">
          {description}
        </p>

        <p className="mt-1 text-[11px] text-ink/35">
          {location}
        </p>
      </div>
    </div>
  )
}