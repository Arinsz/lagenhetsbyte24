import { AuthProvider } from "./contexts/AuthContext";
import Hero from "./components/FirstPage/Hero";

import HowItWorks from "./components/FirstPage/HowItWorks";
import AppDownload from "./components/FirstPage/AppDownload";

import FAQ from "./components/FirstPage/FAQ";

export default function Home() {
  return (
    <AuthProvider>
      <main className="min-h-screen">
        <Hero />

        <HowItWorks />
        <FAQ />
        <AppDownload />
      </main>
    </AuthProvider>
  );
}
