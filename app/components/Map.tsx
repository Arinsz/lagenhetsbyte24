"use client";

import { MapContainer, TileLayer, useMap, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

interface MapProps {
  selectedCity: string;
  selectedArea: string;
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

const areaCoordinates: {
  [key: string]: { [key: string]: [number, number][] };
} = {
  Stockholm: {
    Bromma: [
      [59.3547, 17.9391],
      [59.3647, 17.9491],
      [59.3547, 17.9591],
      [59.3447, 17.9491]
    ],
    Södermalm: [
      [59.3125, 18.0759],
      [59.3225, 18.0859],
      [59.3125, 18.0959],
      [59.3025, 18.0859]
    ],
    Östermalm: [
      [59.3387, 18.0844],
      [59.3487, 18.0944],
      [59.3387, 18.1044],
      [59.3287, 18.0944]
    ]
  },
  Göteborg: {
    Hisingen: [
      [57.7318, 11.9403],
      [57.7418, 11.9503],
      [57.7318, 11.9603],
      [57.7218, 11.9503]
    ],
    Linnéstaden: [
      [57.6935, 11.9484],
      [57.7035, 11.9584],
      [57.6935, 11.9684],
      [57.6835, 11.9584]
    ],
    Majorna: [
      [57.6918, 11.9233],
      [57.7018, 11.9333],
      [57.6918, 11.9433],
      [57.6818, 11.9333]
    ]
  },
  Malmö: {
    "Västra Hamnen": [
      [55.615, 12.9724],
      [55.625, 12.9824],
      [55.615, 12.9924],
      [55.605, 12.9824]
    ],
    Limhamn: [
      [55.5833, 12.926],
      [55.5933, 12.936],
      [55.5833, 12.946],
      [55.5733, 12.936]
    ],
    Rosengård: [
      [55.5933, 13.0358],
      [55.6033, 13.0458],
      [55.5933, 13.0558],
      [55.5833, 13.0458]
    ]
  }
  // Add more areas as needed
};

function MapUpdater({
  selectedCity,
  selectedArea
}: {
  selectedCity: string;
  selectedArea: string;
}) {
  const map = useMap();
  const coordinates = selectedArea
    ? areaCoordinates[selectedCity]?.[selectedArea][0]
    : cityCoordinates[selectedCity];

  useEffect(() => {
    if (coordinates) {
      map.flyTo(coordinates, selectedArea ? 13 : 11, {
        duration: 1.5 // Duration of the animation in seconds
      }); // Zoom level 13 for area view, 11 for city view
    }
  }, [coordinates, map, selectedArea]);

  return null;
}

export default function Map({ selectedCity, selectedArea }: MapProps) {
  const areaPolygon = selectedArea
    ? areaCoordinates[selectedCity]?.[selectedArea]
    : null;

  return (
    <MapContainer
      center={[62.0, 15.0]}
      zoom={4}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {selectedCity && (
        <MapUpdater selectedCity={selectedCity} selectedArea={selectedArea} />
      )}
    </MapContainer>
  );
}
