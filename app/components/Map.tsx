"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
  selectedCity: string;
}

const cityCoordinates: { [key: string]: [number, number] } = {
  Stockholm: [59.3293, 18.0686],
  Göteborg: [57.7089, 11.9746],
  Malmö: [55.605, 13.0038],
  Uppsala: [59.8586, 17.6389],
  Västerås: [59.6099, 16.5448],
  Örebro: [59.2741, 15.2066],
  Linköping: [58.4108, 15.6214],
  Helsingborg: [56.0465, 12.6945],
  Jönköping: [57.7815, 14.1562],
  Norrköping: [58.5877, 16.1924]
  // Add more cities as needed
};

export default function Map({ selectedCity }: MapProps) {
  const coordinates = cityCoordinates[selectedCity];

  return (
    <MapContainer
      center={[62.0, 15.0]}
      zoom={4}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {coordinates && (
        <Marker position={coordinates}>
          <Popup>{selectedCity}</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
