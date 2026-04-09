import { lazy, Suspense } from 'react'
import { Header } from '@/components/sections/Header'
import { HeroSection } from '@/components/sections/HeroSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { AppointmentSection } from '@/components/sections/AppointmentSection'
import { SocialSection } from '@/components/sections/SocialSection'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { Footer } from '@/components/sections/Footer'

const CredibilitySection = lazy(() =>
  import('@/components/sections/CredibilitySection').then((m) => ({
    default: m.CredibilitySection,
  }))
)

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <Suspense fallback={<div className="py-16" />}>
          <CredibilitySection />
        </Suspense>
        <AppointmentSection />
        <SocialSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default App
