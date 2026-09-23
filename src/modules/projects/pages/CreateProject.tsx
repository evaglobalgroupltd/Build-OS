import { useMemo, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  Construction,
  FileText,
  MapPin,
  Save,
  ShieldCheck,
  Upload,
} from 'lucide-react'

import { Card, CardBody } from '@/components/ui/Card'

const steps = [
  {
    id: 1,
    title: 'Project Basics',
    shortTitle: 'Basics',
    description: 'Tell us about the project and where it is located.',
  },
  {
    id: 2,
    title: 'Land Details',
    shortTitle: 'Land',
    description: 'Provide ownership, title and site information.',
  },
  {
    id: 3,
    title: 'Building Profile',
    shortTitle: 'Building',
    description: 'Describe the proposed building and its requirements.',
  },
  {
    id: 4,
    title: 'Service Requirements',
    shortTitle: 'Services',
    description: 'Select the services you need Build OS to coordinate.',
  },
  {
    id: 5,
    title: 'Budget & Timeline',
    shortTitle: 'Budget',
    description: 'Set your expected budget, funding and delivery timeline.',
  },
  {
    id: 6,
    title: 'Finishing Level',
    shortTitle: 'Finishing',
    description: 'Choose the expected finishing standard.',
  },
  {
    id: 7,
    title: 'Document Upload',
    shortTitle: 'Documents',
    description: 'Upload available project and land documentation.',
  },
  {
    id: 8,
    title: 'Review & Submit',
    shortTitle: 'Review',
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
      <div className="mx-auto w-full max-w-5xl">
        <Card className="overflow-hidden border-ink/[0.07] shadow-[0_24px_70px_rgba(11,18,32,0.08)]">
          <div className="relative overflow-hidden px-6 py-16 sm:px-10 sm:py-20">
            {/* Decorative background */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#12613E]/[0.05] blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#B85C12]/[0.04] blur-3xl" />

            <div className="relative mx-auto flex max-w-xl flex-col items-center text-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-[#12613E]/10 blur-xl" />

                <div className="relative flex h-20 w-20 items-center justify-center rounded-[26px] border border-[#12613E]/10 bg-[#EAF4EE] text-[#12613E] shadow-[0_12px_35px_rgba(18,97,62,0.10)]">
                  <CheckCircle2 className="h-9 w-9" strokeWidth={1.8} />
                </div>
              </div>

              <div className="mt-7">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#12613E]/60">
                  Submission received
                </p>

                <h1 className="mt-2 font-display text-[30px] font-semibold tracking-[-0.035em] text-ink sm:text-[36px]">
                  Project submitted
                </h1>

                <p className="mx-auto mt-3 max-w-md text-[13px] leading-6 text-ink/50">
                  Your project has been securely submitted to Build OS for
                  review. You will receive your project ID and updates as the
                  approval process progresses.
                </p>
              </div>

              <div className="mt-8 w-full max-w-sm rounded-[20px] border border-ink/[0.07] bg-[#F7F8FA] p-1">
                <div className="rounded-[16px] bg-white px-5 py-4 shadow-[0_4px_18px_rgba(11,18,32,0.04)]">
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-left">
                      <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-ink/35">
                        Project
                      </p>

                      <p className="mt-1 truncate font-display text-sm font-semibold text-ink">
                        {form.projectName || 'New Project'}
                      </p>
                    </div>

                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#EAF4EE] text-[#12613E]">
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-7 flex items-center gap-2 text-[10px] font-medium text-ink/35">
                <span className="h-1.5 w-1.5 rounded-full bg-[#12613E]" />
                Build OS project review workflow
              </div>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-5">
      {/* ================================================================ */}
      {/* Page introduction                                               */}
      {/* ================================================================ */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B85C12]" />

            <p className="text-[10px] font-bold uppercase tracking-[0.19em] text-ink/40">
              Project Studio
            </p>
          </div>

          <h1 className="font-display text-[28px] font-semibold tracking-[-0.035em] text-ink sm:text-[32px]">
            Create a new project
          </h1>

          <p className="mt-1.5 max-w-2xl text-[13px] leading-5 text-ink/50">
            Build your project profile step by step. Your information will
            guide verification, planning, procurement and project delivery.
          </p>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-medium text-ink/40">
          <ShieldCheck className="h-3.5 w-3.5 text-[#12613E]" />
          Your project information is protected
        </div>
      </div>

      {/* ================================================================ */}
      {/* Main studio                                                      */}
      {/* ================================================================ */}

      <Card className="overflow-hidden border-ink/[0.07] shadow-[0_18px_55px_rgba(11,18,32,0.055)]">
        {/* ============================================================ */}
        {/* Header                                                        */}
        {/* ============================================================ */}

        <div className="relative overflow-hidden border-b border-ink/[0.07] bg-[#F7F8FA] px-5 py-6 sm:px-8 sm:py-7">
          <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[#12613E]/[0.035] blur-3xl" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] bg-ink text-white shadow-[0_8px_22px_rgba(11,18,32,0.12)]">
                <Construction className="h-[19px] w-[19px]" strokeWidth={1.8} />

                <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#F7F8FA] bg-[#B85C12]">
                  <span className="h-1 w-1 rounded-full bg-white" />
                </span>
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-ink/35">
                    Step {currentStep} of {steps.length}
                  </p>

                  <span className="h-1 w-1 rounded-full bg-ink/15" />

                  <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#B85C12]">
                    {completionPercent}% complete
                  </p>
                </div>

                <h2 className="mt-1.5 font-display text-[22px] font-semibold tracking-[-0.025em] text-ink sm:text-[25px]">
                  {current.title}
                </h2>

                <p className="mt-1 max-w-xl text-[12px] leading-5 text-ink/50">
                  {current.description}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={saveDraft}
              className={[
                'group inline-flex w-fit shrink-0 items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-[11px] font-bold transition-all',
                saved
                  ? 'border-[#12613E]/15 bg-[#EAF4EE] text-[#12613E]'
                  : 'border-ink/[0.09] bg-white text-ink shadow-[0_4px_14px_rgba(11,18,32,0.035)] hover:-translate-y-0.5 hover:border-ink/15 hover:shadow-[0_8px_20px_rgba(11,18,32,0.07)]',
              ].join(' ')}
            >
              {saved ? (
                <CheckCircle2 className="h-3.5 w-3.5" />
              ) : (
                <Save className="h-3.5 w-3.5" />
              )}

              {saved ? 'Draft saved' : 'Save draft'}
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* Step navigation                                               */}
        {/* ============================================================ */}

        <div className="border-b border-ink/[0.07] bg-white px-4 py-4 sm:px-7">
          <div className="overflow-x-auto pb-1">
            <div className="flex min-w-max items-center justify-between gap-1">
              {steps.map((step) => {
                const active = step.id === currentStep
                const completed = step.id < currentStep
                const accessible = step.id <= currentStep

                return (
                  <div key={step.id} className="flex items-center">
                    <button
                      type="button"
                      disabled={!accessible}
                      onClick={() => {
                        if (accessible) {
                          setCurrentStep(step.id)
                        }
                      }}
                      className={[
                        'group flex items-center gap-2 rounded-full px-2 py-1.5 transition-all',
                        accessible
                          ? 'cursor-pointer'
                          : 'cursor-default',
                      ].join(' ')}
                    >
                      <span
                        className={[
                          'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[9px] font-bold transition-all',
                          active
                            ? 'bg-ink text-white shadow-[0_4px_12px_rgba(11,18,32,0.16)]'
                            : completed
                              ? 'bg-[#EAF4EE] text-[#12613E]'
                              : 'bg-ink/[0.045] text-ink/30',
                        ].join(' ')}
                      >
                        {completed ? (
                          <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                        ) : (
                          step.id
                        )}
                      </span>

                      <span
                        className={[
                          'hidden text-[10px] font-bold sm:block',
                          active
                            ? 'text-ink'
                            : completed
                              ? 'text-[#12613E]'
                              : 'text-ink/30',
                        ].join(' ')}
                      >
                        {step.shortTitle}
                      </span>
                    </button>

                    {step.id !== steps.length && (
                      <span
                        className={[
                          'mx-1 hidden h-px w-4 sm:block lg:w-7',
                          step.id < currentStep
                            ? 'bg-[#12613E]/30'
                            : 'bg-ink/[0.08]',
                        ].join(' ')}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* Progress                                                      */}
        {/* ============================================================ */}

        <div className="h-[3px] bg-ink/[0.035]">
          <div
            className="h-full bg-[#12613E] transition-all duration-500 ease-out"
            style={{ width: `${completionPercent}%` }}
          />
        </div>

        {/* ============================================================ */}
        {/* Form body                                                     */}
        {/* ============================================================ */}

        <CardBody className="px-5 py-7 sm:px-8 sm:py-9">
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

            {/* ======================================================== */}
            {/* Footer navigation                                         */}
            {/* ======================================================== */}

            <div className="mt-9 flex flex-col-reverse gap-3 border-t border-ink/[0.07] pt-6 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={previousStep}
                disabled={currentStep === 1}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/[0.09] bg-white px-5 py-2.5 text-[11px] font-bold text-ink transition-all hover:-translate-y-0.5 hover:border-ink/15 hover:shadow-[0_6px_18px_rgba(11,18,32,0.06)] disabled:cursor-not-allowed disabled:opacity-25 disabled:hover:translate-y-0 disabled:hover:shadow-none"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back
              </button>

              <div className="flex items-center justify-end gap-3">
                <span className="hidden text-[10px] font-medium text-ink/30 sm:block">
                  {completionPercent}% complete
                </span>

                {currentStep < steps.length ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[11px] font-bold text-white shadow-[0_7px_20px_rgba(11,18,32,0.12)] transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(11,18,32,0.17)]"
                  >
                    Continue

                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={submitProject}
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#12613E] px-5 py-2.5 text-[11px] font-bold text-white shadow-[0_7px_20px_rgba(18,97,62,0.16)] transition-all hover:-translate-y-0.5 hover:bg-[#0F5235] hover:shadow-[0_10px_25px_rgba(18,97,62,0.21)]"
                  >
                    Submit for review

                    <Check className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />
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
      eyebrow="Project identity"
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
      eyebrow="Site & ownership"
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
          options={[
            'C of O',
            'Deed',
            'Governor’s Consent',
            'Survey plan',
            'Other',
          ]}
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

      <InfoNotice tone="green">
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
      eyebrow="Property specification"
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
      eyebrow="Delivery scope"
      title="Service Requirements"
      description="Select the services you want Build OS to coordinate for this project."
    >
      <div className="mb-5 flex items-center justify-between gap-4 rounded-[16px] border border-ink/[0.07] bg-[#F7F8FA] px-4 py-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-ink/35">
            Selected services
          </p>
          <p className="mt-0.5 text-[12px] font-semibold text-ink">
            {selected.length === 0
              ? 'None selected yet'
              : `${selected.length} service${selected.length === 1 ? '' : 's'} selected`}
          </p>
        </div>

        <div className="flex h-8 min-w-8 items-center justify-center rounded-full bg-ink text-[10px] font-bold text-white">
          {selected.length}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {serviceOptions.map((service) => {
          const checked = selected.includes(service)

          return (
            <button
              key={service}
              type="button"
              onClick={() => onToggle(service)}
              aria-pressed={checked}
              className={[
                'group relative flex min-h-[68px] items-center gap-3 overflow-hidden rounded-[16px] border p-4 text-left transition-all duration-200',
                checked
                  ? 'border-[#12613E]/25 bg-[#F4F8F5] shadow-[0_7px_20px_rgba(18,97,62,0.06)]'
                  : 'border-ink/[0.07] bg-white hover:-translate-y-0.5 hover:border-ink/15 hover:shadow-[0_8px_20px_rgba(11,18,32,0.05)]',
              ].join(' ')}
            >
              {checked && (
                <span className="absolute inset-y-0 left-0 w-[3px] bg-[#12613E]" />
              )}

              <span
                className={[
                  'flex h-7 w-7 shrink-0 items-center justify-center rounded-[9px] border transition-all',
                  checked
                    ? 'border-[#12613E] bg-[#12613E] text-white'
                    : 'border-ink/[0.10] bg-[#F8F9FA] text-transparent',
                ].join(' ')}
              >
                <Check className="h-3.5 w-3.5" />
              </span>

              <span
                className={[
                  'text-[11px] font-semibold',
                  checked ? 'text-ink' : 'text-ink/65',
                ].join(' ')}
              >
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
      eyebrow="Investment planning"
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

      <InfoNotice tone="amber">
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
      eyebrow="Design standard"
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
              aria-pressed={selected}
              className={[
                'group relative overflow-hidden rounded-[18px] border p-5 text-left transition-all duration-200',
                selected
                  ? 'border-[#12613E]/25 bg-[#F4F8F5] shadow-[0_10px_25px_rgba(18,97,62,0.07)]'
                  : 'border-ink/[0.07] bg-white hover:-translate-y-0.5 hover:border-ink/15 hover:shadow-[0_10px_25px_rgba(11,18,32,0.055)]',
              ].join(' ')}
            >
              {selected && (
                <span className="absolute inset-y-0 left-0 w-[3px] bg-[#12613E]" />
              )}

              <div className="flex items-center justify-between gap-4">
                <div>
                  <p
                    className={[
                      'font-display text-[15px] font-semibold',
                      selected ? 'text-ink' : 'text-ink/80',
                    ].join(' ')}
                  >
                    {level.value}
                  </p>

                  {selected && (
                    <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[#12613E]">
                      Selected
                    </p>
                  )}
                </div>

                <span
                  className={[
                    'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all',
                    selected
                      ? 'border-[#12613E] bg-[#12613E] text-white'
                      : 'border-ink/[0.12] bg-white text-transparent',
                  ].join(' ')}
                >
                  <Check className="h-3 w-3" />
                </span>
              </div>

              <p className="mt-3 text-[11px] leading-5 text-ink/45">
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
      eyebrow="Project records"
      title="Document Upload"
      description="Identify the project and land documents currently available for review."
    >
      <div className="relative overflow-hidden rounded-[20px] border border-dashed border-ink/[0.13] bg-[#F7F8FA] p-7 text-center">
        <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#12613E]/[0.05] blur-2xl" />

        <div className="relative">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[15px] border border-ink/[0.07] bg-white text-ink/45 shadow-[0_5px_15px_rgba(11,18,32,0.04)]">
            <Upload className="h-5 w-5" strokeWidth={1.8} />
          </div>

          <p className="mt-4 font-display text-[15px] font-semibold text-ink">
            Project documents
          </p>

          <p className="mx-auto mt-1.5 max-w-md text-[11px] leading-5 text-ink/45">
            Select the document categories you have available. Actual file
            transfer can be connected to the document service/API.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-ink/35 shadow-[0_3px_10px_rgba(11,18,32,0.035)]">
            <FileText className="h-3 w-3" />
            {selected.length} selected
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {documentTypes.map((document) => {
          const checked = selected.includes(document)

          return (
            <button
              key={document}
              type="button"
              onClick={() => onToggle(document)}
              aria-pressed={checked}
              className={[
                'group flex min-h-[70px] items-center gap-3 rounded-[16px] border p-4 text-left transition-all',
                checked
                  ? 'border-[#12613E]/20 bg-[#F4F8F5] shadow-[0_7px_20px_rgba(18,97,62,0.055)]'
                  : 'border-ink/[0.07] bg-white hover:-translate-y-0.5 hover:border-ink/15 hover:shadow-[0_8px_20px_rgba(11,18,32,0.05)]',
              ].join(' ')}
            >
              <span
                className={[
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] transition-all',
                  checked
                    ? 'bg-[#12613E] text-white'
                    : 'bg-ink/[0.045] text-ink/35',
                ].join(' ')}
              >
                <FileText className="h-4 w-4" strokeWidth={1.7} />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-[11px] font-semibold text-ink">
                  {document}
                </span>

                <span
                  className={[
                    'mt-0.5 block text-[9px] font-medium',
                    checked ? 'text-[#12613E]' : 'text-ink/35',
                  ].join(' ')}
                >
                  {checked ? 'Available for review' : 'Not selected'}
                </span>
              </span>

              <span
                className={[
                  'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border',
                  checked
                    ? 'border-[#12613E] bg-[#12613E] text-white'
                    : 'border-ink/[0.11] text-transparent',
                ].join(' ')}
              >
                <Check className="h-3 w-3" />
              </span>
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
      eyebrow="Final verification"
      title="Review & Submit"
      description="Confirm your project details, selected services and available documents before submission."
    >
      <div className="mb-6 flex items-start gap-3 rounded-[18px] border border-[#12613E]/10 bg-[#F4F8F5] p-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#EAF4EE] text-[#12613E]">
          <ShieldCheck className="h-4 w-4" />
        </div>

        <div>
          <p className="text-[11px] font-bold text-ink">
            Your project profile is ready for review
          </p>

          <p className="mt-1 text-[10px] leading-5 text-ink/45">
            Check the information below before sending the project to Build OS
            approval.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <ReviewCard
          title="Project basics"
          number="01"
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
          number="02"
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
          number="03"
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
          number="04"
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
          number="05"
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
          number="06"
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

        <div className="relative overflow-hidden rounded-[18px] border border-[#B85C12]/15 bg-[#FBF5EF] p-5">
          <div className="absolute right-0 top-0 h-20 w-20 rounded-full bg-[#B85C12]/[0.06] blur-2xl" />

          <div className="relative flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#F5E8DD] text-[#B85C12]">
              <ShieldCheck className="h-4 w-4" />
            </div>

            <div>
              <p className="text-[11px] font-bold text-[#7A3F0C]">
                Project approval
              </p>

              <p className="mt-1 text-[10px] leading-5 text-[#7A3F0C]/65">
                After submission, Build OS Admin will review project
                completeness, client status, land documents, location risk,
                budget realism and project risk before the project proceeds.
              </p>
            </div>
          </div>
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
  eyebrow,
  title,
  description,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>
  eyebrow: string
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section>
      <div className="mb-7 flex items-start gap-4">
        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] bg-[#F3F5F7] text-ink/55">
          <Icon className="h-[17px] w-[17px]" strokeWidth={1.7} />
        </div>

        <div className="min-w-0">
          <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#B85C12]">
            {eyebrow}
          </p>

          <h2 className="mt-1 font-display text-[21px] font-semibold tracking-[-0.025em] text-ink">
            {title}
          </h2>

          <p className="mt-1 max-w-2xl text-[12px] leading-5 text-ink/45">
            {description}
          </p>
        </div>
      </div>

      {children}
    </section>
  )
}

function FieldGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">{children}</div>
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
    <label className="group block">
      <span className="mb-1.5 flex items-center text-[10px] font-bold tracking-[0.01em] text-ink/55">
        {label}

        {required && (
          <span className="ml-1 text-[#B85C12]" aria-label="required">
            *
          </span>
        )}
      </span>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="
          h-11
          w-full
          rounded-[13px]
          border
          border-ink/[0.09]
          bg-[#FBFCFD]
          px-3.5
          text-[12px]
          font-medium
          text-ink
          outline-none
          transition-all
          duration-200
          placeholder:text-ink/25
          hover:border-ink/[0.14]
          focus:border-ink/25
          focus:bg-white
          focus:ring-4
          focus:ring-ink/[0.035]
        "
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
    <label className="group block">
      <span className="mb-1.5 flex items-center text-[10px] font-bold tracking-[0.01em] text-ink/55">
        {label}

        {required && (
          <span className="ml-1 text-[#B85C12]" aria-label="required">
            *
          </span>
        )}
      </span>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="
          h-11
          w-full
          cursor-pointer
          rounded-[13px]
          border
          border-ink/[0.09]
          bg-[#FBFCFD]
          px-3.5
          text-[12px]
          font-medium
          text-ink
          outline-none
          transition-all
          duration-200
          hover:border-ink/[0.14]
          focus:border-ink/25
          focus:bg-white
          focus:ring-4
          focus:ring-ink/[0.035]
        "
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
    <label className="group block sm:col-span-2">
      <span className="mb-1.5 block text-[10px] font-bold tracking-[0.01em] text-ink/55">
        {label}
      </span>

      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={3}
        className="
          min-h-[92px]
          w-full
          resize-none
          rounded-[13px]
          border
          border-ink/[0.09]
          bg-[#FBFCFD]
          px-3.5
          py-3
          text-[12px]
          font-medium
          leading-5
          text-ink
          outline-none
          transition-all
          duration-200
          placeholder:text-ink/25
          hover:border-ink/[0.14]
          focus:border-ink/25
          focus:bg-white
          focus:ring-4
          focus:ring-ink/[0.035]
        "
      />
    </label>
  )
}

function InfoNotice({
  children,
  tone = 'neutral',
}: {
  children: React.ReactNode
  tone?: 'neutral' | 'green' | 'amber'
}) {
  const styles = {
    neutral: {
      wrapper: 'border-ink/[0.07] bg-[#F7F8FA]',
      dot: 'bg-ink/25',
      text: 'text-ink/45',
    },
    green: {
      wrapper: 'border-[#12613E]/10 bg-[#F4F8F5]',
      dot: 'bg-[#12613E]',
      text: 'text-[#12613E]/65',
    },
    amber: {
      wrapper: 'border-[#B85C12]/10 bg-[#FBF5EF]',
      dot: 'bg-[#B85C12]',
      text: 'text-[#7A3F0C]/65',
    },
  }

  const style = styles[tone]

  return (
    <div
      className={`mt-6 flex items-start gap-3 rounded-[15px] border px-4 py-3.5 ${style.wrapper}`}
    >
      <span
        className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${style.dot}`}
      />

      <p className={`text-[10px] leading-5 ${style.text}`}>{children}</p>
    </div>
  )
}

function ReviewCard({
  title,
  number,
  items,
}: {
  title: string
  number: string
  items: [string, string][]
}) {
  return (
    <div className="overflow-hidden rounded-[18px] border border-ink/[0.07] bg-white transition-shadow hover:shadow-[0_8px_25px_rgba(11,18,32,0.04)]">
      <div className="flex items-center justify-between border-b border-ink/[0.06] bg-[#F8F9FA] px-4 py-3.5">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[9px] font-bold tracking-[0.12em] text-ink/25">
            {number}
          </span>

          <h3 className="text-[11px] font-bold text-ink">{title}</h3>
        </div>

        <ChevronRight className="h-3.5 w-3.5 text-ink/20" />
      </div>

      <div className="grid gap-x-7 gap-y-5 p-4 sm:grid-cols-2">
        {items.map(([label, value]) => (
          <div key={label} className="min-w-0">
            <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-ink/30">
              {label}
            </p>

            <p className="mt-1.5 break-words text-[11px] font-semibold leading-5 text-ink/75">
              {value || 'Not provided'}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}