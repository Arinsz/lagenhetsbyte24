"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import LoginSlider from "../Login-Register/LoginSlider"; // Import LoginSlider
import { useAuth } from "../../hooks/useAuth"; // Import useAuth

export default function Header() {
  const [isLoginSliderOpen, setIsLoginSliderOpen] = useState(false);
  const { isLoggedIn } = useAuth();

  const handleLoginClick = () => {
    setIsLoginSliderOpen(true);
  };

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          Lägenhetsbyte24
        </Link>
        <nav className="hidden lg:flex flex-wrap lg:space-x-4">
          <Link
            href="/sok-annonser"
            className="text-xs md:text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Sök annonser
          </Link>
          <Link
            href="/sa-fungerar-det"
            className="text-xs md:text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Så fungerar det
          </Link>
          <Link
            href="/nyheter-artiklar"
            className="text-xs md:text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Nyheter & Artiklar
          </Link>
        </nav>
        <div className="flex items-center space-x-2">
          {isLoggedIn ? (
            <img
              src="/public/images/user.png"
              alt="User"
              className="h-8 w-8 rounded-full"
            />
          ) : (
            <>
              <Button variant="outline" onClick={handleLoginClick}>
                Logga in
              </Button>
              <Link href="/pages/register">
                <Button>Kom igång gratis</Button>
              </Link>
            </>
          )}
        </div>
      </div>
      <LoginSlider
        open={isLoginSliderOpen}
        onOpenChange={setIsLoginSliderOpen}
        onLoginClick={handleLoginClick}
      />
    </header>
  );
}
