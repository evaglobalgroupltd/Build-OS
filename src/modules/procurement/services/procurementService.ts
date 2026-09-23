// Procurement module — API service layer
//
// Single network boundary for the procurement domain.
// Pages and components should consume these methods instead of calling
// fetch/axios directly.
//
// Backend reference: BRD Sec. 28.1
// TODO: align endpoint names and response types with the final API contract.

import type { MaterialRequest } from '@/modules/procurement/types'

/* -------------------------------------------------------------------------- */
/* Configuration                                                              */
/* -------------------------------------------------------------------------- */

const API_BASE_URL = '/api'
const PROCUREMENT_BASE_PATH = '/procurement'

/* -------------------------------------------------------------------------- */
/* Domain types                                                               */
/* -------------------------------------------------------------------------- */

export type RequestStatus =
  | 'requested'
  | 'quoted'
  | 'ordered'
  | 'delivered'
  | 'verified'

export type QuoteStatus =
  | 'received'
  | 'under review'
  | 'recommended'
  | 'selected'
  | 'rejected'

export type PurchaseOrderStatus =
  | 'draft'
  | 'issued'
  | 'acknowledged'
  | 'in transit'
  | 'delivered'
  | 'completed'

export type DeliveryStatus =
  | 'pending verification'
  | 'verified'
  | 'rejected'

/* -------------------------------------------------------------------------- */
/* Material requests                                                          */
/* -------------------------------------------------------------------------- */

export type CreateMaterialRequestInput = {
  item: string
  quantity: string
  projectId?: string
  supplierId?: string
  notes?: string
}

export type UpdateMaterialRequestInput = Partial<
  CreateMaterialRequestInput
> & {
  status?: RequestStatus
}

/* -------------------------------------------------------------------------- */
/* Quotations                                                                 */
/* -------------------------------------------------------------------------- */

export type ProcurementQuotation = {
  id: string
  requestId: string
  supplierId: string
  supplierName: string
  amount: number
  currency: string
  deliveryDays: number
  validUntil: string
  paymentTerms?: string
  deliveryIncluded?: boolean
  documentationIncluded?: boolean
  notes?: string
  status: QuoteStatus
  submittedDate: string
}

export type CreateQuotationInput = {
  requestId: string
  supplierId: string
  amount: number
  currency?: string
  deliveryDays: number
  validUntil: string
  paymentTerms?: string
  deliveryIncluded?: boolean
  documentationIncluded?: boolean
  notes?: string
}

/* -------------------------------------------------------------------------- */
/* Purchase orders                                                            */
/* -------------------------------------------------------------------------- */

export type PurchaseOrder = {
  id: string
  requestId: string
  quotationId?: string
  supplierId: string
  supplierName: string
  projectId?: string
  itemSummary: string
  amount: number
  currency: string
  status: PurchaseOrderStatus
  issuedDate: string
  expectedDelivery?: string
}

export type CreatePurchaseOrderInput = {
  requestId: string
  quotationId: string
  supplierId: string
  projectId?: string
}

/* -------------------------------------------------------------------------- */
/* Deliveries                                                                 */
/* -------------------------------------------------------------------------- */

export type DeliveryItem = {
  description: string
  orderedQuantity: string
  deliveredQuantity: string
}

export type Delivery = {
  id: string
  purchaseOrderId: string
  supplierName: string
  projectName?: string
  deliveredDate: string
  status: DeliveryStatus
  items: DeliveryItem[]
  notes?: string
}

export type VerifyDeliveryInput = {
  deliveryId: string
  accepted: boolean
  notes?: string
}

/* -------------------------------------------------------------------------- */
/* Dashboard                                                                  */
/* -------------------------------------------------------------------------- */

export type ProcurementDashboard = {
  materialRequests: {
    total: number
    requested: number
    quoted: number
    ordered: number
    delivered: number
    verified: number
  }

  quotations: {
    total: number
    pendingReview: number
    recommended: number
    selected: number
  }

  purchaseOrders: {
    total: number
    active: number
    delivered: number
    completed: number
  }

  deliveries: {
    pendingVerification: number
    verified: number
  }
}

/* -------------------------------------------------------------------------- */
/* API errors                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Structured procurement API error.
 *
 * Keeping the HTTP status available makes it easier for the UI to distinguish
 * authentication, validation, conflict, and server failures without parsing
 * error strings.
 */
export class ProcurementApiError extends Error {
  readonly status: number
  readonly code?: string
  readonly details?: unknown

  constructor(
    message: string,
    status: number,
    options?: {
      code?: string
      details?: unknown
    },
  ) {
    super(message)

    this.name = 'ProcurementApiError'
    this.status = status
    this.code = options?.code
    this.details = options?.details
  }
}

/* -------------------------------------------------------------------------- */
/* Request helpers                                                            */
/* -------------------------------------------------------------------------- */

type RequestOptions = RequestInit & {
  /**
   * Allows callers to explicitly omit the JSON content type.
   * Useful later for multipart uploads or other non-JSON endpoints.
   */
  json?: boolean
}

async function request<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const {
    json = true,
    headers: customHeaders,
    ...requestOptions
  } = options

  const headers = new Headers(customHeaders)

  if (json && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...requestOptions,
    headers,
  })

  if (!response.ok) {
    let message = `Procurement request failed (${response.status})`
    let code: string | undefined
    let details: unknown

    try {
      const body: unknown = await response.json()

      if (
        typeof body === 'object' &&
        body !== null
      ) {
        const errorBody = body as {
          message?: unknown
          code?: unknown
          details?: unknown
          error?: unknown
        }

        if (typeof errorBody.message === 'string') {
          message = errorBody.message
        } else if (typeof errorBody.error === 'string') {
          message = errorBody.error
        }

        if (typeof errorBody.code === 'string') {
          code = errorBody.code
        }

        details = errorBody.details
      }
    } catch {
      // Keep the fallback HTTP message when the response isn't JSON.
    }

    throw new ProcurementApiError(message, response.status, {
      code,
      details,
    })
  }

  if (response.status === 204) {
    return undefined as T
  }

  const contentType =
    response.headers.get('content-type') ?? ''

  if (!contentType.includes('application/json')) {
    return undefined as T
  }

  return response.json() as Promise<T>
}

/* -------------------------------------------------------------------------- */
/* HTTP verbs                                                                 */
/* -------------------------------------------------------------------------- */

function get<T>(path: string) {
  return request<T>(path, {
    method: 'GET',
  })
}

function post<T>(
  path: string,
  body: unknown,
) {
  return request<T>(path, {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

function patch<T>(
  path: string,
  body: unknown,
) {
  return request<T>(path, {
    method: 'PATCH',
    body: JSON.stringify(body),
  })
}

/* -------------------------------------------------------------------------- */
/* Query helpers                                                              */
/* -------------------------------------------------------------------------- */

function withQuery(
  path: string,
  params: Record<string, string | undefined>,
) {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      searchParams.set(key, value)
    }
  })

  const query = searchParams.toString()

  return query ? `${path}?${query}` : path
}

/* -------------------------------------------------------------------------- */
/* Procurement service                                                        */
/* -------------------------------------------------------------------------- */

export const procurementService = {
  /**
   * Procurement dashboard
   *
   * Returns the aggregated operational state used by procurement dashboards
   * and command-centre views.
   */
  dashboard: () =>
    get<ProcurementDashboard>(
      `${PROCUREMENT_BASE_PATH}/dashboard`,
    ),

  /* ------------------------------------------------------------------------ */
  /* Material requests                                                        */
  /* ------------------------------------------------------------------------ */

  materialRequests: {
    /**
     * List all material requests.
     */
    list: () =>
      get<MaterialRequest[]>(
        `${PROCUREMENT_BASE_PATH}/material-requests`,
      ),

    /**
     * Retrieve a single material request.
     */
    get: (id: string) =>
      get<MaterialRequest>(
        `${PROCUREMENT_BASE_PATH}/material-requests/${encodeURIComponent(id)}`,
      ),

    /**
     * Create a new material request.
     */
    create: (input: CreateMaterialRequestInput) =>
      post<MaterialRequest>(
        `${PROCUREMENT_BASE_PATH}/material-requests`,
        input,
      ),

    /**
     * Update an existing material request.
     */
    update: (
      id: string,
      input: UpdateMaterialRequestInput,
    ) =>
      patch<MaterialRequest>(
        `${PROCUREMENT_BASE_PATH}/material-requests/${encodeURIComponent(id)}`,
        input,
      ),
  },

  /* ------------------------------------------------------------------------ */
  /* Supplier quotations                                                      */
  /* ------------------------------------------------------------------------ */

  quotations: {
    /**
     * List quotations.
     *
     * Pass requestId to scope the result to a specific material request.
     */
    list: (requestId?: string) => {
      const path = withQuery(
        `${PROCUREMENT_BASE_PATH}/quotations`,
        {
          requestId,
        },
      )

      return get<ProcurementQuotation[]>(path)
    },

    /**
     * Retrieve a single quotation.
     */
    get: (id: string) =>
      get<ProcurementQuotation>(
        `${PROCUREMENT_BASE_PATH}/quotations/${encodeURIComponent(id)}`,
      ),

    /**
     * Submit a supplier quotation.
     */
    create: (input: CreateQuotationInput) =>
      post<ProcurementQuotation>(
        `${PROCUREMENT_BASE_PATH}/quotations`,
        input,
      ),

    /**
     * Select a quotation for procurement.
     */
    select: (id: string) =>
      post<ProcurementQuotation>(
        `${PROCUREMENT_BASE_PATH}/quotations/${encodeURIComponent(id)}/select`,
        {},
      ),
  },

  /* ------------------------------------------------------------------------ */
  /* Purchase orders                                                          */
  /* ------------------------------------------------------------------------ */

  purchaseOrders: {
    /**
     * List purchase orders.
     */
    list: () =>
      get<PurchaseOrder[]>(
        `${PROCUREMENT_BASE_PATH}/purchase-orders`,
      ),

    /**
     * Retrieve a single purchase order.
     */
    get: (id: string) =>
      get<PurchaseOrder>(
        `${PROCUREMENT_BASE_PATH}/purchase-orders/${encodeURIComponent(id)}`,
      ),

    /**
     * Create a purchase order from a selected quotation.
     */
    create: (input: CreatePurchaseOrderInput) =>
      post<PurchaseOrder>(
        `${PROCUREMENT_BASE_PATH}/purchase-orders`,
        input,
      ),

    /**
     * Update the lifecycle status of a purchase order.
     */
    updateStatus: (
      id: string,
      status: PurchaseOrderStatus,
    ) =>
      patch<PurchaseOrder>(
        `${PROCUREMENT_BASE_PATH}/purchase-orders/${encodeURIComponent(id)}`,
        { status },
      ),
  },

  /* ------------------------------------------------------------------------ */
  /* Deliveries                                                               */
  /* ------------------------------------------------------------------------ */

  deliveries: {
    /**
     * List delivery records.
     */
    list: () =>
      get<Delivery[]>(
        `${PROCUREMENT_BASE_PATH}/deliveries`,
      ),

    /**
     * Retrieve a single delivery record.
     */
    get: (id: string) =>
      get<Delivery>(
        `${PROCUREMENT_BASE_PATH}/deliveries/${encodeURIComponent(id)}`,
      ),

    /**
     * Verify or reject a delivered procurement order.
     */
    verify: (input: VerifyDeliveryInput) =>
      post<Delivery>(
        `${PROCUREMENT_BASE_PATH}/deliveries/${encodeURIComponent(input.deliveryId)}/verify`,
        {
          accepted: input.accepted,
          notes: input.notes,
        },
      ),
  },
} as const

/* -------------------------------------------------------------------------- */
/* Convenience type                                                           */
/* -------------------------------------------------------------------------- */

/**
 * The public service surface.
 *
 * Useful for dependency injection, testing, or mocking the procurement
 * network layer without duplicating the complete service shape.
 */
export type ProcurementService = typeof procurementService