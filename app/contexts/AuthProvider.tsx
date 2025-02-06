"use client";

import React, { useState } from "react";
import { AuthContext } from "../contexts/AuthContext"; // Correct import path for AuthContext
import { useRouter } from "next/router"; // Import useRouter from next/router

interface User {
  name: string;
  email: string;
  verified: boolean; // Add verified property
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter(); // Initialize useRouter

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      setUser({
        name: data.user.name,
        email: data.user.email,
        verified: data.user.verified
      });
    } catch (error: any) {
      if (error.message === "Please verify your email first") {
        throw new Error("Please verify your email first");
      } else {
        throw new Error("Invalid email or password");
      }
    }
  };

  const logout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      setIsLoggedIn(false);
      setUser(null);
      router.push("http://localhost:3000"); // Redirect to localhost:3000
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
