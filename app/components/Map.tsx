"use client";

import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
  selectedCity: string;
  cityPolygons: {
    [key: string]: [number, number][];
  };
}

export default function Map({ selectedCity, cityPolygons }: MapProps) {
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
