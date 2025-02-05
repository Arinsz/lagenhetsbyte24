import { useState } from "react";

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isVerificationDialogOpen, setIsVerificationDialogOpen] =
    useState(false);

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
          setIsVerificationDialogOpen(true);
          throw new Error("Please verify your email first");
        }
        setError(data.message || "Login failed");
        setIsDialogOpen(true);
        throw new Error(data.message || "Login failed");
      }

      // Handle successful login
    } catch (error) {
      setError(error.message);
      setIsDialogOpen(true);
      throw error;
    }
  };

  return {
    login,
    error,
    isDialogOpen,
    setIsDialogOpen,
    isVerificationDialogOpen,
    setIsVerificationDialogOpen
  };
};
