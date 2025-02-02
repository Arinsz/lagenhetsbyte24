import { AuthProvider } from "./components/Login-Register/AuthProvider";
import Hero from "./components/FirstPage/Hero";
import FeaturedListings from "./components/FeaturedListings";
import HowItWorks from "./components/FirstPage/HowItWorks";
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
