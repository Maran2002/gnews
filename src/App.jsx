import { HelmetProvider } from 'react-helmet-async'
import { AuthProvider } from '@/context/AuthContext'
import { ConsentProvider } from '@/context/ConsentContext'
import CookieConsent from '@/components/CookieConsent'
import AppRouter from '@/routes'

export default function App() {
  return (
    <HelmetProvider>
      <ConsentProvider>
        <AuthProvider>
          <AppRouter />
          {/* Cookie consent banner — shown globally until user chooses */}
          <CookieConsent />
        </AuthProvider>
      </ConsentProvider>
    </HelmetProvider>
  )
}
