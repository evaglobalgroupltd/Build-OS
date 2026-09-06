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
    className: string
  }
> = {
  project: {
    label: 'Project',
    icon: Clock3,
    className: 'bg-teal/10 text-teal',
  },
  payment: {
    label: 'Payment',
    icon: Wallet,
    className: 'bg-amber/10 text-amber',
  },
  milestone: {
    label: 'Milestone',
    icon: Check,
    className: 'bg-teal/10 text-teal',
  },
  risk: {
    label: 'Risk alert',
    icon: ShieldAlert,
    className: 'bg-laterite/10 text-laterite',
  },
  evidence: {
    label: 'Evidence',
    icon: FileCheck2,
    className: 'bg-ink/5 text-ink',
  },
  system: {
    label: 'System',
    icon: Bell,
    className: 'bg-ink/5 text-ink/70',
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
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 border-b border-ink/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40">
              Notifications
            </p>

            {unreadCount > 0 && (
              <span className="rounded-full bg-laterite px-2 py-0.5 font-mono text-[9px] font-semibold text-white">
                {unreadCount} new
              </span>
            )}
          </div>

          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Notification centre
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/55">
            Stay informed about project activity, milestone verification,
            payments, monitoring updates, evidence and risk alerts.
          </p>
        </div>

        <button
          type="button"
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-ink/10 bg-white px-4 py-2.5 text-xs font-medium text-ink transition hover:border-ink/20 hover:bg-ink/[0.02] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <CheckCheck className="h-4 w-4" />
          Mark all as read
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid gap-3 sm:grid-cols-3">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/40">
                Unread
              </p>

              <p className="mt-2 text-2xl font-semibold text-ink">
                {unreadCount}
              </p>
            </div>

            <div className="rounded-xl bg-laterite/10 p-2.5 text-laterite">
              <Bell className="h-5 w-5" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/40">
                Risk alerts
              </p>

              <p className="mt-2 text-2xl font-semibold text-ink">
                {
                  notifications.filter(
                    (notification) => notification.type === 'risk',
                  ).length
                }
              </p>
            </div>

            <div className="rounded-xl bg-laterite/10 p-2.5 text-laterite">
              <CircleAlert className="h-5 w-5" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/40">
                Total
              </p>

              <p className="mt-2 text-2xl font-semibold text-ink">
                {notifications.length}
              </p>
            </div>

            <div className="rounded-xl bg-teal/10 p-2.5 text-teal">
              <CheckCheck className="h-5 w-5" />
            </div>
          </div>
        </Card>
      </div>

      {/* Notifications */}
      <Card className="overflow-hidden">
        <div className="flex flex-col gap-4 border-b border-ink/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-sm font-semibold text-ink">
              Recent activity
            </h2>

            <p className="mt-1 text-xs text-ink/45">
              Updates requiring your attention and project activity.
            </p>
          </div>

          <div className="flex rounded-lg bg-ink/[0.04] p-1">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                filter === 'all'
                  ? 'bg-white text-ink shadow-sm'
                  : 'text-ink/45 hover:text-ink'
              }`}
            >
              All
            </button>

            <button
              type="button"
              onClick={() => setFilter('unread')}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                filter === 'unread'
                  ? 'bg-white text-ink shadow-sm'
                  : 'text-ink/45 hover:text-ink'
              }`}
            >
              Unread
              {unreadCount > 0 && (
                <span className="ml-1.5 font-mono text-[10px]">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {visibleNotifications.length > 0 ? (
          <div className="divide-y divide-ink/[0.08]">
            {visibleNotifications.map((notification) => {
              const meta = notificationMeta[notification.type]
              const Icon = meta.icon

              return (
                <div
                  key={notification.id}
                  className={`group flex gap-4 px-5 py-4 transition hover:bg-ink/[0.015] ${
                    !notification.read ? 'bg-teal/[0.025]' : ''
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${meta.className}`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-2">
                        {!notification.read && (
                          <span className="h-1.5 w-1.5 rounded-full bg-laterite" />
                        )}

                        <h3
                          className={`text-sm ${
                            notification.read
                              ? 'font-medium text-ink/75'
                              : 'font-semibold text-ink'
                          }`}
                        >
                          {notification.title}
                        </h3>
                      </div>

                      <span className="font-mono text-[10px] text-ink/35">
                        {notification.time}
                      </span>
                    </div>

                    <p className="mt-1.5 max-w-3xl text-sm leading-6 text-ink/50">
                      {notification.description}
                    </p>

                    <div className="mt-3 flex items-center gap-4">
                      {notification.actionLabel && (
                        <button
                          type="button"
                          onClick={() => markAsRead(notification.id)}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-teal transition hover:text-teal/70"
                        >
                          {notification.actionLabel}

                          <ChevronRight className="h-3.5 w-3.5" />
                        </button>
                      )}

                      {!notification.read && (
                        <button
                          type="button"
                          onClick={() => markAsRead(notification.id)}
                          className="text-xs text-ink/40 transition hover:text-ink"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="flex min-h-[280px] flex-col items-center justify-center px-6 text-center">
            <div className="rounded-full bg-teal/10 p-4 text-teal">
              <CheckCheck className="h-6 w-6" />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-ink">
              You&apos;re all caught up
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-ink/45">
              There are no unread notifications requiring your attention.
            </p>
          </div>
        )}
      </Card>

      {/* BRD reference */}
      <div className="flex justify-end">
        <span className="rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/40">
          BRD ref: Sec. 20.2
        </span>
      </div>
    </div>
  )
}