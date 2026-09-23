
import {
  CheckCircle2,
  Clock3,
  FileText,
  MessageSquare,
  Paperclip,
  Send,
  ShieldCheck,
} from 'lucide-react'

import { Badge } from '@/components/ui/Badge'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'

interface DisputeResponse {
  id: string
  party: string
  role: string
  initials: string
  submittedAt: string
  status: 'submitted' | 'pending'
  message: string
  evidenceCount: number
}

const responses: DisputeResponse[] = [
  {
    id: 'RESP-001',
    party: 'BuildRight Construction Ltd.',
    role: 'Contractor',
    initials: 'BR',
    submittedAt: '24 Aug 2026 · 14:32',
    status: 'submitted',
    message:
      'The milestone work was completed according to the approved scope and construction schedule. The payment request corresponds to work completed and documented on site. We have attached the relevant progress report, inspection records and site photographs.',
    evidenceCount: 3,
  },
  {
    id: 'RESP-002',
    party: 'Client',
    role: 'Client / Diaspora Investor',
    initials: 'CL',
    submittedAt: '25 Aug 2026 · 09:18',
    status: 'submitted',
    message:
      'The milestone should not be released until the outstanding quality concerns identified during inspection have been resolved and the affected works have been verified by the project manager.',
    evidenceCount: 2,
  },
]

export function Responses() {
  const submittedCount = responses.filter(
    (response) => response.status === 'submitted',
  ).length

  const evidenceCount = responses.reduce(
    (total, response) => total + response.evidenceCount,
    0,
  )

  return (
    <Card className="overflow-hidden border-ink/[0.07] bg-white shadow-[0_14px_45px_rgba(0,0,0,0.04)]">
      {/* ------------------------------------------------------------------ */}
      {/* Command header                                                     */}
      {/* ------------------------------------------------------------------ */}
      <div className="relative overflow-hidden bg-ink px-5 py-6 text-white sm:px-7 sm:py-7">
        {/* Decorative rings */}
        <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full border border-white/[0.07]" />
        <div className="pointer-events-none absolute -right-4 -top-12 h-40 w-40 rounded-full border border-white/[0.06]" />
        <div className="pointer-events-none absolute -bottom-28 left-[42%] h-52 w-52 rounded-full border border-[#D58A52]/10" />

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
              <MessageSquare className="h-3.5 w-3.5" />
              Dispute correspondence
            </div>

            <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-[28px]">
              Party responses
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-white/55">
              Statements, explanations and counter-evidence submitted by
              dispute participants for formal review.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2 rounded-2xl border border-white/[0.09] bg-white/[0.05] px-4 py-3 backdrop-blur-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#D58A52]/15">
              <ShieldCheck className="h-4 w-4 text-[#D58A52]" />
            </div>

            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/35">
                Audit record
              </p>
              <p className="mt-0.5 text-xs font-medium text-white/75">
                Protected correspondence
              </p>
            </div>
          </div>
        </div>
      </div>

      <CardBody className="space-y-7 p-5 sm:p-7">
        {/* ---------------------------------------------------------------- */}
        {/* Response overview                                                */}
        {/* ---------------------------------------------------------------- */}
        <div className="grid gap-3 md:grid-cols-3">
          <div className="group rounded-[20px] border border-ink/[0.07] bg-paper-2 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_12px_30px_rgba(0,0,0,0.035)]">
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/[0.06]">
                <MessageSquare className="h-4 w-4 text-ink/55" />
              </div>

              <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-ink/25">
                Correspondence
              </span>
            </div>

            <div className="mt-5">
              <p className="font-display text-3xl font-semibold tracking-tight text-ink">
                {submittedCount}
              </p>

              <p className="mt-1 text-xs font-medium text-ink/45">
                Responses received
              </p>

              <div className="mt-3 flex items-center gap-1.5 text-[11px] text-teal-700">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Both parties responded
              </div>
            </div>
          </div>

          <div className="group rounded-[20px] border border-ink/[0.07] bg-paper-2 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_12px_30px_rgba(0,0,0,0.035)]">
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#B85C12]/10">
                <Paperclip className="h-4 w-4 text-[#B85C12]" />
              </div>

              <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-ink/25">
                Evidence
              </span>
            </div>

            <div className="mt-5">
              <p className="font-display text-3xl font-semibold tracking-tight text-ink">
                {evidenceCount}
              </p>

              <p className="mt-1 text-xs font-medium text-ink/45">
                Supporting files attached
              </p>

              <div className="mt-3 flex items-center gap-1.5 text-[11px] text-ink/40">
                <FileText className="h-3.5 w-3.5" />
                Included across responses
              </div>
            </div>
          </div>

          <div className="group rounded-[20px] border border-amber-200/70 bg-amber-50/50 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_12px_30px_rgba(0,0,0,0.035)]">
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100">
                <Clock3 className="h-4 w-4 text-amber-700" />
              </div>

              <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-amber-700/40">
                Workflow
              </span>
            </div>

            <div className="mt-5">
              <p className="text-lg font-semibold tracking-tight text-amber-800">
                Awaiting review
              </p>

              <p className="mt-1 text-xs font-medium text-amber-900/45">
                Administrative assessment required
              </p>

              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-amber-200/60">
                <div className="h-full w-1/2 rounded-full bg-amber-600" />
              </div>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Submitted responses                                              */}
        {/* ---------------------------------------------------------------- */}
        <section>
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/30">
                Formal record
              </p>

              <h3 className="mt-1 font-display text-lg font-semibold tracking-tight text-ink">
                Submitted responses
              </h3>

              <p className="mt-1 text-xs leading-5 text-ink/40">
                Each statement forms part of the dispute audit trail.
              </p>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-ink/[0.07] bg-paper-2 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/40">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-600" />
              {submittedCount} recorded
            </div>
          </div>

          <div className="space-y-4">
            {responses.map((response, index) => (
              <article
                key={response.id}
                className="group relative overflow-hidden rounded-[22px] border border-ink/[0.07] bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_38px_rgba(0,0,0,0.045)]"
              >
                {/* Status rail */}
                <div
                  className={`absolute inset-y-0 left-0 w-1 ${
                    response.status === 'submitted'
                      ? 'bg-teal-600'
                      : 'bg-amber-500'
                  }`}
                />

                <div className="p-5 pl-6 sm:p-6 sm:pl-7">
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
                    {/* Identity */}
                    <div className="flex min-w-0 flex-1 items-start gap-4">
                      <div className="relative shrink-0">
                        <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-ink text-xs font-bold tracking-wide text-white shadow-[0_8px_20px_rgba(23,54,41,0.14)]">
                          {response.initials}
                        </div>

                        <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-teal-600">
                          <CheckCircle2 className="h-2.5 w-2.5 text-white" />
                        </span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-sm font-semibold text-ink">
                            {response.party}
                          </h4>

                          <Badge tone="neutral">{response.role}</Badge>
                        </div>

                        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                          <p className="text-[11px] text-ink/35">
                            Submitted {response.submittedAt}
                          </p>

                          <span className="hidden h-1 w-1 rounded-full bg-ink/15 sm:block" />

                          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-ink/25">
                            {response.id}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex shrink-0 items-center">
                      {response.status === 'submitted' ? (
                        <Badge tone="teal">
                          <span className="inline-flex items-center gap-1.5">
                            <CheckCircle2 className="h-3 w-3" />
                            Submitted
                          </span>
                        </Badge>
                      ) : (
                        <Badge tone="amber">
                          <span className="inline-flex items-center gap-1.5">
                            <Clock3 className="h-3 w-3" />
                            Pending
                          </span>
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Statement */}
                  <div className="mt-5 rounded-[18px] border border-ink/[0.05] bg-paper-2 p-5">
                    <div className="mb-3 flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white">
                        <MessageSquare className="h-3.5 w-3.5 text-ink/45" />
                      </div>

                      <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-ink/30">
                        Party statement
                      </span>
                    </div>

                    <p className="max-w-4xl text-sm leading-7 text-ink/65">
                      {response.message}
                    </p>
                  </div>

                  {/* Evidence metadata */}
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <div className="inline-flex items-center gap-2 rounded-xl border border-ink/[0.06] bg-paper-2 px-3 py-2">
                      <FileText className="h-3.5 w-3.5 text-ink/40" />

                      <span className="text-[11px] font-medium text-ink/50">
                        {response.evidenceCount}{' '}
                        {response.evidenceCount === 1
                          ? 'supporting document'
                          : 'supporting documents'}
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-2 rounded-xl border border-ink/[0.06] bg-paper-2 px-3 py-2">
                      <ShieldCheck className="h-3.5 w-3.5 text-teal-700/70" />

                      <span className="text-[11px] font-medium text-ink/45">
                        Included in review record
                      </span>
                    </div>
                  </div>

                  {/* Thin divider / sequence */}
                  {index < responses.length - 1 && (
                    <div className="mt-5 border-t border-ink/[0.05] pt-4">
                      <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-ink/20">
                        Next party response recorded below
                      </span>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Submit response                                                  */}
        {/* ---------------------------------------------------------------- */}
        <section className="relative overflow-hidden rounded-[24px] border border-ink/[0.07] bg-paper-2 p-5 sm:p-6">
          <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full border border-ink/[0.035]" />

          <div className="relative">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink text-white shadow-[0_8px_18px_rgba(23,54,41,0.10)]">
                  <MessageSquare className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-ink/30">
                    New correspondence
                  </p>

                  <h3 className="mt-1 font-display text-lg font-semibold tracking-tight text-ink">
                    Submit a response
                  </h3>

                  <p className="mt-1 max-w-xl text-xs leading-5 text-ink/40">
                    Provide your statement, explanation or counter-evidence
                    for this dispute.
                  </p>
                </div>
              </div>

              <div className="hidden items-center gap-2 rounded-full border border-ink/[0.06] bg-white px-3 py-1.5 sm:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-[#B85C12]" />
                <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/35">
                  Secure submission
                </span>
              </div>
            </div>

            <div className="mt-5 rounded-[18px] border border-ink/[0.07] bg-white p-2 shadow-[0_8px_25px_rgba(0,0,0,0.025)]">
              <textarea
                rows={5}
                placeholder="Write your response..."
                className="w-full resize-none rounded-[14px] border-0 bg-transparent px-3 py-3 text-sm leading-6 text-ink outline-none placeholder:text-ink/25 focus:ring-0"
              />

              <div className="flex flex-col gap-3 border-t border-ink/[0.06] px-2 pt-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  className="inline-flex w-fit items-center gap-2 rounded-xl border border-ink/[0.08] bg-paper-2 px-4 py-2.5 text-xs font-semibold text-ink/60 transition-all hover:-translate-y-0.5 hover:bg-white hover:text-ink hover:shadow-sm"
                >
                  <Paperclip className="h-3.5 w-3.5" />
                  Attach evidence
                </button>

                <button
                  type="button"
                  className="inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-ink px-5 py-2.5 text-xs font-semibold text-white shadow-[0_8px_20px_rgba(23,54,41,0.12)] transition-all hover:-translate-y-0.5 hover:bg-ink/90 hover:shadow-[0_12px_24px_rgba(23,54,41,0.16)]"
                >
                  Submit response
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2 text-[10px] text-ink/30">
              <ShieldCheck className="h-3.5 w-3.5 text-ink/35" />
              Submitted responses are permanently associated with the dispute
              audit record.
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Audit protection                                                 */}
        {/* ---------------------------------------------------------------- */}
        <div className="relative overflow-hidden rounded-[20px] border border-ink/[0.07] bg-ink p-5 text-white">
          <div className="pointer-events-none absolute -right-10 -top-20 h-44 w-44 rounded-full border border-white/[0.06]" />

          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.07]">
              <ShieldCheck className="h-4 w-4 text-[#D58A52]" />
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-white/40">
                Dispute review protection
              </p>

              <p className="mt-1.5 text-sm font-semibold text-white/85">
                Every response remains part of the formal record.
              </p>

              <p className="mt-1 max-w-3xl text-xs leading-5 text-white/40">
                Submitted responses and evidence cannot be silently removed or
                altered. Changes and administrative actions are recorded in the
                dispute audit trail for review and accountability.
              </p>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}