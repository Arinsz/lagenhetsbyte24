import { AuthProvider } from "./contexts/AuthContext";
import Hero from "./components/firstPage/Hero";
import FeaturedListings from "./components/FeaturedListings";
import HowItWorks from "./components/firstPage/HowItWorks";
import AppDownload from "./components/AppDownload";

export default function Home() {
  return (
    <AuthProvider>
      <main className="min-h-screen">
        <Hero />
        <HowItWorks />
        <AppDownload />
        <FeaturedListings />
      </main>
    </AuthProvider>
  );
}
