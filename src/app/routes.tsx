import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom'

import { useAuth } from '@/context/AuthContext'
import { ProfileRedirect } from '@/pages/Profile'

import {
  Home,
  Solutions,
  Projects as PublicProjectsPage,
  About,
  Contact,
  Privacy,
  Terms,
  ScrollManager,
} from '@/pages/public/Home'

import { Login } from '@/pages/auth/Login'
import { Join } from '@/pages/auth/Join'
import { Register } from '@/pages/auth/Register'
import { ProjectQuestionnaire } from '@/components/ProjectQuestionnaire'

/* -------------------------------------------------------------------------- */
/* Client: the whole /app/client/* tree lives in clientHubs.tsx               */
/* -------------------------------------------------------------------------- */

import { clientHubRoutes } from './clientHubs'

/* -------------------------------------------------------------------------- */
/* Contractor, Marketplace, Professional, Project Manager, Admin: roleHubs.tsx */
/* -------------------------------------------------------------------------- */

import { adminRoutes, contractorRoutes, marketRoutes, pmRoutes, professionalRoutes } from './roleHubs'

/* -------------------------------------------------------------------------- */
/* Signed-in guard: logged-out visitors are sent to /login                     */
/* -------------------------------------------------------------------------- */

function RequireAuth() {
  const { isAuthenticated } = useAuth()
  const { pathname } = useLocation()

  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: pathname }} />
  return <Outlet />
}

/* =============================================================================
 * APP ROUTES
 *
 * Specific routes always beat the "/app/client/*" style fallbacks at the bottom,
 * regardless of order. A client link that bounces to the dashboard means its
 * route is missing from clientHubs.tsx.
 * ========================================================================== */

export function AppRoutes() {
  return (
    <>
      <ScrollManager />

      <Routes>
        {/* ================================ PUBLIC ================================ */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/register" element={<Register />} />
        <Route path="/projects" element={<PublicProjectsPage />} />
        <Route path="/solutions/:audience" element={<Solutions />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />

        {/* Everything below needs a signed-in user. */}
        <Route element={<RequireAuth />}>
          {/* ======================== ONBOARDING / PROJECT STUDIO =================== */}
          {/* Canonical Project Studio route (CLIENT_ROUTES.studio = '/onboarding'). */}
          <Route path="/onboarding" element={<ProjectQuestionnaire />} />

          {/* ================================ CLIENT ================================ */}
          {/* Overview, projects, decisions, escrow, procurement, reports, disputes,
              passport, documents, evidence, milestones, updates, messages, and the
              legacy /vault + /questionnaire redirects. */}
          {clientHubRoutes}

          {/* ============================== CONTRACTOR ============================== */}
          {contractorRoutes}

          {/* ============================== MARKETPLACE ============================= */}
          {marketRoutes}

          {/* ============================ PROJECT MANAGER =========================== */}
          {pmRoutes}

          {/* ============================== PROFESSIONAL ============================ */}
          {professionalRoutes}

          {/* ================================= ADMIN ================================ */}
          {adminRoutes}
        </Route>

        {/* Legacy /profile link from older account menus */}
        <Route path="/profile" element={<ProfileRedirect />} />

        {/* ============================ APPLICATION FALLBACKS ===================== */}
        <Route path="/app" element={<Navigate to="/app/client" replace />} />
        <Route path="/app/client/*" element={<Navigate to="/app/client" replace />} />
        <Route path="/app/contractor/*" element={<Navigate to="/app/contractor" replace />} />
        <Route path="/app/market/*" element={<Navigate to="/app/market" replace />} />
        <Route path="/app/pm/*" element={<Navigate to="/app/pm" replace />} />
        <Route path="/app/professional/*" element={<Navigate to="/app/professional" replace />} />
        <Route path="/app/admin/*" element={<Navigate to="/app/admin" replace />} />
        <Route path="/app/*" element={<Navigate to="/app/client" replace />} />

        {/* Global fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}