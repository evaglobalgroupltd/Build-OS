import { useState, type ComponentType } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  Camera,
  Check,
  CheckCircle2,
  ClipboardCheck,
  FileImage,
  FileText,
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
  deliveryNote:
    'Delivered to the site store and received by the site team.',
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
  const variance = receivedQuantity - orderedQuantity
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

  const isPending = status === 'pending'

  return (
    <div className="space-y-7 pb-8">
      {/* ---------------------------------------------------------------- */}
      {/* Page introduction                                                */}
      {/* ---------------------------------------------------------------- */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/35">
              Delivery control
            </span>

            <span className="h-1 w-1 rounded-full bg-ink/20" />

            <span className="font-mono text-[10px] font-medium text-ink/35">
              {delivery.id}
            </span>
          </div>

          <h1 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-ink sm:text-3xl">
            Delivery verification
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/45">
            Review the delivered materials, supporting evidence and site
            condition before releasing the delivery for acceptance.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Badge
            tone={
              status === 'accepted'
                ? 'teal'
                : status === 'disputed'
                  ? 'amber'
                  : 'amber'
            }
          >
            <span className="inline-flex items-center gap-1.5">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  status === 'accepted'
                    ? 'bg-teal-600'
                    : status === 'disputed'
                      ? 'bg-amber-600'
                      : 'bg-amber-500'
                }`}
              />
              {status === 'pending'
                ? 'Awaiting verification'
                : status === 'accepted'
                  ? 'Accepted'
                  : 'Disputed'}
            </span>
          </Badge>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Delivery identity / hero                                         */}
      {/* ---------------------------------------------------------------- */}
      <Card className="overflow-hidden border-ink/[0.08] shadow-[0_16px_40px_rgba(20,40,30,0.055)]">
        <div className="relative overflow-hidden bg-ink px-5 py-6 text-white sm:px-7 sm:py-7">
          <div className="pointer-events-none absolute -right-20 -top-28 h-64 w-64 rounded-full bg-white/[0.05] blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-white/[0.035] blur-3xl" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex min-w-0 items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] border border-white/10 bg-white/[0.08]">
                <ClipboardCheck className="h-5 w-5 text-white/80" />
              </div>

              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
                  Incoming delivery
                </p>

                <h2 className="mt-1.5 text-lg font-semibold tracking-[-0.025em] text-white sm:text-xl">
                  {delivery.item}
                </h2>

                <p className="mt-1 text-xs text-white/45">
                  {delivery.specification}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3 lg:min-w-[430px]">
              <HeroMeta
                label="Request"
                value={delivery.requestId}
              />

              <HeroMeta
                label="Delivered"
                value={delivery.deliveredDate}
              />

              <HeroMeta
                label="Supplier"
                value={delivery.supplierName}
              />
            </div>
          </div>
        </div>

        <div className="border-t border-ink/[0.06] bg-white px-5 py-4 sm:px-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-2.5">
              <MapPin className="h-4 w-4 shrink-0 text-ink/30" />

              <div className="min-w-0">
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/30">
                  Delivery location
                </span>

                <span className="ml-2 text-xs font-medium text-ink">
                  {delivery.deliveryLocation}
                </span>
              </div>
            </div>

            {delivery.deliveryNote && (
              <p className="max-w-xl text-xs leading-5 text-ink/40 sm:text-right">
                {delivery.deliveryNote}
              </p>
            )}
          </div>
        </div>
      </Card>

      {/* ---------------------------------------------------------------- */}
      {/* Quantity + details                                               */}
      {/* ---------------------------------------------------------------- */}
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.65fr)_minmax(280px,0.75fr)]">
        <Card className="border-ink/[0.07] shadow-[0_12px_30px_rgba(20,40,30,0.045)]">
          <CardHeader
            title="Quantity reconciliation"
            subtitle="Compare the approved quantity against what physically arrived on site."
          />

          <CardBody>
            <div className="grid gap-3 sm:grid-cols-3">
              <QuantityCard
                label="Ordered"
                value={`${orderedQuantity.toLocaleString()} ${delivery.unit}`}
              />

              <QuantityCard
                label="Received"
                value={`${receivedQuantity.toLocaleString()} ${delivery.unit}`}
                tone={quantityMatches ? 'success' : 'warning'}
                icon={quantityMatches ? CheckCircle2 : AlertTriangle}
              />

              <QuantityCard
                label="Variance"
                value={`${variance > 0 ? '+' : ''}${variance.toLocaleString()} ${delivery.unit}`}
                tone={quantityMatches ? 'success' : 'warning'}
              />
            </div>

            <div className="mt-7 rounded-[18px] border border-ink/[0.07] bg-[#FBFCFB] p-4 sm:p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-ink/35">
                    Physical count
                  </p>

                  <p className="mt-1 text-sm font-semibold text-ink">
                    Confirm received quantity
                  </p>

                  <p className="mt-1 text-xs text-ink/40">
                    Enter the quantity physically verified by the receiving
                    team.
                  </p>
                </div>

                <div className="relative w-full sm:w-56">
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={deliveredQuantity}
                    onChange={(event) =>
                      setDeliveredQuantity(event.target.value)
                    }
                    aria-label="Received quantity"
                    className="h-11 w-full rounded-[13px] border border-ink/[0.09] bg-white px-3.5 pr-16 text-sm font-semibold text-ink shadow-[0_2px_8px_rgba(20,40,30,0.025)] outline-none transition-all placeholder:text-ink/25 hover:border-ink/[0.14] focus:border-ink/25 focus:ring-4 focus:ring-ink/[0.045]"
                  />

                  <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[11px] font-medium text-ink/35">
                    {delivery.unit}
                  </span>
                </div>
              </div>
            </div>

            {!quantityMatches && (
              <div className="mt-4 flex items-start gap-3 rounded-[16px] border border-amber-700/10 bg-[#F7EFE8] px-4 py-3.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-white/70">
                  <AlertTriangle className="h-4 w-4 text-amber-700" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-semibold text-ink">
                    Quantity variance requires review
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-ink/45">
                    The received quantity differs from the approved request.
                    Resolve or document the variance before accepting this
                    delivery.
                  </p>
                </div>
              </div>
            )}
          </CardBody>
        </Card>

        <Card className="border-ink/[0.07] shadow-[0_12px_30px_rgba(20,40,30,0.045)]">
          <CardHeader
            title="Delivery record"
            subtitle="Key information captured against this delivery."
          />

          <CardBody>
            <div className="space-y-1">
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

              <Detail
                icon={FileText}
                label="Request"
                value={delivery.requestId}
              />
            </div>
          </CardBody>
        </Card>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Evidence                                                         */}
      {/* ---------------------------------------------------------------- */}
      <Card className="overflow-hidden border-ink/[0.07] shadow-[0_12px_30px_rgba(20,40,30,0.045)]">
        <CardHeader
          title="Delivery evidence"
          subtitle="Review the supporting files submitted with this delivery."
          action={
            <span className="inline-flex items-center gap-1.5 rounded-full border border-ink/[0.07] bg-ink/[0.025] px-2.5 py-1 text-[10px] font-semibold text-ink/45">
              <FileText className="h-3 w-3" />
              {delivery.evidence.length} files
            </span>
          }
        />

        <div className="grid gap-3 px-5 pb-5 sm:grid-cols-2 lg:grid-cols-3 sm:px-6">
          {delivery.evidence.map((file, index) => (
            <EvidenceCard
              key={file.id}
              file={file}
              index={index}
            />
          ))}
        </div>
      </Card>

      {/* ---------------------------------------------------------------- */}
      {/* Assessment                                                       */}
      {/* ---------------------------------------------------------------- */}
      <Card className="border-ink/[0.07] shadow-[0_12px_30px_rgba(20,40,30,0.045)]">
        <CardHeader
          title="Verification assessment"
          subtitle="Record the physical condition and any observations before making a decision."
        />

        <CardBody>
          <div className="grid gap-7 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-ink">
                    Material condition
                  </p>

                  <p className="mt-1 text-[11px] text-ink/35">
                    Select the condition observed on site.
                  </p>
                </div>

                {condition && (
                  <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-teal-700">
                    Recorded
                  </span>
                )}
              </div>

              <div className="mt-4 grid gap-2.5">
                {[
                  {
                    value: 'acceptable',
                    label: 'Acceptable',
                    description: 'Meets expected delivery condition.',
                  },
                  {
                    value: 'minor-issue',
                    label: 'Minor issue',
                    description: 'Usable with a documented issue.',
                  },
                  {
                    value: 'damaged',
                    label: 'Damaged',
                    description: 'Material requires review or rejection.',
                  },
                ].map((option) => {
                  const selected = condition === option.value

                  return (
                    <label
                      key={option.value}
                      className={`group flex cursor-pointer items-center gap-3 rounded-[15px] border px-4 py-3.5 transition-all ${
                        selected
                          ? 'border-ink/20 bg-ink/[0.035] shadow-[0_5px_16px_rgba(20,40,30,0.04)]'
                          : 'border-ink/[0.07] bg-white hover:border-ink/[0.13] hover:bg-ink/[0.015]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="condition"
                        value={option.value}
                        checked={selected}
                        onChange={(event) =>
                          setCondition(event.target.value)
                        }
                        className="sr-only"
                      />

                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] border transition-colors ${
                          selected
                            ? 'border-ink bg-ink text-white'
                            : 'border-ink/[0.1] bg-ink/[0.025] text-transparent'
                        }`}
                      >
                        <Check className="h-3.5 w-3.5" />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block text-xs font-semibold text-ink">
                          {option.label}
                        </span>

                        <span className="mt-0.5 block text-[10px] leading-4 text-ink/35">
                          {option.description}
                        </span>
                      </span>
                    </label>
                  )
                })}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-ink">
                    Verification notes
                  </p>

                  <p className="mt-1 text-[11px] text-ink/35">
                    Capture shortages, damage or other relevant observations.
                  </p>
                </div>

                <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-ink/25">
                  Optional
                </span>
              </div>

              <textarea
                rows={7}
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Record observations, shortages, damage or other verification notes..."
                className="mt-4 w-full resize-none rounded-[15px] border border-ink/[0.09] bg-[#FBFCFB] px-4 py-3.5 text-sm leading-6 text-ink outline-none transition-all placeholder:text-ink/25 hover:border-ink/[0.14] focus:border-ink/25 focus:bg-white focus:ring-4 focus:ring-ink/[0.045]"
              />
            </div>
          </div>
        </CardBody>
      </Card>

      {/* ---------------------------------------------------------------- */}
      {/* Decision                                                         */}
      {/* ---------------------------------------------------------------- */}
      <Card className="overflow-hidden border-ink/[0.08] shadow-[0_16px_40px_rgba(20,40,30,0.055)]">
        <div className="border-b border-ink/[0.06] bg-[#FBFCFB] px-5 py-5 sm:px-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/35">
                Final control
              </p>

              <h3 className="mt-1 text-sm font-semibold text-ink">
                Verification decision
              </h3>

              <p className="mt-1 max-w-xl text-[11px] leading-5 text-ink/40">
                Accept only after the quantity, evidence and physical
                condition have been reviewed.
              </p>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-medium text-ink/35">
              <ShieldCheck className="h-3.5 w-3.5" />
              Controlled approval
            </div>
          </div>
        </div>

        <CardBody>
          {status !== 'pending' && (
            <div
              className={`mb-5 flex items-start gap-3 rounded-[16px] px-4 py-3.5 ${
                status === 'accepted'
                  ? 'bg-[#EAF4EE]'
                  : 'bg-[#F7EFE8]'
              }`}
            >
              {status === 'accepted' ? (
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-700" />
              ) : (
                <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
              )}

              <div>
                <p className="text-xs font-semibold text-ink">
                  {status === 'accepted'
                    ? 'Delivery accepted'
                    : 'Delivery disputed'}
                </p>

                <p className="mt-0.5 text-[11px] leading-5 text-ink/45">
                  {status === 'accepted'
                    ? 'The delivery has been marked as accepted pending persistence of the verification record.'
                    : 'The delivery has been marked for dispute and the affected payment line should remain frozen.'}
                </p>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-ink/[0.035]">
                <ClipboardCheck className="h-4 w-4 text-ink/45" />
              </div>

              <div>
                <p className="text-xs font-semibold text-ink">
                  Ready for decision
                </p>

                <p className="mt-1 max-w-lg text-[11px] leading-5 text-ink/40">
                  {quantityMatches && condition
                    ? 'All required verification inputs have been completed.'
                    : 'Complete the quantity and condition review before accepting this delivery.'}
                </p>
              </div>
            </div>

            <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row">
              <button
                type="button"
                onClick={handleDispute}
                disabled={!isPending}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-ink/[0.1] bg-white px-5 text-xs font-semibold text-ink/65 shadow-[0_3px_10px_rgba(20,40,30,0.025)] transition-all hover:-translate-y-0.5 hover:border-ink/[0.16] hover:bg-ink/[0.02] hover:text-ink focus:outline-none focus:ring-4 focus:ring-ink/[0.05] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <XCircle className="h-3.5 w-3.5" />
                Dispute delivery
              </button>

              <button
                type="button"
                onClick={handleAccept}
                disabled={
                  !isPending ||
                  !condition ||
                  !quantityMatches
                }
                className="group inline-flex h-11 items-center justify-center gap-2 rounded-full bg-ink px-5 text-xs font-semibold text-white shadow-[0_8px_20px_rgba(20,40,30,0.14)] transition-all hover:-translate-y-0.5 hover:bg-ink/90 focus:outline-none focus:ring-4 focus:ring-ink/[0.08] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                Accept delivery
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Supporting components                                                      */
/* -------------------------------------------------------------------------- */

function HeroMeta({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="min-w-0">
      <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/30">
        {label}
      </p>

      <p className="mt-1.5 truncate text-[11px] font-medium text-white/70">
        {value}
      </p>
    </div>
  )
}

function QuantityCard({
  label,
  value,
  tone = 'default',
  icon: Icon,
}: {
  label: string
  value: string
  tone?: 'default' | 'success' | 'warning'
  icon?: ComponentType<{ className?: string }>
}) {
  const toneClasses = {
    default: {
      wrapper: 'bg-ink/[0.025] border-ink/[0.06]',
      value: 'text-ink',
      icon: 'bg-ink/[0.045] text-ink/40',
    },
    success: {
      wrapper: 'bg-[#EAF4EE] border-teal-700/10',
      value: 'text-teal-700',
      icon: 'bg-white/60 text-teal-700',
    },
    warning: {
      wrapper: 'bg-[#F7EFE8] border-amber-700/10',
      value: 'text-amber-700',
      icon: 'bg-white/60 text-amber-700',
    },
  }

  const styles = toneClasses[tone]

  return (
    <div
      className={`rounded-[16px] border p-4 transition-all ${styles.wrapper}`}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-ink/35">
          {label}
        </p>

        {Icon && (
          <span
            className={`flex h-6 w-6 items-center justify-center rounded-[8px] ${styles.icon}`}
          >
            <Icon className="h-3.5 w-3.5" />
          </span>
        )}
      </div>

      <p className={`mt-3 text-sm font-semibold tracking-[-0.01em] ${styles.value}`}>
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
  icon: ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="flex items-start gap-3 rounded-[13px] px-1 py-2.5">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-ink/[0.035]">
        <Icon className="h-3.5 w-3.5 text-ink/35" />
      </span>

      <div className="min-w-0 pt-0.5">
        <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-ink/30">
          {label}
        </p>

        <p className="mt-1 truncate text-xs font-medium text-ink">
          {value}
        </p>
      </div>
    </div>
  )
}

function EvidenceCard({
  file,
  index,
}: {
  file: DeliveryForVerification['evidence'][number]
  index: number
}) {
  const isPhoto = file.type === 'photo'

  return (
    <div className="group rounded-[17px] border border-ink/[0.07] bg-white p-3.5 transition-all hover:-translate-y-0.5 hover:border-ink/[0.12] hover:shadow-[0_10px_24px_rgba(20,40,30,0.055)]">
      <div className="flex items-start gap-3">
        <div
          className={`relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[12px] ${
            isPhoto ? 'bg-[#F1F4F2]' : 'bg-ink/[0.035]'
          }`}
        >
          {isPhoto ? (
            <>
              <Camera className="h-4 w-4 text-ink/40" />

              <span className="absolute bottom-1 right-1 rounded-full bg-white/90 px-1.5 py-0.5 text-[8px] font-semibold text-ink/40 shadow-sm">
                IMG
              </span>
            </>
          ) : (
            <FileImage className="h-4 w-4 text-ink/40" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-ink">
                {file.name}
              </p>

              <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.13em] text-ink/30">
                {file.type}
              </p>
            </div>

            <span className="shrink-0 text-[9px] font-mono text-ink/25">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          <button
            type="button"
            className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-semibold text-ink/45 transition-colors hover:text-ink"
          >
            View evidence
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  )
}