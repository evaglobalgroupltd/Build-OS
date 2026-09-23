import { api } from '@/lib/api'
import type {
  Notification,
  NotificationListParams,
  NotificationListResponse,
  NotificationPreferences,
} from './types'

/**
 * Notifications module — API service layer
 *
 * BRD references:
 * - Sec. 20.2 — Notifications
 * - Sec. 28.1 — System/API integration
 *
 * Architecture:
 * UI / Pages
 *      ↓
 * Notification hooks / state
 *      ↓
 * notificationsService
 *      ↓
 * shared API client
 *      ↓
 * Notifications API
 *
 * This module is the single network boundary for notifications.
 * Components and pages should never call fetch/axios directly.
 *
 * Backend endpoint assumptions:
 *
 * GET    /notifications
 * GET    /notifications/:id
 * GET    /notifications/unread-count
 * PATCH  /notifications/:id/read
 * PATCH  /notifications/:id/unread
 * PATCH  /notifications/read-all
 * DELETE /notifications/:id
 *
 * GET    /notifications/preferences
 * PATCH  /notifications/preferences
 *
 * Update endpoint paths here when the final backend contract is confirmed.
 */

/* -------------------------------------------------------------------------- */
/* API response contracts                                                     */
/* -------------------------------------------------------------------------- */

interface UnreadCountResponse {
  count: number
}

/* -------------------------------------------------------------------------- */
/* Service                                                                     */
/* -------------------------------------------------------------------------- */

export const notificationsService = {
  /**
   * List notifications belonging to the authenticated user.
   *
   * Supports pagination, filtering and sorting through the shared
   * NotificationListParams contract.
   */
  async list(
    params?: NotificationListParams,
  ): Promise<NotificationListResponse> {
    const response = await api.get<NotificationListResponse>(
      '/notifications',
      {
        params,
      },
    )

    return response.data
  },

  /**
   * Retrieve a single notification.
   */
  async get(id: string): Promise<Notification> {
    const response = await api.get<Notification>(
      `/notifications/${id}`,
    )

    return response.data
  },

  /**
   * Retrieve the unread notification count.
   *
   * This is intentionally kept separate from list() so the global
   * notification badge can remain lightweight.
   */
  async getUnreadCount(): Promise<number> {
    const response = await api.get<UnreadCountResponse>(
      '/notifications/unread-count',
    )

    return response.data.count
  },

  /**
   * Mark a notification as read.
   */
  async markAsRead(id: string): Promise<Notification> {
    const response = await api.patch<Notification>(
      `/notifications/${id}/read`,
    )

    return response.data
  },

  /**
   * Mark a notification as unread.
   */
  async markAsUnread(id: string): Promise<Notification> {
    const response = await api.patch<Notification>(
      `/notifications/${id}/unread`,
    )

    return response.data
  },

  /**
   * Mark every notification for the authenticated user as read.
   */
  async markAllAsRead(): Promise<void> {
    await api.patch('/notifications/read-all')
  },

  /**
   * Permanently remove/dismiss a notification.
   */
  async remove(id: string): Promise<void> {
    await api.delete(`/notifications/${id}`)
  },

  /**
   * Retrieve the authenticated user's notification preferences.
   */
  async getPreferences(): Promise<NotificationPreferences> {
    const response = await api.get<NotificationPreferences>(
      '/notifications/preferences',
    )

    return response.data
  },

  /**
   * Update one or more notification preferences.
   *
   * Partial updates allow the settings screen to change individual
   * preferences without replacing the entire preference object.
   */
  async updatePreferences(
    preferences: Partial<NotificationPreferences>,
  ): Promise<NotificationPreferences> {
    const response = await api.patch<NotificationPreferences>(
      '/notifications/preferences',
      preferences,
    )

    return response.data
  },
} as const

export type NotificationsService = typeof notificationsService