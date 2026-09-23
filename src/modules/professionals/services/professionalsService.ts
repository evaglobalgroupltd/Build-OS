// Professionals module — API service layer
// BRD references:
// - Sec. 28.1 — Professional Services
// - Sec. 40.7 — Professional API / Service Integration
//
// Architecture rule:
// This is the single network boundary for the Professionals module.
// Pages, hooks, and components should not call fetch/axios directly.
//
// TODO:
// Replace the local request helper with the project's shared API client
// once the backend contract/client is available.

/* -------------------------------------------------------------------------- */
/* Domain types                                                               */
/* -------------------------------------------------------------------------- */

export type ProfessionalType =
  | 'architect'
  | 'engineer'
  | 'surveyor'
  | 'valuer'
  | 'planning_consultant'
  | 'other'

export type ProfessionalVerificationStatus =
  | 'pending'
  | 'verified'
  | 'rejected'
  | 'suspended'

export type ProfessionalAvailability =
  | 'available'
  | 'busy'
  | 'unavailable'

export type ProposalStatus =
  | 'submitted'
  | 'under_review'
  | 'shortlisted'
  | 'accepted'
  | 'declined'
  | 'withdrawn'

export type InvitationStatus =
  | 'new'
  | 'reviewing'
  | 'proposal_submitted'
  | 'expired'
  | 'declined'

export type DeliverableStatus =
  | 'submitted'
  | 'under_review'
  | 'approved'
  | 'rejected'

/* -------------------------------------------------------------------------- */
/* Professionals                                                              */
/* -------------------------------------------------------------------------- */

export interface Professional {
  id: string
  name: string
  type: ProfessionalType
  specialty?: string
  location?: string
  experienceYears?: number
  trustScore?: number
  rating?: number
  reviewCount?: number
  projectCount?: number
  verificationStatus: ProfessionalVerificationStatus
  availability?: ProfessionalAvailability
  bio?: string
  verifiedSince?: string
}

export interface ProfessionalService {
  id: string
  professionalId: string
  name: string
  description?: string
}

/* -------------------------------------------------------------------------- */
/* Service invitations                                                        */
/* -------------------------------------------------------------------------- */

export interface ServiceInvitation {
  id: string
  professionalId?: string
  projectId: string
  projectName?: string
  title: string
  service: string
  location?: string
  receivedAt?: string
  deadline?: string
  status: InvitationStatus
  budgetMin?: number
  budgetMax?: number
  currency?: string
  duration?: string
  clientName?: string
  description?: string
  requirements?: string[]
}

/* -------------------------------------------------------------------------- */
/* Proposals                                                                  */
/* -------------------------------------------------------------------------- */

export interface Proposal {
  id: string
  professionalId: string
  projectId: string
  invitationId?: string
  title: string
  service: string
  status: ProposalStatus
  fee: number
  currency: string
  timeline?: string
  submittedAt?: string
  validUntil?: string
  description?: string
  deliverables?: string[]
  clientName?: string
}

/* -------------------------------------------------------------------------- */
/* Deliverables                                                               */
/* -------------------------------------------------------------------------- */

export interface Deliverable {
  id: string
  professionalId: string
  projectId: string
  proposalId?: string
  title: string
  description?: string
  status: DeliverableStatus
  submittedAt?: string
  reviewedAt?: string
  reviewComment?: string
  fileUrl?: string
}

/* -------------------------------------------------------------------------- */
/* Query parameters                                                           */
/* -------------------------------------------------------------------------- */

export interface ProfessionalListParams {
  search?: string
  type?: ProfessionalType
  specialty?: string
  location?: string
  verificationStatus?: ProfessionalVerificationStatus
  page?: number
  limit?: number
}

export interface ProposalListParams {
  status?: ProposalStatus
  projectId?: string
  page?: number
  limit?: number
}

export interface InvitationListParams {
  status?: InvitationStatus
  projectId?: string
  page?: number
  limit?: number
}

export interface DeliverableListParams {
  status?: DeliverableStatus
  projectId?: string
  proposalId?: string
  page?: number
  limit?: number
}

/* -------------------------------------------------------------------------- */
/* API response types                                                         */
/* -------------------------------------------------------------------------- */

export interface PaginatedResponse<T> {
  data: T[]
  page: number
  limit: number
  total: number
  totalPages: number
}

/* -------------------------------------------------------------------------- */
/* Mutation inputs                                                            */
/* -------------------------------------------------------------------------- */

export interface CreateProposalInput {
  invitationId: string
  title: string
  fee: number
  currency: string
  timeline?: string
  description?: string
  deliverables?: string[]
}

export interface CreateDeliverableInput {
  proposalId?: string
  title: string
  description?: string
  fileUrl?: string
}

/* -------------------------------------------------------------------------- */
/* Request infrastructure                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Error returned by the Professionals API.
 *
 * Keeping this as a dedicated error type makes it easier for UI layers
 * and future global error boundaries to distinguish API failures from
 * ordinary JavaScript errors.
 */
export class ProfessionalsApiError extends Error {
  readonly status: number
  readonly statusText: string

  constructor(
    message: string,
    status: number,
    statusText: string,
  ) {
    super(message)

    this.name = 'ProfessionalsApiError'
    this.status = status
    this.statusText = statusText
  }
}

/**
 * Shared request helper.
 *
 * All Professionals network traffic passes through this function.
 */
async function request<T>(
  input: RequestInfo | URL,
  init: RequestInit = {},
): Promise<T> {
  const response = await fetch(input, {
    ...init,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...init.headers,
    },
  })

  if (!response.ok) {
    throw new ProfessionalsApiError(
      `Professionals API request failed: ${response.status} ${response.statusText}`,
      response.status,
      response.statusText,
    )
  }

  // No-content responses are valid for actions that do not return a body.
  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}

/**
 * Serializes supported query parameters while omitting undefined,
 * null-like, and empty-string values.
 */
function toQueryString(
  params: Record<string, string | number | undefined>,
): string {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === '') {
      return
    }

    searchParams.set(key, String(value))
  })

  const query = searchParams.toString()

  return query ? `?${query}` : ''
}

/* -------------------------------------------------------------------------- */
/* Professionals API                                                          */
/* -------------------------------------------------------------------------- */

export const professionalsService = {
  /* ------------------------------------------------------------------------ */
  /* Professionals                                                             */
  /* ------------------------------------------------------------------------ */

  list(
    params: ProfessionalListParams = {},
  ) {
    return request<PaginatedResponse<Professional>>(
      `/api/professionals${toQueryString(params)}`,
    )
  },

  get(id: string) {
    return request<Professional>(
      `/api/professionals/${id}`,
    )
  },

  services(id: string) {
    return request<ProfessionalService[]>(
      `/api/professionals/${id}/services`,
    )
  },

  /* ------------------------------------------------------------------------ */
  /* Service invitations                                                       */
  /* ------------------------------------------------------------------------ */

  invitations(
    params: InvitationListParams = {},
  ) {
    return request<PaginatedResponse<ServiceInvitation>>(
      `/api/professional-invitations${toQueryString(params)}`,
    )
  },

  getInvitation(id: string) {
    return request<ServiceInvitation>(
      `/api/professional-invitations/${id}`,
    )
  },

  acceptInvitation(id: string) {
    return request<ServiceInvitation>(
      `/api/professional-invitations/${id}/accept`,
      {
        method: 'POST',
      },
    )
  },

  declineInvitation(id: string) {
    return request<ServiceInvitation>(
      `/api/professional-invitations/${id}/decline`,
      {
        method: 'POST',
      },
    )
  },

  /* ------------------------------------------------------------------------ */
  /* Proposals                                                                 */
  /* ------------------------------------------------------------------------ */

  proposals(
    params: ProposalListParams = {},
  ) {
    return request<PaginatedResponse<Proposal>>(
      `/api/proposals${toQueryString(params)}`,
    )
  },

  getProposal(id: string) {
    return request<Proposal>(
      `/api/proposals/${id}`,
    )
  },

  createProposal(input: CreateProposalInput) {
    return request<Proposal>(
      '/api/proposals',
      {
        method: 'POST',
        body: JSON.stringify(input),
      },
    )
  },

  withdrawProposal(id: string) {
    return request<Proposal>(
      `/api/proposals/${id}/withdraw`,
      {
        method: 'POST',
      },
    )
  },

  /* ------------------------------------------------------------------------ */
  /* Deliverables                                                              */
  /* ------------------------------------------------------------------------ */

  deliverables(
    params: DeliverableListParams = {},
  ) {
    return request<PaginatedResponse<Deliverable>>(
      `/api/deliverables${toQueryString(params)}`,
    )
  },

  getDeliverable(id: string) {
    return request<Deliverable>(
      `/api/deliverables/${id}`,
    )
  },

  createDeliverable(input: CreateDeliverableInput) {
    return request<Deliverable>(
      '/api/deliverables',
      {
        method: 'POST',
        body: JSON.stringify(input),
      },
    )
  },
} as const