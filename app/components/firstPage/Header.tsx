"use client";

import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as Dialog from "@radix-ui/react-dialog"; // Import Radix UI Dialog

import LoginSlider from "../Login-Register/LoginSlider"; // Add this line to import LoginSlider
import { useAuth } from "../../hooks/useAuth"; // Correct import path for useAuth
import { useLogout } from "../../hooks/LogoutFormHook"; // Import the useLogout hook
import Link from "next/link";

export default function Header() {
  const { isLoggedIn, user } = useAuth(); // Remove logout from destructuring
  const { handleLogout, error, isLogoutDialogOpen, setIsLogoutDialogOpen } =
    useLogout(); // Use the useLogout hook

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Home className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">
            Lägenhetbyte24
          </span>
        </Link>
        <nav>
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">{user?.email}</span>
              <Button onClick={handleLogout} variant="outline" size="sm">
                Logga ut
              </Button>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
          ) : (
            <div className="space-x-2">
              <Link href="/pages/register">
                <Button className="bg-white text-black font-medium rounded-md px-6 py-2 text-base duration-300 hover:bg-white hover:underline">
                  Skapa konto
                </Button>
              </Link>
              <LoginSlider />
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
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <Dialog.Title className="text-lg font-bold text-gray-600">
            Logout Successful
          </Dialog.Title>
          <Dialog.Description className="mt-2 text-sm text-gray-600">
            You have been logged out successfully.
          </Dialog.Description>
          <Dialog.Close asChild>
            <button
              className="mt-4 bg-gray-700 text-white font-bold py-2 px-4 rounded hover:bg-gray-600 transition-colors"
              onClick={() => setIsLogoutDialogOpen(false)}
            >
              Close
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Root>
    </header>
  );
}
