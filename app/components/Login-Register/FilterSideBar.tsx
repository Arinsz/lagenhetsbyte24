"use client";

import { useState } from "react";
import {
  Search,
  CableCarIcon as Elevator,
  Wifi,
  Car,
  Wind
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

interface FilterSidebarProps {
  onSearch: () => void;
  setSearchLocation: (value: string) => void;
}

const cities = ["Stockholm", "Göteborg", "Malmö"];
const areas: { [key: string]: string[] } = {
  Stockholm: [
    "Vasastan",
    "Södermalm",
    "Kungsholmen",
    "Gamla Stan",
    "Östermalm",
    "Hammarby Sjöstad"
  ],
  Göteborg: ["Centrum", "Haga", "Majorna", "Linné", "Avenyn"],
  Malmö: ["Centrum", "Västra Hamnen", "Limhamn", "Hyllie", "Rosengård"]
};

export default function FilterSidebar({
  onSearch,
  setSearchLocation
}: FilterSidebarProps) {
  const [rent, setRent] = useState<number>(5000);
  const [area, setArea] = useState<number>(50);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [amenities, setAmenities] = useState({
    elevator: false,
    wifi: false,
    parking: false,
    balcony: false
  });

  const handleAreaSelect = (area: string) => {
    setSelectedAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  };

  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-4">
        <div className="mt-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Sök plats eller område"
              className="pl-8"
              onChange={(e) => setSearchLocation(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && onSearch()}
            />
          </div>
          <div className="grid gap-2">
            <Label>Stad</Label>
            <Select
              onValueChange={(value) => {
                setSelectedCity(value);
                setSelectedAreas([]);
              }}
            >
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
            <Select
              disabled={!selectedCity}
              onValueChange={(value) => handleAreaSelect(value)}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={selectedCity ? "Välj område" : "Välj stad först"}
                />
              </SelectTrigger>
              <SelectContent>
                {selectedCity &&
                  areas[selectedCity].map((area) => (
                    <SelectItem key={area} value={area}>
                      {area}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          {selectedAreas.length > 0 && (
            <div className="grid gap-2">
              <Label>Valda områden</Label>
              <div className="flex flex-wrap gap-2">
                {selectedAreas.map((area) => (
                  <Badge
                    key={area}
                    variant="secondary"
                    className="cursor-pointer"
                  >
                    {area}
                    <button
                      className="ml-1 text-xs"
                      onClick={() => handleAreaSelect(area)}
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-auto p-4">
        <div className="grid gap-2">
          <Label>Antal rum</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Välj antal rum" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 rum</SelectItem>
              <SelectItem value="2">2 rum</SelectItem>
              <SelectItem value="3">3 rum</SelectItem>
              <SelectItem value="4">4+ rum</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label>Hyra (kr/mån): {rent} kr</Label>
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
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>0 kr</span>
            <span>20 000 kr</span>
          </div>
        </div>

        <div className="grid gap-2">
          <Label>Yta (kvm): {area} kvm</Label>
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
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>0 kvm</span>
            <span>200 kvm</span>
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
        <Button className="w-full" onClick={onSearch}>
          Sök bostäder
        </Button>
      </div>
    </div>
  );
}
