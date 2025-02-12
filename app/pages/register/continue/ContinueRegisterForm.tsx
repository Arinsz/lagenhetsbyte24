"use client";

import { useState, useEffect } from "react";
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

const areas = {
  Stockholm: ["Bromma", "Södermalm", "Östermalm"],
  Göteborg: ["Hisingen", "Linnéstaden", "Majorna"],
  Malmö: ["Västra Hamnen", "Limhamn", "Rosengård"]
  // Add more areas as needed
};

export default function ContinueRegisterForm({ onCityChange, onAreaChange }) {
  const [formData, setFormData] = useState({
    housingType: "",
    rooms: 1,
    rent: 1000,
    city: "",
    areas: [] as string[]
  });
  const router = useRouter();
  const [error, setError] = useState("");

  useEffect(() => {
    if (formData.city) {
      setFormData({ ...formData, areas: [] });
    }
  }, [formData.city]);

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

  const handleAreaChange = (value: string) => {
    if (!formData.areas.includes(value)) {
      setFormData({ ...formData, areas: [...formData.areas, value] });
      onAreaChange(value);
    }
  };

  const handleRemoveArea = (area: string) => {
    setFormData({
      ...formData,
      areas: formData.areas.filter((a) => a !== area)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here
    try {
      // Simulate form submission
      console.log("Formulär skickat:", formData);
      router.push("/"); // Redirect to home or another page after submission
    } catch (error) {
      console.error("Skickandet misslyckades:", error);
      setError("Formulär skickandet misslyckades. Försök igen.");
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
          Minst antal rum
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
            <SliderPrimitive.Range className="absolute bg-primary h-full rounded" />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb className="block w-5 h-5 bg-primary rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75" />
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
            <SliderPrimitive.Range className="absolute bg-primary h-full rounded" />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb className="block w-5 h-5 bg-primary rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75" />
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
      {formData.city && (
        <div>
          <Label
            htmlFor="area"
            className="block text-lg font-medium text-gray-700"
          >
            Välj område
          </Label>
          <Select onValueChange={handleAreaChange}>
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Välj område" />
            </SelectTrigger>
            <SelectContent>
              {areas[formData.city].map((area) => (
                <SelectItem key={area} value={area}>
                  {area}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      {formData.areas.length > 0 && (
        <div className="text-sm text-gray-700 font-medium">
          Valda områden:
          <ul className="list-disc pl-0 mt-2 space-y-2">
            {formData.areas.map((area) => (
              <li key={area} className="flex justify-between items-center">
                {area}
                <button
                  type="button"
                  onClick={() => handleRemoveArea(area)}
                  className="text-red-500 hover:text-red-700 ml-2"
                >
                  Ta bort
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <Button
        type="submit"
        className="w-full mt-8 bg-primary text-white font-bold py-2 px-4 rounded hover:bg-gray-600"
      >
        Gå vidare
      </Button>
    </form>
  );
}
