// Procurement module — domain types
//
// BRD references:
// - Sec. 17.3 — Procurement
// - Material request lifecycle
// - Supplier quotation lifecycle
// - Purchase order lifecycle
// - Delivery & verification lifecycle
//
// This file is the canonical domain model for procurement.
// API transport types and UI-specific view models should not be mixed here.

/* -------------------------------------------------------------------------- */
/* Shared primitives                                                          */
/* -------------------------------------------------------------------------- */

/**
 * ISO-8601 date/time string.
 *
 * Kept as a branded type so dates remain distinguishable from arbitrary
 * strings while still being runtime-compatible with normal string values.
 */
export type ISODateString = string

/* -------------------------------------------------------------------------- */
/* Material requests                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Material request lifecycle.
 *
 * requested → quoted → ordered → delivered → verified
 */
export type MaterialRequestStatus =
  | 'requested'
  | 'quoted'
  | 'ordered'
  | 'delivered'
  | 'verified'

export interface MaterialRequest {
  id: string

  /**
   * Project to which the requested material belongs.
   */
  projectId: string

  /**
   * Human-readable material description.
   */
  item: string

  /**
   * Quantity including its unit, e.g. "2 tonnes".
   */
  quantity: string

  status: MaterialRequestStatus

  /**
   * Supplier information becomes available once a supplier is associated
   * with the request.
   */
  supplierName?: string
  supplierId?: string

  /**
   * Optional requester instructions or procurement notes.
   */
  notes?: string

  /**
   * Lifecycle timestamps.
   */
  requestedDate?: ISODateString
  updatedDate?: ISODateString
}

/**
 * Input used when creating a material request.
 */
export interface CreateMaterialRequestInput {
  item: string
  quantity: string
  projectId: string
  supplierId?: string
  notes?: string
}

/**
 * Fields that may be changed after a material request is created.
 */
export interface UpdateMaterialRequestInput {
  item?: string
  quantity?: string
  projectId?: string
  supplierId?: string
  notes?: string
  status?: MaterialRequestStatus
}

/* -------------------------------------------------------------------------- */
/* Supplier quotations                                                        */
/* -------------------------------------------------------------------------- */

/**
 * Supplier quotation lifecycle.
 *
 * received → under review → recommended → selected
 *                                ↘ rejected
 */
export type QuotationStatus =
  | 'received'
  | 'under review'
  | 'recommended'
  | 'selected'
  | 'rejected'

export interface Quotation {
  id: string

  /**
   * Material request being quoted.
   */
  requestId: string

  /**
   * Supplier responsible for the quotation.
   */
  supplierId: string
  supplierName: string

  /**
   * Commercial terms.
   */
  amount: number
  currency: string
  deliveryDays: number
  validUntil: ISODateString

  /**
   * Optional commercial and fulfilment conditions.
   */
  paymentTerms?: string
  deliveryIncluded?: boolean
  documentationIncluded?: boolean
  notes?: string

  status: QuotationStatus
  submittedDate: ISODateString
}

/**
 * Input used when submitting a supplier quotation.
 */
export interface CreateQuotationInput {
  requestId: string
  supplierId: string
  amount: number
  currency?: string
  deliveryDays: number
  validUntil: ISODateString
  paymentTerms?: string
  deliveryIncluded?: boolean
  documentationIncluded?: boolean
  notes?: string
}

/* -------------------------------------------------------------------------- */
/* Purchase orders                                                            */
/* -------------------------------------------------------------------------- */

/**
 * Purchase order lifecycle.
 *
 * draft → issued → acknowledged → in transit → delivered → completed
 */
export type PurchaseOrderStatus =
  | 'draft'
  | 'issued'
  | 'acknowledged'
  | 'in transit'
  | 'delivered'
  | 'completed'

export interface PurchaseOrder {
  id: string

  /**
   * Procurement records from which this order originated.
   */
  requestId: string
  quotationId?: string

  /**
   * Supplier fulfilling the order.
   */
  supplierId: string
  supplierName: string

  /**
   * Project receiving the materials.
   */
  projectId?: string

  /**
   * Human-readable order summary.
   */
  itemSummary: string

  /**
   * Commercial value of the purchase order.
   */
  amount: number
  currency: string

  status: PurchaseOrderStatus

  issuedDate: ISODateString
  expectedDelivery?: ISODateString
}

/**
 * Input used when converting a selected quotation into
 * a purchase order.
 */
export interface CreatePurchaseOrderInput {
  requestId: string
  quotationId: string
  supplierId: string
  projectId?: string
}

/* -------------------------------------------------------------------------- */
/* Deliveries & verification                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Delivery verification lifecycle.
 *
 * pending verification → verified
 *                     ↘ rejected
 */
export type DeliveryStatus =
  | 'pending verification'
  | 'verified'
  | 'rejected'

export interface DeliveryItem {
  /**
   * Material delivered.
   */
  description: string

  /**
   * Quantity expected according to the purchase order.
   */
  orderedQuantity: string

  /**
   * Quantity physically received.
   */
  deliveredQuantity: string
}

export interface Delivery {
  id: string

  /**
   * Purchase order fulfilled by this delivery.
   */
  purchaseOrderId: string

  supplierName: string
  projectName?: string

  deliveredDate: ISODateString
  status: DeliveryStatus

  /**
   * Line-level reconciliation between ordered and delivered quantities.
   */
  items: DeliveryItem[]

  /**
   * Delivery or inspection notes.
   */
  notes?: string
}

/**
 * Input used when verifying a delivery.
 */
export interface VerifyDeliveryInput {
  deliveryId: string
  accepted: boolean
  notes?: string
}

/* -------------------------------------------------------------------------- */
/* Procurement relationships                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Useful relationship model when a screen needs to represent the complete
 * procurement chain without redefining individual entities.
 *
 * Material Request
 *      ↓
 * Quotation
 *      ↓
 * Purchase Order
 *      ↓
 * Delivery
 */
export interface ProcurementRecord {
  materialRequest?: MaterialRequest
  quotation?: Quotation
  purchaseOrder?: PurchaseOrder
  delivery?: Delivery
}

/* -------------------------------------------------------------------------- */
/* Lifecycle utilities                                                        */
/* -------------------------------------------------------------------------- */

/**
 * Ordered lifecycle values.
 *
 * These constants are intentionally frozen so workflow UIs, filters,
 * progress indicators, and validation logic can share one source of truth.
 */
export const MATERIAL_REQUEST_STATUSES = [
  'requested',
  'quoted',
  'ordered',
  'delivered',
  'verified',
] as const

export const QUOTATION_STATUSES = [
  'received',
  'under review',
  'recommended',
  'selected',
  'rejected',
] as const

export const PURCHASE_ORDER_STATUSES = [
  'draft',
  'issued',
  'acknowledged',
  'in transit',
  'delivered',
  'completed',
] as const

export const DELIVERY_STATUSES = [
  'pending verification',
  'verified',
  'rejected',
] as const

/* -------------------------------------------------------------------------- */
/* Lifecycle guards                                                           */
/* -------------------------------------------------------------------------- */

export function isMaterialRequestStatus(
  value: string,
): value is MaterialRequestStatus {
  return MATERIAL_REQUEST_STATUSES.includes(
    value as MaterialRequestStatus,
  )
}

export function isQuotationStatus(
  value: string,
): value is QuotationStatus {
  return QUOTATION_STATUSES.includes(
    value as QuotationStatus,
  )
}

export function isPurchaseOrderStatus(
  value: string,
): value is PurchaseOrderStatus {
  return PURCHASE_ORDER_STATUSES.includes(
    value as PurchaseOrderStatus,
  )
}

export function isDeliveryStatus(
  value: string,
): value is DeliveryStatus {
  return DELIVERY_STATUSES.includes(
    value as DeliveryStatus,
  )
}