"use client";

import { useState, useEffect } from "react";
import { CableCarIcon as Elevator, Wifi, Car, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import locations from "../../data/locations.json";

interface FilterSidebarProps {
  onSearch: (locations: string[], isCity: boolean) => void;
  setSearchLocation: (value: string) => void;
}

const cities = locations.cities;
const areas: { [key: string]: string[] } = locations.areas;

export default function FilterSidebar({
  onSearch,
  setSearchLocation
}: FilterSidebarProps) {
  const [rent, setRent] = useState<number>(5000);
  const [area, setArea] = useState<number>(50);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedAreas, setSelectedAreas] = useState<{
    [city: string]: string[];
  }>({});
  const [rooms, setRooms] = useState<number>(2);
  const [amenities, setAmenities] = useState({
    elevator: false,
    wifi: false,
    parking: false,
    balcony: false
  });

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setSearchLocation(city);
    onSearch([city], true);
  };

  const handleAreaSelect = (area: string) => {
    setSelectedAreas((prev) => {
      const cityAreas = prev[selectedCity] || [];
      const updatedAreas = cityAreas.includes(area)
        ? cityAreas.filter((a) => a !== area)
        : [...cityAreas, area];
      return { ...prev, [selectedCity]: updatedAreas };
    });
  };

  useEffect(() => {
    if (selectedCity) {
      const allSelectedAreas = selectedAreas[selectedCity] || [];
      onSearch(allSelectedAreas, false);
    }
  }, [selectedAreas]);

  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-4">
        <div className="mt-4 space-y-4">
          <div className="text-center">
            <h2 className="text-xl mb-1 font-semibold">Var vill du flytta?</h2>
            <p className="text-gray-600">Ange dina önskemål nedan</p>
          </div>
          <div className="grid gap-2">
            <Label>Stad</Label>
            <Select onValueChange={handleCitySelect}>
              <SelectTrigger>
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
          <div className="grid gap-2">
            <Label>Område</Label>
            <Select disabled={!selectedCity} onValueChange={handleAreaSelect}>
              <SelectTrigger>
                <SelectValue
                  placeholder={selectedCity ? "Välj område" : "Välj område"}
                />
              </SelectTrigger>
              <SelectContent>
                {selectedCity &&
                  areas[selectedCity]?.map((area: string) => (
                    <SelectItem key={area} value={area}>
                      {area}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          {Object.entries(selectedAreas).map(
            ([city, areas]) =>
              areas.length > 0 && (
                <div key={city} className="grid gap-2">
                  <Label>Valda områden i {city}</Label>
                  <div className="flex flex-wrap gap-2">
                    {areas.map((area) => (
                      <Badge
                        key={area}
                        className="bg-gray-600 text-white cursor-pointer hover:bg-gray-500"
                        onClick={() => handleAreaSelect(area)}
                      >
                        {area}
                        <button className="ml-1 text-xs">×</button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )
          )}
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-auto p-4">
        <div className="grid gap-2">
          <Label>Minst antal rum: {rooms}</Label>
          <div className="px-2">
            <Slider
              value={[rooms]}
              max={5}
              min={1}
              step={1}
              className="py-4"
              onValueChange={(value) => setRooms(value[0])}
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label>Maxhyra: {rent} kr</Label>
          <div className="px-2">
            <Slider
              value={[rent]}
              max={20000}
              min={0}
              step={500}
              className="py-4"
              onValueChange={(value) => setRent(value[0])}
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label>Minsta yta: {area} kvm</Label>
          <div className="px-2">
            <Slider
              value={[area]}
              max={200}
              min={0}
              step={5}
              className="py-4"
              onValueChange={(value) => setArea(value[0])}
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label>Bekvämligheter</Label>
          <div className="flex flex-col space-y-2">
            <label className="flex items-center space-x-2">
              <Checkbox
                checked={amenities.elevator}
                onCheckedChange={(checked) =>
                  setAmenities((prev) => ({
                    ...prev,
                    elevator: checked as boolean
                  }))
                }
              />
              <Elevator className="h-4 w-4" />
              <span>Hiss</span>
            </label>
            <label className="flex items-center space-x-2">
              <Checkbox
                checked={amenities.wifi}
                onCheckedChange={(checked) =>
                  setAmenities((prev) => ({
                    ...prev,
                    wifi: checked as boolean
                  }))
                }
              />
              <Wifi className="h-4 w-4" />
              <span>Wifi</span>
            </label>
            <label className="flex items-center space-x-2">
              <Checkbox
                checked={amenities.parking}
                onCheckedChange={(checked) =>
                  setAmenities((prev) => ({
                    ...prev,
                    parking: checked as boolean
                  }))
                }
              />
              <Car className="h-4 w-4" />
              <span>Parkering</span>
            </label>
            <label className="flex items-center space-x-2">
              <Checkbox
                checked={amenities.balcony}
                onCheckedChange={(checked) =>
                  setAmenities((prev) => ({
                    ...prev,
                    balcony: checked as boolean
                  }))
                }
              />
              <Wind className="h-4 w-4" />
              <span>Balkong</span>
            </label>
          </div>
        </div>
      </div>

      <div className="border-t p-4">
        <Button
          className="w-full"
          onClick={() =>
            onSearch(
              [selectedCity, ...Object.values(selectedAreas).flat()],
              true
            )
          }
        >
          Forsätt
        </Button>
      </div>
    </div>
  );
}
