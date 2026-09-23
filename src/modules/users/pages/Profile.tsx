import type { ComponentType } from 'react'
import {
  BadgeCheck,
  Building2,
  Camera,
  Check,
  CheckCircle2,
  ChevronRight,
  FileCheck2,
  Globe2,
  IdCard,
  Mail,
  MapPin,
  Phone,
  Save,
  ShieldCheck,
  User,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'

/**
 * Profile — Users module
 *
 * BRD references:
 * - Sec. 15.1 — User Management / Profile
 * - Sec. 15.3 — Document Requirements
 * - Sec. 20.1 — Compliance Framework
 * - Sec. 22 — User Management & Identity / Verification
 *
 * Responsibilities:
 * - View and edit personal profile information
 * - Display account and verification status
 * - Display role and organization information
 * - Manage contact information
 * - Surface verification requirements and document status
 *
 * TODO:
 * - Connect profile data to authenticated-user API
 * - Add profile mutation
 * - Add profile image upload
 * - Add document upload / verification endpoints
 * - Add server-side validation
 * - Add success/error feedback
 */

const profile = {
  firstName: 'Ahmed',
  lastName: 'Muhammed',
  email: 'ahmed@example.com',
  phone: '+234 XXX XXX XXXX',
  role: 'Client Administrator',
  organization: 'Hamd Tech Ltd',
  country: 'Nigeria',
  address: 'Abuja, Nigeria',
  profileCompletion: 92,
  verificationStatus: 'Verified',
  accountStatus: 'Active',
}

const verificationItems = [
  {
    label: 'Identity verification',
    description: 'Government-issued identity information',
    status: 'Verified',
  },
  {
    label: 'Contact verification',
    description: 'Email and phone number',
    status: 'Verified',
  },
  {
    label: 'Account verification',
    description: 'Build OS account review',
    status: 'Verified',
  },
] as const

export function Profile() {
  return (
    <div className="space-y-8">
      {/* ------------------------------------------------------------------ */}
      {/* Hero */}
      {/* ------------------------------------------------------------------ */}

      <section className="relative overflow-hidden rounded-[24px] border border-ink/[0.07] bg-white px-6 py-7 shadow-[0_18px_50px_rgba(20,40,30,0.08)] sm:px-8 sm:py-8">
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#12613E]/[0.07] blur-3xl" />
        <div className="pointer-events-none absolute bottom-[-80px] left-1/3 h-48 w-48 rounded-full bg-[#B85C12]/[0.05] blur-3xl" />

        <div className="relative flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#12613E]/[0.08] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#12613E]">
                Account identity
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#12613E]/10 bg-[#12613E]/[0.04] px-3 py-1.5 text-[11px] font-medium text-[#12613E]">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Verified
              </span>
            </div>

            <h1 className="font-display text-3xl font-semibold tracking-[-0.04em] text-ink sm:text-4xl">
              Your profile.
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/55 sm:text-[15px]">
              Maintain the personal identity, contact information and
              verification records associated with your Build OS account.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:flex sm:items-center">
            <HeroMeta
              label="Status"
              value={profile.accountStatus}
            />

            <HeroMeta
              label="Verified"
              value={profile.verificationStatus}
            />

            <HeroMeta
              label="Complete"
              value={`${profile.profileCompletion}%`}
            />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Profile overview */}
      {/* ------------------------------------------------------------------ */}

      <Card>
        <CardBody>
          <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-5">
              <div className="relative shrink-0">
                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-[22px] bg-[#12613E]/[0.08] ring-1 ring-[#12613E]/10">
                  <User className="h-9 w-9 text-[#12613E]/60" />
                </div>

                <button
                  type="button"
                  aria-label="Change profile photo"
                  className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-[#18271F] text-white shadow-[0_8px_20px_rgba(24,39,31,0.18)] transition hover:bg-[#12613E] focus:outline-none focus:ring-2 focus:ring-[#12613E]/30 focus:ring-offset-2"
                >
                  <Camera className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] text-ink">
                    {profile.firstName} {profile.lastName}
                  </h2>

                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#12613E]/[0.08] px-2.5 py-1 text-[10px] font-semibold text-[#12613E]">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    Verified identity
                  </span>
                </div>

                <p className="mt-1 text-sm text-ink/50">
                  {profile.role}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-ink/40">
                  <span className="inline-flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5" />
                    {profile.organization}
                  </span>

                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    {profile.country}
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full max-w-sm">
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-ink">
                    Profile completion
                  </p>

                  <p className="mt-0.5 text-[11px] text-ink/40">
                    Your profile is almost complete.
                  </p>
                </div>

                <span className="text-sm font-semibold text-[#12613E]">
                  {profile.profileCompletion}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-ink/[0.08]">
                <div
                  className="h-full rounded-full bg-[#12613E] transition-all"
                  style={{ width: `${profile.profileCompletion}%` }}
                />
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* Personal information + account summary */}
      {/* ------------------------------------------------------------------ */}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <Card>
          <CardHeader
            title="Personal information"
            subtitle="Keep your account identity and contact details accurate."
          />

          <CardBody>
            <div className="grid gap-5 md:grid-cols-2">
              <ProfileField
                label="First name"
                value={profile.firstName}
                icon={User}
              />

              <ProfileField
                label="Last name"
                value={profile.lastName}
                icon={User}
              />

              <ProfileField
                label="Email address"
                value={profile.email}
                icon={Mail}
                verified
              />

              <ProfileField
                label="Phone number"
                value={profile.phone}
                icon={Phone}
                verified
              />

              <ProfileField
                label="Country"
                value={profile.country}
                icon={Globe2}
              />

              <ProfileField
                label="Address"
                value={profile.address}
                icon={MapPin}
              />
            </div>

            <div className="mt-6 flex flex-col gap-4 border-t border-ink/[0.06] pt-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#12613E]" />

                <p className="max-w-lg text-xs leading-5 text-ink/40">
                  Some identity fields may require additional verification
                  before changes can take effect.
                </p>
              </div>

              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#18271F] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(24,39,31,0.14)] transition hover:bg-[#12613E] focus:outline-none focus:ring-2 focus:ring-[#12613E]/30 focus:ring-offset-2"
              >
                <Save className="h-4 w-4" />
                Save changes
              </button>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Account summary"
            subtitle="Current identity and access status."
          />

          <CardBody>
            <div className="space-y-2">
              <SummaryRow
                icon={ShieldCheck}
                label="Account status"
                value={profile.accountStatus}
                positive
              />

              <SummaryRow
                icon={BadgeCheck}
                label="Verification"
                value={profile.verificationStatus}
                positive
              />

              <SummaryRow
                icon={Building2}
                label="Organization"
                value={profile.organization}
              />

              <SummaryRow
                icon={User}
                label="Role"
                value={profile.role}
              />
            </div>

            <div className="mt-5 rounded-[16px] border border-[#12613E]/10 bg-[#12613E]/[0.04] p-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#12613E]" />

                <div>
                  <p className="text-sm font-semibold text-ink">
                    Account in good standing
                  </p>

                  <p className="mt-1 text-xs leading-5 text-ink/45">
                    Your current account records show an active and verified
                    identity state.
                  </p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Verification */}
      {/* ------------------------------------------------------------------ */}

      <Card>
        <CardHeader
          title="Verification & identity"
          subtitle="Identity checks and records associated with your Build OS account."
        />

        <CardBody>
          <div className="grid gap-3 lg:grid-cols-3">
            {verificationItems.map((item) => (
              <VerificationCard
                key={item.label}
                label={item.label}
                description={item.description}
                status={item.status}
              />
            ))}
          </div>

          <div className="mt-5 flex flex-col gap-4 rounded-[20px] border border-[#12613E]/10 bg-[#12613E]/[0.035] p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#12613E]/[0.08]">
                <FileCheck2 className="h-4 w-4 text-[#12613E]" />
              </div>

              <div>
                <p className="text-sm font-semibold text-ink">
                  Verification complete
                </p>

                <p className="mt-1 max-w-2xl text-xs leading-5 text-ink/45">
                  Your account records currently satisfy the displayed
                  verification requirements. Verification and access
                  decisions remain controlled by the platform backend.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="inline-flex shrink-0 items-center justify-center gap-1.5 text-xs font-semibold text-[#12613E] transition hover:opacity-60"
            >
              View verification
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </CardBody>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* Organization */}
      {/* ------------------------------------------------------------------ */}

      <Card>
        <CardHeader
          title="Organization"
          subtitle="Professional or business information associated with your account."
        />

        <CardBody>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <ProfileField
              label="Organization"
              value={profile.organization}
              icon={Building2}
            />

            <ProfileField
              label="Account role"
              value={profile.role}
              icon={User}
            />

            <ProfileField
              label="Operating country"
              value={profile.country}
              icon={Globe2}
            />
          </div>
        </CardBody>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* Identity records */}
      {/* ------------------------------------------------------------------ */}

      <Card>
        <CardHeader
          title="Identity records"
          subtitle="Documents and contact records associated with your Build OS identity."
        />

        <CardBody>
          <div className="overflow-hidden rounded-[20px] border border-ink/[0.06]">
            <div className="divide-y divide-ink/[0.06]">
              <IdentityRecord
                icon={IdCard}
                title="Identity information"
                description="Government-issued identity record"
                status="Verified"
              />

              <IdentityRecord
                icon={Mail}
                title="Email address"
                description={profile.email}
                status="Verified"
              />

              <IdentityRecord
                icon={Phone}
                title="Phone number"
                description={profile.phone}
                status="Verified"
              />
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

// ============================================================================
// Supporting components
// ============================================================================

function HeroMeta({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="min-w-0 rounded-[16px] border border-ink/[0.07] bg-paper-2 px-4 py-3 sm:min-w-[100px]">
      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/35">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-ink">
        {value}
      </p>
    </div>
  )
}

function ProfileField({
  label,
  value,
  icon: Icon,
  verified = false,
}: {
  label: string
  value: string
  icon: ComponentType<{ className?: string }>
  verified?: boolean
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <label className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/40">
          {label}
        </label>

        {verified && (
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#12613E]">
            <CheckCircle2 className="h-3 w-3" />
            Verified
          </span>
        )}
      </div>

      <div className="flex items-center gap-3 rounded-[14px] border border-ink/[0.07] bg-paper-2 px-3.5 py-3 transition hover:border-ink/[0.12]">
        <Icon className="h-4 w-4 shrink-0 text-ink/35" />

        <input
          value={value}
          readOnly
          aria-label={label}
          className="min-w-0 flex-1 bg-transparent text-sm font-medium text-ink outline-none"
        />
      </div>
    </div>
  )
}

function SummaryRow({
  icon: Icon,
  label,
  value,
  positive = false,
}: {
  icon: ComponentType<{ className?: string }>
  label: string
  value: string
  positive?: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-[16px] border border-ink/[0.05] bg-paper-2 p-3.5">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white">
          <Icon className="h-4 w-4 text-ink/45" />
        </div>

        <span className="truncate text-sm text-ink/55">
          {label}
        </span>
      </div>

      <span
        className={`ml-3 shrink-0 text-xs font-semibold ${
          positive ? 'text-[#12613E]' : 'text-ink'
        }`}
      >
        {value}
      </span>
    </div>
  )
}

function VerificationCard({
  label,
  description,
  status,
}: {
  label: string
  description: string
  status: string
}) {
  return (
    <div className="group rounded-[20px] border border-ink/[0.06] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#12613E]/15 hover:shadow-[0_14px_34px_rgba(20,40,30,0.07)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#12613E]/[0.08]">
          <CheckCircle2 className="h-4 w-4 text-[#12613E]" />
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#12613E]/[0.08] px-2.5 py-1 text-[10px] font-semibold text-[#12613E]">
          <Check className="h-3 w-3" strokeWidth={3} />
          {status}
        </span>
      </div>

      <h3 className="mt-5 text-sm font-semibold tracking-[-0.01em] text-ink">
        {label}
      </h3>

      <p className="mt-1.5 text-xs leading-5 text-ink/45">
        {description}
      </p>
    </div>
  )
}

function IdentityRecord({
  icon: Icon,
  title,
  description,
  status,
}: {
  icon: ComponentType<{ className?: string }>
  title: string
  description: string
  status: string
}) {
  return (
    <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
      <div className="flex min-w-0 items-center gap-3.5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-paper-2">
          <Icon className="h-4 w-4 text-ink/50" />
        </div>

        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-ink">
            {title}
          </h3>

          <p className="mt-0.5 truncate text-xs text-ink/45">
            {description}
          </p>
        </div>
      </div>

      <span className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full bg-[#12613E]/[0.08] px-2.5 py-1 text-[10px] font-semibold text-[#12613E]">
        <CheckCircle2 className="h-3 w-3" />
        {status}
      </span>
    </div>
  )
}