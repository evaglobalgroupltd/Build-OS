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
// Keep this file as the single place this module talks to the network.
// Pages and components should never call fetch/axios directly.
//
// NOTE:
// The exact HTTP client and backend endpoint contract are intentionally
// isolated here. Replace the request implementation once the backend
// contract is available.

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

export const projectsService = {
  /**
   * List projects available to the current user.
   */
  async list(
    params?: ProjectListParams,
  ): Promise<ProjectListResponse> {
    void params

    throw new Error('projectsService.list is not implemented')
  },

  /**
   * Get a single project.
   */
  async get(id: string): Promise<Project> {
    void id

    throw new Error('projectsService.get is not implemented')
  },

  /**
   * Create a project.
   *
   * The payload represents the eight-step project creation workflow
   * defined in BRD Sec. 16.2.
   */
  async create(
    payload: ProjectCreationDraft,
  ): Promise<Project> {
    void payload

    throw new Error('projectsService.create is not implemented')
  },

  /**
   * Update project information that does not require a Change Request.
   */
  async update(
    id: string,
    payload: Partial<Project>,
  ): Promise<Project> {
    void id
    void payload

    throw new Error('projectsService.update is not implemented')
  },

  /**
   * Get project-level settings.
   */
  async getSettings(
    id: string,
  ): Promise<ProjectSettings> {
    void id

    throw new Error(
      'projectsService.getSettings is not implemented',
    )
  },

  /**
   * Update project-level settings.
   *
   * This must not be used for changes to project scope, cost,
   * timeline or payment terms that belong to the formal
   * Change Request workflow.
   */
  async updateSettings(
    id: string,
    payload: ProjectSettings,
  ): Promise<ProjectSettings> {
    void id
    void payload

    throw new Error(
      'projectsService.updateSettings is not implemented',
    )
  },

  /**
   * Get the team assigned to a project.
   */
  async getTeam(
    id: string,
  ): Promise<ProjectTeamMember[]> {
    void id

    throw new Error(
      'projectsService.getTeam is not implemented',
    )
  },

  /**
   * Assign a user or professional to the project.
   */
  async addTeamMember(
    id: string,
    payload: Partial<ProjectTeamMember>,
  ): Promise<ProjectTeamMember> {
    void id
    void payload

    throw new Error(
      'projectsService.addTeamMember is not implemented',
    )
  },

  /**
   * Remove a team member from the project.
   */
  async removeTeamMember(
    id: string,
    memberId: string,
  ): Promise<void> {
    void id
    void memberId

    throw new Error(
      'projectsService.removeTeamMember is not implemented',
    )
  },

  /**
   * Get project documents.
   */
  async getDocuments(
    id: string,
  ): Promise<ProjectDocument[]> {
    void id

    throw new Error(
      'projectsService.getDocuments is not implemented',
    )
  },

  /**
   * Upload a project document.
   *
   * Keep the multipart/network implementation here rather
   * than inside ProjectDocuments.
   */
  async uploadDocument(
    id: string,
    file: File,
    documentType: string,
  ): Promise<ProjectDocument> {
    void id
    void file
    void documentType

    throw new Error(
      'projectsService.uploadDocument is not implemented',
    )
  },

  /**
   * Remove a project document.
   */
  async deleteDocument(
    id: string,
    documentId: string,
  ): Promise<void> {
    void id
    void documentId

    throw new Error(
      'projectsService.deleteDocument is not implemented',
    )
  },

  /**
   * Get the chronological project activity timeline.
   */
  async getTimeline(
    id: string,
  ): Promise<ProjectTimelineEvent[]> {
    void id

    throw new Error(
      'projectsService.getTimeline is not implemented',
    )
  },
}