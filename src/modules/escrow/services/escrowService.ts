// Escrow module — API service layer
// BRD reference: Sec. 18
//
// Single network boundary for the Escrow module.
// Pages and components must never call fetch/axios directly.
//
// Lean-MVP custody model:
// - Build OS tracks escrow/payment state.
// - Funds may be held by an approved escrow/financial partner.
// - Build OS may record direct bank-transfer status.
// - Build OS does not imply custody of client funds.
//
// Backend contract target: BRD Sec. 28.1
//
// Architectural principles:
// - Keep transport concerns inside this module.
// - Keep all escrow endpoints typed.
// - Keep route construction centralized.
// - Preserve custody/compliance semantics.
// - Return domain types rather than raw transport responses.
// - Surface useful errors to the UI without leaking implementation details.

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

/**
 * Replace this import with the application's shared API client.
 *
 * Example:
 * import { api } from '@/lib/api'
 *
 * The service intentionally depends on one shared transport layer so
 * authentication, headers, serialization, interceptors and error
 * handling remain centralized.
 */
import { api } from '@/lib/api'

/* -------------------------------------------------------------------------- */
/* Constants                                                                  */
/* -------------------------------------------------------------------------- */

const ESCROW_BASE = '/escrow'

/* -------------------------------------------------------------------------- */
/* Errors                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Domain-level error used by the Escrow service.
 *
 * The API client should normally normalize HTTP failures before they
 * reach this layer. This class exists so callers can reliably identify
 * escrow-specific service failures when needed.
 */
export class EscrowServiceError extends Error {
  readonly code?: string
  readonly status?: number
  readonly cause?: unknown

  constructor(
    message: string,
    options?: {
      code?: string
      status?: number
      cause?: unknown
    },
  ) {
    super(message)

    this.name = 'EscrowServiceError'
    this.code = options?.code
    this.status = options?.status
    this.cause = options?.cause

    Object.setPrototypeOf(this, EscrowServiceError.prototype)
  }
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Safely encode a dynamic URL segment.
 *
 * IDs should never be interpolated into an endpoint without encoding.
 */
const segment = (value: string): string => {
  const normalized = value.trim()

  if (!normalized) {
    throw new EscrowServiceError('A valid identifier is required.', {
      code: 'INVALID_IDENTIFIER',
    })
  }

  return encodeURIComponent(normalized)
}

/**
 * Normalize service errors into a predictable domain error.
 *
 * The shared API client may expose different error shapes depending on
 * the transport implementation. This helper keeps that detail out of
 * pages and components.
 */
const normalizeError = (
 error: unknown,
  fallbackMessage: string,
): EscrowServiceError => {
  if (error instanceof EscrowServiceError) {
    return error
  }

  if (error instanceof Error) {
    return new EscrowServiceError(error.message || fallbackMessage, {
      cause: error,
    })
  }

  if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    return new EscrowServiceError(error.message, {
      cause: error,
    })
  }

  return new EscrowServiceError(fallbackMessage, {
    cause: error,
  })
}

/**
 * Wrap a service operation with consistent error normalization.
 */
const request = async <T>(
  operation: () => Promise<T>,
  fallbackMessage: string,
): Promise<T> => {
  try {
    return await operation()
  } catch (error) {
    throw normalizeError(error, fallbackMessage)
  }
}

/* -------------------------------------------------------------------------- */
/* Escrow service                                                              */
/* -------------------------------------------------------------------------- */

export const escrowService = {
  /* ------------------------------------------------------------------------ */
  /* Summary & accounts                                                       */
  /* ------------------------------------------------------------------------ */

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
  getSummary: async (): Promise<EscrowSummary> =>
    request(
      () => api.get<EscrowSummary>(`${ESCROW_BASE}/summary`),
      'Unable to load the escrow summary.',
    ),

  /**
   * List escrow accounts/wallets available to the current user.
   */
  listAccounts: async (): Promise<EscrowAccount[]> =>
    request(
      () => api.get<EscrowAccount[]>(`${ESCROW_BASE}/accounts`),
      'Unable to load escrow accounts.',
    ),

  /**
   * Get a single escrow account.
   */
  getAccount: async (accountId: string): Promise<EscrowAccount> =>
    request(
      () =>
        api.get<EscrowAccount>(
          `${ESCROW_BASE}/accounts/${segment(accountId)}`,
        ),
      'Unable to load the escrow account.',
    ),

  /**
   * Get the wallet allocated to a specific project.
   */
  getProjectWallet: async (projectId: string): Promise<ProjectWallet> =>
    request(
      () =>
        api.get<ProjectWallet>(
          `${ESCROW_BASE}/projects/${segment(projectId)}/wallet`,
        ),
      'Unable to load the project wallet.',
    ),

  /**
   * Get the configured funding/custody source for an escrow account.
   *
   * Important:
   * This describes the configured custody/funding arrangement.
   * It does not mean Build OS itself holds client funds.
   */
  getFundingSource: async (
    accountId: string,
  ): Promise<EscrowFundingSource> =>
    request(
      () =>
        api.get<EscrowFundingSource>(
          `${ESCROW_BASE}/accounts/${segment(accountId)}/funding-source`,
        ),
      'Unable to load the funding and custody source.',
    ),

  /* ------------------------------------------------------------------------ */
  /* Funding                                                                   */
  /* ------------------------------------------------------------------------ */

  /**
   * Create a request to fund a project escrow wallet.
   *
   * This records the funding instruction/status.
   * It does not imply that Build OS itself receives or holds the funds.
   */
  createFundingRequest: async (
    input: FundingRequest,
  ): Promise<FundingRequest> =>
    request(
      () =>
        api.post<FundingRequest>(
          `${ESCROW_BASE}/funding-requests`,
          input,
        ),
      'Unable to create the funding request.',
    ),

  /**
   * Get the status of a funding request.
   */
  getFundingRequest: async (
    fundingRequestId: string,
  ): Promise<FundingRequest> =>
    request(
      () =>
        api.get<FundingRequest>(
          `${ESCROW_BASE}/funding-requests/${segment(fundingRequestId)}`,
        ),
      'Unable to load the funding request.',
    ),

  /* ------------------------------------------------------------------------ */
  /* Payment requests                                                         */
  /* ------------------------------------------------------------------------ */

  /**
   * List payment-release requests.
   *
   * Used by the Payment Requests screen.
   */
  listPaymentRequests: async (): Promise<PaymentRequest[]> =>
    request(
      () =>
        api.get<PaymentRequest[]>(
          `${ESCROW_BASE}/payment-requests`,
        ),
      'Unable to load payment requests.',
    ),

  /**
   * Get a single payment-release request.
   */
  getPaymentRequest: async (
    paymentRequestId: string,
  ): Promise<PaymentRequest> =>
    request(
      () =>
        api.get<PaymentRequest>(
          `${ESCROW_BASE}/payment-requests/${segment(paymentRequestId)}`,
        ),
      'Unable to load the payment request.',
    ),

  /**
   * Submit a milestone payment-release request.
   *
   * Evidence, milestone information and verification references
   * should be supplied by the backend contract.
   */
  createPaymentRequest: async (
    input: PaymentRequest,
  ): Promise<PaymentRequest> =>
    request(
      () =>
        api.post<PaymentRequest>(
          `${ESCROW_BASE}/payment-requests`,
          input,
        ),
      'Unable to create the payment request.',
    ),

  /* ------------------------------------------------------------------------ */
  /* Payment approvals                                                        */
  /* ------------------------------------------------------------------------ */

  /**
   * List payment requests awaiting approval.
   */
  listPaymentApprovals: async (): Promise<PaymentApproval[]> =>
    request(
      () =>
        api.get<PaymentApproval[]>(
          `${ESCROW_BASE}/payment-approvals`,
        ),
      'Unable to load payment approvals.',
    ),

  /**
   * Approve a payment-release request.
   */
  approvePayment: async (
    paymentRequestId: string,
  ): Promise<PaymentApproval> =>
    request(
      () =>
        api.post<PaymentApproval>(
          `${ESCROW_BASE}/payment-requests/${segment(paymentRequestId)}/approve`,
        ),
      'Unable to approve the payment request.',
    ),

  /**
   * Reject a payment-release request.
   *
   * A reason is required for auditability.
   */
  rejectPayment: async (
    paymentRequestId: string,
    reason: string,
  ): Promise<PaymentApproval> => {
    const normalizedReason = reason.trim()

    if (!normalizedReason) {
      throw new EscrowServiceError(
        'A rejection reason is required.',
        {
          code: 'REJECTION_REASON_REQUIRED',
        },
      )
    }

    return request(
      () =>
        api.post<PaymentApproval>(
          `${ESCROW_BASE}/payment-requests/${segment(paymentRequestId)}/reject`,
          {
            reason: normalizedReason,
          },
        ),
      'Unable to reject the payment request.',
    )
  },

  /* ------------------------------------------------------------------------ */
  /* Frozen payments                                                          */
  /* ------------------------------------------------------------------------ */

  /**
   * List payment lines currently frozen.
   */
  listFrozenPayments: async (): Promise<FrozenPayment[]> =>
    request(
      () =>
        api.get<FrozenPayment[]>(
          `${ESCROW_BASE}/frozen-payments`,
        ),
      'Unable to load frozen payments.',
    ),

  /**
   * Get a specific frozen payment.
   */
  getFrozenPayment: async (
    paymentId: string,
  ): Promise<FrozenPayment> =>
    request(
      () =>
        api.get<FrozenPayment>(
          `${ESCROW_BASE}/frozen-payments/${segment(paymentId)}`,
        ),
      'Unable to load the frozen payment.',
    ),

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
    const normalizedReason = reason.trim()

    if (!normalizedReason) {
      throw new EscrowServiceError(
        'A freeze reason is required.',
        {
          code: 'FREEZE_REASON_REQUIRED',
        },
      )
    }

    return request(
      () =>
        api.post<FrozenPayment>(
          `${ESCROW_BASE}/payments/${segment(paymentId)}/freeze`,
          {
            reason: normalizedReason,
          },
        ),
      'Unable to freeze the payment.',
    )
  },

  /* ------------------------------------------------------------------------ */
  /* Refunds                                                                  */
  /* ------------------------------------------------------------------------ */

  /**
   * List refunds associated with the current user's projects.
   */
  listRefunds: async (): Promise<Refund[]> =>
    request(
      () =>
        api.get<Refund[]>(`${ESCROW_BASE}/refunds`),
      'Unable to load refunds.',
    ),

  /**
   * Get a specific refund.
   */
  getRefund: async (refundId: string): Promise<Refund> =>
    request(
      () =>
        api.get<Refund>(
          `${ESCROW_BASE}/refunds/${segment(refundId)}`,
        ),
      'Unable to load the refund.',
    ),

  /**
   * Request or initiate a refund where permitted by the workflow.
   *
   * Final authorization and settlement must happen server-side.
   */
  createRefund: async (input: Refund): Promise<Refund> =>
    request(
      () =>
        api.post<Refund>(
          `${ESCROW_BASE}/refunds`,
          input,
        ),
      'Unable to create the refund request.',
    ),

  /* ------------------------------------------------------------------------ */
  /* Transactions                                                              */
  /* ------------------------------------------------------------------------ */

  /**
   * Retrieve escrow transaction history.
   */
  listTransactions: async (): Promise<EscrowTransaction[]> =>
    request(
      () =>
        api.get<EscrowTransaction[]>(
          `${ESCROW_BASE}/transactions`,
        ),
      'Unable to load escrow transactions.',
    ),

  /**
   * Get transactions for a specific project.
   */
  listProjectTransactions: async (
    projectId: string,
  ): Promise<EscrowTransaction[]> =>
    request(
      () =>
        api.get<EscrowTransaction[]>(
          `${ESCROW_BASE}/projects/${segment(projectId)}/transactions`,
        ),
      'Unable to load project transactions.',
    ),

  /**
   * Get a single transaction.
   */
  getTransaction: async (
    transactionId: string,
  ): Promise<EscrowTransaction> =>
    request(
      () =>
        api.get<EscrowTransaction>(
          `${ESCROW_BASE}/transactions/${segment(transactionId)}`,
        ),
      'Unable to load the escrow transaction.',
    ),
} as const

export type EscrowService = typeof escrowService