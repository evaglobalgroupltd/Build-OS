import {
  ArrowUpRight,
  CalendarDays,
  ChevronRight,
  Download,
  FileCheck2,
  FileText,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'

/**
 * Contracts — Digital Property Passport module
 * BRD reference: Sec. 20.4
 *
 * Premium / executive presentation of:
 * - Executed project contracts
 * - Contracting parties
 * - Contract values
 * - Execution dates
 * - Passport archival status
 *
 * TODO:
 * - Replace static data with API-backed contract records.
 * - Add document preview/download.
 * - Add contract signing / execution workflow when supported by backend.
 */

const contracts = [
  {
    id: 'CON-001',
    title: 'Main Construction Contract',
    party: 'Contractor',
    counterparty: 'Client / Project Owner',
    value: '₦185,000,000',
    signedDate: '12 Jun 2026',
    status: 'Executed',
    document: 'main-construction-contract.pdf',
  },
  {
    id: 'CON-002',
    title: 'Project Management Agreement',
    party: 'Project Manager',
    counterparty: 'Client / Project Owner',
    value: '₦6,500,000',
    signedDate: '15 Jun 2026',
    status: 'Executed',
    document: 'project-management-agreement.pdf',
  },
  {
    id: 'CON-003',
    title: 'Professional Services Agreement',
    party: 'Professional Expert',
    counterparty: 'Client / Project Owner',
    value: '₦4,200,000',
    signedDate: '18 Jun 2026',
    status: 'Executed',
    document: 'professional-services-agreement.pdf',
  },
]

export function Contracts() {
  const executedContracts = contracts.filter(
    (contract) => contract.status === 'Executed',
  ).length

  const contractingParties = new Set(
    contracts.flatMap((contract) => [contract.party, contract.counterparty]),
  ).size

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
                Contracts
              </h1>

              <span className="hidden rounded-full border border-[#1657FF]/10 bg-[#1657FF]/[0.06] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#1657FF] sm:inline-flex">
                {contracts.length} records
              </span>
            </div>

            <p className="mt-2 max-w-2xl text-[13px] leading-5 text-ink/50">
              Signed agreements and contractual records retained as part of
              the project's permanent property passport.
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
      {/* Contract overview */}
      {/* ========================================================= */}

      <section
        aria-label="Contract overview"
        className="grid grid-cols-2 gap-3 lg:grid-cols-3"
      >
        <SummaryMetric
          icon={FileText}
          label="Contracts"
          value={contracts.length.toString()}
          description="Project agreements"
          accent="blue"
        />

        <SummaryMetric
          icon={FileCheck2}
          label="Executed"
          value={executedContracts.toString()}
          description="Signed and recorded"
          accent="green"
        />

        <SummaryMetric
          icon={Users}
          label="Parties"
          value={contractingParties.toString()}
          description="Contracting roles"
          accent="ink"
        />
      </section>

      {/* ========================================================= */}
      {/* Contracts */}
      {/* ========================================================= */}

      <Card className="overflow-hidden">

        <CardHeader
          title="Project contracts"
          subtitle="Agreements included in the Digital Property Passport"
        />

        <div className="border-t border-ink/[0.06]">

          {contracts.map((contract, index) => (
            <article
              key={contract.id}
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

              {/* Subtle active rail */}

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
                {/* Contract identity */}
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
                    <FileText size={18} strokeWidth={1.8} />

                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-[#12613E] text-white">
                      <ShieldCheck size={8} strokeWidth={2.5} />
                    </span>
                  </div>

                  <div className="min-w-0">

                    <div className="flex flex-wrap items-center gap-2.5">

                      <h2 className="font-display text-[15px] font-semibold tracking-[-0.015em] text-ink">
                        {contract.title}
                      </h2>

                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF4EE] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.08em] text-[#12613E]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#12613E]" />
                        {contract.status}
                      </span>

                    </div>

                    <div className="mt-1.5 flex items-center gap-2">
                      <span className="font-mono text-[10px] font-medium tracking-wide text-ink/35">
                        {contract.id}
                      </span>

                      <span className="h-1 w-1 rounded-full bg-ink/15" />

                      <span className="text-[10px] text-ink/35">
                        Passport document {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Parties */}

                    <div className="mt-4 flex flex-wrap gap-2">

                      <PartyChip
                        label="Party"
                        value={contract.party}
                      />

                      <PartyChip
                        label="Counterparty"
                        value={contract.counterparty}
                      />

                    </div>

                  </div>
                </div>

                {/* ------------------------------------------------- */}
                {/* Contract metadata */}
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

                  <ContractMeta
                    label="Contract value"
                    value={contract.value}
                    prominent
                  />

                  <ContractMeta
                    label="Executed"
                    value={contract.signedDate}
                    icon={<CalendarDays size={13} />}
                  />

                  <div className="col-span-2 sm:col-span-1">

                    <button
                      type="button"
                      aria-label={`Open ${contract.title}`}
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
      {/* Passport archive */}
      {/* ========================================================= */}

      <Card className="overflow-hidden">

        <div className="border-b border-ink/[0.06] px-5 py-5 sm:px-6">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F3F6FF] text-[#1657FF]">
              <FileCheck2 size={16} />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink/40">
                Permanent archive
              </p>

              <h2 className="mt-0.5 font-display text-lg font-semibold tracking-[-0.02em] text-ink">
                Passport record
              </h2>
            </div>

          </div>

        </div>

        <CardBody className="p-5 sm:p-6">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex min-w-0 items-start gap-3">

              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ink/[0.05] text-ink/45">
                <ShieldCheck size={14} />
              </div>

              <p className="max-w-3xl text-[12px] leading-5 text-ink/50">
                Contract records remain linked to the project archive and
                Digital Property Passport alongside project, procurement,
                inspection, payment, warranty and handover records.
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

function ContractMeta({
  label,
  value,
  icon,
  prominent = false,
}: {
  label: string
  value: string
  icon?: React.ReactNode
  prominent?: boolean
}) {
  return (
    <div className="min-w-0">

      <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-ink/35">
        {label}
      </p>

      <p
        className={[
          'mt-1 flex items-center gap-1.5 whitespace-nowrap',
          prominent
            ? 'font-display text-[15px] font-semibold tracking-[-0.02em] text-ink'
            : 'text-[11px] font-semibold text-ink/60',
        ].join(' ')}
      >
        {icon}
        {value}
      </p>

    </div>
  )
}

function PartyChip({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="rounded-xl bg-[#F6F8FC] px-3 py-2">

      <div className="flex items-center gap-1.5">

        <span className="text-[8px] font-bold uppercase tracking-[0.09em] text-ink/30">
          {label}
        </span>

        <span className="h-1 w-1 rounded-full bg-ink/15" />

        <span className="text-[10px] font-semibold text-ink/60">
          {value}
        </span>

      </div>

    </div>
  )
}