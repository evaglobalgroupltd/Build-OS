// Procurement module — domain types (BRD Sec. 17.3)

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
  projectId: string
  item: string
  quantity: string
  status: MaterialRequestStatus
  supplierName?: string
  supplierId?: string
  notes?: string
  requestedDate?: string
  updatedDate?: string
}

/**
 * Supplier quotation lifecycle.
 */
export type QuotationStatus =
  | 'received'
  | 'under review'
  | 'recommended'
  | 'selected'
  | 'rejected'

export interface Quotation {
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
  status: QuotationStatus
  submittedDate: string
}

/**
 * Purchase order lifecycle.
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

/**
 * Delivery and verification lifecycle.
 */
export type DeliveryStatus =
  | 'pending verification'
  | 'verified'
  | 'rejected'

export interface DeliveryItem {
  description: string
  orderedQuantity: string
  deliveredQuantity: string
}

export interface Delivery {
  id: string
  purchaseOrderId: string
  supplierName: string
  projectName?: string
  deliveredDate: string
  status: DeliveryStatus
  items: DeliveryItem[]
  notes?: string
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
 * Input used when submitting a supplier quotation.
 */
export interface CreateQuotationInput {
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

/**
 * Input used when converting a selected quotation
 * into a purchase order.
 */
export interface CreatePurchaseOrderInput {
  requestId: string
  quotationId: string
  supplierId: string
  projectId?: string
}

/**
 * Input used when verifying a delivery.
 */
export interface VerifyDeliveryInput {
  deliveryId: string
  accepted: boolean
  notes?: string
}