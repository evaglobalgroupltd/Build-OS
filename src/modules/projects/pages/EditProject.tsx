import { useMemo, useState } from 'react'
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  Construction,
  FileText,
  Info,
  Lock,
  Save,
  ShieldCheck,
  Upload,
  X,
} from 'lucide-react'
import type {
  Dispatch,
  ReactNode,
  SetStateAction,
} from 'react'

import { Card, CardBody } from '@/components/ui/Card'

const sections = [
  {
    id: 'basics',
    label: 'Project Basics',
    description: 'Identity & location',
  },
  {
    id: 'land',
    label: 'Land Details',
    description: 'Ownership & title',
  },
  {
    id: 'building',
    label: 'Building Profile',
    description: 'Specification',
  },
  {
    id: 'services',
    label: 'Service Requirements',
    description: 'Required services',
  },
  {
    id: 'budget',
    label: 'Budget & Timeline',
    description: 'Financial planning',
  },
  {
    id: 'finishing',
    label: 'Finishing Level',
    description: 'Specification standard',
  },
  {
    id: 'documents',
    label: 'Documents',
    description: 'Supporting records',
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

const initialProject: ProjectFormData = {
  projectName: 'Abuja Family Residence',
  state: 'FCT',
  city: 'Abuja',
  address: 'Maitama District',
  projectType: 'New construction',
  projectPurpose: 'Personal residence',
  contactPerson: '',
  communicationPreference: 'Email',

  landSize: '600 sqm',
  plotNumber: '',
  ownershipStatus: 'Owned',
  titleDocumentType: 'C of O',
  possessionStatus: 'In possession',
  hasDispute: 'No',
  surveyPlan: '',
  coordinates: '',

  buildingType: 'Detached house',
  floors: '2',
  bedroomsUnits: '4 bedrooms',
  useType: 'Residential',
  floorArea: '',
  parking: '4 cars',
  specialFeatures: '',
  accessibilityNeeds: '',

  services: ['Design', 'Approvals', 'Construction', 'Procurement', 'Monitoring'],

  budgetRange: '₦50M – ₦100M',
  fundingStatus: 'Partially funded',
  startDate: '',
  targetCompletionDate: '',
  urgency: 'Standard',
  timelineFlexibility: 'Moderately flexible',
  paymentStructure: 'By milestone',

  finishingLevel: 'Premium',
  documents: ['Survey plan', 'Title documents', 'C of O'],
}

export function EditProject() {
  const [activeSection, setActiveSection] =
    useState<(typeof sections)[number]['id']>('basics')

  const [form, setForm] = useState<ProjectFormData>(initialProject)
  const [saved, setSaved] = useState(false)
  const [showChangeRequest, setShowChangeRequest] = useState(false)

  const [changeRequest, setChangeRequest] = useState({
    requestedChange: '',
    reason: '',
    affectedPhase: '',
    costImpact: '',
    timelineImpact: '',
    supportingEvidence: '',
  })

  const activeIndex = useMemo(
    () => sections.findIndex((section) => section.id === activeSection),
    [activeSection],
  )

  const completionPercent = Math.round(
    ((activeIndex + 1) / sections.length) * 100,
  )

  const activeSectionData = sections[activeIndex]

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
    const exists = form.services.includes(service)

    update(
      'services',
      exists
        ? form.services.filter((item) => item !== service)
        : [...form.services, service],
    )
  }

  function toggleDocument(document: string) {
    const exists = form.documents.includes(document)

    update(
      'documents',
      exists
        ? form.documents.filter((item) => item !== document)
        : [...form.documents, document],
    )
  }

  function saveChanges() {
    /*
     * Replace with the projects API/service.
     *
     * Important:
     * Changes to project cost, timeline or payment must not be
     * silently persisted here. Those belong in the Change Request
     * workflow below.
     */
    setSaved(true)
  }

  function submitChangeRequest() {
    /*
     * Replace with the change-request API/service.
     */
    setShowChangeRequest(false)

    setChangeRequest({
      requestedChange: '',
      reason: '',
      affectedPhase: '',
      costImpact: '',
      timelineImpact: '',
      supportingEvidence: '',
    })
  }

  return (
    <div className="min-h-full pb-10">
      {/* ------------------------------------------------------------------ */}
      {/* Premium page header                                                */}
      {/* ------------------------------------------------------------------ */}

      <div className="mb-7">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="min-w-0">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#B85C12]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink/40">
                Project workspace
              </span>

              <span className="h-3 w-px bg-ink/10" />

              <span className="text-[10px] font-medium text-ink/35">
                Configuration
              </span>
            </div>

            <div className="flex items-start gap-4">
              <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-[16px] bg-ink text-white shadow-[0_12px_30px_rgba(20,25,22,0.12)] sm:flex">
                <Construction className="h-[19px] w-[19px]" />
              </div>

              <div>
                <h1 className="font-display text-[29px] font-semibold leading-tight tracking-[-0.035em] text-ink sm:text-[34px]">
                  Edit project
                </h1>

                <p className="mt-1.5 max-w-2xl text-[13px] leading-5 text-ink/50">
                  Update project information, specifications and supporting
                  records while keeping approved commitments protected.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="
                inline-flex items-center gap-2 rounded-full border
                border-ink/[0.09] bg-white px-4 py-2.5
                text-[11px] font-semibold text-ink
                transition-all duration-200
                hover:border-ink/20 hover:bg-ink/[0.02]
                hover:shadow-[0_8px_24px_rgba(20,25,22,0.05)]
              "
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back
            </button>

            <button
              type="button"
              onClick={saveChanges}
              className="
                inline-flex items-center gap-2 rounded-full
                bg-ink px-5 py-2.5
                text-[11px] font-bold text-white
                shadow-[0_10px_24px_rgba(20,25,22,0.12)]
                transition-all duration-200
                hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(20,25,22,0.16)]
              "
            >
              {saved ? (
                <CheckCircle2 className="h-3.5 w-3.5" />
              ) : (
                <Save className="h-3.5 w-3.5" />
              )}

              {saved ? 'Changes saved' : 'Save changes'}
            </button>
          </div>
        </div>

        {/* Progress rail */}
        <div className="mt-7 overflow-hidden rounded-[18px] border border-ink/[0.07] bg-white shadow-[0_8px_30px_rgba(20,25,22,0.035)]">
          <div className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-[#EAF4EE] text-[#12613E]">
                <ShieldCheck className="h-4 w-4" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-[11px] font-bold text-ink">
                  Project configuration
                </p>

                <p className="mt-0.5 truncate text-[10px] text-ink/40">
                  {activeSectionData?.label} · {activeSectionData?.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden h-1.5 w-32 overflow-hidden rounded-full bg-ink/[0.07] sm:block">
                <div
                  className="h-full rounded-full bg-[#12613E] transition-all duration-500"
                  style={{ width: `${completionPercent}%` }}
                />
              </div>

              <span className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.12em] text-ink/40">
                {activeIndex + 1} of {sections.length}
              </span>
            </div>
          </div>

          <div className="h-[2px] bg-ink/[0.04]">
            <div
              className="h-full bg-[#12613E] transition-all duration-500"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Change control                                                     */}
      {/* ------------------------------------------------------------------ */}

      <div className="mb-7 overflow-hidden rounded-[20px] border border-[#B85C12]/15 bg-[#F8EEE6]">
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="flex items-start gap-3.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#B85C12] shadow-sm">
              <AlertTriangle className="h-4 w-4" />
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#7A3F0C]">
                Protected commitments
              </p>

              <p className="mt-1 max-w-2xl text-[11px] leading-5 text-[#7A3F0C]/65">
                Changes affecting approved cost, timeline or payment terms must
                go through formal change control rather than being silently
                overwritten.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowChangeRequest(true)}
            className="
              inline-flex shrink-0 items-center justify-center gap-2
              rounded-full border border-[#B85C12]/20 bg-white
              px-4 py-2.5 text-[10px] font-bold uppercase
              tracking-[0.08em] text-[#7A3F0C]
              transition-all duration-200
              hover:border-[#B85C12]/35 hover:shadow-sm
            "
          >
            <AlertTriangle className="h-3 w-3" />
            Request change
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Main workspace                                                     */}
      {/* ------------------------------------------------------------------ */}

      <div className="grid gap-5 xl:grid-cols-[245px_minmax(0,1fr)]">
        {/* Section navigation */}
        <aside className="h-fit">
          <div className="overflow-hidden rounded-[22px] border border-ink/[0.07] bg-white shadow-[0_10px_35px_rgba(20,25,22,0.035)]">
            <div className="border-b border-ink/[0.06] px-5 py-4">
              <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-ink/35">
                Project sections
              </p>

              <p className="mt-1 text-[11px] text-ink/45">
                Navigate your project configuration.
              </p>
            </div>

            <div className="p-2.5">
              <div className="space-y-1">
                {sections.map((section, index) => {
                  const active = section.id === activeSection
                  const completed = index < activeIndex

                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => setActiveSection(section.id)}
                      className={[
                        'group relative flex w-full items-center gap-3 rounded-[15px] px-3 py-3 text-left transition-all duration-200',
                        active
                          ? 'bg-ink text-white shadow-[0_8px_20px_rgba(20,25,22,0.12)]'
                          : 'text-ink/55 hover:bg-ink/[0.035] hover:text-ink',
                      ].join(' ')}
                    >
                      <span
                        className={[
                          'flex h-7 w-7 shrink-0 items-center justify-center rounded-[10px] text-[9px] font-bold transition-colors',
                          active
                            ? 'bg-white/12 text-white'
                            : completed
                              ? 'bg-[#EAF4EE] text-[#12613E]'
                              : 'bg-ink/[0.045] text-ink/35',
                        ].join(' ')}
                      >
                        {completed ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          index + 1
                        )}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span
                          className={[
                            'block truncate text-[11px] font-bold',
                            active ? 'text-white' : 'text-ink/70',
                          ].join(' ')}
                        >
                          {section.label}
                        </span>

                        <span
                          className={[
                            'mt-0.5 block truncate text-[9px]',
                            active ? 'text-white/45' : 'text-ink/35',
                          ].join(' ')}
                        >
                          {section.description}
                        </span>
                      </span>

                      {active && (
                        <ChevronRight className="h-3.5 w-3.5 shrink-0 text-white/50" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="mt-3 hidden rounded-[18px] border border-ink/[0.07] bg-[#F6F8F5] p-4 xl:block">
            <div className="flex items-start gap-2.5">
              <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink/30" />

              <div>
                <p className="text-[10px] font-bold text-ink/65">
                  Controlled editing
                </p>

                <p className="mt-1 text-[9px] leading-4 text-ink/40">
                  Approved financial and schedule commitments remain protected
                  through the change-control workflow.
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Editor */}
        <main className="min-w-0">
          <div className="overflow-hidden rounded-[24px] border border-ink/[0.07] bg-white shadow-[0_12px_45px_rgba(20,25,22,0.045)]">
            <div className="border-b border-ink/[0.06] px-5 py-5 sm:px-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-ink/35">
                    Section {String(activeIndex + 1).padStart(2, '0')}
                  </p>

                  <h2 className="mt-1 font-display text-[21px] font-semibold tracking-[-0.025em] text-ink">
                    {activeSectionData?.label}
                  </h2>

                  <p className="mt-1 text-[11px] text-ink/45">
                    {activeSectionData?.description}
                  </p>
                </div>

                <div className="hidden h-9 w-9 items-center justify-center rounded-xl bg-[#F4F6F3] text-ink/40 sm:flex">
                  {activeSection === 'documents' ? (
                    <FileText className="h-4 w-4" />
                  ) : activeSection === 'land' ? (
                    <ShieldCheck className="h-4 w-4" />
                  ) : activeSection === 'budget' ? (
                    <Lock className="h-4 w-4" />
                  ) : (
                    <Construction className="h-4 w-4" />
                  )}
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-7">
              {activeSection === 'basics' && (
                <ProjectBasics form={form} update={update} />
              )}

              {activeSection === 'land' && (
                <LandDetails form={form} update={update} />
              )}

              {activeSection === 'building' && (
                <BuildingProfile form={form} update={update} />
              )}

              {activeSection === 'services' && (
                <ServiceRequirements
                  selected={form.services}
                  onToggle={toggleService}
                />
              )}

              {activeSection === 'budget' && (
                <BudgetTimeline form={form} update={update} />
              )}

              {activeSection === 'finishing' && (
                <FinishingLevel
                  value={form.finishingLevel}
                  onChange={(value) => update('finishingLevel', value)}
                />
              )}

              {activeSection === 'documents' && (
                <DocumentUpload
                  selected={form.documents}
                  onToggle={toggleDocument}
                />
              )}
            </div>

            {/* Bottom navigation */}
            <div className="flex flex-col-reverse gap-3 border-t border-ink/[0.06] bg-[#FCFCFB] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
              <button
                type="button"
                disabled={activeIndex === 0}
                onClick={() =>
                  setActiveSection(
                    sections[Math.max(0, activeIndex - 1)].id,
                  )
                }
                className="
                  inline-flex items-center justify-center gap-2
                  rounded-full border border-ink/[0.09] bg-white
                  px-4 py-2.5 text-[10px] font-bold text-ink
                  transition-all duration-200
                  hover:border-ink/20 hover:bg-ink/[0.02]
                  disabled:cursor-not-allowed disabled:opacity-25
                "
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Previous
              </button>

              <div className="flex items-center justify-end gap-2">
                <span className="mr-2 hidden text-[9px] font-medium uppercase tracking-[0.12em] text-ink/30 sm:inline">
                  {completionPercent}% configured
                </span>

                {activeIndex < sections.length - 1 ? (
                  <button
                    type="button"
                    onClick={() =>
                      setActiveSection(sections[activeIndex + 1].id)
                    }
                    className="
                      inline-flex items-center justify-center gap-2
                      rounded-full bg-ink px-5 py-2.5
                      text-[10px] font-bold text-white
                      shadow-[0_8px_20px_rgba(20,25,22,0.1)]
                      transition-all duration-200
                      hover:-translate-y-0.5
                    "
                  >
                    Next section
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={saveChanges}
                    className="
                      inline-flex items-center justify-center gap-2
                      rounded-full bg-ink px-5 py-2.5
                      text-[10px] font-bold text-white
                      shadow-[0_8px_20px_rgba(20,25,22,0.1)]
                      transition-all duration-200
                      hover:-translate-y-0.5
                    "
                  >
                    <Save className="h-3.5 w-3.5" />
                    Save changes
                  </button>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {showChangeRequest && (
        <ChangeRequestModal
          value={changeRequest}
          onChange={setChangeRequest}
          onClose={() => setShowChangeRequest(false)}
          onSubmit={submitChangeRequest}
        />
      )}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Project Basics                                                              */
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
    <EditorSection
      eyebrow="Identity & location"
      title="Project basics"
      description="Update the project's identity, location and communication details."
    >
      <FieldGrid>
        <Field
          label="Project name"
          value={form.projectName}
          onChange={(value) => update('projectName', value)}
          placeholder="Enter project name"
        />

        <SelectField
          label="State"
          value={form.state}
          onChange={(value) => update('state', value)}
          options={['FCT', 'Lagos', 'Rivers', 'Kaduna', 'Oyo', 'Kano']}
        />

        <Field
          label="City"
          value={form.city}
          onChange={(value) => update('city', value)}
        />

        <Field
          label="Address / landmark"
          value={form.address}
          onChange={(value) => update('address', value)}
        />

        <SelectField
          label="Project type"
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
        />

        <SelectField
          label="Communication preference"
          value={form.communicationPreference}
          onChange={(value) => update('communicationPreference', value)}
          options={['Email', 'Phone', 'SMS', 'WhatsApp']}
        />
      </FieldGrid>
    </EditorSection>
  )
}

/* -------------------------------------------------------------------------- */
/* Land Details                                                                */
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
    <EditorSection
      eyebrow="Ownership & verification"
      title="Land details"
      description="Update available land, ownership and title information."
    >
      <FieldGrid>
        <Field
          label="Land size"
          value={form.landSize}
          onChange={(value) => update('landSize', value)}
        />

        <Field
          label="Plot number"
          value={form.plotNumber}
          onChange={(value) => update('plotNumber', value)}
        />

        <SelectField
          label="Ownership status"
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
        />

        <Field
          label="Coordinates"
          value={form.coordinates}
          onChange={(value) => update('coordinates', value)}
        />
      </FieldGrid>

      <LockedNotice>
        Changes to land ownership, title status or disputed land may require
        additional verification before they become effective.
      </LockedNotice>
    </EditorSection>
  )
}

/* -------------------------------------------------------------------------- */
/* Building Profile                                                            */
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
    <EditorSection
      eyebrow="Specification"
      title="Building profile"
      description="Update the building specification and functional requirements."
    >
      <FieldGrid>
        <SelectField
          label="Building type"
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
        />

        <Field
          label="Bedrooms / units"
          value={form.bedroomsUnits}
          onChange={(value) => update('bedroomsUnits', value)}
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
        />

        <Field
          label="Parking"
          value={form.parking}
          onChange={(value) => update('parking', value)}
        />

        <TextAreaField
          label="Special features"
          value={form.specialFeatures}
          onChange={(value) => update('specialFeatures', value)}
        />

        <TextAreaField
          label="Accessibility needs"
          value={form.accessibilityNeeds}
          onChange={(value) => update('accessibilityNeeds', value)}
        />
      </FieldGrid>
    </EditorSection>
  )
}

/* -------------------------------------------------------------------------- */
/* Services                                                                    */
/* -------------------------------------------------------------------------- */

function ServiceRequirements({
  selected,
  onToggle,
}: {
  selected: string[]
  onToggle: (service: string) => void
}) {
  return (
    <EditorSection
      eyebrow="Scope of engagement"
      title="Service requirements"
      description="Select the services required for this project."
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
                'group flex min-h-[72px] items-center gap-3 rounded-[16px] border p-4 text-left transition-all duration-200',
                checked
                  ? 'border-[#12613E]/20 bg-[#EAF4EE]/60 shadow-[0_6px_18px_rgba(18,97,62,0.05)]'
                  : 'border-ink/[0.08] bg-white hover:-translate-y-0.5 hover:border-ink/15 hover:bg-ink/[0.015] hover:shadow-[0_8px_22px_rgba(20,25,22,0.045)]',
              ].join(' ')}
            >
              <span
                className={[
                  'flex h-7 w-7 shrink-0 items-center justify-center rounded-[10px] border transition-all duration-200',
                  checked
                    ? 'border-[#12613E] bg-[#12613E] text-white'
                    : 'border-ink/10 bg-ink/[0.025] text-transparent group-hover:border-ink/20',
                ].join(' ')}
              >
                {checked && <Check className="h-3.5 w-3.5" />}
              </span>

              <span
                className={[
                  'text-[11px] font-semibold',
                  checked ? 'text-ink' : 'text-ink/60',
                ].join(' ')}
              >
                {service}
              </span>
            </button>
          )
        })}
      </div>

      <div className="mt-5 flex items-center gap-2 text-[10px] text-ink/40">
        <Info className="h-3 w-3" />
        {selected.length} service{selected.length === 1 ? '' : 's'} selected
      </div>
    </EditorSection>
  )
}

/* -------------------------------------------------------------------------- */
/* Budget & Timeline                                                           */
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
    <EditorSection
      eyebrow="Financial planning"
      title="Budget & timeline"
      description="Review current budget and schedule commitments. Changes affecting these commitments must use Change Request."
    >
      <div className="mb-6 overflow-hidden rounded-[17px] border border-ink/[0.07] bg-[#F6F8F5]">
        <div className="flex items-start gap-3 p-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-white text-ink/40">
            <Lock className="h-3.5 w-3.5" />
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-ink/55">
              Protected project commitments
            </p>

            <p className="mt-1 text-[10px] leading-5 text-ink/40">
              These values represent project commitments. Use the Change
              Request workflow when a proposed edit changes approved cost,
              timeline or payment terms.
            </p>
          </div>
        </div>
      </div>

      <FieldGrid>
        <SelectField
          label="Budget range"
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
    </EditorSection>
  )
}

/* -------------------------------------------------------------------------- */
/* Finishing Level                                                             */
/* -------------------------------------------------------------------------- */

function FinishingLevel({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) {
  const levels = [
    ['Basic', 'Essential finishes and practical specifications.'],
    ['Standard', 'Balanced specifications for everyday use.'],
    ['Premium', 'Higher-quality materials and upgraded finishes.'],
    ['Luxury', 'High-end specifications, finishes and fittings.'],
    ['Custom', 'A bespoke specification defined for the project.'],
  ]

  return (
    <EditorSection
      eyebrow="Material & specification"
      title="Finishing level"
      description="Update the expected finishing standard."
    >
      <div className="grid gap-3 md:grid-cols-2">
        {levels.map(([name, description]) => {
          const selected = value === name

          return (
            <button
              key={name}
              type="button"
              onClick={() => onChange(name)}
              className={[
                'group relative overflow-hidden rounded-[18px] border p-5 text-left transition-all duration-200',
                selected
                  ? 'border-ink bg-ink text-white shadow-[0_12px_30px_rgba(20,25,22,0.12)]'
                  : 'border-ink/[0.08] bg-white hover:-translate-y-0.5 hover:border-ink/15 hover:shadow-[0_10px_28px_rgba(20,25,22,0.05)]',
              ].join(' ')}
            >
              {selected && (
                <div className="absolute right-0 top-0 h-20 w-20 translate-x-8 -translate-y-8 rounded-full bg-white/[0.05]" />
              )}

              <div className="relative flex items-center justify-between gap-4">
                <p
                  className={[
                    'font-display text-[15px] font-semibold',
                    selected ? 'text-white' : 'text-ink',
                  ].join(' ')}
                >
                  {name}
                </p>

                <span
                  className={[
                    'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border',
                    selected
                      ? 'border-white/20 bg-white text-ink'
                      : 'border-ink/10 bg-ink/[0.025] text-transparent',
                  ].join(' ')}
                >
                  {selected && <Check className="h-3 w-3" />}
                </span>
              </div>

              <p
                className={[
                  'relative mt-2 max-w-sm text-[10px] leading-5',
                  selected ? 'text-white/55' : 'text-ink/45',
                ].join(' ')}
              >
                {description}
              </p>
            </button>
          )
        })}
      </div>

      <LockedNotice>
        Finishing level affects cost estimates and material categories. A
        change that alters approved cost should therefore be handled through
        Change Request.
      </LockedNotice>
    </EditorSection>
  )
}

/* -------------------------------------------------------------------------- */
/* Documents                                                                   */
/* -------------------------------------------------------------------------- */

function DocumentUpload({
  selected,
  onToggle,
}: {
  selected: string[]
  onToggle: (document: string) => void
}) {
  return (
    <EditorSection
      eyebrow="Project records"
      title="Project documents"
      description="Update the document categories associated with the project."
    >
      <div className="group relative overflow-hidden rounded-[20px] border border-dashed border-ink/15 bg-[#F7F8F6] p-7 text-center transition-all duration-200 hover:border-ink/25 hover:bg-[#F5F7F4]">
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-[14px] bg-white text-ink/45 shadow-[0_5px_18px_rgba(20,25,22,0.05)]">
          <Upload className="h-[18px] w-[18px]" />
        </div>

        <p className="mt-4 font-display text-[15px] font-semibold text-ink">
          Add or replace project documents
        </p>

        <p className="mx-auto mt-1.5 max-w-lg text-[10px] leading-5 text-ink/40">
          Actual file storage and upload handling should be connected to the
          project's document service.
        </p>

        <button
          type="button"
          className="mt-4 rounded-full border border-ink/[0.09] bg-white px-4 py-2 text-[10px] font-bold text-ink shadow-sm transition hover:border-ink/20"
        >
          Choose files
        </button>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {documentTypes.map((document) => {
          const checked = selected.includes(document)

          return (
            <button
              key={document}
              type="button"
              onClick={() => onToggle(document)}
              className={[
                'group flex items-center gap-3 rounded-[16px] border p-4 text-left transition-all duration-200',
                checked
                  ? 'border-[#12613E]/15 bg-[#EAF4EE]/45'
                  : 'border-ink/[0.08] bg-white hover:border-ink/15 hover:bg-ink/[0.015]',
              ].join(' ')}
            >
              <span
                className={[
                  'flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px]',
                  checked
                    ? 'bg-[#12613E] text-white'
                    : 'bg-ink/[0.045] text-ink/35',
                ].join(' ')}
              >
                <FileText className="h-4 w-4" />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-[11px] font-bold text-ink">
                  {document}
                </span>

                <span className="mt-0.5 block text-[9px] text-ink/35">
                  {checked ? 'Document available' : 'Not available'}
                </span>
              </span>

              {checked && (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#12613E]" />
              )}
            </button>
          )
        })}
      </div>
    </EditorSection>
  )
}

/* -------------------------------------------------------------------------- */
/* Change Request                                                              */
/* -------------------------------------------------------------------------- */

function ChangeRequestModal({
  value,
  onChange,
  onClose,
  onSubmit,
}: {
  value: {
    requestedChange: string
    reason: string
    affectedPhase: string
    costImpact: string
    timelineImpact: string
    supportingEvidence: string
  }
  onChange: Dispatch<
    SetStateAction<{
      requestedChange: string
      reason: string
      affectedPhase: string
      costImpact: string
      timelineImpact: string
      supportingEvidence: string
    }>
  >
  onClose: () => void
  onSubmit: () => void
}) {
  return (
    <div
      className="
        fixed inset-0 z-50 flex items-center justify-center
        bg-ink/35 p-4 backdrop-blur-md
      "
      role="dialog"
      aria-modal="true"
      aria-labelledby="change-request-title"
    >
      <div className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-[26px] border border-white/20 bg-white shadow-[0_30px_100px_rgba(0,0,0,0.2)]">
        {/* Modal header */}
        <div className="relative overflow-hidden border-b border-ink/[0.07] bg-[#FAFAF8] px-6 py-6 sm:px-7">
          <div className="absolute right-0 top-0 h-32 w-32 translate-x-10 -translate-y-16 rounded-full bg-[#B85C12]/[0.045]" />

          <div className="relative flex items-start justify-between gap-5">
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] bg-[#F8EEE6] text-[#B85C12]">
                <AlertTriangle className="h-[17px] w-[17px]" />
              </div>

              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.17em] text-ink/35">
                  Project change control
                </p>

                <h2
                  id="change-request-title"
                  className="mt-1 font-display text-[21px] font-semibold tracking-[-0.025em] text-ink"
                >
                  Submit Change Request
                </h2>

                <p className="mt-1.5 max-w-lg text-[10px] leading-5 text-ink/45">
                  Use this workflow for changes affecting project scope,
                  budget, timeline or payment.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close change request"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/[0.07] bg-white text-ink/35 transition hover:border-ink/15 hover:text-ink"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Modal body */}
        <div className="min-h-0 flex-1 space-y-5 overflow-y-auto p-6 sm:p-7">
          <TextAreaField
            label="Requested change"
            value={value.requestedChange}
            onChange={(requestedChange) =>
              onChange((previous) => ({
                ...previous,
                requestedChange,
              }))
            }
            placeholder="Describe exactly what you want changed."
          />

          <TextAreaField
            label="Reason"
            value={value.reason}
            onChange={(reason) =>
              onChange((previous) => ({
                ...previous,
                reason,
              }))
            }
            placeholder="Why is this change required?"
          />

          <FieldGrid>
            <Field
              label="Affected phase"
              value={value.affectedPhase}
              onChange={(affectedPhase) =>
                onChange((previous) => ({
                  ...previous,
                  affectedPhase,
                }))
              }
              placeholder="e.g. Roofing"
            />

            <Field
              label="Cost impact"
              value={value.costImpact}
              onChange={(costImpact) =>
                onChange((previous) => ({
                  ...previous,
                  costImpact,
                }))
              }
              placeholder="e.g. +₦4,500,000"
            />

            <Field
              label="Timeline impact"
              value={value.timelineImpact}
              onChange={(timelineImpact) =>
                onChange((previous) => ({
                  ...previous,
                  timelineImpact,
                }))
              }
              placeholder="e.g. +3 weeks"
            />
          </FieldGrid>

          <TextAreaField
            label="Supporting evidence"
            value={value.supportingEvidence}
            onChange={(supportingEvidence) =>
              onChange((previous) => ({
                ...previous,
                supportingEvidence,
              }))
            }
            placeholder="Reference supporting documents, site evidence or other information."
          />

          <div className="overflow-hidden rounded-[18px] border border-ink/[0.07] bg-[#F6F8F5]">
            <div className="flex items-start gap-3 p-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-white text-[#12613E]">
                <ShieldCheck className="h-3.5 w-3.5" />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-ink/60">
                  Approval workflow
                </p>

                <p className="mt-1 text-[10px] leading-5 text-ink/40">
                  After submission, the appropriate contractor/professional
                  and PM inputs can be recorded, followed by client approval.
                  The change must be approved and recorded before it affects
                  cost, timeline or payment.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal footer */}
        <div className="flex flex-col-reverse gap-2 border-t border-ink/[0.07] bg-[#FCFCFB] px-6 py-4 sm:flex-row sm:justify-end sm:px-7">
          <button
            type="button"
            onClick={onClose}
            className="
              rounded-full border border-ink/[0.09] bg-white
              px-5 py-2.5 text-[10px] font-bold text-ink
              transition hover:border-ink/20 hover:bg-ink/[0.02]
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onSubmit}
            className="
              inline-flex items-center justify-center gap-2
              rounded-full bg-ink px-5 py-2.5
              text-[10px] font-bold text-white
              shadow-[0_8px_20px_rgba(20,25,22,0.1)]
              transition hover:-translate-y-0.5
            "
          >
            Submit Change Request
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Shared UI                                                                   */
/* -------------------------------------------------------------------------- */

function EditorSection({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <section>
      <div className="mb-6">
        <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-ink/35">
          {eyebrow}
        </p>

        <h2 className="mt-1.5 font-display text-[19px] font-semibold tracking-[-0.025em] text-ink">
          {title}
        </h2>

        <p className="mt-1 text-[11px] leading-5 text-ink/45">
          {description}
        </p>
      </div>

      {children}
    </section>
  )
}

function FieldGrid({ children }: { children: ReactNode }) {
  return <div className="grid gap-5 sm:grid-cols-2">{children}</div>
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: string
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.04em] text-ink/55">
        {label}
      </span>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="
          h-11 w-full rounded-[13px]
          border border-ink/[0.09] bg-white
          px-3.5 text-[12px] font-medium text-ink
          outline-none
          placeholder:text-ink/25
          transition-all duration-200
          hover:border-ink/15
          focus:border-ink/30
          focus:ring-4 focus:ring-ink/[0.035]
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
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: string[]
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.04em] text-ink/55">
        {label}
      </span>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="
          h-11 w-full rounded-[13px]
          border border-ink/[0.09] bg-white
          px-3.5 text-[12px] font-medium text-ink
          outline-none
          transition-all duration-200
          hover:border-ink/15
          focus:border-ink/30
          focus:ring-4 focus:ring-ink/[0.035]
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
    <label className="block">
      <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.04em] text-ink/55">
        {label}
      </span>

      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={4}
        className="
          w-full resize-none rounded-[13px]
          border border-ink/[0.09] bg-white
          px-3.5 py-3 text-[12px] font-medium leading-5 text-ink
          outline-none
          placeholder:text-ink/25
          transition-all duration-200
          hover:border-ink/15
          focus:border-ink/30
          focus:ring-4 focus:ring-ink/[0.035]
        "
      />
    </label>
  )
}

function LockedNotice({ children }: { children: ReactNode }) {
  return (
    <div className="mt-6 overflow-hidden rounded-[17px] border border-ink/[0.07] bg-[#F6F8F5]">
      <div className="flex items-start gap-3 p-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-white text-ink/35">
          <Lock className="h-3.5 w-3.5" />
        </div>

        <p className="pt-0.5 text-[10px] leading-5 text-ink/45">
          {children}
        </p>
      </div>
    </div>
  )
}