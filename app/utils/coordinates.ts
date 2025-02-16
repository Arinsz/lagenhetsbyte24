import coordinatesData from "../data/coordinates.json";

interface Coordinates {
  DMS: string[];
  DD: [number, number];
}

interface CoordinatesData {
  [key: string]: Coordinates;
}

const coordinates: CoordinatesData = coordinatesData as CoordinatesData;

export function getCoordinates(location: string): [number, number] | null {
  const coords = coordinates[location];
  if (coords && "DD" in coords && coords.DD.length === 2) {
    return coords.DD;
  } else {
    console.error(
      `Coordinates for ${location} are missing DD property or have incorrect format`
    );
    return null;
  }
}
