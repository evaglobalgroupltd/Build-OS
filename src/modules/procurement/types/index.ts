// Procurement module — domain types (BRD Sec. 17.3)

export type MaterialRequestStatus = 'requested' | 'quoted' | 'ordered' | 'delivered' | 'verified'

export interface MaterialRequest {
  id: string
  projectId: string
  item: string
  quantity: string
  status: MaterialRequestStatus
  supplierName?: string
}
