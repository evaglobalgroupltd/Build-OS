import { useState } from 'react'
import {
  FileText,
  Package,
  Plus,
  Send,
  Trash2,
} from 'lucide-react'

import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

type MaterialLine = {
  id: number
  item: string
  specification: string
  quantity: string
  unit: string
}

const units = [
  'bags',
  'pieces',
  'tonnes',
  'm³',
  'litres',
  'rolls',
  'sheets',
  'sets',
]

export function CreateRequest() {
  const [lines, setLines] = useState<MaterialLine[]>([
    {
      id: 1,
      item: '',
      specification: '',
      quantity: '',
      unit: 'pieces',
    },
  ])

  const [projectId, setProjectId] = useState('')
  const [phase, setPhase] = useState('')
  const [boqReference, setBoqReference] = useState('')
  const [deliveryLocation, setDeliveryLocation] = useState('')
  const [requiredDate, setRequiredDate] = useState('')
  const [notes, setNotes] = useState('')

  function addLine() {
    setLines((current) => [
      ...current,
      {
        id: Date.now(),
        item: '',
        specification: '',
        quantity: '',
        unit: 'pieces',
      },
    ])
  }

  function removeLine(id: number) {
    setLines((current) =>
      current.length === 1
        ? current
        : current.filter((line) => line.id !== id),
    )
  }

  function updateLine(
    id: number,
    field: keyof Omit<MaterialLine, 'id'>,
    value: string,
  ) {
    setLines((current) =>
      current.map((line) =>
        line.id === id ? { ...line, [field]: value } : line,
      ),
    )
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const request = {
      projectId,
      phase,
      boqReference,
      deliveryLocation,
      requiredDate,
      notes,
      materials: lines,
    }

    console.log('Create material request:', request)

    // TODO: connect to procurement API/action.
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="overflow-hidden">
        <CardHeader
          title="Create material request"
          subtitle="Request materials against an approved project scope or BOQ."
        />

        <CardBody>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Project"
              required
              description="Select the project requiring these materials."
            >
              <select
                required
                value={projectId}
                onChange={(event) => setProjectId(event.target.value)}
                className={inputClass}
              >
                <option value="">Select project</option>
                <option value="project-001">
                  Gwarinpa Residential Development
                </option>
                <option value="project-002">
                  Maitama Duplex Construction
                </option>
              </select>
            </Field>

            <Field
              label="Project phase"
              required
              description="Link the request to the relevant construction phase."
            >
              <select
                required
                value={phase}
                onChange={(event) => setPhase(event.target.value)}
                className={inputClass}
              >
                <option value="">Select phase</option>
                <option value="foundation">Foundation</option>
                <option value="structure">Structure</option>
                <option value="roofing">Roofing</option>
                <option value="mep">MEP</option>
                <option value="finishing">Finishing</option>
                <option value="external-works">External works</option>
              </select>
            </Field>

            <Field
              label="BOQ reference"
              description="Optional reference to the approved BOQ item or scope."
            >
              <div className="relative">
                <FileText className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/30" />

                <input
                  value={boqReference}
                  onChange={(event) => setBoqReference(event.target.value)}
                  placeholder="e.g. BOQ-FND-014"
                  className={`${inputClass} pl-10`}
                />
              </div>
            </Field>

            <Field
              label="Required delivery date"
              required
              description="When the materials are required on site."
            >
              <input
                required
                type="date"
                value={requiredDate}
                onChange={(event) => setRequiredDate(event.target.value)}
                className={inputClass}
              />
            </Field>

            <Field
              label="Delivery location"
              required
              description="Site address or approved delivery point."
            >
              <input
                required
                value={deliveryLocation}
                onChange={(event) =>
                  setDeliveryLocation(event.target.value)
                }
                placeholder="Enter site delivery location"
                className={`${inputClass} sm:col-span-2`}
              />
            </Field>
          </div>
        </CardBody>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader
          title="Material requirements"
          subtitle="Add each material, specification and required quantity."
          action={
            <Badge tone="amber">
              {lines.length} {lines.length === 1 ? 'item' : 'items'}
            </Badge>
          }
        />

        <div className="divide-y divide-line">
          {lines.map((line, index) => (
            <div key={line.id} className="p-6">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink/5">
                    <Package className="h-4 w-4 text-ink/50" />
                  </div>

                  <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                    Material {index + 1}
                  </p>
                </div>

                {lines.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeLine(line.id)}
                    className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-ink/40 transition-colors hover:bg-rose-500/5 hover:text-rose-600"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Remove
                  </button>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Field label="Material" required>
                  <input
                    required
                    value={line.item}
                    onChange={(event) =>
                      updateLine(line.id, 'item', event.target.value)
                    }
                    placeholder="e.g. Portland cement"
                    className={inputClass}
                  />
                </Field>

                <Field label="Specification" required>
                  <input
                    required
                    value={line.specification}
                    onChange={(event) =>
                      updateLine(
                        line.id,
                        'specification',
                        event.target.value,
                      )
                    }
                    placeholder="Grade / size / specification"
                    className={inputClass}
                  />
                </Field>

                <Field label="Quantity" required>
                  <input
                    required
                    type="number"
                    min="0"
                    step="any"
                    value={line.quantity}
                    onChange={(event) =>
                      updateLine(line.id, 'quantity', event.target.value)
                    }
                    placeholder="0"
                    className={inputClass}
                  />
                </Field>

                <Field label="Unit" required>
                  <select
                    required
                    value={line.unit}
                    onChange={(event) =>
                      updateLine(line.id, 'unit', event.target.value)
                    }
                    className={inputClass}
                  >
                    {units.map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-line px-6 py-4">
          <button
            type="button"
            onClick={addLine}
            className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-xs font-semibold text-ink transition-colors hover:bg-ink/[0.03]"
          >
            <Plus className="h-3.5 w-3.5" />
            Add material
          </button>
        </div>
      </Card>

      <Card>
        <CardHeader
          title="Additional instructions"
          subtitle="Provide delivery or procurement notes for the reviewing team."
        />

        <CardBody>
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            rows={4}
            placeholder="Add any relevant delivery instructions, quality requirements or site notes..."
            className={`${inputClass} resize-none`}
          />
        </CardBody>
      </Card>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          className="rounded-xl border border-line bg-white px-5 py-2.5 text-xs font-semibold text-ink transition-colors hover:bg-ink/[0.03]"
        >
          Save draft
        </button>

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-5 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
        >
          Submit request
          <Send className="h-3.5 w-3.5" />
        </button>
      </div>
    </form>
  )
}

function Field({
  label,
  description,
  required,
  children,
}: {
  label: string
  description?: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-ink">
        {label}
        {required && <span className="ml-1 text-rose-600">*</span>}
      </span>

      {description && (
        <span className="mt-1 block text-[11px] leading-4 text-ink/35">
          {description}
        </span>
      )}

      <div className="mt-2">{children}</div>
    </label>
  )
}

const inputClass =
  'w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-ink/25 focus:border-ink/30 focus:ring-2 focus:ring-ink/5'