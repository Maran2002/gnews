import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import Loader from '@/components/Loader'
import ProtectedRoute from '@/components/ProtectedRoute'

// Public pages
const NewsFeedPage       = lazy(() => import('@/pages/NewsFeedPage'))
const NewsDetailPage     = lazy(() => import('@/pages/NewsDetailPage'))
const CategoryFeedPage   = lazy(() => import('@/pages/CategoryFeedPage'))
const SearchPage         = lazy(() => import('@/pages/SearchPage'))
const AboutUsPage        = lazy(() => import('@/pages/AboutUsPage'))
const PrivacyPolicyPage  = lazy(() => import('@/pages/PrivacyPolicyPage'))
const TermsPage          = lazy(() => import('@/pages/TermsPage'))
const BecomeAdvertiserPage = lazy(() => import('@/pages/BecomeAdvertiserPage'))

// Admin pages (no MainLayout)
const AdminLoginPage     = lazy(() => import('@/pages/AdminLoginPage'))
const AdminDashboardPage = lazy(() => import('@/pages/AdminDashboardPage'))

function Wrap({ children, label }) {
  return <Suspense fallback={<Loader label={label} />}>{children}</Suspense>
}

const router = createBrowserRouter([
  // ── Public routes (with MainLayout) ────────────────────────────────────────
  {
    element: <MainLayout />,
    children: [
      { path: '/',                element: <Wrap><NewsFeedPage /></Wrap> },
      { path: '/news/:id',        element: <Wrap label="Loading article…"><NewsDetailPage /></Wrap> },
      { path: '/category/:type',  element: <Wrap><CategoryFeedPage /></Wrap> },
      { path: '/search',          element: <Wrap><SearchPage /></Wrap> },
      { path: '/about',           element: <Wrap><AboutUsPage /></Wrap> },
      { path: '/privacy',         element: <Wrap><PrivacyPolicyPage /></Wrap> },
      { path: '/terms',           element: <Wrap><TermsPage /></Wrap> },
      { path: '/become-advertiser', element: <Wrap><BecomeAdvertiserPage /></Wrap> },
    ],
  },

  // ── Admin routes (no MainLayout) ────────────────────────────────────────────
  {
    path: '/admin/login',
    element: <Wrap><AdminLoginPage /></Wrap>,
  },
  {
    path: '/admin',
    element: (
      <Wrap>
        <ProtectedRoute>
          <AdminDashboardPage />
        </ProtectedRoute>
      </Wrap>
    ),
  },
])

export default function AppRouter() {
  return <RouterProvider router={router} />
}
