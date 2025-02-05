"use client";

import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

import LoginSlider from "../Login-Register/LoginSlider"; // Add this line to import LoginSlider
import { useAuth } from "../../hooks/useAuth"; // Correct import path for useAuth
import Link from "next/link";

export default function Header() {
  const { isLoggedIn, user, logout } = useAuth(); // Add logout to destructuring

  const handleLogout = () => {
    logout();
    alert("You have successfully logged out.");
  };

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
    </header>
  );
}
