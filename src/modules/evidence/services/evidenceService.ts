// Evidence module — API/service layer
//
// This module is the single domain boundary between Evidence features
// and the underlying data/network layer.
//
// Current state:
// - Uses deterministic in-memory mock data.
// - Exposes the same async contract expected from a real API.
// - Keeps pages/components independent from the transport layer.
//
// Backend migration:
// When Sec. 28.1 is implemented, replace the mock implementations
// inside evidenceService with HTTP calls. Consumers should not need
// to change.


// ─────────────────────────────────────────────────────────────────────────────
// Domain types
// ─────────────────────────────────────────────────────────────────────────────

export type EvidenceStatus =
  | 'submitted'
  | 'under_review'
  | 'verified'
  | 'blocked'
  | 'rejected'

export type EvidenceFileType =
  | 'image'
  | 'video'
  | 'document'

export type EvidenceReviewDecision =
  | 'verified'
  | 'request_more'
  | 'flagged'


// ─────────────────────────────────────────────────────────────────────────────
// Domain models
// ─────────────────────────────────────────────────────────────────────────────

export interface EvidenceFile {
  id: string
  name: string
  type: EvidenceFileType
  size: string
  uploadedAt: string
}

export interface EvidenceProject {
  id: string
  name: string
  location: string
}

export interface EvidenceMilestone {
  id: string
  name: string
}

export interface EvidenceSubmitter {
  id: string
  name: string
  role: string
}

export interface EvidenceReview {
  assignedTo?: string
  assignedRole?: string
  lastDecision?: EvidenceReviewDecision
  lastReviewedAt?: string
  reviewerComment?: string
}

export interface EvidenceRecord {
  id: string
  status: EvidenceStatus
  title: string
  description: string

  project: EvidenceProject
  milestone: EvidenceMilestone
  submittedBy: EvidenceSubmitter

  submittedAt: string
  updatedAt: string

  files: EvidenceFile[]

  /**
   * Reported milestone progress associated with the submission.
   *
   * This represents the submitted claim until the evidence
   * has been independently verified.
   */
  progress: number

  review: EvidenceReview
}


// ─────────────────────────────────────────────────────────────────────────────
// Query / mutation contracts
// ─────────────────────────────────────────────────────────────────────────────

export interface EvidenceListFilters {
  search?: string
  status?: EvidenceStatus | 'all'
  projectId?: string
  milestoneId?: string
}

export interface UploadEvidencePayload {
  title: string
  description: string
  projectId: string
  milestoneId: string
  files: File[]
}


// ─────────────────────────────────────────────────────────────────────────────
// Service errors
// ─────────────────────────────────────────────────────────────────────────────

export type EvidenceServiceErrorCode =
  | 'INVALID_ID'
  | 'INVALID_TITLE'
  | 'INVALID_DESCRIPTION'
  | 'NO_FILES'
  | 'INVALID_DECISION'
  | 'NOT_FOUND'
  | 'UNKNOWN'

export class EvidenceServiceError extends Error {
  readonly code: EvidenceServiceErrorCode
  readonly cause?: unknown

  constructor(
    message: string,
    code: EvidenceServiceErrorCode,
    cause?: unknown,
  ) {
    super(message)

    this.name = 'EvidenceServiceError'
    this.code = code
    this.cause = cause

    Object.setPrototypeOf(
      this,
      EvidenceServiceError.prototype,
    )
  }
}


// ─────────────────────────────────────────────────────────────────────────────
// Internal constants
// ─────────────────────────────────────────────────────────────────────────────

const MOCK_NOW = '27 Aug 2026 · 10:45'

const CURRENT_USER = {
  id: 'CURRENT-USER',
  name: 'Current User',
  role: 'Contractor',
} as const

const DECISION_STATUS_MAP: Record<
  EvidenceReviewDecision,
  EvidenceStatus
> = {
  verified: 'verified',
  request_more: 'under_review',
  flagged: 'blocked',
}

const VALID_REVIEW_DECISIONS: readonly EvidenceReviewDecision[] = [
  'verified',
  'request_more',
  'flagged',
]


// ─────────────────────────────────────────────────────────────────────────────
// Mock repository
// ─────────────────────────────────────────────────────────────────────────────
//
// Keep mock persistence private to this module.
// Consumers interact only through evidenceService.

const mockEvidence: EvidenceRecord[] = [
  {
    id: 'EVD-2026-00482',
    status: 'under_review',

    title: 'Internal Finishing Milestone Evidence',

    description:
      'Evidence submitted to support completion of the internal finishing milestone, including site photographs, progress documentation and supporting completion records.',

    project: {
      id: 'PRJ-2026-00421',
      name: 'Abuja Residential Development',
      location: 'Abuja, Federal Capital Territory',
    },

    milestone: {
      id: 'MLS-004',
      name: 'Milestone 04 — Internal Finishing',
    },

    submittedBy: {
      id: 'USR-00421',
      name: 'BuildRight Construction Ltd',
      role: 'Contractor',
    },

    submittedAt: '27 Aug 2026 · 08:34',
    updatedAt: '27 Aug 2026 · 09:10',

    files: [
      {
        id: 'FILE-001',
        name: 'living-room-finishing.jpg',
        type: 'image',
        size: '4.8 MB',
        uploadedAt: '27 Aug 2026 · 08:31',
      },
      {
        id: 'FILE-002',
        name: 'bedroom-finishing.jpg',
        type: 'image',
        size: '5.2 MB',
        uploadedAt: '27 Aug 2026 · 08:31',
      },
      {
        id: 'FILE-003',
        name: 'internal-progress-video.mp4',
        type: 'video',
        size: '24.6 MB',
        uploadedAt: '27 Aug 2026 · 08:32',
      },
      {
        id: 'FILE-004',
        name: 'milestone-completion-report.pdf',
        type: 'document',
        size: '1.3 MB',
        uploadedAt: '27 Aug 2026 · 08:33',
      },
    ],

    progress: 75,

    review: {
      assignedTo: 'Project Manager',
      assignedRole: 'Independent Verifier',
    },
  },

  {
    id: 'EVD-2026-00479',
    status: 'verified',

    title: 'Roofing Completion Evidence',

    description:
      'Completion evidence for roofing works including installation photographs and contractor completion records.',

    project: {
      id: 'PRJ-2026-00421',
      name: 'Abuja Residential Development',
      location: 'Abuja, Federal Capital Territory',
    },

    milestone: {
      id: 'MLS-003',
      name: 'Milestone 03 — Roofing',
    },

    submittedBy: {
      id: 'USR-00421',
      name: 'BuildRight Construction Ltd',
      role: 'Contractor',
    },

    submittedAt: '24 Aug 2026 · 14:20',
    updatedAt: '25 Aug 2026 · 10:42',

    files: [
      {
        id: 'FILE-005',
        name: 'roofing-completion-01.jpg',
        type: 'image',
        size: '3.9 MB',
        uploadedAt: '24 Aug 2026 · 14:15',
      },
      {
        id: 'FILE-006',
        name: 'roofing-completion-02.jpg',
        type: 'image',
        size: '4.4 MB',
        uploadedAt: '24 Aug 2026 · 14:16',
      },
      {
        id: 'FILE-007',
        name: 'roofing-inspection.pdf',
        type: 'document',
        size: '980 KB',
        uploadedAt: '24 Aug 2026 · 14:19',
      },
    ],

    progress: 100,

    review: {
      assignedTo: 'Aminu Bello',
      assignedRole: 'Project Manager',
      lastDecision: 'verified',
      lastReviewedAt: '25 Aug 2026 · 10:42',
      reviewerComment:
        'Evidence reviewed and milestone completion independently confirmed.',
    },
  },

  {
    id: 'EVD-2026-00471',
    status: 'submitted',

    title: 'MEP Rough-In Progress Evidence',

    description:
      'Photographs and progress documentation covering electrical and plumbing rough-in works.',

    project: {
      id: 'PRJ-2026-00421',
      name: 'Abuja Residential Development',
      location: 'Abuja, Federal Capital Territory',
    },

    milestone: {
      id: 'MLS-005',
      name: 'Milestone 05 — MEP Rough-Ins',
    },

    submittedBy: {
      id: 'USR-00421',
      name: 'BuildRight Construction Ltd',
      role: 'Contractor',
    },

    submittedAt: '27 Aug 2026 · 07:52',
    updatedAt: '27 Aug 2026 · 07:52',

    files: [
      {
        id: 'FILE-008',
        name: 'electrical-rough-in.jpg',
        type: 'image',
        size: '4.1 MB',
        uploadedAt: '27 Aug 2026 · 07:48',
      },
      {
        id: 'FILE-009',
        name: 'plumbing-rough-in.jpg',
        type: 'image',
        size: '3.8 MB',
        uploadedAt: '27 Aug 2026 · 07:49',
      },
    ],

    progress: 0,

    review: {},
  },

  {
    id: 'EVD-2026-00458',
    status: 'rejected',

    title: 'External Works Completion Evidence',

    description:
      'Evidence previously submitted for external works completion but returned because required supporting records were incomplete.',

    project: {
      id: 'PRJ-2026-00421',
      name: 'Abuja Residential Development',
      location: 'Abuja, Federal Capital Territory',
    },

    milestone: {
      id: 'MLS-007',
      name: 'Milestone 07 — External Works',
    },

    submittedBy: {
      id: 'USR-00421',
      name: 'BuildRight Construction Ltd',
      role: 'Contractor',
    },

    submittedAt: '21 Aug 2026 · 11:12',
    updatedAt: '22 Aug 2026 · 15:30',

    files: [
      {
        id: 'FILE-010',
        name: 'external-works.jpg',
        type: 'image',
        size: '4.6 MB',
        uploadedAt: '21 Aug 2026 · 11:08',
      },
    ],

    progress: 0,

    review: {
      lastDecision: 'flagged',
      lastReviewedAt: '22 Aug 2026 · 15:30',
      reviewerComment:
        'Additional evidence is required to establish completion of the external works scope.',
    },
  },
]


// ─────────────────────────────────────────────────────────────────────────────
// Public service
// ─────────────────────────────────────────────────────────────────────────────

export const evidenceService = {
  /**
   * List evidence records using optional filters.
   */
  async list(
    filters: EvidenceListFilters = {},
  ): Promise<EvidenceRecord[]> {
    const search = normalizeSearch(filters.search)

    return mockEvidence
      .filter((record) => {
        if (search && !matchesSearch(record, search)) {
          return false
        }

        if (
          filters.status &&
          filters.status !== 'all' &&
          record.status !== filters.status
        ) {
          return false
        }

        if (
          filters.projectId &&
          record.project.id !== filters.projectId
        ) {
          return false
        }

        if (
          filters.milestoneId &&
          record.milestone.id !== filters.milestoneId
        ) {
          return false
        }

        return true
      })
      .map(cloneEvidenceRecord)
  },

  /**
   * Retrieve one evidence record by ID.
   */
  async get(
    id: string,
  ): Promise<EvidenceRecord | null> {
    const normalizedId = normalizeId(id)

    if (!normalizedId) {
      throw new EvidenceServiceError(
        'Evidence ID is required.',
        'INVALID_ID',
      )
    }

    const record = mockEvidence.find(
      (item) => item.id === normalizedId,
    )

    return record
      ? cloneEvidenceRecord(record)
      : null
  },

  /**
   * Upload a new evidence package.
   *
   * The mock implementation creates an in-memory record.
   * Replace only this method with the real multipart/form-data
   * request when the backend contract becomes available.
   */
  async upload(
    payload: UploadEvidencePayload,
  ): Promise<EvidenceRecord> {
    validateUploadPayload(payload)

    const recordNumber =
      getNextMockRecordNumber()

    const record: EvidenceRecord = {
      id: `EVD-${getMockYear()}-${recordNumber}`,

      status: 'submitted',

      title: payload.title.trim(),

      description: payload.description.trim(),

      project: {
        id: payload.projectId.trim(),
        name: 'Selected Project',
        location: 'Project location',
      },

      milestone: {
        id: payload.milestoneId.trim(),
        name: 'Selected Milestone',
      },

      submittedBy: {
        ...CURRENT_USER,
      },

      submittedAt: MOCK_NOW,
      updatedAt: MOCK_NOW,

      files: payload.files.map(
        (file, index) =>
          ({
            id: `FILE-NEW-${String(index + 1).padStart(3, '0')}`,
            name: file.name,
            type: getFileType(file),
            size: formatFileSize(file.size),
            uploadedAt: MOCK_NOW,
          }) satisfies EvidenceFile,
      ),

      progress: 0,

      review: {},
    }

    mockEvidence.unshift(record)

    return cloneEvidenceRecord(record)
  },

  /**
   * Record an independent review decision.
   *
   * Decision mapping:
   * - verified     → verified
   * - request_more → under_review
   * - flagged      → blocked
   */
  async review(
    id: string,
    decision: EvidenceReviewDecision,
    comment?: string,
  ): Promise<EvidenceRecord | null> {
    const normalizedId = normalizeId(id)

    if (!normalizedId) {
      throw new EvidenceServiceError(
        'Evidence ID is required.',
        'INVALID_ID',
      )
    }

    if (!isEvidenceReviewDecision(decision)) {
      throw new EvidenceServiceError(
        'Invalid evidence review decision.',
        'INVALID_DECISION',
      )
    }

    const record = mockEvidence.find(
      (item) => item.id === normalizedId,
    )

    if (!record) {
      return null
    }

    const normalizedComment =
      comment?.trim() || undefined

    record.status = DECISION_STATUS_MAP[decision]

    record.updatedAt = MOCK_NOW

    record.review = {
      ...record.review,
      lastDecision: decision,
      lastReviewedAt: MOCK_NOW,
      reviewerComment: normalizedComment,
    }

    if (decision === 'verified') {
      record.progress = 100
    }

    return cloneEvidenceRecord(record)
  },
} as const

export type EvidenceService =
  typeof evidenceService


// ─────────────────────────────────────────────────────────────────────────────
// Search helpers
// ─────────────────────────────────────────────────────────────────────────────

function normalizeSearch(
  value?: string,
): string {
  return value?.trim().toLowerCase() ?? ''
}

function normalizeId(
  value?: string,
): string {
  return value?.trim() ?? ''
}

function matchesSearch(
  record: EvidenceRecord,
  search: string,
): boolean {
  const searchableValues = [
    record.id,
    record.title,
    record.description,
    record.project.id,
    record.project.name,
    record.project.location,
    record.milestone.id,
    record.milestone.name,
    record.submittedBy.id,
    record.submittedBy.name,
    record.submittedBy.role,
  ]

  return searchableValues.some((value) =>
    value.toLowerCase().includes(search),
  )
}


// ─────────────────────────────────────────────────────────────────────────────
// Validation
// ─────────────────────────────────────────────────────────────────────────────

function validateUploadPayload(
  payload: UploadEvidencePayload,
): void {
  if (!payload.title?.trim()) {
    throw new EvidenceServiceError(
      'Evidence title is required.',
      'INVALID_TITLE',
    )
  }

  if (!payload.description?.trim()) {
    throw new EvidenceServiceError(
      'Evidence description is required.',
      'INVALID_DESCRIPTION',
    )
  }

  if (!payload.projectId?.trim()) {
    throw new EvidenceServiceError(
      'Project ID is required.',
      'INVALID_ID',
    )
  }

  if (!payload.milestoneId?.trim()) {
    throw new EvidenceServiceError(
      'Milestone ID is required.',
      'INVALID_ID',
    )
  }

  if (!payload.files?.length) {
    throw new EvidenceServiceError(
      'At least one evidence file is required.',
      'NO_FILES',
    )
  }
}

function isEvidenceReviewDecision(
  value: string,
): value is EvidenceReviewDecision {
  return VALID_REVIEW_DECISIONS.includes(
    value as EvidenceReviewDecision,
  )
}


// ─────────────────────────────────────────────────────────────────────────────
// File helpers
// ─────────────────────────────────────────────────────────────────────────────

function getFileType(
  file: File,
): EvidenceFileType {
  if (file.type.startsWith('image/')) {
    return 'image'
  }

  if (file.type.startsWith('video/')) {
    return 'video'
  }

  return 'document'
}

function formatFileSize(
  bytes: number,
): string {
  if (!Number.isFinite(bytes) || bytes < 0) {
    return 'Unknown size'
  }

  if (bytes < 1024) {
    return `${bytes} B`
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`
  }

  if (bytes < 1024 * 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`
}


// ─────────────────────────────────────────────────────────────────────────────
// Mock ID / record helpers
// ─────────────────────────────────────────────────────────────────────────────

function getMockYear(): number {
  return 2026
}

function getNextMockRecordNumber(): string {
  const highestNumber = mockEvidence.reduce(
    (highest, record) => {
      const match = record.id.match(
        /EVD-\d{4}-(\d+)/,
      )

      if (!match) {
        return highest
      }

      const number = Number(match[1])

      return Number.isFinite(number)
        ? Math.max(highest, number)
        : highest
    },
    0,
  )

  return String(highestNumber + 1).padStart(5, '0')
}


// ─────────────────────────────────────────────────────────────────────────────
// Defensive cloning
// ─────────────────────────────────────────────────────────────────────────────
//
// Prevent callers from accidentally mutating the private mock repository.
//
// This also mirrors the practical expectation of an API service: consumers
// receive their own response object rather than a reference to internal state.

function cloneEvidenceRecord(
  record: EvidenceRecord,
): EvidenceRecord {
  return {
    ...record,

    project: {
      ...record.project,
    },

    milestone: {
      ...record.milestone,
    },

    submittedBy: {
      ...record.submittedBy,
    },

    files: record.files.map((file) => ({
      ...file,
    })),

    review: {
      ...record.review,
    },
  }
}