import { Link } from 'react-router-dom'
import {
  ShieldCheck,
  Wallet,
  Building2,
  Users,
  Boxes,
  ClipboardCheck,
  Award,
  ArrowRight,
} from 'lucide-react'
import { PublicLayout } from '@/layouts/PublicLayout'

const roleCards = [
  { icon: Building2, title: 'Clients & Diaspora Investors', body: 'Build at home from anywhere. Fund escrow, review verified bids, and watch every milestone in real time.' },
  { icon: Users, title: 'Contractors', body: 'Get matched to verified projects, bid transparently, and get paid the moment milestones are confirmed.' },
  { icon: Boxes, title: 'Suppliers', body: 'List verified materials, respond to real demand, and receive payment on confirmed delivery.' },
  { icon: ClipboardCheck, title: 'Project Managers', body: 'Inspect, verify and report — with every finding tied directly to escrow release decisions.' },
  { icon: Award, title: 'Professionals', body: 'Architects, engineers and surveyors deliver scoped services and get paid on approved deliverables.' },
  { icon: ShieldCheck, title: 'Build OS Admin', body: 'Govern verification, compliance and disputes with full platform-wide oversight.' },
]

const steps = [
  { n: '01', title: 'Create your project', body: 'Answer an eight-step wizard covering land, design intent, and budget.' },
  { n: '02', title: 'Fund escrow', body: 'Your money sits in a protected wallet — never released without a verified milestone.' },
  { n: '03', title: 'Review verified bids', body: 'Compare contractors by trust score, price, and timeline, side by side.' },
  { n: '04', title: 'Monitor progress remotely', body: 'Photos, reports, and drone updates flow to your dashboard as work happens.' },
  { n: '05', title: 'Approve milestones', body: 'Funds release only after you and your project manager sign off.' },
  { n: '06', title: 'Receive your Property Passport', body: 'A verified digital record of your build — land, approvals, and handover.' },
]

export function Home() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="blueprint-grid border-b border-line">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="max-w-2xl">
            <span className="corner-ticks inline-block border border-ink/15 bg-white px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-ink/50">
              Escrow-secured · Remotely monitored
            </span>
            <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] text-ink">
              Build your home in Nigeria without being there for it.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-ink/60">
              Build OS connects diaspora clients with verified contractors, suppliers and
              professionals — and holds every naira in escrow until the work is confirmed.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-md bg-ink px-5 py-3 text-sm font-medium text-paper hover:bg-ink-2"
              >
                Start a project <ArrowRight size={15} />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-md border border-ink/20 px-5 py-3 text-sm font-medium text-ink hover:bg-ink/5"
              >
                I'm a contractor
              </Link>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-6 border-t border-ink/10 pt-8 sm:grid-cols-4">
            {[
              ['₦2.1B+', 'Escrow protected'],
              ['340+', 'Verified contractors'],
              ['96%', 'Milestones delivered on spec'],
              ['48hrs', 'Avg. dispute resolution'],
            ].map(([stat, label]) => (
              <div key={label}>
                <p className="font-mono text-2xl font-semibold text-ink">{stat}</p>
                <p className="mt-1 text-xs text-ink/50">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="border-b border-line bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="font-mono text-xs uppercase tracking-wide text-amber-dark">The process</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-ink">
            Six steps from land to handover
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="border-l-2 border-amber/40 pl-4">
                <p className="font-mono text-xs text-amber-dark">{s.n}</p>
                <p className="mt-2 font-display text-sm font-semibold text-ink">{s.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/55">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section id="roles" className="border-b border-line">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="font-mono text-xs uppercase tracking-wide text-teal">Built for every party on site</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-ink">One platform, six roles</h2>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {roleCards.map((r) => (
              <div key={r.title} className="rounded-lg border border-line bg-white p-6">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-ink/5 text-ink">
                  <r.icon size={18} />
                </div>
                <p className="mt-4 font-display text-sm font-semibold text-ink">{r.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/55">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section id="trust" className="bg-ink-2">
        <div className="mx-auto max-w-6xl px-6 py-20 text-paper">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-wide text-amber">Escrow, not trust me</p>
              <h2 className="mt-2 font-display text-3xl font-semibold">
                Every payment is tied to a verified milestone.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-paper/60">
                Funds sit in a protected wallet from day one. Contractors and suppliers are paid
                only once a project manager confirms the work — with photos, reports and, where
                needed, drone footage as evidence.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="corner-ticks rounded-lg border border-paper/10 bg-paper/5 p-5">
                <Wallet size={18} className="text-amber" />
                <p className="mt-3 text-sm font-semibold">Milestone escrow</p>
                <p className="mt-1 text-xs text-paper/50">Released only on verified progress</p>
              </div>
              <div className="corner-ticks rounded-lg border border-paper/10 bg-paper/5 p-5">
                <ShieldCheck size={18} className="text-teal" />
                <p className="mt-3 text-sm font-semibold">Trust score</p>
                <p className="mt-1 text-xs text-paper/50">Every contractor and supplier is scored</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </PublicLayout>
  )
}
