#!/usr/bin/env node
/* =============================================================================
 * scripts/wire-buttons.mjs
 *
 *   node scripts/wire-buttons.mjs            # dry run: shows what WOULD change
 *   node scripts/wire-buttons.mjs --write    # applies the changes
 *
 * COMMIT FIRST (git add -A && git commit -m "before wiring") so you can review
 * with `git diff` and undo with `git checkout .`.
 *
 * What it does
 *  For each module page listed in MAP below, every dead <button> (no onClick,
 *  not submit, not disabled) that has a rule is rewritten in place, keeping all of
 *  its className / aria attributes:
 *
 *     nav:<route>[/sub]   -> <RoleLink route="<route>" sub="<sub>" ...>   navigation
 *     to:<path>           -> <RoleLink to="<path>" ...>                    literal / relative
 *     path:<path>         -> <RoleLink to="<path>" relative="path" ...>
 *     print               -> <PrintButton ...>                             opens print / save-as-PDF
 *     soon                -> <SoonButton ...>                              "Coming soon", visibly inactive
 *
 *  and adds the import from '@/components/ui/ModuleActions'.
 *
 *  Buttons are matched by their label (as printed by audit-modules-v2) or, for
 *  icon / dynamic buttons, by line number. Line numbers refer to the files as
 *  they were when you ran the audit. If a file changed since, unmatched rules are
 *  reported and nothing is touched for them.
 *
 *  Buttons with no rule are listed at the end: those need a hand-written
 *  handler (row-specific ids, local state), and I'll do them with you.
 * ========================================================================== */

import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const WRITE = process.argv.includes('--write')
const ROOT = process.cwd()

/* [selector, action]: selector = label text (exact) or line number */
const MAP = {
  /* ---- approvals ---- */
  'approvals/ApprovalDetails': [
    ['Back to approvals', 'nav:decisions/approvals'],
    ['Approve & release', 'soon'],
    ['Correction', 'soon'],
    ['Reject', 'soon'],
    ['View complete audit log', 'nav:updates'],
  ],
  'approvals/ApprovalHistory': [['View record', 'nav:decisions/approvals/current']],
  'approvals/ApprovalInbox': [
    ['Review submission', 'nav:decisions/approvals/current'],
    ['Approve & Release', 'nav:decisions/approvals/current'],
    ['Request Correction', 'nav:decisions/approvals/current'],
  ],

  /* ---- disputes ---- */
  'disputes/CreateDispute': [
    ['View disputes', 'nav:disputes'],
    ['Dispute policy & guidance', 'to:/terms'],
  ],
  'disputes/DisputeDetails': [
    ['Back to disputes', 'nav:disputes'],
    ['View', 'to:evidence'],
    ['Add case note', 'to:responses'],
  ],
  'disputes/DisputeList': [[305, 'nav:disputes/current']],
  'disputes/Evidence': [['Upload evidence', 'soon'], ['View ↗', 'soon']],
  'disputes/Resolution': [['Request further review', 'soon'], ['Approve resolution', 'soon']],
  'disputes/Responses': [['Attach evidence', 'soon'], ['Submit response', 'soon']],

  /* ---- documents ---- */
  'documents/DocumentDetails': [
    ['Back to documents', 'nav:documents'],
    ['More document actions', 'soon'],
    ['View document', 'soon'],
    ['Download', 'soon'],
    ['Open project', 'nav:projects'],
    ['Download copy', 'soon'],
  ],
  'documents/DocumentHistory': [
    ['Back to document', 'nav:documents/current'],
    ['View version', 'soon'],
    ['Document Return to document record', 'nav:documents/current'],
  ],
  'documents/DocumentVault': [
    ['Upload document', 'nav:documents/upload'],
    [241, 'soon'],
    ['Filter', 'soon'],
    ['View audit history', 'nav:documents/current/history'],
    ['View', 'nav:documents/current'],
    [475, 'nav:documents/current'],
  ],
  'documents/UploadDocument': [
    ['Back to vault', 'nav:documents'],
    ['Remove selected document', 'soon'],
    ['Save as draft', 'soon'],
    ['Upload document', 'soon'],
  ],

  /* ---- escrow (Funding.tsx is replaced by the rewritten file, so no rules) ---- */
  'escrow/FrozenPayments': [
    ['View payment history', 'nav:money/transactions'],
    ['View case', 'nav:disputes/current'],
  ],
  'escrow/PaymentApprovals': [
    ['View payment history', 'nav:money/transactions'],
    [584, 'soon'],
    ['Add review note', 'soon'],
  ],
  'escrow/PaymentRequests': [
    ['New payment request', 'soon'],
    ['View evidence', 'nav:evidence/current'],
    ['View request', 'soon'],
  ],
  'escrow/Refunds': [['Request refund', 'soon'], ['View details', 'soon']],
  'escrow/Transactions': [
    ['Export ledger', 'print'],
    ['All types', 'soon'],
    ['All statuses', 'soon'],
    ['View transaction', 'soon'],
  ],
  'escrow/Wallet': [
    ['View all', 'nav:money/transactions'],
    ['View all transactions', 'nav:money/transactions'],
    [600, 'nav:money/transactions'],
    [690, 'nav:money/transactions'],
  ],

  /* ---- evidence / milestones (UploadEvidence skipped: it exports the wrong name) ---- */
  'evidence/EvidenceDetails': [
    ['Back to evidence', 'nav:evidence'],
    ['Export evidence', 'print'],
    ['More actions', 'soon'],
    ['View evidence', 'soon'],
    [730, 'soon'],
  ],
  'evidence/EvidenceReview': [
    ['Back to review queue', 'nav:evidence'],
    ['Export record', 'print'],
    [367, 'soon'],
    ['Record review', 'soon'],
    [777, 'soon'],
  ],
  'milestones/MilestoneDetails': [
    ['Request Evidence', 'soon'],
    ['Review Milestone', 'nav:decisions/approvals/current'],
    ['Reject', 'soon'],
    ['Approve Milestone', 'soon'],
    [1041, 'soon'],
  ],

  /* ---- monitoring ---- */
  'monitoring/DailyReport': [
    ['Export Report', 'print'],
    ['Review Report', 'soon'],
    ['Reject Report', 'soon'],
    ['Request Clarification', 'soon'],
    ['Approve Report', 'soon'],
  ],
  'monitoring/MonthlyReport': [
    ['August 2026', 'soon'],
    ['Export Report', 'print'],
    ['More report options', 'soon'],
    ['View all', 'nav:reports/library'],
    ['View project activity', 'nav:updates'],
    ['Open Full Report', 'nav:reports'],
  ],
  'monitoring/Reports': [
    [111, 'soon'],
    ['Download', 'soon'],
    [230, 'soon'],
    ['Export library', 'print'],
    ['View all reports', 'nav:reports'],
  ],
  'monitoring/WeeklyReport': [
    ['Previous week', 'soon'],
    ['Current week', 'soon'],
    ['Next week', 'soon'],
    ['View progress', 'nav:reports/progress'],
    ['Details', 'soon'],
  ],

  /* ---- procurement ---- */
  'procurement/CreateRequest': [['Save draft', 'soon']],
  'procurement/Deliveries': [[371, 'soon'], ['Verify delivery', 'nav:procurement/verify']],
  'procurement/DeliveryVerification': [['View evidence', 'nav:evidence/current']],
  'procurement/MaterialRequests': [
    ['Create request', 'nav:procurement/new'],
    ['New request', 'nav:procurement/new'],
  ],
  'procurement/ProcurementDashboard': [
    ['Create request', 'nav:procurement/new'],
    ['View all', 'nav:procurement'],
    [517, 'soon'],
    [663, 'soon'],
  ],
  'procurement/PurchaseOrders': [['Create purchase order', 'soon'], [449, 'soon'], [500, 'soon']],
  'procurement/Quotations': [
    ['Request quotation', 'nav:procurement/new'],
    [512, 'soon'],
    ['Select supplier', 'nav:procurement/compare'],
  ],
  'procurement/QuoteComparison': [
    ['Back to quotations', 'nav:procurement/quotations'],
    ['Select supplier', 'soon'],
    [481, 'soon'],
    ['Keep reviewing', 'nav:procurement/quotations'],
    ['Select {…}', 'soon'],
  ],

  /* ---- projects ---- */
  'projects/EditProject': [['Choose files', 'soon']],
  'projects/ProjectDetails': [
    ['Edit Project', 'path:../edit'],
    ['Project Actions', 'soon'],
    ['Review evidence', 'nav:evidence/current/review'],
    ['Request more evidence', 'soon'],
    ['View Passport', 'nav:passport'],
    [1526, 'soon'],
    [1547, 'soon'],
  ],
  'projects/ProjectDocuments': [
    ['Upload document', 'nav:documents/upload'],
    ['View Property Passport', 'nav:passport'],
    [668, 'soon'],
    [688, 'soon'],
  ],
  'projects/ProjectList': [['Create project', 'nav:projects/new'], ['Filters', 'soon']],
  'projects/ProjectSettings': [['Open change requests', 'soon'], [552, 'soon']],
  'projects/ProjectTeam': [
    ['Add team member', 'soon'],
    [603, 'soon'],
    ['Assign {…}', 'soon'],
    [714, 'soon'],
    [772, 'soon'],
  ],
  'projects/ProjectTimeline': [['View record', 'nav:updates']],

  /* ---- property passport ---- */
  'property-passport/Contracts': [['Document', 'nav:documents/current'], ['View passport', 'nav:passport']],
  'property-passport/Designs': [['Document', 'nav:documents/current'], ['View passport', 'nav:passport']],
  'property-passport/Handover': [['View certificate', 'nav:documents/current']],
  'property-passport/Inspections': [['Report', 'nav:documents/current']],
  'property-passport/LandDocuments': [['Document', 'nav:documents/current']],
  'property-passport/Ownership': [['Document', 'nav:documents/current']],
  'property-passport/Payments': [['Receipt', 'nav:money/transactions']],
  'property-passport/Procurement': [['Record', 'nav:procurement/orders']],
  'property-passport/PropertyOverview': [['Passport record', 'nav:passport']],
  'property-passport/Warranties': [['Warranty', 'nav:documents/current']],

  /* ---- reports (ProjectReports' "Open detailed controls" is a manual patch) ---- */
  'reports/FinancialReports': [
    ['Reconciliation', 'nav:money/transactions'],
    ['Export Report', 'print'],
    ['View complete transaction ledger', 'nav:money/transactions'],
    ['Open detailed controls', 'nav:money'],
  ],
  'reports/ProjectReports': [
    ['Export Report', 'print'],
    ['View complete project activity', 'nav:updates'],
  ],
}

const BTN = /<button\b((?:[^>]|=>)*)>([\s\S]*?)<\/button>/g
const ACTIONS_IMPORT = `import { %NAMES% } from '@/components/ui/ModuleActions'`

function labelOf(attrs, inner) {
  return (
    inner.replace(/<[^>]+>/g, ' ').replace(/\{[^}]*\}/g, '{…}').replace(/\s+/g, ' ').trim() ||
    (attrs.match(/aria-label=["']([^"']+)["']/)?.[1] ?? '(icon)')
  ).slice(0, 44)
}

function openTag(action) {
  const [kind, rest = ''] = action.split(/:(.*)/s)
  if (kind === 'print') return ['PrintButton', '<PrintButton']
  if (kind === 'soon') return ['SoonButton', '<SoonButton']
  if (kind === 'to') return ['RoleLink', `<RoleLink to="${rest}"`]
  if (kind === 'path') return ['RoleLink', `<RoleLink to="${rest}" relative="path"`]
  if (kind === 'nav') {
    const [route, ...sub] = rest.split('/')
    return ['RoleLink', `<RoleLink route="${route}"${sub.length ? ` sub="${sub.join('/')}"` : ''}`]
  }
  throw new Error(`Unknown action: ${action}`)
}

function addImport(src, names) {
  if (src.includes('@/components/ui/ModuleActions')) return src
  const line = ACTIONS_IMPORT.replace('%NAMES%', [...names].sort().join(', '))
  const re = /^import\s[\s\S]*?['"];?[ \t]*$/gm
  let end = 0
  for (const m of src.matchAll(re)) end = m.index + m[0].length
  return end ? `${src.slice(0, end)}\n${line}${src.slice(end)}` : `${line}\n${src}`
}

let totalChanged = 0
const manual = []
const missingFiles = []

for (const [key, rules] of Object.entries(MAP)) {
  const [mod, name] = key.split('/')
  const path = join(ROOT, 'src', 'modules', mod, 'pages', `${name}.tsx`)

  if (!existsSync(path)) {
    missingFiles.push(key)
    continue
  }

  let src = readFileSync(path, 'utf8')
  const found = [...src.matchAll(BTN)].filter((m) => !/onClick|type=["']submit["']|disabled|onSubmit/.test(m[1]))
  const used = new Set()
  const edits = []
  const unmapped = []

  for (const m of found) {
    const line = src.slice(0, m.index).split('\n').length
    const label = labelOf(m[1], m[2])
    const rule = rules.find(([sel]) => (typeof sel === 'number' ? sel === line : sel === label))

    if (!rule) {
      unmapped.push({ line, label })
      continue
    }

    const [component, open] = openTag(rule[1])
    used.add(component)
    const attrs = m[1].replace(/\s+type=(["'])button\1/, '')
    const close = component === 'RoleLink' ? '</RoleLink>' : `</${component}>`
    edits.push({ start: m.index, end: m.index + m[0].length, text: `${open}${attrs}>${m[2]}${close}` })
  }

  if (edits.length === 0 && unmapped.length === 0) continue

  for (const e of edits.sort((a, b) => b.start - a.start)) {
    src = src.slice(0, e.start) + e.text + src.slice(e.end)
  }
  if (edits.length) src = addImport(src, used)

  console.log(`${edits.length ? '✔' : '·'} ${key}: ${edits.length} wired${unmapped.length ? `, ${unmapped.length} need a manual handler` : ''}`)
  for (const u of unmapped) manual.push(`    ${key}  line ${u.line}  "${u.label}"`)

  totalChanged += edits.length
  if (WRITE && edits.length) writeFileSync(path, src)
}

/* ---- Passport: relative data links -> real routes + <Link> ---- */
{
  const path = join(ROOT, 'src/modules/property-passport/pages/Passport.tsx')
  if (existsSync(path)) {
    let src = readFileSync(path, 'utf8')
    const before = src
    src = src.replace(/href:\s*(['"])\.\/([a-z-]+)\1/g, "href: '/app/client/passport/$2'")
    src = src.replace(/<a(\s+key=\{[^}]+\}\s+)href=\{section\.href\}/, '<Link$1to={section.href}')
    src = src.replace(/<\/a>/g, '</Link>')
    if (!/from\s+['"]react-router-dom['"]/.test(src)) {
      const re = /^import\s[\s\S]*?['"];?[ \t]*$/gm
      let end = 0
      for (const m of src.matchAll(re)) end = m.index + m[0].length
      src = `${src.slice(0, end)}\nimport { Link } from 'react-router-dom'${src.slice(end)}`
    }
    if (src !== before) {
      console.log('✔ property-passport/Passport: 6 section links -> real routes (<Link>, no page reload)')
      if (WRITE) writeFileSync(path, src)
    }
  }
}

console.log()
console.log(`${WRITE ? 'Applied' : 'Would apply'} ${totalChanged} button rewrites.`)
if (!WRITE) console.log('Dry run only. Re-run with --write to apply.')
if (missingFiles.length) console.log(`\nFiles not found (skipped): ${missingFiles.join(', ')}`)
if (manual.length) {
  console.log(`\nStill need a hand-written handler (${manual.length}):`)
  console.log(manual.join('\n'))
}
