"use client";

import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext"; // Correct import path for AuthContext

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const logoutUser = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST"
      });
      if (!response.ok) {
        throw new Error("Failed to logout");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return { ...context, logoutUser };
}
