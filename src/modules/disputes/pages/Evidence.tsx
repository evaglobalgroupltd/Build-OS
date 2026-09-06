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
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink/5">
      <Icon className="h-5 w-5 text-ink/55" />
    </div>
  )
}

export function Evidence() {
  const verifiedCount = evidence.filter((item) => item.verified).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/5">
              <FileCheck2 className="h-5 w-5 text-ink/65" />
            </div>

            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/40">
              Dispute Resolution
            </span>
          </div>

          <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Evidence
          </h1>

          <p className="mt-1 max-w-2xl text-sm leading-6 text-ink/50">
            Review, submit and track supporting evidence associated with a
            dispute. All submissions are retained as part of the dispute
            audit trail.
          </p>
        </div>

        <Badge tone="teal">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5" />
            Evidence protected
          </span>
        </Badge>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/40">
                Total evidence
              </p>

              <p className="mt-2 font-display text-2xl font-semibold text-ink">
                {evidence.length}
              </p>

              <p className="mt-1 text-xs text-ink/40">
                Submitted to this dispute
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink/5">
              <Paperclip className="h-5 w-5 text-ink/55" />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/40">
                Verified
              </p>

              <p className="mt-2 font-display text-2xl font-semibold text-ink">
                {verifiedCount}
              </p>

              <p className="mt-1 text-xs text-ink/40">
                Evidence accepted for review
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
              <CheckCircle2 className="h-5 w-5 text-emerald-700" />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/40">
                Review status
              </p>

              <p className="mt-2 font-display text-2xl font-semibold text-ink">
                In review
              </p>

              <p className="mt-1 text-xs text-ink/40">
                Administrative review is active
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10">
              <LockKeyhole className="h-5 w-5 text-amber-700" />
            </div>
          </div>
        </Card>
      </div>

      {/* Upload area */}
      <Card className="overflow-hidden">
        <CardHeader
          title="Submit evidence"
          subtitle="Upload documents, images, videos or other supporting records"
        />

        <CardBody>
          <div className="rounded-2xl border border-dashed border-ink/15 bg-paper-2 p-8 text-center transition-colors hover:border-ink/25 hover:bg-ink/[0.015]">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-ink/5">
              <UploadCloud className="h-6 w-6 text-ink/55" />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-ink">
              Add supporting evidence
            </h3>

            <p className="mx-auto mt-1 max-w-md text-xs leading-5 text-ink/45">
              Upload clear evidence relevant to the dispute. Files should
              directly support the claim, response or requested resolution.
            </p>

            <button
              type="button"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-ink/90"
            >
              <Plus className="h-4 w-4" />
              Upload evidence
            </button>

            <p className="mt-3 text-[10px] text-ink/35">
              Documents · Images · Videos · Delivery records · Reports
            </p>
          </div>
        </CardBody>
      </Card>

      {/* Evidence list */}
      <Card className="overflow-hidden">
        <CardHeader
          title="Submitted evidence"
          subtitle="Evidence associated with this dispute and its review history"
        />

        <CardBody className="space-y-3">
          {evidence.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl border border-line bg-white p-4 transition-all duration-200 hover:border-ink/15 hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-3">
                  <EvidenceIcon type={item.type} />

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="truncate text-sm font-semibold text-ink">
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

                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-ink/40">
                      <span>{item.category}</span>
                      <span>•</span>
                      <span>{item.size}</span>
                      <span>•</span>
                      <span>{item.submittedBy}</span>
                    </div>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-4 sm:text-right">
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-ink/30">
                      Submitted
                    </p>

                    <p className="mt-1 text-xs font-medium text-ink/60">
                      {item.submittedAt}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="rounded-lg border border-line px-3 py-2 text-xs font-semibold text-ink/60 transition-colors hover:bg-ink/5 hover:text-ink"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </CardBody>
      </Card>

      {/* Evidence policy */}
      <div className="flex gap-3 rounded-2xl border border-line bg-paper-2 p-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink/5">
          <ShieldCheck className="h-4 w-4 text-ink/55" />
        </div>

        <div>
          <p className="text-xs font-semibold text-ink">
            Evidence and audit protection
          </p>

          <p className="mt-1 text-xs leading-5 text-ink/45">
            Submitted evidence is associated with the dispute record and
            cannot be silently removed from the audit trail. Review,
            verification and resolution actions should remain traceable.
          </p>
        </div>
      </div>
    </div>
  )
}