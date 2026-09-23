// Projects module — API service layer
//
// BRD references:
// - Sec. 16: Projects and project creation workflow
// - Sec. 18: Project execution / milestones
// - Sec. 19.1: Change Requests
// - Sec. 20: Project monitoring
// - Sec. 23: Project documents / Digital Property Passport
// - Sec. 28.1: Backend / API architecture
//
// Architecture rule:
// Pages and components must never call fetch/axios directly.
// All project-related network communication belongs here.
//
// NOTE:
// The request implementation is intentionally isolated behind
// `request()` so the service contract can remain stable while
// the backend/client implementation is finalized.

import type {
  Project,
  ProjectCreationDraft,
  ProjectDocument,
  ProjectListParams,
  ProjectListResponse,
  ProjectSettings,
  ProjectTeamMember,
  ProjectTimelineEvent,
} from '@/modules/projects/types'

/* -------------------------------------------------------------------------- */
/* Configuration                                                              */
/* -------------------------------------------------------------------------- */

const PROJECTS_BASE_PATH = '/projects'

/* -------------------------------------------------------------------------- */
/* Internal request layer                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Central request boundary for the Projects module.
 *
 * Replace the implementation here with the application's shared
 * HTTP client once the backend contract is available.
 *
 * Keeping this boundary private ensures pages/components never
 * become coupled to fetch, axios, headers, interceptors, or
 * authentication details.
 */
async function request<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  void path
  void options

  throw new Error(
    'Projects API request client is not configured',
  )
}

/**
 * Builds a query string while safely ignoring undefined values.
 */
function buildQuery(
  params?: ProjectListParams,
): string {
  if (!params) return ''

  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') {
      return
    }

    if (Array.isArray(value)) {
      value.forEach((item) => {
        searchParams.append(key, String(item))
      })

      return
    }

    searchParams.set(key, String(value))
  })

  const query = searchParams.toString()

  return query ? `?${query}` : ''
}

/**
 * Serializes JSON request bodies consistently.
 */
function jsonRequest(
  method: 'POST' | 'PATCH' | 'PUT',
  body: unknown,
): RequestInit {
  return {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }
}

/* -------------------------------------------------------------------------- */
/* Projects service                                                           */
/* -------------------------------------------------------------------------- */

export const projectsService = {
  /* ---------------------------------------------------------------------- */
  /* Projects                                                               */
  /* ---------------------------------------------------------------------- */

  /**
   * List projects available to the current user.
   *
   * BRD: Sec. 16
   */
  async list(
    params?: ProjectListParams,
  ): Promise<ProjectListResponse> {
    return request<ProjectListResponse>(
      `${PROJECTS_BASE_PATH}${buildQuery(params)}`,
    )
  },

  /**
   * Get a single project by ID.
   *
   * BRD: Sec. 16 / Sec. 18
   */
  async get(
    id: string,
  ): Promise<Project> {
    return request<Project>(
      `${PROJECTS_BASE_PATH}/${encodeURIComponent(id)}`,
    )
  },

  /**
   * Create a project.
   *
   * The payload represents the eight-step project creation
   * workflow defined in BRD Sec. 16.2.
   */
  async create(
    payload: ProjectCreationDraft,
  ): Promise<Project> {
    return request<Project>(
      PROJECTS_BASE_PATH,
      jsonRequest('POST', payload),
    )
  },

  /**
   * Update project information that does not require
   * a formal Change Request.
   *
   * Changes to project scope, cost, timeline, or payment
   * terms must go through the Change Request workflow.
   */
  async update(
    id: string,
    payload: Partial<Project>,
  ): Promise<Project> {
    return request<Project>(
      `${PROJECTS_BASE_PATH}/${encodeURIComponent(id)}`,
      jsonRequest('PATCH', payload),
    )
  },

  /* ---------------------------------------------------------------------- */
  /* Settings                                                               */
  /* ---------------------------------------------------------------------- */

  /**
   * Get project-level settings.
   */
  async getSettings(
    id: string,
  ): Promise<ProjectSettings> {
    return request<ProjectSettings>(
      `${PROJECTS_BASE_PATH}/${encodeURIComponent(id)}/settings`,
    )
  },

  /**
   * Update project-level settings.
   *
   * This endpoint must not be used for changes to:
   * - project scope
   * - project cost
   * - project timeline
   * - payment terms
   *
   * Those changes belong to the formal Change Request workflow.
   */
  async updateSettings(
    id: string,
    payload: ProjectSettings,
  ): Promise<ProjectSettings> {
    return request<ProjectSettings>(
      `${PROJECTS_BASE_PATH}/${encodeURIComponent(id)}/settings`,
      jsonRequest('PUT', payload),
    )
  },

  /* ---------------------------------------------------------------------- */
  /* Team                                                                   */
  /* ---------------------------------------------------------------------- */

  /**
   * Get the team assigned to a project.
   */
  async getTeam(
    id: string,
  ): Promise<ProjectTeamMember[]> {
    return request<ProjectTeamMember[]>(
      `${PROJECTS_BASE_PATH}/${encodeURIComponent(id)}/team`,
    )
  },

  /**
   * Assign a user or professional to a project.
   */
  async addTeamMember(
    id: string,
    payload: Partial<ProjectTeamMember>,
  ): Promise<ProjectTeamMember> {
    return request<ProjectTeamMember>(
      `${PROJECTS_BASE_PATH}/${encodeURIComponent(id)}/team`,
      jsonRequest('POST', payload),
    )
  },

  /**
   * Remove a team member from a project.
   */
  async removeTeamMember(
    id: string,
    memberId: string,
  ): Promise<void> {
    await request<void>(
      `${PROJECTS_BASE_PATH}/${encodeURIComponent(id)}/team/${encodeURIComponent(memberId)}`,
      {
        method: 'DELETE',
      },
    )
  },

  /* ---------------------------------------------------------------------- */
  /* Documents                                                              */
  /* ---------------------------------------------------------------------- */

  /**
   * Get project documents.
   *
   * Documents may include records required for the
   * Digital Property Passport.
   */
  async getDocuments(
    id: string,
  ): Promise<ProjectDocument[]> {
    return request<ProjectDocument[]>(
      `${PROJECTS_BASE_PATH}/${encodeURIComponent(id)}/documents`,
    )
  },

  /**
   * Upload a project document.
   *
   * Multipart/network implementation intentionally remains
   * inside this service rather than ProjectDocuments UI.
   */
  async uploadDocument(
    id: string,
    file: File,
    documentType: string,
  ): Promise<ProjectDocument> {
    const formData = new FormData()

    formData.append('file', file)
    formData.append('documentType', documentType)

    return request<ProjectDocument>(
      `${PROJECTS_BASE_PATH}/${encodeURIComponent(id)}/documents`,
      {
        method: 'POST',
        body: formData,
      },
    )
  },

  /**
   * Remove a project document.
   */
  async deleteDocument(
    id: string,
    documentId: string,
  ): Promise<void> {
    await request<void>(
      `${PROJECTS_BASE_PATH}/${encodeURIComponent(id)}/documents/${encodeURIComponent(documentId)}`,
      {
        method: 'DELETE',
      },
    )
  },

  /* ---------------------------------------------------------------------- */
  /* Timeline                                                               */
  /* ---------------------------------------------------------------------- */

  /**
   * Get the chronological project activity timeline.
   *
   * Timeline events form part of the project's audit trail and
   * should be treated as read-only from the frontend.
   */
  async getTimeline(
    id: string,
  ): Promise<ProjectTimelineEvent[]> {
    return request<ProjectTimelineEvent[]>(
      `${PROJECTS_BASE_PATH}/${encodeURIComponent(id)}/timeline`,
    )
  },
} as const

/* -------------------------------------------------------------------------- */
/* Optional endpoint map                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Centralized endpoint helpers.
 *
 * These are useful when React Query / TanStack Query hooks,
 * mutations, cache invalidation, or permission-aware requests
 * are introduced later.
 */
export const projectEndpoints = {
  list: (params?: ProjectListParams) =>
    `${PROJECTS_BASE_PATH}${buildQuery(params)}`,

  detail: (id: string) =>
    `${PROJECTS_BASE_PATH}/${encodeURIComponent(id)}`,

  settings: (id: string) =>
    `${PROJECTS_BASE_PATH}/${encodeURIComponent(id)}/settings`,

  team: (id: string) =>
    `${PROJECTS_BASE_PATH}/${encodeURIComponent(id)}/team`,

  teamMember: (
    id: string,
    memberId: string,
  ) =>
    `${PROJECTS_BASE_PATH}/${encodeURIComponent(id)}/team/${encodeURIComponent(memberId)}`,

  documents: (id: string) =>
    `${PROJECTS_BASE_PATH}/${encodeURIComponent(id)}/documents`,

  document: (
    id: string,
    documentId: string,
  ) =>
    `${PROJECTS_BASE_PATH}/${encodeURIComponent(id)}/documents/${encodeURIComponent(documentId)}`,

  timeline: (id: string) =>
    `${PROJECTS_BASE_PATH}/${encodeURIComponent(id)}/timeline`,
} as const