# Build OS — Frontend

React + TypeScript + Tailwind, organized around business modules (not just
pages), so the codebase maps directly onto the BRD's service boundaries and
stays trackable as the product grows.

## Stack

- **Vite** — build tooling
- **React 19 + TypeScript**
- **Tailwind CSS v4** (`@tailwindcss/vite`; tokens live in `src/index.css` under `@theme`)
- **React Router v6**
- **lucide-react** — icons

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # type-check + production build
npm run lint       # oxlint
npm run preview    # preview the production build
```

Use the "Preview role" dropdown in the topbar, or the role picker on
`/login` / `/register`, to jump between all six dashboards — there's no real
backend yet, so `AuthContext` just switches roles locally.

---

## BUILD OS DEVELOPMENT STATUS

Update this section as you go — it's the fastest way to see what's real vs.
scaffolded without opening every file. Legend: `[x]` built for real, `[~]`
partially built / uses mock data, `[ ]` placeholder or not started.

```
FOUNDATION
[x] Project setup (Vite + React + TS + Tailwind v4)
[x] Design system tokens + base components (components/ui)
[x] Loading states (Skeleton components + useMockLoading hook, demoed on client dashboard)
[x] Toast notifications (ToastContext + ToastViewport, wired into login/register)
[x] Form validation (Login, Register — inline errors, disabled-while-submitting state)
[x] Responsive nav (mobile drawer sidebar; was broken — sidebar was desktop-only before)
[x] Data visualization (EscrowTrendChart, ProjectProgressChart — recharts, themed to design tokens)
[x] Routing (app/routes.tsx, all 49 routes wired)
[x] Layouts (Public, Auth, Dashboard, Admin*)
[~] Authentication foundation (UI + demo role-switch flow; no real API)
[ ] Role/permission system (beyond the 6 fixed UserRole values)
[ ] Organization / multi-tenant system

TRUST CORE
[~] Projects — list + card view (mock data); wizard/detail/team/timeline/settings not built
[ ] Milestones
[ ] Evidence capture
[ ] Independent verification workflow
[ ] Approvals
[~] Monitoring — dashboards reference it; module pages are placeholders
[ ] Audit trail
[~] Reports — placeholder pages only

CORE PLATFORM
[ ] User verification (document upload, admin queue)
[ ] Contractor marketplace (list/profile/portfolio)
[ ] Supplier marketplace (list/profile)
[~] Bidding — BidComparison + MyBids built with mock data; submission flow not built
[~] Procurement — MaterialRequests list built; quotes/POs/delivery verification are placeholders
[~] Escrow — Wallet + transaction history built with mock data; funding/approval flows are placeholders
[~] Disputes — DisputeList built with mock data; create/respond/resolve flows are placeholders
[ ] Document vault
[ ] Notifications
[~] Admin Centre — dashboard built; most sub-pages are placeholders

PROPERTY
[ ] Digital Property Passport
[ ] Handover
[ ] Maintenance records

ADVANCED
[ ] Analytics
[ ] Risk intelligence
[ ] AI assistant
[ ] Cost intelligence
[ ] Delay prediction
[ ] Fraud/risk intelligence

ENTERPRISE
[ ] Multi-organization
[ ] Workflow configuration
[ ] APIs (real backend integration)
[ ] Webhooks
[ ] Client portal
[ ] White-label
[ ] Enterprise audit mode
```

\* `AdminLayout` currently just wraps `DashboardLayout` — same chrome, kept
as a separate file so admin can diverge later without touching every page.

---

## Structure

```
public/
  images/  icons/  documents/

src/
  app/
    App.tsx            Root component (providers + routes)
    routes.tsx          Every <Route>, one line per page
    providers/
      AppProviders.tsx  Stacks app-wide providers (auth, later: query client, etc.)

  layouts/
    PublicLayout.tsx     Header + footer for marketing pages
    AuthLayout.tsx        Centered card chrome for login/register/verification
    DashboardLayout.tsx    Sidebar + topbar shell for all six role dashboards
    AdminLayout.tsx         Thin wrapper over DashboardLayout (see note above)
    components/
      Sidebar.tsx          Role-aware nav, driven by config/navigation.ts
      Topbar.tsx            Role switcher (demo), notifications, user menu

  components/            Design system — generic, no business logic
    ui/                   Button, Badge, Card, StatCard, ProgressBar, TrustScore, EmptyState
    forms/ tables/ modals/ charts/ documents/ media/    (empty — fill in as needed)
    feedback/              PlaceholderPage (the empty-state used by every stub route)

  modules/                ← THE PRODUCT MAP. One folder per BRD service area.
    authentication/ users/ organizations/ verification/
    projects/ milestones/ contractors/ suppliers/ professionals/
    bidding/ procurement/ escrow/
    monitoring/ evidence/ approvals/ disputes/
    documents/ property-passport/ notifications/
    reports/ analytics/ admin/
      each contains:
        pages/       One file per screen (real implementation or placeholder)
        components/  Domain-specific components (e.g. ProjectCard, BidList)
        hooks/       Module-specific hooks
        services/    API layer — the only place this module talks to the network
        types/       This module's domain types

  pages/                  Thin, role-scoped route wrappers.
    public/ auth/ client/ contractor/ supplier/
    project-manager/ professional/ admin/
      Each file imports ONE module page, wraps it in a layout + title,
      and nothing else. Business logic never lives here — see modules/.

  context/    AuthContext (demo-only; replace with real auth)
  data/       mockData.ts — stands in for the API everywhere
  config/     navigation.ts — nav items per role; must match app/routes.tsx
  types/      Cross-cutting types only (User, UserRole, VerificationStatus, NavItem)
  hooks/      App-wide hooks (currently empty)
  services/   Shared API client, once the backend exists (currently empty)
  utils/      Shared utilities (currently empty)
  constants/  Shared constants (currently empty)

scripts/
  scaffold_modules.py       Regenerates module page/service/type stubs from a
                             declarative map — re-run if you add new module pages.
  scaffold_role_pages.py    Regenerates the thin pages/{role}/*.tsx wrappers.
```

### The rule that keeps this maintainable

**Business logic lives in `modules/`. `pages/` only wires a module page into
a role's layout.** If you find yourself writing real logic inside a
`pages/{role}/*.tsx` file, that logic almost always belongs in the matching
module instead — otherwise six dashboards quietly grow six different copies
of "what a project card looks like."

Concretely: `pages/client/Escrow.tsx` and `pages/admin/Escrow.tsx` both
render `modules/escrow/pages/Wallet.tsx`. When you improve the wallet view,
every role that uses it improves at once.

### What's already real vs. placeholder

Every placeholder page (`components/feedback/PlaceholderPage`) shows a
title, a description of what will live there, and the BRD section it
implements — so `grep -rl "TODO: replace" src/modules` at any point tells
you exactly what's left. As of this scaffold, that's ~130 files.

Pages built with real mock-data-backed logic, not placeholders:
`ProjectList`/`ProjectCard` (projects), `BidComparison`/`MyBids` (bidding),
`MaterialRequests` (procurement), `Wallet` (escrow), `DisputeList`
(disputes), plus all six role dashboards and the marketing homepage.

## Suggested next steps

1. Pick one vertical slice and build it end-to-end through every layer —
   e.g. **Milestones**: `MilestoneList` → `MilestoneDetails` →
   `CreateMilestone` → `MilestoneReview`, wired to `evidence/` and
   `approvals/`. This is the Trust Core, and finishing it first will surface
   whether the module boundaries above actually hold up under real logic.
2. Build the eight-step Project Creation wizard (`CreateProject`, Sec. 16.2).
3. Replace `AuthContext` and `mockData.ts` with real API calls once the
   backend (NestJS per Sec. 28.1) exists — each module's `services/` folder
   is where that wiring belongs.
4. Add route-based code-splitting (`React.lazy` per role) — the bundle is
   now ~1.3MB (recharts is the biggest addition) since everything is eagerly
   imported. This is the next thing worth doing before more pages/charts
   are added.
5. Apply the `useMockLoading` + `Skeleton` pattern used on the client
   dashboard to the other five dashboards and any list-heavy module pages.
6. Extend the sortable-table pattern from the admin dashboard into a
   reusable `components/tables/DataTable.tsx` once a second table needs it —
   don't build the abstraction before there's a second real use case.
