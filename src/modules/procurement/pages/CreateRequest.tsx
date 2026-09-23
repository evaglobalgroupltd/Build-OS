import { useState } from 'react'
import {
  CalendarDays,
  ChevronDown,
  FileText,
  MapPin,
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
    <form onSubmit={handleSubmit} className="space-y-7">
      {/* ===================================================== */}
      {/* Page introduction */}
      {/* ===================================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B85C12]" />

            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/40">
              Procurement request
            </p>
          </div>

          <h1 className="font-display text-[27px] font-semibold leading-tight tracking-[-0.035em] text-ink sm:text-[31px]">
            Create material request
          </h1>

          <p className="mt-1.5 max-w-2xl text-[12px] leading-5 text-ink/45">
            Define the materials required for an approved project scope and
            route the request through procurement review.
          </p>
        </div>

        <div className="hidden items-center gap-2 rounded-full border border-ink/[0.07] bg-white px-3 py-2 sm:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-[#12613E]" />

          <span className="text-[10px] font-semibold text-ink/55">
            Draft request
          </span>
        </div>
      </div>

      {/* ===================================================== */}
      {/* Project context */}
      {/* ===================================================== */}

      <Card className="overflow-hidden">
        <CardHeader
          title="Project context"
          subtitle="Identify where these materials are required and connect the request to the approved scope."
        />

        <CardBody className="p-5 sm:p-6">
          <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2">
            <Field
              label="Project"
              required
              description="Select the project requiring these materials."
            >
              <SelectField
                value={projectId}
                onChange={setProjectId}
                placeholder="Select project"
              >
                <option value="project-001">
                  Gwarinpa Residential Development
                </option>
                <option value="project-002">
                  Maitama Duplex Construction
                </option>
              </SelectField>
            </Field>

            <Field
              label="Project phase"
              required
              description="Link the request to the relevant construction phase."
            >
              <SelectField
                value={phase}
                onChange={setPhase}
                placeholder="Select phase"
              >
                <option value="foundation">Foundation</option>
                <option value="structure">Structure</option>
                <option value="roofing">Roofing</option>
                <option value="mep">MEP</option>
                <option value="finishing">Finishing</option>
                <option value="external-works">External works</option>
              </SelectField>
            </Field>

            <Field
              label="BOQ reference"
              description="Optional reference to the approved BOQ item or scope."
            >
              <div className="relative">
                <FileText className="pointer-events-none absolute left-3.5 top-1/2 h-[15px] w-[15px] -translate-y-1/2 text-ink/30" />

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
              <div className="relative">
                <CalendarDays className="pointer-events-none absolute left-3.5 top-1/2 h-[15px] w-[15px] -translate-y-1/2 text-ink/30" />

                <input
                  required
                  type="date"
                  value={requiredDate}
                  onChange={(event) => setRequiredDate(event.target.value)}
                  className={`${inputClass} pl-10`}
                />
              </div>
            </Field>

            <div className="sm:col-span-2">
              <Field
                label="Delivery location"
                required
                description="Site address or approved delivery point."
              >
                <div className="relative">
                  <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-[15px] w-[15px] -translate-y-1/2 text-ink/30" />

                  <input
                    required
                    value={deliveryLocation}
                    onChange={(event) =>
                      setDeliveryLocation(event.target.value)
                    }
                    placeholder="Enter site delivery location"
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </Field>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* ===================================================== */}
      {/* Material requirements */}
      {/* ===================================================== */}

      <Card className="overflow-hidden">
        <CardHeader
          title="Material requirements"
          subtitle="Specify every material, technical requirement and quantity needed."
          action={
            <Badge tone="amber">
              {lines.length} {lines.length === 1 ? 'item' : 'items'}
            </Badge>
          }
        />

        <div className="divide-y divide-ink/[0.07]">
          {lines.map((line, index) => (
            <div
              key={line.id}
              className="relative p-5 sm:p-6"
            >
              {/* Material number accent */}
              <div className="mb-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F5F7F5] text-ink/50">
                    <Package className="h-[15px] w-[15px]" />
                  </div>

                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-ink/35">
                      Material line
                    </p>

                    <p className="mt-0.5 text-[12px] font-semibold text-ink">
                      Requirement {String(index + 1).padStart(2, '0')}
                    </p>
                  </div>
                </div>

                {lines.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeLine(line.id)}
                    className="
                      group
                      inline-flex
                      items-center
                      gap-1.5
                      rounded-full
                      border
                      border-transparent
                      px-3
                      py-1.5
                      text-[10px]
                      font-semibold
                      text-ink/35
                      transition-all
                      hover:border-rose-500/10
                      hover:bg-rose-500/[0.04]
                      hover:text-rose-600
                    "
                  >
                    <Trash2 className="h-3 w-3 transition-transform group-hover:scale-95" />
                    Remove
                  </button>
                )}
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-12">
                <div className="lg:col-span-3">
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
                </div>

                <div className="lg:col-span-4">
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
                </div>

                <div className="lg:col-span-2">
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
                </div>

                <div className="lg:col-span-3">
                  <Field label="Unit" required>
                    <SelectField
                      value={line.unit}
                      onChange={(value) =>
                        updateLine(line.id, 'unit', value)
                      }
                    >
                      {units.map((unit) => (
                        <option key={unit} value={unit}>
                          {unit}
                        </option>
                      ))}
                    </SelectField>
                  </Field>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-ink/[0.07] bg-[#FBFCFB] px-5 py-4 sm:px-6">
          <button
            type="button"
            onClick={addLine}
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-ink/[0.09]
              bg-white
              px-4
              py-2.5
              text-[11px]
              font-semibold
              text-ink
              shadow-[0_2px_8px_rgba(20,40,30,0.03)]
              transition-all
              hover:-translate-y-0.5
              hover:border-ink/[0.15]
              hover:shadow-[0_8px_20px_rgba(20,40,30,0.06)]
            "
          >
            <Plus className="h-3.5 w-3.5" />
            Add material
          </button>
        </div>
      </Card>

      {/* ===================================================== */}
      {/* Additional instructions */}
      {/* ===================================================== */}

      <Card className="overflow-hidden">
        <CardHeader
          title="Additional instructions"
          subtitle="Include delivery, quality, access or site-specific requirements."
        />

        <CardBody className="p-5 sm:p-6">
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            rows={5}
            placeholder="Add any relevant delivery instructions, quality requirements or site notes..."
            className={`${inputClass} resize-none`}
          />

          <div className="mt-2 flex justify-end">
            <span className="text-[9px] font-medium text-ink/25">
              Optional
            </span>
          </div>
        </CardBody>
      </Card>

      {/* ===================================================== */}
      {/* Submission actions */}
      {/* ===================================================== */}

      <div className="flex flex-col-reverse gap-3 border-t border-ink/[0.07] pt-6 sm:flex-row sm:items-center sm:justify-end">
        <button
          type="button"
          className="
            rounded-full
            border
            border-ink/[0.09]
            bg-white
            px-5
            py-2.5
            text-[11px]
            font-semibold
            text-ink
            transition-all
            hover:-translate-y-0.5
            hover:border-ink/[0.15]
            hover:shadow-[0_8px_20px_rgba(20,40,30,0.05)]
          "
        >
          Save draft
        </button>

        <button
          type="submit"
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-full
            bg-ink
            px-5
            py-2.5
            text-[11px]
            font-bold
            text-white
            shadow-[0_8px_20px_rgba(15,25,20,0.12)]
            transition-all
            hover:-translate-y-0.5
            hover:shadow-[0_12px_28px_rgba(15,25,20,0.16)]
            active:translate-y-0
          "
        >
          Submit request
          <Send className="h-3.5 w-3.5" />
        </button>
      </div>
    </form>
  )
}

/* ============================================================= */
/* Field                                                          */
/* ============================================================= */

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
      <span className="text-[11px] font-semibold tracking-[-0.005em] text-ink">
        {label}
        {required && (
          <span className="ml-1 text-[#B85C12]">*</span>
        )}
      </span>

      {description && (
        <span className="mt-1 block text-[10px] leading-4 text-ink/35">
          {description}
        </span>
      )}

      <div className="mt-2.5">{children}</div>
    </label>
  )
}

/* ============================================================= */
/* Select                                                          */
/* ============================================================= */

function SelectField({
  value,
  onChange,
  placeholder,
  children,
}: {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  children: React.ReactNode
}) {
  return (
    <div className="relative">
      <select
        required={Boolean(placeholder)}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`${inputClass} appearance-none pr-10`}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {children}
      </select>

      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink/30" />
    </div>
  )
}

/* ============================================================= */
/* Shared input treatment                                          */
/* ============================================================= */

const inputClass = `
  w-full
  rounded-[13px]
  border
  border-ink/[0.09]
  bg-white
  px-3.5
  py-2.5
  text-[12px]
  font-medium
  text-ink
  outline-none
  shadow-[0_1px_2px_rgba(20,40,30,0.02)]
  transition-all
  duration-200
  placeholder:text-ink/25
  hover:border-ink/[0.14]
  focus:border-ink/30
  focus:ring-4
  focus:ring-ink/[0.035]
`