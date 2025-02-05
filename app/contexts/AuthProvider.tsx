"use client";

import React, { useState } from "react";
import { AuthContext } from "../hooks/useAuth";

interface User {
  name: string;
  email: string;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

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

      setIsLoggedIn(true);
      setUser({ name: data.user.name, email: data.user.email });
    } catch (error: any) {
      if (error.message === "Please verify your email first") {
        throw new Error("Please verify your email first");
      } else {
        throw new Error("Invalid email or password");
      }
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    alert("You have been logged out.");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
