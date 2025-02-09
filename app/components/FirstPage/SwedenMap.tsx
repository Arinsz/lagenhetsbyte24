"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

function fixLeafletIcon() {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png"
  });
}

interface MapCenterProps {
  center: [number, number];
}

function MapCenter({ center }: MapCenterProps) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 15, {
      duration: 2
    });
  }, [center, map]);
  return null;
}

interface SwedenMapProps {
  searchTerm: string;
}

export default function SwedenMap({ searchTerm }: SwedenMapProps) {
  const [center, setCenter] = useState<[number, number]>([62.0, 15.0]);

  useEffect(() => {
    fixLeafletIcon();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${searchTerm}, Sverige`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data && data.length > 0) {
            const { lat, lon } = data[0];
            setCenter([Number.parseFloat(lat), Number.parseFloat(lon)]);
          }
        });
    }
  }, [searchTerm]);

  return (
    <div style={{ height: "200px", width: "100%" }}>
      <MapContainer
        center={center}
        zoom={4}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={center} />
        <MapCenter center={center} />
      </MapContainer>
    </div>
  );
}
