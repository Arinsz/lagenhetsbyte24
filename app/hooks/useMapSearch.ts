import { useState } from "react";

const NOMINATIM_URL = process.env.NEXT_PUBLIC_NOMINATIM_URL;

export function useMapSearch() {
  const [center, setCenter] = useState<[number, number]>([62.5, 15]); // Center of Sweden
  const [zoom, setZoom] = useState(5);
  const [searchedArea, setSearchedArea] = useState<{
    boundingBox: [[number, number], [number, number]] | null;
    center: [number, number] | null;
  }>({ boundingBox: null, center: null });

  const handleSearch = async (searchLocation: string) => {
    try {
      const response = await fetch(
        `${NOMINATIM_URL}${searchLocation},Sweden&polygon_geojson=1`
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

  return { center, zoom, searchedArea, handleSearch };
}
