import {
  AlertCircle,
  BadgeCheck,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileCheck2,
  FileText,
  ShieldCheck,
  Upload,
} from 'lucide-react'

import { Card, CardBody } from '@/components/ui/Card'

type VerificationStatus =
  | 'verified'
  | 'submitted'
  | 'pending'
  | 'needs_information'
  | 'rejected'

interface VerificationDocument {
  name: string
  description: string
  status: VerificationStatus
  required: boolean
  submittedAt?: string
  note?: string
}

const documents: VerificationDocument[] = [
  {
    name: 'CAC Certificate',
    description: 'Certificate of company registration',
    status: 'verified',
    required: true,
    submittedAt: '18 Aug 2026',
  },
  {
    name: 'Tax Identification Number',
    description: 'Valid company TIN documentation',
    status: 'verified',
    required: true,
    submittedAt: '18 Aug 2026',
  },
  {
    name: 'Company Profile',
    description: 'Business profile and operating information',
    status: 'verified',
    required: true,
    submittedAt: '18 Aug 2026',
  },
  {
    name: 'Professional Licences',
    description: 'Applicable construction and professional licences',
    status: 'verified',
    required: true,
    submittedAt: '19 Aug 2026',
  },
  {
    name: 'Directors & Ownership',
    description: 'Directors and beneficial ownership information',
    status: 'submitted',
    required: true,
    submittedAt: '20 Aug 2026',
  },
  {
    name: 'Bank Account Verification',
    description: 'Verified settlement account details',
    status: 'pending',
    required: true,
    note: 'Awaiting verification',
  },
  {
    name: 'Project Portfolio',
    description: 'Completed projects, photos and evidence',
    status: 'verified',
    required: true,
    submittedAt: '19 Aug 2026',
  },
  {
    name: 'Insurance Certificate',
    description: 'Applicable contractor insurance coverage',
    status: 'needs_information',
    required: false,
    submittedAt: '20 Aug 2026',
    note: 'Additional evidence requested',
  },
]

const checks = [
  {
    label: 'Identity & business registration',
    description: 'Company registration and ownership records',
    status: 'complete',
  },
  {
    label: 'Professional credentials',
    description: 'Licences and professional documentation',
    status: 'complete',
  },
  {
    label: 'Financial verification',
    description: 'Settlement account and payment information',
    status: 'review',
  },
  {
    label: 'Portfolio & experience',
    description: 'Past project evidence and references',
    status: 'complete',
  },
  {
    label: 'Compliance review',
    description: 'Final platform compliance assessment',
    status: 'review',
  },
]

export function ContractorVerification() {
  const verifiedCount = documents.filter(
    (document) => document.status === 'verified',
  ).length

  const requiredDocuments = documents.filter(
    (document) => document.required,
  ).length

  const verificationPercentage = Math.round(
    (verifiedCount / requiredDocuments) * 100,
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5">
              <ShieldCheck className="h-5 w-5 text-ink/60" />
            </div>

            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/35">
              Contractor compliance
            </span>
          </div>

          <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Verification
          </h1>

          <p className="mt-1 max-w-2xl text-sm leading-6 text-ink/50">
            Manage your company credentials, supporting documents and Build OS
            verification status.
          </p>
        </div>

        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-700">
          <BadgeCheck className="h-4 w-4" />
          Verification in progress
        </span>
      </div>

      {/* Status overview */}
      <Card className="overflow-hidden">
        <CardBody>
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10">
                  <Building2 className="h-5 w-5 text-emerald-600" />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/35">
                    Company verification
                  </p>

                  <h2 className="mt-1 font-display text-lg font-semibold text-ink">
                    Apex Build & Engineering Ltd.
                  </h2>
                </div>
              </div>

              <p className="mt-5 max-w-2xl text-xs leading-5 text-ink/45">
                Your company has completed the core verification requirements.
                A small number of checks remain under review before full
                marketplace transaction access is enabled.
              </p>

              <div className="mt-5">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[10px] font-medium text-ink/40">
                    Verification progress
                  </span>

                  <span className="text-xs font-semibold text-ink">
                    {verificationPercentage}%
                  </span>
                </div>

                <div className="mt-2 h-2 overflow-hidden rounded-full bg-ink/5">
                  <div
                    className="h-full rounded-full bg-ink transition-all duration-500"
                    style={{
                      width: `${verificationPercentage}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="flex h-36 w-36 shrink-0 flex-col items-center justify-center rounded-full border-[9px] border-ink/10">
              <ShieldCheck className="h-6 w-6 text-emerald-600" />

              <p className="mt-1 font-display text-2xl font-bold text-ink">
                {verificationPercentage}%
              </p>

              <p className="text-[9px] font-medium uppercase tracking-wide text-ink/35">
                Complete
              </p>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Access notice */}
      <div className="flex items-start gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/[0.05] p-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/10">
          <Clock3 className="h-4 w-4 text-amber-600" />
        </div>

        <div>
          <p className="text-sm font-semibold text-ink">
            Final verification checks are in progress
          </p>

          <p className="mt-1 text-xs leading-5 text-ink/45">
            You can maintain your profile and portfolio while Build OS reviews
            the remaining verification items. Transaction capabilities may
            remain restricted until verification is complete.
          </p>
        </div>
      </div>

      {/* Verification checks */}
      <Card>
        <CardBody>
          <SectionHeading
            eyebrow="Verification pipeline"
            title="Compliance checks"
          />

          <div className="mt-6 grid gap-3 lg:grid-cols-2">
            {checks.map((check) => (
              <div
                key={check.label}
                className="flex items-center gap-3 rounded-xl border border-line bg-paper-2 p-4"
              >
                <div
                  className={
                    check.status === 'complete'
                      ? 'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10'
                      : 'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10'
                  }
                >
                  {check.status === 'complete' ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <Clock3 className="h-4 w-4 text-amber-600" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-ink">
                    {check.label}
                  </p>

                  <p className="mt-1 text-[10px] leading-4 text-ink/40">
                    {check.description}
                  </p>
                </div>

                <span
                  className={
                    check.status === 'complete'
                      ? 'rounded-full bg-emerald-500/10 px-2 py-1 text-[9px] font-semibold text-emerald-700'
                      : 'rounded-full bg-amber-500/10 px-2 py-1 text-[9px] font-semibold text-amber-700'
                  }
                >
                  {check.status === 'complete' ? 'Complete' : 'Under review'}
                </span>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Documents */}
      <Card className="overflow-hidden">
        <div className="border-b border-line px-6 py-5">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <SectionHeading
              eyebrow="Required records"
              title="Verification documents"
            />

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
            >
              <Upload className="h-3.5 w-3.5" />
              Upload document
            </button>
          </div>
        </div>

        <div className="divide-y divide-line">
          {documents.map((document) => (
            <DocumentRow
              key={document.name}
              document={document}
            />
          ))}
        </div>
      </Card>

      {/* Verification policy */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardBody>
            <SectionHeading
              eyebrow="Why verification matters"
              title="Marketplace access"
            />

            <div className="mt-5 space-y-3">
              <AccessItem
                title="Bid on verified projects"
                description="Required before submitting project bids."
                enabled={verificationPercentage >= 80}
              />

              <AccessItem
                title="Receive procurement requests"
                description="Verified contractors can participate in approved procurement."
                enabled={verificationPercentage >= 100}
              />

              <AccessItem
                title="Receive milestone payments"
                description="Payment access follows contract and escrow controls."
                enabled={verificationPercentage >= 100}
              />

              <AccessItem
                title="Verified contractor badge"
                description="Displayed across your marketplace profile."
                enabled={verificationPercentage >= 100}
              />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <SectionHeading
              eyebrow="Account support"
              title="Need to update your verification?"
            />

            <p className="mt-4 text-xs leading-5 text-ink/45">
              If company information has changed or an uploaded document has
              expired, submit the updated evidence through the verification
              workflow. Build OS will retain the review history and audit trail.
            </p>

            <button
              type="button"
              className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-ink/60 transition-colors hover:text-ink"
            >
              View verification requirements
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string
  title: string
}) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/35">
        {eyebrow}
      </p>

      <h2 className="mt-1 font-display text-lg font-semibold tracking-tight text-ink">
        {title}
      </h2>
    </div>
  )
}

function DocumentRow({
  document,
}: {
  document: VerificationDocument
}) {
  const statusConfig = {
    verified: {
      label: 'Verified',
      icon: CheckCircle2,
      className: 'bg-emerald-500/10 text-emerald-700',
    },
    submitted: {
      label: 'Submitted',
      icon: FileCheck2,
      className: 'bg-blue-500/10 text-blue-700',
    },
    pending: {
      label: 'Pending',
      icon: Clock3,
      className: 'bg-amber-500/10 text-amber-700',
    },
    needs_information: {
      label: 'Needs information',
      icon: AlertCircle,
      className: 'bg-orange-500/10 text-orange-700',
    },
    rejected: {
      label: 'Rejected',
      icon: AlertCircle,
      className: 'bg-red-500/10 text-red-600',
    },
  } as const

  const config = statusConfig[document.status]
  const Icon = config.icon

  return (
    <div className="flex flex-col gap-4 px-6 py-4 transition-colors hover:bg-ink/[0.015] sm:flex-row sm:items-center">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink/5">
          <FileText className="h-4 w-4 text-ink/50" />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs font-semibold text-ink">
              {document.name}
            </p>

            {document.required && (
              <span className="text-[9px] font-medium text-ink/30">
                Required
              </span>
            )}
          </div>

          <p className="mt-1 text-[10px] leading-4 text-ink/40">
            {document.description}
          </p>

          {document.submittedAt && (
            <p className="mt-1 text-[9px] text-ink/30">
              Submitted {document.submittedAt}
            </p>
          )}

          {document.note && (
            <p className="mt-1 text-[9px] font-medium text-amber-700">
              {document.note}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 sm:shrink-0">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[9px] font-semibold ${config.className}`}
        >
          <Icon className="h-3 w-3" />
          {config.label}
        </span>

        {(document.status === 'needs_information' ||
          document.status === 'rejected') && (
          <button
            type="button"
            className="inline-flex items-center gap-1 text-[10px] font-semibold text-ink/55 hover:text-ink"
          >
            Update
            <ChevronRight className="h-3 w-3" />
          </button>
        )}
      </div>
    </div>
  )
}

function AccessItem({
  title,
  description,
  enabled,
}: {
  title: string
  description: string
  enabled: boolean
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-line bg-paper-2 p-3.5">
      <div
        className={
          enabled
            ? 'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10'
            : 'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ink/5'
        }
      >
        {enabled ? (
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
        ) : (
          <Clock3 className="h-4 w-4 text-ink/35" />
        )}
      </div>

      <div>
        <p className="text-xs font-semibold text-ink">
          {title}
        </p>

        <p className="mt-1 text-[10px] leading-4 text-ink/40">
          {description}
        </p>
      </div>
    </div>
  )
}