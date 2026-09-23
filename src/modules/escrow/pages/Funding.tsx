import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  CreditCard,
  Info,
  Landmark,
  LockKeyhole,
  ShieldCheck,
  WalletCards,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { CustodyNotice } from '@/modules/escrow/components/CustodyNotice'

type FundingSource = 'partner_escrow' | 'direct_bank_transfer'

interface ProjectOption {
  id: string
  name: string
  budget: string
  funded: string
  remaining: string
  progress: number
}

const projects: ProjectOption[] = [
  {
    id: 'PRJ-2026-00421',
    name: 'Abuja Residential Development',
    budget: '₦48.50M',
    funded: '₦31.20M',
    remaining: '₦17.30M',
    progress: 64.3,
  },
  {
    id: 'PRJ-2026-00387',
    name: 'Lagos Commercial Development',
    budget: '₦72.00M',
    funded: '₦45.80M',
    remaining: '₦26.20M',
    progress: 63.6,
  },
]

export function Funding() {
  return (
    <div className="space-y-7">
      {/* ===================================================== */}
      {/* Page header                                             */}
      {/* ===================================================== */}

      <header className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#12613E]" />

            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/40">
              Escrow & payments
            </p>

            <span className="hidden h-3 w-px bg-ink/10 sm:block" />

            <p className="hidden text-[10px] font-medium uppercase tracking-[0.12em] text-ink/30 sm:block">
              Project funding
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display text-[30px] font-semibold leading-tight tracking-[-0.035em] text-ink sm:text-[34px]">
              Fund Project
            </h1>

            <span
              className="
                inline-flex items-center gap-1.5
                rounded-full
                border border-[#12613E]/10
                bg-[#EAF4EE]
                px-2.5 py-1.5
                text-[9px]
                font-bold
                uppercase
                tracking-[0.08em]
                text-[#12613E]
              "
            >
              <ShieldCheck className="h-3 w-3" />
              Secure funding
            </span>
          </div>

          <p className="mt-2 max-w-2xl text-[12px] leading-5 text-ink/45 sm:text-[13px]">
            Allocate funds to a project so approved milestones, procurement
            and professional services can proceed through the controlled
            payment workflow.
          </p>
        </div>

        <button
          type="button"
          className="
            group
            inline-flex
            w-fit
            shrink-0
            items-center
            gap-2
            rounded-full
            border border-ink/[0.09]
            bg-white
            px-4
            py-2.5
            text-xs
            font-semibold
            text-ink
            shadow-[0_4px_16px_rgba(20,30,25,0.035)]
            transition-all
            duration-300
            hover:border-ink/20
            hover:shadow-[0_8px_22px_rgba(20,30,25,0.07)]
          "
        >
          <ArrowLeft className="h-3.5 w-3.5 text-ink/40 transition-transform duration-300 group-hover:-translate-x-0.5" />

          Back to escrow
        </button>
      </header>

      {/* ===================================================== */}
      {/* Custody disclosure                                      */}
      {/* ===================================================== */}

      <CustodyNotice
        fundingSource="partner_escrow"
        custodian="Approved escrow partner"
      />

      {/* ===================================================== */}
      {/* Main workspace                                          */}
      {/* ===================================================== */}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        {/* =================================================== */}
        {/* Main column                                            */}
        {/* =================================================== */}

        <main className="min-w-0 space-y-5">
          {/* --------------------------------------------------- */}
          {/* Project selection                                    */}
          {/* --------------------------------------------------- */}

          <Card className="overflow-hidden">
            <CardHeader
              title="Select project"
              subtitle="Choose the project receiving the funding allocation"
            />

            <CardBody className="p-3 sm:p-4">
              <div className="space-y-3">
                {projects.map((project, index) => (
                  <ProjectOptionCard
                    key={project.id}
                    project={project}
                    checked={index === 0}
                  />
                ))}
              </div>
            </CardBody>
          </Card>

          {/* --------------------------------------------------- */}
          {/* Funding details                                      */}
          {/* --------------------------------------------------- */}

          <Card>
            <CardHeader
              title="Funding details"
              subtitle="Specify the amount, payment channel and intended use"
            />

            <CardBody>
              <div className="space-y-7">
                {/* Amount */}
                <div>
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <label
                        htmlFor="amount"
                        className="text-[11px] font-bold uppercase tracking-[0.08em] text-ink/55"
                      >
                        Funding amount
                      </label>

                      <p className="mt-1 text-[10.5px] leading-5 text-ink/35">
                        Enter the amount you want to make available for the
                        selected project.
                      </p>
                    </div>

                    <span className="hidden rounded-full bg-ink/[0.04] px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.08em] text-ink/30 sm:block">
                      Required
                    </span>
                  </div>

                  <div className="relative mt-3">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex w-12 items-center justify-center border-r border-ink/[0.06]">
                      <span className="font-display text-sm font-semibold text-ink/45">
                        ₦
                      </span>
                    </div>

                    <input
                      id="amount"
                      type="number"
                      min="0"
                      placeholder="0.00"
                      className="
                        h-[58px]
                        w-full
                        rounded-[16px]
                        border border-ink/[0.08]
                        bg-[#F7F8F6]
                        pl-[62px]
                        pr-4
                        font-display
                        text-[20px]
                        font-semibold
                        tracking-[-0.02em]
                        text-ink
                        outline-none
                        placeholder:text-ink/20
                        transition-all
                        duration-200
                        focus:border-ink/20
                        focus:bg-white
                        focus:ring-4
                        focus:ring-ink/[0.035]
                      "
                    />
                  </div>

                  <div className="mt-2.5 flex items-center gap-2 text-[10px] text-ink/35">
                    <div className="flex h-5 w-5 items-center justify-center rounded-md bg-ink/[0.04]">
                      <Info className="h-3 w-3" />
                    </div>

                    <span>
                      Project remaining requirement:{' '}
                      <span className="font-semibold text-ink/55">
                        ₦17.30M
                      </span>
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-ink/[0.06]" />

                {/* Funding channel */}
                <div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-ink/55">
                      Funding channel
                    </p>

                    <p className="mt-1 text-[10.5px] leading-5 text-ink/35">
                      Select how the funds will be transferred to the project
                      funding arrangement.
                    </p>
                  </div>

                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <FundingMethod
                      value="partner_escrow"
                      title="Escrow partner"
                      description="Funds are held by the designated escrow/payment partner."
                      icon={ShieldCheck}
                      checked
                    />

                    <FundingMethod
                      value="direct_bank_transfer"
                      title="Direct bank transfer"
                      description="Payment is settled through the designated banking channel."
                      icon={Landmark}
                    />
                  </div>
                </div>

                {/* Reference + purpose */}
                <div className="grid gap-5 border-t border-ink/[0.06] pt-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="reference"
                      className="text-[11px] font-bold uppercase tracking-[0.08em] text-ink/55"
                    >
                      Payment reference
                    </label>

                    <input
                      id="reference"
                      type="text"
                      placeholder="Optional reference"
                      className="
                        mt-2.5
                        h-11
                        w-full
                        rounded-xl
                        border border-ink/[0.08]
                        bg-[#F7F8F6]
                        px-3.5
                        text-xs
                        text-ink
                        outline-none
                        placeholder:text-ink/25
                        transition-all
                        focus:border-ink/20
                        focus:bg-white
                        focus:ring-4
                        focus:ring-ink/[0.035]
                      "
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="funding-purpose"
                      className="text-[11px] font-bold uppercase tracking-[0.08em] text-ink/55"
                    >
                      Funding purpose
                    </label>

                    <div className="relative mt-2.5">
                      <select
                        id="funding-purpose"
                        defaultValue="project"
                        className="
                          h-11
                          w-full
                          appearance-none
                          rounded-xl
                          border border-ink/[0.08]
                          bg-[#F7F8F6]
                          px-3.5
                          pr-10
                          text-xs
                          font-medium
                          text-ink
                          outline-none
                          transition-all
                          focus:border-ink/20
                          focus:bg-white
                          focus:ring-4
                          focus:ring-ink/[0.035]
                        "
                      >
                        <option value="project">
                          General project funding
                        </option>
                        <option value="milestone">
                          Specific milestone
                        </option>
                        <option value="materials">
                          Materials / procurement
                        </option>
                        <option value="professional">
                          Professional services
                        </option>
                        <option value="contingency">
                          Approved contingency
                        </option>
                      </select>

                      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink/30" />
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* --------------------------------------------------- */}
          {/* Funding allocation                                  */}
          {/* --------------------------------------------------- */}

          <Card>
            <CardHeader
              title="Funding allocation"
              subtitle="Optional allocation helps maintain clear project financial controls"
            />

            <CardBody>
              <div className="grid gap-3 sm:grid-cols-2">
                <AllocationRow
                  icon={Building2}
                  title="Construction & labour"
                  description="Approved contractor work and milestones"
                />

                <AllocationRow
                  icon={CreditCard}
                  title="Materials"
                  description="Approved procurement and supplier payments"
                />

                <AllocationRow
                  icon={ShieldCheck}
                  title="Professional services"
                  description="Architecture, engineering and specialist services"
                />

                <AllocationRow
                  icon={WalletCards}
                  title="Contingency"
                  description="Approved unforeseen project costs"
                />
              </div>
            </CardBody>
          </Card>

          {/* --------------------------------------------------- */}
          {/* Confirmation                                         */}
          {/* --------------------------------------------------- */}

          <Card>
            <CardBody className="p-5 sm:p-6">
              <label className="group flex cursor-pointer items-start gap-3.5">
                <span className="relative mt-0.5 flex h-5 w-5 shrink-0">
                  <input
                    type="checkbox"
                    className="
                      peer
                      absolute
                      inset-0
                      h-5
                      w-5
                      cursor-pointer
                      appearance-none
                      rounded-md
                      border border-ink/15
                      bg-white
                      transition-all
                      checked:border-ink
                      checked:bg-ink
                      focus:outline-none
                      focus:ring-4
                      focus:ring-ink/[0.06]
                    "
                  />

                  <Check className="pointer-events-none relative z-10 m-auto hidden h-3 w-3 text-white peer-checked:block" />
                </span>

                <div className="min-w-0">
                  <p className="text-[11px] font-semibold text-ink">
                    I confirm this funding instruction
                  </p>

                  <p className="mt-1.5 max-w-3xl text-[10.5px] leading-[1.75] text-ink/40">
                    I understand that funds will be processed through the
                    selected payment/escrow channel and that Build OS does not
                    take custody of client funds.
                  </p>
                </div>
              </label>
            </CardBody>
          </Card>

          {/* --------------------------------------------------- */}
          {/* Actions                                               */}
          {/* --------------------------------------------------- */}

          <div className="flex flex-col-reverse gap-3 border-t border-ink/[0.06] pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              className="
                h-11
                rounded-full
                border border-ink/[0.09]
                bg-white
                px-5
                text-xs
                font-semibold
                text-ink/55
                transition-all
                hover:border-ink/15
                hover:text-ink
              "
            >
              Cancel
            </button>

            <button
              type="button"
              className="
                group
                inline-flex
                h-11
                items-center
                justify-center
                gap-2
                rounded-full
                bg-ink
                px-6
                text-xs
                font-semibold
                text-white
                shadow-[0_6px_18px_rgba(20,30,25,0.10)]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-ink/90
                hover:shadow-[0_10px_25px_rgba(20,30,25,0.14)]
              "
            >
              Continue to payment

              <ArrowRight className="h-3.5 w-3.5 text-white/55 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </div>
        </main>

        {/* =================================================== */}
        {/* Sidebar                                                */}
        {/* =================================================== */}

        <aside className="space-y-5">
          {/* --------------------------------------------------- */}
          {/* Funding summary                                     */}
          {/* --------------------------------------------------- */}

          <Card className="overflow-hidden">
            <CardHeader
              title="Funding summary"
              subtitle="Current selected project"
            />

            <CardBody className="p-5">
              <div className="rounded-[16px] bg-[#F7F8F6] p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-ink/45 shadow-[0_3px_12px_rgba(20,30,25,0.04)]">
                    <Building2 className="h-4 w-4" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold leading-4 text-ink">
                      Abuja Residential Development
                    </p>

                    <p className="mt-1 font-mono text-[8.5px] text-ink/25">
                      PRJ-2026-00421
                    </p>
                  </div>
                </div>

                {/* Funding progress */}
                <div className="mt-5">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-ink/30">
                      Funded
                    </span>

                    <span className="font-mono text-[9px] font-semibold text-ink/45">
                      64.3%
                    </span>
                  </div>

                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink/[0.07]">
                    <div
                      className="h-full rounded-full bg-[#12613E]"
                      style={{ width: '64.3%' }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-3.5">
                <SummaryRow
                  label="Project budget"
                  value="₦48.50M"
                  mono
                />

                <SummaryRow
                  label="Already funded"
                  value="₦31.20M"
                  mono
                />

                <div className="border-t border-ink/[0.06] pt-4">
                  <div className="flex items-end justify-between gap-4">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-ink/35">
                      Available requirement
                    </span>

                    <span className="font-display text-[19px] font-semibold tracking-[-0.025em] text-ink">
                      ₦17.30M
                    </span>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* --------------------------------------------------- */}
          {/* Process                                              */}
          {/* --------------------------------------------------- */}

          <Card className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-ink/35">
                  Funding process
                </p>

                <p className="mt-1 text-[11px] font-semibold text-ink">
                  Four controlled stages
                </p>
              </div>

              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#F7F8F6] text-ink/35">
                <WalletCards className="h-3.5 w-3.5" />
              </div>
            </div>

            <div className="mt-5">
              <ProcessStep
                number="01"
                title="Create funding instruction"
                description="Select project, amount and payment channel."
                active
              />

              <ProcessStep
                number="02"
                title="Payment authorisation"
                description="Complete the selected payment provider's flow."
              />

              <ProcessStep
                number="03"
                title="Funds confirmed"
                description="Funding status is updated after confirmation."
              />

              <ProcessStep
                number="04"
                title="Available for approved use"
                description="Funds become available for controlled project payments."
              />
            </div>
          </Card>

          {/* --------------------------------------------------- */}
          {/* Security                                              */}
          {/* --------------------------------------------------- */}

          <Card className="overflow-hidden">
            <div className="border-b border-[#12613E]/10 bg-[#F4F7F4] px-5 py-4">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-[#12613E] shadow-sm">
                  <LockKeyhole className="h-3.5 w-3.5" />
                </div>

                <span className="text-[9px] font-bold uppercase tracking-[0.13em] text-[#12613E]/70">
                  Controlled environment
                </span>
              </div>
            </div>

            <CardBody className="p-5">
              <p className="text-[12px] font-semibold text-ink">
                Controlled payment workflow
              </p>

              <p className="mt-1.5 text-[10.5px] leading-[1.75] text-ink/40">
                Funding is tracked against the project and subsequent
                payments remain subject to approval, evidence and milestone
                controls.
              </p>

              <div className="mt-4 flex items-center gap-2 border-t border-ink/[0.06] pt-4">
                <ShieldCheck className="h-3.5 w-3.5 text-[#12613E]" />

                <span className="text-[9px] font-medium text-ink/40">
                  Verification and approval controls apply
                </span>
              </div>
            </CardBody>
          </Card>
        </aside>
      </div>
    </div>
  )
}

/* ============================================================= */
/* Project option                                                */
/* ============================================================= */

function ProjectOptionCard({
  project,
  checked = false,
}: {
  project: ProjectOption
  checked?: boolean
}) {
  return (
    <label className="group block cursor-pointer">
      <input
        type="radio"
        name="project"
        value={project.id}
        defaultChecked={checked}
        className="peer sr-only"
      />

      <div
        className="
          relative
          overflow-hidden
          rounded-[18px]
          border border-ink/[0.07]
          bg-white
          p-4
          transition-all
          duration-300
          hover:border-ink/[0.13]
          hover:shadow-[0_10px_30px_rgba(20,30,25,0.045)]
          peer-checked:border-[#12613E]/20
          peer-checked:bg-[#FDFEFD]
          peer-checked:shadow-[0_8px_25px_rgba(18,97,62,0.055)]
        "
      >
        {/* Selected rail */}
        <div
          className="
            absolute
            bottom-0
            left-0
            top-0
            w-0.5
            bg-[#12613E]
            opacity-0
            transition-opacity
            duration-300
            peer-checked:opacity-100
          "
        />

        <div className="flex items-start gap-3.5">
          {/* Custom radio */}
          <div
            className="
              mt-0.5
              flex
              h-5
              w-5
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-ink/15
              bg-white
              transition-all
              peer-checked:border-[#12613E]
              peer-checked:bg-[#12613E]
            "
          >
            <div className="h-1.5 w-1.5 rounded-full bg-white opacity-0 transition-opacity peer-checked:opacity-100" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-[12px] font-semibold tracking-[-0.01em] text-ink sm:text-[13px]">
                    {project.name}
                  </p>

                  {checked && (
                    <span className="hidden rounded-full bg-[#EAF4EE] px-2 py-1 text-[8px] font-bold uppercase tracking-[0.08em] text-[#12613E] sm:inline-flex">
                      Selected
                    </span>
                  )}
                </div>

                <p className="mt-1 font-mono text-[8.5px] text-ink/25">
                  {project.id}
                </p>
              </div>

              <div className="sm:text-right">
                <p className="text-[8.5px] font-bold uppercase tracking-[0.12em] text-ink/30">
                  Remaining
                </p>

                <p className="mt-0.5 font-display text-[18px] font-semibold tracking-[-0.025em] text-ink">
                  {project.remaining}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between">
                <span className="text-[8.5px] font-semibold uppercase tracking-[0.1em] text-ink/25">
                  Funding progress
                </span>

                <span className="font-mono text-[8.5px] font-semibold text-ink/35">
                  {project.progress.toFixed(1)}%
                </span>
              </div>

              <div className="mt-2 h-1 overflow-hidden rounded-full bg-ink/[0.06]">
                <div
                  className="h-full rounded-full bg-[#12613E]"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3 border-t border-ink/[0.06] pt-3.5">
              <ProjectMetric
                label="Budget"
                value={project.budget}
              />

              <ProjectMetric
                label="Funded"
                value={project.funded}
              />

              <ProjectMetric
                label="Remaining"
                value={project.remaining}
              />
            </div>
          </div>
        </div>
      </div>
    </label>
  )
}

/* ============================================================= */
/* Project metrics                                                */
/* ============================================================= */

function ProjectMetric({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="min-w-0">
      <p className="text-[8px] font-bold uppercase tracking-[0.12em] text-ink/25">
        {label}
      </p>

      <p className="mt-1 truncate font-mono text-[10px] font-semibold text-ink/55">
        {value}
      </p>
    </div>
  )
}

/* ============================================================= */
/* Funding method                                                */
/* ============================================================= */

function FundingMethod({
  value,
  title,
  description,
  icon: Icon,
  checked = false,
}: {
  value: FundingSource
  title: string
  description: string
  icon: typeof ShieldCheck
  checked?: boolean
}) {
  return (
    <label className="group block cursor-pointer">
      <input
        type="radio"
        name="funding-source"
        value={value}
        defaultChecked={checked}
        className="peer sr-only"
      />

      <div
        className="
          relative
          overflow-hidden
          rounded-[17px]
          border border-ink/[0.07]
          bg-[#F7F8F6]
          p-4
          transition-all
          duration-300
          hover:border-ink/[0.12]
          hover:bg-white
          peer-checked:border-[#12613E]/20
          peer-checked:bg-[#F4F7F4]
          peer-checked:shadow-[0_8px_24px_rgba(18,97,62,0.045)]
        "
      >
        <div className="flex items-start gap-3">
          <div
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-white
              text-ink/40
              shadow-[0_3px_12px_rgba(20,30,25,0.035)]
              transition-colors
              peer-checked:text-[#12613E]
            "
          >
            <Icon className="h-4 w-4" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[11px] font-semibold text-ink">
                {title}
              </p>

              <div
                className="
                  flex
                  h-4
                  w-4
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border border-ink/10
                  bg-white
                  opacity-0
                  transition-all
                  peer-checked:border-[#12613E]
                  peer-checked:bg-[#12613E]
                  peer-checked:opacity-100
                "
              >
                <Check className="h-2.5 w-2.5 text-white" />
              </div>
            </div>

            <p className="mt-1 text-[9.5px] leading-[1.7] text-ink/40">
              {description}
            </p>
          </div>
        </div>

        {checked && (
          <div className="mt-3 flex items-center gap-1.5 border-t border-[#12613E]/10 pt-3">
            <ShieldCheck className="h-3 w-3 text-[#12613E]" />

            <span className="text-[8.5px] font-semibold text-[#12613E]/65">
              Designated funding channel
            </span>
          </div>
        )}
      </div>
    </label>
  )
}

/* ============================================================= */
/* Allocation row                                                */
/* ============================================================= */

function AllocationRow({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Building2
  title: string
  description: string
}) {
  return (
    <div
      className="
        group
        flex
        items-center
        gap-3
        rounded-[16px]
        border border-ink/[0.06]
        bg-[#F7F8F6]
        p-3.5
        transition-all
        duration-300
        hover:border-ink/[0.10]
        hover:bg-white
        hover:shadow-[0_8px_22px_rgba(20,30,25,0.035)]
      "
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-ink/40 shadow-[0_3px_10px_rgba(20,30,25,0.025)]">
        <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-105" />
      </div>

      <div className="min-w-0">
        <p className="text-[11px] font-semibold text-ink">
          {title}
        </p>

        <p className="mt-0.5 text-[9.5px] leading-4 text-ink/35">
          {description}
        </p>
      </div>
    </div>
  )
}

/* ============================================================= */
/* Summary row                                                   */
/* ============================================================= */

function SummaryRow({
  label,
  value,
  mono = false,
  strong = false,
}: {
  label: string
  value: string
  mono?: boolean
  strong?: boolean
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-[10px] text-ink/35">
        {label}
      </span>

      <span
        className={[
          'text-right text-[10.5px]',
          strong
            ? 'font-semibold text-ink'
            : 'font-medium text-ink/65',
          mono ? 'font-mono' : '',
        ].join(' ')}
      >
        {value}
      </span>
    </div>
  )
}

/* ============================================================= */
/* Process step                                                  */
/* ============================================================= */

function ProcessStep({
  number,
  title,
  description,
  active = false,
}: {
  number: string
  title: string
  description: string
  active?: boolean
}) {
  return (
    <div className="relative flex gap-3.5">
      {/* Connector */}
      {number !== '04' && (
        <div className="absolute bottom-[-18px] left-[13px] top-9 w-px bg-ink/[0.07]" />
      )}

      <div
        className={[
          'relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg font-mono text-[8.5px] font-semibold transition-all',
          active
            ? 'bg-ink text-white shadow-[0_4px_12px_rgba(20,30,25,0.10)]'
            : 'bg-[#F7F8F6] text-ink/30 ring-1 ring-ink/[0.05]',
        ].join(' ')}
      >
        {number}
      </div>

      <div className="min-w-0 pb-5">
        <p
          className={[
            'text-[10.5px] font-semibold',
            active ? 'text-ink' : 'text-ink/65',
          ].join(' ')}
        >
          {title}
        </p>

        <p className="mt-1 text-[9.5px] leading-[1.7] text-ink/35">
          {description}
        </p>
      </div>
    </div>
  )
}