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

  const login = (email: string, password: string) => {
    // Implement login logic here
  };

  const logout = () => {
    alert("You have been logged out.");
    // Implement logout logic here
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
