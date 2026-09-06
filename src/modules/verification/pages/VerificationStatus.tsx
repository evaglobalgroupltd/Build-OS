import {
  BadgeCheck,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileCheck2,
  FileText,
  Info,
  LockKeyhole,
  ShieldCheck,
  UserRound,
  XCircle,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'

type VerificationStatusType =
  | 'Draft'
  | 'Submitted'
  | 'Need More Information'
  | 'Verified'
  | 'Suspended'
  | 'Rejected'

const verification = {
  id: 'VER-2026-00841',
  status: 'Submitted' as VerificationStatusType,
  submittedAt: '28 Aug 2026 · 10:42',
  lastUpdated: '28 Aug 2026 · 10:42',
  submittedBy: 'Ahmed Muhammed',
  profileType: 'Client / Diaspora Investor',
  completion: 75,
  estimatedReview: '1–2 business days',
}

const statusHistory = [
  {
    status: 'Draft',
    description: 'Verification profile was created.',
    date: '26 Aug 2026 · 14:18',
    completed: true,
  },
  {
    status: 'Submitted',
    description: 'Required verification information was submitted for review.',
    date: '28 Aug 2026 · 10:42',
    completed: true,
  },
  {
    status: 'Under Review',
    description: 'Build OS verification team is reviewing submitted information.',
    date: '28 Aug 2026 · 11:05',
    completed: true,
    current: true,
  },
  {
    status: 'Verified',
    description: 'Verification is approved and full platform access is enabled.',
    date: 'Pending',
    completed: false,
  },
]

const documents = [
  {
    name: 'Government-issued ID',
    status: 'Approved',
    description: 'Identity document successfully reviewed.',
  },
  {
    name: 'Proof of Address',
    status: 'Approved',
    description: 'Address information successfully verified.',
  },
  {
    name: 'Profile Photo',
    status: 'Approved',
    description: 'Profile identity image accepted.',
  },
  {
    name: 'Proof of Funds',
    status: 'Pending',
    description: 'Awaiting final review where applicable.',
  },
]

const accessControls = [
  {
    label: 'Create projects',
    status: 'Available',
  },
  {
    label: 'Upload project documents',
    status: 'Available',
  },
  {
    label: 'Fund escrow',
    status: 'Pending verification',
  },
  {
    label: 'Approve milestone payments',
    status: 'Pending verification',
  },
  {
    label: 'Complete paid transactions',
    status: 'Pending verification',
  },
]

export function VerificationStatus() {
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
                    Verification status
                  </h1>

                  <StatusBadge status={verification.status} />
                </div>

                <p className="mt-1 max-w-2xl text-sm leading-6 text-ink/50">
                  Track the progress of your Build OS verification and see
                  which platform activities are currently available.
                </p>

                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-ink/40">
                  <span>
                    Verification ID:{' '}
                    <span className="font-medium text-ink/60">
                      {verification.id}
                    </span>
                  </span>

                  <span>
                    Profile:{' '}
                    <span className="font-medium text-ink/60">
                      {verification.profileType}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-xs font-semibold text-ink transition-colors hover:bg-ink/[0.03]"
              >
                <FileText className="h-3.5 w-3.5" />
                View documents
              </button>
            </div>
          </div>
        </div>

        {/* Summary metrics */}
        <div className="grid divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <SummaryMetric
            icon={Clock3}
            label="Current status"
            value={verification.status}
            description="Awaiting verification decision"
          />

          <SummaryMetric
            icon={FileCheck2}
            label="Completion"
            value={`${verification.completion}%`}
            description="Verification information submitted"
          />

          <SummaryMetric
            icon={BadgeCheck}
            label="Review time"
            value={verification.estimatedReview}
            description="Estimated processing period"
          />
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-3">
        {/* Main content */}
        <div className="space-y-6 xl:col-span-2">
          {/* Status timeline */}
          <Card>
            <CardHeader
              title="Verification timeline"
              subtitle="History of your verification status"
            />

            <CardBody>
              <div className="space-y-1">
                {statusHistory.map((item, index) => {
                  const isLast = index === statusHistory.length - 1

                  return (
                    <div
                      key={item.status}
                      className="flex gap-4"
                    >
                      <div className="flex flex-col items-center">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                            item.completed
                              ? item.current
                                ? 'bg-amber-500/10'
                                : 'bg-emerald-500/10'
                              : 'bg-ink/5'
                          }`}
                        >
                          {item.current ? (
                            <Clock3 className="h-4 w-4 text-amber-600" />
                          ) : item.completed ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                          ) : (
                            <span className="text-xs font-semibold text-ink/30">
                              {index + 1}
                            </span>
                          )}
                        </div>

                        {!isLast && (
                          <div
                            className={`my-1 h-10 w-px ${
                              item.completed
                                ? 'bg-emerald-500/20'
                                : 'bg-line'
                            }`}
                          />
                        )}
                      </div>

                      <div className="min-w-0 pb-8">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-sm font-semibold text-ink">
                            {item.status}
                          </h3>

                          {item.current && (
                            <span className="rounded-full bg-amber-500/10 px-2 py-1 text-[10px] font-semibold text-amber-700">
                              Current
                            </span>
                          )}
                        </div>

                        <p className="mt-1 text-xs leading-5 text-ink/45">
                          {item.description}
                        </p>

                        <p className="mt-2 text-[10px] font-medium text-ink/30">
                          {item.date}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardBody>
          </Card>

          {/* Document summary */}
          <Card className="overflow-hidden">
            <CardHeader
              title="Document review"
              subtitle="Current status of submitted verification documents"
            />

            <div className="divide-y divide-line">
              {documents.map((document) => (
                <div
                  key={document.name}
                  className="flex items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-ink/[0.02]"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink/5">
                      <FileText className="h-4 w-4 text-ink/50" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-medium text-ink">
                        {document.name}
                      </p>

                      <p className="mt-0.5 text-xs text-ink/40">
                        {document.description}
                      </p>
                    </div>
                  </div>

                  <DocumentStatus status={document.status} />
                </div>
              ))}
            </div>

            <div className="border-t border-line px-6 py-4">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink/60 transition-colors hover:text-ink"
              >
                Manage verification documents
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </Card>

          {/* Review notice */}
          <Card>
            <CardBody>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10">
                  <Info className="h-4 w-4 text-amber-600" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-ink">
                    Verification is currently under review
                  </p>

                  <p className="mt-1 max-w-2xl text-xs leading-5 text-ink/45">
                    Your submitted information has been received successfully.
                    Build OS may request additional documentation if any
                    information requires clarification.
                  </p>

                  <p className="mt-3 text-xs font-medium text-ink/60">
                    Last updated: {verification.lastUpdated}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Identity */}
          <Card>
            <CardHeader
              title="Verification profile"
              subtitle="Account currently under review"
            />

            <CardBody>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink/5">
                  <UserRound className="h-5 w-5 text-ink/50" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-ink">
                    {verification.submittedBy}
                  </p>

                  <p className="mt-0.5 text-xs text-ink/40">
                    {verification.profileType}
                  </p>
                </div>
              </div>

              <div className="mt-5 border-t border-line pt-5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-ink/40">
                    Verification ID
                  </span>

                  <span className="font-semibold text-ink">
                    {verification.id}
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Access controls */}
          <Card>
            <CardHeader
              title="Platform access"
              subtitle="Access changes based on verification status"
            />

            <CardBody>
              <div className="space-y-3">
                {accessControls.map((item) => {
                  const available = item.status === 'Available'

                  return (
                    <div
                      key={item.label}
                      className="flex items-center justify-between gap-3 rounded-xl bg-paper-2 px-3 py-3"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                            available
                              ? 'bg-emerald-500/10'
                              : 'bg-amber-500/10'
                          }`}
                        >
                          {available ? (
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                          ) : (
                            <LockKeyhole className="h-3.5 w-3.5 text-amber-600" />
                          )}
                        </div>

                        <span className="text-xs font-medium text-ink/60">
                          {item.label}
                        </span>
                      </div>

                      <span
                        className={`shrink-0 text-[10px] font-semibold ${
                          available
                            ? 'text-emerald-700'
                            : 'text-amber-700'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  )
                })}
              </div>
            </CardBody>
          </Card>

          {/* Lifecycle explanation */}
          <Card>
            <CardHeader
              title="Verification lifecycle"
              subtitle="Build OS verification states"
            />

            <CardBody>
              <div className="space-y-4">
                <LifecycleItem
                  icon={FileText}
                  title="Draft"
                  description="Profile started but not submitted."
                />

                <LifecycleItem
                  icon={Clock3}
                  title="Submitted"
                  description="Documents submitted for review."
                />

                <LifecycleItem
                  icon={Info}
                  title="Need More Information"
                  description="Additional evidence or corrections required."
                />

                <LifecycleItem
                  icon={BadgeCheck}
                  title="Verified"
                  description="Full role and transaction access."
                />

                <LifecycleItem
                  icon={XCircle}
                  title="Rejected / Suspended"
                  description="Transaction access restricted."
                />
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}

function SummaryMetric({
  icon: Icon,
  label,
  value,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  description: string
}) {
  return (
    <div className="px-6 py-5">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5">
          <Icon className="h-4 w-4 text-ink/55" />
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
            {label}
          </p>

          <p className="mt-0.5 font-display text-lg font-semibold text-ink">
            {value}
          </p>
        </div>
      </div>

      <p className="mt-3 text-xs text-ink/40">
        {description}
      </p>
    </div>
  )
}

function StatusBadge({
  status,
}: {
  status: VerificationStatusType
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

function DocumentStatus({
  status,
}: {
  status: string
}) {
  const isApproved = status === 'Approved'

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
        isApproved
          ? 'bg-emerald-500/10 text-emerald-700'
          : 'bg-amber-500/10 text-amber-700'
      }`}
    >
      {isApproved ? (
        <CheckCircle2 className="h-3.5 w-3.5" />
      ) : (
        <Clock3 className="h-3.5 w-3.5" />
      )}

      {status}
    </span>
  )
}

function LifecycleItem({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}) {
  return (
    <div className="flex gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ink/5">
        <Icon className="h-3.5 w-3.5 text-ink/50" />
      </div>

      <div>
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