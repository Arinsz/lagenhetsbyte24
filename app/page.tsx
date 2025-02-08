import { AuthProvider } from "./contexts/AuthContext";
import Hero from "./components/FirstPage/Hero";
import HowItWorks from "./components/FirstPage/HowItWorks";
import AppDownload from "./components/FirstPage/AppDownload";
import FAQ from "./components/FirstPage/FAQ";
import Testimonials from "./components/FirstPage/Testimonials";
import { LatestListings } from "./components/FirstPage/LatestListings";
import { ChatBot } from "./components/Chatbot";
import Button from "./components/FirstPage/button";

export default function Home() {
  return (
    <AuthProvider>
      <main className="min-h-screen">
        <Hero />
        <AppDownload />
        <HowItWorks />
        <LatestListings />
        <FAQ />
        <ChatBot />
        <div className="flex justify-center mt-10">
          <Button />
        </div>
      </main>
    </AuthProvider>
  );
}
