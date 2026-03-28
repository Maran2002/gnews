import { Link } from 'react-router-dom'
import { Newspaper, Mail } from 'lucide-react'
import { APP_NAME, QUICK_LINKS } from '@/constants'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-400 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 text-white text-xl font-bold mb-3">
              <Newspaper size={20} />
              {APP_NAME}
            </div>
            <p className="text-sm leading-relaxed">
              Stay informed with the latest headlines, breaking news, and in-depth
              reporting. Content is aggregated from trusted RSS feeds and credited
              to original publishers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / Attribution */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Contact
            </h3>
            <Link
              to="/become-advertiser"
              className="inline-flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors mb-3"
            >
              <Mail size={15} />
              Advertise with us
            </Link>
            <p className="text-sm leading-relaxed">
              All news content is aggregated from publicly available RSS feeds.
              Each article links to the original publisher. {APP_NAME} does not
              claim ownership of third-party content.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span>&copy; {year} {APP_NAME}. News content belongs to respective publishers.</span>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
