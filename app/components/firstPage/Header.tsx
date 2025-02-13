"use client";

import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as Dialog from "@radix-ui/react-dialog"; // Import Radix UI Dialog

import LoginSlider from "../Login-Register/LoginSlider"; // Add this line to import LoginSlider
import { useAuth } from "../../hooks/useAuth"; // Correct import path for useAuth
import { useLogout } from "../../hooks/LogoutFormHook"; // Import the useLogout hook
import Link from "next/link";
import { CheckCircle } from "lucide-react"; // Import CheckCircle icon
import { useState, useEffect } from "react"; // Import useState and useEffect
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation

export default function Header() {
  const { isLoggedIn, user } = useAuth();
  const { handleLogout, error, isLogoutDialogOpen, setIsLogoutDialogOpen } =
    useLogout();
  const [isLoginSliderOpen, setIsLoginSliderOpen] = useState(false); // State to control LoginSlider
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    if (isLoginSliderOpen) {
      document.body.classList.add("fixed-body");
    } else {
      document.body.classList.remove("fixed-body");
    }
  }, [isLoginSliderOpen]);

  const handleGetStarted = () => {
    router.push("/pages/register"); // Navigate to the registration page
  };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-50">
          <Link href="/" className="flex items-center">
            <span className="ml-2 text-xl font-bold text-gray-800 text-base sm:text-lg md:text-xl lg:text-2xl">
              Lägenhetsbyte24
            </span>
          </Link>

          <div className="hidden md:flex md:items-center md:justify-center md:flex-1 md:ml-10 lg:flex lg:items-center lg:justify-center lg:flex-1 lg:ml-10 xl:flex xl:items-center xl:justify-center xl:flex-1 xl:ml-10">
            <Link
              href="/sok-annonser"
              className="text-gray-600 hover:text-gray-900 mx-4 text-xs sm:text-sm md:text-sm lg:text-lg"
            >
              Sök annonser
            </Link>
            <Link
              href="/sa-fungerar-det"
              className="text-gray-600 hover:text-gray-900 mx-4 text-xs sm:text-sm md:text-sm lg:text-lg"
            >
              Så fungerar det
            </Link>
            <Link
              href="/nyheter"
              className="text-gray-600 hover:text-gray-900 mx-4 text-xs sm:text-sm md:text-sm lg:text-lg"
            >
              Nyheter & Artiklar
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {!isLoggedIn ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => setIsLoginSliderOpen(true)}
                  className="text-xs sm:text-sm md:text-base lg:text-lg"
                >
                  Logga in
                </Button>
                <Button
                  className="bg-primary text-white hover:bg-primary/90 text-xs sm:text-sm md:text-base lg:text-lg"
                  onClick={handleGetStarted} // Add onClick handler
                >
                  Kom igång gratis
                </Button>
              </>
            ) : (
              <div
                className="flex items-center space-x-2 cursor-pointer relative group bg-white"
                onClick={() => setIsLoginSliderOpen(true)}
              >
                <img
                  src="/images/user.png"
                  alt="User Avatar"
                  className="h-10 w-10 rounded-full transition-transform duration-200 group-hover:scale-125"
                />
                <span className="text-xs text-primary bg-white px-2 py-1 rounded-md transition-colors duration-200 sm:text-xs md:text-sm lg:text-base">
                  {user?.email}
                </span>
              </div>
            )}
          </div>
        </div>
      </nav>
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 cursor-pointer">
            <Home className="h-6 w-6 text-blue-600 text-xs sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" />
            <span className="text-xl font-bold text-gray-900 text-base sm:text-lg md:text-xl lg:text-2xl">
              Lägenhetbyte24
            </span>
          </Link>
          <nav className="hidden lg:flex">
            {!isLoggedIn && (
              <div className="flex space-x--4 sm:space-x-0 xs:space-x-0">
                <Link href="/pages/register">
                  <Button className="bg-white text-black font-medium rounded-md px-6 py-2 text-xs sm:text-sm md:text-base lg:text-lg duration-300 hover:bg-white hover:underline">
                    Skapa konto
                  </Button>
                </Link>
                <Button
                  onClick={() => setIsLoginSliderOpen(true)}
                  className="bg-white text-black font-medium rounded-md px-6 py-2 text-xs sm:text-sm md:text-base lg:text-lg duration-300 hover:bg-white hover:underline"
                >
                  Logga in
                </Button>
              </div>
            )}
            {isLoggedIn && (
              <div
                className="flex items-center space-x-2 cursor-pointer relative group bg-white"
                onClick={() => setIsLoginSliderOpen(true)}
              >
                <img
                  src="/images/user.png"
                  alt="User Avatar"
                  className="h-10 w-10 rounded-full transition-transform duration-200 group-hover:scale-125"
                />
                <span className="text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded-md shadow-sm group-hover:bg-gray-200 transition-colors duration-200 sm:text-xs md:text-sm lg:text-base">
                  {user?.email}
                </span>
              </div>
            )}
          </nav>
        </div>
        <LoginSlider
          open={isLoginSliderOpen}
          onOpenChange={setIsLoginSliderOpen}
        />{" "}
        {/* Add LoginSlider */}
      </header>
    </>
  );
}
