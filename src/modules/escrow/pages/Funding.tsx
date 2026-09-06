import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
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
}

const projects: ProjectOption[] = [
  {
    id: 'PRJ-2026-00421',
    name: 'Abuja Residential Development',
    budget: '₦48.50M',
    funded: '₦31.20M',
    remaining: '₦17.30M',
  },
  {
    id: 'PRJ-2026-00387',
    name: 'Lagos Commercial Development',
    budget: '₦72.00M',
    funded: '₦45.80M',
    remaining: '₦26.20M',
  },
]

export function Funding() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5">
              <WalletCards className="h-5 w-5 text-ink/60" />
            </div>

            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/40">
              Escrow & payments
            </span>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <h1 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Fund Project
            </h1>

            <Badge tone="neutral">Secure funding</Badge>
          </div>

          <p className="mt-1 max-w-2xl text-sm text-ink/50">
            Allocate funds to a project so approved milestones, procurement
            and professional services can proceed through the controlled
            payment workflow.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex w-fit items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-xs font-semibold text-ink/60 transition hover:bg-ink/[0.02] hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to escrow
        </button>
      </div>

      {/* Custody */}
      <CustodyNotice
        fundingSource="partner_escrow"
        custodian="Approved escrow partner"
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        {/* Main */}
        <div className="space-y-6">
          {/* Project selection */}
          <Card>
            <CardHeader
              title="Select project"
              subtitle="Choose the project whose escrow/payment allocation you want to fund"
            />

            <CardBody>
              <div className="space-y-3">
                {projects.map((project, index) => (
                  <label
                    key={project.id}
                    className={`block cursor-pointer rounded-2xl border p-4 transition ${
                      index === 0
                        ? 'border-ink/20 bg-ink/[0.025]'
                        : 'border-line bg-paper-2 hover:border-ink/15'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="project"
                        value={project.id}
                        defaultChecked={index === 0}
                        className="mt-1 h-4 w-4"
                      />

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-ink">
                              {project.name}
                            </p>

                            <p className="mt-1 font-mono text-[10px] text-ink/35">
                              {project.id}
                            </p>
                          </div>

                          <p className="font-mono text-sm font-semibold text-ink">
                            {project.remaining}
                          </p>
                        </div>

                        <div className="mt-4 grid grid-cols-3 gap-3">
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
                  </label>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Funding details */}
          <Card>
            <CardHeader
              title="Funding details"
              subtitle="Specify the amount and funding channel"
            />

            <CardBody>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="amount"
                    className="text-xs font-semibold text-ink"
                  >
                    Funding amount
                  </label>

                  <p className="mt-1 text-[11px] text-ink/40">
                    Enter the amount you want to make available for the
                    selected project.
                  </p>

                  <div className="relative mt-2">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-mono text-sm font-semibold text-ink/40">
                      ₦
                    </span>

                    <input
                      id="amount"
                      type="number"
                      min="0"
                      placeholder="0.00"
                      className="h-12 w-full rounded-xl border border-line bg-paper-2 pl-9 pr-4 font-mono text-sm font-semibold text-ink outline-none placeholder:text-ink/25 focus:border-ink/20 focus:ring-2 focus:ring-ink/5"
                    />
                  </div>

                  <div className="mt-2 flex items-center gap-2 text-[10px] text-ink/35">
                    <Info className="h-3.5 w-3.5" />
                    Project remaining requirement: ₦17.30M
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <p className="text-xs font-semibold text-ink">
                    Funding channel
                  </p>

                  <p className="mt-1 text-[11px] text-ink/40">
                    Select how the funds will be transferred to the project
                    funding arrangement.
                  </p>

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

                <div>
                  <label
                    htmlFor="reference"
                    className="text-xs font-semibold text-ink"
                  >
                    Payment reference
                  </label>

                  <input
                    id="reference"
                    type="text"
                    placeholder="Optional reference"
                    className="mt-2 h-11 w-full rounded-xl border border-line bg-paper-2 px-3 text-xs text-ink outline-none placeholder:text-ink/30 focus:border-ink/20 focus:ring-2 focus:ring-ink/5"
                  />
                </div>

                <div>
                  <label
                    htmlFor="funding-purpose"
                    className="text-xs font-semibold text-ink"
                  >
                    Funding purpose
                  </label>

                  <select
                    id="funding-purpose"
                    defaultValue="project"
                    className="mt-2 h-11 w-full rounded-xl border border-line bg-paper-2 px-3 text-xs font-medium text-ink outline-none focus:border-ink/20 focus:ring-2 focus:ring-ink/5"
                  >
                    <option value="project">General project funding</option>
                    <option value="milestone">Specific milestone</option>
                    <option value="materials">Materials / procurement</option>
                    <option value="professional">
                      Professional services
                    </option>
                    <option value="contingency">Approved contingency</option>
                  </select>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Funding allocation */}
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

          {/* Confirmation */}
          <Card>
            <CardBody>
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded"
                />

                <div>
                  <p className="text-xs font-semibold text-ink">
                    I confirm this funding instruction
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-ink/40">
                    I understand that funds will be processed through the
                    selected payment/escrow channel and that Build OS does not
                    take custody of client funds.
                  </p>
                </div>
              </label>
            </CardBody>
          </Card>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              className="h-11 rounded-xl border border-line bg-white px-5 text-xs font-semibold text-ink/55 transition hover:text-ink"
            >
              Cancel
            </button>

            <button
              type="button"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-ink px-6 text-xs font-semibold text-white transition hover:bg-ink/90"
            >
              Continue to payment
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Funding summary */}
          <Card className="overflow-hidden">
            <CardHeader
              title="Funding summary"
              subtitle="Current selected project"
            />

            <CardBody>
              <div className="space-y-4">
                <SummaryRow
                  label="Project"
                  value="Abuja Residential Development"
                />

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

                <div className="border-t border-line pt-4">
                  <SummaryRow
                    label="Available requirement"
                    value="₦17.30M"
                    mono
                    strong
                  />
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Process */}
          <Card className="p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/40">
              Funding process
            </p>

            <div className="mt-5 space-y-4">
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

          {/* Security */}
          <Card className="p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                <LockKeyhole className="h-4 w-4 text-emerald-600" />
              </div>

              <div>
                <p className="text-sm font-semibold text-ink">
                  Controlled payment workflow
                </p>

                <p className="mt-1 text-xs leading-5 text-ink/40">
                  Funding is tracked against the project and subsequent
                  payments remain subject to approval, evidence and milestone
                  controls.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

function ProjectMetric({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div>
      <p className="text-[9px] font-semibold uppercase tracking-wide text-ink/30">
        {label}
      </p>

      <p className="mt-1 font-mono text-[11px] font-semibold text-ink/65">
        {value}
      </p>
    </div>
  )
}

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
    <label className="block cursor-pointer">
      <input
        type="radio"
        name="funding-source"
        value={value}
        defaultChecked={checked}
        className="peer sr-only"
      />

      <div className="rounded-2xl border border-line bg-paper-2 p-4 transition peer-checked:border-ink/25 peer-checked:bg-ink/[0.025] hover:border-ink/15">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white">
            <Icon className="h-4 w-4 text-ink/45" />
          </div>

          <div>
            <p className="text-xs font-semibold text-ink">{title}</p>

            <p className="mt-1 text-[10px] leading-5 text-ink/40">
              {description}
            </p>
          </div>

          <CheckCircle2 className="ml-auto hidden h-4 w-4 shrink-0 text-emerald-600 peer-checked:block" />
        </div>
      </div>
    </label>
  )
}

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
    <div className="flex items-center gap-3 rounded-xl border border-line bg-paper-2 p-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white">
        <Icon className="h-4 w-4 text-ink/40" />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-semibold text-ink">{title}</p>

        <p className="mt-0.5 text-[10px] text-ink/35">{description}</p>
      </div>
    </div>
  )
}

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
      <span className="text-xs text-ink/40">{label}</span>

      <span
        className={`text-right text-xs ${
          strong ? 'font-semibold text-ink' : 'font-medium text-ink/70'
        } ${mono ? 'font-mono' : ''}`}
      >
        {value}
      </span>
    </div>
  )
}

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
    <div className="flex gap-3">
      <div
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg font-mono text-[9px] font-semibold ${
          active
            ? 'bg-ink text-white'
            : 'bg-paper-2 text-ink/35'
        }`}
      >
        {number}
      </div>

      <div>
        <p className="text-xs font-semibold text-ink">{title}</p>

        <p className="mt-1 text-[10px] leading-5 text-ink/40">
          {description}
        </p>
      </div>
    </div>
  )
}