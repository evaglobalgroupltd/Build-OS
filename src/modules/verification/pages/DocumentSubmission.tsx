import {
  AlertCircle,
  BadgeCheck,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileCheck2,
  FileText,
  Info,
  LockKeyhole,
  ShieldCheck,
  Upload,
  User,
  XCircle,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'

type DocumentStatus =
  | 'Approved'
  | 'Pending Review'
  | 'Required'
  | 'Rejected'

type VerificationDocument = {
  id: string
  name: string
  description: string
  status: DocumentStatus
  fileName?: string
  uploadedAt?: string
  required: boolean
  type: 'identity' | 'business' | 'financial' | 'professional' | 'address'
}

const documents: VerificationDocument[] = [
  {
    id: 'identity-document',
    name: 'Government-issued ID',
    description: 'Valid international passport, national ID or driver licence.',
    status: 'Approved',
    fileName: 'National_ID_Ahmed.pdf',
    uploadedAt: '30 Aug 2026 · 10:42',
    required: true,
    type: 'identity',
  },
  {
    id: 'proof-of-address',
    name: 'Proof of address',
    description: 'Recent utility bill, bank statement or recognized address document.',
    status: 'Pending Review',
    fileName: 'Utility_Bill_August_2026.pdf',
    uploadedAt: '31 Aug 2026 · 14:18',
    required: true,
    type: 'address',
  },
  {
    id: 'proof-of-funds',
    name: 'Proof of funds',
    description: 'Financial evidence may be required before project funding.',
    status: 'Required',
    required: true,
    type: 'financial',
  },
  {
    id: 'profile-photo',
    name: 'Profile photo',
    description: 'Clear recent photograph for account identification.',
    status: 'Approved',
    fileName: 'profile-photo.jpg',
    uploadedAt: '30 Aug 2026 · 10:45',
    required: true,
    type: 'identity',
  },
]

const businessDocuments: VerificationDocument[] = [
  {
    id: 'cac',
    name: 'CAC Certificate',
    description: 'Certificate of incorporation or business registration.',
    status: 'Approved',
    fileName: 'CAC_Certificate.pdf',
    uploadedAt: '29 Aug 2026 · 09:12',
    required: true,
    type: 'business',
  },
  {
    id: 'tin',
    name: 'Tax Identification Number',
    description: 'Valid TIN documentation for the registered business.',
    status: 'Approved',
    fileName: 'TIN_Certificate.pdf',
    uploadedAt: '29 Aug 2026 · 09:16',
    required: true,
    type: 'business',
  },
  {
    id: 'bank-verification',
    name: 'Bank account verification',
    description: 'Verified business bank account matching the registered entity.',
    status: 'Pending Review',
    fileName: 'Bank_Verification.pdf',
    uploadedAt: '31 Aug 2026 · 15:03',
    required: true,
    type: 'financial',
  },
  {
    id: 'business-address',
    name: 'Business address',
    description: 'Evidence confirming the operating address of the business.',
    status: 'Required',
    required: true,
    type: 'address',
  },
]

const verificationChecks = [
  {
    label: 'Identity verification',
    status: 'Completed',
    icon: CheckCircle2,
  },
  {
    label: 'Document completeness',
    status: 'In progress',
    icon: Clock3,
  },
  {
    label: 'Administrative review',
    status: 'Pending submission',
    icon: Clock3,
  },
]

export function DocumentSubmission() {
  const allDocuments = [...documents, ...businessDocuments]

  const approvedCount = allDocuments.filter(
    (document) => document.status === 'Approved',
  ).length

  const requiredCount = allDocuments.filter(
    (document) => document.required,
  ).length

  const completion = Math.round((approvedCount / requiredCount) * 100)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5">
              <ShieldCheck className="h-4 w-4 text-ink/60" />
            </div>

            <span className="text-xs font-semibold uppercase tracking-wide text-ink/40">
              Verification centre
            </span>
          </div>

          <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink">
            Verification Documents
          </h1>

          <p className="mt-1 max-w-2xl text-sm text-ink/45">
            Submit the documents required to verify your identity, business
            credentials and eligibility to transact on Build OS.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-700">
            <ShieldCheck className="h-3.5 w-3.5" />
            Verification in progress
          </span>
        </div>
      </div>

      {/* Progress overview */}
      <Card className="overflow-hidden">
        <div className="border-b border-line bg-paper-2 px-6 py-5 sm:px-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                Verification progress
              </p>

              <div className="mt-1 flex items-end gap-2">
                <span className="font-display text-3xl font-bold tracking-tight text-ink">
                  {completion}%
                </span>

                <span className="pb-1 text-xs text-ink/40">
                  documents approved
                </span>
              </div>
            </div>

            <div className="w-full lg:max-w-sm">
              <div className="flex items-center justify-between text-xs">
                <span className="text-ink/40">
                  {approvedCount} of {requiredCount} required documents
                </span>

                <span className="font-semibold text-ink">
                  {completion}%
                </span>
              </div>

              <div className="mt-2 h-2 overflow-hidden rounded-full bg-ink/5">
                <div
                  className="h-full rounded-full bg-ink transition-all duration-500"
                  style={{ width: `${completion}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <CardBody>
          <div className="grid gap-4 sm:grid-cols-3">
            {verificationChecks.map((check) => (
              <VerificationCheck
                key={check.label}
                icon={check.icon}
                label={check.label}
                status={check.status}
              />
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Important notice */}
      <div className="flex gap-3 rounded-2xl border border-blue-500/10 bg-blue-500/[0.04] px-5 py-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
          <Info className="h-4 w-4 text-blue-700" />
        </div>

        <div>
          <p className="text-xs font-semibold text-ink">
            Verification is required before transactions
          </p>

          <p className="mt-1 max-w-3xl text-xs leading-5 text-ink/45">
            Build OS requires identity, business and professional verification
            before users can participate in paid transactions. Your documents
            are reviewed securely by the verification team.
          </p>
        </div>
      </div>

      {/* Identity documents */}
      <DocumentSection
        title="Identity & personal information"
        subtitle="Documents used to verify your identity and account information."
        icon={User}
        documents={documents}
      />

      {/* Business documents */}
      <DocumentSection
        title="Business verification"
        subtitle="Business records required for marketplace and transaction access."
        icon={Building2}
        documents={businessDocuments}
      />

      {/* Security */}
      <Card>
        <CardBody>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink/5">
                <LockKeyhole className="h-4 w-4 text-ink/55" />
              </div>

              <div>
                <p className="text-sm font-semibold text-ink">
                  Your documents are protected
                </p>

                <p className="mt-1 max-w-2xl text-xs leading-5 text-ink/40">
                  Documents are stored securely and are accessible only to
                  authorized Build OS verification personnel and systems.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-medium text-ink/45">
              <ShieldCheck className="h-3.5 w-3.5" />
              Secure document handling
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

function DocumentSection({
  title,
  subtitle,
  icon: Icon,
  documents,
}: {
  title: string
  subtitle: string
  icon: React.ComponentType<{ className?: string }>
  documents: VerificationDocument[]
}) {
  return (
    <Card className="overflow-hidden">
      <CardHeader
        title={title}
        subtitle={subtitle}
      />

      <div className="divide-y divide-line">
        {documents.map((document) => (
          <DocumentRow
            key={document.id}
            document={document}
          />
        ))}
      </div>
    </Card>
  )
}

function DocumentRow({
  document,
}: {
  document: VerificationDocument
}) {
  const isApproved = document.status === 'Approved'
  const isPending = document.status === 'Pending Review'
  const isRejected = document.status === 'Rejected'
  const isRequired = document.status === 'Required'

  return (
    <div className="px-6 py-5 transition-colors hover:bg-ink/[0.015] sm:px-7">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
              isApproved
                ? 'bg-emerald-500/10'
                : isRejected
                  ? 'bg-rose-500/10'
                  : isPending
                    ? 'bg-amber-500/10'
                    : 'bg-ink/5'
            }`}
          >
            {isApproved ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            ) : isRejected ? (
              <XCircle className="h-4 w-4 text-rose-600" />
            ) : isPending ? (
              <Clock3 className="h-4 w-4 text-amber-600" />
            ) : (
              <FileText className="h-4 w-4 text-ink/45" />
            )}
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-semibold text-ink">
                {document.name}
              </h3>

              {document.required && (
                <span className="rounded-full bg-ink/5 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-ink/40">
                  Required
                </span>
              )}
            </div>

            <p className="mt-1 max-w-xl text-xs leading-5 text-ink/40">
              {document.description}
            </p>

            {document.fileName && (
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-ink/50">
                  <FileCheck2 className="h-3 w-3" />
                  {document.fileName}
                </span>

                {document.uploadedAt && (
                  <span className="text-[10px] text-ink/30">
                    Uploaded {document.uploadedAt}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <DocumentStatusBadge status={document.status} />

          {isRequired ? (
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-xl bg-ink px-3.5 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
            >
              <Upload className="h-3.5 w-3.5" />
              Upload
            </button>
          ) : (
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-white px-3 py-2.5 text-xs font-semibold text-ink/55 transition-colors hover:bg-ink/[0.03] hover:text-ink"
            >
              {isPending ? 'View submission' : 'View document'}
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {isRejected && (
        <div className="mt-4 flex gap-3 rounded-xl bg-rose-500/[0.04] px-4 py-3">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />

          <div>
            <p className="text-xs font-semibold text-rose-700">
              Document requires correction
            </p>

            <p className="mt-1 text-[11px] leading-5 text-rose-700/70">
              The submitted document could not be verified. Review the
              administrator's comments and upload a corrected document.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

function DocumentStatusBadge({
  status,
}: {
  status: DocumentStatus
}) {
  const styles: Record<DocumentStatus, string> = {
    Approved: 'bg-emerald-500/10 text-emerald-700',
    'Pending Review': 'bg-amber-500/10 text-amber-700',
    Required: 'bg-ink/5 text-ink/50',
    Rejected: 'bg-rose-500/10 text-rose-700',
  }

  const icons: Record<
    DocumentStatus,
    React.ComponentType<{ className?: string }>
  > = {
    Approved: CheckCircle2,
    'Pending Review': Clock3,
    Required: FileText,
    Rejected: XCircle,
  }

  const Icon = icons[status]

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1.5 text-[10px] font-semibold ${styles[status]}`}
    >
      <Icon className="h-3 w-3" />
      {status}
    </span>
  )
}

function VerificationCheck({
  icon: Icon,
  label,
  status,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  status: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-paper-2 px-4 py-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
        <Icon className="h-3.5 w-3.5 text-ink/50" />
      </div>

      <div>
        <p className="text-xs font-medium text-ink/70">
          {label}
        </p>

        <p className="mt-0.5 text-[10px] text-ink/35">
          {status}
        </p>
      </div>
    </div>
  )
}