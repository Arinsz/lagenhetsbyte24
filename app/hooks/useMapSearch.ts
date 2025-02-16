"use client";

import { useState } from "react";

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
      const mockApiResponse: { [key: string]: Location } = {
        Stockholm: {
          center: [59.3293, 18.0686],
          boundingBox: [
            [59.2, 17.8],
            [59.4, 18.2]
          ]
        },
        Göteborg: {
          center: [57.7089, 11.9746],
          boundingBox: [
            [57.6, 11.8],
            [57.8, 12.0]
          ]
        },
        Malmö: {
          center: [55.605, 13.0038],
          boundingBox: [
            [55.5, 12.9],
            [55.7, 13.1]
          ]
        },
        Vasastan: {
          center: [59.3445, 18.0478],
          boundingBox: [
            [59.33, 18.03],
            [59.36, 18.07]
          ]
        },
        Södermalm: {
          center: [59.315, 18.0752],
          boundingBox: [
            [59.3, 18.05],
            [59.33, 18.1]
          ]
        }
        // Add more areas here
      };

      const newSearchedAreas: SearchedArea[] = [];

      locations.forEach((location) => {
        const result = mockApiResponse[location];
        if (result) {
          newSearchedAreas.push({
            boundingBox: result.boundingBox,
            center: result.center
          });
        }
      });

      if (newSearchedAreas.length > 0) {
        setCenter(newSearchedAreas[0].center);
        setZoom(isCity ? 11 : 13);
        setSearchedAreas(newSearchedAreas);
      } else {
        console.error("No valid locations found");
      }
    } catch (error) {
      console.error("Error searching for location:", error);
    }
  };

  return { center, zoom, searchedAreas, handleSearch };
}
