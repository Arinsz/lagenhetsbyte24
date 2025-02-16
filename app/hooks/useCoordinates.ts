import coordinatesData from "../data/coordinates.json";

interface Coordinates {
  DMS: string[];
  DD: [number, number];
}

const coordinates: { Ekerö: Coordinates; Bro: Coordinates } =
  coordinatesData as {
    Ekerö: Coordinates;
    Bro: Coordinates;
  };

export function useCoordinates() {
  const getCoordinates = (
    location: "Ekerö" | "Bro"
  ): [number, number] | null => {
    const coords = coordinates[location];
    if (coords && "DD" in coords && coords.DD.length === 2) {
      return coords.DD;
    } else {
      console.error(
        `Coordinates for ${location} are missing DD property or have incorrect format`
      );
      return null;
    }
  };

  return { getCoordinates };
}
