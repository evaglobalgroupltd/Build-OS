import {
  Activity,
  ArrowUpRight,
  Clock3,
  FileSearch,
  ShieldCheck,
  Users,
} from 'lucide-react'

import { Card } from '@/components/ui/Card'

/**
 * Audit Logs — Admin module
 * BRD reference: Sec. 39
 *
 * Enterprise audit and governance console.
 *
 * TODO:
 * - Connect to the audit-log API.
 * - Add server-side filtering and pagination.
 * - Add date-range filtering.
 * - Add actor/resource/action filters.
 * - Add audit-log detail drawer.
 * - Add export functionality.
 */

const previewMetrics = [
  {
    label: 'Events Today',
    value: '—',
    icon: Activity,
  },
  {
    label: 'Active Users',
    value: '—',
    icon: Users,
  },
  {
    label: 'Security Events',
    value: '—',
    icon: ShieldCheck,
  },
]

export function AuditLogs() {
  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-3 py-1.5 shadow-sm backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-ink/60" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/55">
              Governance & Security
            </span>
          </div>

          <h1 className="text-2xl font-semibold tracking-[-0.03em] text-ink sm:text-3xl">
            Audit Logs
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-ink/55">
            Maintain a complete, traceable record of activity across the
            platform, including user actions, administrative events and
            security-sensitive changes.
          </p>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-ink/10 bg-white/70 px-3.5 py-2.5 text-xs text-ink/55 shadow-sm backdrop-blur">
          <Clock3 className="h-3.5 w-3.5" />
          <span>Real-time monitoring</span>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 sm:grid-cols-3">
        {previewMetrics.map((metric) => {
          const Icon = metric.icon

          return (
            <Card
              key={metric.label}
              className="group relative overflow-hidden border-ink/10 bg-white/80 p-5 shadow-[0_10px_35px_rgba(15,23,42,0.04)]"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/40">
                    {metric.label}
                  </p>

                  <p className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-ink">
                    {metric.value}
                  </p>
                </div>

                <div className="rounded-xl border border-ink/10 bg-ink/[0.025] p-2.5 transition-transform duration-300 group-hover:-translate-y-0.5">
                  <Icon className="h-4 w-4 text-ink/55" />
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-ink/10 to-transparent" />
            </Card>
          )
        })}
      </div>

      {/* Main audit console */}
      <Card className="overflow-hidden border-ink/10 bg-white/85 shadow-[0_18px_60px_rgba(15,23,42,0.055)]">
        {/* Console header */}
        <div className="border-b border-ink/10 px-5 py-5 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-ink/10 bg-ink/[0.035]">
                <FileSearch className="h-4.5 w-4.5 text-ink/65" />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-ink">
                  System Activity
                </h2>

                <p className="mt-0.5 text-xs text-ink/45">
                  Centralised record of platform events
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-ink/10 bg-ink/[0.02] px-3 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500/70" />
              </span>

              <span className="text-[11px] font-medium text-ink/55">
                Monitoring enabled
              </span>
            </div>
          </div>
        </div>

        {/* Empty / coming soon state */}
        <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden px-6 py-16">
          {/* Decorative background */}
          <div className="pointer-events-none absolute inset-0 opacity-60">
            <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink/[0.025] blur-3xl" />

            <div
              className="absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage:
                  'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />
          </div>

          <div className="relative z-10 max-w-md text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-ink/10 bg-white shadow-[0_12px_35px_rgba(15,23,42,0.07)]">
              <ShieldCheck className="h-7 w-7 text-ink/65" />
            </div>

            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-ink/[0.025] px-3 py-1">
              <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-ink/40">
                Audit Infrastructure
              </span>
            </div>

            <h3 className="text-lg font-semibold tracking-[-0.02em] text-ink">
              Your audit centre is being prepared
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-ink/50">
              Once connected to the audit service, this workspace will provide
              a searchable, timestamped record of activity across your
              organisation.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {[
                'User activity',
                'Administrative actions',
                'Security events',
                'Change history',
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-ink/10 bg-white px-3 py-1.5 text-[10px] font-medium text-ink/45 shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer metadata */}
        <div className="flex flex-col gap-3 border-t border-ink/10 bg-ink/[0.018] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-2 text-[10px] text-ink/40">
            <span className="font-medium uppercase tracking-[0.14em]">
              Governance
            </span>

            <span className="text-ink/20">•</span>

            <span>BRD Sec. 39</span>
          </div>

          <div className="inline-flex items-center gap-1.5 text-[10px] font-medium text-ink/40">
            <span>Audit architecture</span>
            <ArrowUpRight className="h-3 w-3" />
          </div>
        </div>
      </Card>
    </section>
  )
}