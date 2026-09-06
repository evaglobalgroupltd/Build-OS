// Suppliers module — API service layer
// BRD reference: Sec. 17.2 / Sec. 28.1
//
// This is the single network boundary for the Suppliers marketplace.
// Pages and components should NOT call fetch/axios directly.
//
// The service currently uses mock data because the backend contract
// is not available yet. Once the backend is ready, replace the mock
// implementations with the real API calls below.

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
  sortBy?: 'trust' | 'rating' | 'products' | 'delivery'
  sortOrder?: 'asc' | 'desc'
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
  availability: 'In Stock' | 'Limited' | 'Out of Stock'
}

export interface SupplierReview {
  id: string
  reviewerName: string
  rating: number
  comment: string
  date: string
}

export const MarketService = {
  /**
   * Get suppliers for the marketplace.
   *
   * Backend:
   * GET /suppliers
   *
   * Example:
   * const response = await api.get<SupplierListResponse>('/suppliers', {
   *   params,
   * })
   * return response.data
   */
  async list(
    params: SupplierListParams = {},
  ): Promise<SupplierListResponse> {
    // TODO: Replace with:
    //
    // const response = await api.get<SupplierListResponse>(
    //   '/suppliers',
    //   { params },
    // )
    //
    // return response.data

    void params

    return {
      suppliers: [],
      stats: {
        totalSuppliers: 0,
        verifiedSuppliers: 0,
        listedMaterials: 0,
        averageTrust: 0,
        activeDeliveries: 0,
        deliveryCoverage: '—',
      },
      total: 0,
      page: 1,
      limit: 20,
    }
  },

  /**
   * Get a single supplier profile.
   *
   * Backend:
   * GET /suppliers/:id
   */
  async get(id: string): Promise<SupplierProfile> {
    // TODO: Replace with:
    //
    // const response = await api.get<SupplierProfile>(
    //   `/suppliers/${id}`,
    // )
    //
    // return response.data

    throw new Error(`Supplier ${id} not found`)
  },

  /**
   * Search suppliers.
   *
   * Kept as a convenience method so components do not need
   * to construct API query parameters themselves.
   */
  async search(
    query: string,
    params: Omit<SupplierListParams, 'search'> = {},
  ): Promise<SupplierListResponse> {
    return this.list({
      ...params,
      search: query,
    })
  },

  /**
   * Get supplier marketplace statistics.
   *
   * Backend:
   * GET /suppliers/marketplace/stats
   */
  async getStats(): Promise<SupplierMarketplaceStats> {
    // TODO: Replace with:
    //
    // const response = await api.get<SupplierMarketplaceStats>(
    //   '/suppliers/marketplace/stats',
    // )
    //
    // return response.data

    return {
      totalSuppliers: 0,
      verifiedSuppliers: 0,
      listedMaterials: 0,
      averageTrust: 0,
      activeDeliveries: 0,
      deliveryCoverage: '—',
    }
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
    // TODO: Replace with:
    //
    // const response = await api.get<SupplierCatalogueItem[]>(
    //   `/suppliers/${supplierId}/catalogue`,
    // )
    //
    // return response.data

    void supplierId

    return []
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
    // TODO: Replace with:
    //
    // const response = await api.get<SupplierReview[]>(
    //   `/suppliers/${supplierId}/reviews`,
    // )
    //
    // return response.data

    void supplierId

    return []
  },
}