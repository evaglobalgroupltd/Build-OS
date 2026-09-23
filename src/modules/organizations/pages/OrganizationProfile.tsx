import type { ComponentType } from 'react'

import {
  BadgeCheck,
  Building2,
  CheckCircle2,
  Globe2,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Save,
  ShieldCheck,
  Upload,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'

const organization = {
  name: 'BuildRight Construction Ltd.',
  legalName: 'BuildRight Construction and Engineering Limited',
  registration: 'RC 1847291',
  taxId: 'TIN 1048293741',
  type: 'Construction Company',
  industry: 'Construction & Real Estate',
  email: 'admin@buildright.example',
  phone: '+234 800 000 0000',
  website: 'www.buildright.example',
  address: 'Plot 42, Wuse II, Abuja, Nigeria',
  description:
    'Construction and project delivery organization focused on residential, commercial and infrastructure development.',
  status: 'Verified',
}

const verificationItems = [
  'Company registration',
  'Tax identification',
  'Business identity',
  'Authorized representative',
  'Business address',
  'Bank account',
]

export function OrganizationProfile() {
  return (
    <div className="space-y-7">
      {/* ------------------------------------------------------------------ */}
      {/* Hero                                                               */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden rounded-[24px] border border-ink/[0.07] bg-white shadow-[0_18px_50px_rgba(20,40,30,0.08)]">
        <div className="pointer-events-none absolute -right-24 -top-28 h-64 w-64 rounded-full bg-[#12613E]/[0.07] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-[#B85C12]/[0.05] blur-3xl" />

        <div className="relative flex flex-col gap-6 px-6 py-7 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-10 lg:py-9">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#12613E]/[0.08] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#12613E]">
                <Building2 className="h-3 w-3" />
                Organization
              </span>

              <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-ink/25">
                Business identity
              </span>
            </div>

            <h1 className="mt-4 font-display text-3xl font-semibold tracking-[-0.035em] text-ink sm:text-4xl">
              Organization profile
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/45">
              Manage your organization identity, business information,
              verification details and public-facing brand presence.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
              <HeroMeta
                icon={ShieldCheck}
                label="Verification"
                value="Verified business"
              />

              <HeroMeta
                icon={MapPin}
                label="Primary location"
                value="Abuja, Nigeria"
              />

              <HeroMeta
                icon={BadgeCheck}
                label="Registration"
                value={organization.registration}
              />
            </div>
          </div>

          <button
            type="button"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#18271F] px-4 py-2.5 text-xs font-semibold text-white shadow-[0_10px_24px_rgba(24,39,31,0.16)] transition-all hover:-translate-y-0.5 hover:bg-[#12613E]"
          >
            <Save className="h-3.5 w-3.5" />
            Save changes
          </button>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Organization identity                                               */}
      {/* ------------------------------------------------------------------ */}
      <Card className="overflow-hidden">
        <div className="border-b border-ink/[0.06] bg-[#F4F6F3] px-6 py-7 sm:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-[20px] bg-[#18271F] text-xl font-bold text-white shadow-[0_12px_28px_rgba(24,39,31,0.18)]">
                <span>BR</span>

                <div className="absolute -bottom-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#F4F6F3] bg-[#12613E] text-white">
                  <BadgeCheck className="h-3 w-3" />
                </div>
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
                    {organization.name}
                  </h2>

                  <StatusPill />
                </div>

                <p className="mt-1 text-xs text-ink/40">
                  {organization.type} · {organization.registration}
                </p>
              </div>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-ink/[0.08] bg-white px-4 py-2.5 text-xs font-semibold text-ink/60 shadow-sm transition-all hover:border-ink/[0.14] hover:bg-[#FAFBFA] hover:text-ink"
            >
              <Upload className="h-3.5 w-3.5" />
              Change logo
            </button>
          </div>
        </div>

        <CardBody>
          <SectionIntro
            eyebrow="Legal identity"
            title="Organization information"
            description="Core organization details used across Build OS records and workflows."
          />

          <div className="mt-6 grid gap-x-6 gap-y-5 lg:grid-cols-2">
            <FormField
              label="Organization name"
              value={organization.name}
            />

            <FormField
              label="Legal name"
              value={organization.legalName}
            />

            <FormField
              label="Registration number"
              value={organization.registration}
              readOnly
            />

            <FormField
              label="Tax identification number"
              value={organization.taxId}
              readOnly
            />

            <FormField
              label="Organization type"
              value={organization.type}
            />

            <FormField
              label="Industry"
              value={organization.industry}
            />
          </div>
        </CardBody>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* Main content                                                        */}
      {/* ------------------------------------------------------------------ */}
      <div className="grid gap-7 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-7">
          {/* Contact information */}
          <Card>
            <CardHeader
              title="Contact information"
              subtitle="Primary business contact details used by Build OS."
              action={
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-semibold text-ink/45 transition-colors hover:bg-ink/[0.04] hover:text-ink"
                >
                  <Pencil className="h-3 w-3" />
                  Edit
                </button>
              }
            />

            <CardBody>
              <div className="grid gap-0 sm:grid-cols-2">
                <ContactItem
                  icon={Mail}
                  label="Business email"
                  value={organization.email}
                />

                <ContactItem
                  icon={Phone}
                  label="Business phone"
                  value={organization.phone}
                />

                <ContactItem
                  icon={Globe2}
                  label="Website"
                  value={organization.website}
                />

                <ContactItem
                  icon={MapPin}
                  label="Business address"
                  value={organization.address}
                />
              </div>
            </CardBody>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader
              title="About the organization"
              subtitle="This information may appear on your marketplace profile and selected public records."
            />

            <CardBody>
              <label className="block">
                <span className="text-xs font-semibold text-ink/60">
                  Organization description
                </span>

                <textarea
                  rows={6}
                  defaultValue={organization.description}
                  className="mt-2.5 w-full resize-none rounded-2xl border border-ink/[0.08] bg-[#F8F9F7] px-4 py-3.5 text-sm leading-6 text-ink outline-none transition-all placeholder:text-ink/25 focus:border-[#12613E]/30 focus:bg-white focus:ring-4 focus:ring-[#12613E]/[0.05]"
                  placeholder="Tell clients and partners about your organization..."
                />
              </label>

              <div className="mt-2.5 flex items-center justify-between gap-4">
                <p className="text-[10px] leading-4 text-ink/30">
                  Keep your description clear, factual and representative of
                  your organization.
                </p>

                <span className="shrink-0 text-[10px] text-ink/30">
                  150–500 characters
                </span>
              </div>
            </CardBody>
          </Card>

          {/* Branding */}
          <Card>
            <CardHeader
              title="Branding"
              subtitle="Control how your organization appears throughout Build OS."
            />

            <CardBody>
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-[22px] border border-dashed border-ink/[0.12] bg-[#F4F6F3]">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#18271F] text-lg font-bold text-white shadow-[0_10px_24px_rgba(24,39,31,0.15)]">
                    BR
                  </div>
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-ink">
                    Organization logo
                  </p>

                  <p className="mt-1 max-w-xl text-xs leading-5 text-ink/40">
                    Upload a clear logo for use across your organization
                    profile, project records, reports and selected documents.
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-xl bg-[#18271F] px-3.5 py-2.5 text-xs font-semibold text-white transition-all hover:bg-[#12613E]"
                    >
                      <Upload className="h-3.5 w-3.5" />
                      Upload logo
                    </button>

                    <span className="text-[10px] text-ink/30">
                      PNG, JPG or SVG · Recommended 512 × 512px
                    </span>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Sidebar                                                           */}
        {/* ---------------------------------------------------------------- */}
        <div className="space-y-7">
          {/* Verification */}
          <Card className="overflow-hidden">
            <div className="border-b border-ink/[0.06] bg-[#F4F6F3] p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/35">
                    Organization verification
                  </p>

                  <h2 className="mt-1.5 font-display text-lg font-semibold tracking-tight text-ink">
                    Verified business
                  </h2>

                  <p className="mt-1 text-xs leading-5 text-ink/40">
                    Your organization has completed the required verification
                    checks.
                  </p>
                </div>

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#12613E]/[0.09]">
                  <ShieldCheck className="h-[18px] w-[18px] text-[#12613E]" />
                </div>
              </div>
            </div>

            <CardBody>
              <div className="space-y-2">
                {verificationItems.map((item) => (
                  <div
                    key={item}
                    className="group flex items-center gap-3 rounded-xl border border-transparent bg-[#F8F9F7] px-3 py-3 transition-colors hover:border-[#12613E]/[0.08] hover:bg-[#F4F8F5]"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#12613E]/[0.08]">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#12613E]" />
                    </div>

                    <span className="text-xs font-medium text-ink/60">
                      {item}
                    </span>

                    <BadgeCheck className="ml-auto h-3.5 w-3.5 text-[#12613E]/60" />
                  </div>
                ))}
              </div>

              <div className="mt-5 border-t border-ink/[0.06] pt-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs text-ink/40">
                    Verification status
                  </span>

                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#12613E]">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    Verified
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Organization details */}
          <Card>
            <CardHeader
              title="Organization details"
              subtitle="Business registration and classification."
            />

            <CardBody>
              <div className="space-y-4">
                <DetailRow
                  label="Registration"
                  value={organization.registration}
                />

                <DetailRow label="Tax ID" value={organization.taxId} />

                <DetailRow
                  label="Industry"
                  value={organization.industry}
                />

                <DetailRow
                  label="Organization type"
                  value={organization.type}
                />

                <DetailRow
                  label="Primary location"
                  value="Abuja, Nigeria"
                />
              </div>
            </CardBody>
          </Card>

          {/* Security */}
          <Card>
            <CardBody>
              <div className="rounded-2xl border border-[#12613E]/[0.09] bg-[#F4F8F5] p-4">
                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#12613E]/[0.09]">
                    <ShieldCheck className="h-4 w-4 text-[#12613E]" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-[#18271F]">
                      Protected organization data
                    </p>

                    <p className="mt-1 text-xs leading-5 text-ink/40">
                      Legal and verification information is protected and
                      limited to authorized organization administrators.
                    </p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Bottom save bar                                                     */}
      {/* ------------------------------------------------------------------ */}
      <div className="sticky bottom-4 z-20">
        <div className="flex flex-col gap-3 rounded-2xl border border-ink/[0.08] bg-white/95 p-4 shadow-[0_18px_50px_rgba(20,40,30,0.12)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold text-ink">
              Organization profile
            </p>

            <p className="mt-0.5 text-[11px] text-ink/35">
              Changes to verified information may require additional review.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#18271F] px-4 py-2.5 text-xs font-semibold text-white transition-all hover:bg-[#12613E]"
          >
            <Save className="h-3.5 w-3.5" />
            Save changes
          </button>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Supporting components                                                       */
/* -------------------------------------------------------------------------- */

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
      <Icon className="h-3.5 w-3.5 text-[#12613E]" />

      <div className="flex items-center gap-1.5">
        <span className="text-[10px] uppercase tracking-[0.08em] text-ink/30">
          {label}
        </span>

        <span className="text-xs font-medium text-ink/60">{value}</span>
      </div>
    </div>
  )
}

function StatusPill() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#12613E]/[0.08] px-2.5 py-1 text-[10px] font-semibold text-[#12613E]">
      <BadgeCheck className="h-3 w-3" />
      Verified
    </span>
  )
}

function SectionIntro({
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
      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/30">
        {eyebrow}
      </p>

      <h3 className="mt-1.5 font-display text-lg font-semibold tracking-tight text-ink">
        {title}
      </h3>

      <p className="mt-1 text-xs leading-5 text-ink/40">{description}</p>
    </div>
  )
}

function FormField({
  label,
  value,
  readOnly = false,
}: {
  label: string
  value: string
  readOnly?: boolean
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-ink/60">{label}</span>

      <div className="relative">
        <input
          type="text"
          defaultValue={value}
          readOnly={readOnly}
          className={`mt-2.5 h-11 w-full rounded-xl border border-ink/[0.08] px-3.5 pr-10 text-sm outline-none transition-all ${
            readOnly
              ? 'cursor-not-allowed bg-[#F4F6F3] text-ink/45'
              : 'bg-white text-ink focus:border-[#12613E]/30 focus:ring-4 focus:ring-[#12613E]/[0.05]'
          }`}
        />

        {readOnly && (
          <ShieldCheck className="absolute right-3.5 top-[22px] h-3.5 w-3.5 text-ink/25" />
        )}
      </div>

      {readOnly && (
        <span className="mt-1.5 block text-[10px] leading-4 text-ink/30">
          Managed through organization verification
        </span>
      )}
    </label>
  )
}

function ContactItem({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="flex gap-3 border-b border-ink/[0.06] py-5 first:pt-0 last:border-b-0 sm:nth-[2]:border-b-0 sm:nth-[2]:pt-0 sm:nth-[3]:pb-0 sm:nth-[4]:pb-0">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F4F6F3]">
        <Icon className="h-4 w-4 text-[#12613E]/70" />
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-ink/30">
          {label}
        </p>

        <p className="mt-1 break-words text-sm font-medium text-ink">
          {value}
        </p>
      </div>
    </div>
  )
}

function DetailRow({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="flex items-start justify-between gap-5 border-b border-ink/[0.06] pb-3.5 last:border-0 last:pb-0">
      <span className="text-xs text-ink/40">{label}</span>

      <span className="max-w-[62%] text-right text-xs font-semibold leading-5 text-ink">
        {value}
      </span>
    </div>
  )
}