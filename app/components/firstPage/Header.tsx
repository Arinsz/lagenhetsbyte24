"use client";

import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as Dialog from "@radix-ui/react-dialog"; // Import Radix UI Dialog

import LoginSlider from "../Login-Register/LoginSlider"; // Add this line to import LoginSlider
import { useAuth } from "../../hooks/useAuth"; // Correct import path for useAuth
import { useLogout } from "../../hooks/LogoutFormHook"; // Import the useLogout hook
import Link from "next/link";
import { CheckCircle } from "lucide-react"; // Import CheckCircle icon
import { useState } from "react"; // Import useState
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation

export default function Header() {
  const { isLoggedIn, user } = useAuth();
  const { handleLogout, error, isLogoutDialogOpen, setIsLogoutDialogOpen } =
    useLogout();
  const [isLoginSliderOpen, setIsLoginSliderOpen] = useState(false); // State to control LoginSlider
  const router = useRouter(); // Initialize useRouter

  const handleGetStarted = () => {
    router.push("/pages/register"); // Navigate to the registration page
  };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
          <Link href="/" className="flex items-center">
            <span className="ml-2 text-xl font-bold text-gray-800">
              Lägenhetsbyte24
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="/sok-annonser"
              className="text-gray-600 hover:text-gray-900"
            >
              Sök annonser
            </Link>
            <Link
              href="/sa-fungerar-det"
              className="text-gray-600 hover:text-gray-900"
            >
              Så fungerar det
            </Link>
            <Link href="/nyheter" className="text-gray-600 hover:text-gray-900">
              Nyheter & Artiklar
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="hidden md:inline-flex"
              onClick={() => setIsLoginSliderOpen(true)}
            >
              Logga in
            </Button>
            <Button
              className="bg-primary text-white hover:bg-primary/90"
              onClick={handleGetStarted} // Add onClick handler
            >
              Kom igång gratis
            </Button>
          </div>
        </div>
      </nav>
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 cursor-pointer">
            <Home className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">
              Lägenhetbyte24
            </span>
          </Link>
          <nav>
            {!isLoggedIn && (
              <div className="flex space-x--4 sm:space-x-0 xs:space-x-0">
                <Link href="/pages/register">
                  <Button className="bg-white text-black font-medium rounded-md px-6 py-2  sm:text-sm xs:text-xs duration-300 hover:bg-white hover:underline">
                    Skapa konto
                  </Button>
                </Link>
                <Button
                  onClick={() => setIsLoginSliderOpen(true)}
                  className="bg-white text-black font-medium rounded-md px-6 py-2 duration-300 hover:bg-white hover:underline  sm:text-sm xs:text-xs"
                >
                  Logga in
                </Button>
              </div>
            )}
            {isLoggedIn && (
              <div
                className="flex items-center space-x-2 cursor-pointer relative group"
                onClick={() => setIsLoginSliderOpen(true)}
              >
                <img
                  src="/images/user.png"
                  alt="User Avatar"
                  className="h-10 w-10 rounded-full transition-transform duration-200 group-hover:scale-125"
                />
                <span className="text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded-md shadow-sm group-hover:bg-gray-200 transition-colors duration-200">
                  {user?.email}
                </span>
              </div>
            )}
          </nav>
        </div>
        <Dialog.Root
          open={isLogoutDialogOpen}
          onOpenChange={setIsLogoutDialogOpen}
        >
          <Dialog.Trigger asChild>
            <button className="hidden">Open Dialog</button>
          </Dialog.Trigger>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
          <Dialog.Content className="fixed top-[calc(50%-2cm)] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-50 max-w-md w-full">
            <div className="flex flex-col items-center">
              <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
              <Dialog.Title className="text-2xl font-bold text-gray-800">
                Utloggning lyckades
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-center text-gray-600">
                Du har loggats ut.
              </Dialog.Description>
              <Dialog.Close asChild>
                <Button
                  onClick={() => setIsLogoutDialogOpen(false)}
                  className="mt-6 bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-500 focus:outline-none"
                >
                  Stäng
                </Button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Root>
        <LoginSlider
          open={isLoginSliderOpen}
          onOpenChange={setIsLoginSliderOpen}
        />{" "}
        {/* Add LoginSlider */}
      </header>
    </>
  );
}
