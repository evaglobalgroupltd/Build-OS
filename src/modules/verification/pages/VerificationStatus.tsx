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
    description:
      'Required verification information was submitted for review.',
    date: '28 Aug 2026 · 10:42',
    completed: true,
  },
  {
    status: 'Under Review',
    description:
      'Build OS verification team is reviewing submitted information.',
    date: '28 Aug 2026 · 11:05',
    completed: true,
    current: true,
  },
  {
    status: 'Verified',
    description:
      'Verification is approved and full platform access is enabled.',
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
    <div className="space-y-7">
      {/* ------------------------------------------------------------------ */}
      {/* Header                                                              */}
      {/* ------------------------------------------------------------------ */}

      <Card className="relative overflow-hidden border-ink/[0.07] shadow-[0_18px_50px_rgba(20,40,30,0.055)]">
        <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#12613E]/[0.055] blur-3xl" />

        <div className="relative border-b border-ink/[0.06] px-6 py-7 sm:px-8">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] bg-ink text-white shadow-[0_10px_24px_rgba(20,40,30,0.12)]">
                <ShieldCheck className="h-6 w-6" />
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/35">
                    Compliance record
                  </span>

                  <span className="h-1 w-1 rounded-full bg-[#B85C12]" />
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-2.5">
                  <h1 className="font-display text-[30px] font-semibold tracking-[-0.035em] text-ink">
                    Verification status
                  </h1>

                  <StatusBadge status={verification.status} />
                </div>

                <p className="mt-2 max-w-2xl text-[13px] leading-6 text-ink/45">
                  Track the progress of your Build OS verification and
                  understand which platform activities are currently
                  available.
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                  <HeaderMeta
                    label="Verification ID"
                    value={verification.id}
                  />

                  <HeaderMeta
                    label="Profile"
                    value={verification.profileType}
                  />
                </div>
              </div>
            </div>

            <button
              type="button"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-ink/[0.08] bg-white px-4 py-2.5 text-[10px] font-semibold text-ink/60 shadow-[0_4px_14px_rgba(20,40,30,0.03)] transition-all hover:border-ink/15 hover:bg-paper-2 hover:text-ink"
            >
              <FileText className="h-3.5 w-3.5" />
              View documents
            </button>
          </div>
        </div>

        {/* Summary metrics */}
        <div className="grid divide-y divide-ink/[0.06] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <SummaryMetric
            icon={Clock3}
            label="Current status"
            value={verification.status}
            description="Awaiting verification decision"
            tone="bronze"
          />

          <SummaryMetric
            icon={FileCheck2}
            label="Completion"
            value={`${verification.completion}%`}
            description="Verification information submitted"
            tone="green"
          />

          <SummaryMetric
            icon={BadgeCheck}
            label="Review time"
            value={verification.estimatedReview}
            description="Estimated processing period"
            tone="neutral"
          />
        </div>
      </Card>

      <div className="grid gap-7 xl:grid-cols-3">
        {/* ---------------------------------------------------------------- */}
        {/* Main content                                                       */}
        {/* ---------------------------------------------------------------- */}

        <div className="space-y-7 xl:col-span-2">
          {/* Verification timeline */}
          <Card className="border-ink/[0.07] shadow-[0_14px_40px_rgba(20,40,30,0.035)]">
            <CardHeader
              title="Verification timeline"
              subtitle="History of your verification status"
            />

            <CardBody>
              <div className="space-y-0">
                {statusHistory.map((item, index) => {
                  const isLast = index === statusHistory.length - 1
                  const isCurrent = item.current

                  return (
                    <div
                      key={item.status}
                      className="flex gap-4"
                    >
                      <div className="flex flex-col items-center">
                        <div
                          className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] border ${
                            isCurrent
                              ? 'border-[#B85C12]/10 bg-[#F8EEE6] text-[#B85C12]'
                              : item.completed
                                ? 'border-[#12613E]/10 bg-[#EAF4EE] text-[#12613E]'
                                : 'border-ink/[0.06] bg-paper-2 text-ink/30'
                          }`}
                        >
                          {isCurrent ? (
                            <Clock3 className="h-4 w-4" />
                          ) : item.completed ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : (
                            <span className="text-[10px] font-semibold">
                              {index + 1}
                            </span>
                          )}
                        </div>

                        {!isLast && (
                          <div
                            className={`my-1.5 h-11 w-px ${
                              item.completed
                                ? 'bg-[#12613E]/20'
                                : 'bg-ink/[0.07]'
                            }`}
                          />
                        )}
                      </div>

                      <div
                        className={`min-w-0 ${
                          isLast ? 'pb-0' : 'pb-8'
                        }`}
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-[13px] font-semibold tracking-[-0.01em] text-ink">
                            {item.status}
                          </h3>

                          {isCurrent && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F8EEE6] px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.1em] text-[#B85C12]">
                              <span className="h-1 w-1 rounded-full bg-[#B85C12]" />
                              Current
                            </span>
                          )}

                          {!isCurrent && item.completed && (
                            <span className="rounded-full bg-[#EAF4EE] px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.1em] text-[#12613E]">
                              Complete
                            </span>
                          )}
                        </div>

                        <p className="mt-1 text-[11px] leading-5 text-ink/40">
                          {item.description}
                        </p>

                        <p
                          className={`mt-2 text-[9px] font-medium ${
                            item.date === 'Pending'
                              ? 'text-ink/25'
                              : 'text-ink/30'
                          }`}
                        >
                          {item.date}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardBody>
          </Card>

          {/* Document review */}
          <Card className="overflow-hidden border-ink/[0.07] shadow-[0_14px_40px_rgba(20,40,30,0.035)]">
            <CardHeader
              title="Document review"
              subtitle="Current status of submitted verification documents"
            />

            <div className="divide-y divide-ink/[0.055]">
              {documents.map((document) => {
                const approved = document.status === 'Approved'

                return (
                  <div
                    key={document.name}
                    className="group flex flex-col gap-3 px-6 py-5 transition-colors hover:bg-[#12613E]/[0.012] sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex min-w-0 items-center gap-3.5">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] border ${
                          approved
                            ? 'border-[#12613E]/10 bg-[#EAF4EE] text-[#12613E]'
                            : 'border-[#B85C12]/10 bg-[#F8EEE6] text-[#B85C12]'
                        }`}
                      >
                        <FileText className="h-4 w-4" />
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-[12px] font-semibold text-ink">
                            {document.name}
                          </p>

                          <DocumentStatus
                            status={document.status}
                          />
                        </div>

                        <p className="mt-1 text-[10px] leading-5 text-ink/40">
                          {document.description}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border border-ink/[0.07] bg-white px-3 py-2 text-[9px] font-semibold text-ink/50 transition-all hover:border-ink/15 hover:bg-paper-2 hover:text-ink sm:self-center"
                    >
                      View
                      <ChevronRight className="h-3 w-3 text-ink/25" />
                    </button>
                  </div>
                )
              })}
            </div>

            <div className="border-t border-ink/[0.06] bg-paper-2/50 px-6 py-4">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-ink/55 transition-colors hover:text-ink"
              >
                Manage verification documents
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </Card>

          {/* Review notice */}
          <Card className="border-[#B85C12]/10 bg-[#F8EEE6]/35 shadow-[0_14px_40px_rgba(20,40,30,0.025)]">
            <CardBody>
              <div className="flex gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] bg-[#F8EEE6] text-[#B85C12]">
                  <Info className="h-4 w-4" />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[12px] font-semibold text-ink">
                      Verification is currently under review
                    </p>

                    <span className="rounded-full bg-[#F8EEE6] px-2 py-1 text-[8px] font-semibold uppercase tracking-[0.1em] text-[#B85C12]">
                      In review
                    </span>
                  </div>

                  <p className="mt-1.5 max-w-2xl text-[11px] leading-5 text-ink/45">
                    Your submitted information has been received
                    successfully. Build OS may request additional
                    documentation if any information requires clarification.
                  </p>

                  <p className="mt-3 text-[9px] font-semibold uppercase tracking-[0.1em] text-ink/30">
                    Last updated{' '}
                    <span className="ml-1 normal-case tracking-normal text-ink/50">
                      {verification.lastUpdated}
                    </span>
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Sidebar                                                           */}
        {/* ---------------------------------------------------------------- */}

        <div className="space-y-7">
          {/* Verification profile */}
          <Card className="border-ink/[0.07] shadow-[0_14px_40px_rgba(20,40,30,0.035)]">
            <CardHeader
              title="Verification profile"
              subtitle="Account currently under review"
            />

            <CardBody>
              <div className="flex items-center gap-3.5">
                <div className="flex h-12 w-12 items-center justify-center rounded-[15px] bg-ink text-white">
                  <UserRound className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-[13px] font-semibold text-ink">
                    {verification.submittedBy}
                  </p>

                  <p className="mt-0.5 text-[10px] leading-4 text-ink/40">
                    {verification.profileType}
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-[14px] bg-paper-2 p-3.5">
                <p className="text-[8px] font-semibold uppercase tracking-[0.13em] text-ink/30">
                  Verification ID
                </p>

                <p className="mt-1 font-mono text-[11px] font-semibold text-ink/70">
                  {verification.id}
                </p>
              </div>
            </CardBody>
          </Card>

          {/* Access controls */}
          <Card className="border-ink/[0.07] shadow-[0_14px_40px_rgba(20,40,30,0.035)]">
            <CardHeader
              title="Platform access"
              subtitle="Access changes based on verification status"
            />

            <CardBody>
              <div className="space-y-2.5">
                {accessControls.map((item) => {
                  const available = item.status === 'Available'

                  return (
                    <div
                      key={item.label}
                      className="flex items-center justify-between gap-3 rounded-[14px] border border-ink/[0.045] bg-paper-2/70 px-3 py-3"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-[9px] ${
                            available
                              ? 'bg-[#EAF4EE] text-[#12613E]'
                              : 'bg-[#F8EEE6] text-[#B85C12]'
                          }`}
                        >
                          {available ? (
                            <CheckCircle2 className="h-3.5 w-3.5" />
                          ) : (
                            <LockKeyhole className="h-3.5 w-3.5" />
                          )}
                        </div>

                        <span className="text-[10px] font-medium leading-4 text-ink/60">
                          {item.label}
                        </span>
                      </div>

                      <span
                        className={`shrink-0 text-[8px] font-semibold uppercase tracking-[0.08em] ${
                          available
                            ? 'text-[#12613E]'
                            : 'text-[#B85C12]'
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

          {/* Lifecycle */}
          <Card className="border-ink/[0.07] shadow-[0_14px_40px_rgba(20,40,30,0.035)]">
            <CardHeader
              title="Verification lifecycle"
              subtitle="Build OS verification states"
            />

            <CardBody>
              <div className="space-y-1">
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
    <div className="flex flex-wrap items-center gap-1.5 text-[9px]">
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
/* Summary metric                                                             */
/* -------------------------------------------------------------------------- */

function SummaryMetric({
  icon: Icon,
  label,
  value,
  description,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  description: string
  tone: 'neutral' | 'bronze' | 'green'
}) {
  const toneStyles = {
    neutral: {
      icon: 'bg-ink/[0.045] text-ink/50',
      value: 'text-ink',
    },
    bronze: {
      icon: 'bg-[#F8EEE6] text-[#B85C12]',
      value: 'text-[#B85C12]',
    },
    green: {
      icon: 'bg-[#EAF4EE] text-[#12613E]',
      value: 'text-[#12613E]',
    },
  }

  const styles = toneStyles[tone]

  return (
    <div className="px-6 py-5">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-[12px] ${styles.icon}`}
        >
          <Icon className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <p className="text-[9px] font-semibold uppercase tracking-[0.13em] text-ink/30">
            {label}
          </p>

          <p
            className={`mt-0.5 truncate font-display text-[17px] font-semibold tracking-[-0.02em] ${styles.value}`}
          >
            {value}
          </p>
        </div>
      </div>

      <p className="mt-3 text-[10px] leading-4 text-ink/40">
        {description}
      </p>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Status badge                                                               */
/* -------------------------------------------------------------------------- */

function StatusBadge({
  status,
}: {
  status: VerificationStatusType
}) {
  const styles: Record<VerificationStatusType, string> = {
    Draft: 'bg-ink/[0.045] text-ink/50',
    Submitted: 'bg-[#F8EEE6] text-[#B85C12]',
    'Need More Information': 'bg-[#F8EEE6] text-[#B85C12]',
    Verified: 'bg-[#EAF4EE] text-[#12613E]',
    Suspended: 'bg-brick-light/45 text-brick',
    Rejected: 'bg-brick-light/45 text-brick',
  }

  const icons: Record<
    VerificationStatusType,
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
/* Document status                                                            */
/* -------------------------------------------------------------------------- */

function DocumentStatus({
  status,
}: {
  status: string
}) {
  const approved = status === 'Approved'

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.08em] ${
        approved
          ? 'bg-[#EAF4EE] text-[#12613E]'
          : 'bg-[#F8EEE6] text-[#B85C12]'
      }`}
    >
      {approved ? (
        <CheckCircle2 className="h-3 w-3" />
      ) : (
        <Clock3 className="h-3 w-3" />
      )}

      {status}
    </span>
  )
}

/* -------------------------------------------------------------------------- */
/* Lifecycle item                                                             */
/* -------------------------------------------------------------------------- */

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
    <div className="group flex gap-3 rounded-[13px] px-2 py-2.5 transition-colors hover:bg-paper-2">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-paper-2 text-ink/45 group-hover:bg-white">
        <Icon className="h-3.5 w-3.5" />
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-semibold text-ink">
          {title}
        </p>

        <p className="mt-0.5 text-[9px] leading-4 text-ink/40">
          {description}
        </p>
      </div>
    </div>
  )
}