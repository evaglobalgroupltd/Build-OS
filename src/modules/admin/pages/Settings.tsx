import {
  Bell,
  Building2,
  ChevronRight,
  Globe2,
  LockKeyhole,
  Palette,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Users,
} from 'lucide-react'

import { Card } from '@/components/ui/Card'

/**
 * Platform Settings — Admin module
 * BRD reference: Sec. 39
 *
 * Central administration and configuration workspace.
 *
 * TODO:
 * - Connect settings to the platform configuration API.
 * - Add granular permission checks.
 * - Add organisation/platform profile settings.
 * - Add security configuration.
 * - Add notification preferences.
 * - Add localisation settings.
 * - Add appearance and branding controls.
 * - Add configuration audit history.
 */

const settingsGroups = [
  {
    title: 'Platform',
    description: 'Core platform behaviour and defaults.',
    icon: Settings2,
    items: [
      {
        label: 'General Configuration',
        description: 'Platform identity, defaults and operational preferences.',
        icon: SlidersHorizontal,
      },
      {
        label: 'Organisation',
        description: 'Organisation profile and administrative details.',
        icon: Building2,
      },
    ],
  },
  {
    title: 'Security & Access',
    description: 'Control access, authentication and security policies.',
    icon: ShieldCheck,
    items: [
      {
        label: 'Security Controls',
        description: 'Authentication, sessions and security requirements.',
        icon: LockKeyhole,
      },
      {
        label: 'Users & Permissions',
        description: 'Roles, permissions and administrative access.',
        icon: Users,
      },
    ],
  },
  {
    title: 'Experience',
    description: 'Configure how the platform behaves and appears.',
    icon: Palette,
    items: [
      {
        label: 'Notifications',
        description: 'System alerts, communication and notification rules.',
        icon: Bell,
      },
      {
        label: 'Localisation',
        description: 'Language, regional and platform-wide preferences.',
        icon: Globe2,
      },
    ],
  },
]

export function Settings() {
  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-3 py-1.5 shadow-sm backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-ink/60" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/55">
              Administration
            </span>
          </div>

          <h1 className="text-2xl font-semibold tracking-[-0.035em] text-ink sm:text-3xl">
            Platform Settings
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-ink/55">
            Configure the core behaviour, security, access, experience, and
            operational preferences that govern your platform.
          </p>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-ink/10 bg-white/70 px-3.5 py-2.5 text-xs text-ink/55 shadow-sm backdrop-blur">
          <Settings2 className="h-3.5 w-3.5" />
          <span>Administrator controls</span>
        </div>
      </div>

      {/* Configuration notice */}
      <Card className="relative overflow-hidden border-ink/10 bg-white/85 p-5 shadow-[0_12px_40px_rgba(15,23,42,0.045)] sm:p-6">
        <div className="absolute inset-y-0 left-0 w-1 bg-ink/70" />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-ink/10 bg-ink/[0.035]">
              <ShieldCheck className="h-4.5 w-4.5 text-ink/65" />
            </div>

            <div>
              <p className="text-sm font-semibold text-ink">
                Central configuration centre
              </p>

              <p className="mt-1 max-w-xl text-xs leading-5 text-ink/45">
                Settings applied here can affect platform-wide behaviour.
                Configuration changes should be reviewed carefully and remain
                traceable through the administrative audit trail.
              </p>
            </div>
          </div>

          <span className="inline-flex w-fit shrink-0 items-center rounded-full border border-ink/10 bg-ink/[0.025] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-ink/40">
            Configuration required
          </span>
        </div>
      </Card>

      {/* Settings groups */}
      <div className="grid gap-5 xl:grid-cols-3">
        {settingsGroups.map((group) => {
          const GroupIcon = group.icon

          return (
            <Card
              key={group.title}
              className="overflow-hidden border-ink/10 bg-white/85 shadow-[0_14px_45px_rgba(15,23,42,0.045)]"
            >
              {/* Group heading */}
              <div className="border-b border-ink/10 px-5 py-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-ink/10 bg-ink/[0.035]">
                    <GroupIcon className="h-4 w-4 text-ink/60" />
                  </div>

                  <div>
                    <h2 className="text-sm font-semibold text-ink">
                      {group.title}
                    </h2>

                    <p className="mt-1 text-xs leading-5 text-ink/45">
                      {group.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Settings */}
              <div className="divide-y divide-ink/[0.07]">
                {group.items.map((item) => {
                  const Icon = item.icon

                  return (
                    <button
                      key={item.label}
                      type="button"
                      disabled
                      className="group flex w-full cursor-not-allowed items-center gap-3 px-5 py-4 text-left opacity-75 transition-colors"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink/[0.025] transition-colors group-hover:bg-ink/[0.05]">
                        <Icon className="h-3.5 w-3.5 text-ink/50" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-ink/70">
                          {item.label}
                        </p>

                        <p className="mt-0.5 text-[10px] leading-4 text-ink/40">
                          {item.description}
                        </p>
                      </div>

                      <ChevronRight className="h-3.5 w-3.5 shrink-0 text-ink/20" />
                    </button>
                  )
                })}
              </div>
            </Card>
          )
        })}
      </div>

      {/* Future settings workspace */}
      <Card className="relative overflow-hidden border-ink/10 bg-white/85 shadow-[0_18px_60px_rgba(15,23,42,0.055)]">
        <div className="relative flex min-h-[220px] items-center justify-center overflow-hidden px-6 py-12">
          {/* Background grid */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink/[0.025] blur-3xl" />

            <div
              className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage:
                  'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
                backgroundSize: '36px 36px',
              }}
            />
          </div>

          <div className="relative z-10 max-w-lg text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-ink/10 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
              <Settings2 className="h-6 w-6 text-ink/60" />
            </div>

            <div className="mb-2 inline-flex items-center rounded-full border border-ink/10 bg-ink/[0.025] px-3 py-1">
              <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-ink/40">
                Configuration Infrastructure
              </span>
            </div>

            <h3 className="text-base font-semibold tracking-[-0.02em] text-ink">
              Platform configuration is being prepared
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-ink/45">
              The configuration service will connect these administration
              controls to your live platform settings, with appropriate access
              controls and change tracking.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-3 border-t border-ink/10 bg-ink/[0.018] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-2 text-[10px] text-ink/40">
            <span className="font-medium uppercase tracking-[0.14em]">
              Administration
            </span>

            <span className="text-ink/20">•</span>

            <span>BRD Sec. 39</span>
          </div>

          <div className="text-[10px] font-medium text-ink/35">
            Changes should be recorded in the audit trail
          </div>
        </div>
      </Card>
    </section>
  )
}