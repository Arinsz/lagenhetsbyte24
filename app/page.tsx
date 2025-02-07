import { AuthProvider } from "./contexts/AuthContext";
import Hero from "./components/FirstPage/Hero";

import HowItWorks from "./components/FirstPage/HowItWorks";
import AppDownload from "./components/FirstPage/AppDownload";
import Testimonials from "./components/FirstPage/Testimonials";

export default function Home() {
  return (
    <AuthProvider>
      <main className="min-h-screen">
        <Hero />
        <Testimonials />
        <HowItWorks />
        <AppDownload />
      </main>
    </AuthProvider>
  );
}
