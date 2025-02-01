import { AuthProvider } from "./contexts/AuthContext";
import Header from "./components/firstPage/Header";
import Hero from "./components/firstPage/Hero";
import Footer from "./components/firstPage/Footer";
import FeaturedListings from "./components/FeaturedListings";
import HowItWorks from "./components/firstPage/HowItWorks";
import AppDownload from "./components/AppDownload";

export default function Home() {
  return (
    <AuthProvider>
      <Header />

      <main className="min-h-screen">
        <Hero />
        <HowItWorks />
        <AppDownload />
        <FeaturedListings />
        <Footer />
      </main>
    </AuthProvider>
  );
}
