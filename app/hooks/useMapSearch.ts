"use client";

import { useState } from "react";

export function useMapSearch() {
  const [center, setCenter] = useState<[number, number]>([59.3293, 18.0686]); // Default to Stockholm
  const [zoom, setZoom] = useState(10);
  const [searchedArea, setSearchedArea] = useState<{
    boundingBox: [[number, number], [number, number]] | null;
    center: [number, number] | null;
  }>({
    boundingBox: null,
    center: null
  });

  const handleSearch = async (location: string, isCity: boolean) => {
    try {
      // Here you would typically make an API call to get the coordinates and bounding box for the location
      // For this example, we'll use hardcoded values
      const mockApiResponse: {
        [key: string]: {
          center: [number, number];
          boundingBox: [[number, number], [number, number]];
        };
      } = {
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
      };

      const result = mockApiResponse[location];
      if (result) {
        setCenter(result.center);
        setZoom(isCity ? 11 : 13);
        setSearchedArea({
          boundingBox: isCity ? null : result.boundingBox,
          center: isCity ? null : result.center
        });
      } else {
        console.error("Location not found");
      }
    } catch (error) {
      console.error("Error searching for location:", error);
    }
  };

  return { center, zoom, searchedArea, handleSearch };
}
