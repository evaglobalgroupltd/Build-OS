// Escrow module — API service layer
// BRD reference: Sec. 18
//
// This is the single network boundary for the Escrow module.
// Pages and components must not call fetch/axios directly.
//
// Lean-MVP custody model:
// - Build OS tracks escrow/payment state.
// - Funds may be held by an approved escrow/financial partner.
// - Build OS may record direct bank-transfer status.
// - Build OS does not imply custody of client funds.
//
// TODO: Connect these methods to the real API when the backend
// contract in BRD Sec. 28.1 is implemented.

import type {
  EscrowAccount,
  EscrowTransaction,
  FundingRequest,
  PaymentRequest,
  PaymentApproval,
  FrozenPayment,
  Refund,
  EscrowSummary,
  ProjectWallet,
  EscrowFundingSource,
} from './types'

export const escrowService = {
  /**
   * Get the overall escrow summary for the authenticated user.
   *
   * Includes:
   * - total balance
   * - reserved funds
   * - released funds
   * - frozen funds
   * - refunded funds
   */
  getSummary: async (): Promise<EscrowSummary> => {
    // TODO:
    // return api.get<EscrowSummary>('/escrow/summary')
    throw new Error('Escrow API not implemented')
  },

  /**
   * List escrow accounts/wallets available to the current user.
   */
  listAccounts: async (): Promise<EscrowAccount[]> => {
    // TODO:
    // return api.get<EscrowAccount[]>('/escrow/accounts')
    throw new Error('Escrow API not implemented')
  },

  /**
   * Get a single escrow account.
   */
  getAccount: async (accountId: string): Promise<EscrowAccount> => {
    // TODO:
    // return api.get<EscrowAccount>(`/escrow/accounts/${accountId}`)
    throw new Error('Escrow API not implemented')
  },

  /**
   * Get the wallet allocated to a specific project.
   */
  getProjectWallet: async (projectId: string): Promise<ProjectWallet> => {
    // TODO:
    // return api.get<ProjectWallet>(`/escrow/projects/${projectId}/wallet`)
    throw new Error('Escrow API not implemented')
  },

  /**
   * Get the configured funding/custody source for an escrow account.
   */
  getFundingSource: async (
    accountId: string,
  ): Promise<EscrowFundingSource> => {
    // TODO:
    // return api.get<EscrowFundingSource>(
    //   `/escrow/accounts/${accountId}/funding-source`,
    // )
    throw new Error('Escrow API not implemented')
  },

  /**
   * Create a request to fund a project escrow wallet.
   *
   * This records the funding instruction/status.
   * It does not imply that Build OS itself receives or holds the funds.
   */
  createFundingRequest: async (
    input: FundingRequest,
  ): Promise<FundingRequest> => {
    // TODO:
    // return api.post<FundingRequest>('/escrow/funding-requests', input)
    throw new Error('Escrow API not implemented')
  },

  /**
   * Get the status of a funding request.
   */
  getFundingRequest: async (
    fundingRequestId: string,
  ): Promise<FundingRequest> => {
    // TODO:
    // return api.get<FundingRequest>(
    //   `/escrow/funding-requests/${fundingRequestId}`,
    // )
    throw new Error('Escrow API not implemented')
  },

  /**
   * List payment-release requests.
   *
   * Used by the Payment Requests screen.
   */
  listPaymentRequests: async (): Promise<PaymentRequest[]> => {
    // TODO:
    // return api.get<PaymentRequest[]>('/escrow/payment-requests')
    throw new Error('Escrow API not implemented')
  },

  /**
   * Get a single payment-release request.
   */
  getPaymentRequest: async (
    paymentRequestId: string,
  ): Promise<PaymentRequest> => {
    // TODO:
    // return api.get<PaymentRequest>(
    //   `/escrow/payment-requests/${paymentRequestId}`,
    // )
    throw new Error('Escrow API not implemented')
  },

  /**
   * Submit a milestone payment-release request.
   *
   * Evidence, milestone information and verification references
   * should be supplied by the backend contract.
   */
  createPaymentRequest: async (
    input: PaymentRequest,
  ): Promise<PaymentRequest> => {
    // TODO:
    // return api.post<PaymentRequest>('/escrow/payment-requests', input)
    throw new Error('Escrow API not implemented')
  },

  /**
   * List payment requests awaiting approval.
   */
  listPaymentApprovals: async (): Promise<PaymentApproval[]> => {
    // TODO:
    // return api.get<PaymentApproval[]>('/escrow/payment-approvals')
    throw new Error('Escrow API not implemented')
  },

  /**
   * Approve a payment-release request.
   */
  approvePayment: async (
    paymentRequestId: string,
  ): Promise<PaymentApproval> => {
    // TODO:
    // return api.post<PaymentApproval>(
    //   `/escrow/payment-requests/${paymentRequestId}/approve`,
    // )
    throw new Error('Escrow API not implemented')
  },

  /**
   * Reject a payment-release request.
   *
   * A reason should be required by the backend for auditability.
   */
  rejectPayment: async (
    paymentRequestId: string,
    reason: string,
  ): Promise<PaymentApproval> => {
    // TODO:
    // return api.post<PaymentApproval>(
    //   `/escrow/payment-requests/${paymentRequestId}/reject`,
    //   { reason },
    // )
    throw new Error('Escrow API not implemented')
  },

  /**
   * List payment lines currently frozen.
   */
  listFrozenPayments: async (): Promise<FrozenPayment[]> => {
    // TODO:
    // return api.get<FrozenPayment[]>('/escrow/frozen-payments')
    throw new Error('Escrow API not implemented')
  },

  /**
   * Get a specific frozen payment.
   */
  getFrozenPayment: async (
    paymentId: string,
  ): Promise<FrozenPayment> => {
    // TODO:
    // return api.get<FrozenPayment>(`/escrow/frozen-payments/${paymentId}`)
    throw new Error('Escrow API not implemented')
  },

  /**
   * Freeze an affected payment line.
   *
   * Normally triggered by the dispute engine rather than directly
   * by an ordinary client. Authorization must be enforced server-side.
   */
  freezePayment: async (
    paymentId: string,
    reason: string,
  ): Promise<FrozenPayment> => {
    // TODO:
    // return api.post<FrozenPayment>(
    //   `/escrow/payments/${paymentId}/freeze`,
    //   { reason },
    // )
    throw new Error('Escrow API not implemented')
  },

  /**
   * List refunds associated with the current user's projects.
   */
  listRefunds: async (): Promise<Refund[]> => {
    // TODO:
    // return api.get<Refund[]>('/escrow/refunds')
    throw new Error('Escrow API not implemented')
  },

  /**
   * Get a specific refund.
   */
  getRefund: async (refundId: string): Promise<Refund> => {
    // TODO:
    // return api.get<Refund>(`/escrow/refunds/${refundId}`)
    throw new Error('Escrow API not implemented')
  },

  /**
   * Request or initiate a refund where permitted by the workflow.
   *
   * Final authorization and settlement must happen server-side.
   */
  createRefund: async (input: Refund): Promise<Refund> => {
    // TODO:
    // return api.post<Refund>('/escrow/refunds', input)
    throw new Error('Escrow API not implemented')
  },

  /**
   * Retrieve escrow transaction history.
   */
  listTransactions: async (): Promise<EscrowTransaction[]> => {
    // TODO:
    // return api.get<EscrowTransaction[]>('/escrow/transactions')
    throw new Error('Escrow API not implemented')
  },

  /**
   * Get transactions for a specific project.
   */
  listProjectTransactions: async (
    projectId: string,
  ): Promise<EscrowTransaction[]> => {
    // TODO:
    // return api.get<EscrowTransaction[]>(
    //   `/escrow/projects/${projectId}/transactions`,
    // )
    throw new Error('Escrow API not implemented')
  },

  /**
   * Get a single transaction.
   */
  getTransaction: async (
    transactionId: string,
  ): Promise<EscrowTransaction> => {
    // TODO:
    // return api.get<EscrowTransaction>(
    //   `/escrow/transactions/${transactionId}`,
    // )
    throw new Error('Escrow API not implemented')
  },
}