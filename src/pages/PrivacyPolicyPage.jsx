import { useSEO } from '@/hooks/useSEO'
import { APP_NAME } from '@/constants'

export default function PrivacyPolicyPage() {
  const seo = useSEO({
    title: 'Privacy Policy',
    description: `${APP_NAME} Privacy Policy — how we collect, use, and protect your data. GDPR, CCPA, and IAB TCF v2.3 compliant.`,
  })

  const updated = 'March 27, 2026'

  return (
    <div className="max-w-3xl mx-auto">
      {seo}
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-400 mb-8">Last updated: {updated}</p>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-7 text-sm text-gray-700 leading-relaxed">

        {/* 1. Introduction */}
        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">1. Introduction</h2>
          <p>
            Welcome to {APP_NAME} ("we", "us", "our"). This Privacy Policy explains how we
            collect, use, disclose, and protect your information when you use our news
            aggregation service at gnews.com.
          </p>
          <p className="mt-2">
            By using {APP_NAME} you agree to the practices described here. If you do not agree,
            please discontinue use of the service. This policy applies to all visitors,
            regardless of country of origin.
          </p>
        </section>

        {/* 2. Information We Collect */}
        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">2. Information We Collect</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Contact form data:</strong> If you submit an advertiser inquiry we collect
              your name, email address, company name, phone number, and message.
            </li>
            <li>
              <strong>Usage data:</strong> Standard server logs may record your IP address,
              browser type, pages visited, and timestamps for security and performance purposes.
            </li>
            <li>
              <strong>Consent preference:</strong> Your cookie consent choice is stored in your
              browser's localStorage (key: <code>gnews_consent</code>). This data never leaves
              your device unless transmitted by a third-party ad network.
            </li>
            <li>
              <strong>Cookies &amp; ad tracking:</strong> When you accept cookies, third-party
              ad networks (e.g. Google AdSense) may set their own cookies and use device
              identifiers to show interest-based advertisements. These are governed by those
              networks' own privacy policies.
            </li>
          </ul>
        </section>

        {/* 3. How We Use Your Information */}
        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">3. How We Use Your Information</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>To respond to advertiser and partnership inquiries.</li>
            <li>To monitor and improve site performance and security.</li>
            <li>To serve relevant advertisements to users who have consented.</li>
            <li>To comply with legal obligations under applicable laws.</li>
          </ul>
          <p className="mt-2">
            We do <strong>not</strong> sell, rent, or share your personal data with third parties
            for marketing purposes.
          </p>
        </section>

        {/* 4. News Content & Third-Party Sources */}
        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">4. News Content &amp; Third-Party Sources</h2>
          <p>
            {APP_NAME} aggregates news from publicly available RSS feeds. We do not control the
            privacy practices of linked publishers. When you click through to an original
            article, the publisher's own privacy policy applies.
          </p>
        </section>

        {/* 5. Advertising */}
        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">5. Advertising</h2>
          <p>
            We display advertisements served by Google AdSense. These ads are shown only to
            users who have consented to cookies (see Section 6). Google AdSense may use cookies
            and device identifiers to show ads relevant to your interests based on your browsing
            history and other data. You can opt out via:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>
              <a
                href="https://myadcenter.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 hover:underline"
              >
                Google My Ad Center
              </a>
            </li>
            <li>
              <a
                href="https://optout.networkadvertising.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 hover:underline"
              >
                NAI Opt-Out Tool
              </a>
            </li>
          </ul>
        </section>

        {/* 6. Cookie Consent (IAB TCF v2.3) */}
        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">
            6. Cookie Consent &amp; IAB TCF v2.3
          </h2>
          <p>
            {APP_NAME} implements a Consent Management Platform (CMP) aligned with the{' '}
            <strong>IAB Transparency and Consent Framework (TCF) v2.3</strong>. When you
            first visit the site, a consent banner is displayed asking for your permission to:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Store and access information on your device (cookies)</li>
            <li>Use data for personalised advertising and content</li>
            <li>Measure ad performance and audience insights</li>
          </ul>
          <p className="mt-2">
            You may choose <strong>Accept All</strong> or <strong>Reject</strong>. If you
            reject, only essential functionality cookies will be set and no advertising cookies
            will be placed. Your choice is stored locally in your browser and can be changed
            at any time by clearing your browser's localStorage.
          </p>
          <p className="mt-2">
            Advertising partners process your data under the legal basis of{' '}
            <strong>Legitimate Interests</strong> or <strong>Consent</strong> as described in
            each partner's privacy policy and in accordance with IAB TCF v2.3 purpose definitions.
          </p>
        </section>

        {/* 7. GDPR — EU Residents */}
        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">
            7. GDPR — Your Rights as an EU/EEA Resident
          </h2>
          <p>
            If you are located in the European Union or European Economic Area, the{' '}
            <strong>General Data Protection Regulation (GDPR)</strong> grants you the following
            rights with respect to your personal data:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>
              <strong>Right of Access:</strong> Request a copy of the personal data we hold
              about you.
            </li>
            <li>
              <strong>Right to Rectification:</strong> Request correction of inaccurate or
              incomplete data.
            </li>
            <li>
              <strong>Right to Erasure ("Right to be Forgotten"):</strong> Request deletion of
              your personal data where there is no compelling reason for its continued
              processing.
            </li>
            <li>
              <strong>Right to Restrict Processing:</strong> Request that we limit how we use
              your data.
            </li>
            <li>
              <strong>Right to Data Portability:</strong> Receive your data in a structured,
              machine-readable format.
            </li>
            <li>
              <strong>Right to Object:</strong> Object to processing based on legitimate
              interests or for direct marketing purposes.
            </li>
            <li>
              <strong>Right to Withdraw Consent:</strong> Withdraw any consent you have given
              at any time without affecting the lawfulness of processing before withdrawal.
            </li>
          </ul>
          <p className="mt-2">
            To exercise any of these rights, contact our Data Controller (see Section 11).
            We will respond within <strong>30 days</strong>.
          </p>
        </section>

        {/* 8. CCPA — California Residents */}
        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">
            8. CCPA — California Privacy Rights &amp; "Do Not Sell My Info"
          </h2>
          <p>
            If you are a California resident, the{' '}
            <strong>California Consumer Privacy Act (CCPA)</strong> and{' '}
            <strong>CPRA (California Privacy Rights Act)</strong> provide you with specific
            rights:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>
              <strong>Right to Know:</strong> You may request disclosure of categories and
              specific pieces of personal information we have collected about you in the past
              12 months.
            </li>
            <li>
              <strong>Right to Delete:</strong> You may request deletion of personal information
              we collected about you, subject to certain exceptions.
            </li>
            <li>
              <strong>Right to Opt-Out of Sale/Sharing:</strong> We do not sell your personal
              information. However, if you reject cookies via our consent banner, no data will
              be shared with advertising partners for targeted advertising purposes.
            </li>
            <li>
              <strong>Right to Non-Discrimination:</strong> We will not discriminate against you
              for exercising any of your CCPA rights.
            </li>
            <li>
              <strong>Right to Limit Use of Sensitive Personal Information:</strong> We do not
              intentionally collect sensitive personal information as defined by CPRA.
            </li>
          </ul>
          <p className="mt-2">
            To exercise your California rights, contact us at the address in Section 11.
            We will respond within <strong>45 days</strong> as required by CCPA.
          </p>
        </section>

        {/* 9. Data Retention */}
        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">9. Data Retention</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Contact form submissions: retained for a maximum of 12 months, then deleted.</li>
            <li>Server access logs: retained for 90 days for security purposes.</li>
            <li>
              Consent preferences: stored client-side in localStorage; we do not retain these
              on our servers.
            </li>
          </ul>
        </section>

        {/* 10. Children's Privacy */}
        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">10. Children's Privacy</h2>
          <p>
            {APP_NAME} is not directed to children under the age of 13 (or 16 in the EU).
            We do not knowingly collect personal information from children. If you believe a
            child has provided us with personal information, please contact us immediately.
          </p>
        </section>

        {/* 11. Data Controller */}
        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">11. Data Controller</h2>
          <p>
            For all privacy-related enquiries, requests under GDPR or CCPA, or to withdraw
            consent, please contact our Data Controller:
          </p>
          <address className="not-italic mt-2 pl-4 border-l-2 border-gray-200 space-y-1">
            <p><strong>GNews Editorial Team</strong></p>
            <p>
              Email:{' '}
              <a href="mailto:privacy@gnews.com" className="text-red-600 hover:underline">
                privacy@gnews.com
              </a>
            </p>
            <p className="text-xs text-gray-400">
              (Replace with actual contact details before publishing)
            </p>
          </address>
        </section>

        {/* 12. Changes to This Policy */}
        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-2">12. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. The "Last updated" date at the
            top of this page reflects the most recent revision. Continued use of {APP_NAME}
            after changes are posted constitutes acceptance of the updated policy.
            For material changes, we will display a notice on the site.
          </p>
        </section>

      </div>
    </div>
  )
}
