import { useMemo, useState } from 'react'
import {
  AlertTriangle,
  ArrowLeft,
  Check,
  CheckCircle2,
  Construction,
  FileText,
  Lock,
  Save,
  Upload,
} from 'lucide-react'
import { Card, CardBody } from '@/components/ui/Card'

const sections = [
  {
    id: 'basics',
    label: 'Project Basics',
  },
  {
    id: 'land',
    label: 'Land Details',
  },
  {
    id: 'building',
    label: 'Building Profile',
  },
  {
    id: 'services',
    label: 'Service Requirements',
  },
  {
    id: 'budget',
    label: 'Budget & Timeline',
  },
  {
    id: 'finishing',
    label: 'Finishing Level',
  },
  {
    id: 'documents',
    label: 'Documents',
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
     *
     * BRD 19.1 requires:
     * - Project ID
     * - Requested change
     * - Reason
     * - Affected phase
     * - Cost impact
     * - Timeline impact
     * - Supporting evidence
     * - Contractor comment
     * - PM recommendation
     * - Client approval
     *
     * The latter three are added by the appropriate workflow actors,
     * not directly editable by the client here.
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
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardBody>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink text-white">
                <Construction className="h-5 w-5" />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink/35">
                  Edit project
                </p>

                <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight text-ink">
                  {form.projectName || 'Project'}
                </h1>

                <p className="mt-1 text-sm text-ink/45">
                  Update project information and supporting documentation.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-xs font-semibold text-ink hover:bg-ink/[0.03]"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back
              </button>

              <button
                type="button"
                onClick={saveChanges}
                className="inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white hover:opacity-90"
              >
                <Save className="h-3.5 w-3.5" />
                {saved ? 'Changes saved' : 'Save changes'}
              </button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Change-control notice */}
      <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />

          <div className="min-w-0">
            <p className="text-xs font-semibold text-amber-900">
              Changes affecting cost, timeline or payment require approval
            </p>

            <p className="mt-1 text-xs leading-5 text-amber-900/60">
              Do not directly edit approved financial or schedule commitments.
              Submit a formal Change Request so the change can be reviewed,
              approved and recorded.
            </p>

            <button
              type="button"
              onClick={() => setShowChangeRequest(true)}
              className="mt-3 inline-flex items-center gap-2 rounded-lg border border-amber-700/20 bg-white px-3 py-2 text-[11px] font-semibold text-amber-900"
            >
              <AlertTriangle className="h-3 w-3" />
              Request a project change
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
        {/* Section navigation */}
        <Card className="h-fit">
          <CardBody className="p-2">
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
                      'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors',
                      active
                        ? 'bg-ink text-white'
                        : 'text-ink/55 hover:bg-ink/[0.03]',
                    ].join(' ')}
                  >
                    <span
                      className={[
                        'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold',
                        active
                          ? 'bg-white/15 text-white'
                          : completed
                            ? 'bg-emerald-500/10 text-emerald-700'
                            : 'bg-ink/5 text-ink/40',
                      ].join(' ')}
                    >
                      {completed ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        index + 1
                      )}
                    </span>

                    <span className="text-xs font-semibold">
                      {section.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </CardBody>
        </Card>

        {/* Editor */}
        <Card>
          <CardBody>
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

            <div className="mt-8 flex items-center justify-between border-t border-line pt-5">
              <button
                type="button"
                disabled={activeIndex === 0}
                onClick={() =>
                  setActiveSection(sections[Math.max(0, activeIndex - 1)].id)
                }
                className="inline-flex items-center gap-2 rounded-xl border border-line px-4 py-2.5 text-xs font-semibold text-ink disabled:opacity-30"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Previous
              </button>

              {activeIndex < sections.length - 1 ? (
                <button
                  type="button"
                  onClick={() =>
                    setActiveSection(sections[activeIndex + 1].id)
                  }
                  className="rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white"
                >
                  Next section
                </button>
              ) : (
                <button
                  type="button"
                  onClick={saveChanges}
                  className="inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white"
                >
                  <Save className="h-3.5 w-3.5" />
                  Save changes
                </button>
              )}
            </div>
          </CardBody>
        </Card>
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
      title="Project Basics"
      description="Update the project's identity, location and communication details."
    >
      <FieldGrid>
        <Field
          label="Project name"
          value={form.projectName}
          onChange={(value) => update('projectName', value)}
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
      title="Land Details"
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
      title="Building Profile"
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
      title="Service Requirements"
      description="Update the services required for this project."
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
                'flex items-center gap-3 rounded-xl border p-4 text-left',
                checked
                  ? 'border-ink bg-ink/[0.03]'
                  : 'border-line hover:bg-ink/[0.02]',
              ].join(' ')}
            >
              <span
                className={[
                  'flex h-5 w-5 items-center justify-center rounded-md border',
                  checked ? 'border-ink bg-ink text-white' : 'border-line',
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
      title="Budget & Timeline"
      description="Review current budget and schedule commitments. Changes affecting these commitments must use Change Request."
    >
      <div className="mb-5 flex items-start gap-3 rounded-xl border border-line bg-paper-2 p-4">
        <Lock className="mt-0.5 h-4 w-4 shrink-0 text-ink/40" />

        <p className="text-xs leading-5 text-ink/50">
          These values represent project commitments. Use the Change Request
          workflow when a proposed edit changes approved cost, timeline or
          payment terms.
        </p>
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
      title="Finishing Level"
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
                'rounded-xl border p-5 text-left',
                selected
                  ? 'border-ink bg-ink/[0.03]'
                  : 'border-line hover:bg-ink/[0.02]',
              ].join(' ')}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-ink">{name}</p>

                <span
                  className={[
                    'flex h-5 w-5 items-center justify-center rounded-full border',
                    selected ? 'border-ink bg-ink text-white' : 'border-line',
                  ].join(' ')}
                >
                  {selected && <Check className="h-3 w-3" />}
                </span>
              </div>

              <p className="mt-2 text-xs leading-5 text-ink/45">
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
      title="Project Documents"
      description="Update the document categories associated with the project."
    >
      <div className="rounded-xl border border-dashed border-line bg-paper-2 p-6 text-center">
        <Upload className="mx-auto h-5 w-5 text-ink/35" />

        <p className="mt-3 text-sm font-semibold text-ink">
          Add or replace project documents
        </p>

        <p className="mx-auto mt-1 max-w-lg text-xs leading-5 text-ink/45">
          Actual file storage and upload handling should be connected to the
          project's document service.
        </p>
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
                'flex items-center gap-3 rounded-xl border p-4 text-left',
                checked
                  ? 'border-ink bg-ink/[0.03]'
                  : 'border-line hover:bg-ink/[0.02]',
              ].join(' ')}
            >
              <span
                className={[
                  'flex h-8 w-8 items-center justify-center rounded-lg',
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
                  {checked ? 'Available' : 'Not available'}
                </span>
              </span>

              {checked && (
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
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
  onChange: React.Dispatch<
    React.SetStateAction<{
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/30 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-line bg-white shadow-xl">
        <div className="border-b border-line px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                Project change control
              </p>

              <h2 className="mt-1 font-display text-xl font-semibold text-ink">
                Submit Change Request
              </h2>

              <p className="mt-1 text-xs leading-5 text-ink/45">
                Use this process for changes affecting project scope, budget,
                timeline or payment.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-2 py-1 text-sm text-ink/40 hover:bg-ink/5"
            >
              ×
            </button>
          </div>
        </div>

        <div className="space-y-5 p-6">
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
            placeholder="Reference the supporting documents, site evidence or other information."
          />

          <div className="rounded-xl border border-line bg-paper-2 p-4">
            <p className="text-xs font-semibold text-ink">
              Approval workflow
            </p>

            <p className="mt-1 text-xs leading-5 text-ink/45">
              After submission, the appropriate contractor/professional and PM
              inputs can be recorded, followed by client approval. The change
              must be approved and recorded before it affects cost, timeline or
              payment.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-line px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-line px-4 py-2.5 text-xs font-semibold text-ink"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onSubmit}
            className="rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-white"
          >
            Submit Change Request
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
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section>
      <div className="mb-6">
        <h2 className="font-display text-lg font-semibold text-ink">
          {title}
        </h2>

        <p className="mt-1 text-xs leading-5 text-ink/45">
          {description}
        </p>
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
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: string
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-ink/65">
        {label}
      </span>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-10 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink outline-none placeholder:text-ink/25 focus:border-ink/30 focus:ring-2 focus:ring-ink/5"
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
      <span className="mb-1.5 block text-xs font-semibold text-ink/65">
        {label}
      </span>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink outline-none focus:border-ink/30 focus:ring-2 focus:ring-ink/5"
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
      <span className="mb-1.5 block text-xs font-semibold text-ink/65">
        {label}
      </span>

      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full resize-none rounded-xl border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none placeholder:text-ink/25 focus:border-ink/30 focus:ring-2 focus:ring-ink/5"
      />
    </label>
  )
}

function LockedNotice({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 flex items-start gap-3 rounded-xl border border-line bg-paper-2 p-4">
      <Lock className="mt-0.5 h-4 w-4 shrink-0 text-ink/35" />

      <p className="text-xs leading-5 text-ink/45">{children}</p>
    </div>
  )
}