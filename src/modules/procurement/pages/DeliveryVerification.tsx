import { useState } from 'react'
import {
  AlertTriangle,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  FileImage,
  MapPin,
  Package,
  ShieldCheck,
  XCircle,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

type VerificationStatus = 'pending' | 'accepted' | 'disputed'

type DeliveryForVerification = {
  id: string
  requestId: string
  item: string
  specification: string
  orderedQuantity: number
  deliveredQuantity: number
  unit: string
  supplierName: string
  projectName: string
  deliveryLocation: string
  deliveredDate: string
  deliveryNote?: string
  evidence: {
    id: string
    name: string
    type: 'photo' | 'document'
  }[]
}

const delivery: DeliveryForVerification = {
  id: 'DEL-002',
  requestId: 'MR-014',
  item: 'High Yield Reinforcement Bar',
  specification: '12mm High Tensile Steel Bar',
  orderedQuantity: 2000,
  deliveredQuantity: 2000,
  unit: 'kg',
  supplierName: 'Prime Build Materials Ltd.',
  projectName: 'Maitama Duplex Construction',
  deliveryLocation: 'Maitama, Abuja',
  deliveredDate: 'Aug 30, 2026',
  deliveryNote: 'Delivered to the site store and received by the site team.',
  evidence: [
    {
      id: 'EV-001',
      name: 'delivery-note-002.pdf',
      type: 'document',
    },
    {
      id: 'EV-002',
      name: 'site-delivery-01.jpg',
      type: 'photo',
    },
    {
      id: 'EV-003',
      name: 'site-delivery-02.jpg',
      type: 'photo',
    },
  ],
}

export function DeliveryVerification() {
  const [deliveredQuantity, setDeliveredQuantity] = useState(
    String(delivery.deliveredQuantity),
  )
  const [condition, setCondition] = useState('')
  const [notes, setNotes] = useState('')
  const [status, setStatus] = useState<VerificationStatus>('pending')

  const orderedQuantity = delivery.orderedQuantity
  const receivedQuantity = Number(deliveredQuantity) || 0
  const quantityMatches = receivedQuantity === orderedQuantity

  function handleAccept() {
    setStatus('accepted')

    // TODO: persist verification.
    // Include quantity, condition, notes and verifier identity.
  }

  function handleDispute() {
    setStatus('disputed')

    // TODO: persist dispute and freeze the affected payment line.
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardBody>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex min-w-0 items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink/5">
                <ClipboardCheck className="h-5 w-5 text-ink/55" />
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-base font-semibold text-ink">
                    Delivery verification
                  </h1>

                  <Badge
                    tone={
                      status === 'accepted'
                        ? 'teal'
                        : status === 'disputed'
                          ? 'amber'
                          : 'amber'
                    }
                  >
                    {status === 'pending'
                      ? 'Awaiting verification'
                      : status === 'accepted'
                        ? 'Accepted'
                        : 'Disputed'}
                  </Badge>
                </div>

                <p className="mt-1 text-xs text-ink/45">
                  Verify the delivered materials against request {delivery.requestId}.
                </p>
              </div>
            </div>

            <div className="text-left lg:text-right">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                Delivery
              </p>

              <p className="mt-1 font-mono text-xs text-ink/55">
                {delivery.id}
              </p>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Delivery summary */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Material received"
            subtitle="Compare the delivered quantity and condition with the approved request."
          />

          <CardBody>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink/5">
                <Package className="h-4 w-4 text-ink/50" />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold text-ink">
                  {delivery.item}
                </p>

                <p className="mt-1 text-xs text-ink/45">
                  {delivery.specification}
                </p>

                <p className="mt-2 text-xs text-ink/40">
                  Supplier: {delivery.supplierName}
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <QuantityCard
                label="Ordered"
                value={`${orderedQuantity.toLocaleString()} ${delivery.unit}`}
              />

              <QuantityCard
                label="Delivered"
                value={`${receivedQuantity.toLocaleString()} ${delivery.unit}`}
                tone={quantityMatches ? 'success' : 'warning'}
              />

              <QuantityCard
                label="Variance"
                value={`${(receivedQuantity - orderedQuantity).toLocaleString()} ${delivery.unit}`}
                tone={quantityMatches ? 'success' : 'warning'}
              />
            </div>

            <div className="mt-6">
              <label className="block">
                <span className="text-xs font-semibold text-ink">
                  Confirm received quantity
                </span>

                <div className="relative mt-2">
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={deliveredQuantity}
                    onChange={(event) =>
                      setDeliveredQuantity(event.target.value)
                    }
                    className="w-full rounded-xl border border-line bg-white px-3 py-2.5 pr-16 text-sm text-ink outline-none focus:border-ink/30 focus:ring-2 focus:ring-ink/5"
                  />

                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ink/35">
                    {delivery.unit}
                  </span>
                </div>
              </label>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Delivery details"
            subtitle="Recorded against the delivery."
          />

          <CardBody>
            <Detail
              icon={MapPin}
              label="Location"
              value={delivery.deliveryLocation}
            />

            <Detail
              icon={Package}
              label="Delivered"
              value={delivery.deliveredDate}
            />

            <Detail
              icon={ShieldCheck}
              label="Supplier"
              value={delivery.supplierName}
            />
          </CardBody>
        </Card>
      </div>

      {/* Evidence */}
      <Card className="overflow-hidden">
        <CardHeader
          title="Delivery evidence"
          subtitle="Review the evidence uploaded for this delivery."
          action={
            <Badge tone="teal">
              {delivery.evidence.length} files
            </Badge>
          }
        />

        <div className="divide-y divide-line">
          {delivery.evidence.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between gap-4 px-6 py-4"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink/5">
                  {file.type === 'photo' ? (
                    <Camera className="h-4 w-4 text-ink/45" />
                  ) : (
                    <FileImage className="h-4 w-4 text-ink/45" />
                  )}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-xs font-medium text-ink">
                    {file.name}
                  </p>

                  <p className="mt-0.5 text-[10px] uppercase tracking-wide text-ink/30">
                    {file.type}
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="rounded-lg px-3 py-1.5 text-[11px] font-semibold text-ink/55 hover:bg-ink/5 hover:text-ink"
              >
                View
              </button>
            </div>
          ))}
        </div>
      </Card>

      {/* Condition */}
      <Card>
        <CardHeader
          title="Verification assessment"
          subtitle="Record whether the materials meet the delivery requirements."
        />

        <CardBody>
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold text-ink">
                Material condition
              </p>

              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {[
                  { value: 'acceptable', label: 'Acceptable' },
                  { value: 'minor-issue', label: 'Minor issue' },
                  { value: 'damaged', label: 'Damaged' },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`cursor-pointer rounded-xl border px-3 py-3 text-center text-xs font-medium transition-colors ${
                      condition === option.value
                        ? 'border-ink bg-ink/[0.03] text-ink'
                        : 'border-line text-ink/45 hover:bg-ink/[0.02]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="condition"
                      value={option.value}
                      checked={condition === option.value}
                      onChange={(event) => setCondition(event.target.value)}
                      className="sr-only"
                    />

                    {option.label}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block">
                <span className="text-xs font-semibold text-ink">
                  Verification notes
                </span>

                <textarea
                  rows={4}
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder="Record observations, shortages, damage or other verification notes..."
                  className="mt-2 w-full resize-none rounded-xl border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none placeholder:text-ink/25 focus:border-ink/30 focus:ring-2 focus:ring-ink/5"
                />
              </label>
            </div>
          </div>

          {!quantityMatches && (
            <div className="mt-5 flex items-start gap-3 rounded-xl bg-amber-500/5 px-4 py-3">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />

              <div>
                <p className="text-xs font-semibold text-ink">
                  Quantity variance detected
                </p>

                <p className="mt-0.5 text-[11px] leading-4 text-ink/45">
                  The delivered quantity does not match the ordered quantity.
                  Review the variance before accepting this delivery.
                </p>
              </div>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Actions */}
      <Card>
        <CardBody>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold text-ink">
                Verification decision
              </p>

              <p className="mt-1 text-[11px] leading-4 text-ink/40">
                Accept only when the delivered materials and evidence have
                been reviewed.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={handleDispute}
                disabled={status !== 'pending'}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-line px-4 py-2.5 text-xs font-semibold text-ink/65 transition-colors hover:bg-ink/[0.03] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <XCircle className="h-3.5 w-3.5" />
                Dispute delivery
              </button>

              <button
                type="button"
                onClick={handleAccept}
                disabled={
                  status !== 'pending' ||
                  !condition ||
                  !quantityMatches
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                Accept delivery
              </button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

function QuantityCard({
  label,
  value,
  tone = 'default',
}: {
  label: string
  value: string
  tone?: 'default' | 'success' | 'warning'
}) {
  return (
    <div className="rounded-xl bg-ink/[0.03] p-4">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
        {label}
      </p>

      <p
        className={`mt-1 text-sm font-semibold ${
          tone === 'success'
            ? 'text-teal-700'
            : tone === 'warning'
              ? 'text-amber-700'
              : 'text-ink'
        }`}
      >
        {value}
      </p>
    </div>
  )
}

function Detail({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="flex items-start gap-3 py-2">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-ink/35" />

      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/30">
          {label}
        </p>

        <p className="mt-1 text-xs font-medium text-ink">{value}</p>
      </div>
    </div>
  )
}