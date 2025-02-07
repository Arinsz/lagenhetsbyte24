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
          throw new Error("Vänligen verifiera din e-post först");
        }
        setError(data.message || "Inloggningen misslyckades");
        setIsDialogOpen(true);
        throw new Error(data.message || "Inloggningen misslyckades");
      }

      // Hantera lyckad inloggning
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(String(error));
      }
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
