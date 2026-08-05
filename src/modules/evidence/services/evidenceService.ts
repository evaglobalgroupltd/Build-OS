// Evidence module — API service layer
// TODO: replace with real HTTP calls once the backend (Sec. 28.1) is available.
// Keep this file as the single place this module talks to the network so
// pages/components never call fetch/axios directly.

export const evidenceService = {
  // example shape — implement once the API contract is defined
  // list: () => api.get<Evidence[]>('/evidence'),
  // get: (id: string) => api.get<Evidence>(`/evidence/${id}`),
}
