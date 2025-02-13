"use client";

import * as React from "react";
import { MapPin, Search, SlidersHorizontal } from "lucide-react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";

// Leaflet icon workaround for Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png"
});

export default function MapView() {
  const [center, setCenter] = React.useState<[number, number]>([62.5, 15]); // Center of Sweden
  const [zoom, setZoom] = React.useState(5);
  const [searchLocation, setSearchLocation] = React.useState("");

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${searchLocation},Sweden`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        setCenter([
          Number.parseFloat(data[0].lat),
          Number.parseFloat(data[0].lon)
        ]);
        setZoom(12);
      }
    } catch (error) {
      console.error("Error searching location:", error);
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col lg:flex-row">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="absolute left-4 top-4 z-50 lg:hidden"
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-full p-0 lg:hidden">
          <SheetHeader className="p-4 border-b">
            <SheetTitle>Sök bostad</SheetTitle>
          </SheetHeader>
          <FilterSidebar
            onSearch={handleSearch}
            setSearchLocation={setSearchLocation}
          />
        </SheetContent>
      </Sheet>

      <aside className="hidden w-96 border-r bg-background lg:block">
        <FilterSidebar
          onSearch={handleSearch}
          setSearchLocation={setSearchLocation}
        />
      </aside>

      <main className="relative flex-1">
        <MapContainer
          center={center}
          zoom={zoom}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapUpdater center={center} zoom={zoom} />
        </MapContainer>
      </main>
    </div>
  );
}

function MapUpdater({
  center,
  zoom
}: {
  center: [number, number];
  zoom: number;
}) {
  const map = useMap();
  React.useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

function FilterSidebar({
  onSearch,
  setSearchLocation
}: {
  onSearch: () => void;
  setSearchLocation: (value: string) => void;
}) {
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
            <Label>Bostadstyp</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Välj bostadstyp" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apartment">Lägenhet</SelectItem>
                <SelectItem value="house">Villa</SelectItem>
                <SelectItem value="townhouse">Radhus</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
          <Label>Hyra (kr/mån)</Label>
          <div className="px-2">
            <Slider
              defaultValue={[5000]}
              max={20000}
              min={0}
              step={500}
              className="py-4"
            />
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>0 kr</span>
            <span>20 000 kr</span>
          </div>
        </div>

        <div className="grid gap-2">
          <Label>Yta (kvm)</Label>
          <div className="px-2">
            <Slider
              defaultValue={[50]}
              max={200}
              min={0}
              step={5}
              className="py-4"
            />
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>0 kvm</span>
            <span>200 kvm</span>
          </div>
        </div>

        <div className="space-y-4">
          <Label>Matchande bostäder</Label>
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="flex gap-4 p-4">
                  <div className="h-20 w-20 shrink-0 rounded-md bg-muted" />
                  <div className="space-y-1">
                    <h3 className="font-medium">2 rum och kök</h3>
                    <p className="text-sm text-muted-foreground">
                      55 kvm • 7 500 kr/mån
                    </p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>Södermalm, Stockholm</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t p-4">
        <Button className="w-full" onClick={onSearch}>
          Visa 45 bostäder
        </Button>
      </div>
    </div>
  );
}
