import {
  ArrowUpRight,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  ShieldCheck,
  TriangleAlert,
} from 'lucide-react'

import { Card } from '@/components/ui/Card'

/**
 * Compliance — Admin module
 * BRD reference: Sec. 39
 *
 * Enterprise-wide compliance and governance console.
 *
 * TODO:
 * - Connect to the compliance API.
 * - Add framework/control configuration.
 * - Add compliance assessment results.
 * - Add policy and evidence management.
 * - Add exceptions and remediation workflows.
 * - Add compliance reporting and export.
 */

const complianceAreas = [
  {
    label: 'Policies & Controls',
    icon: ClipboardCheck,
  },
  {
    label: 'Evidence Management',
    icon: FileCheck2,
  },
  {
    label: 'Risk & Exceptions',
    icon: TriangleAlert,
  },
  {
    label: 'Governance Reviews',
    icon: ShieldCheck,
  },
]

const overviewMetrics = [
  {
    label: 'Compliance Score',
    value: '—',
  },
  {
    label: 'Active Controls',
    value: '—',
  },
  {
    label: 'Open Exceptions',
    value: '—',
  },
]

export function Compliance() {
  return (
    <section className="space-y-6">
      {/* Page heading */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-3 py-1.5 shadow-sm backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-ink/60" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/55">
              Governance & Assurance
            </span>
          </div>

          <h1 className="text-2xl font-semibold tracking-[-0.035em] text-ink sm:text-3xl">
            Compliance
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-ink/55">
            Monitor organisational controls, compliance obligations, evidence,
            exceptions, and governance activities from one central workspace.
          </p>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-ink/10 bg-white/70 px-3.5 py-2.5 text-xs text-ink/55 shadow-sm backdrop-blur">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Compliance framework</span>
        </div>
      </div>

      {/* Overview metrics */}
      <div className="grid gap-4 sm:grid-cols-3">
        {overviewMetrics.map((metric) => (
          <Card
            key={metric.label}
            className="relative overflow-hidden border-ink/10 bg-white/80 p-5 shadow-[0_10px_35px_rgba(15,23,42,0.04)]"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/40">
              {metric.label}
            </p>

            <div className="mt-3 flex items-end justify-between gap-4">
              <p className="text-2xl font-semibold tracking-[-0.03em] text-ink">
                {metric.value}
              </p>

              <span className="rounded-full border border-ink/10 bg-ink/[0.025] px-2 py-1 text-[9px] font-medium uppercase tracking-[0.12em] text-ink/35">
                Pending
              </span>
            </div>

            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-ink/10 to-transparent" />
          </Card>
        ))}
      </div>

      {/* Main compliance workspace */}
      <Card className="overflow-hidden border-ink/10 bg-white/85 shadow-[0_18px_60px_rgba(15,23,42,0.055)]">
        {/* Workspace header */}
        <div className="border-b border-ink/10 px-5 py-5 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-ink/10 bg-ink/[0.035]">
                <CheckCircle2 className="h-4.5 w-4.5 text-ink/65" />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-ink">
                  Compliance Overview
                </h2>

                <p className="mt-0.5 text-xs text-ink/45">
                  Centralised visibility across governance controls
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 rounded-lg border border-ink/10 bg-ink/[0.02] px-3 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-ink/35" />

              <span className="text-[11px] font-medium text-ink/50">
                Configuration required
              </span>
            </div>
          </div>
        </div>

        {/* Empty state */}
        <div className="relative flex min-h-[370px] items-center justify-center overflow-hidden px-6 py-16">
          {/* Atmospheric background */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink/[0.025] blur-3xl" />

            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
                backgroundSize: '36px 36px',
              }}
            />
          </div>

          <div className="relative z-10 max-w-lg text-center">
            {/* Icon */}
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-ink/10 bg-white shadow-[0_12px_35px_rgba(15,23,42,0.07)]">
              <ShieldCheck className="h-7 w-7 text-ink/65" />
            </div>

            {/* Eyebrow */}
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-ink/[0.025] px-3 py-1">
              <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-ink/40">
                Compliance Infrastructure
              </span>
            </div>

            <h3 className="text-lg font-semibold tracking-[-0.02em] text-ink">
              Your compliance centre is being prepared
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-ink/50">
              Once the compliance service is connected, this workspace will
              provide structured visibility into controls, evidence, reviews,
              exceptions, and remediation activity.
            </p>

            {/* Compliance capabilities */}
            <div className="mt-7 grid gap-2 sm:grid-cols-2">
              {complianceAreas.map((area) => {
                const Icon = area.icon

                return (
                  <div
                    key={area.label}
                    className="flex items-center gap-3 rounded-xl border border-ink/10 bg-white/80 px-3.5 py-3 text-left shadow-sm"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ink/[0.035]">
                      <Icon className="h-3.5 w-3.5 text-ink/55" />
                    </div>

                    <span className="text-[11px] font-medium text-ink/55">
                      {area.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-3 border-t border-ink/10 bg-ink/[0.018] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-2 text-[10px] text-ink/40">
            <span className="font-medium uppercase tracking-[0.14em]">
              Governance
            </span>

            <span className="text-ink/20">•</span>

            <span>BRD Sec. 39</span>
          </div>

          <div className="inline-flex items-center gap-1.5 text-[10px] font-medium text-ink/40">
            <span>Compliance architecture</span>
            <ArrowUpRight className="h-3 w-3" />
          </div>
        </div>
      </Card>
    </section>
  )
}