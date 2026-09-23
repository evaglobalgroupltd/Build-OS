
import {
  CheckCircle2,
  FileCheck2,
  FileText,
  Image as ImageIcon,
  LockKeyhole,
  Paperclip,
  Plus,
  ShieldCheck,
  UploadCloud,
  Video,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

interface EvidenceItem {
  id: string
  name: string
  type: 'document' | 'image' | 'video'
  category: string
  submittedBy: string
  submittedAt: string
  size: string
  verified: boolean
}

const evidence: EvidenceItem[] = [
  {
    id: 'EV-001',
    name: 'Site inspection report.pdf',
    type: 'document',
    category: 'Inspection Report',
    submittedBy: 'Project Manager',
    submittedAt: '27 Aug 2026, 09:42',
    size: '2.4 MB',
    verified: true,
  },
  {
    id: 'EV-002',
    name: 'Material delivery condition.jpg',
    type: 'image',
    category: 'Delivery Evidence',
    submittedBy: 'Contractor',
    submittedAt: '27 Aug 2026, 10:18',
    size: '1.8 MB',
    verified: true,
  },
  {
    id: 'EV-003',
    name: 'Payment correspondence.pdf',
    type: 'document',
    category: 'Payment Record',
    submittedBy: 'Client',
    submittedAt: '27 Aug 2026, 11:05',
    size: '684 KB',
    verified: false,
  },
]

const evidenceTypeIcon = {
  document: FileText,
  image: ImageIcon,
  video: Video,
}

function EvidenceIcon({ type }: { type: EvidenceItem['type'] }) {
  const Icon = evidenceTypeIcon[type]

  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-[#173629] shadow-sm">
      <Icon className="h-[18px] w-[18px] text-white" />
    </div>
  )
}

function getEvidenceTypeLabel(type: EvidenceItem['type']) {
  switch (type) {
    case 'document':
      return 'Document'
    case 'image':
      return 'Image'
    case 'video':
      return 'Video'
  }
}

export function Evidence() {
  const verifiedCount = evidence.filter((item) => item.verified).length
  const pendingCount = evidence.length - verifiedCount

  return (
    <div className="space-y-7">
      {/* ------------------------------------------------------------------ */}
      {/* Header / command area                                               */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden rounded-[28px] bg-[#173629] px-6 py-7 text-white shadow-[0_24px_70px_rgba(23,54,41,0.15)] sm:px-8 sm:py-8">
        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full border border-white/[0.06]" />
        <div className="pointer-events-none absolute -right-4 -top-8 h-40 w-40 rounded-full border border-white/[0.05]" />
        <div className="pointer-events-none absolute -bottom-28 left-1/3 h-56 w-56 rounded-full bg-[#B85C12]/10 blur-3xl" />

        <div className="relative">
          <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D58A52]" />
            Dispute resolution
          </div>

          <div className="mt-3 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-[14px] border border-white/10 bg-white/[0.07]">
                  <FileCheck2 className="h-[19px] w-[19px] text-[#D58A52]" />
                </div>

                <h1 className="font-display text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl">
                  Evidence vault
                </h1>
              </div>

              <p className="mt-4 max-w-xl text-sm leading-6 text-white/55">
                Review, submit and track supporting records associated with a
                dispute. Every submission remains connected to the formal
                audit trail.
              </p>
            </div>

            <div className="flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/65 backdrop-blur-sm">
              <ShieldCheck className="h-3.5 w-3.5 text-[#D58A52]" />
              Evidence protected
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/[0.08] pt-5 text-[10px] font-medium uppercase tracking-[0.12em] text-white/35">
            <span>{evidence.length} records submitted</span>
            <span>{verifiedCount} verified</span>
            <span>{pendingCount} awaiting review</span>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Summary metrics                                                     */}
      {/* ------------------------------------------------------------------ */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="group rounded-[20px] border-ink/[0.07] bg-white p-5 shadow-[0_10px_35px_rgba(0,0,0,0.035)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(0,0,0,0.06)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-ink/35">
                Total evidence
              </p>

              <p className="mt-2 font-display text-[30px] font-semibold leading-none tracking-[-0.035em] text-ink">
                {evidence.length}
              </p>

              <p className="mt-2 text-xs text-ink/40">
                Submitted to this dispute
              </p>
            </div>

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-ink/[0.045]">
              <Paperclip className="h-[18px] w-[18px] text-ink/55" />
            </div>
          </div>

          <div className="mt-5 h-1 overflow-hidden rounded-full bg-paper-2">
            <div className="h-full w-full rounded-full bg-ink/25" />
          </div>
        </Card>

        <Card className="group rounded-[20px] border-ink/[0.07] bg-white p-5 shadow-[0_10px_35px_rgba(0,0,0,0.035)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(0,0,0,0.06)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-ink/35">
                Verified
              </p>

              <p className="mt-2 font-display text-[30px] font-semibold leading-none tracking-[-0.035em] text-ink">
                {verifiedCount}
              </p>

              <p className="mt-2 text-xs text-ink/40">
                Evidence accepted for review
              </p>
            </div>

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-[#EDF5EF]">
              <CheckCircle2 className="h-[18px] w-[18px] text-[#3F775B]" />
            </div>
          </div>

          <div className="mt-5 h-1 overflow-hidden rounded-full bg-paper-2">
            <div
              className="h-full rounded-full bg-[#3F775B]"
              style={{
                width: `${(verifiedCount / Math.max(evidence.length, 1)) * 100}%`,
              }}
            />
          </div>
        </Card>

        <Card className="group rounded-[20px] border-ink/[0.07] bg-white p-5 shadow-[0_10px_35px_rgba(0,0,0,0.035)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(0,0,0,0.06)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-ink/35">
                Review status
              </p>

              <p className="mt-2 font-display text-[25px] font-semibold leading-none tracking-[-0.03em] text-ink">
                In review
              </p>

              <p className="mt-2 text-xs text-ink/40">
                Administrative review is active
              </p>
            </div>

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-[#F7EFE8]">
              <LockKeyhole className="h-[18px] w-[18px] text-[#B85C12]" />
            </div>
          </div>

          <div className="mt-5 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B85C12]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/35">
              Audit trail active
            </span>
          </div>
        </Card>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Upload evidence                                                     */}
      {/* ------------------------------------------------------------------ */}
      <Card className="overflow-hidden rounded-[24px] border-ink/[0.07] bg-white shadow-[0_14px_45px_rgba(0,0,0,0.04)]">
        <CardHeader
          title="Submit evidence"
          subtitle="Upload documents, images, videos or other supporting records"
        />

        <CardBody>
          <div className="group relative overflow-hidden rounded-[20px] border border-dashed border-ink/[0.12] bg-paper-2 px-6 py-10 text-center transition-all duration-300 hover:border-[#B85C12]/30 hover:bg-[#F7EFE8]/50">
            <div className="pointer-events-none absolute -right-16 -top-20 h-40 w-40 rounded-full bg-[#B85C12]/[0.04] blur-2xl" />

            <div className="relative">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[18px] bg-[#173629] shadow-[0_10px_25px_rgba(23,54,41,0.14)] transition-transform duration-300 group-hover:-translate-y-1">
                <UploadCloud className="h-6 w-6 text-white" />
              </div>

              <div className="mx-auto mt-5 max-w-lg">
                <div className="flex items-center justify-center gap-2">
                  <span className="h-px w-8 bg-ink/10" />

                  <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-ink/30">
                    Secure submission
                  </span>

                  <span className="h-px w-8 bg-ink/10" />
                </div>

                <h3 className="mt-3 font-display text-base font-semibold tracking-[-0.01em] text-ink">
                  Add supporting evidence
                </h3>

                <p className="mt-2 text-xs leading-5 text-ink/45">
                  Upload clear evidence relevant to the dispute. Files should
                  directly support the claim, response or requested resolution.
                </p>
              </div>

              <button
                type="button"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#173629] px-5 py-3 text-xs font-semibold text-white shadow-[0_8px_20px_rgba(23,54,41,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#204736] hover:shadow-[0_12px_25px_rgba(23,54,41,0.18)]"
              >
                <Plus className="h-4 w-4" />
                Upload evidence
              </button>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                {['Documents', 'Images', 'Videos', 'Delivery records', 'Reports'].map(
                  (item) => (
                    <span
                      key={item}
                      className="rounded-full border border-ink/[0.07] bg-white/70 px-2.5 py-1 text-[9px] font-medium text-ink/40"
                    >
                      {item}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* Evidence register                                                   */}
      {/* ------------------------------------------------------------------ */}
      <Card className="overflow-hidden rounded-[24px] border-ink/[0.07] bg-white shadow-[0_14px_45px_rgba(0,0,0,0.04)]">
        <CardHeader
          title="Evidence register"
          subtitle="Evidence associated with this dispute and its review history"
        />

        <CardBody className="space-y-3">
          {evidence.map((item, index) => (
            <article
              key={item.id}
              className="group relative overflow-hidden rounded-[20px] border border-ink/[0.07] bg-paper-2/60 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/[0.13] hover:bg-white hover:shadow-[0_16px_40px_rgba(0,0,0,0.05)] sm:p-5"
            >
              <div
                className={`absolute inset-y-0 left-0 w-1 ${
                  item.verified ? 'bg-[#3F775B]' : 'bg-[#B85C12]'
                }`}
              />

              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex min-w-0 items-start gap-3.5">
                  <EvidenceIcon type={item.type} />

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="min-w-0 truncate text-sm font-semibold tracking-[-0.01em] text-ink">
                        {item.name}
                      </p>

                      {item.verified ? (
                        <Badge tone="teal">
                          <span className="inline-flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            Verified
                          </span>
                        </Badge>
                      ) : (
                        <Badge tone="amber">Pending review</Badge>
                      )}
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-ink/[0.045] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-ink/40">
                        {getEvidenceTypeLabel(item.type)}
                      </span>

                      <span className="text-[10px] text-ink/30">•</span>

                      <span className="text-[11px] text-ink/40">
                        {item.category}
                      </span>

                      <span className="text-[10px] text-ink/30">•</span>

                      <span className="font-mono text-[10px] text-ink/35">
                        {item.size}
                      </span>
                    </div>

                    <div className="mt-2 flex items-center gap-2 text-[10px] text-ink/35">
                      <span className="h-1 w-1 rounded-full bg-ink/20" />
                      <span>Submitted by {item.submittedBy}</span>
                    </div>
                  </div>
                </div>

                <div className="flex shrink-0 items-center justify-between gap-5 border-t border-ink/[0.06] pt-4 lg:border-0 lg:pt-0">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/30">
                      Submitted
                    </p>

                    <p className="mt-1 text-xs font-medium text-ink/60">
                      {item.submittedAt}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-xl border border-ink/[0.08] bg-white px-3.5 py-2.5 text-xs font-semibold text-ink/55 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/15 hover:bg-ink hover:text-white hover:shadow-md"
                  >
                    View
                    <span className="text-[10px] opacity-50">↗</span>
                  </button>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-ink/[0.055] pt-3">
                <span className="font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-ink/25">
                  Record {String(index + 1).padStart(2, '0')}
                </span>

                <span
                  className={`text-[9px] font-semibold uppercase tracking-[0.12em] ${
                    item.verified ? 'text-[#3F775B]' : 'text-[#B85C12]'
                  }`}
                >
                  {item.verified ? 'Review accepted' : 'Awaiting verification'}
                </span>
              </div>
            </article>
          ))}
        </CardBody>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* Protection notice                                                   */}
      {/* ------------------------------------------------------------------ */}
      <div className="relative overflow-hidden rounded-[20px] border border-ink/[0.07] bg-[#173629] p-5 text-white shadow-[0_14px_40px_rgba(23,54,41,0.09)] sm:p-6">
        <div className="pointer-events-none absolute -right-12 -top-16 h-36 w-36 rounded-full border border-white/[0.05]" />

        <div className="relative flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] border border-white/10 bg-white/[0.07]">
            <ShieldCheck className="h-[18px] w-[18px] text-[#D58A52]" />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-semibold text-white">
              Evidence and audit protection
            </p>

            <p className="mt-1.5 max-w-3xl text-xs leading-5 text-white/50">
              Submitted evidence is associated with the dispute record and
              cannot be silently removed from the audit trail. Review,
              verification and resolution actions should remain traceable.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/[0.08] bg-white/[0.05] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-white/40">
                Audit retained
              </span>

              <span className="rounded-full border border-white/[0.08] bg-white/[0.05] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-white/40">
                Review traceable
              </span>

              <span className="rounded-full border border-white/[0.08] bg-white/[0.05] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-white/40">
                Protected record
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}