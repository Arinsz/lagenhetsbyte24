import { AuthProvider } from "./components/Login-Register/AuthProvider";
import Hero from "./components/FirstPage/Hero";

import HowItWorks from "./components/FirstPage/HowItWorks";
import AppDownload from "./components/FirstPage/AppDownload";

export default function Home() {
  return (
    <AuthProvider>
      <main className="min-h-screen">
        <Hero />
        <HowItWorks />
        <AppDownload />
      </main>
    </AuthProvider>
  );
}
