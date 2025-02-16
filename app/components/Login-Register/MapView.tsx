"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import FilterSideBar from "./FilterSideBar";
import { useMapSearch } from "../../hooks/useMapSearch";

const Map = dynamic(() => import("./Map"), {
  loading: () => <p>Loading map...</p>,
  ssr: false
});

export default function MapView() {
  const { center, zoom, searchedArea, handleSearch } = useMapSearch();
  const [searchLocation, setSearchLocation] = React.useState("");

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col lg:flex-row">
      <aside className="w-full lg:w-96 lg:border-r bg-background">
        <FilterSideBar
          onSearch={(location, isCity) => handleSearch(location, isCity)}
          setSearchLocation={setSearchLocation}
        />
      </aside>

      <main className="relative flex-1 lg:ml-0 order-first lg:order-none">
        <Map center={center} zoom={zoom} searchedArea={searchedArea} />
      </main>
    </div>
  );
}
