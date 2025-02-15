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
import { useMapSearch } from "../../hooks/useMapSearch"; // Import the new hook

export default function MapView() {
  const { center, zoom, searchedArea, handleSearch } = useMapSearch(); // Use the new hook
  const [searchLocation, setSearchLocation] = React.useState("");

  return (
    <div className="flex h-[calc(110vh-4rem)] flex-col lg:flex-row">
      <aside className="w-full lg:w-96 lg:border-r bg-background">
        <FilterSideBar
          onSearch={() => handleSearch(searchLocation)}
          setSearchLocation={setSearchLocation}
        />
      </aside>

      <main className="relative flex-1 lg:ml-0 order-first lg:order-none">
        <Map center={center} zoom={zoom} searchedArea={searchedArea} />
      </main>
    </div>
  );
}
