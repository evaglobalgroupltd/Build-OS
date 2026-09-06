import { api } from '@/lib/api'
import type {
  Notification,
  NotificationPreferences,
  NotificationListParams,
  NotificationListResponse,
} from './types'

/**
 * Notifications module — API service layer
 *
 * BRD reference: Sec. 20.2 / 28.1
 *
 * All notification-related network communication belongs here.
 * Pages and components should consume this service instead of calling
 * fetch/axios directly.
 *
 * Backend endpoint assumptions:
 *   GET    /notifications
 *   GET    /notifications/:id
 *   GET    /notifications/unread-count
 *   PATCH  /notifications/:id/read
 *   PATCH  /notifications/read-all
 *   DELETE /notifications/:id
 *   GET    /notifications/preferences
 *   PATCH  /notifications/preferences
 *
 * Adjust endpoint paths once the final backend contract is available.
 */

export const notificationsService = {
  /**
   * List notifications for the current authenticated user.
   */
  list: async (
    params?: NotificationListParams,
  ): Promise<NotificationListResponse> => {
    const response = await api.get<NotificationListResponse>(
      '/notifications',
      {
        params,
      },
    )

    return response.data
  },

  /**
   * Get a single notification by ID.
   */
  get: async (id: string): Promise<Notification> => {
    const response = await api.get<Notification>(
      `/notifications/${id}`,
    )

    return response.data
  },

  /**
   * Get the number of unread notifications.
   */
  getUnreadCount: async (): Promise<number> => {
    const response = await api.get<{ count: number }>(
      '/notifications/unread-count',
    )

    return response.data.count
  },

  /**
   * Mark one notification as read.
   */
  markAsRead: async (id: string): Promise<Notification> => {
    const response = await api.patch<Notification>(
      `/notifications/${id}/read`,
    )

    return response.data
  },

  /**
   * Mark one notification as unread.
   */
  markAsUnread: async (id: string): Promise<Notification> => {
    const response = await api.patch<Notification>(
      `/notifications/${id}/unread`,
    )

    return response.data
  },

  /**
   * Mark all notifications as read.
   */
  markAllAsRead: async (): Promise<void> => {
    await api.patch('/notifications/read-all')
  },

  /**
   * Delete/dismiss a notification.
   */
  remove: async (id: string): Promise<void> => {
    await api.delete(`/notifications/${id}`)
  },

  /**
   * Get the current user's notification preferences.
   */
  getPreferences: async (): Promise<NotificationPreferences> => {
    const response = await api.get<NotificationPreferences>(
      '/notifications/preferences',
    )

    return response.data
  },

  /**
   * Update the current user's notification preferences.
   */
  updatePreferences: async (
    preferences: Partial<NotificationPreferences>,
  ): Promise<NotificationPreferences> => {
    const response = await api.patch<NotificationPreferences>(
      '/notifications/preferences',
      preferences,
    )

    return response.data
  },
}