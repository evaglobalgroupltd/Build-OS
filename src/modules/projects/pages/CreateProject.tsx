import { useMemo, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Construction,
  FileText,
  MapPin,
  Save,
  Upload,
} from 'lucide-react'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'

const steps = [
  {
    id: 1,
    title: 'Project Basics',
    description: 'Tell us about the project and where it is located.',
  },
  {
    id: 2,
    title: 'Land Details',
    description: 'Provide ownership, title and site information.',
  },
  {
    id: 3,
    title: 'Building Profile',
    description: 'Describe the proposed building and its requirements.',
  },
  {
    id: 4,
    title: 'Service Requirements',
    description: 'Select the services you need Build OS to coordinate.',
  },
  {
    id: 5,
    title: 'Budget & Timeline',
    description: 'Set your expected budget, funding and delivery timeline.',
  },
  {
    id: 6,
    title: 'Finishing Level',
    description: 'Choose the expected finishing standard.',
  },
  {
    id: 7,
    title: 'Document Upload',
    description: 'Upload available project and land documentation.',
  },
  {
    id: 8,
    title: 'Review & Submit',
    description: 'Review your project before sending it for Build OS approval.',
  },
] as const

const serviceOptions = [
  'Land acquisition',
  'Land verification',
  'Survey',
  'Design',
  'Approvals',
  'Construction',
  'Procurement',
  'Monitoring',
  'Interiors',
  'Borehole',
  'Excavation',
  'Handover support',
]

const documentTypes = [
  'Survey plan',
  'Title documents',
  'Deed',
  'C of O',
  'Drawings',
  'Approvals',
  'Site photos',
  'Valuation',
  'Soil test',
  'Dispute documents',
]

type ProjectFormData = {
  projectName: string
  state: string
  city: string
  address: string
  projectType: string
  projectPurpose: string
  contactPerson: string
  communicationPreference: string

  landSize: string
  plotNumber: string
  ownershipStatus: string
  titleDocumentType: string
  possessionStatus: string
  hasDispute: string
  surveyPlan: string
  coordinates: string

  buildingType: string
  floors: string
  bedroomsUnits: string
  useType: string
  floorArea: string
  parking: string
  specialFeatures: string
  accessibilityNeeds: string

  services: string[]

  budgetRange: string
  fundingStatus: string
  startDate: string
  targetCompletionDate: string
  urgency: string
  timelineFlexibility: string
  paymentStructure: string

  finishingLevel: string

  documents: string[]
}

const initialForm: ProjectFormData = {
  projectName: '',
  state: '',
  city: '',
  address: '',
  projectType: '',
  projectPurpose: '',
  contactPerson: '',
  communicationPreference: 'Email',

  landSize: '',
  plotNumber: '',
  ownershipStatus: '',
  titleDocumentType: '',
  possessionStatus: '',
  hasDispute: 'No',
  surveyPlan: '',
  coordinates: '',

  buildingType: '',
  floors: '',
  bedroomsUnits: '',
  useType: '',
  floorArea: '',
  parking: '',
  specialFeatures: '',
  accessibilityNeeds: '',

  services: [],

  budgetRange: '',
  fundingStatus: '',
  startDate: '',
  targetCompletionDate: '',
  urgency: '',
  timelineFlexibility: '',
  paymentStructure: '',

  finishingLevel: '',

  documents: [],
}

export function CreateProject() {
  const [currentStep, setCurrentStep] = useState(1)
  const [form, setForm] = useState<ProjectFormData>(initialForm)
  const [saved, setSaved] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const current = steps[currentStep - 1]

  const completionPercent = useMemo(
    () => Math.round((currentStep / steps.length) * 100),
    [currentStep],
  )

  function update<K extends keyof ProjectFormData>(
    key: K,
    value: ProjectFormData[K],
  ) {
    setForm((previous) => ({
      ...previous,
      [key]: value,
    }))
    setSaved(false)
  }

  function toggleService(service: string) {
    const selected = form.services.includes(service)

    update(
      'services',
      selected
        ? form.services.filter((item) => item !== service)
        : [...form.services, service],
    )
  }

  function toggleDocument(document: string) {
    const selected = form.documents.includes(document)

    update(
      'documents',
      selected
        ? form.documents.filter((item) => item !== document)
        : [...form.documents, document],
    )
  }

  function saveDraft() {
    setSaved(true)
  }

  function nextStep() {
    if (currentStep < steps.length) {
      setCurrentStep((step) => step + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function previousStep() {
    if (currentStep > 1) {
      setCurrentStep((step) => step - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function submitProject() {
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <Card>
        <CardBody>
          <div className="flex min-h-[420px] flex-col items-center justify-center px-6 py-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            </div>

            <h1 className="mt-5 font-display text-2xl font-semibold text-ink">
              Project submitted
            </h1>

            <p className="mt-2 max-w-md text-sm leading-6 text-ink/50">
              Your project has been submitted to Build OS for review. You will
              receive the project ID and updates as the review progresses.
            </p>

            <div className="mt-6 rounded-xl border border-line bg-paper-2 px-5 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                Project
              </p>
              <p className="mt-1 font-mono text-sm font-semibold text-ink">
                {form.projectName || 'New Project'}
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="border-b border-line bg-paper-2 px-6 py-6 sm:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink text-white">
                <Construction className="h-5 w-5" />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink/35">
                  New project
                </p>
                <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight text-ink">
                  {current.title}
                </h1>
                <p className="mt-1 max-w-xl text-sm text-ink/50">
                  {current.description}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={saveDraft}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-xs font-semibold text-ink transition-colors hover:bg-ink/[0.03]"
            >
              <Save className="h-3.5 w-3.5" />
              {saved ? 'Draft saved' : 'Save draft'}
            </button>
          </div>
        </div>

        {/* Step navigation */}
        <div className="overflow-x-auto border-b border-line px-6 py-4 sm:px-8">
          <div className="flex min-w-max items-center gap-2">
            {steps.map((step) => {
              const active = step.id === currentStep
              const completed = step.id < currentStep

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => {
                    if (step.id <= currentStep) {
                      setCurrentStep(step.id)
                    }
                  }}
                  className="flex items-center gap-2"
                >
                  <span
                    className={[
                      'flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-semibold',
                      active
                        ? 'bg-ink text-white'
                        : completed
                          ? 'bg-emerald-500/10 text-emerald-700'
                          : 'bg-ink/5 text-ink/35',
                    ].join(' ')}
                  >
                    {completed ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      step.id
                    )}
                  </span>

                  <span
                    className={[
                      'text-xs font-semibold',
                      active ? 'text-ink' : 'text-ink/40',
                    ].join(' ')}
                  >
                    {step.title}
                  </span>

                  {step.id !== steps.length && (
                    <span className="mx-1 h-px w-5 bg-line" />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Progress */}
        <div className="h-1 bg-ink/5">
          <div
            className="h-full bg-ink transition-all duration-300"
            style={{ width: `${completionPercent}%` }}
          />
        </div>

        <CardBody>
          <div className="mx-auto max-w-4xl">
            {currentStep === 1 && (
              <ProjectBasics form={form} update={update} />
            )}

            {currentStep === 2 && (
              <LandDetails form={form} update={update} />
            )}

            {currentStep === 3 && (
              <BuildingProfile form={form} update={update} />
            )}

            {currentStep === 4 && (
              <ServiceRequirements
                selected={form.services}
                onToggle={toggleService}
              />
            )}

            {currentStep === 5 && (
              <BudgetTimeline form={form} update={update} />
            )}

            {currentStep === 6 && (
              <FinishingLevel
                value={form.finishingLevel}
                onChange={(value) => update('finishingLevel', value)}
              />
            )}

            {currentStep === 7 && (
              <DocumentUpload
                selected={form.documents}
                onToggle={toggleDocument}
              />
            )}

            {currentStep === 8 && <Review form={form} />}

            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={previousStep}
                disabled={currentStep === 1}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-xs font-semibold text-ink transition-colors hover:bg-ink/[0.03] disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back
              </button>

              <div className="flex items-center justify-end gap-2">
                {currentStep < steps.length ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-5 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    Continue
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={submitProject}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-5 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    Submit project for review
                    <Check className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Step 1 — Project Basics                                                    */
/* -------------------------------------------------------------------------- */

function ProjectBasics({
  form,
  update,
}: {
  form: ProjectFormData
  update: <K extends keyof ProjectFormData>(
    key: K,
    value: ProjectFormData[K],
  ) => void
}) {
  return (
    <StepSection
      icon={MapPin}
      title="Project Basics"
      description="Capture the core identity, location and communication details for the project."
    >
      <FieldGrid>
        <Field
          label="Project name"
          required
          value={form.projectName}
          onChange={(value) => update('projectName', value)}
          placeholder="e.g. Abuja Family Residence"
        />

        <SelectField
          label="State"
          required
          value={form.state}
          onChange={(value) => update('state', value)}
          options={['FCT', 'Lagos', 'Rivers', 'Kaduna', 'Oyo', 'Kano']}
        />

        <Field
          label="City"
          required
          value={form.city}
          onChange={(value) => update('city', value)}
          placeholder="e.g. Abuja"
        />

        <Field
          label="Address / landmark"
          required
          value={form.address}
          onChange={(value) => update('address', value)}
          placeholder="Street, district or nearby landmark"
        />

        <SelectField
          label="Project type"
          required
          value={form.projectType}
          onChange={(value) => update('projectType', value)}
          options={[
            'New construction',
            'Renovation',
            'Extension',
            'Commercial development',
            'Other',
          ]}
        />

        <SelectField
          label="Project purpose"
          value={form.projectPurpose}
          onChange={(value) => update('projectPurpose', value)}
          options={[
            'Personal residence',
            'Investment property',
            'Rental property',
            'Commercial use',
            'Other',
          ]}
        />

        <Field
          label="Contact person"
          value={form.contactPerson}
          onChange={(value) => update('contactPerson', value)}
          placeholder="Primary project contact"
        />

        <SelectField
          label="Communication preference"
          value={form.communicationPreference}
          onChange={(value) => update('communicationPreference', value)}
          options={['Email', 'Phone', 'SMS', 'WhatsApp']}
        />
      </FieldGrid>
    </StepSection>
  )
}

/* -------------------------------------------------------------------------- */
/* Step 2 — Land Details                                                      */
/* -------------------------------------------------------------------------- */

function LandDetails({
  form,
  update,
}: {
  form: ProjectFormData
  update: <K extends keyof ProjectFormData>(
    key: K,
    value: ProjectFormData[K],
  ) => void
}) {
  return (
    <StepSection
      icon={MapPin}
      title="Land Details"
      description="Provide the available information about the land, ownership and title."
    >
      <FieldGrid>
        <Field
          label="Land size"
          value={form.landSize}
          onChange={(value) => update('landSize', value)}
          placeholder="e.g. 600 sqm"
        />

        <Field
          label="Plot number"
          value={form.plotNumber}
          onChange={(value) => update('plotNumber', value)}
          placeholder="Plot number"
        />

        <SelectField
          label="Ownership status"
          required
          value={form.ownershipStatus}
          onChange={(value) => update('ownershipStatus', value)}
          options={[
            'Owned',
            'Purchased',
            'Under acquisition',
            'Family land',
            'Leasehold',
            'Other',
          ]}
        />

        <SelectField
          label="Title document type"
          value={form.titleDocumentType}
          onChange={(value) => update('titleDocumentType', value)}
          options={['C of O', 'Deed', 'Governor’s Consent', 'Survey plan', 'Other']}
        />

        <SelectField
          label="Possession status"
          value={form.possessionStatus}
          onChange={(value) => update('possessionStatus', value)}
          options={[
            'In possession',
            'Not yet in possession',
            'Partially accessible',
            'Unknown',
          ]}
        />

        <SelectField
          label="Land dispute"
          value={form.hasDispute}
          onChange={(value) => update('hasDispute', value)}
          options={['No', 'Yes', 'Unknown']}
        />

        <Field
          label="Survey plan reference"
          value={form.surveyPlan}
          onChange={(value) => update('surveyPlan', value)}
          placeholder="Reference or document number"
        />

        <Field
          label="Coordinates"
          value={form.coordinates}
          onChange={(value) => update('coordinates', value)}
          placeholder="Latitude, longitude where available"
        />
      </FieldGrid>

      <InfoNotice>
        Build OS will review land documents, ownership information and
        location risk during project approval.
      </InfoNotice>
    </StepSection>
  )
}

/* -------------------------------------------------------------------------- */
/* Step 3 — Building Profile                                                  */
/* -------------------------------------------------------------------------- */

function BuildingProfile({
  form,
  update,
}: {
  form: ProjectFormData
  update: <K extends keyof ProjectFormData>(
    key: K,
    value: ProjectFormData[K],
  ) => void
}) {
  return (
    <StepSection
      icon={Construction}
      title="Building Profile"
      description="Describe the building, intended use and any special requirements."
    >
      <FieldGrid>
        <SelectField
          label="Building type"
          required
          value={form.buildingType}
          onChange={(value) => update('buildingType', value)}
          options={[
            'Detached house',
            'Duplex',
            'Terrace',
            'Apartment building',
            'Office',
            'Retail',
            'Mixed-use',
            'Other',
          ]}
        />

        <Field
          label="Number of floors"
          value={form.floors}
          onChange={(value) => update('floors', value)}
          placeholder="e.g. 2"
        />

        <Field
          label="Bedrooms / units"
          value={form.bedroomsUnits}
          onChange={(value) => update('bedroomsUnits', value)}
          placeholder="e.g. 4 bedrooms"
        />

        <SelectField
          label="Use type"
          value={form.useType}
          onChange={(value) => update('useType', value)}
          options={[
            'Residential',
            'Commercial',
            'Mixed-use',
            'Hospitality',
            'Other',
          ]}
        />

        <Field
          label="Floor area"
          value={form.floorArea}
          onChange={(value) => update('floorArea', value)}
          placeholder="e.g. 420 sqm"
        />

        <Field
          label="Parking"
          value={form.parking}
          onChange={(value) => update('parking', value)}
          placeholder="e.g. 4 cars"
        />

        <TextAreaField
          label="Special features"
          value={form.specialFeatures}
          onChange={(value) => update('specialFeatures', value)}
          placeholder="Pool, smart home, generator house, security features, etc."
        />

        <TextAreaField
          label="Accessibility needs"
          value={form.accessibilityNeeds}
          onChange={(value) => update('accessibilityNeeds', value)}
          placeholder="Describe any accessibility requirements"
        />
      </FieldGrid>
    </StepSection>
  )
}

/* -------------------------------------------------------------------------- */
/* Step 4 — Service Requirements                                              */
/* -------------------------------------------------------------------------- */

function ServiceRequirements({
  selected,
  onToggle,
}: {
  selected: string[]
  onToggle: (service: string) => void
}) {
  return (
    <StepSection
      icon={Construction}
      title="Service Requirements"
      description="Select the services you want Build OS to coordinate for this project."
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {serviceOptions.map((service) => {
          const checked = selected.includes(service)

          return (
            <button
              key={service}
              type="button"
              onClick={() => onToggle(service)}
              className={[
                'flex items-center gap-3 rounded-xl border p-4 text-left transition-colors',
                checked
                  ? 'border-ink bg-ink/[0.03]'
                  : 'border-line bg-white hover:bg-ink/[0.02]',
              ].join(' ')}
            >
              <span
                className={[
                  'flex h-5 w-5 shrink-0 items-center justify-center rounded-md border',
                  checked
                    ? 'border-ink bg-ink text-white'
                    : 'border-line bg-white',
                ].join(' ')}
              >
                {checked && <Check className="h-3 w-3" />}
              </span>

              <span className="text-xs font-medium text-ink/70">
                {service}
              </span>
            </button>
          )
        })}
      </div>

      <InfoNotice>
        Services may include land acquisition, verification, survey, design,
        approvals, construction, procurement, monitoring, interiors, borehole,
        excavation and handover support.
      </InfoNotice>
    </StepSection>
  )
}

/* -------------------------------------------------------------------------- */
/* Step 5 — Budget & Timeline                                                 */
/* -------------------------------------------------------------------------- */

function BudgetTimeline({
  form,
  update,
}: {
  form: ProjectFormData
  update: <K extends keyof ProjectFormData>(
    key: K,
    value: ProjectFormData[K],
  ) => void
}) {
  return (
    <StepSection
      icon={Construction}
      title="Budget & Timeline"
      description="Set the expected investment range, funding status and delivery expectations."
    >
      <FieldGrid>
        <SelectField
          label="Budget range"
          required
          value={form.budgetRange}
          onChange={(value) => update('budgetRange', value)}
          options={[
            'Below ₦20M',
            '₦20M – ₦50M',
            '₦50M – ₦100M',
            '₦100M – ₦250M',
            '₦250M+',
            'To be determined',
          ]}
        />

        <SelectField
          label="Funding status"
          value={form.fundingStatus}
          onChange={(value) => update('fundingStatus', value)}
          options={[
            'Fully funded',
            'Partially funded',
            'Funding in progress',
            'Not yet funded',
          ]}
        />

        <Field
          label="Start date"
          type="date"
          value={form.startDate}
          onChange={(value) => update('startDate', value)}
        />

        <Field
          label="Target completion date"
          type="date"
          value={form.targetCompletionDate}
          onChange={(value) => update('targetCompletionDate', value)}
        />

        <SelectField
          label="Urgency"
          value={form.urgency}
          onChange={(value) => update('urgency', value)}
          options={['Standard', 'High', 'Time-sensitive']}
        />

        <SelectField
          label="Timeline flexibility"
          value={form.timelineFlexibility}
          onChange={(value) => update('timelineFlexibility', value)}
          options={['Flexible', 'Moderately flexible', 'Fixed target date']}
        />

        <SelectField
          label="Preferred payment structure"
          value={form.paymentStructure}
          onChange={(value) => update('paymentStructure', value)}
          options={[
            'Full project',
            'By phase',
            'By milestone',
            'By category',
            'To be advised',
          ]}
        />
      </FieldGrid>

      <InfoNotice>
        Project wallets may be funded by full project, phase, milestone or
        category after project approval.
      </InfoNotice>
    </StepSection>
  )
}

/* -------------------------------------------------------------------------- */
/* Step 6 — Finishing Level                                                   */
/* -------------------------------------------------------------------------- */

function FinishingLevel({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) {
  const levels = [
    {
      value: 'Basic',
      description: 'Essential finishes and practical specifications.',
    },
    {
      value: 'Standard',
      description: 'Balanced specifications for everyday residential use.',
    },
    {
      value: 'Premium',
      description: 'Higher-quality materials and upgraded finishes.',
    },
    {
      value: 'Luxury',
      description: 'High-end specifications, finishes and fittings.',
    },
    {
      value: 'Custom',
      description: 'A bespoke specification defined during project planning.',
    },
  ]

  return (
    <StepSection
      icon={Construction}
      title="Finishing Level"
      description="Select the expected finishing standard. This affects cost estimates and material categories."
    >
      <div className="grid gap-3 md:grid-cols-2">
        {levels.map((level) => {
          const selected = value === level.value

          return (
            <button
              key={level.value}
              type="button"
              onClick={() => onChange(level.value)}
              className={[
                'rounded-xl border p-5 text-left transition-colors',
                selected
                  ? 'border-ink bg-ink/[0.03]'
                  : 'border-line bg-white hover:bg-ink/[0.02]',
              ].join(' ')}
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-semibold text-ink">
                  {level.value}
                </p>

                <span
                  className={[
                    'flex h-5 w-5 items-center justify-center rounded-full border',
                    selected
                      ? 'border-ink bg-ink text-white'
                      : 'border-line',
                  ].join(' ')}
                >
                  {selected && <Check className="h-3 w-3" />}
                </span>
              </div>

              <p className="mt-2 text-xs leading-5 text-ink/45">
                {level.description}
              </p>
            </button>
          )
        })}
      </div>
    </StepSection>
  )
}

/* -------------------------------------------------------------------------- */
/* Step 7 — Document Upload                                                   */
/* -------------------------------------------------------------------------- */

function DocumentUpload({
  selected,
  onToggle,
}: {
  selected: string[]
  onToggle: (document: string) => void
}) {
  return (
    <StepSection
      icon={Upload}
      title="Document Upload"
      description="Identify the project and land documents currently available for review."
    >
      <div className="rounded-xl border border-dashed border-line bg-paper-2 p-6 text-center">
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-white">
          <Upload className="h-5 w-5 text-ink/45" />
        </div>

        <p className="mt-3 text-sm font-semibold text-ink">
          Project documents
        </p>

        <p className="mt-1 text-xs leading-5 text-ink/45">
          Select the document categories you have available. Actual file
          transfer can be connected to the document service/API.
        </p>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {documentTypes.map((document) => {
          const checked = selected.includes(document)

          return (
            <button
              key={document}
              type="button"
              onClick={() => onToggle(document)}
              className={[
                'flex items-center gap-3 rounded-xl border p-4 text-left transition-colors',
                checked
                  ? 'border-ink bg-ink/[0.03]'
                  : 'border-line bg-white hover:bg-ink/[0.02]',
              ].join(' ')}
            >
              <span
                className={[
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
                  checked ? 'bg-ink text-white' : 'bg-ink/5 text-ink/40',
                ].join(' ')}
              >
                <FileText className="h-4 w-4" />
              </span>

              <span className="flex-1">
                <span className="block text-xs font-semibold text-ink">
                  {document}
                </span>
                <span className="mt-0.5 block text-[10px] text-ink/40">
                  {checked ? 'Selected' : 'Not selected'}
                </span>
              </span>

              {checked && <Check className="h-4 w-4 text-emerald-600" />}
            </button>
          )
        })}
      </div>
    </StepSection>
  )
}

/* -------------------------------------------------------------------------- */
/* Step 8 — Review                                                            */
/* -------------------------------------------------------------------------- */

function Review({ form }: { form: ProjectFormData }) {
  return (
    <StepSection
      icon={CheckCircle2}
      title="Review & Submit"
      description="Confirm your project details, selected services and available documents before submission."
    >
      <div className="space-y-5">
        <ReviewCard
          title="Project basics"
          items={[
            ['Project name', form.projectName],
            ['Location', [form.city, form.state].filter(Boolean).join(', ')],
            ['Address / landmark', form.address],
            ['Project type', form.projectType],
            ['Project purpose', form.projectPurpose],
            ['Contact person', form.contactPerson],
            ['Communication', form.communicationPreference],
          ]}
        />

        <ReviewCard
          title="Land details"
          items={[
            ['Land size', form.landSize],
            ['Plot number', form.plotNumber],
            ['Ownership', form.ownershipStatus],
            ['Title document', form.titleDocumentType],
            ['Possession', form.possessionStatus],
            ['Dispute', form.hasDispute],
            ['Survey plan', form.surveyPlan],
            ['Coordinates', form.coordinates],
          ]}
        />

        <ReviewCard
          title="Building profile"
          items={[
            ['Building type', form.buildingType],
            ['Floors', form.floors],
            ['Bedrooms / units', form.bedroomsUnits],
            ['Use type', form.useType],
            ['Floor area', form.floorArea],
            ['Parking', form.parking],
            ['Special features', form.specialFeatures],
            ['Accessibility', form.accessibilityNeeds],
          ]}
        />

        <ReviewCard
          title="Services"
          items={[
            [
              'Selected services',
              form.services.length > 0
                ? form.services.join(', ')
                : 'No services selected',
            ],
          ]}
        />

        <ReviewCard
          title="Budget & timeline"
          items={[
            ['Budget', form.budgetRange],
            ['Funding', form.fundingStatus],
            ['Start date', form.startDate],
            ['Target completion', form.targetCompletionDate],
            ['Urgency', form.urgency],
            ['Flexibility', form.timelineFlexibility],
            ['Payment structure', form.paymentStructure],
          ]}
        />

        <ReviewCard
          title="Finishing & documents"
          items={[
            ['Finishing level', form.finishingLevel],
            [
              'Documents',
              form.documents.length > 0
                ? form.documents.join(', ')
                : 'No documents selected',
            ],
          ]}
        />

        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
          <p className="text-xs font-semibold text-amber-800">
            Project approval
          </p>
          <p className="mt-1 text-xs leading-5 text-amber-900/60">
            After submission, Build OS Admin will review project completeness,
            client status, land documents, location risk, budget realism and
            project risk before the project proceeds.
          </p>
        </div>
      </div>
    </StepSection>
  )
}

/* -------------------------------------------------------------------------- */
/* Shared form components                                                     */
/* -------------------------------------------------------------------------- */

function StepSection({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section>
      <div className="mb-6 flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink/5">
          <Icon className="h-4 w-4 text-ink/55" />
        </div>

        <div>
          <h2 className="font-display text-lg font-semibold text-ink">
            {title}
          </h2>
          <p className="mt-1 text-xs leading-5 text-ink/45">
            {description}
          </p>
        </div>
      </div>

      {children}
    </section>
  )
}

function FieldGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-5 sm:grid-cols-2">{children}</div>
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required = false,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: string
  required?: boolean
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-ink/65">
        {label}
        {required && <span className="ml-1 text-rose-600">*</span>}
      </span>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-10 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink outline-none transition-colors placeholder:text-ink/25 focus:border-ink/30 focus:ring-2 focus:ring-ink/5"
      />
    </label>
  )
}

function SelectField({
  label,
  value,
  onChange,
  options,
  required = false,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: string[]
  required?: boolean
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-ink/65">
        {label}
        {required && <span className="ml-1 text-rose-600">*</span>}
      </span>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink outline-none transition-colors focus:border-ink/30 focus:ring-2 focus:ring-ink/5"
      >
        <option value="">Select...</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}

function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
}) {
  return (
    <label className="block sm:col-span-2">
      <span className="mb-1.5 block text-xs font-semibold text-ink/65">
        {label}
      </span>

      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full resize-none rounded-xl border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-ink/25 focus:border-ink/30 focus:ring-2 focus:ring-ink/5"
      />
    </label>
  )
}

function InfoNotice({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 rounded-xl border border-line bg-paper-2 px-4 py-3">
      <p className="text-xs leading-5 text-ink/45">{children}</p>
    </div>
  )
}

function ReviewCard({
  title,
  items,
}: {
  title: string
  items: [string, string][]
}) {
  return (
    <div className="rounded-xl border border-line">
      <div className="border-b border-line bg-paper-2 px-4 py-3">
        <h3 className="text-xs font-semibold text-ink">{title}</h3>
      </div>

      <div className="grid gap-x-6 gap-y-4 p-4 sm:grid-cols-2">
        {items.map(([label, value]) => (
          <div key={label} className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
              {label}
            </p>

            <p className="mt-1 break-words text-sm font-medium text-ink">
              {value || 'Not provided'}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}