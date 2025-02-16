"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface SearchedArea {
  boundingBox: [[number, number], [number, number]];
  center: [number, number];
}

interface MapProps {
  center: [number, number];
  zoom: number;
  searchedAreas: SearchedArea[];
}

function MapUpdater({ center, zoom, searchedAreas }: MapProps) {
  const map = useMap();
  const circleRefs = useRef<L.Circle[]>([]);

  useEffect(() => {
    console.log("MapUpdater effect:", { searchedAreas });

    // Remove all existing circles
    circleRefs.current.forEach((circle) => map.removeLayer(circle));
    circleRefs.current = [];

    if (searchedAreas.length > 0) {
      searchedAreas.forEach((area) => {
        const [[south, west], [north, east]] = area.boundingBox;
        const radius = Math.max(
          L.latLng(south, west).distanceTo(
            L.latLng(area.center[0], area.center[1])
          ),
          L.latLng(north, east).distanceTo(
            L.latLng(area.center[0], area.center[1])
          )
        );

        const circle = L.circle(area.center, {
          color: "#ff7800",
          fillColor: "#ff7800",
          fillOpacity: 0.2,
          weight: 2,
          radius: radius
        }).addTo(map);

        circleRefs.current.push(circle);
      });

      // Fit the map to show all circles
      const group = L.featureGroup(circleRefs.current);
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
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapUpdater center={center} zoom={zoom} searchedAreas={searchedAreas} />
    </MapContainer>
  );
}
