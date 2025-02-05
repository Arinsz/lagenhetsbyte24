import { useState } from "react";
import { useRouter } from "next/navigation";

export const useRegister = () => {
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false); // New state for success dialog
  const router = useRouter();

  const register = async (
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    if (password !== confirmPassword) {
      setError("Lösenorden matchar inte");
      setIsDialogOpen(true);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccessDialogOpen(true); // Show success dialog
      } else {
        setError(data.message || "Registreringen misslyckades. Försök igen.");
        setIsDialogOpen(true);
      }
    } catch (error) {
      console.error("Registreringen misslyckades:", error);
      setError("Registreringen misslyckades. Försök igen.");
      setIsDialogOpen(true);
    }
  };

  return {
    register,
    error,
    isDialogOpen,
    setIsDialogOpen,
    isSuccessDialogOpen,
    setIsSuccessDialogOpen
  }; // Return new state
};
