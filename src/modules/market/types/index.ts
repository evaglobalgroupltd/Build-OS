// Suppliers module — shared domain types
// BRD reference: Sec. 17.2
//
// Keep supplier-marketplace-specific types here.
// Cross-cutting types (User, UserRole, etc.) belong in src/types.

export type SupplierStatus = 'Verified' | 'Pending Review'

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

export interface SupplierProfile extends MarketSupplier {
  description?: string

  phone?: string
  email?: string
  website?: string

  address?: string
  verificationDate?: string

  totalOrders?: number
  completedOrders?: number
  cancelledOrders?: number

  responseRate?: number
  averageResponseTime?: string

  certifications?: string[]
  paymentMethods?: string[]
  serviceAreas?: string[]

  createdAt?: string
  updatedAt?: string
}

export interface SupplierCatalogueItem {
  id: string
  supplierId: string
  name: string
  category: string
  description?: string
  unit: string
  price?: number
  currency?: string
  available: boolean
  imageUrl?: string
}

export interface SupplierReview {
  id: string
  supplierId: string
  reviewerId: string
  reviewerName?: string
  rating: number
  comment?: string
  createdAt: string
}

export interface SupplierListParams {
  search?: string
  category?: string
  location?: string
  status?: SupplierStatus
  sortBy?: 'trust' | 'rating' | 'delivery' | 'products'
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}

export interface SupplierListResponse {
  suppliers: MarketSupplier[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface SupplierStats {
  totalSuppliers: number
  verifiedSuppliers: number
  listedMaterials: number
  averageTrust: number
  activeDeliveries: number
  deliveryCoverage: string
}