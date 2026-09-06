import {
  BadgeCheck,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileCheck2,
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
    description: 'International passport, national ID or driver’s licence',
    status: 'Approved' as DocumentStatus,
    file: 'National_ID.pdf',
    updated: '28 Aug 2026',
  },
  {
    name: 'Proof of Address',
    type: 'Address verification',
    description: 'Recent utility bill, bank statement or equivalent',
    status: 'Approved' as DocumentStatus,
    file: 'Address_Proof.pdf',
    updated: '28 Aug 2026',
  },
  {
    name: 'Profile Photo',
    type: 'Identity verification',
    description: 'Recent clear profile photograph',
    status: 'Approved' as DocumentStatus,
    file: 'Profile_Photo.jpg',
    updated: '28 Aug 2026',
  },
  {
    name: 'Proof of Funds',
    type: 'Financial verification',
    description: 'Required where applicable based on project activity',
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
    description: 'Payment profile and proof of funds where required',
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
    <div className="space-y-6">
      {/* Header */}
      <Card className="overflow-hidden">
        <div className="border-b border-line bg-paper-2 px-6 py-6 sm:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-ink text-white shadow-sm">
                <ShieldCheck className="h-6 w-6" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">
                    Verification
                  </h1>

                  <VerificationStatusBadge status={verification.status} />
                </div>

                <p className="mt-1 max-w-2xl text-sm leading-6 text-ink/50">
                  Complete your Build OS verification to unlock full platform
                  access and participate in verified transactions.
                </p>

                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-ink/40">
                  <span>
                    Verification ID:{' '}
                    <span className="font-medium text-ink/60">
                      {verification.verificationId}
                    </span>
                  </span>

                  <span>
                    Submitted:{' '}
                    <span className="font-medium text-ink/60">
                      {verification.submittedAt}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-xs font-semibold text-ink transition-colors hover:bg-ink/[0.03]"
              >
                <HelpCircle className="h-3.5 w-3.5" />
                Need help?
              </button>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="px-6 py-5 sm:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/35">
                Verification progress
              </p>

              <p className="mt-1 font-display text-xl font-semibold text-ink">
                {verification.completion}% complete
              </p>
            </div>

            <p className="text-xs text-ink/40">
              {verification.estimatedReview} review time
            </p>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-ink/5">
            <div
              className="h-full rounded-full bg-ink transition-all duration-500"
              style={{ width: `${verification.completion}%` }}
            />
          </div>

          <div className="mt-3 flex justify-between text-[10px] text-ink/35">
            <span>Started</span>
            <span>Documents</span>
            <span>Review</span>
            <span>Verified</span>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-3">
        {/* Main */}
        <div className="space-y-6 xl:col-span-2">
          {/* Verification journey */}
          <Card>
            <CardHeader
              title="Verification journey"
              subtitle="Track each stage of your identity and compliance review"
            />

            <CardBody>
              <div className="space-y-1">
                {verificationSteps.map((step, index) => {
                  const isLast = index === verificationSteps.length - 1

                  return (
                    <div
                      key={step.title}
                      className="flex gap-4"
                    >
                      <div className="flex flex-col items-center">
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                            step.completed
                              ? 'bg-emerald-500/10'
                              : index === 3
                                ? 'bg-amber-500/10'
                                : 'bg-ink/5'
                          }`}
                        >
                          {step.completed ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                          ) : index === 3 ? (
                            <Clock3 className="h-4 w-4 text-amber-600" />
                          ) : (
                            <span className="text-xs font-semibold text-ink/40">
                              {index + 1}
                            </span>
                          )}
                        </div>

                        {!isLast && (
                          <div className="my-1 h-8 w-px bg-line" />
                        )}
                      </div>

                      <div className="pb-6">
                        <p className="text-sm font-semibold text-ink">
                          {step.title}
                        </p>

                        <p className="mt-1 text-xs leading-5 text-ink/40">
                          {step.description}
                        </p>

                        {index === 3 && (
                          <span className="mt-2 inline-flex rounded-full bg-amber-500/10 px-2.5 py-1 text-[10px] font-semibold text-amber-700">
                            Pending information
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardBody>
          </Card>

          {/* Documents */}
          <Card className="overflow-hidden">
            <CardHeader
              title="Verification documents"
              subtitle="Documents required to complete your Build OS verification"
            />

            <div className="divide-y divide-line">
              {documents.map((document) => (
                <DocumentRow
                  key={document.name}
                  document={document}
                />
              ))}
            </div>

            <div className="border-t border-line px-6 py-4">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
              >
                <Upload className="h-3.5 w-3.5" />
                Upload document
              </button>
            </div>
          </Card>

          {/* Review information */}
          <Card>
            <CardHeader
              title="Review information"
              subtitle="Current status of your Build OS verification review"
            />

            <CardBody>
              <div className="grid gap-5 sm:grid-cols-2">
                <ReviewItem
                  label="Verification status"
                  value={verification.status}
                />

                <ReviewItem
                  label="Verification ID"
                  value={verification.verificationId}
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

              <div className="mt-6 rounded-2xl border border-line bg-paper-2 p-4">
                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink/5">
                    <Info className="h-4 w-4 text-ink/50" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-ink">
                      What happens next?
                    </p>

                    <p className="mt-1 text-xs leading-5 text-ink/45">
                      Our verification team will review your submitted
                      information and documents. If additional information is
                      required, you will be notified and allowed to update the
                      affected fields.
                    </p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <Card className="overflow-hidden">
            <div className="border-b border-line bg-paper-2 p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                Current status
              </p>

              <h2 className="mt-1 font-display text-lg font-semibold text-ink">
                Verification review
              </h2>
            </div>

            <CardBody>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10">
                  <Clock3 className="h-5 w-5 text-amber-600" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-ink">
                    Under review
                  </p>

                  <p className="mt-1 text-xs text-ink/40">
                    {verification.estimatedReview}
                  </p>
                </div>
              </div>

              <div className="mt-5 border-t border-line pt-5">
                <p className="text-xs leading-5 text-ink/45">
                  Your submitted documents are currently being reviewed by
                  Build OS. You will receive an alert when the review is
                  completed or additional information is required.
                </p>
              </div>
            </CardBody>
          </Card>

          {/* Account type */}
          <Card>
            <CardHeader
              title="Verification profile"
              subtitle="Information being verified"
            />

            <CardBody>
              <div className="space-y-4">
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
          <Card>
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
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    </div>

                    <span className="text-xs font-medium text-ink/60">
                      {requirement}
                    </span>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Security */}
          <Card>
            <CardBody>
              <div className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink/5">
                  <ShieldCheck className="h-4 w-4 text-ink/55" />
                </div>

                <div>
                  <p className="text-xs font-semibold text-ink">
                    Your information is protected
                  </p>

                  <p className="mt-1 text-xs leading-5 text-ink/45">
                    Verification information is securely stored and only
                    accessible to authorized Build OS personnel and systems.
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
  const statusStyles = {
    Approved: 'bg-emerald-500/10 text-emerald-700',
    Pending: 'bg-amber-500/10 text-amber-700',
    Required: 'bg-ink/5 text-ink/50',
    Rejected: 'bg-rose-500/10 text-rose-700',
  }

  const statusIcon = {
    Approved: CheckCircle2,
    Pending: Clock3,
    Required: Upload,
    Rejected: XCircle,
  }

  const StatusIcon = statusIcon[document.status]

  return (
    <div className="flex flex-col gap-4 px-6 py-5 transition-colors hover:bg-ink/[0.02] sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink/5">
          <FileText className="h-4 w-4 text-ink/50" />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-semibold text-ink">
              {document.name}
            </h3>

            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[10px] font-semibold ${statusStyles[document.status]}`}
            >
              <StatusIcon className="h-3 w-3" />
              {document.status}
            </span>
          </div>

          <p className="mt-1 text-xs text-ink/40">
            {document.type}
          </p>

          <p className="mt-1 text-xs leading-5 text-ink/45">
            {document.description}
          </p>

          {document.file && (
            <p className="mt-2 text-[10px] font-medium text-ink/35">
              {document.file} · Updated {document.updated}
            </p>
          )}
        </div>
      </div>

      <button
        type="button"
        className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-xl border border-line bg-white px-3 py-2 text-xs font-semibold text-ink/60 transition-colors hover:bg-ink/[0.03] sm:self-center"
      >
        {document.status === 'Pending' ? 'Review' : 'View'}
        <ChevronRight className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}

function VerificationStatusBadge({
  status,
}: {
  status: VerificationStatus
}) {
  const styles = {
    Draft: 'bg-ink/5 text-ink/50',
    Submitted: 'bg-amber-500/10 text-amber-700',
    'Need More Information': 'bg-orange-500/10 text-orange-700',
    Verified: 'bg-emerald-500/10 text-emerald-700',
    Suspended: 'bg-rose-500/10 text-rose-700',
    Rejected: 'bg-rose-500/10 text-rose-700',
  }

  const icons = {
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
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${styles[status]}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {status}
    </span>
  )
}

function ReviewItem({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-ink">
        {value}
      </p>
    </div>
  )
}

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
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink/5">
        <Icon className="h-4 w-4 text-ink/50" />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-semibold text-ink">
          {title}
        </p>

        <p className="mt-0.5 text-[11px] leading-4 text-ink/40">
          {description}
        </p>
      </div>
    </div>
  )
}