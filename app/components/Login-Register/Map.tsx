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
  iconSize: [24, 24], // Adjusted icon size
  iconAnchor: [12, 24]
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
            offset: [0, -20] // Adjusted offset
          })
          .openTooltip();
        markerRefs.current.push(marker);
      });

      // Fit the map to show all markers
      const group = L.featureGroup(markerRefs.current);
      map.fitBounds(group.getBounds(), { padding: [50, 50], maxZoom: 14 });
    }
  }, [searchedAreas, map]);

  useEffect(() => {
    if (searchedAreas.length > 0) {
      const lastSearchedArea = searchedAreas[searchedAreas.length - 1];
      map.setView(lastSearchedArea.center, zoom, {
        animate: true,
        duration: 1
      });
    }
  }, [searchedAreas, map, zoom]);

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
      <>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapUpdater center={center} zoom={zoom} searchedAreas={searchedAreas} />
      </>
    </MapContainer>
  );
}
