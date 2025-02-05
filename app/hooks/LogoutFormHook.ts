import { useState } from "react";
import { useAuth } from "../contexts/AuthContext"; // Correct import path for useAuth

export const useLogout = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false); // Add state for logout dialog
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      setIsLogoutDialogOpen(true); // Show logout dialog on success
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return {
    handleLogout,
    error,
    isLogoutDialogOpen,
    setIsLogoutDialogOpen
  };
};
