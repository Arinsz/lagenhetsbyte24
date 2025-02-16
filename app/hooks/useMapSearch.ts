"use client";

import { useState } from "react";

import { useCoordinates } from "./useCoordinates";

interface SearchedArea {
  boundingBox: [[number, number], [number, number]];
  center: [number, number];
  name: string;
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
        let centers: [number, number][] = [];
        const center = getCoordinates(location as Location);
        if (center) centers.push(center);

        for (const center of centers) {
          const boundingBox: [[number, number], [number, number]] = [
            [center[0] - 0.02, center[1] - 0.02], // Adjusted bounding box size
            [center[0] + 0.02, center[1] + 0.02]
          ];
          if (!isCity) {
            newSearchedAreas.push({ boundingBox, center, name: location });
          } else {
            setCenter([62.0, 15.0]); // Zoom out to show Sweden
            setZoom(5);
            setTimeout(() => {
              setCenter(center);
              setZoom(11); // Adjusted zoom level
            }, 500); // Delay to allow zoom out animation
          }
        }

        if (centers.length === 0) {
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
            const center: [number, number] = [
              parseFloat(result.lat),
              parseFloat(result.lon)
            ];
            if (!isCity) {
              newSearchedAreas.push({ boundingBox, center, name: location });
            } else {
              setCenter([62.0, 15.0]); // Zoom out to show Sweden
              setZoom(5);
              setTimeout(() => {
                setCenter(center);
                setZoom(11); // Adjusted zoom level
              }, 500); // Delay to allow zoom out animation
            }
          }
        }
      }

      if (newSearchedAreas.length > 0) {
        setSearchedAreas(newSearchedAreas); // Replace previous areas with new areas
        const lastSearchedArea = newSearchedAreas[newSearchedAreas.length - 1];
        setCenter(lastSearchedArea.center);
        setZoom(14); // Zoom in on the marker
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
