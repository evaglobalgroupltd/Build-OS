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
    description:
      'Valid international passport, national ID or driver licence.',
    status: 'Approved',
    fileName: 'National_ID_Ahmed.pdf',
    uploadedAt: '30 Aug 2026 · 10:42',
    required: true,
    type: 'identity',
  },
  {
    id: 'proof-of-address',
    name: 'Proof of address',
    description:
      'Recent utility bill, bank statement or recognized address document.',
    status: 'Pending Review',
    fileName: 'Utility_Bill_August_2026.pdf',
    uploadedAt: '31 Aug 2026 · 14:18',
    required: true,
    type: 'address',
  },
  {
    id: 'proof-of-funds',
    name: 'Proof of funds',
    description:
      'Financial evidence may be required before project funding.',
    status: 'Required',
    required: true,
    type: 'financial',
  },
  {
    id: 'profile-photo',
    name: 'Profile photo',
    description:
      'Clear recent photograph for account identification.',
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
    description:
      'Certificate of incorporation or business registration.',
    status: 'Approved',
    fileName: 'CAC_Certificate.pdf',
    uploadedAt: '29 Aug 2026 · 09:12',
    required: true,
    type: 'business',
  },
  {
    id: 'tin',
    name: 'Tax Identification Number',
    description:
      'Valid TIN documentation for the registered business.',
    status: 'Approved',
    fileName: 'TIN_Certificate.pdf',
    uploadedAt: '29 Aug 2026 · 09:16',
    required: true,
    type: 'business',
  },
  {
    id: 'bank-verification',
    name: 'Bank account verification',
    description:
      'Verified business bank account matching the registered entity.',
    status: 'Pending Review',
    fileName: 'Bank_Verification.pdf',
    uploadedAt: '31 Aug 2026 · 15:03',
    required: true,
    type: 'financial',
  },
  {
    id: 'business-address',
    name: 'Business address',
    description:
      'Evidence confirming the operating address of the business.',
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
    tone: 'green',
  },
  {
    label: 'Document completeness',
    status: 'In progress',
    icon: Clock3,
    tone: 'bronze',
  },
  {
    label: 'Administrative review',
    status: 'Pending submission',
    icon: Clock3,
    tone: 'neutral',
  },
] as const

export function DocumentSubmission() {
  const allDocuments = [...documents, ...businessDocuments]

  const approvedCount = allDocuments.filter(
    (document) => document.status === 'Approved',
  ).length

  const requiredCount = allDocuments.filter(
    (document) => document.required,
  ).length

  const completion =
    requiredCount > 0
      ? Math.round((approvedCount / requiredCount) * 100)
      : 0

  return (
    <div className="space-y-7">
      {/* ------------------------------------------------------------------ */}
      {/* Header                                                             */}
      {/* ------------------------------------------------------------------ */}

      <section className="relative overflow-hidden rounded-[24px] border border-ink/[0.07] bg-white shadow-[0_18px_50px_rgba(20,40,30,0.055)]">
        <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#12613E]/[0.055] blur-3xl" />

        <div className="relative flex flex-col gap-6 p-6 sm:p-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#12613E]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/40">
                Verification centre
              </span>
            </div>

            <h1 className="mt-3 font-display text-[30px] font-semibold tracking-[-0.035em] text-ink sm:text-[34px]">
              Verification Documents
            </h1>

            <p className="mt-2 max-w-xl text-[13px] leading-6 text-ink/45">
              Securely manage the documents required to verify your identity,
              business credentials and eligibility to transact on Build OS.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <HeaderMeta
                icon={ShieldCheck}
                label="Secure verification"
              />

              <HeaderMeta
                icon={FileCheck2}
                label={`${approvedCount} documents approved`}
              />
            </div>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#12613E]/10 bg-[#EAF4EE] px-3.5 py-2 text-[10px] font-semibold text-[#12613E]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#12613E]" />
            <ShieldCheck className="h-3.5 w-3.5" />
            Verification in progress
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Progress overview                                                  */}
      {/* ------------------------------------------------------------------ */}

      <Card className="overflow-hidden border-ink/[0.07] shadow-[0_18px_50px_rgba(20,40,30,0.045)]">
        <div className="border-b border-ink/[0.06] bg-paper-2/60 px-6 py-5 sm:px-7">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/35">
                  Verification progress
                </span>

                <span className="h-1 w-1 rounded-full bg-[#B85C12]" />
              </div>

              <div className="mt-1 flex items-end gap-2">
                <span className="font-display text-[34px] font-semibold tracking-[-0.04em] text-ink tabular-nums">
                  {completion}%
                </span>

                <span className="pb-1.5 text-[11px] text-ink/40">
                  verification complete
                </span>
              </div>

              <p className="mt-1 text-[11px] text-ink/40">
                {approvedCount} of {requiredCount} required documents approved
              </p>
            </div>

            <div className="w-full lg:max-w-md">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium text-ink/35">
                  Document completion
                </span>

                <span className="text-[10px] font-semibold text-ink/60">
                  {completion}%
                </span>
              </div>

              <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-ink/[0.06]">
                <div
                  className="h-full rounded-full bg-[#12613E] transition-all duration-500"
                  style={{ width: `${completion}%` }}
                />
              </div>

              <div className="mt-2 flex items-center justify-between text-[9px] text-ink/30">
                <span>Submitted</span>
                <span>Reviewed</span>
                <span>Verified</span>
              </div>
            </div>
          </div>
        </div>

        <CardBody>
          <div className="grid gap-3 sm:grid-cols-3">
            {verificationChecks.map((check) => (
              <VerificationCheck
                key={check.label}
                icon={check.icon}
                label={check.label}
                status={check.status}
                tone={check.tone}
              />
            ))}
          </div>
        </CardBody>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* Important notice                                                   */}
      {/* ------------------------------------------------------------------ */}

      <div className="relative overflow-hidden rounded-[18px] border border-[#12613E]/10 bg-[#EAF4EE]/55 px-5 py-4">
        <div className="absolute -right-8 -top-10 h-28 w-28 rounded-full bg-[#12613E]/[0.045] blur-2xl" />

        <div className="relative flex gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-white text-[#12613E] shadow-[0_4px_12px_rgba(20,40,30,0.04)]">
            <Info className="h-4 w-4" />
          </div>

          <div>
            <p className="text-xs font-semibold text-ink">
              Verification is required before transactions
            </p>

            <p className="mt-1 max-w-3xl text-[11px] leading-5 text-ink/45">
              Build OS requires identity, business and professional
              verification before users can participate in paid transactions.
              Your documents are reviewed securely by authorized verification
              personnel.
            </p>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Identity documents                                                 */}
      {/* ------------------------------------------------------------------ */}

      <DocumentSection
        eyebrow="Personal verification"
        title="Identity & personal information"
        subtitle="Documents used to establish your identity and secure your account."
        icon={User}
        documents={documents}
      />

      {/* ------------------------------------------------------------------ */}
      {/* Business documents                                                 */}
      {/* ------------------------------------------------------------------ */}

      <DocumentSection
        eyebrow="Entity verification"
        title="Business verification"
        subtitle="Business records required for marketplace and transaction access."
        icon={Building2}
        documents={businessDocuments}
      />

      {/* ------------------------------------------------------------------ */}
      {/* Security                                                            */}
      {/* ------------------------------------------------------------------ */}

      <Card className="border-ink/[0.07] shadow-[0_14px_38px_rgba(20,40,30,0.035)]">
        <CardBody>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-[#EAF4EE] text-[#12613E]">
                <LockKeyhole className="h-4 w-4" />
              </div>

              <div>
                <p className="text-sm font-semibold tracking-[-0.01em] text-ink">
                  Your documents are protected
                </p>

                <p className="mt-1 max-w-2xl text-[11px] leading-5 text-ink/40">
                  Documents are stored securely and are accessible only to
                  authorized Build OS verification personnel and systems.
                </p>
              </div>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-ink/[0.07] bg-paper-2 px-3 py-2 text-[10px] font-semibold text-ink/50">
              <ShieldCheck className="h-3.5 w-3.5 text-[#12613E]" />
              Secure document handling
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Header metadata                                                            */
/* -------------------------------------------------------------------------- */

function HeaderMeta({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-ink/[0.07] bg-paper-2 px-3 py-1.5">
      <Icon className="h-3 w-3 text-[#12613E]" />

      <span className="text-[10px] font-medium text-ink/50">
        {label}
      </span>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Document section                                                           */
/* -------------------------------------------------------------------------- */

function DocumentSection({
  eyebrow,
  title,
  subtitle,
  icon: Icon,
  documents,
}: {
  eyebrow: string
  title: string
  subtitle: string
  icon: React.ComponentType<{ className?: string }>
  documents: VerificationDocument[]
}) {
  return (
    <Card className="overflow-hidden border-ink/[0.07] shadow-[0_18px_50px_rgba(20,40,30,0.035)]">
      <div className="border-b border-ink/[0.06] px-6 py-5 sm:px-7">
        <div className="flex items-start gap-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-[#EAF4EE] text-[#12613E]">
            <Icon className="h-4 w-4" />
          </div>

          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/35">
              {eyebrow}
            </p>

            <h2 className="mt-1 font-display text-[19px] font-semibold tracking-[-0.025em] text-ink">
              {title}
            </h2>

            <p className="mt-1 text-[11px] leading-5 text-ink/40">
              {subtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="divide-y divide-ink/[0.055]">
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

/* -------------------------------------------------------------------------- */
/* Document row                                                               */
/* -------------------------------------------------------------------------- */

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
    <div className="group px-6 py-5 transition-colors hover:bg-[#12613E]/[0.012] sm:px-7">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-start gap-3.5">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] border ${
              isApproved
                ? 'border-[#12613E]/10 bg-[#EAF4EE] text-[#12613E]'
                : isRejected
                  ? 'border-brick/10 bg-brick-light/40 text-brick'
                  : isPending
                    ? 'border-[#B85C12]/10 bg-[#F8EEE6] text-[#B85C12]'
                    : 'border-ink/[0.06] bg-paper-2 text-ink/45'
            }`}
          >
            {isApproved ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : isRejected ? (
              <XCircle className="h-4 w-4" />
            ) : isPending ? (
              <Clock3 className="h-4 w-4" />
            ) : (
              <FileText className="h-4 w-4" />
            )}
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-[13px] font-semibold tracking-[-0.01em] text-ink">
                {document.name}
              </h3>

              {document.required && (
                <span className="rounded-full bg-ink/[0.045] px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.12em] text-ink/40">
                  Required
                </span>
              )}
            </div>

            <p className="mt-1 max-w-xl text-[11px] leading-5 text-ink/40">
              {document.description}
            </p>

            {document.fileName && (
              <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-paper-2 px-2.5 py-1 text-[9px] font-medium text-ink/50">
                  <FileCheck2 className="h-3 w-3 text-[#12613E]" />
                  {document.fileName}
                </span>

                {document.uploadedAt && (
                  <span className="text-[9px] text-ink/30">
                    Uploaded {document.uploadedAt}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2.5">
          <DocumentStatusBadge status={document.status} />

          {isRequired ? (
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-2.5 text-[10px] font-semibold text-white shadow-[0_6px_16px_rgba(20,40,30,0.10)] transition-all hover:-translate-y-0.5 hover:shadow-[0_9px_20px_rgba(20,40,30,0.14)]"
            >
              <Upload className="h-3.5 w-3.5" />
              Upload
            </button>
          ) : (
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-full border border-ink/[0.08] bg-white px-3.5 py-2.5 text-[10px] font-semibold text-ink/55 shadow-[0_3px_10px_rgba(20,40,30,0.025)] transition-all hover:border-ink/15 hover:bg-paper-2 hover:text-ink"
            >
              {isPending ? 'View submission' : 'View document'}
              <ChevronRight className="h-3.5 w-3.5 text-ink/25" />
            </button>
          )}
        </div>
      </div>

      {isRejected && (
        <div className="mt-4 flex gap-3 rounded-[14px] border border-brick/10 bg-brick-light/35 px-4 py-3">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/70">
            <AlertCircle className="h-3.5 w-3.5 text-brick" />
          </div>

          <div>
            <p className="text-[11px] font-semibold text-brick">
              Document requires correction
            </p>

            <p className="mt-1 text-[10px] leading-5 text-brick/70">
              The submitted document could not be verified. Review the
              administrator's comments and upload a corrected document.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Document status                                                            */
/* -------------------------------------------------------------------------- */

function DocumentStatusBadge({
  status,
}: {
  status: DocumentStatus
}) {
  const styles: Record<DocumentStatus, string> = {
    Approved: 'bg-[#EAF4EE] text-[#12613E]',
    'Pending Review': 'bg-[#F8EEE6] text-[#B85C12]',
    Required: 'bg-ink/[0.045] text-ink/50',
    Rejected: 'bg-brick-light/45 text-brick',
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
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1.5 text-[9px] font-semibold ${styles[status]}`}
    >
      <Icon className="h-3 w-3" />
      {status}
    </span>
  )
}

/* -------------------------------------------------------------------------- */
/* Verification check                                                        */
/* -------------------------------------------------------------------------- */

function VerificationCheck({
  icon: Icon,
  label,
  status,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  status: string
  tone: 'neutral' | 'bronze' | 'green'
}) {
  const styles = {
    neutral: {
      icon: 'bg-white text-ink/40',
      status: 'text-ink/35',
    },
    bronze: {
      icon: 'bg-[#F8EEE6] text-[#B85C12]',
      status: 'text-[#B85C12]',
    },
    green: {
      icon: 'bg-[#EAF4EE] text-[#12613E]',
      status: 'text-[#12613E]',
    },
  }

  const style = styles[tone]

  return (
    <div className="flex items-center gap-3 rounded-[15px] border border-ink/[0.055] bg-paper-2 px-4 py-3.5">
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-[11px] ${style.icon}`}
      >
        <Icon className="h-3.5 w-3.5" />
      </div>

      <div className="min-w-0">
        <p className="truncate text-[11px] font-semibold text-ink/70">
          {label}
        </p>

        <p className={`mt-0.5 text-[9px] font-medium ${style.status}`}>
          {status}
        </p>
      </div>
    </div>
  )
}