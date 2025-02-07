"use client";

import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/marker-icon-2x.png",
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png"
});

const apartments = [
  { id: 1, position: [59.3293, 18.0686], name: "Cozy Studio in Södermalm" },
  { id: 2, position: [59.335, 18.0707], name: "Spacious 2BR in Vasastan" },
  { id: 3, position: [59.3127, 18.0845], name: "Modern 1BR in Gamla Stan" }
];

export function InteractiveMap() {
  const [activeApartment, setActiveApartment] = useState(null);

  return (
    <div className="h-96 w-full">
      <MapContainer
        center={[59.3293, 18.0686]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {apartments.map((apartment) => (
          <Marker
            key={apartment.id}
            position={apartment.position}
            eventHandlers={{
              click: () => {
                setActiveApartment(apartment);
              }
            }}
          >
            <Popup>
              <div>
                <h3 className="font-bold">{apartment.name}</h3>
                <button className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm">
                  Visa detaljer
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
