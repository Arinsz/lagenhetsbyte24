import { AuthProvider } from "./contexts/AuthContext"
import Header from "./components/Header"
import Hero from "./components/Hero"
import FeaturedListings from "./components/FeaturedListings"
import HowItWorks from "./components/HowItWorks"
import AppDownload from "./components/AppDownload"

export default function Home() {
  return (
    <AuthProvider>
      <Header />
      <main className="min-h-screen">
        <Hero />
        <FeaturedListings />
        <HowItWorks />
        <AppDownload />
      </main>
    </AuthProvider>
  )
}

