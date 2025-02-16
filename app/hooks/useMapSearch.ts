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

interface MockApiResponse {
  [key: string]: Location;
}

export function useMapSearch() {
  const [center, setCenter] = useState<[number, number]>([59.3293, 18.0686]); // Default to Stockholm
  const [zoom, setZoom] = useState(10);
  const [searchedAreas, setSearchedAreas] = useState<SearchedArea[]>([]);

  const handleSearch = async (locations: string[], isCity: boolean) => {
    try {
      const newSearchedAreas: SearchedArea[] = [];

      locations.forEach((location) => {
        const result = (mockApiResponse as unknown as MockApiResponse)[
          location
        ];
        if (result && !isCity) {
          const isDuplicate = newSearchedAreas.some(
            (area) =>
              area.center[0] === result.center[0] &&
              area.center[1] === result.center[1]
          );
          if (!isDuplicate) {
            newSearchedAreas.push({
              boundingBox: result.boundingBox,
              center: result.center
            });
          }
        }
      });

      if (locations.length > 0) {
        const firstLocation = (mockApiResponse as unknown as MockApiResponse)[
          locations[0]
        ];
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
