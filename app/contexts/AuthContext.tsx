"use client";

import React, { createContext, useContext, useState } from "react";

interface User {
  email: string;
  verified: boolean; // Lägg till verified-egenskap
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.unverified) {
          throw new Error("Vänligen verifiera din e-post först");
        }
        throw new Error(data.message || "Inloggningen misslyckades");
      }

      setIsLoggedIn(true);
      setUser({ email, verified: data.user.verified }); // Sätt verified-egenskap
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Ett okänt fel inträffade");
      }
    }
  };

  const logout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Utloggningen misslyckades");
      }

      setIsLoggedIn(false);
      setUser(null);
      // Säkerställ att inga dialoger triggas vid utloggning
    } catch (error) {
      console.error("Fel vid utloggning:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth måste användas inom en AuthProvider");
  }
  return context;
}

export function logoutUser() {
  const { logout } = useAuth();
  logout();
}
