"""
One-time scaffolding script: generates placeholder page components, a
services stub, and a types stub for every module page listed below.

This is NOT part of the app runtime — it's a build tool. Safe to delete
once you've started replacing placeholders with real implementations,
or re-run it (it's idempotent skip-if-exists) if you add new module pages
to MODULE_MAP.
"""
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "src")

# module_key: (Display Label, BRD reference, [(PageComponentName, "Human title", "one-line description"), ...])
MODULE_MAP = {
    "authentication": ("Authentication", "Sec. 32.1", [
        ("ForgotPassword", "Forgot Password", "Request a password reset link."),
        ("ResetPassword", "Reset Password", "Set a new password from a reset link."),
        ("VerifyEmail", "Verify Email", "Confirm an email address via one-time link."),
        ("VerifyPhone", "Verify Phone", "Confirm a phone number via OTP."),
        ("MFA", "Multi-Factor Authentication", "Second-factor verification during login."),
    ]),
    "users": ("Users", "Sec. 15.1", [
        ("Profile", "Profile", "View and edit personal profile information."),
        ("AccountSettings", "Account Settings", "Manage account preferences and notifications."),
        ("Security", "Security", "Manage password, MFA, and active sessions."),
    ]),
    "organizations": ("Organizations", "Sec. 4.2", [
        ("OrganizationDashboard", "Organization Dashboard", "Overview of an enterprise tenant."),
        ("OrganizationProfile", "Organization Profile", "Company details, branding and settings."),
        ("Members", "Members", "Manage organization members."),
        ("Roles", "Roles", "Define organization-level roles."),
        ("Permissions", "Permissions", "Configure permission sets per role."),
    ]),
    "verification": ("Verification", "Sec. 15.2", [
        ("Verification", "Verification", "Start or continue the identity/business verification flow."),
        ("VerificationStatus", "Verification Status", "Track submitted verification status."),
        ("DocumentSubmission", "Document Submission", "Upload verification documents (NIN, BVN, CAC, etc.)."),
        ("AdminVerificationQueue", "Verification Queue", "Admin queue for reviewing submitted verifications."),
    ]),
    "projects": ("Projects", "Sec. 16", [
        ("ProjectOverview", "Project Overview", "Summary view of a single project."),
        ("CreateProject", "Create Project", "Eight-step project creation wizard."),
        ("EditProject", "Edit Project", "Edit project details after creation."),
        ("ProjectDetails", "Project Details", "Full detail view of a project."),
        ("ProjectDocuments", "Project Documents", "Documents attached to a project."),
        ("ProjectTeam", "Project Team", "Contractor, PM and professionals assigned to a project."),
        ("ProjectTimeline", "Project Timeline", "Chronological timeline of project events."),
        ("ProjectSettings", "Project Settings", "Configure project-level settings."),
    ]),
    "milestones": ("Milestones", "Sec. 18.4", [
        ("MilestoneList", "Milestones", "All milestones for a project."),
        ("MilestoneDetails", "Milestone Details", "Detail view of a single milestone."),
        ("CreateMilestone", "Create Milestone", "Define a new milestone."),
        ("MilestoneReview", "Milestone Review", "Review evidence and approve/reject a milestone."),
    ]),
    "contractors": ("Contractors", "Sec. 14.2", [
        ("ContractorList", "Contractors", "Browse the contractor marketplace."),
        ("ContractorProfile", "Contractor Profile", "Public profile of a contractor."),
        ("ContractorDetails", "Contractor Details", "Admin/client detail view of a contractor."),
        ("ContractorPortfolio", "Contractor Portfolio", "Past work and references."),
        ("ContractorVerification", "Contractor Verification", "Verification status and documents."),
    ]),
    "suppliers": ("Suppliers", "Sec. 17.2", [
        ("SupplierList", "Suppliers", "Browse the supplier marketplace."),
        ("SupplierProfile", "Supplier Profile", "Public profile of a supplier."),
        ("Catalogue", "Catalogue", "Supplier's listed materials and pricing."),
        ("SupplierDetails", "Supplier Details", "Admin/client detail view of a supplier."),
    ]),
    "professionals": ("Professionals", "Sec. 40.7", [
        ("ProfessionalList", "Professionals", "Browse verified architects, engineers and surveyors."),
        ("ProfessionalProfile", "Professional Profile", "Public profile of a professional."),
        ("ServiceInvitations", "Service Invitations", "Invitations to bid on professional services."),
        ("Proposals", "Proposals", "Submitted service proposals."),
        ("Deliverables", "Deliverables", "Submitted deliverables awaiting approval."),
    ]),
    "bidding": ("Bidding", "Sec. 17.1 / 24", [
        ("AvailableProjects", "Available Projects", "Open projects matching contractor trade and location."),
        ("BidSubmission", "Submit a Bid", "Bid submission form: cost, timeline, approach."),
        ("MyBids", "My Bids", "Bids submitted, and their current status."),
        ("BidDetails", "Bid Details", "Full detail view of a submitted bid."),
        ("BidComparison", "Bid Comparison", "Compare bids by cost, timeline, trust score and risk."),
        ("AwardContract", "Award Contract", "Award a project to the selected bid."),
    ]),
    "procurement": ("Procurement", "Sec. 17.3", [
        ("ProcurementDashboard", "Procurement Dashboard", "Overview of material requests and orders."),
        ("MaterialRequests", "Material Requests", "Materials requested for active projects."),
        ("CreateRequest", "Create Request", "Raise a new material request."),
        ("Quotations", "Quotations", "Quotes received from suppliers."),
        ("QuoteComparison", "Quote Comparison", "Compare supplier quotes side by side."),
        ("PurchaseOrders", "Purchase Orders", "Issued purchase orders."),
        ("Deliveries", "Deliveries", "Orders in transit and delivered."),
        ("DeliveryVerification", "Delivery Verification", "Confirm delivered materials against the order."),
    ]),
    "escrow": ("Escrow", "Sec. 18", [
        ("Wallet", "Escrow Wallet", "Wallet balance and protected funds."),
        ("Transactions", "Transactions", "Full escrow transaction history."),
        ("Funding", "Fund Escrow", "Add funds to a project's escrow wallet."),
        ("PaymentRequests", "Payment Requests", "Requests to release milestone payments."),
        ("PaymentApprovals", "Payment Approvals", "Approve or reject pending payment releases."),
        ("FrozenPayments", "Frozen Payments", "Funds frozen pending dispute resolution."),
        ("Refunds", "Refunds", "Refunds issued back to clients."),
    ]),
    "monitoring": ("Monitoring", "Sec. 20.3 / 43", [
        ("MonitoringDashboard", "Monitoring Dashboard", "Live overview of project health and progress."),
        ("Progress", "Progress", "Progress tracking against the project timeline."),
        ("Inspections", "Inspections", "Scheduled and completed site inspections."),
        ("Reports", "Reports", "All monitoring reports."),
        ("DailyReport", "Daily Report", "Daily site report."),
        ("WeeklyReport", "Weekly Report", "Weekly progress report."),
        ("MonthlyReport", "Monthly Report", "Monthly progress report."),
        ("RiskAlerts", "Risk Alerts", "Budget, timeline and quality risk flags."),
    ]),
    "evidence": ("Evidence", "Sec. 43", [
        ("EvidenceLibrary", "Evidence Library", "All evidence submitted across a project."),
        ("EvidenceDetails", "Evidence Details", "Detail view of a single evidence submission."),
        ("UploadEvidence", "Upload Evidence", "Submit photo/video/document evidence for a milestone."),
        ("EvidenceReview", "Evidence Review", "Reviewer view for verifying submitted evidence."),
    ]),
    "approvals": ("Approvals", "Sec. 43.3", [
        ("ApprovalInbox", "Approval Inbox", "Items awaiting your approval."),
        ("ApprovalDetails", "Approval Details", "Full context for a single approval decision."),
        ("ApprovalHistory", "Approval History", "Past approval decisions and their outcomes."),
    ]),
    "disputes": ("Disputes", "Sec. 19", [
        ("DisputeList", "Disputes", "All disputes across your projects."),
        ("CreateDispute", "Raise a Dispute", "Open a new dispute with supporting evidence."),
        ("DisputeDetails", "Dispute Details", "Full detail and timeline of a dispute."),
        ("Evidence", "Dispute Evidence", "Evidence submitted as part of a dispute."),
        ("Responses", "Responses", "Respondent statements and counter-evidence."),
        ("Resolution", "Resolution", "Final resolution and outcome of a dispute."),
    ]),
    "documents": ("Documents", "Sec. 20.1", [
        ("DocumentVault", "Document Vault", "All documents stored against your account/projects."),
        ("DocumentDetails", "Document Details", "Detail view of a single document."),
        ("UploadDocument", "Upload Document", "Add a new document to the vault."),
        ("DocumentHistory", "Document History", "Version and access history for a document."),
    ]),
    "property-passport": ("Digital Property Passport", "Sec. 20.4", [
        ("Passport", "Property Passport", "The full verified record of a build."),
        ("PropertyOverview", "Property Overview", "Summary of the property and its status."),
        ("Ownership", "Ownership", "Ownership and title records."),
        ("LandDocuments", "Land Documents", "Land survey, C of O and allocation documents."),
        ("Designs", "Designs", "Architectural and structural designs."),
        ("Contracts", "Contracts", "Contracts signed across the project."),
        ("Procurement", "Procurement Record", "Materials procured over the life of the build."),
        ("Inspections", "Inspections", "Inspection history and findings."),
        ("Payments", "Payments", "Full payment record for the property."),
        ("Warranties", "Warranties", "Warranties on materials and workmanship."),
        ("Handover", "Handover", "Handover checklist and sign-off."),
    ]),
    "notifications": ("Notifications", "Sec. 20.2", [
        ("Notifications", "Notifications", "All notifications for the current user."),
        ("NotificationSettings", "Notification Settings", "Configure notification channels and frequency."),
    ]),
    "reports": ("Reports", "Sec. 20.3", [
        ("ProjectReports", "Project Reports", "Reports scoped to a single project."),
        ("FinancialReports", "Financial Reports", "Escrow, spend and budget reporting."),
        ("ComplianceReports", "Compliance Reports", "Regulatory and policy compliance reporting."),
        ("ManagementReports", "Management Reports", "Cross-project management summaries."),
        ("AuditReports", "Audit Reports", "Full audit trail exports."),
    ]),
    "analytics": ("Analytics", "Sec. 39.3", [
        ("Overview", "Analytics Overview", "Platform-wide KPIs at a glance."),
        ("ProjectAnalytics", "Project Analytics", "Delivery performance across projects."),
        ("FinancialAnalytics", "Financial Analytics", "Revenue, escrow volume and spend trends."),
        ("RiskAnalytics", "Risk Analytics", "Risk and delay pattern analysis."),
        ("ContractorAnalytics", "Contractor Analytics", "Contractor performance and trust trends."),
        ("SupplierAnalytics", "Supplier Analytics", "Supplier performance and reliability trends."),
    ]),
    "admin": ("Admin", "Sec. 39", [
        ("Users", "Manage Users", "Full user directory and account controls."),
        ("Compliance", "Compliance", "Platform-wide compliance monitoring."),
        ("AuditLogs", "Audit Logs", "System-wide audit log."),
        ("Settings", "Platform Settings", "Global platform configuration."),
    ]),
}

PAGE_TEMPLATE = '''import {{ Construction }} from 'lucide-react'
import {{ Card }} from '@/components/ui/Card'
import {{ EmptyState }} from '@/components/ui/EmptyState'

/**
 * {title} — {module_label} module
 * BRD reference: {brd_ref}
 *
 * TODO: replace this placeholder with the real implementation.
 * {description}
 */
export function {name}() {{
  return (
    <Card>
      <EmptyState
        icon={{Construction}}
        title="{title}"
        description="{description}"
        action={{
          <span className="mt-1 rounded-full bg-ink/5 px-3 py-1 font-mono text-[10px] text-ink/40">
            BRD ref: {brd_ref}
          </span>
        }}
      />
    </Card>
  )
}}
'''

SERVICE_TEMPLATE = '''// {module_label} module — API service layer
// TODO: replace with real HTTP calls once the backend (Sec. 28.1) is available.
// Keep this file as the single place this module talks to the network so
// pages/components never call fetch/axios directly.

export const {camel}Service = {{
  // example shape — implement once the API contract is defined
  // list: () => api.get<{pascal}[]>('/{kebab}'),
  // get: (id: string) => api.get<{pascal}>(`/{kebab}/${{id}}`),
}}
'''

TYPES_TEMPLATE = '''// {module_label} module — shared types
// TODO: define the real shape once this module is implemented.
// Keep module-specific types here; only cross-cutting types
// (User, UserRole, etc.) belong in the root `src/types`.

export type {pascal}Placeholder = Record<string, unknown>
'''

def to_pascal(module_key: str) -> str:
    return "".join(p.capitalize() for p in module_key.replace("-", "_").split("_"))

def to_camel(module_key: str) -> str:
    pascal = to_pascal(module_key)
    return pascal[0].lower() + pascal[1:]

created, skipped = 0, 0

for module_key, (label, brd_ref, pages) in MODULE_MAP.items():
    base = os.path.join(SRC, "modules", module_key)
    pascal = to_pascal(module_key)
    camel = to_camel(module_key)

    for name, title, description in pages:
        path = os.path.join(base, "pages", f"{name}.tsx")
        if os.path.exists(path):
            skipped += 1
            continue
        content = PAGE_TEMPLATE.format(
            title=title, module_label=label, brd_ref=brd_ref,
            description=description, name=name,
        )
        with open(path, "w") as f:
            f.write(content)
        created += 1

    # services stub (skip if module already has a real service file)
    svc_dir = os.path.join(base, "services")
    if not os.listdir(svc_dir):
        with open(os.path.join(svc_dir, f"{camel}Service.ts"), "w") as f:
            f.write(SERVICE_TEMPLATE.format(module_label=label, camel=camel, pascal=pascal, kebab=module_key))
        created += 1

    # types stub (skip if module already has types)
    types_dir = os.path.join(base, "types")
    if not os.listdir(types_dir):
        with open(os.path.join(types_dir, "index.ts"), "w") as f:
            f.write(TYPES_TEMPLATE.format(module_label=label, pascal=pascal))
        created += 1

    # .gitkeep for still-empty dirs (components/hooks, and pages/types/services if untouched)
    for sub in ("components", "hooks"):
        d = os.path.join(base, sub)
        if not os.listdir(d):
            open(os.path.join(d, ".gitkeep"), "w").close()
            created += 1

print(f"Created {created} files, skipped {skipped} existing files.")
