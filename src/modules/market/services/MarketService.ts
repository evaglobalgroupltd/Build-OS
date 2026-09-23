// Suppliers module — API service layer
// BRD reference: Sec. 17.2 / Sec. 28.1
//
// Architectural rule:
// Pages/components must NOT call fetch/axios directly.
// This module is the single network boundary for the Suppliers marketplace.
//
// Current mode:
// - Uses mock repository data until the backend contract is available.
// - Switching to the real API should require changing the repository,
//   not rewriting pages/components.

export type SupplierStatus = 'Verified' | 'Pending Review'

export type SupplierSortBy =
  | 'trust'
  | 'rating'
  | 'products'
  | 'delivery'

export type SortOrder = 'asc' | 'desc'

export type CatalogueAvailability =
  | 'In Stock'
  | 'Limited'
  | 'Out of Stock'

/* -------------------------------------------------------------------------- */
/* Domain models                                                              */
/* -------------------------------------------------------------------------- */

export interface MarketSupplier {
  id: string
  name: string
  initials: string
  category: string
  location: string
  status: SupplierStatus

  trustScore: number
  rating: number
  reviews: number

  products: number
  deliveries: number
  onTimeDelivery: number

  deliveryCoverage: string
  specialties: string[]
}

export interface SupplierMarketplaceStats {
  totalSuppliers: number
  verifiedSuppliers: number
  listedMaterials: number
  averageTrust: number
  activeDeliveries: number
  deliveryCoverage: string
}

export interface SupplierListParams {
  search?: string
  category?: string
  status?: SupplierStatus
  location?: string

  sortBy?: SupplierSortBy
  sortOrder?: SortOrder

  page?: number
  limit?: number
}

export interface SupplierListResponse {
  suppliers: MarketSupplier[]
  stats: SupplierMarketplaceStats

  total: number
  page: number
  limit: number
}

export interface SupplierProfile extends MarketSupplier {
  description?: string

  phone?: string
  email?: string
  website?: string
  address?: string

  businessRegistration?: string
  verificationDate?: string

  yearsOperating?: number
  completedOrders?: number

  catalogue?: SupplierCatalogueItem[]
  reviewsList?: SupplierReview[]
}

export interface SupplierCatalogueItem {
  id: string
  name: string
  category: string
  unit: string
  price?: number
  availability: CatalogueAvailability
}

export interface SupplierReview {
  id: string
  reviewerName: string
  rating: number
  comment: string
  date: string
}

/* -------------------------------------------------------------------------- */
/* Service errors                                                             */
/* -------------------------------------------------------------------------- */

export type SupplierServiceErrorCode =
  | 'NOT_FOUND'
  | 'NETWORK_ERROR'
  | 'INVALID_REQUEST'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'SERVER_ERROR'
  | 'UNKNOWN'

export class SupplierServiceError extends Error {
  readonly code: SupplierServiceErrorCode
  readonly status?: number

  constructor(
    message: string,
    options?: {
      code?: SupplierServiceErrorCode
      status?: number
      cause?: unknown
    },
  ) {
    super(message)

    this.name = 'SupplierServiceError'
    this.code = options?.code ?? 'UNKNOWN'
    this.status = options?.status

    if (options?.cause) {
      this.cause = options.cause
    }
  }
}

/* -------------------------------------------------------------------------- */
/* Configuration                                                              */
/* -------------------------------------------------------------------------- */

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 20

const MAX_PAGE_LIMIT = 100

/**
 * Keep this flag explicit.
 *
 * When the backend becomes available, change this to false or,
 * preferably, move it into your environment configuration.
 */
const USE_MOCK_DATA = true

const API_BASE_PATH = '/suppliers'

/* -------------------------------------------------------------------------- */
/* Internal helpers                                                           */
/* -------------------------------------------------------------------------- */

function normalizeListParams(
  params: SupplierListParams = {},
): Required<
  Pick<SupplierListParams, 'page' | 'limit'>
> &
  Omit<SupplierListParams, 'page' | 'limit'> {
  const page = Math.max(
    DEFAULT_PAGE,
    Math.floor(params.page ?? DEFAULT_PAGE),
  )

  const limit = Math.min(
    MAX_PAGE_LIMIT,
    Math.max(1, Math.floor(params.limit ?? DEFAULT_LIMIT)),
  )

  return {
    ...params,
    page,
    limit,
  }
}

function createEmptyStats(): SupplierMarketplaceStats {
  return {
    totalSuppliers: 0,
    verifiedSuppliers: 0,
    listedMaterials: 0,
    averageTrust: 0,
    activeDeliveries: 0,
    deliveryCoverage: '—',
  }
}

function createEmptyListResponse(
  params: SupplierListParams = {},
): SupplierListResponse {
  const normalized = normalizeListParams(params)

  return {
    suppliers: [],
    stats: createEmptyStats(),
    total: 0,
    page: normalized.page,
    limit: normalized.limit,
  }
}

/**
 * Converts service params into URLSearchParams.
 *
 * This keeps query construction out of pages/components.
 */
function buildQueryParams(
  params: SupplierListParams,
): URLSearchParams {
  const normalized = normalizeListParams(params)

  const query = new URLSearchParams()

  if (normalized.search?.trim()) {
    query.set('search', normalized.search.trim())
  }

  if (normalized.category) {
    query.set('category', normalized.category)
  }

  if (normalized.status) {
    query.set('status', normalized.status)
  }

  if (normalized.location) {
    query.set('location', normalized.location)
  }

  if (normalized.sortBy) {
    query.set('sortBy', normalized.sortBy)
  }

  if (normalized.sortOrder) {
    query.set('sortOrder', normalized.sortOrder)
  }

  query.set('page', String(normalized.page))
  query.set('limit', String(normalized.limit))

  return query
}

/* -------------------------------------------------------------------------- */
/* API adapter                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Lightweight internal API adapter.
 *
 * If your application already has a shared `api` client, replace this
 * adapter with that client. The public MarketService API does not need
 * to change.
 */
async function apiRequest<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  try {
    const response = await fetch(path, {
      ...options,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(options?.headers ?? {}),
      },
    })

    if (!response.ok) {
      let message = `Request failed with status ${response.status}`

      try {
        const body = (await response.json()) as {
          message?: string
        }

        if (body?.message) {
          message = body.message
        }
      } catch {
        // Ignore malformed/non-JSON error bodies.
      }

      let code: SupplierServiceErrorCode = 'UNKNOWN'

      if (response.status === 401) {
        code = 'UNAUTHORIZED'
      } else if (response.status === 403) {
        code = 'FORBIDDEN'
      } else if (response.status === 404) {
        code = 'NOT_FOUND'
      } else if (response.status >= 400 && response.status < 500) {
        code = 'INVALID_REQUEST'
      } else if (response.status >= 500) {
        code = 'SERVER_ERROR'
      }

      throw new SupplierServiceError(message, {
        code,
        status: response.status,
      })
    }

    return (await response.json()) as T
  } catch (error) {
    if (error instanceof SupplierServiceError) {
      throw error
    }

    throw new SupplierServiceError(
      'Unable to connect to the supplier marketplace.',
      {
        code: 'NETWORK_ERROR',
        cause: error,
      },
    )
  }
}

/* -------------------------------------------------------------------------- */
/* MarketService                                                              */
/* -------------------------------------------------------------------------- */

export const MarketService = {
  /**
   * Get suppliers for the marketplace.
   *
   * Backend:
   * GET /suppliers
   */
  async list(
    params: SupplierListParams = {},
  ): Promise<SupplierListResponse> {
    const normalized = normalizeListParams(params)

    if (USE_MOCK_DATA) {
      // Replace this with your mock repository when mock suppliers
      // are connected to the service.
      //
      // Example:
      //
      // const suppliers = await mockSupplierRepository.list(normalized)
      //
      // return suppliers

      return createEmptyListResponse(normalized)
    }

    const query = buildQueryParams(normalized)

    return apiRequest<SupplierListResponse>(
      `${API_BASE_PATH}?${query.toString()}`,
    )
  },

  /**
   * Get a single supplier profile.
   *
   * Backend:
   * GET /suppliers/:id
   */
  async get(id: string): Promise<SupplierProfile> {
    const supplierId = id.trim()

    if (!supplierId) {
      throw new SupplierServiceError(
        'A supplier ID is required.',
        {
          code: 'INVALID_REQUEST',
        },
      )
    }

    if (USE_MOCK_DATA) {
      throw new SupplierServiceError(
        `Supplier ${supplierId} is not available in mock mode.`,
        {
          code: 'NOT_FOUND',
        },
      )
    }

    return apiRequest<SupplierProfile>(
      `${API_BASE_PATH}/${encodeURIComponent(supplierId)}`,
    )
  },

  /**
   * Alias for get().
   *
   * Useful when the consuming component wants explicit domain language.
   */
  async getById(id: string): Promise<SupplierProfile> {
    return this.get(id)
  },

  /**
   * Search suppliers.
   *
   * Keeps search/query construction inside the service layer.
   */
  async search(
    query: string,
    params: Omit<SupplierListParams, 'search'> = {},
  ): Promise<SupplierListResponse> {
    return this.list({
      ...params,
      search: query.trim(),
    })
  },

  /**
   * Get supplier marketplace statistics.
   *
   * Backend:
   * GET /suppliers/marketplace/stats
   */
  async getStats(): Promise<SupplierMarketplaceStats> {
    if (USE_MOCK_DATA) {
      return createEmptyStats()
    }

    return apiRequest<SupplierMarketplaceStats>(
      `${API_BASE_PATH}/marketplace/stats`,
    )
  },

  /**
   * Get supplier catalogue.
   *
   * Backend:
   * GET /suppliers/:id/catalogue
   */
  async getCatalogue(
    supplierId: string,
  ): Promise<SupplierCatalogueItem[]> {
    const id = supplierId.trim()

    if (!id) {
      throw new SupplierServiceError(
        'A supplier ID is required.',
        {
          code: 'INVALID_REQUEST',
        },
      )
    }

    if (USE_MOCK_DATA) {
      return []
    }

    return apiRequest<SupplierCatalogueItem[]>(
      `${API_BASE_PATH}/${encodeURIComponent(id)}/catalogue`,
    )
  },

  /**
   * Get supplier reviews.
   *
   * Backend:
   * GET /suppliers/:id/reviews
   */
  async getReviews(
    supplierId: string,
  ): Promise<SupplierReview[]> {
    const id = supplierId.trim()

    if (!id) {
      throw new SupplierServiceError(
        'A supplier ID is required.',
        {
          code: 'INVALID_REQUEST',
        },
      )
    }

    if (USE_MOCK_DATA) {
      return []
    }

    return apiRequest<SupplierReview[]>(
      `${API_BASE_PATH}/${encodeURIComponent(id)}/reviews`,
    )
  },
}

/* -------------------------------------------------------------------------- */
/* Optional convenience exports                                               */
/* -------------------------------------------------------------------------- */

export const SupplierService = MarketService