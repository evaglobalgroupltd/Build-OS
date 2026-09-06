// Procurement module — API service layer
//
// This is the single place where the procurement module talks to the network.
// Pages/components should consume these methods and never call fetch/axios
// directly.
//
// Backend reference: BRD Sec. 28.1
// TODO: align endpoint names and response types with the final API contract.

import type { MaterialRequest } from '@/modules/procurement/types'

const API_BASE_URL = '/api'

type RequestStatus =
  | 'requested'
  | 'quoted'
  | 'ordered'
  | 'delivered'
  | 'verified'

type QuoteStatus =
  | 'received'
  | 'under review'
  | 'recommended'
  | 'selected'
  | 'rejected'

type PurchaseOrderStatus =
  | 'draft'
  | 'issued'
  | 'acknowledged'
  | 'in transit'
  | 'delivered'
  | 'completed'

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

export type Delivery = {
  id: string
  purchaseOrderId: string
  supplierName: string
  projectName?: string
  deliveredDate: string
  status: 'pending verification' | 'verified' | 'rejected'
  items: Array<{
    description: string
    orderedQuantity: string
    deliveredQuantity: string
  }>
  notes?: string
}

export type VerifyDeliveryInput = {
  deliveryId: string
  accepted: boolean
  notes?: string
}

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

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!response.ok) {
    let message = `Procurement request failed (${response.status})`

    try {
      const body = await response.json()

      if (body?.message) {
        message = body.message
      }
    } catch {
      // Keep the generic HTTP error when the response isn't JSON.
    }

    throw new Error(message)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}

function get<T>(path: string) {
  return request<T>(path)
}

function post<T>(path: string, body: unknown) {
  return request<T>(path, {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

function patch<T>(path: string, body: unknown) {
  return request<T>(path, {
    method: 'PATCH',
    body: JSON.stringify(body),
  })
}

export const procurementService = {
  /**
   * Procurement dashboard
   */
  dashboard: () =>
    get<ProcurementDashboard>('/procurement/dashboard'),

  /**
   * Material requests
   */
  materialRequests: {
    list: () =>
      get<MaterialRequest[]>('/procurement/material-requests'),

    get: (id: string) =>
      get<MaterialRequest>(`/procurement/material-requests/${id}`),

    create: (input: CreateMaterialRequestInput) =>
      post<MaterialRequest>(
        '/procurement/material-requests',
        input,
      ),

    update: (
      id: string,
      input: UpdateMaterialRequestInput,
    ) =>
      patch<MaterialRequest>(
        `/procurement/material-requests/${id}`,
        input,
      ),
  },

  /**
   * Supplier quotations
   */
  quotations: {
    list: (requestId?: string) => {
      const query = requestId
        ? `?requestId=${encodeURIComponent(requestId)}`
        : ''

      return get<ProcurementQuotation[]>(
        `/procurement/quotations${query}`,
      )
    },

    get: (id: string) =>
      get<ProcurementQuotation>(
        `/procurement/quotations/${id}`,
      ),

    create: (input: CreateQuotationInput) =>
      post<ProcurementQuotation>(
        '/procurement/quotations',
        input,
      ),

    select: (id: string) =>
      post<ProcurementQuotation>(
        `/procurement/quotations/${id}/select`,
        {},
      ),
  },

  /**
   * Purchase orders
   */
  purchaseOrders: {
    list: () =>
      get<PurchaseOrder[]>(
        '/procurement/purchase-orders',
      ),

    get: (id: string) =>
      get<PurchaseOrder>(
        `/procurement/purchase-orders/${id}`,
      ),

    create: (input: CreatePurchaseOrderInput) =>
      post<PurchaseOrder>(
        '/procurement/purchase-orders',
        input,
      ),

    updateStatus: (
      id: string,
      status: PurchaseOrderStatus,
    ) =>
      patch<PurchaseOrder>(
        `/procurement/purchase-orders/${id}`,
        { status },
      ),
  },

  /**
   * Deliveries
   */
  deliveries: {
    list: () =>
      get<Delivery[]>('/procurement/deliveries'),

    get: (id: string) =>
      get<Delivery>(
        `/procurement/deliveries/${id}`,
      ),

    verify: (input: VerifyDeliveryInput) =>
      post<Delivery>(
        `/procurement/deliveries/${input.deliveryId}/verify`,
        {
          accepted: input.accepted,
          notes: input.notes,
        },
      ),
  },
}