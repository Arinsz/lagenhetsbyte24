"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"; // Import Select components
import * as SliderPrimitive from "@radix-ui/react-slider"; // Import Radix UI Slider component

const cities = [
  "Stockholm",
  "Göteborg",
  "Malmö",
  "Uppsala",
  "Västerås",
  "Örebro",
  "Linköping",
  "Helsingborg",
  "Jönköping",
  "Norrköping"
  // Add more cities as needed
];

export default function ContinueRegisterForm({ onCityChange }) {
  const [formData, setFormData] = useState({
    housingType: "",
    rooms: 1,
    rent: 1000,
    city: ""
  });
  const router = useRouter();
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSliderChange = (name: string, value: number[]) => {
    setFormData({ ...formData, [name]: value[0] });
  };

  const handleCityChange = (value: string) => {
    setFormData({ ...formData, city: value });
    onCityChange(value);
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
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 bg-white rounded-lg shadow-md"
    >
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <Label
          htmlFor="housingType"
          className="block text-lg font-medium text-gray-700"
        >
          Dina önskemål
        </Label>
      </div>
      <div>
        <Label
          htmlFor="rooms"
          className="block text-lg font-medium text-gray-700"
        >
          Antal rum
        </Label>
        <SliderPrimitive.Root
          id="rooms"
          name="rooms"
          min={1}
          max={5}
          step={1}
          value={[formData.rooms]}
          onValueChange={(value) => handleSliderChange("rooms", value)}
          className="relative flex items-center select-none touch-none w-full h-5 mt-1"
        >
          <SliderPrimitive.Track className="bg-gray-200 relative flex-1 h-1 rounded">
            <SliderPrimitive.Range className="absolute bg-gradient-to-r from-blue-400 to-blue-600 h-full rounded" />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb className="block w-5 h-5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75" />
        </SliderPrimitive.Root>
        <div className="text-sm text-gray-500 mt-1">{formData.rooms} rum</div>
      </div>
      <div>
        <Label
          htmlFor="rent"
          className="block text-lg font-medium text-gray-700"
        >
          Max hyra (SEK)
        </Label>
        <SliderPrimitive.Root
          id="rent"
          name="rent"
          min={1000}
          max={30000}
          step={500}
          value={[formData.rent]}
          onValueChange={(value) => handleSliderChange("rent", value)}
          className="relative flex items-center select-none touch-none w-full h-5 mt-1"
        >
          <SliderPrimitive.Track className="bg-gray-200 relative flex-1 h-1 rounded">
            <SliderPrimitive.Range className="absolute bg-gradient-to-r from-blue-400 to-blue-600 h-full rounded" />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb className="block w-5 h-5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75" />
        </SliderPrimitive.Root>
        <div className="text-sm text-gray-500 mt-1">{formData.rent} SEK</div>
      </div>
      <div>
        <Label
          htmlFor="city"
          className="block text-lg font-medium text-gray-700"
        >
          Välj stad
        </Label>
        <Select onValueChange={handleCityChange}>
          <SelectTrigger className="w-full mt-1">
            <SelectValue placeholder="Välj stad" />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button
        type="submit"
        className="w-full mt-8 bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-semibold py-2 rounded-lg shadow-md"
      >
        Skicka
      </Button>
    </form>
  );
}
