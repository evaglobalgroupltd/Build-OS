import {
  ArrowUpRight,
  CalendarDays,
  ChevronRight,
  Download,
  FileCheck2,
  FileText,
  Layers3,
  Ruler,
  ShieldCheck,
} from 'lucide-react'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'

/**
 * Designs — Digital Property Passport module
 * BRD reference: Sec. 20.4
 *
 * Premium presentation of:
 * - Architectural design records
 * - Structural design records
 * - MEP documentation
 * - Revision / version information
 * - Approval status
 * - Permanent passport archival
 *
 * TODO:
 * - Replace static data with API-backed design records.
 * - Add document preview/download.
 * - Add version history when supported by backend.
 * - Link designs to the relevant professional/service record.
 */

const designs = [
  {
    id: 'DSN-001',
    title: 'Architectural Design Package',
    type: 'Architectural',
    description:
      'Approved architectural drawings and design documentation.',
    version: 'Rev. 03',
    date: '20 Jun 2026',
    status: 'Approved',
    document: 'architectural-design-package.pdf',
  },
  {
    id: 'DSN-002',
    title: 'Structural Design Package',
    type: 'Structural',
    description:
      'Structural drawings and supporting design documentation.',
    version: 'Rev. 02',
    date: '24 Jun 2026',
    status: 'Approved',
    document: 'structural-design-package.pdf',
  },
  {
    id: 'DSN-003',
    title: 'MEP Design Drawings',
    type: 'MEP',
    description:
      'Mechanical, electrical and plumbing design drawings.',
    version: 'Rev. 01',
    date: '28 Jun 2026',
    status: 'Approved',
    document: 'mep-design-drawings.pdf',
  },
]

export function Designs() {
  const approvedDesigns = designs.filter(
    (design) => design.status === 'Approved',
  ).length

  const designTypes = new Set(designs.map((design) => design.type)).size

  return (
    <div className="space-y-7">

      {/* ========================================================= */}
      {/* Page introduction */}
      {/* ========================================================= */}

      <section>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1657FF]" />

              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/40">
                Digital Property Passport
              </p>
            </div>

            <div className="flex items-center gap-3">

              <h1 className="font-display text-[30px] font-semibold leading-tight tracking-[-0.035em] text-ink sm:text-[34px]">
                Designs
              </h1>

              <span className="hidden rounded-full border border-[#1657FF]/10 bg-[#1657FF]/[0.06] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#1657FF] sm:inline-flex">
                {designs.length} packages
              </span>

            </div>

            <p className="mt-2 max-w-2xl text-[13px] leading-5 text-ink/50">
              Architectural, structural and specialist design records retained
              as part of the project's permanent property archive.
            </p>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-full border border-ink/[0.08] bg-white px-3.5 py-2">

            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EAF1FF] text-[#1657FF]">
              <ShieldCheck size={13} />
            </div>

            <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-ink/55">
              Passport record
            </span>

            <span className="h-1.5 w-1.5 rounded-full bg-[#1657FF]" />

          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* Design overview */}
      {/* ========================================================= */}

      <section
        aria-label="Design overview"
        className="grid grid-cols-2 gap-3 lg:grid-cols-3"
      >

        <SummaryMetric
          icon={Layers3}
          label="Design packages"
          value={designs.length.toString()}
          description="Recorded design packages"
          accent="blue"
        />

        <SummaryMetric
          icon={FileCheck2}
          label="Approved"
          value={approvedDesigns.toString()}
          description="Approved design records"
          accent="green"
        />

        <SummaryMetric
          icon={Ruler}
          label="Design types"
          value={designTypes.toString()}
          description="Architectural, structural & MEP"
          accent="ink"
        />

      </section>

      {/* ========================================================= */}
      {/* Design packages */}
      {/* ========================================================= */}

      <Card className="overflow-hidden">

        <CardHeader
          title="Project designs"
          subtitle="Approved design documentation included in the Digital Property Passport"
        />

        <div className="border-t border-ink/[0.06]">

          {designs.map((design, index) => (
            <article
              key={design.id}
              className="
                group
                relative
                border-b
                border-ink/[0.06]
                px-5
                py-5
                last:border-b-0
                sm:px-6
                sm:py-6
                lg:px-7
                transition
                duration-300
                hover:bg-[#F8FAFD]
              "
            >

              {/* Hover rail */}

              <div
                className="
                  absolute
                  inset-y-0
                  left-0
                  w-[2px]
                  scale-y-0
                  bg-[#1657FF]
                  transition-transform
                  duration-300
                  group-hover:scale-y-100
                "
              />

              <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">

                {/* ------------------------------------------------- */}
                {/* Design identity */}
                {/* ------------------------------------------------- */}

                <div className="flex min-w-0 items-start gap-4">

                  <div
                    className="
                      relative
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-2xl
                      border
                      border-[#1657FF]/10
                      bg-[#F3F6FF]
                      text-[#1657FF]
                      transition
                      duration-300
                      group-hover:border-[#1657FF]/20
                      group-hover:bg-[#EAF1FF]
                    "
                  >
                    <Ruler
                      size={18}
                      strokeWidth={1.8}
                    />

                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-[#12613E] text-white">
                      <FileCheck2
                        size={8}
                        strokeWidth={2.5}
                      />
                    </span>
                  </div>

                  <div className="min-w-0">

                    <div className="flex flex-wrap items-center gap-2.5">

                      <h2 className="font-display text-[15px] font-semibold tracking-[-0.015em] text-ink">
                        {design.title}
                      </h2>

                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF4EE] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.08em] text-[#12613E]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#12613E]" />
                        {design.status}
                      </span>

                    </div>

                    <div className="mt-1.5 flex flex-wrap items-center gap-2">

                      <span className="font-mono text-[10px] font-medium tracking-wide text-ink/35">
                        {design.id}
                      </span>

                      <span className="h-1 w-1 rounded-full bg-ink/15" />

                      <span className="text-[10px] font-medium text-[#1657FF]/70">
                        {design.type}
                      </span>

                      <span className="h-1 w-1 rounded-full bg-ink/15" />

                      <span className="text-[10px] text-ink/35">
                        Package {String(index + 1).padStart(2, '0')}
                      </span>

                    </div>

                    <p className="mt-3 max-w-xl text-[11px] leading-5 text-ink/50">
                      {design.description}
                    </p>

                  </div>
                </div>

                {/* ------------------------------------------------- */}
                {/* Design metadata */}
                {/* ------------------------------------------------- */}

                <div
                  className="
                    grid
                    grid-cols-2
                    gap-3
                    sm:flex
                    sm:items-center
                    sm:gap-7
                    xl:shrink-0
                  "
                >

                  {/* Revision */}

                  <div className="min-w-[80px]">

                    <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-ink/35">
                      Revision
                    </p>

                    <div className="mt-1 flex items-center gap-2">

                      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#F3F6FF] text-[9px] font-bold text-[#1657FF]">
                        R
                      </span>

                      <p className="font-display text-[14px] font-semibold tracking-[-0.015em] text-ink">
                        {design.version.replace('Rev. ', 'Rev ')}
                      </p>

                    </div>

                  </div>

                  {/* Recorded date */}

                  <div className="min-w-[105px]">

                    <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-ink/35">
                      Recorded
                    </p>

                    <p className="mt-1 flex items-center gap-1.5 text-[11px] font-semibold text-ink/60">
                      <CalendarDays
                        size={13}
                        className="text-ink/35"
                      />

                      {design.date}
                    </p>

                  </div>

                  {/* Document */}

                  <div className="col-span-2 sm:col-span-1">

                    <button
                      type="button"
                      aria-label={`Open ${design.title}`}
                      className="
                        flex
                        w-full
                        items-center
                        justify-between
                        gap-3
                        rounded-xl
                        border
                        border-ink/[0.08]
                        bg-white
                        px-3.5
                        py-2.5
                        text-xs
                        font-semibold
                        text-ink
                        shadow-[0_2px_8px_rgba(15,23,42,0.025)]
                        transition
                        duration-200
                        hover:border-[#1657FF]/20
                        hover:bg-[#F8FAFD]
                        hover:text-[#1657FF]
                        sm:w-auto
                        sm:justify-center
                      "
                    >

                      <span className="flex items-center gap-2">
                        <Download size={13} />
                        Document
                      </span>

                      <ArrowUpRight
                        size={13}
                        className="text-ink/25 transition group-hover:text-[#1657FF]"
                      />

                    </button>

                  </div>

                </div>

              </div>
            </article>
          ))}

        </div>
      </Card>

      {/* ========================================================= */}
      {/* Revision / archive information */}
      {/* ========================================================= */}

      <Card className="overflow-hidden">

        <div className="border-b border-ink/[0.06] px-5 py-5 sm:px-6">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F3F6FF] text-[#1657FF]">
              <Layers3 size={16} />
            </div>

            <div>

              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink/40">
                Design archive
              </p>

              <h2 className="mt-0.5 font-display text-lg font-semibold tracking-[-0.02em] text-ink">
                Design record
              </h2>

            </div>

          </div>

        </div>

        <CardBody className="p-5 sm:p-6">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex min-w-0 items-start gap-3">

              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ink/[0.05] text-ink/45">
                <FileCheck2 size={14} />
              </div>

              <p className="max-w-3xl text-[12px] leading-5 text-ink/50">
                Design records remain linked to the project archive and Digital
                Property Passport, preserving the approved documentation and
                revisions used throughout project execution and handover.
              </p>

            </div>

            <button
              type="button"
              className="
                flex
                shrink-0
                items-center
                justify-center
                gap-2
                rounded-full
                border
                border-ink/[0.08]
                bg-white
                px-4
                py-2.5
                text-[11px]
                font-bold
                text-ink
                transition
                hover:border-[#1657FF]/20
                hover:text-[#1657FF]
              "
            >
              View passport
              <ChevronRight size={13} />
            </button>

          </div>

        </CardBody>
      </Card>

    </div>
  )
}

/* ========================================================================== */
/* Supporting components                                                       */
/* ========================================================================== */

function SummaryMetric({
  icon: Icon,
  label,
  value,
  description,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  description: string
  accent: 'blue' | 'green' | 'ink'
}) {
  const accentStyles = {
    blue: {
      icon: 'bg-[#EAF1FF] text-[#1657FF]',
      value: 'text-[#1657FF]',
    },
    green: {
      icon: 'bg-[#EAF4EE] text-[#12613E]',
      value: 'text-ink',
    },
    ink: {
      icon: 'bg-ink/[0.05] text-ink/50',
      value: 'text-ink',
    },
  }

  const styles = accentStyles[accent]

  return (
    <div
      className="
        group
        rounded-[20px]
        border
        border-ink/[0.07]
        bg-white
        p-4
        transition
        duration-300
        hover:-translate-y-0.5
        hover:border-ink/[0.11]
        hover:shadow-[0_14px_35px_rgba(15,23,42,0.06)]
        sm:p-5
      "
    >

      <div className="flex items-start justify-between gap-3">

        <div>

          <p className="text-[9px] font-bold uppercase tracking-[0.13em] text-ink/35">
            {label}
          </p>

          <p
            className={`mt-1.5 font-display text-[26px] font-semibold tracking-[-0.035em] ${styles.value}`}
          >
            {value}
          </p>

        </div>

        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${styles.icon}`}
        >
          <Icon size={16} />
        </div>

      </div>

      <p className="mt-3 text-[10px] text-ink/40">
        {description}
      </p>

    </div>
  )
}