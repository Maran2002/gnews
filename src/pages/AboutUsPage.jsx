import { Newspaper, Rss, Shield, Users } from 'lucide-react'
import { useSEO } from '@/hooks/useSEO'
import { APP_NAME } from '@/constants'

export default function AboutUsPage() {
  const seo = useSEO({
    title: 'About Us',
    description: `Learn about ${APP_NAME} — your trusted source for aggregated news from India's top publishers.`,
    type: 'website',
  })

  return (
    <div className="max-w-3xl mx-auto">
      {seo}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-red-100 text-red-600 rounded-full mb-4">
          <Newspaper size={28} />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">About {APP_NAME}</h1>
        <p className="text-gray-500 text-sm leading-relaxed max-w-2xl mx-auto">
          {APP_NAME} is a modern news aggregation platform that brings together the latest
          stories from India's most trusted publishers — all in one place, in real time.
        </p>
      </div>

      <div className="prose prose-gray prose-sm sm:prose max-w-none space-y-8">
        <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-3">
            <Rss size={18} className="text-red-600" />
            What We Do
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            {APP_NAME} continuously monitors RSS feeds from leading Indian news outlets including
            The Hindu, Times of India, NDTV, Indian Express, and Economic Times. Our automated
            system fetches, categorises, and displays the latest articles so you always have
            up-to-date headlines at your fingertips — without needing to visit multiple websites.
          </p>
        </section>

        <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-3">
            <Shield size={18} className="text-red-600" />
            Content Sourcing &amp; Attribution
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            All content displayed on {APP_NAME} is sourced directly from publicly available RSS
            feeds published by the respective news organisations. We do not modify, reproduce, or
            claim ownership of any content. Every article prominently displays the original
            publisher and provides a direct link to the source. We respect intellectual property
            and operate in accordance with standard RSS redistribution practices.
          </p>
        </section>

        <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-3">
            <Users size={18} className="text-red-600" />
            Our Mission
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            We believe everyone deserves quick, unbiased access to quality journalism. Our
            mission is to simplify the news-reading experience by surfacing relevant stories
            across politics, business, technology, sports, health, and more — powered by the
            journalism of India's most respected newsrooms.
          </p>
        </section>

        <section className="bg-red-50 rounded-xl border border-red-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Get in Touch</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            For advertising inquiries, partnership opportunities, or feedback, please use our{' '}
            <a href="/become-advertiser" className="text-red-600 font-medium hover:underline">
              contact form
            </a>
            . We aim to respond within one business day.
          </p>
        </section>
      </div>
    </div>
  )
}
