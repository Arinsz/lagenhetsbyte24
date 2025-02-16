"use client";

import { useState } from "react";
import mockApiResponse from "../data/mockApiResponse.json";

interface Location {
  center: [number, number];
  boundingBox: [[number, number], [number, number]];
}

interface SearchedArea {
  boundingBox: [[number, number], [number, number]];
  center: [number, number];
}

export function useMapSearch() {
  const [center, setCenter] = useState<[number, number]>([59.3293, 18.0686]); // Default to Stockholm
  const [zoom, setZoom] = useState(10);
  const [searchedAreas, setSearchedAreas] = useState<SearchedArea[]>([]);

  const handleSearch = async (locations: string[], isCity: boolean) => {
    try {
      const newSearchedAreas: SearchedArea[] = [];

      locations.forEach((location) => {
        const result = mockApiResponse[location];
        if (result && !isCity) {
          newSearchedAreas.push({
            boundingBox: result.boundingBox,
            center: result.center
          });
        }
      });

      if (locations.length > 0) {
        const firstLocation = mockApiResponse[locations[0]];
        if (firstLocation) {
          setCenter(firstLocation.center);
          setZoom(isCity ? 11 : 13);
        }
      }

      setSearchedAreas(newSearchedAreas);
    } catch (error) {
      console.error("Error searching for location:", error);
    }
  };

  return { center, zoom, searchedAreas, handleSearch };
}
