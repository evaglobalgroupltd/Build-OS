/**
 * Notifications module — shared domain types
 *
 * BRD references:
 *   - Sec. 20.2 — Notifications
 *   - Sec. 28.1 — API / Backend Integration
 *
 * Keep notification-specific types in this module.
 * Cross-cutting types such as User, UserRole and Project should remain
 * in the root `src/types`.
 */

/* -------------------------------------------------------------------------- */
/* Notification classification                                                 */
/* -------------------------------------------------------------------------- */

export type NotificationType =
  | 'project_update'
  | 'milestone'
  | 'risk_alert'
  | 'payment'
  | 'escrow'
  | 'deadline'
  | 'inspection'
  | 'approval'
  | 'message'
  | 'system'
  | 'security'

export type NotificationPriority =
  | 'low'
  | 'normal'
  | 'high'
  | 'critical'

/* -------------------------------------------------------------------------- */
/* Delivery channels                                                           */
/* -------------------------------------------------------------------------- */

export type NotificationChannel =
  | 'in_app'
  | 'email'
  | 'push'
  | 'sms'

export type NotificationFrequency =
  | 'instant'
  | 'daily'
  | 'weekly'

/* -------------------------------------------------------------------------- */
/* Notification entity                                                         */
/* -------------------------------------------------------------------------- */

export interface Notification {
  id: string

  /**
   * ID of the user who owns the notification.
   */
  userId: string

  /**
   * Classification used by the notification centre and filters.
   */
  type: NotificationType

  /**
   * Determines the visual importance and delivery behaviour.
   */
  priority: NotificationPriority

  /**
   * Notification content.
   */
  title: string
  message: string

  /**
   * Read state.
   */
  read: boolean
  readAt?: string

  /**
   * Optional project context.
   */
  projectId?: string
  projectName?: string

  /**
   * Optional entity references.
   * These allow a notification to deep-link into the relevant
   * Build OS resource.
   */
  milestoneId?: string
  transactionId?: string
  inspectionId?: string

  /**
   * Optional route/deep link.
   *
   * Example:
   * /projects/project-123/milestones/milestone-456
   */
  actionUrl?: string

  /**
   * Channels through which this notification was delivered.
   */
  channels?: NotificationChannel[]

  /**
   * Server-generated timestamps.
   */
  createdAt: string
}

/* -------------------------------------------------------------------------- */
/* Notification list / filtering                                               */
/* -------------------------------------------------------------------------- */

export interface NotificationListParams {
  page?: number
  limit?: number

  /**
   * When true, return only unread notifications.
   */
  unreadOnly?: boolean

  /**
   * Filter by notification category.
   */
  type?: NotificationType

  /**
   * Filter by notification severity.
   */
  priority?: NotificationPriority
}

export interface NotificationListResponse {
  notifications: Notification[]

  /**
   * Total number of notifications matching the query.
   */
  total: number

  /**
   * Current pagination state.
   */
  page: number
  limit: number

  /**
   * Total unread notifications for the current user.
   */
  unreadCount: number
}

/* -------------------------------------------------------------------------- */
/* Notification preferences                                                    */
/* -------------------------------------------------------------------------- */

export interface NotificationPreferences {
  /**
   * Delivery channels.
   */
  email: boolean
  push: boolean
  sms: boolean

  /**
   * Notification categories.
   */
  projectUpdates: boolean
  riskAlerts: boolean
  payments: boolean
  deadlines: boolean
  teamActivity: boolean

  /**
   * Frequency for non-critical notifications.
   */
  frequency: NotificationFrequency

  /**
   * Optional quiet-hours configuration.
   *
   * Critical notifications may still be delivered during quiet hours.
   */
  quietHours: boolean
  quietHoursStart?: string
  quietHoursEnd?: string
}

/* -------------------------------------------------------------------------- */
/* Notification actions                                                        */
/* -------------------------------------------------------------------------- */

export interface MarkNotificationReadPayload {
  notificationId: string
}

export interface MarkNotificationsReadPayload {
  notificationIds: string[]
}

/* -------------------------------------------------------------------------- */
/* Notification summary                                                        */
/* -------------------------------------------------------------------------- */

export interface NotificationSummary {
  total: number
  unread: number
  critical: number
  highPriority: number
}