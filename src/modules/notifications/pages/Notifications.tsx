import {
  Bell,
  Check,
  CheckCheck,
  ChevronRight,
  CircleAlert,
  Clock3,
  FileCheck2,
  ShieldAlert,
  Wallet,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { Card } from '@/components/ui/Card'

type NotificationType =
  | 'project'
  | 'payment'
  | 'milestone'
  | 'risk'
  | 'evidence'
  | 'system'

interface NotificationItem {
  id: string
  type: NotificationType
  title: string
  description: string
  time: string
  read: boolean
  actionLabel?: string
}

const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'risk',
    title: 'Budget risk detected',
    description:
      'Projected project spending is approaching the approved budget threshold.',
    time: '12 min ago',
    read: false,
    actionLabel: 'Review risk',
  },
  {
    id: 'notif-2',
    type: 'milestone',
    title: 'Milestone submitted for verification',
    description:
      'Foundation completion has been submitted with supporting evidence.',
    time: '48 min ago',
    read: false,
    actionLabel: 'Review milestone',
  },
  {
    id: 'notif-3',
    type: 'payment',
    title: 'Escrow release requires approval',
    description:
      'A payment release request is waiting for the required approval.',
    time: '2 hrs ago',
    read: false,
    actionLabel: 'Review request',
  },
  {
    id: 'notif-4',
    type: 'evidence',
    title: 'New evidence has been verified',
    description:
      'Submitted site evidence has successfully completed verification.',
    time: 'Yesterday',
    read: true,
    actionLabel: 'View evidence',
  },
  {
    id: 'notif-5',
    type: 'project',
    title: 'Project progress updated',
    description:
      'The project progress has been updated following the latest site report.',
    time: 'Yesterday',
    read: true,
    actionLabel: 'View project',
  },
  {
    id: 'notif-6',
    type: 'system',
    title: 'Weekly project summary is ready',
    description:
      'Your latest monitoring and project performance summary is available.',
    time: '2 days ago',
    read: true,
    actionLabel: 'View summary',
  },
]

const notificationMeta: Record<
  NotificationType,
  {
    label: string
    icon: typeof Bell
    iconClassName: string
    accentClassName: string
  }
> = {
  project: {
    label: 'Project',
    icon: Clock3,
    iconClassName: 'bg-[#12613E]/[0.08] text-[#12613E]',
    accentClassName: 'bg-[#12613E]',
  },
  payment: {
    label: 'Payment',
    icon: Wallet,
    iconClassName: 'bg-[#B85C12]/[0.10] text-[#B85C12]',
    accentClassName: 'bg-[#B85C12]',
  },
  milestone: {
    label: 'Milestone',
    icon: Check,
    iconClassName: 'bg-[#12613E]/[0.08] text-[#12613E]',
    accentClassName: 'bg-[#12613E]',
  },
  risk: {
    label: 'Risk alert',
    icon: ShieldAlert,
    iconClassName: 'bg-rose-50 text-rose-700',
    accentClassName: 'bg-rose-600',
  },
  evidence: {
    label: 'Evidence',
    icon: FileCheck2,
    iconClassName: 'bg-slate-100 text-slate-600',
    accentClassName: 'bg-slate-500',
  },
  system: {
    label: 'System',
    icon: Bell,
    iconClassName: 'bg-slate-100 text-slate-500',
    accentClassName: 'bg-slate-400',
  },
}

export function Notifications() {
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(initialNotifications)

  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  const unreadCount = useMemo(
    () => notifications.filter((notification) => !notification.read).length,
    [notifications],
  )

  const riskCount = useMemo(
    () =>
      notifications.filter(
        (notification) => notification.type === 'risk',
      ).length,
    [notifications],
  )

  const actionCount = useMemo(
    () =>
      notifications.filter(
        (notification) =>
          !notification.read && Boolean(notification.actionLabel),
      ).length,
    [notifications],
  )

  const visibleNotifications = useMemo(() => {
    if (filter === 'unread') {
      return notifications.filter((notification) => !notification.read)
    }

    return notifications
  }, [filter, notifications])

  const markAsRead = (id: string) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification,
      ),
    )
  }

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        read: true,
      })),
    )
  }

  return (
    <div className="space-y-8">
      {/* ------------------------------------------------------------------ */}
      {/* Hero                                                               */}
      {/* ------------------------------------------------------------------ */}

      <section className="relative overflow-hidden rounded-[24px] border border-ink/[0.07] bg-white px-6 py-7 shadow-[0_18px_50px_rgba(20,40,30,0.07)] sm:px-8 sm:py-8">
        <div className="pointer-events-none absolute -right-20 -top-28 h-64 w-64 rounded-full bg-[#12613E]/[0.07] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 left-1/3 h-52 w-52 rounded-full bg-[#B85C12]/[0.045] blur-3xl" />

        <div className="relative flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#12613E]/10 bg-[#12613E]/[0.045] px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#12613E]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#12613E]" />
                Notifications
              </span>

              {unreadCount > 0 && (
                <span className="rounded-full bg-[#B85C12] px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-white">
                  {unreadCount} new
                </span>
              )}
            </div>

            <h1 className="mt-5 font-display text-3xl font-semibold tracking-[-0.04em] text-[#18271F] sm:text-4xl">
              Notification centre
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-ink/50 sm:text-[15px]">
              A central view of project activity, approvals, financial
              actions, verification events, monitoring signals and other
              updates requiring your attention.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-ink/40">
              <HeroMeta label="Unread" value={`${unreadCount} updates`} />
              <HeroMeta label="Attention" value={`${actionCount} actions`} />
              <HeroMeta label="Risk" value={`${riskCount} alerts`} />
            </div>
          </div>

          <button
            type="button"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="group inline-flex h-11 shrink-0 items-center justify-center gap-2.5 rounded-xl bg-[#18271F] px-5 text-xs font-semibold text-white shadow-[0_12px_28px_rgba(24,39,31,0.14)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#12613E] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:translate-y-0"
          >
            <CheckCheck className="h-4 w-4" />
            Mark all as read
            <ChevronRight className="h-3.5 w-3.5 opacity-50 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Executive summary                                                  */}
      {/* ------------------------------------------------------------------ */}

      <section className="grid gap-4 sm:grid-cols-3">
        <SummaryCard
          eyebrow="Attention"
          label="Unread notifications"
          value={unreadCount}
          description={
            unreadCount > 0
              ? 'Updates awaiting your review.'
              : 'Everything has been reviewed.'
          }
          icon={Bell}
          tone="green"
        />

        <SummaryCard
          eyebrow="Exceptions"
          label="Risk alerts"
          value={riskCount}
          description={
            riskCount > 0
              ? 'Risk signals within the current feed.'
              : 'No risk alerts in this feed.'
          }
          icon={CircleAlert}
          tone="rose"
        />

        <SummaryCard
          eyebrow="Activity"
          label="Total updates"
          value={notifications.length}
          description="Recent project and platform activity."
          icon={CheckCheck}
          tone="bronze"
        />
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Notification register                                               */}
      {/* ------------------------------------------------------------------ */}

      <Card className="overflow-hidden border-ink/[0.07] shadow-[0_18px_50px_rgba(20,40,30,0.06)]">
        <div className="flex flex-col gap-5 border-b border-ink/[0.07] px-5 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display text-lg font-semibold tracking-[-0.02em] text-[#18271F]">
                Recent activity
              </h2>

              {unreadCount > 0 && (
                <span className="rounded-full bg-[#12613E]/[0.08] px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-[#12613E]">
                  {unreadCount} unread
                </span>
              )}
            </div>

            <p className="mt-1.5 text-xs leading-5 text-ink/45">
              Updates requiring attention and recent activity across your
              Build OS workspace.
            </p>
          </div>

          <div className="inline-flex w-fit rounded-xl border border-ink/[0.06] bg-ink/[0.025] p-1">
            <FilterButton
              active={filter === 'all'}
              onClick={() => setFilter('all')}
            >
              All
              <span className="ml-1.5 font-mono text-[9px] opacity-50">
                {notifications.length}
              </span>
            </FilterButton>

            <FilterButton
              active={filter === 'unread'}
              onClick={() => setFilter('unread')}
            >
              Unread
              {unreadCount > 0 && (
                <span className="ml-1.5 rounded-full bg-[#B85C12] px-1.5 py-0.5 font-mono text-[9px] text-white">
                  {unreadCount}
                </span>
              )}
            </FilterButton>
          </div>
        </div>

        {visibleNotifications.length > 0 ? (
          <div className="divide-y divide-ink/[0.07]">
            {visibleNotifications.map((notification) => {
              const meta = notificationMeta[notification.type]
              const Icon = meta.icon

              return (
                <article
                  key={notification.id}
                  className={`group relative px-5 py-5 transition duration-200 sm:px-6 ${
                    !notification.read
                      ? 'bg-[#12613E]/[0.018]'
                      : 'bg-white hover:bg-ink/[0.012]'
                  }`}
                >
                  {!notification.read && (
                    <span
                      className={`absolute inset-y-0 left-0 w-[3px] ${meta.accentClassName}`}
                    />
                  )}

                  <div className="flex gap-4 sm:gap-5">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] ${meta.iconClassName}`}
                    >
                      <Icon className="h-[18px] w-[18px]" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between lg:gap-6">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            {!notification.read && (
                              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#B85C12]" />
                            )}

                            <h3
                              className={`text-sm tracking-[-0.01em] ${
                                notification.read
                                  ? 'font-medium text-ink/75'
                                  : 'font-semibold text-[#18271F]'
                              }`}
                            >
                              {notification.title}
                            </h3>

                            <span className="rounded-full bg-ink/[0.035] px-2 py-0.5 font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-ink/40">
                              {meta.label}
                            </span>
                          </div>

                          <p className="mt-2 max-w-3xl text-sm leading-6 text-ink/50">
                            {notification.description}
                          </p>
                        </div>

                        <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.08em] text-ink/30">
                          {notification.time}
                        </span>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                        {notification.actionLabel && (
                          <button
                            type="button"
                            onClick={() => markAsRead(notification.id)}
                            className="group/action inline-flex items-center gap-1.5 text-xs font-semibold text-[#12613E] transition hover:text-[#0E4D32]"
                          >
                            {notification.actionLabel}
                            <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover/action:translate-x-0.5" />
                          </button>
                        )}

                        {!notification.read && (
                          <button
                            type="button"
                            onClick={() => markAsRead(notification.id)}
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-ink/40 transition hover:text-ink/70"
                          >
                            <Check className="h-3.5 w-3.5" />
                            Mark as read
                          </button>
                        )}

                        {notification.read && (
                          <span className="inline-flex items-center gap-1.5 text-[11px] text-ink/30">
                            <CheckCheck className="h-3.5 w-3.5" />
                            Read
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        ) : (
          <EmptyNotifications />
        )}

        <div className="flex flex-col gap-2 border-t border-ink/[0.07] bg-[#F8FAF8] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-[11px] text-ink/35">
            {visibleNotifications.length} of {notifications.length} notifications
            displayed
          </p>

          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink/30">
            Live workspace activity
          </span>
        </div>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* Footer metadata                                                    */}
      {/* ------------------------------------------------------------------ */}

      <div className="flex flex-col gap-3 border-t border-ink/[0.06] pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-ink/35">
          Notification preferences and delivery controls can be managed from
          your workspace settings.
        </p>

        <span className="w-fit rounded-full bg-ink/[0.04] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-ink/35">
          BRD ref: Sec. 20.2
        </span>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Supporting UI                                                             */
/* -------------------------------------------------------------------------- */

function HeroMeta({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink/30">
        {label}
      </span>

      <span className="font-medium text-ink/60">{value}</span>
    </div>
  )
}

function SummaryCard({
  eyebrow,
  label,
  value,
  description,
  icon: Icon,
  tone,
}: {
  eyebrow: string
  label: string
  value: number
  description: string
  icon: typeof Bell
  tone: 'green' | 'bronze' | 'rose'
}) {
  const styles = {
    green: {
      icon: 'bg-[#12613E]/[0.08] text-[#12613E]',
      value: 'text-[#12613E]',
    },
    bronze: {
      icon: 'bg-[#B85C12]/[0.09] text-[#B85C12]',
      value: 'text-[#B85C12]',
    },
    rose: {
      icon: 'bg-rose-50 text-rose-700',
      value: 'text-rose-700',
    },
  }[tone]

  return (
    <Card className="group border-ink/[0.07] p-5 shadow-[0_12px_35px_rgba(20,40,30,0.045)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(20,40,30,0.08)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-ink/35">
            {eyebrow}
          </p>

          <p className="mt-2 text-sm font-medium text-ink/65">
            {label}
          </p>

          <p
            className={`mt-2 font-display text-3xl font-semibold tracking-[-0.04em] ${styles.value}`}
          >
            {value}
          </p>

          <p className="mt-2 text-xs leading-5 text-ink/40">
            {description}
          </p>
        </div>

        <div
          className={`rounded-[14px] p-3 transition-transform duration-200 group-hover:scale-105 ${styles.icon}`}
        >
          <Icon className="h-[18px] w-[18px]" />
        </div>
      </div>
    </Card>
  )
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center rounded-lg px-3.5 py-2 text-xs font-semibold transition ${
        active
          ? 'bg-white text-[#18271F] shadow-[0_3px_10px_rgba(20,40,30,0.07)]'
          : 'text-ink/40 hover:text-ink/70'
      }`}
    >
      {children}
    </button>
  )
}

function EmptyNotifications() {
  return (
    <div className="flex min-h-[340px] flex-col items-center justify-center px-6 py-16 text-center">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-[#12613E]/[0.08] blur-xl" />

        <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-[#12613E]/10 bg-[#12613E]/[0.055] text-[#12613E]">
          <CheckCheck className="h-7 w-7" />
        </div>
      </div>

      <p className="mt-6 font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-[#12613E]/60">
        All clear
      </p>

      <h3 className="mt-2 font-display text-xl font-semibold tracking-[-0.025em] text-[#18271F]">
        You&apos;re all caught up
      </h3>

      <p className="mt-2 max-w-sm text-sm leading-6 text-ink/45">
        There are no unread notifications requiring your attention right now.
        New project activity will appear here as it occurs.
      </p>
    </div>
  )
}