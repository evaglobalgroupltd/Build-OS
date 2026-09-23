import {
  BadgeCheck,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  HelpCircle,
  Info,
  LockKeyhole,
  ShieldCheck,
  Upload,
  UserRound,
  XCircle,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'

type VerificationStatus =
  | 'Draft'
  | 'Submitted'
  | 'Need More Information'
  | 'Verified'
  | 'Suspended'
  | 'Rejected'

type DocumentStatus = 'Approved' | 'Pending' | 'Required' | 'Rejected'

const verification = {
  status: 'Submitted' as VerificationStatus,
  completion: 75,
  submittedAt: '28 Aug 2026 · 10:42',
  lastUpdated: '28 Aug 2026 · 10:42',
  verificationId: 'VER-2026-00841',
  estimatedReview: '1–2 business days',
}

const documents = [
  {
    name: 'Government-issued ID',
    type: 'Identity document',
    description:
      'International passport, national ID or driver’s licence',
    status: 'Approved' as DocumentStatus,
    file: 'National_ID.pdf',
    updated: '28 Aug 2026',
  },
  {
    name: 'Proof of Address',
    type: 'Address verification',
    description:
      'Recent utility bill, bank statement or equivalent',
    status: 'Approved' as DocumentStatus,
    file: 'Address_Proof.pdf',
    updated: '28 Aug 2026',
  },
  {
    name: 'Profile Photo',
    type: 'Identity verification',
    description:
      'Recent clear profile photograph',
    status: 'Approved' as DocumentStatus,
    file: 'Profile_Photo.jpg',
    updated: '28 Aug 2026',
  },
  {
    name: 'Proof of Funds',
    type: 'Financial verification',
    description:
      'Required where applicable based on project activity',
    status: 'Pending' as DocumentStatus,
    file: 'Proof_of_Funds.pdf',
    updated: '28 Aug 2026',
  },
]

const verificationSteps = [
  {
    title: 'Account information',
    description: 'Basic identity and contact information',
    completed: true,
  },
  {
    title: 'Identity verification',
    description: 'Government-issued identity document',
    completed: true,
  },
  {
    title: 'Address verification',
    description: 'Confirm your current residential address',
    completed: true,
  },
  {
    title: 'Financial verification',
    description:
      'Payment profile and proof of funds where required',
    completed: false,
  },
  {
    title: 'Final review',
    description: 'Build OS compliance team review',
    completed: false,
  },
]

const requirements = [
  'Full legal name',
  'Phone number and email',
  'Government-issued ID',
  'Profile photograph',
  'Country of residence',
  'Address information',
  'Payment profile',
  'Proof of funds where required',
]

export function Verification() {
  return (
    <div className="space-y-7">
      {/* ------------------------------------------------------------------ */}
      {/* Header / verification identity                                     */}
      {/* ------------------------------------------------------------------ */}

      <Card className="relative overflow-hidden border-ink/[0.07] shadow-[0_18px_50px_rgba(20,40,30,0.055)]">
        <div className="pointer-events-none absolute -right-28 -top-32 h-80 w-80 rounded-full bg-[#12613E]/[0.055] blur-3xl" />

        <div className="relative border-b border-ink/[0.06] px-6 py-7 sm:px-8">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] bg-ink text-white shadow-[0_10px_24px_rgba(20,40,30,0.12)]">
                <ShieldCheck className="h-6 w-6" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/35">
                    Account verification
                  </span>

                  <span className="h-1 w-1 rounded-full bg-[#B85C12]" />
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-2.5">
                  <h1 className="font-display text-[30px] font-semibold tracking-[-0.035em] text-ink">
                    Verification
                  </h1>

                  <VerificationStatusBadge
                    status={verification.status}
                  />
                </div>

                <p className="mt-2 max-w-2xl text-[13px] leading-6 text-ink/45">
                  Complete your Build OS verification to unlock full
                  platform access and participate in verified transactions.
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                  <HeaderMeta
                    label="Verification ID"
                    value={verification.verificationId}
                  />

                  <HeaderMeta
                    label="Submitted"
                    value={verification.submittedAt}
                  />
                </div>
              </div>
            </div>

            <button
              type="button"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-ink/[0.08] bg-white px-4 py-2.5 text-[10px] font-semibold text-ink/60 shadow-[0_4px_14px_rgba(20,40,30,0.03)] transition-all hover:border-ink/15 hover:bg-paper-2 hover:text-ink"
            >
              <HelpCircle className="h-3.5 w-3.5" />
              Need help?
            </button>
          </div>
        </div>

        {/* Progress */}
        <div className="relative px-6 py-6 sm:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-ink/35">
                Verification progress
              </p>

              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-display text-[30px] font-semibold tracking-[-0.04em] text-ink tabular-nums">
                  {verification.completion}%
                </span>

                <span className="text-[11px] text-ink/40">
                  complete
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-full bg-[#F8EEE6] px-3 py-1.5 text-[9px] font-semibold text-[#B85C12]">
              <Clock3 className="h-3 w-3" />
              {verification.estimatedReview} review time
            </div>
          </div>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-ink/[0.055]">
            <div
              className="h-full rounded-full bg-[#12613E] transition-all duration-500"
              style={{ width: `${verification.completion}%` }}
            />
          </div>

          <div className="mt-3 grid grid-cols-4 text-[9px] font-medium text-ink/30">
            <span>Started</span>
            <span className="text-center">Documents</span>
            <span className="text-center">Review</span>
            <span className="text-right">Verified</span>
          </div>
        </div>
      </Card>

      <div className="grid gap-7 xl:grid-cols-3">
        {/* ---------------------------------------------------------------- */}
        {/* Main column                                                       */}
        {/* ---------------------------------------------------------------- */}

        <div className="space-y-7 xl:col-span-2">
          {/* Verification journey */}
          <Card className="border-ink/[0.07] shadow-[0_14px_40px_rgba(20,40,30,0.035)]">
            <CardHeader
              title="Verification journey"
              subtitle="Track each stage of your identity and compliance review"
            />

            <CardBody>
              <div className="space-y-0">
                {verificationSteps.map((step, index) => {
                  const isLast =
                    index === verificationSteps.length - 1

                  const isCurrent = index === 3

                  return (
                    <div
                      key={step.title}
                      className="flex gap-4"
                    >
                      <div className="flex flex-col items-center">
                        <div
                          className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] border ${
                            step.completed
                              ? 'border-[#12613E]/10 bg-[#EAF4EE] text-[#12613E]'
                              : isCurrent
                                ? 'border-[#B85C12]/10 bg-[#F8EEE6] text-[#B85C12]'
                                : 'border-ink/[0.06] bg-paper-2 text-ink/35'
                          }`}
                        >
                          {step.completed ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : isCurrent ? (
                            <Clock3 className="h-4 w-4" />
                          ) : (
                            <span className="text-[10px] font-semibold">
                              {index + 1}
                            </span>
                          )}
                        </div>

                        {!isLast && (
                          <div
                            className={`my-1.5 h-9 w-px ${
                              index < 2
                                ? 'bg-[#12613E]/20'
                                : 'bg-ink/[0.07]'
                            }`}
                          />
                        )}
                      </div>

                      <div
                        className={`min-w-0 ${
                          isLast ? 'pb-0' : 'pb-7'
                        }`}
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-[13px] font-semibold tracking-[-0.01em] text-ink">
                            {step.title}
                          </p>

                          {step.completed && (
                            <span className="rounded-full bg-[#EAF4EE] px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.1em] text-[#12613E]">
                              Complete
                            </span>
                          )}

                          {isCurrent && (
                            <span className="rounded-full bg-[#F8EEE6] px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.1em] text-[#B85C12]">
                              In progress
                            </span>
                          )}
                        </div>

                        <p className="mt-1 text-[11px] leading-5 text-ink/40">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardBody>
          </Card>

          {/* Documents */}
          <Card className="overflow-hidden border-ink/[0.07] shadow-[0_14px_40px_rgba(20,40,30,0.035)]">
            <CardHeader
              title="Verification documents"
              subtitle="Documents required to complete your Build OS verification"
            />

            <div className="divide-y divide-ink/[0.055]">
              {documents.map((document) => (
                <DocumentRow
                  key={document.name}
                  document={document}
                />
              ))}
            </div>

            <div className="border-t border-ink/[0.06] bg-paper-2/50 px-6 py-4 sm:px-7">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-[10px] font-semibold text-white shadow-[0_7px_18px_rgba(20,40,30,0.10)] transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_22px_rgba(20,40,30,0.14)]"
              >
                <Upload className="h-3.5 w-3.5" />
                Upload document
              </button>
            </div>
          </Card>

          {/* Review information */}
          <Card className="border-ink/[0.07] shadow-[0_14px_40px_rgba(20,40,30,0.035)]">
            <CardHeader
              title="Review information"
              subtitle="Current status of your Build OS verification review"
            />

            <CardBody>
              <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                <ReviewItem
                  label="Verification status"
                  value={verification.status}
                  tone="bronze"
                />

                <ReviewItem
                  label="Verification ID"
                  value={verification.verificationId}
                  mono
                />

                <ReviewItem
                  label="Submitted"
                  value={verification.submittedAt}
                />

                <ReviewItem
                  label="Last updated"
                  value={verification.lastUpdated}
                />
              </div>

              <div className="mt-6 rounded-[16px] border border-[#12613E]/10 bg-[#EAF4EE]/45 p-4">
                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] bg-white text-[#12613E] shadow-[0_3px_10px_rgba(20,40,30,0.035)]">
                    <Info className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold text-ink">
                      What happens next?
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-ink/45">
                      Our verification team will review your submitted
                      information and documents. If additional information
                      is required, you will be notified and allowed to
                      update the affected fields.
                    </p>
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
          {/* Current status */}
          <Card className="overflow-hidden border-ink/[0.07] shadow-[0_14px_40px_rgba(20,40,30,0.035)]">
            <div className="border-b border-ink/[0.06] bg-paper-2/60 p-6">
              <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-ink/35">
                Current status
              </p>

              <h2 className="mt-1 font-display text-[19px] font-semibold tracking-[-0.025em] text-ink">
                Verification review
              </h2>
            </div>

            <CardBody>
              <div className="flex items-center gap-3.5">
                <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-[#F8EEE6] text-[#B85C12]">
                  <Clock3 className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-[13px] font-semibold text-ink">
                    Under review
                  </p>

                  <p className="mt-1 text-[10px] text-ink/40">
                    Estimated review: {verification.estimatedReview}
                  </p>
                </div>
              </div>

              <div className="mt-5 border-t border-ink/[0.06] pt-5">
                <p className="text-[11px] leading-5 text-ink/45">
                  Your submitted documents are currently being reviewed
                  by Build OS. You will receive an alert when the review
                  is completed or additional information is required.
                </p>
              </div>
            </CardBody>
          </Card>

          {/* Verification profile */}
          <Card className="border-ink/[0.07] shadow-[0_14px_40px_rgba(20,40,30,0.035)]">
            <CardHeader
              title="Verification profile"
              subtitle="Information being verified"
            />

            <CardBody>
              <div className="space-y-1">
                <ProfileType
                  icon={UserRound}
                  title="Individual identity"
                  description="Personal identity and contact information"
                />

                <ProfileType
                  icon={Building2}
                  title="Transaction profile"
                  description="Payment and funding information"
                />

                <ProfileType
                  icon={LockKeyhole}
                  title="Platform security"
                  description="Access to protected Build OS workflows"
                />
              </div>
            </CardBody>
          </Card>

          {/* Requirements */}
          <Card className="border-ink/[0.07] shadow-[0_14px_40px_rgba(20,40,30,0.035)]">
            <CardHeader
              title="Required information"
              subtitle="Build OS verification checklist"
            />

            <CardBody>
              <div className="space-y-3">
                {requirements.map((requirement) => (
                  <div
                    key={requirement}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[8px] bg-[#EAF4EE]">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#12613E]" />
                    </div>

                    <span className="text-[11px] font-medium text-ink/60">
                      {requirement}
                    </span>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Security */}
          <Card className="border-ink/[0.07] shadow-[0_14px_40px_rgba(20,40,30,0.035)]">
            <CardBody>
              <div className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] bg-[#EAF4EE] text-[#12613E]">
                  <ShieldCheck className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-[11px] font-semibold text-ink">
                    Your information is protected
                  </p>

                  <p className="mt-1 text-[10px] leading-5 text-ink/40">
                    Verification information is securely stored and only
                    accessible to authorized Build OS personnel and
                    systems.
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

/* -------------------------------------------------------------------------- */
/* Header metadata                                                            */
/* -------------------------------------------------------------------------- */

function HeaderMeta({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-1.5 text-[9px]">
      <span className="font-semibold uppercase tracking-[0.1em] text-ink/30">
        {label}
      </span>

      <span className="font-medium text-ink/60">
        {value}
      </span>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Document row                                                               */
/* -------------------------------------------------------------------------- */

function DocumentRow({
  document,
}: {
  document: {
    name: string
    type: string
    description: string
    status: DocumentStatus
    file: string
    updated: string
  }
}) {
  const statusStyles: Record<DocumentStatus, string> = {
    Approved: 'bg-[#EAF4EE] text-[#12613E]',
    Pending: 'bg-[#F8EEE6] text-[#B85C12]',
    Required: 'bg-ink/[0.045] text-ink/50',
    Rejected: 'bg-brick-light/45 text-brick',
  }

  const statusIcon: Record<
    DocumentStatus,
    React.ComponentType<{ className?: string }>
  > = {
    Approved: CheckCircle2,
    Pending: Clock3,
    Required: Upload,
    Rejected: XCircle,
  }

  const StatusIcon = statusIcon[document.status]

  return (
    <div className="group px-6 py-5 transition-colors hover:bg-[#12613E]/[0.012] sm:px-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-3.5">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] border ${
              document.status === 'Approved'
                ? 'border-[#12613E]/10 bg-[#EAF4EE] text-[#12613E]'
                : document.status === 'Pending'
                  ? 'border-[#B85C12]/10 bg-[#F8EEE6] text-[#B85C12]'
                  : document.status === 'Rejected'
                    ? 'border-brick/10 bg-brick-light/40 text-brick'
                    : 'border-ink/[0.06] bg-paper-2 text-ink/45'
            }`}
          >
            <FileText className="h-4 w-4" />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-[13px] font-semibold tracking-[-0.01em] text-ink">
                {document.name}
              </h3>

              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.08em] ${statusStyles[document.status]}`}
              >
                <StatusIcon className="h-3 w-3" />
                {document.status}
              </span>
            </div>

            <p className="mt-1 text-[9px] font-medium uppercase tracking-[0.08em] text-ink/30">
              {document.type}
            </p>

            <p className="mt-1 text-[11px] leading-5 text-ink/40">
              {document.description}
            </p>

            {document.file && (
              <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="rounded-full bg-paper-2 px-2.5 py-1 text-[9px] font-medium text-ink/50">
                  {document.file}
                </span>

                <span className="text-[9px] text-ink/30">
                  Updated {document.updated}
                </span>
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border border-ink/[0.08] bg-white px-3.5 py-2.5 text-[10px] font-semibold text-ink/55 shadow-[0_3px_10px_rgba(20,40,30,0.025)] transition-all hover:border-ink/15 hover:bg-paper-2 hover:text-ink sm:self-center"
        >
          {document.status === 'Pending' ? 'Review' : 'View'}
          <ChevronRight className="h-3.5 w-3.5 text-ink/25" />
        </button>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Verification status                                                       */
/* -------------------------------------------------------------------------- */

function VerificationStatusBadge({
  status,
}: {
  status: VerificationStatus
}) {
  const styles: Record<VerificationStatus, string> = {
    Draft: 'bg-ink/[0.045] text-ink/50',
    Submitted: 'bg-[#F8EEE6] text-[#B85C12]',
    'Need More Information':
      'bg-[#F8EEE6] text-[#B85C12]',
    Verified: 'bg-[#EAF4EE] text-[#12613E]',
    Suspended: 'bg-brick-light/45 text-brick',
    Rejected: 'bg-brick-light/45 text-brick',
  }

  const icons: Record<
    VerificationStatus,
    React.ComponentType<{ className?: string }>
  > = {
    Draft: FileText,
    Submitted: Clock3,
    'Need More Information': Info,
    Verified: BadgeCheck,
    Suspended: XCircle,
    Rejected: XCircle,
  }

  const Icon = icons[status]

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-semibold ${styles[status]}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {status}
    </span>
  )
}

/* -------------------------------------------------------------------------- */
/* Review metadata                                                            */
/* -------------------------------------------------------------------------- */

function ReviewItem({
  label,
  value,
  tone = 'neutral',
  mono = false,
}: {
  label: string
  value: string
  tone?: 'neutral' | 'bronze' | 'green'
  mono?: boolean
}) {
  const valueStyles = {
    neutral: 'text-ink',
    bronze: 'text-[#B85C12]',
    green: 'text-[#12613E]',
  }

  return (
    <div>
      <p className="text-[9px] font-semibold uppercase tracking-[0.13em] text-ink/30">
        {label}
      </p>

      <p
        className={`mt-1.5 text-[12px] font-semibold ${valueStyles[tone]} ${
          mono ? 'font-mono text-[11px]' : ''
        }`}
      >
        {value}
      </p>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Verification profile                                                      */
/* -------------------------------------------------------------------------- */

function ProfileType({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}) {
  return (
    <div className="group flex items-center gap-3 rounded-[14px] px-2 py-3 transition-colors hover:bg-paper-2">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] bg-paper-2 text-ink/50 transition-colors group-hover:bg-white">
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0">
        <p className="text-[11px] font-semibold text-ink">
          {title}
        </p>

        <p className="mt-0.5 text-[10px] leading-4 text-ink/40">
          {description}
        </p>
      </div>
    </div>
  )
}