"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
  center: [number, number];
  zoom: number;
  searchedArea: {
    boundingBox: [[number, number], [number, number]] | null;
    center: [number, number] | null;
  };
}

function MapUpdater({ center, zoom, searchedArea }: MapProps) {
  const map = useMap();
  const circleRef = useRef<L.Circle | null>(null);

  useEffect(() => {
    console.log("MapUpdater effect:", { searchedArea });
    if (searchedArea.boundingBox && searchedArea.center) {
      const [[south, west], [north, east]] = searchedArea.boundingBox;
      const radius = Math.max(
        L.latLng(south, west).distanceTo(
          L.latLng(searchedArea.center[0], searchedArea.center[1])
        ),
        L.latLng(north, east).distanceTo(
          L.latLng(searchedArea.center[0], searchedArea.center[1])
        )
      );

      if (circleRef.current) {
        circleRef.current.setLatLng(searchedArea.center);
        circleRef.current.setRadius(radius);
      } else {
        circleRef.current = L.circle(searchedArea.center, {
          color: "#ff7800",
          fillColor: "#ff7800",
          fillOpacity: 0.2,
          radius: radius
        }).addTo(map);
      }

      map.flyTo(
        searchedArea.center,
        map.getBoundsZoom(L.latLngBounds(searchedArea.boundingBox)),
        {
          duration: 2,
          easeLinearity: 0.25
        }
      );
    } else if (circleRef.current) {
      map.removeLayer(circleRef.current);
      circleRef.current = null;
    }
  }, [searchedArea, map]);

  useEffect(() => {
    console.log("MapUpdater effect:", { center, zoom });
    map.setView(center, zoom, { animate: true, duration: 1 });
  }, [center, zoom, map]);

  return null;
}

export default function Map({ center, zoom, searchedArea }: MapProps) {
  console.log("Map props:", { center, zoom, searchedArea });
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapUpdater center={center} zoom={zoom} searchedArea={searchedArea} />
    </MapContainer>
  );
}
