//
// Suppliers module — shared domain types
// BRD reference: Sec. 17.2
//
// This file is the canonical source of truth for supplier-marketplace
// domain contracts.
//
// Cross-cutting types such as User, UserRole, Project, etc. belong
// in src/types and should not be duplicated here.
//

/* -------------------------------------------------------------------------- */
/* Supplier status                                                            */
/* -------------------------------------------------------------------------- */

export type SupplierStatus =
  | 'Verified'
  | 'Pending Review'

/* -------------------------------------------------------------------------- */
/* Supplier sorting                                                           */
/* -------------------------------------------------------------------------- */

export type SupplierSortBy =
  | 'trust'
  | 'rating'
  | 'delivery'
  | 'products'

export type SortOrder =
  | 'asc'
  | 'desc'

/* -------------------------------------------------------------------------- */
/* Supplier catalogue                                                         */
/* -------------------------------------------------------------------------- */

export type SupplierCatalogueAvailability =
  | 'In Stock'
  | 'Limited'
  | 'Out of Stock'

export interface SupplierCatalogueItem {
  id: string
  supplierId: string

  name: string
  category: string

  description?: string

  unit: string
  price?: number
  currency?: string

  availability?: SupplierCatalogueAvailability
  available: boolean

  imageUrl?: string
}

/* -------------------------------------------------------------------------- */
/* Supplier reviews                                                           */
/* -------------------------------------------------------------------------- */

export interface SupplierReview {
  id: string
  supplierId: string

  reviewerId: string
  reviewerName?: string

  rating: number
  comment?: string

  createdAt: string
}

/* -------------------------------------------------------------------------- */
/* Core supplier                                                              */
/* -------------------------------------------------------------------------- */

export interface MarketSupplier {
  id: string

  /* Identity */
  name: string
  initials: string
  category: string
  location: string

  /* Marketplace status */
  status: SupplierStatus

  /* Trust & reputation */
  trustScore: number
  rating: number
  reviews: number

  /* Marketplace activity */
  products: number
  deliveries: number
  onTimeDelivery: number

  /* Coverage */
  deliveryCoverage: string
  specialties: string[]
}

/* -------------------------------------------------------------------------- */
/* Supplier profile                                                           */
/* -------------------------------------------------------------------------- */

export interface SupplierProfile extends MarketSupplier {
  /* Company information */
  description?: string

  phone?: string
  email?: string
  website?: string
  address?: string

  /* Verification */
  verificationDate?: string

  /* Operational performance */
  totalOrders?: number
  completedOrders?: number
  cancelledOrders?: number

  responseRate?: number
  averageResponseTime?: string

  /* Business credentials */
  certifications?: string[]

  /* Commercial information */
  paymentMethods?: string[]
  serviceAreas?: string[]

  /* Audit metadata */
  createdAt?: string
  updatedAt?: string
}

/* -------------------------------------------------------------------------- */
/* Supplier list/query                                                        */
/* -------------------------------------------------------------------------- */

export interface SupplierListParams {
  search?: string

  category?: string
  location?: string
  status?: SupplierStatus

  sortBy?: SupplierSortBy
  sortOrder?: SortOrder

  page?: number
  limit?: number
}

/* -------------------------------------------------------------------------- */
/* Supplier list response                                                     */
/* -------------------------------------------------------------------------- */

export interface SupplierListResponse {
  suppliers: MarketSupplier[]

  total: number
  page: number
  limit: number
  totalPages: number
}

/* -------------------------------------------------------------------------- */
/* Marketplace statistics                                                     */
/* -------------------------------------------------------------------------- */

export interface SupplierStats {
  totalSuppliers: number
  verifiedSuppliers: number
  listedMaterials: number
  averageTrust: number
  activeDeliveries: number

  /**
   * Human-readable aggregate coverage.
   *
   * Example:
   * "FCT + 5 States"
   */
  deliveryCoverage: string
}