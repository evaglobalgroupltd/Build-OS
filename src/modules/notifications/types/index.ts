/**
 * Notifications module — shared domain types
 *
 * BRD references:
 * - Sec. 20.2 — Notifications
 * - Sec. 28.1 — API / Backend Integration
 *
 * Architecture:
 * - Notification-specific domain types live here.
 * - Cross-cutting entities such as User, UserRole and Project remain
 *   in the root `src/types` module.
 * - API request/response contracts are also kept here because they
 *   belong to the Notifications bounded context.
 *
 * This module is intentionally framework-agnostic.
 * It should not import React, API clients, routing utilities, or UI types.
 */

/* -------------------------------------------------------------------------- */
/* Notification classification                                                */
/* -------------------------------------------------------------------------- */

/**
 * Business event that generated the notification.
 */
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

/**
 * Business importance of a notification.
 *
 * Priority can influence:
 * - visual treatment
 * - ordering
 * - delivery behaviour
 * - quiet-hours handling
 * - escalation
 */
export type NotificationPriority =
  | 'low'
  | 'normal'
  | 'high'
  | 'critical'

/* -------------------------------------------------------------------------- */
/* Delivery channels                                                          */
/* -------------------------------------------------------------------------- */

export type NotificationChannel =
  | 'in_app'
  | 'email'
  | 'push'
  | 'sms'

/**
 * Frequency used for notifications that are eligible for batching.
 *
 * Critical notifications should remain eligible for immediate delivery
 * regardless of the user's normal frequency preference.
 */
export type NotificationFrequency =
  | 'instant'
  | 'daily'
  | 'weekly'

/* -------------------------------------------------------------------------- */
/* Notification entity                                                        */
/* -------------------------------------------------------------------------- */

export interface Notification {
  /**
   * Unique notification identifier.
   */
  id: string

  /**
   * Authenticated user who owns this notification.
   */
  userId: string

  /**
   * Business event that produced the notification.
   */
  type: NotificationType

  /**
   * Importance / escalation level.
   */
  priority: NotificationPriority

  /**
   * Primary notification content.
   */
  title: string
  message: string

  /**
   * Read state within the in-app notification centre.
   */
  read: boolean

  /**
   * Timestamp at which the notification was read.
   */
  readAt?: string

  /**
   * Optional project context.
   */
  projectId?: string
  projectName?: string

  /**
   * Optional domain references.
   *
   * These allow the notification centre to deep-link into the
   * underlying Build OS resource.
   */
  milestoneId?: string
  transactionId?: string
  inspectionId?: string

  /**
   * Optional deep-link to the relevant Build OS resource.
   *
   * Example:
   * /projects/project-123/milestones/milestone-456
   */
  actionUrl?: string

  /**
   * Channels through which this notification has been delivered
   * or is intended to be delivered.
   */
  channels?: NotificationChannel[]

  /**
   * Server-generated creation timestamp.
   */
  createdAt: string
}

/* -------------------------------------------------------------------------- */
/* Notification list / filtering                                              */
/* -------------------------------------------------------------------------- */

/**
 * Query parameters supported by the notification centre.
 */
export interface NotificationListParams {
  /**
   * One-based page number.
   */
  page?: number

  /**
   * Maximum number of notifications returned.
   */
  limit?: number

  /**
   * Return only unread notifications.
   */
  unreadOnly?: boolean

  /**
   * Filter by business event type.
   */
  type?: NotificationType

  /**
   * Filter by business priority.
   */
  priority?: NotificationPriority
}

/**
 * Paginated notification response.
 */
export interface NotificationListResponse {
  notifications: Notification[]

  /**
   * Total number of matching notifications across all pages.
   */
  total: number

  /**
   * Current one-based page.
   */
  page: number

  /**
   * Number of records requested per page.
   */
  limit: number

  /**
   * Total unread notifications for the authenticated user.
   *
   * This allows the notification centre and global header badge
   * to stay synchronized without an additional count request.
   */
  unreadCount: number
}

/* -------------------------------------------------------------------------- */
/* Notification preferences                                                   */
/* -------------------------------------------------------------------------- */

/**
 * User-level notification delivery preferences.
 *
 * These preferences control how Build OS communicates with the user.
 * They do not determine whether a business event itself is generated.
 */
export interface NotificationPreferences {
  /* Delivery channels ------------------------------------------------------ */

  email: boolean
  push: boolean
  sms: boolean

  /* Notification categories ---------------------------------------------- */

  projectUpdates: boolean
  riskAlerts: boolean
  payments: boolean
  deadlines: boolean
  teamActivity: boolean

  /**
   * Default delivery frequency for notifications that can be batched.
   */
  frequency: NotificationFrequency

  /* Quiet hours ------------------------------------------------------------ */

  /**
   * When enabled, non-critical notifications may be deferred
   * during the configured quiet period.
   */
  quietHours: boolean

  /**
   * Local/user-configured quiet-hours start time.
   *
   * Expected format:
   * HH:mm
   */
  quietHoursStart?: string

  /**
   * Local/user-configured quiet-hours end time.
   *
   * Expected format:
   * HH:mm
   */
  quietHoursEnd?: string
}

/* -------------------------------------------------------------------------- */
/* Notification preference update                                             */
/* -------------------------------------------------------------------------- */

/**
 * Partial update contract used by the settings screen.
 *
 * This allows a single preference to be changed without replacing
 * the complete preference object.
 */
export type UpdateNotificationPreferencesPayload =
  Partial<NotificationPreferences>

/* -------------------------------------------------------------------------- */
/* Notification actions                                                       */
/* -------------------------------------------------------------------------- */

/**
 * Explicit single-notification read action.
 *
 * Useful for UI/event handlers even when the service method only
 * requires the ID directly.
 */
export interface MarkNotificationReadPayload {
  notificationId: string
}

/**
 * Batch read action.
 */
export interface MarkNotificationsReadPayload {
  notificationIds: string[]
}

/* -------------------------------------------------------------------------- */
/* Notification summary                                                       */
/* -------------------------------------------------------------------------- */

/**
 * Lightweight aggregate used by dashboards, navigation badges,
 * notification centres and overview surfaces.
 */
export interface NotificationSummary {
  /**
   * Total notifications matching the relevant scope.
   */
  total: number

  /**
   * Notifications that have not been read.
   */
  unread: number

  /**
   * Critical notifications requiring immediate attention.
   */
  critical: number

  /**
   * High-priority notifications requiring elevated attention.
   */
  highPriority: number
}