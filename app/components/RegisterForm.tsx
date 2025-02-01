"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "../contexts/AuthContext"
import type React from "react" // Added import for React

const MapWithNoSSR = dynamic(() => import("../components/Map"), {
  ssr: false,
})

const cityPolygons = {
  stockholm: [
    [59.3293, 18.0686],
    [59.3293, 18.1686],
    [59.2293, 18.1686],
    [59.2293, 18.0686],
  ],
  gothenburg: [
    [57.7089, 11.9746],
    [57.7089, 12.0746],
    [57.6089, 12.0746],
    [57.6089, 11.9746],
  ],
  malmo: [
    [55.605, 13.0038],
    [55.605, 13.1038],
    [55.505, 13.1038],
    [55.505, 13.0038],
  ],
}

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
    city: "",
    birthdate: "",
  })
  const [selectedCity, setSelectedCity] = useState("")
  const { register } = useAuth()
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleCityChange = (value: string) => {
    setFormData({ ...formData, city: value })
    setSelectedCity(value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await register(formData.username, formData.email, formData.password)
      router.push("/")
    } catch (error) {
      console.error("Registration failed:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Registrera dig på Lägenhetbyte24</CardTitle>
          <CardDescription>Fyll i dina uppgifter för att skapa ett konto</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="username">Användarnamn</Label>
                <Input id="username" name="username" required onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="email">E-post</Label>
                <Input id="email" name="email" type="email" required onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="password">Lösenord</Label>
                <Input id="password" name="password" type="password" required onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="address">Adress</Label>
                <Input id="address" name="address" required onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="city">Stad</Label>
                <Select onValueChange={handleCityChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Välj stad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="stockholm">Stockholm</SelectItem>
                    <SelectItem value="gothenburg">Göteborg</SelectItem>
                    <SelectItem value="malmo">Malmö</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="birthdate">Födelsedatum</Label>
                <Input
                  id="birthdate"
                  name="birthdate"
                  type="date"
                  required
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <Button type="submit" className="w-full">
                Registrera
              </Button>
            </form>
            <div className="h-[400px] rounded-lg overflow-hidden">
              <MapWithNoSSR selectedCity={selectedCity} cityPolygons={cityPolygons} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

