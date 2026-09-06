import type {
  Contractor,
  ContractorPortfolioItem,
  ContractorVerification,
  ContractorFilters,
} from '@/modules/contractors/types'

/**
 * Contractors module — API service layer
 * BRD reference: Sec. 14.2 / 28.1
 *
 * Responsibilities:
 * - Contractor marketplace
 * - Contractor profiles
 * - Portfolio and project history
 * - Verification records
 * - Trust score
 * - Contractor search/filtering
 *
 * IMPORTANT:
 * Keep all contractor-related network communication in this file.
 * Pages and components should never call fetch/axios directly.
 *
 * The current implementation uses typed placeholders until the backend
 * API contract in Sec. 28.1 is available.
 */

export const contractorsService = {
  /**
   * List contractors for the marketplace.
   */
  async list(
    filters?: ContractorFilters,
  ): Promise<Contractor[]> {
    // TODO:
    // return api.get<Contractor[]>('/contractors', {
    //   params: filters,
    // })

    console.info('contractorsService.list', filters)

    return []
  },

  /**
   * Get a single contractor by ID.
   */
  async get(id: string): Promise<Contractor | null> {
    // TODO:
    // return api.get<Contractor>(`/contractors/${id}`)

    console.info('contractorsService.get', id)

    return null
  },

  /**
   * Get contractor profile information.
   */
  async getProfile(id: string): Promise<Contractor | null> {
    // TODO:
    // return api.get<Contractor>(`/contractors/${id}/profile`)

    console.info('contractorsService.getProfile', id)

    return null
  },

  /**
   * Get contractor portfolio and verified project history.
   */
  async getPortfolio(
    id: string,
  ): Promise<ContractorPortfolioItem[]> {
    // TODO:
    // return api.get<ContractorPortfolioItem[]>(
    //   `/contractors/${id}/portfolio`,
    // )

    console.info('contractorsService.getPortfolio', id)

    return []
  },

  /**
   * Get contractor verification information.
   */
  async getVerification(
    id: string,
  ): Promise<ContractorVerification | null> {
    // TODO:
    // return api.get<ContractorVerification>(
    //   `/contractors/${id}/verification`,
    // )

    console.info('contractorsService.getVerification', id)

    return null
  },

  /**
   * Submit or update a contractor verification document.
   *
   * The actual file upload should eventually be handled by the API layer
   * or upload service rather than directly inside UI components.
   */
  async uploadVerificationDocument(
    contractorId: string,
    documentType: string,
    file: File,
  ): Promise<void> {
    // TODO:
    // const formData = new FormData()
    // formData.append('documentType', documentType)
    // formData.append('file', file)
    //
    // await api.post(
    //   `/contractors/${contractorId}/verification/documents`,
    //   formData,
    // )

    console.info(
      'contractorsService.uploadVerificationDocument',
      contractorId,
      documentType,
      file.name,
    )
  },

  /**
   * Get contractor trust score and supporting factors.
   */
  async getTrustScore(id: string): Promise<number | null> {
    // TODO:
    // const response = await api.get<{ score: number }>(
    //   `/contractors/${id}/trust-score`,
    // )
    //
    // return response.score

    console.info('contractorsService.getTrustScore', id)

    return null
  },

  /**
   * Get contractor's completed and active project history.
   */
  async getProjectHistory(
    id: string,
  ): Promise<ContractorPortfolioItem[]> {
    // TODO:
    // return api.get<ContractorPortfolioItem[]>(
    //   `/contractors/${id}/projects`,
    // )

    console.info('contractorsService.getProjectHistory', id)

    return []
  },

  /**
   * Search contractors by marketplace criteria.
   */
  async search(
    query: string,
    filters?: ContractorFilters,
  ): Promise<Contractor[]> {
    // TODO:
    // return api.get<Contractor[]>('/contractors/search', {
    //   params: {
    //     q: query,
    //     ...filters,
    //   },
    // })

    console.info(
      'contractorsService.search',
      query,
      filters,
    )

    return []
  },

  /**
   * Invite a contractor to review a project and submit a bid.
   */
  async inviteToProject(
    contractorId: string,
    projectId: string,
  ): Promise<void> {
    // TODO:
    // await api.post(
    //   `/projects/${projectId}/contractors/${contractorId}/invite`,
    // )

    console.info(
      'contractorsService.inviteToProject',
      contractorId,
      projectId,
    )
  },
}