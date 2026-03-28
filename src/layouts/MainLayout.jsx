import { Outlet } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdSlot from '@/components/AdSlot'

/**
 * MainLayout — top leaderboard + sidebar (desktop only).
 *
 * Ad density: 2 slots here (banner + sidebar).
 * NewsDetailPage adds 1 more (in-article) = 3 total per page max.
 *
 * Ad slot IDs: Replace the adSlot values with your real AdSense ad unit IDs.
 */
export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* Top leaderboard — 1 of 3 max ad slots */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4">
        <AdSlot variant="banner" adSlot="8865804713" />
      </div>

      {/* Main content + sidebar */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Page content */}
          <main className="flex-1 min-w-0">
            <Outlet />
          </main>

          {/* Sidebar — 2 of 3 max ad slots (desktop only) */}
          <aside className="hidden xl:flex flex-col gap-5 w-72 shrink-0">
            <AdSlot variant="sidebar" adSlot="9641498636" />
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  )
}
