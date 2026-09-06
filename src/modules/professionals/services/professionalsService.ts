// Professionals module — API service layer
// BRD reference: Sec. 28.1 / Sec. 40.7
//
// Keep this file as the single place this module talks to the network.
// Pages/components should never call fetch/axios directly.
//
// TODO: replace the request helper with the project's shared API client
// once the backend contract is available.

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
  availability?: 'available' | 'busy' | 'unavailable'
  bio?: string
  verifiedSince?: string
}

export interface ProfessionalService {
  id: string
  professionalId: string
  name: string
  description?: string
}

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

export interface PaginatedResponse<T> {
  data: T[]
  page: number
  limit: number
  total: number
  totalPages: number
}

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

async function request<T>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(input, {
    ...init,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  })

  if (!response.ok) {
    throw new Error(
      `Professionals API request failed: ${response.status} ${response.statusText}`,
    )
  }

  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}

function toQueryString(
  params: Record<string, string | number | undefined>,
) {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      searchParams.set(key, String(value))
    }
  })

  const query = searchParams.toString()

  return query ? `?${query}` : ''
}

export const professionalsService = {
  /**
   * Professionals
   */
  list: (
    params: ProfessionalListParams = {},
  ) =>
    request<PaginatedResponse<Professional>>(
      `/api/professionals${toQueryString(params)}`,
    ),

  get: (id: string) =>
    request<Professional>(`/api/professionals/${id}`),

  services: (id: string) =>
    request<ProfessionalService[]>(
      `/api/professionals/${id}/services`,
    ),

  /**
   * Service invitations
   */
  invitations: (
    params: InvitationListParams = {},
  ) =>
    request<PaginatedResponse<ServiceInvitation>>(
      `/api/professional-invitations${toQueryString(params)}`,
    ),

  getInvitation: (id: string) =>
    request<ServiceInvitation>(
      `/api/professional-invitations/${id}`,
    ),

  acceptInvitation: (id: string) =>
    request<ServiceInvitation>(
      `/api/professional-invitations/${id}/accept`,
      {
        method: 'POST',
      },
    ),

  declineInvitation: (id: string) =>
    request<ServiceInvitation>(
      `/api/professional-invitations/${id}/decline`,
      {
        method: 'POST',
      },
    ),

  /**
   * Proposals
   */
  proposals: (
    params: ProposalListParams = {},
  ) =>
    request<PaginatedResponse<Proposal>>(
      `/api/proposals${toQueryString(params)}`,
    ),

  getProposal: (id: string) =>
    request<Proposal>(`/api/proposals/${id}`),

  createProposal: (input: CreateProposalInput) =>
    request<Proposal>('/api/proposals', {
      method: 'POST',
      body: JSON.stringify(input),
    }),

  withdrawProposal: (id: string) =>
    request<Proposal>(`/api/proposals/${id}/withdraw`, {
      method: 'POST',
    }),

  /**
   * Deliverables
   */
  deliverables: (
    params: DeliverableListParams = {},
  ) =>
    request<PaginatedResponse<Deliverable>>(
      `/api/deliverables${toQueryString(params)}`,
    ),

  getDeliverable: (id: string) =>
    request<Deliverable>(`/api/deliverables/${id}`),

  createDeliverable: (input: CreateDeliverableInput) =>
    request<Deliverable>('/api/deliverables', {
      method: 'POST',
      body: JSON.stringify(input),
    }),
}