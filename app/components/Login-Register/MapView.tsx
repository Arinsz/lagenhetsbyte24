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
  const { center, zoom, searchedAreas, handleSearch, searchCount } =
    useMapSearch();
  const [searchLocation, setSearchLocation] = React.useState("");

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <aside className="w-full lg:w-96 lg:border-r bg-background">
        <FilterSideBar
          onSearch={(locations, isCity) => handleSearch(locations, isCity)}
          setSearchLocation={setSearchLocation}
        />
      </aside>

      <main className="relative flex-1 order-first lg:order-none ">
        <Map center={center} zoom={zoom} searchedAreas={searchedAreas} />
      </main>
    </div>
  );
}
