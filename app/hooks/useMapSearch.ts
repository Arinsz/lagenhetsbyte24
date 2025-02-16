"use client";

import { useState } from "react";

import { useCoordinates } from "./useCoordinates";

interface SearchedArea {
  boundingBox: [[number, number], [number, number]];
  center: [number, number];
}

export function useMapSearch() {
  const { getCoordinates } = useCoordinates();
  const [center, setCenter] = useState<[number, number]>([62.0, 15.0]); // Default to Sweden
  const [zoom, setZoom] = useState(5); // Zoom level to show Sweden
  const [searchedAreas, setSearchedAreas] = useState<SearchedArea[]>([]);
  const [searchCount, setSearchCount] = useState(0); // Counter for searches

  const handleSearch = async (locations: string[], isCity: boolean) => {
    try {
      const newSearchedAreas: SearchedArea[] = [];

      for (const location of locations) {
        let center: [number, number] | null = null;
        if (location === "Ekerö" || location === "Bro") {
          center = getCoordinates(location as "Ekerö" | "Bro");
        }

        if (center) {
          const boundingBox: [[number, number], [number, number]] = [
            [center[0] - 0.02, center[1] - 0.02], // Adjusted bounding box size
            [center[0] + 0.02, center[1] + 0.02]
          ];
          if (!isCity) {
            newSearchedAreas.push({ boundingBox, center });
          } else {
            setCenter(center);
            setZoom(11);
          }
        } else {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_NOMINATIM_URL}${location}`
          );
          const results = await response.json();
          if (results.length > 0) {
            const result = results[0];
            const boundingBox: [[number, number], [number, number]] = [
              [
                parseFloat(result.boundingbox[0]),
                parseFloat(result.boundingbox[2])
              ],
              [
                parseFloat(result.boundingbox[1]),
                parseFloat(result.boundingbox[3])
              ]
            ];
            center = [parseFloat(result.lat), parseFloat(result.lon)];
            if (!isCity) {
              newSearchedAreas.push({ boundingBox, center });
            } else {
              setCenter(center);
              setZoom(11);
            }
          }
        }
      }

      if (newSearchedAreas.length > 0) {
        setSearchedAreas((prev) => [...prev, ...newSearchedAreas]);
      }

      setSearchCount((prevCount) => {
        const newCount = prevCount + 1;
        console.log(`Search count: ${newCount}`);
        return newCount;
      });
    } catch (error) {
      console.error("Error searching for location:", error);
    }
  };

  return { center, zoom, searchedAreas, handleSearch, searchCount };
}
