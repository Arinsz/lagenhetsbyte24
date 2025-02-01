"use client";

import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import LoginDialog from "./LoginDialog";
import RegisterDialog from "./RegisterDialog";
import { useAuth } from "../../contexts/AuthContext";
import Link from "next/link";

export default function Header() {
  const { user, logout } = useAuth();

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
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Välkommen, {user.name}!
              </span>
              <Button onClick={logout} variant="outline" size="sm">
                Logga ut
              </Button>
            </div>
          ) : (
            <div className="space-x-2">
              <LoginDialog />
              <RegisterDialog />
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
