"use client";

import * as React from "react";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import Map from "./Map";
import FilterSideBar from "./FilterSideBar";

export default function MapView() {
  const [center, setCenter] = React.useState<[number, number]>([62.5, 15]); // Center of Sweden
  const [zoom, setZoom] = React.useState(5);
  const [searchLocation, setSearchLocation] = React.useState("");
  const [searchedArea, setSearchedArea] = React.useState<{
    boundingBox: [[number, number], [number, number]] | null;
    center: [number, number] | null;
  }>({ boundingBox: null, center: null });

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${searchLocation},Sweden&polygon_geojson=1`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon, boundingbox } = data[0];
        const newCenter: [number, number] = [Number(lat), Number(lon)];
        const newBoundingBox: [[number, number], [number, number]] = [
          [Number(boundingbox[0]), Number(boundingbox[2])],
          [Number(boundingbox[1]), Number(boundingbox[3])]
        ];

        setCenter(newCenter);
        setSearchedArea({ boundingBox: newBoundingBox, center: newCenter });
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
          <FilterSideBar
            onSearch={handleSearch}
            setSearchLocation={setSearchLocation}
          />
        </SheetContent>
      </Sheet>

      <aside className="hidden w-96 border-r bg-background lg:block">
        <FilterSideBar
          onSearch={handleSearch}
          setSearchLocation={setSearchLocation}
        />
      </aside>

      <main className="relative flex-1">
        <Map center={center} zoom={zoom} searchedArea={searchedArea} />
      </main>
    </div>
  );
}
