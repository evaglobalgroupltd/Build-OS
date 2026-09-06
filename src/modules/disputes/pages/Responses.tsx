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
  return (
    <Card>
      <CardHeader
        title="Party responses"
        subtitle="Statements, explanations and counter-evidence submitted by dispute participants"
      />

      <CardBody className="space-y-6">
        {/* Response overview */}
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-line bg-paper-2 p-4">
            <div className="flex items-center gap-2 text-xs font-medium text-ink/45">
              <MessageSquare className="h-4 w-4" />
              Responses received
            </div>

            <p className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">
              2
            </p>

            <p className="mt-1 text-[11px] text-ink/35">
              Both parties responded
            </p>
          </div>

          <div className="rounded-2xl border border-line bg-paper-2 p-4">
            <div className="flex items-center gap-2 text-xs font-medium text-ink/45">
              <Paperclip className="h-4 w-4" />
              Evidence attached
            </div>

            <p className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">
              5
            </p>

            <p className="mt-1 text-[11px] text-ink/35">
              Supporting files submitted
            </p>
          </div>

          <div className="rounded-2xl border border-line bg-paper-2 p-4">
            <div className="flex items-center gap-2 text-xs font-medium text-ink/45">
              <Clock3 className="h-4 w-4" />
              Review status
            </div>

            <p className="mt-2 text-base font-semibold text-amber-700">
              Awaiting review
            </p>

            <p className="mt-1 text-[11px] text-ink/35">
              Admin assessment required
            </p>
          </div>
        </div>

        {/* Responses */}
        <section>
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-ink">
              Submitted responses
            </h3>

            <p className="mt-0.5 text-xs text-ink/40">
              All statements form part of the dispute audit trail.
            </p>
          </div>

          <div className="space-y-3">
            {responses.map((response) => (
              <article
                key={response.id}
                className="rounded-2xl border border-line bg-white p-5 transition-shadow hover:shadow-sm"
              >
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink text-xs font-bold text-white">
                    {response.initials}
                  </div>

                  <div className="min-w-0 flex-1">
                    {/* Header */}
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-sm font-semibold text-ink">
                            {response.party}
                          </h4>

                          <Badge tone="neutral">{response.role}</Badge>
                        </div>

                        <p className="mt-1 text-[11px] text-ink/40">
                          Submitted {response.submittedAt}
                        </p>
                      </div>

                      <Badge tone="teal">
                        <span className="inline-flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          Submitted
                        </span>
                      </Badge>
                    </div>

                    {/* Statement */}
                    <div className="mt-4 rounded-xl bg-paper-2 p-4">
                      <p className="text-sm leading-6 text-ink/65">
                        {response.message}
                      </p>
                    </div>

                    {/* Evidence */}
                    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-ink/45">
                      <span className="inline-flex items-center gap-1.5">
                        <FileText className="h-3.5 w-3.5" />
                        {response.evidenceCount} supporting{' '}
                        {response.evidenceCount === 1
                          ? 'document'
                          : 'documents'}
                      </span>

                      <span className="inline-flex items-center gap-1.5">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        Included in review record
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Submit response */}
        <section className="rounded-2xl border border-line bg-paper-2 p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white">
              <MessageSquare className="h-4 w-4 text-ink/60" />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-ink">
                Submit a response
              </h3>

              <p className="mt-1 text-xs leading-5 text-ink/40">
                Provide your statement, explanation or counter-evidence for
                this dispute.
              </p>
            </div>
          </div>

          <textarea
            rows={5}
            placeholder="Write your response..."
            className="mt-4 w-full resize-none rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-ink/30 focus:border-ink/30 focus:ring-2 focus:ring-ink/5"
          />

          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              className="inline-flex w-fit items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-xs font-semibold text-ink/65 transition hover:bg-ink/[0.02]"
            >
              <Paperclip className="h-3.5 w-3.5" />
              Attach evidence
            </button>

            <button
              type="button"
              className="inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-ink/90"
            >
              <Send className="h-3.5 w-3.5" />
              Submit response
            </button>
          </div>
        </section>

        {/* Workflow note */}
        <div className="flex items-start gap-3 rounded-xl border border-line bg-white p-4">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-ink/45" />

          <div>
            <p className="text-xs font-semibold text-ink">
              Dispute review protection
            </p>

            <p className="mt-1 text-xs leading-5 text-ink/40">
              Submitted responses and evidence cannot be silently removed or
              altered. Changes and administrative actions are recorded in the
              dispute audit trail.
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}