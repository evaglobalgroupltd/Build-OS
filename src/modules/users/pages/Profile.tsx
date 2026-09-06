import {
  BadgeCheck,
  Building2,
  Camera,
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
 * BRD references:
 * - Sec. 15.1 — User Management / Profile
 * - Sec. 15.3 — Document Requirements
 * - Sec. 20.1 — Compliance Framework
 * - Sec. 22 — User Management & Identity/Verification
 *
 * Responsibilities:
 * - View and edit personal profile information
 * - Display account and verification status
 * - Display role and organization information
 * - Manage contact information
 * - Surface verification requirements and document status
 *
 * TODO:
 * - Connect fields to authenticated user profile API
 * - Add real document upload / verification endpoints
 * - Add profile image upload
 * - Add server-side validation
 * - Add save mutation and success/error feedback
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
]

export function Profile() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-ink/40">
            <User className="h-3.5 w-3.5" />
            Account
          </div>

          <h1 className="text-2xl font-semibold tracking-tight">
            Profile
          </h1>

          <p className="mt-1 max-w-2xl text-sm text-ink/50">
            Manage your personal information, contact details and account
            identity.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-success/10 px-3 py-1.5 text-xs font-medium text-success">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Account verified
          </span>
        </div>
      </div>

      {/* Profile Overview */}
      <Card>
        <CardBody>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-ink/5">
                  <User className="h-9 w-9 text-ink/30" />
                </div>

                <button
                  type="button"
                  aria-label="Change profile photo"
                  className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full border border-line bg-background shadow-sm transition hover:bg-paper-2"
                >
                  <Camera className="h-3.5 w-3.5" />
                </button>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl font-semibold">
                    {profile.firstName} {profile.lastName}
                  </h2>

                  <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-1 text-[11px] font-medium text-success">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    Verified
                  </span>
                </div>

                <p className="mt-1 text-sm text-ink/50">
                  {profile.role}
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink/40">
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

            <div className="w-full max-w-xs">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-medium text-ink/50">
                  Profile completion
                </span>

                <span className="text-xs font-semibold">
                  {profile.profileCompletion}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-ink/10">
                <div
                  className="h-full rounded-full bg-ink transition-all"
                  style={{ width: `${profile.profileCompletion}%` }}
                />
              </div>

              <p className="mt-2 text-[11px] text-ink/40">
                Your profile is almost complete.
              </p>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Main Content */}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        {/* Personal Information */}
        <Card>
          <CardHeader
            title="Personal Information"
            subtitle="Keep your account details accurate and up to date."
          />

          <CardBody>
            <div className="grid gap-5 md:grid-cols-2">
              <ProfileField
                label="First Name"
                value={profile.firstName}
                icon={User}
              />

              <ProfileField
                label="Last Name"
                value={profile.lastName}
                icon={User}
              />

              <ProfileField
                label="Email Address"
                value={profile.email}
                icon={Mail}
                verified
              />

              <ProfileField
                label="Phone Number"
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

            <div className="mt-6 flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-5 text-ink/40">
                Some identity fields may require verification before they can
                be changed.
              </p>

              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
              >
                <Save className="h-4 w-4" />
                Save Changes
              </button>
            </div>
          </CardBody>
        </Card>

        {/* Account Summary */}
        <Card>
          <CardHeader
            title="Account Summary"
            subtitle="Your current account status."
          />

          <CardBody>
            <div className="space-y-3">
              <SummaryRow
                icon={ShieldCheck}
                label="Account Status"
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
          </CardBody>
        </Card>
      </div>

      {/* Verification */}
      <Card>
        <CardHeader
          title="Verification & Identity"
          subtitle="Your verification status and required account records."
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

          <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-line bg-paper-2 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-success/10">
                <FileCheck2 className="h-4 w-4 text-success" />
              </div>

              <div>
                <p className="text-sm font-medium">
                  Verification is complete
                </p>

                <p className="mt-1 text-xs leading-5 text-ink/45">
                  Your account has passed the required verification checks.
                  Verified accounts receive full role access.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="inline-flex shrink-0 items-center justify-center gap-1.5 text-xs font-medium text-ink transition hover:opacity-60"
            >
              View verification
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </CardBody>
      </Card>

      {/* Organization */}
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
              label="Account Role"
              value={profile.role}
              icon={User}
            />

            <ProfileField
              label="Operating Country"
              value={profile.country}
              icon={Globe2}
            />
          </div>
        </CardBody>
      </Card>

      {/* Identity Records */}
      <Card>
        <CardHeader
          title="Identity Records"
          subtitle="Documents and records associated with your Build OS identity."
        />

        <CardBody>
          <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line">
            <IdentityRecord
              icon={IdCard}
              title="Identity Information"
              description="Government-issued identity record"
              status="Verified"
            />

            <IdentityRecord
              icon={Mail}
              title="Email Address"
              description={profile.email}
              status="Verified"
            />

            <IdentityRecord
              icon={Phone}
              title="Phone Number"
              description={profile.phone}
              status="Verified"
            />
          </div>
        </CardBody>
      </Card>
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
  icon: React.ComponentType<{ className?: string }>
  verified?: boolean
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-xs font-medium uppercase tracking-wide text-ink/40">
          {label}
        </label>

        {verified && (
          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-success">
            <CheckCircle2 className="h-3 w-3" />
            Verified
          </span>
        )}
      </div>

      <div className="flex items-center gap-3 rounded-xl border border-line bg-background px-3.5 py-3 transition focus-within:border-ink/30">
        <Icon className="h-4 w-4 shrink-0 text-ink/35" />

        <input
          value={value}
          readOnly
          className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none"
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
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  positive?: boolean
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-paper-2 p-3.5">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-background">
          <Icon className="h-4 w-4 text-ink/45" />
        </div>

        <span className="truncate text-sm text-ink/55">
          {label}
        </span>
      </div>

      <span
        className={`ml-3 shrink-0 text-xs font-semibold ${
          positive ? 'text-success' : 'text-ink'
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
    <div className="rounded-2xl border border-line p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-success/10">
          <CheckCircle2 className="h-4 w-4 text-success" />
        </div>

        <span className="rounded-full bg-success/10 px-2.5 py-1 text-[10px] font-semibold text-success">
          {status}
        </span>
      </div>

      <h3 className="mt-4 text-sm font-semibold">
        {label}
      </h3>

      <p className="mt-1 text-xs leading-5 text-ink/45">
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
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  status: string
}) {
  return (
    <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-paper-2">
          <Icon className="h-4 w-4 text-ink/50" />
        </div>

        <div>
          <h3 className="text-sm font-medium">
            {title}
          </h3>

          <p className="mt-0.5 text-xs text-ink/45">
            {description}
          </p>
        </div>
      </div>

      <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-[10px] font-medium text-success">
        <CheckCircle2 className="h-3 w-3" />
        {status}
      </span>
    </div>
  )
}