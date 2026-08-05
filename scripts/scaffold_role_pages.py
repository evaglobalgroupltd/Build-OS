"""
Generates the thin `pages/{role}/*.tsx` route wrappers. Each one just
imports a module page (or, where no module page fits 1:1 yet, renders
PlaceholderPage directly) and wraps it in the right layout + title.

Business logic lives in `src/modules/**`; these files exist purely so the
router has one file per route and so the whole product surface is easy to
scan folder-by-folder. Re-run after adding new module pages you want wired
into a role's nav.
"""
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "src")

# role_dir: (Layout import, [(FileName, Title, module_import_path, ModuleComponentName), ...])
# module_import_path=None means: render PlaceholderPage directly (no module page fits yet)
ROLES = {
    "client": ("DashboardLayout", [
        ("Projects", "Projects", "@/modules/projects/pages/ProjectList", "ProjectList"),
        ("Escrow", "Escrow Wallet", "@/modules/escrow/pages/Wallet", "Wallet"),
        ("Procurement", "Procurement", "@/modules/procurement/pages/MaterialRequests", "MaterialRequests"),
        ("Reports", "Reports", "@/modules/reports/pages/ProjectReports", "ProjectReports"),
        ("Disputes", "Disputes", "@/modules/disputes/pages/DisputeList", "DisputeList"),
        ("Passport", "Digital Property Passport", "@/modules/property-passport/pages/Passport", "Passport"),
    ]),
    "contractor": ("DashboardLayout", [
        ("Projects", "Available Projects", "@/modules/bidding/pages/AvailableProjects", "AvailableProjects"),
        ("Bids", "My Bids", "@/modules/bidding/pages/MyBids", "MyBids"),
        ("Milestones", "Active Milestones", "@/modules/milestones/pages/MilestoneList", "MilestoneList"),
        ("Materials", "Material Requests", "@/modules/procurement/pages/MaterialRequests", "MaterialRequests"),
        ("Reports", "Reports", "@/modules/reports/pages/ProjectReports", "ProjectReports"),
        ("Payments", "Payments", "@/modules/escrow/pages/Transactions", "Transactions"),
    ]),
    "supplier": ("DashboardLayout", [
        ("Catalogue", "Catalogue", "@/modules/suppliers/pages/Catalogue", "Catalogue"),
        ("Quotations", "Quotation Requests", "@/modules/procurement/pages/Quotations", "Quotations"),
        ("Orders", "Purchase Orders", "@/modules/procurement/pages/PurchaseOrders", "PurchaseOrders"),
        ("Deliveries", "Deliveries", "@/modules/procurement/pages/Deliveries", "Deliveries"),
        ("Payments", "Payments", "@/modules/escrow/pages/Transactions", "Transactions"),
    ]),
    "project-manager": ("DashboardLayout", [
        ("Projects", "Assigned Projects", "@/modules/projects/pages/ProjectList", "ProjectList"),
        ("Inspections", "Inspections", "@/modules/monitoring/pages/Inspections", "Inspections"),
        ("Milestones", "Milestone Verification", "@/modules/milestones/pages/MilestoneReview", "MilestoneReview"),
        ("Evidence", "Evidence", "@/modules/evidence/pages/EvidenceLibrary", "EvidenceLibrary"),
        ("Reports", "Reports", "@/modules/reports/pages/ProjectReports", "ProjectReports"),
        ("Risks", "Risk Alerts", "@/modules/monitoring/pages/RiskAlerts", "RiskAlerts"),
    ]),
    "professional": ("DashboardLayout", [
        ("Assignments", "Service Invitations", "@/modules/professionals/pages/ServiceInvitations", "ServiceInvitations"),
        ("Proposals", "Proposals", "@/modules/professionals/pages/Proposals", "Proposals"),
        ("Deliverables", "Deliverables", "@/modules/professionals/pages/Deliverables", "Deliverables"),
        ("Payments", "Payments", "@/modules/escrow/pages/Transactions", "Transactions"),
    ]),
    "admin": ("AdminLayout", [
        ("Users", "Manage Users", "@/modules/admin/pages/Users", "Users"),
        ("Verification", "Verification Queue", "@/modules/verification/pages/AdminVerificationQueue", "AdminVerificationQueue"),
        ("Projects", "All Projects", "@/modules/projects/pages/ProjectList", "ProjectList"),
        ("Marketplace", "Marketplace", None, None),
        ("Procurement", "Procurement Oversight", "@/modules/procurement/pages/ProcurementDashboard", "ProcurementDashboard"),
        ("Escrow", "Escrow Oversight", "@/modules/escrow/pages/Wallet", "Wallet"),
        ("Disputes", "Disputes", "@/modules/disputes/pages/DisputeList", "DisputeList"),
        ("Compliance", "Compliance", "@/modules/admin/pages/Compliance", "Compliance"),
        ("Reports", "Reports", "@/modules/reports/pages/ManagementReports", "ManagementReports"),
        ("Analytics", "Analytics", "@/modules/analytics/pages/Overview", "Overview"),
    ]),
}

WITH_MODULE_TEMPLATE = '''import {{ {layout} }} from '@/layouts/{layout}'
import {{ {component} }} from '{module_path}'

export function {export_name}() {{
  return (
    <{layout} title="{title}">
      <{component} />
    </{layout}>
  )
}}
'''

PLACEHOLDER_TEMPLATE = '''import {{ Boxes }} from 'lucide-react'
import {{ {layout} }} from '@/layouts/{layout}'
import {{ PlaceholderPage }} from '@/components/feedback/PlaceholderPage'

// No single module maps to this view yet — it aggregates data across
// several modules (contractors + suppliers). Build it out once those
// modules have real list pages to compose.
export function {export_name}() {{
  return (
    <{layout} title="{title}">
      <PlaceholderPage
        icon={{Boxes}}
        title="{title}"
        description="Cross-module view combining the contractor and supplier marketplaces."
        brdReference="Sec. 39"
      />
    </{layout}>
  )
}}
'''

created = 0
for role, (layout, pages) in ROLES.items():
    for file_name, title, module_path, component in pages:
        export_name = f"{file_name}Page"
        path = os.path.join(SRC, "pages", role, f"{file_name}.tsx")
        if module_path:
            content = WITH_MODULE_TEMPLATE.format(
                layout=layout, component=component, module_path=module_path,
                export_name=export_name, title=title,
            )
        else:
            content = PLACEHOLDER_TEMPLATE.format(layout=layout, export_name=export_name, title=title)
        with open(path, "w") as f:
            f.write(content)
        created += 1

print(f"Created {created} role page wrappers.")
