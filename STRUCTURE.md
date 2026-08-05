# Build OS — Project Structure & Build Tracker

This document is the map of the whole frontend build: what exists in the
scaffold today, what's still a placeholder, and which BRD section each piece
implements. Drop this in the repo root and update the status column as you go.

Status key: `✅ Built` · `🚧 Scaffolded (placeholder route, no real UI yet)` · `⬜ Not started`

---

## 1. Folder structure (as scaffolded)

```
build-os/
├── README.md                      Setup + design system reference
├── STRUCTURE.md                   This file
├── index.html
├── vite.config.ts                 Vite + Tailwind v4 plugin + @ alias
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
├── package.json
│
├── public/
│   └── favicon.svg
│
└── src/
    ├── main.tsx                   Entry point — BrowserRouter + AuthProvider
    ├── App.tsx                    ALL routes live here
    ├── index.css                  Tailwind v4 @theme tokens + design system CSS
    │
    ├── types/
    │   └── index.ts                Domain types: User, Project, Bid, EscrowTransaction,
    │                               Dispute, MaterialRequest, UserRole, ProjectStage...
    │
    ├── data/
    │   └── mockData.ts             Mock records per role — swap for real API calls later
    │
    ├── context/
    │   └── AuthContext.tsx         Demo-only auth + role switcher (replace w/ real auth)
    │
    ├── config/
    │   └── navigation.ts           Per-role sidebar nav items + role display labels
    │
    ├── components/
    │   ├── ui/                     Design system — see section 3 below
    │   │   ├── Button.tsx
    │   │   ├── Badge.tsx
    │   │   ├── Card.tsx
    │   │   ├── StatCard.tsx
    │   │   ├── ProgressBar.tsx
    │   │   ├── TrustScore.tsx
    │   │   ├── EmptyState.tsx
    │   │   └── StagePill.tsx
    │   └── layout/
    │       ├── AppShell.tsx        Sidebar + Topbar wrapper for every dashboard page
    │       ├── Sidebar.tsx         Role-aware nav
    │       └── Topbar.tsx          Role switcher, notifications, user menu
    │
    └── pages/
        ├── marketing/
        │   └── Home.tsx             Public landing page
        ├── auth/
        │   ├── Login.tsx
        │   └── Register.tsx
        └── dashboard/
            ├── PlaceholderPage.tsx  Shared "coming soon" pattern, tagged w/ BRD ref
            ├── ClientOverview.tsx
            ├── ContractorOverview.tsx
            ├── SupplierOverview.tsx
            ├── PMOverview.tsx
            ├── ProfessionalOverview.tsx
            └── AdminOverview.tsx
```

---

## 2. Route map, by role

Every route below already exists in `App.tsx`. "Built" means real widgets and
mock data; "Placeholder" means it routes correctly and shows an empty-state
card tagged with its BRD section, ready for you to fill in.

### Public

| Route | Status | Notes |
|---|---|---|
| `/` | ✅ Built | Hero, 6-step process, role cards, escrow trust section |
| `/login` | ✅ Built | Role-aware, demo auth only |
| `/register` | ✅ Built | Role-aware, demo auth only |

### Client (Sec. 14, 16, 17.3, 18, 19, 20)

| Route | Status | BRD ref |
|---|---|---|
| `/app/client` (Overview) | ✅ Built | Sec. 23 |
| `/app/client/projects` | 🚧 Placeholder | Sec. 16.2 — 8-step creation wizard |
| `/app/client/escrow` | 🚧 Placeholder | Sec. 18 |
| `/app/client/procurement` | 🚧 Placeholder | Sec. 17.3 |
| `/app/client/reports` | 🚧 Placeholder | Sec. 20.3 |
| `/app/client/disputes` | 🚧 Placeholder | Sec. 19.2 |
| `/app/client/passport` | 🚧 Placeholder | Sec. 20.4 |

### Contractor (Sec. 17.1, 40.4)

| Route | Status | BRD ref |
|---|---|---|
| `/app/contractor` (Overview) | ✅ Built | Sec. 23 |
| `/app/contractor/available` | 🚧 Placeholder | Sec. 17.1 |
| `/app/contractor/bids` | 🚧 Placeholder | Sec. 17.1, 24 (Bid Comparison) |
| `/app/contractor/milestones` | 🚧 Placeholder | Sec. 18.4 |
| `/app/contractor/materials` | 🚧 Placeholder | Sec. 17.3 |
| `/app/contractor/payments` | 🚧 Placeholder | Sec. 41.3 |
| `/app/contractor/disputes` | 🚧 Placeholder | Sec. 19.2 |

### Supplier (Sec. 17.2, 40.5, 40.6)

| Route | Status | BRD ref |
|---|---|---|
| `/app/supplier` (Overview) | ✅ Built | Sec. 23 |
| `/app/supplier/catalogue` | 🚧 Placeholder | Sec. 17.2 |
| `/app/supplier/quotations` | 🚧 Placeholder | Sec. 17.3 |
| `/app/supplier/deliveries` | 🚧 Placeholder | Sec. 17.3 |
| `/app/supplier/payments` | 🚧 Placeholder | Sec. 41.3 |
| `/app/supplier/disputes` | 🚧 Placeholder | Sec. 19.2 |

### Project Manager (Sec. 43)

| Route | Status | BRD ref |
|---|---|---|
| `/app/pm` (Overview) | ✅ Built | Sec. 23 |
| `/app/pm/projects` | 🚧 Placeholder | Sec. 16.1 |
| `/app/pm/inspections` | 🚧 Placeholder | Sec. 43.1 |
| `/app/pm/milestones` | 🚧 Placeholder | Sec. 43.3 |
| `/app/pm/risks` | 🚧 Placeholder | Sec. 46.6 (AI risk prediction) |
| `/app/pm/reports` | 🚧 Placeholder | Sec. 20.3 |

### Professional (Sec. 40.7)

| Route | Status | BRD ref |
|---|---|---|
| `/app/professional` (Overview) | ✅ Built | Sec. 23 |
| `/app/professional/invitations` | 🚧 Placeholder | Sec. 40.7 |
| `/app/professional/proposals` | 🚧 Placeholder | Sec. 40.7 |
| `/app/professional/deliverables` | 🚧 Placeholder | Sec. 40.7 |
| `/app/professional/payments` | 🚧 Placeholder | Sec. 41.3 |

### Admin (Sec. 19.3, 15.2, 20.1)

| Route | Status | BRD ref |
|---|---|---|
| `/app/admin` (Overview) | ✅ Built | Platform-wide table, Sec. 19.3 |
| `/app/admin/verification` | 🚧 Placeholder | Sec. 15.2 |
| `/app/admin/projects` | 🚧 Placeholder | Sec. 19.3 |
| `/app/admin/escrow` | 🚧 Placeholder | Sec. 18 |
| `/app/admin/disputes` | 🚧 Placeholder | Sec. 19.2 |
| `/app/admin/compliance` | 🚧 Placeholder | Sec. 20.1 |
| `/app/admin/analytics` | 🚧 Placeholder | Sec. 39.3 |

---

## 3. Design system inventory

| Component | Status | Still needed for the full build |
|---|---|---|
| `Button` | ✅ Built | — |
| `Badge` | ✅ Built | — |
| `Card` / `CardHeader` / `CardBody` | ✅ Built | — |
| `StatCard` | ✅ Built | — |
| `ProgressBar` | ✅ Built | — |
| `TrustScore` | ✅ Built | — |
| `EmptyState` | ✅ Built | — |
| `StagePill` | ✅ Built | — |
| `Modal` / `Drawer` | ⬜ Not started | Needed for award-bid, raise-dispute, approve-milestone flows |
| `Toast` / notification system | ⬜ Not started | Sec. 20.2 Notification Rules |
| `Table` (sortable/filterable) | ⬜ Not started | Admin lists, bid comparison, catalogue |
| `Tabs` | ⬜ Not started | Project detail (Overview / Reports / Escrow / Disputes tabs) |
| `FileUpload` / document dropzone | ⬜ Not started | Sec. 15.3 Document Requirements — needed almost everywhere |
| `Stepper` / wizard shell | ⬜ Not started | Sec. 16.2 Project Creation Wizard (8 steps) |
| `Timeline` (milestone/activity feed) | ⬜ Not started | Monitoring dashboard, dispute history |

---

## 4. Backend & integration (not yet started — frontend only today)

| Area | BRD ref | Notes |
|---|---|---|
| Auth API (register, login, MFA, NIN/BVN/CAC verification) | Sec. 32.1 | Replaces `AuthContext.tsx` demo logic |
| Projects API | Sec. 16, 31 | CRUD + wizard draft-saving |
| Bidding API | Sec. 17.1, 31 | Submit, shortlist, clarify, award |
| Procurement API | Sec. 17.3 | Material requests, quotes, orders |
| Escrow API | Sec. 18, 32.2, 41 | Deposit, release, freeze, refund, audit trail |
| Disputes API | Sec. 19.2 | Open, evidence, resolution |
| Notifications | Sec. 20.2 | Email/SMS/WhatsApp/in-app |
| Digital Property Passport | Sec. 20.4 | Aggregates records across the whole project lifecycle |
| Admin/analytics API | Sec. 39.3 | Revenue, growth, compliance alerts |

Recommended stack per BRD Sec. 28.1: **NestJS/Node.js** backend, **PostgreSQL**,
**Redis** cache, **AWS S3** (or equivalent) for documents/photos/drone footage.

---

## 5. Suggested build order

The BRD's own phasing (Sec. 36) allocates 12–16 weeks to MVP development. Within
the frontend, a sensible order that unblocks the most value fastest:

1. **Design system gaps** — Modal, Table, FileUpload, Tabs, Stepper (unblocks everything below)
2. **Client: Project Creation Wizard** (Sec. 16.2) — the first real action a client takes
3. **Contractor: Bid Submission + Bid Comparison** (Sec. 17.1, 24) — closes the loop from project → award
4. **Escrow Wallet (Client) + Escrow Oversight (Admin)** (Sec. 18) — the platform's core trust mechanic
5. **Monitoring Dashboard + Milestone verification (PM)** (Sec. 43.3) — ties progress to payment release
6. **Procurement + Supplier flows** (Sec. 17.2, 17.3)
7. **Disputes** (Sec. 19.2) across all roles
8. **Digital Property Passport** (Sec. 20.4) — pulls together everything above
9. **Admin verification queue + compliance + analytics** (Sec. 15.2, 20.1, 39.3)
10. **Notifications system** (Sec. 20.2) — cross-cutting, layer in throughout
