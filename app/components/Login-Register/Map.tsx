"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface SearchedArea {
  boundingBox: [[number, number], [number, number]];
  center: [number, number];
  name: string;
}

interface MapProps {
  center: [number, number];
  zoom: number;
  searchedAreas: SearchedArea[];
}

const customIcon = L.icon({
  iconUrl: "/icons/map-marker.png",
  iconSize: [49, 49],
  iconAnchor: [24, 49]
});

function MapUpdater({ center, zoom, searchedAreas }: MapProps) {
  const map = useMap();
  const markerRefs = useRef<L.Marker[]>([]);

  useEffect(() => {
    console.log("MapUpdater effect:", { searchedAreas });

    // Remove all existing markers
    markerRefs.current.forEach((marker) => map.removeLayer(marker));
    markerRefs.current = [];

    if (searchedAreas.length > 0) {
      searchedAreas.forEach((area) => {
        const marker = L.marker(area.center, { icon: customIcon }).addTo(map);
        marker
          .bindTooltip(area.name, {
            permanent: true,
            direction: "top",
            offset: [0, -40]
          })
          .openTooltip();
        markerRefs.current.push(marker);
      });

      // Fit the map to show all markers
      const group = L.featureGroup(markerRefs.current);
      map.fitBounds(group.getBounds(), { padding: [50, 50] });
    }
  }, [searchedAreas, map]);

  useEffect(() => {
    console.log("MapUpdater effect:", { center, zoom });
    setTimeout(() => {
      map.setView(center, zoom, { animate: true, duration: 1 });
    }, 100); // Add a delay to make the zoom animation smoother
  }, [center, zoom, map]);

  return null;
}

export default function Map({ center, zoom, searchedAreas }: MapProps) {
  console.log("Map props:", { center, zoom, searchedAreas });
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className="h-full w-full lg:h-full md:h-[50vh] sm:h-[50vh] xs:h-[30vh]" // Adjust the height for screens under 500px using Tailwind CSS
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapUpdater center={center} zoom={zoom} searchedAreas={searchedAreas} />
    </MapContainer>
  );
}
