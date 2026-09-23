import type { ComponentType, ReactNode } from 'react'

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
    <div className="space-y-8">
      {/* ------------------------------------------------------------------ */}
      {/* Hero                                                               */}
      {/* ------------------------------------------------------------------ */}

      <section className="relative overflow-hidden rounded-[24px] border border-ink/[0.07] bg-white shadow-[0_18px_50px_rgba(20,40,30,0.08)]">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#12613E]/[0.07] blur-3xl" />
        <div className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-[#B85C12]/[0.05] blur-3xl" />

        <div className="relative p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#12613E]/10 bg-[#12613E]/[0.06] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#12613E]">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Account protection
                </span>

                <span className="rounded-full border border-ink/[0.07] bg-paper-2 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/45">
                  Security centre
                </span>
              </div>

              <h1 className="font-display text-3xl font-semibold tracking-[-0.035em] text-ink sm:text-4xl lg:text-[42px]">
                Security & access.
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/50 sm:text-[15px]">
                Manage authentication, trusted devices and account protection
                from one controlled security workspace.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                <HeroMeta
                  icon={ShieldCheck}
                  label="Protection"
                  value="Active"
                />

                <HeroMeta
                  icon={SmartphoneNfc}
                  label="MFA"
                  value="Enabled"
                />

                <HeroMeta
                  icon={Laptop}
                  label="Sessions"
                  value={`${securityOverview.activeSessions} active`}
                />
              </div>
            </div>

            <div className="w-full shrink-0 lg:w-[250px]">
              <div className="rounded-[20px] border border-ink/[0.07] bg-paper-2/70 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/40">
                      Security posture
                    </p>

                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="font-display text-3xl font-semibold tracking-[-0.04em]">
                        {securityOverview.score}
                      </span>

                      <span className="text-xs font-medium text-ink/40">
                        / 100
                      </span>
                    </div>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#12613E]/[0.08]">
                    <ShieldCheck className="h-5 w-5 text-[#12613E]" />
                  </div>
                </div>

                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-ink/[0.08]">
                  <div
                    className="h-full rounded-full bg-[#12613E]"
                    style={{ width: `${securityOverview.score}%` }}
                  />
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[11px] text-ink/40">
                    Protection level
                  </span>

                  <span className="text-[11px] font-semibold text-[#12613E]">
                    Excellent
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Security indicators                                                */}
      {/* ------------------------------------------------------------------ */}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SecurityMetric
          icon={ShieldCheck}
          label="Security score"
          value={`${securityOverview.score}%`}
          detail="Strong protection"
          tone="green"
        />

        <SecurityMetric
          icon={KeyRound}
          label="Password"
          value={securityOverview.password}
          detail={`Changed ${securityOverview.lastPasswordChange}`}
          tone="neutral"
        />

        <SecurityMetric
          icon={SmartphoneNfc}
          label="Two-factor"
          value={securityOverview.twoFactor}
          detail="Authenticator protection"
          tone="green"
        />

        <SecurityMetric
          icon={Laptop}
          label="Active sessions"
          value={String(securityOverview.activeSessions)}
          detail="Recognized devices"
          tone="bronze"
        />
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Security notice                                                    */}
      {/* ------------------------------------------------------------------ */}

      <section className="rounded-[20px] border border-[#12613E]/10 bg-[#12613E]/[0.045] p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#12613E]/[0.09]">
            <ShieldCheck className="h-5 w-5 text-[#12613E]" />
          </div>

          <div>
            <p className="text-sm font-semibold text-ink">
              Your account is currently well protected.
            </p>

            <p className="mt-1 max-w-3xl text-xs leading-5 text-ink/50">
              Two-factor authentication is enabled and all currently active
              sessions are recognized. Continue reviewing security activity
              periodically and revoke any session you do not recognize.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Primary controls                                                   */}
      {/* ------------------------------------------------------------------ */}

      <section>
        <SectionHeading
          eyebrow="Authentication"
          title="Core protection"
          description="The primary authentication controls protecting your account."
        />

        <div className="mt-4 grid gap-5 lg:grid-cols-2">
          <SecurityControl
            icon={KeyRound}
            title="Password"
            description="Keep your password strong and up to date."
            status={securityOverview.password}
            statusType="success"
            action="Change password"
          >
            <div className="mt-5 flex items-center gap-2 rounded-xl border border-ink/[0.06] bg-paper-2 px-3.5 py-3 text-xs text-ink/45">
              <Clock3 className="h-3.5 w-3.5 shrink-0" />
              Last changed {securityOverview.lastPasswordChange}
            </div>
          </SecurityControl>

          <SecurityControl
            icon={SmartphoneNfc}
            title="Two-factor authentication"
            description="Add an additional layer of protection whenever your account is accessed."
            status={securityOverview.twoFactor}
            statusType="success"
            action="Manage MFA"
          >
            <div className="mt-5 flex items-center gap-2 rounded-xl border border-[#12613E]/10 bg-[#12613E]/[0.055] px-3.5 py-3 text-xs text-[#12613E]">
              <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
              Authentication protection is active
            </div>
          </SecurityControl>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Password & authentication                                          */}
      {/* ------------------------------------------------------------------ */}

      <Card>
        <CardHeader
          title="Password & authentication"
          subtitle="Manage the credentials and authentication methods used to protect your account."
        />

        <CardBody>
          <div className="divide-y divide-ink/[0.06] overflow-hidden rounded-[20px] border border-ink/[0.07]">
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

      {/* ------------------------------------------------------------------ */}
      {/* Active sessions                                                    */}
      {/* ------------------------------------------------------------------ */}

      <Card>
        <CardHeader
          title="Active sessions"
          subtitle="Review the devices currently signed in to your Build OS account."
          action={
            <span className="inline-flex items-center gap-2 rounded-full border border-ink/[0.07] bg-paper-2 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/45">
              <span className="h-1.5 w-1.5 rounded-full bg-[#12613E]" />
              {securityOverview.activeSessions} active
            </span>
          }
        />

        <CardBody>
          <div className="mb-5 rounded-[20px] border border-ink/[0.06] bg-paper-2/70 p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white">
                <Laptop className="h-4 w-4 text-ink/50" />
              </div>

              <div>
                <p className="text-sm font-semibold text-ink">
                  Recognized devices
                </p>

                <p className="mt-1 max-w-2xl text-xs leading-5 text-ink/45">
                  These sessions represent devices currently authenticated to
                  your account. If you do not recognize one, revoke it
                  immediately and review your password.
                </p>
              </div>
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

          <div className="mt-5 flex flex-col gap-3 border-t border-ink/[0.06] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-ink/40">
              Signing out other devices will end their current sessions.
            </p>

            <button
              type="button"
              className="inline-flex w-fit items-center gap-2 rounded-xl border border-ink/[0.09] bg-white px-4 py-2.5 text-xs font-semibold text-ink transition hover:bg-paper-2"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign out all other devices
            </button>
          </div>
        </CardBody>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* Login protection                                                   */}
      {/* ------------------------------------------------------------------ */}

      <section>
        <SectionHeading
          eyebrow="Access controls"
          title="Login protection"
          description="Additional controls that help protect your account from unauthorized access."
        />

        <div className="mt-4 grid gap-3 md:grid-cols-2">
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
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Security activity                                                  */}
      {/* ------------------------------------------------------------------ */}

      <Card>
        <CardHeader
          title="Recent security activity"
          subtitle="A record of recent authentication and account security events."
          action={
            <span className="hidden text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/35 sm:block">
              Audit trail
            </span>
          }
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

          <div className="mt-5 border-t border-ink/[0.06] pt-5">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink transition hover:text-[#12613E]"
            >
              View full security history
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </CardBody>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* Security warning                                                   */}
      {/* ------------------------------------------------------------------ */}

      <section className="rounded-[20px] border border-[#B85C12]/15 bg-[#B85C12]/[0.045] p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#B85C12]/[0.10]">
            <AlertTriangle className="h-5 w-5 text-[#B85C12]" />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink">
              Protect your authentication credentials
            </h3>

            <p className="mt-1 max-w-3xl text-xs leading-5 text-ink/50">
              Never share your password, authentication codes or recovery
              credentials. Build OS will never ask you to provide these
              details through an unsolicited message.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

/* ========================================================================== */
/* Hero                                                                       */
/* ========================================================================== */

function HeroMeta({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-3.5 w-3.5 text-ink/30" />

      <div className="flex items-center gap-1.5 text-xs">
        <span className="text-ink/40">{label}</span>
        <span className="font-semibold text-ink">{value}</span>
      </div>
    </div>
  )
}

/* ========================================================================== */
/* Section heading                                                            */
/* ========================================================================== */

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#12613E]">
        {eyebrow}
      </p>

      <h2 className="mt-1.5 font-display text-xl font-semibold tracking-[-0.025em] text-ink">
        {title}
      </h2>

      <p className="mt-1 text-xs leading-5 text-ink/45">
        {description}
      </p>
    </div>
  )
}

/* ========================================================================== */
/* Security metric                                                            */
/* ========================================================================== */

function SecurityMetric({
  icon: Icon,
  label,
  value,
  detail,
  tone,
}: {
  icon: ComponentType<{ className?: string }>
  label: string
  value: string
  detail: string
  tone: 'green' | 'bronze' | 'neutral'
}) {
  const toneClasses = {
    green: {
      icon: 'bg-[#12613E]/[0.08] text-[#12613E]',
      value: 'text-[#12613E]',
    },
    bronze: {
      icon: 'bg-[#B85C12]/[0.08] text-[#B85C12]',
      value: 'text-[#B85C12]',
    },
    neutral: {
      icon: 'bg-ink/[0.05] text-ink/50',
      value: 'text-ink',
    },
  }

  const styles = toneClasses[tone]

  return (
    <div className="rounded-[20px] border border-ink/[0.07] bg-white p-5 shadow-[0_10px_30px_rgba(20,40,30,0.04)]">
      <div className="flex items-start justify-between gap-4">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${styles.icon}`}
        >
          <Icon className="h-4.5 w-4.5" />
        </div>

        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/30">
          Protected
        </span>
      </div>

      <p className="mt-5 text-xs font-medium text-ink/45">
        {label}
      </p>

      <p
        className={`mt-1 font-display text-2xl font-semibold tracking-[-0.035em] ${styles.value}`}
      >
        {value}
      </p>

      <p className="mt-1 text-[11px] text-ink/35">
        {detail}
      </p>
    </div>
  )
}

/* ========================================================================== */
/* Security control                                                           */
/* ========================================================================== */

function SecurityControl({
  icon: Icon,
  title,
  description,
  status,
  statusType,
  action,
  children,
}: {
  icon: ComponentType<{ className?: string }>
  title: string
  description: string
  status: string
  statusType: 'success' | 'neutral'
  action: string
  children?: ReactNode
}) {
  return (
    <Card>
      <CardBody>
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-paper-2">
            <Icon className="h-5 w-5 text-ink/50" />
          </div>

          <span
            className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
              statusType === 'success'
                ? 'bg-[#12613E]/[0.08] text-[#12613E]'
                : 'bg-ink/[0.05] text-ink/50'
            }`}
          >
            {status}
          </span>
        </div>

        <h3 className="mt-5 text-sm font-semibold text-ink">
          {title}
        </h3>

        <p className="mt-1 max-w-xl text-xs leading-5 text-ink/45">
          {description}
        </p>

        {children}

        <button
          type="button"
          className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-ink transition hover:text-[#12613E]"
        >
          {action}
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </CardBody>
    </Card>
  )
}

/* ========================================================================== */
/* Security action                                                            */
/* ========================================================================== */

function SecurityAction({
  icon: Icon,
  title,
  description,
  action,
  badge,
}: {
  icon: ComponentType<{ className?: string }>
  title: string
  description: string
  action: string
  badge?: string
}) {
  return (
    <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3.5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-paper-2">
          <Icon className="h-4 w-4 text-ink/50" />
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-semibold text-ink">
              {title}
            </h3>

            {badge && (
              <span className="rounded-full bg-[#12613E]/[0.08] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#12613E]">
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
        className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl border border-ink/[0.08] bg-white px-3.5 py-2 text-xs font-semibold text-ink transition hover:bg-paper-2"
      >
        {action}
        <ChevronRight className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}

/* ========================================================================== */
/* Session row                                                                */
/* ========================================================================== */

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
  icon: ComponentType<{ className?: string }>
}) {
  return (
    <div
      className={`group flex flex-col gap-4 rounded-[18px] border p-4 transition sm:flex-row sm:items-center sm:justify-between ${
        current
          ? 'border-[#12613E]/15 bg-[#12613E]/[0.025]'
          : 'border-ink/[0.07] bg-white hover:border-ink/[0.12] hover:shadow-[0_8px_25px_rgba(20,40,30,0.04)]'
      }`}
    >
      <div className="flex items-center gap-3.5">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
            current
              ? 'bg-[#12613E]/[0.08]'
              : 'bg-paper-2'
          }`}
        >
          <Icon
            className={`h-5 w-5 ${
              current ? 'text-[#12613E]' : 'text-ink/45'
            }`}
          />
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-semibold text-ink">
              {device}
            </h3>

            {current && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#12613E]/[0.08] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#12613E]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#12613E]" />
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
          className="inline-flex w-fit items-center gap-1.5 rounded-xl border border-ink/[0.08] bg-white px-3 py-2 text-xs font-semibold text-ink transition hover:border-ink/[0.14] hover:bg-paper-2"
        >
          <LogOut className="h-3.5 w-3.5" />
          Revoke session
        </button>
      )}
    </div>
  )
}

/* ========================================================================== */
/* Protection row                                                             */
/* ========================================================================== */

function ProtectionRow({
  icon: Icon,
  title,
  description,
  enabled,
}: {
  icon: ComponentType<{ className?: string }>
  title: string
  description: string
  enabled: boolean
}) {
  return (
    <div className="rounded-[18px] border border-ink/[0.07] bg-white p-5 transition hover:border-ink/[0.11] hover:shadow-[0_10px_30px_rgba(20,40,30,0.04)]">
      <div className="flex items-start gap-3.5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-paper-2">
          <Icon className="h-4 w-4 text-ink/50" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-sm font-semibold text-ink">
              {title}
            </h3>

            <div
              className={`h-5 w-9 shrink-0 rounded-full p-0.5 ${
                enabled ? 'bg-[#12613E]' : 'bg-ink/15'
              }`}
              aria-hidden="true"
            >
              <div
                className={`h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                  enabled ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </div>
          </div>

          <p className="mt-1.5 text-xs leading-5 text-ink/45">
            {description}
          </p>

          <div className="mt-3 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#12613E]">
            <CheckCircle2 className="h-3 w-3" />
            Enabled
          </div>
        </div>
      </div>
    </div>
  )
}

/* ========================================================================== */
/* Security event                                                             */
/* ========================================================================== */

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
  icon: ComponentType<{ className?: string }>
}) {
  return (
    <div className="flex items-start gap-3.5 rounded-[18px] border border-ink/[0.07] bg-white p-4 transition hover:border-ink/[0.11] hover:shadow-[0_8px_25px_rgba(20,40,30,0.035)]">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-paper-2">
        <Icon className="h-4 w-4 text-ink/50" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <h3 className="text-sm font-semibold text-ink">
            {action}
          </h3>

          <span className="text-[11px] font-medium text-ink/30">
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