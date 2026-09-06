// Milestones module — API service layer
// BRD references: Sec. 18.4, Sec. 18.2, Sec. 20.1, Sec. 22, Sec. 24
//
// This file is the single network boundary for milestone operations.
// Components and pages should consume milestonesService rather than
// calling fetch/axios directly.

import type {
  CreateMilestoneInput,
  Milestone,
  MilestoneEvidence,
  MilestoneReviewInput,
  MilestoneStatus,
} from './types'

// Import your configured API client here.
// Adjust the import path to match the project's existing API setup.
// Example:
// import { api } from '@/lib/api'

export interface MilestoneListParams {
  projectId: string
  status?: MilestoneStatus
}

export interface MilestoneListResponse {
  milestones: Milestone[]
  total: number
}

export interface MilestoneEvidenceInput {
  milestoneId: string
  evidence: MilestoneEvidence
}

export const milestonesService = {
  /**
   * Get all milestones belonging to a project.
   *
   * BRD:
   * - Sec. 18.4 Milestone Approval Rules
   * - Sec. 23 Client / PM dashboards
   */
  async list(
    params: MilestoneListParams,
  ): Promise<MilestoneListResponse> {
    // return api.get<MilestoneListResponse>('/milestones', { params })
    throw new Error('Milestones API not implemented')
  },

  /**
   * Get a single milestone and its current approval state.
   */
  async get(id: string): Promise<Milestone> {
    // return api.get<Milestone>(`/milestones/${id}`)
    throw new Error('Milestone API not implemented')
  },

  /**
   * Create a new milestone for a project.
   *
   * BRD:
   * - Sec. 18.4
   * - Sec. 19.1 Change control
   */
  async create(input: CreateMilestoneInput): Promise<Milestone> {
    // return api.post<Milestone>('/milestones', input)
    throw new Error('Create milestone API not implemented')
  },

  /**
   * Update a milestone before it enters a locked/approved state.
   */
  async update(
    id: string,
    input: Partial<CreateMilestoneInput>,
  ): Promise<Milestone> {
    // return api.patch<Milestone>(`/milestones/${id}`, input)
    throw new Error('Update milestone API not implemented')
  },

  /**
   * Submit milestone evidence.
   *
   * Evidence can include:
   * - photos
   * - videos
   * - completion notes
   * - material usage summary
   * - labour summary
   * - receipts
   * - professional sign-off
   *
   * BRD Sec. 18.4:
   * Evidence must support milestone approval and payment.
   */
  async submitEvidence(
    input: MilestoneEvidenceInput,
  ): Promise<Milestone> {
    // return api.post<Milestone>(
    //   `/milestones/${input.milestoneId}/evidence`,
    //   input.evidence,
    // )
    throw new Error('Milestone evidence API not implemented')
  },

  /**
   * Request milestone review.
   *
   * Moves a completed milestone into the verification workflow.
   */
  async requestReview(id: string): Promise<Milestone> {
    // return api.post<Milestone>(`/milestones/${id}/review`)
    throw new Error('Milestone review API not implemented')
  },

  /**
   * PM / Professional milestone review.
   *
   * A milestone cannot proceed to payment based on contractor evidence alone.
   *
   * BRD Sec. 15.1:
   * - Independent verification
   * - Evidence before payment
   * - Client approval
   */
  async review(
    id: string,
    input: MilestoneReviewInput,
  ): Promise<Milestone> {
    // return api.post<Milestone>(
    //   `/milestones/${id}/review`,
    //   input,
    // )
    throw new Error('Milestone review API not implemented')
  },

  /**
   * Client approval of a verified milestone.
   *
   * Major payments and milestone approval require client approval.
   */
  async approve(id: string): Promise<Milestone> {
    // return api.post<Milestone>(`/milestones/${id}/approve`)
    throw new Error('Milestone approval API not implemented')
  },

  /**
   * Reject a milestone after review.
   *
   * Rejection should normally include a reason and may request
   * additional evidence or corrective work.
   */
  async reject(
    id: string,
    reason: string,
  ): Promise<Milestone> {
    // return api.post<Milestone>(`/milestones/${id}/reject`, {
    //   reason,
    // })
    throw new Error('Milestone rejection API not implemented')
  },

  /**
   * Request additional evidence.
   */
  async requestMoreEvidence(
    id: string,
    message: string,
  ): Promise<Milestone> {
    // return api.post<Milestone>(
    //   `/milestones/${id}/request-evidence`,
    //   { message },
    // )
    throw new Error('Request evidence API not implemented')
  },

  /**
   * Mark a milestone as disputed.
   *
   * BRD Sec. 18.2:
   * disputed payment lines must be frozen.
   */
  async dispute(
    id: string,
    reason: string,
  ): Promise<Milestone> {
    // return api.post<Milestone>(`/milestones/${id}/dispute`, {
    //   reason,
    // })
    throw new Error('Milestone dispute API not implemented')
  },

  /**
   * Get the evidence attached to a milestone.
   */
  async getEvidence(id: string): Promise<MilestoneEvidence[]> {
    // return api.get<MilestoneEvidence[]>(
    //   `/milestones/${id}/evidence`,
    // )
    throw new Error('Milestone evidence API not implemented')
  },

  /**
   * Get the milestone approval / audit history.
   *
   * BRD Sec. 15.1:
   * Every approval, rejection, status change and financial action
   * must be logged.
   */
  async getAuditHistory(id: string) {
    // return api.get(`/milestones/${id}/audit`)
    throw new Error('Milestone audit API not implemented')
  },
}