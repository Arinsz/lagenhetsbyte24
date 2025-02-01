"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import * as Slider from "@radix-ui/react-slider"; // Import Radix UI Slider component
import { Input } from "@/components/ui/input"; // Import Input component
import { Textarea } from "@/components/ui/textarea"; // Import Textarea component

export default function ContinueRegisterForm() {
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    postalCode: "",
    description: "",
    housingType: "",
    rooms: 1,
    rent: 1000
  });
  const router = useRouter();
  const [error, setError] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSliderChange = (name: string, value: number[]) => {
    setFormData({ ...formData, [name]: value[0] });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here
    try {
      // Simulate form submission
      console.log("Form submitted:", formData);
      router.push("/"); // Redirect to home or another page after submission
    } catch (error) {
      console.error("Submission failed:", error);
      setError("Form submission failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <Label htmlFor="address">Adress</Label>
        <Input
          id="address"
          name="address"
          required
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Label htmlFor="city">Stad</Label>
        <Input id="city" name="city" required onChange={handleInputChange} />
      </div>
      <div>
        <Label htmlFor="postalCode">Postnummer</Label>
        <Input
          id="postalCode"
          name="postalCode"
          required
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Label htmlFor="description">Beskrivning</Label>
        <Textarea
          id="description"
          name="description"
          required
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Label htmlFor="housingType">Hur vill du bo?</Label>
        <input
          id="housingType"
          name="housingType"
          required
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div>
        <Label htmlFor="rooms">Antal rum</Label>
        <Slider.Root
          id="rooms"
          name="rooms"
          min={1}
          max={10}
          step={1}
          value={[formData.rooms]}
          onValueChange={(value) => handleSliderChange("rooms", value)}
          className="relative flex items-center select-none touch-none w-full h-5"
        >
          <Slider.Track className="bg-gray-200 relative flex-1 h-1 rounded">
            <Slider.Range className="absolute bg-blue-500 h-full rounded" />
          </Slider.Track>
          <Slider.Thumb className="block w-5 h-5 bg-blue-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75" />
        </Slider.Root>
        <div>{formData.rooms} rum</div>
      </div>
      <div>
        <Label htmlFor="rent">Max hyra (SEK)</Label>
        <Slider.Root
          id="rent"
          name="rent"
          min={1000}
          max={20000}
          step={500}
          value={[formData.rent]}
          onValueChange={(value) => handleSliderChange("rent", value)}
          className="relative flex items-center select-none touch-none w-full h-5"
        >
          <Slider.Track className="bg-gray-200 relative flex-1 h-1 rounded">
            <Slider.Range className="absolute bg-blue-500 h-full rounded" />
          </Slider.Track>
          <Slider.Thumb className="block w-5 h-5 bg-blue-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75" />
        </Slider.Root>
        <div>{formData.rent} SEK</div>
      </div>
      <Button
        type="submit"
        className="w-full mt-8 bg-gradient-to-r from-orange-200 to-orange-400 hover:bg-orange-300"
      >
        Skicka
      </Button>
    </form>
  );
}
