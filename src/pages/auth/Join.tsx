import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Building2,
  ChevronDown,
  HardHat,
  Package,
  PenTool,
  Ruler,
  ShieldCheck,
  UserRoundCheck,
  Wrench,
} from 'lucide-react'

import { AuthLayout } from '@/layouts/AuthLayout'

type ProfessionalType =
  | 'architect'
  | 'engineer'
  | 'surveyor'
  | 'project_manager'
  | 'contractor'
  | 'artisan'
  | 'other_professional'

const professionalOptions: {
  type: ProfessionalType
  title: string
  description: string
  icon: typeof PenTool
}[] = [
  {
    type: 'architect',
    title: 'Architect',
    description: 'Design, drawings, documentation & professional deliverables',
    icon: PenTool,
  },
  {
    type: 'engineer',
    title: 'Engineer',
    description: 'Technical design, engineering & site services',
    icon: Ruler,
  },
  {
    type: 'surveyor',
    title: 'Surveyor / Quantity Surveyor',
    description: 'Survey, measurement, costing & project support',
    icon: Ruler,
  },
  {
    type: 'project_manager',
    title: 'Project Manager',
    description: 'Site oversight, inspections, reporting & milestones',
    icon: ShieldCheck,
  },
  {
    type: 'contractor',
    title: 'Contractor',
    description: 'Construction execution, bids & project teams',
    icon: HardHat,
  },
  {
    type: 'artisan',
    title: 'Artisan',
    description: 'Skilled trade services & project work',
    icon: Wrench,
  },
  {
    type: 'other_professional',
    title: 'Other Professional',
    description: 'Another construction or property specialist',
    icon: UserRoundCheck,
  },
]

export function Join() {
  const navigate = useNavigate()
  const [professionalOpen, setProfessionalOpen] = useState(false)

  function handleProfessionalSelect(type: ProfessionalType) {
    navigate(`/register?role=professional&professionalType=${type}`)
  }

  return (
    <AuthLayout
      title="Join Build OS"
      subtitle="Choose how you will use the platform."
      footer={
        <>
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-ink hover:underline"
          >
            Log in
          </Link>
        </>
      }
    >
      <div className="space-y-3">

        {/* CLIENT */}
        <Link
          to="/register?role=client"
          className="group block rounded-2xl border border-line bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal">
              <Building2 size={22} aria-hidden="true" />
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="font-display text-base font-semibold text-ink">
                Client
              </h2>

              <p className="mt-1 text-sm leading-5 text-ink/50">
                Plan, fund and monitor a property or construction project.
              </p>

              <p className="mt-2 text-[11px] font-medium text-ink/35">
                Includes property owners & diaspora investors
              </p>
            </div>

            <ArrowRight
              size={18}
              className="shrink-0 text-ink/25 transition-transform group-hover:translate-x-1 group-hover:text-ink/60"
              aria-hidden="true"
            />
          </div>
        </Link>

        {/* PROFESSIONAL */}
        <div
          className={`overflow-hidden rounded-2xl border transition-colors ${
            professionalOpen
              ? 'border-amber/40 bg-amber/5'
              : 'border-line bg-white'
          }`}
        >
          <button
            type="button"
            onClick={() => setProfessionalOpen((open) => !open)}
            aria-expanded={professionalOpen}
            className="flex w-full items-center gap-4 p-5 text-left"
          >
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors ${
                professionalOpen
                  ? 'bg-amber/15 text-amber'
                  : 'bg-teal/10 text-teal'
              }`}
            >
              <HardHat size={22} aria-hidden="true" />
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="font-display text-base font-semibold text-ink">
                Professional
              </h2>

              <p className="mt-1 text-sm leading-5 text-ink/50">
                Offer your expertise, services or construction capabilities.
              </p>

              <p className="mt-2 text-[11px] font-medium text-ink/35">
                Architects · Engineers · Contractors · Artisans · PMs & more
              </p>
            </div>

            <ChevronDown
              size={19}
              className={`shrink-0 text-ink/35 transition-transform ${
                professionalOpen ? 'rotate-180' : ''
              }`}
              aria-hidden="true"
            />
          </button>

          {professionalOpen && (
            <div className="border-t border-ink/10 px-3 pb-3 pt-2">
              <p className="px-2 pb-2 pt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink/35">
                Choose your professional role
              </p>

              <div className="space-y-1">
                {professionalOptions.map((option) => {
                  const Icon = option.icon

                  return (
                    <button
                      key={option.type}
                      type="button"
                      onClick={() => handleProfessionalSelect(option.type)}
                      className="group flex w-full items-center gap-3 rounded-xl p-3 text-left transition-colors hover:bg-white"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal/10 text-teal">
                        <Icon size={19} aria-hidden="true" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-ink">
                          {option.title}
                        </p>

                        <p className="mt-0.5 text-xs leading-5 text-ink/50">
                          {option.description}
                        </p>
                      </div>

                      <ArrowRight
                        size={16}
                        className="shrink-0 text-ink/20 transition-transform group-hover:translate-x-0.5 group-hover:text-ink/50"
                        aria-hidden="true"
                      />
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* SUPPLIER */}
        <Link
          to="/register?role=supplier"
          className="group block rounded-2xl border border-line bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber/10 text-amber">
              <Package size={22} aria-hidden="true" />
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="font-display text-base font-semibold text-ink">
                Supplier
              </h2>

              <p className="mt-1 text-sm leading-5 text-ink/50">
                Supply verified materials, respond to requests and manage
                deliveries.
              </p>
            </div>

            <ArrowRight
              size={18}
              className="shrink-0 text-ink/25 transition-transform group-hover:translate-x-1 group-hover:text-ink/60"
              aria-hidden="true"
            />
          </div>
        </Link>
      </div>

      {/* TRUST MESSAGE */}
      <div className="mt-7 rounded-xl bg-paper-2 px-4 py-3.5">
        <div className="flex items-start gap-3">
          <ShieldCheck
            size={17}
            className="mt-0.5 shrink-0 text-teal"
            aria-hidden="true"
          />

          <p className="text-xs leading-5 text-ink/45">
            Build OS uses identity, business and professional verification
            before users can transact on the platform.
          </p>
        </div>
      </div>
    </AuthLayout>
  )
}