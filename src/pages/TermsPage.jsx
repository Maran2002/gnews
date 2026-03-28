import { useSEO } from '@/hooks/useSEO'
import { APP_NAME } from '@/constants'

export default function TermsPage() {
  const seo = useSEO({ title: 'Terms & Conditions', type: 'website' })
  const updated = 'January 1, 2025'

  return (
    <div className="max-w-3xl mx-auto">
      {seo}
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms &amp; Conditions</h1>
      <p className="text-sm text-gray-400 mb-8">Last updated: {updated}</p>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-7 text-sm text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">1. Acceptance of Terms</h2>
          <p>
            By accessing or using {APP_NAME} ("the Service"), you agree to be bound by these
            Terms &amp; Conditions. If you do not agree, please do not use the Service.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">2. Nature of the Service</h2>
          <p>
            {APP_NAME} is a news aggregation service. We collect publicly available RSS feeds from
            reputable news publishers and display headlines, summaries, and links to original
            articles. We do not produce original news content.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">3. Intellectual Property</h2>
          <p>
            All news articles, headlines, images, and related content displayed on {APP_NAME} are
            the intellectual property of their respective publishers. {APP_NAME} claims no ownership
            over third-party content. The {APP_NAME} brand, logo, and site design are our exclusive
            property.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">4. Permitted Use</h2>
          <p>You may use the Service for personal, non-commercial news reading. You must not:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Scrape, crawl, or systematically download content from {APP_NAME}.</li>
            <li>Reproduce or republish {APP_NAME}'s aggregated feeds without permission.</li>
            <li>Use the Service in any way that violates applicable law.</li>
            <li>Attempt to gain unauthorised access to any part of the Service.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">5. Disclaimer of Warranties</h2>
          <p>
            The Service is provided "as is" without warranties of any kind. We do not guarantee
            the accuracy, completeness, or timeliness of aggregated news content, as this depends
            entirely on the source publishers.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">6. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, {APP_NAME} shall not be liable for any indirect,
            incidental, or consequential damages arising from your use of the Service or reliance
            on any content displayed.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">7. Third-Party Links</h2>
          <p>
            The Service links to external websites operated by news publishers. We have no control
            over those sites and are not responsible for their content, privacy practices, or
            availability.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">8. Advertising</h2>
          <p>
            {APP_NAME} may display advertisements. We are not responsible for the content of
            third-party advertisements. Clicking an ad may take you to a third-party site governed
            by that party's terms.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">9. Modifications</h2>
          <p>
            We reserve the right to modify these Terms at any time. Continued use of the Service
            after changes are posted constitutes acceptance of the revised Terms.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">10. Governing Law</h2>
          <p>
            These Terms are governed by the laws of India. Any disputes shall be subject to the
            exclusive jurisdiction of the courts of India.
          </p>
        </section>
      </div>
    </div>
  )
}
