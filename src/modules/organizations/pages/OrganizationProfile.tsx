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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink">
              <Building2 className="h-5 w-5 text-white" />
            </div>

            <div>
              <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">
                Organization profile
              </h1>

              <p className="mt-0.5 text-sm text-ink/45">
                Manage your organization identity, business information and
                branding.
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
        >
          <Save className="h-3.5 w-3.5" />
          Save changes
        </button>
      </div>

      {/* Organization identity */}
      <Card className="overflow-hidden">
        <div className="border-b border-line bg-paper-2 px-6 py-7 sm:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-ink text-xl font-bold text-white shadow-sm">
                BR
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-display text-xl font-semibold text-ink">
                    {organization.name}
                  </h2>

                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                    <BadgeCheck className="h-3 w-3" />
                    {organization.status}
                  </span>
                </div>

                <p className="mt-1 text-xs text-ink/40">
                  {organization.type} · {organization.registration}
                </p>
              </div>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-xs font-semibold text-ink/60 transition-colors hover:bg-ink/[0.03]"
            >
              <Upload className="h-3.5 w-3.5" />
              Change logo
            </button>
          </div>
        </div>

        <CardBody>
          <div className="grid gap-5 lg:grid-cols-2">
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

      {/* Main content */}
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          {/* Contact information */}
          <Card>
            <CardHeader
              title="Contact information"
              subtitle="Primary business contact details used by Build OS"
              action={
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink/50 transition-colors hover:text-ink"
                >
                  <Pencil className="h-3 w-3" />
                  Edit
                </button>
              }
            />

            <CardBody>
              <div className="grid gap-6 sm:grid-cols-2">
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

          {/* Organization description */}
          <Card>
            <CardHeader
              title="About the organization"
              subtitle="This information may be displayed on your marketplace profile."
            />

            <CardBody>
              <label className="block">
                <span className="text-xs font-semibold text-ink/60">
                  Organization description
                </span>

                <textarea
                  rows={5}
                  defaultValue={organization.description}
                  className="mt-2 w-full resize-none rounded-xl border border-line bg-paper-2 px-4 py-3 text-sm leading-6 text-ink outline-none transition focus:border-ink/20 focus:bg-white"
                  placeholder="Tell clients and partners about your organization..."
                />
              </label>

              <div className="mt-2 flex justify-end">
                <span className="text-[10px] text-ink/30">
                  Recommended: 150–500 characters
                </span>
              </div>
            </CardBody>
          </Card>

          {/* Branding */}
          <Card>
            <CardHeader
              title="Branding"
              subtitle="Control how your organization appears across Build OS."
            />

            <CardBody>
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border border-dashed border-line bg-paper-2">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-ink text-lg font-bold text-white">
                    BR
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-ink">
                    Organization logo
                  </p>

                  <p className="mt-1 max-w-md text-xs leading-5 text-ink/40">
                    Upload a clear organization logo. It will appear on your
                    organization profile, project records and selected
                    documents.
                  </p>

                  <button
                    type="button"
                    className="mt-3 inline-flex items-center gap-2 rounded-xl border border-line bg-white px-3.5 py-2 text-xs font-semibold text-ink/60 transition-colors hover:bg-ink/[0.03]"
                  >
                    <Upload className="h-3.5 w-3.5" />
                    Upload logo
                  </button>

                  <p className="mt-2 text-[10px] text-ink/30">
                    PNG, JPG or SVG · Recommended 512 × 512px
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Verification */}
          <Card>
            <div className="border-b border-line bg-paper-2 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                    Organization verification
                  </p>

                  <h2 className="mt-1 font-display text-lg font-semibold text-ink">
                    Verified business
                  </h2>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                </div>
              </div>
            </div>

            <CardBody>
              <div className="space-y-3">
                {verificationItems.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl bg-paper-2 px-3 py-3"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />

                    <span className="text-xs font-medium text-ink/60">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 border-t border-line pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-ink/40">
                    Verification status
                  </span>

                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
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
              subtitle="Business information"
            />

            <CardBody>
              <div className="space-y-4">
                <DetailRow
                  label="Registration"
                  value={organization.registration}
                />

                <DetailRow label="Tax ID" value={organization.taxId} />

                <DetailRow label="Industry" value={organization.industry} />

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

          {/* Security notice */}
          <Card>
            <CardBody>
              <div className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink/5">
                  <ShieldCheck className="h-4 w-4 text-ink/50" />
                </div>

                <div>
                  <p className="text-xs font-semibold text-ink">
                    Protected organization data
                  </p>

                  <p className="mt-1 text-xs leading-5 text-ink/40">
                    Legal and verification information is protected and access
                    is limited to authorized organization administrators.
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
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

      <input
        type="text"
        defaultValue={value}
        readOnly={readOnly}
        className={`mt-2 h-10 w-full rounded-xl border border-line px-3 text-sm text-ink outline-none transition ${
          readOnly
            ? 'cursor-not-allowed bg-paper-2 text-ink/45'
            : 'bg-white focus:border-ink/20'
        }`}
      />

      {readOnly && (
        <span className="mt-1.5 block text-[10px] text-ink/30">
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
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="flex gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink/5">
        <Icon className="h-4 w-4 text-ink/50" />
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
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
    <div className="flex items-start justify-between gap-4 border-b border-line pb-3 last:border-0 last:pb-0">
      <span className="text-xs text-ink/40">{label}</span>

      <span className="text-right text-xs font-semibold text-ink">
        {value}
      </span>
    </div>
  )
}