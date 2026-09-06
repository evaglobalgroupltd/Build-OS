// Evidence module — API/service layer
//
// This is intentionally the single place where the Evidence module
// communicates with data/network services.
//
// For now the backend contract is not available, so the service uses
// deterministic mock data. When Sec. 28.1 is implemented, replace the
// mock implementations below with the real HTTP calls without changing
// the pages/components.

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

  progress: number

  review: {
    assignedTo?: string
    assignedRole?: string
    lastDecision?: EvidenceReviewDecision
    lastReviewedAt?: string
    reviewerComment?: string
  }
}

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

export const evidenceService = {
  async list(
    filters: EvidenceListFilters = {},
  ): Promise<EvidenceRecord[]> {
    const search = filters.search?.trim().toLowerCase()

    return mockEvidence.filter((record) => {
      const matchesSearch =
        !search ||
        record.id.toLowerCase().includes(search) ||
        record.title.toLowerCase().includes(search) ||
        record.project.name.toLowerCase().includes(search) ||
        record.milestone.name.toLowerCase().includes(search) ||
        record.submittedBy.name.toLowerCase().includes(search)

      const matchesStatus =
        !filters.status ||
        filters.status === 'all' ||
        record.status === filters.status

      const matchesProject =
        !filters.projectId ||
        record.project.id === filters.projectId

      const matchesMilestone =
        !filters.milestoneId ||
        record.milestone.id === filters.milestoneId

      return (
        matchesSearch &&
        matchesStatus &&
        matchesProject &&
        matchesMilestone
      )
    })
  },

  async get(id: string): Promise<EvidenceRecord | null> {
    return (
      mockEvidence.find((record) => record.id === id) ?? null
    )
  },

  async upload(
    payload: UploadEvidencePayload,
  ): Promise<EvidenceRecord> {
    // Replace this implementation with:
    //
    // return api.post<EvidenceRecord>('/evidence', formData)
    //
    // once the backend contract is available.

    const now = new Date()

    const record: EvidenceRecord = {
      id: `EVD-${now.getFullYear()}-${String(
        mockEvidence.length + 500,
      ).padStart(5, '0')}`,

      status: 'submitted',

      title: payload.title,

      description: payload.description,

      project: {
        id: payload.projectId,
        name: 'Selected Project',
        location: 'Project location',
      },

      milestone: {
        id: payload.milestoneId,
        name: 'Selected Milestone',
      },

      submittedBy: {
        id: 'CURRENT-USER',
        name: 'Current User',
        role: 'Contractor',
      },

      submittedAt: '27 Aug 2026 · 10:45',
      updatedAt: '27 Aug 2026 · 10:45',

      files: payload.files.map((file, index) => ({
        id: `FILE-NEW-${index + 1}`,
        name: file.name,
        type: getFileType(file),
        size: formatFileSize(file.size),
        uploadedAt: '27 Aug 2026 · 10:45',
      })),

      progress: 0,

      review: {},
    }

    mockEvidence.unshift(record)

    return record
  },

  async review(
    id: string,
    decision: EvidenceReviewDecision,
    comment?: string,
  ): Promise<EvidenceRecord | null> {
    const record = mockEvidence.find(
      (item) => item.id === id,
    )

    if (!record) {
      return null
    }

    const statusMap: Record<
      EvidenceReviewDecision,
      EvidenceStatus
    > = {
      verified: 'verified',
      request_more: 'under_review',
      flagged: 'blocked',
    }

    record.status = statusMap[decision]

    record.updatedAt = '27 Aug 2026 · 10:45'

    record.review = {
      ...record.review,
      lastDecision: decision,
      lastReviewedAt: '27 Aug 2026 · 10:45',
      reviewerComment: comment,
    }

    if (decision === 'verified') {
      record.progress = 100
    }

    return record
  },
}

function getFileType(file: File): EvidenceFileType {
  if (file.type.startsWith('image/')) {
    return 'image'
  }

  if (file.type.startsWith('video/')) {
    return 'video'
  }

  return 'document'
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}