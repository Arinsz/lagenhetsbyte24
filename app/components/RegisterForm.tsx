"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Import Link
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useAuth } from "../contexts/AuthContext";
import type React from "react"; // Added import for React

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "", // Added confirmPassword field
    address: "",
    city: "",
    birthdate: ""
  });
  const { register } = useAuth();
  const router = useRouter();
  const [error, setError] = useState(""); // Added error state

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCityChange = (value: string) => {
    setFormData({ ...formData, city: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Lösenorden matchar inte");
      return;
    }
    try {
      await register(formData.username, formData.email, formData.password);
      router.push("/register/continue");
    } catch (error) {
      console.error("Registration failed:", error);
      setError("Registreringen misslyckades. Försök igen.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Registrera dig på Lägenhetbyte24</CardTitle>
          <CardDescription>
            Fyll i dina uppgifter för att skapa ett konto
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-500">{error}</p>}
            <div>
              <Label htmlFor="username">Användarnamn</Label>
              <Input
                id="username"
                name="username"
                required
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="email">E-post</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="password">Lösenord</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Bekräfta lösenord</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                onChange={handleInputChange}
              />
            </div>

            <Link href="/pages/register/continue">
              <Button
                type="submit"
                variant="outline"
                className="w-full mt-8 bg-gradient-to-r bg-orange-200"
              >
                Forsätt
              </Button>
            </Link>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
