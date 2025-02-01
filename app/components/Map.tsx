"use client";

import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
  selectedCity: string;
}

const cityPolygons: { [key: string]: [number, number][] } = {
  stockholm: [
    [59.3293, 18.0686],
    [59.3293, 18.1686],
    [59.2293, 18.1686],
    [59.2293, 18.0686]
  ],
  gothenburg: [
    [57.7089, 11.9746],
    [57.7089, 12.0746],
    [57.6089, 12.0746],
    [57.6089, 11.9746]
  ],
  malmo: [
    [55.605, 13.0038],
    [55.605, 13.1038],
    [55.505, 13.1038],
    [55.505, 13.0038]
  ]
};

export default function Map({ selectedCity }: MapProps) {
  return (
    <MapContainer
      center={[62.0, 15.0]}
      zoom={4}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {selectedCity && (
        <Polygon
          positions={cityPolygons[selectedCity]}
          pathOptions={{ color: "blue", fillColor: "blue", fillOpacity: 0.3 }}
        />
      )}
    </MapContainer>
  );
}
