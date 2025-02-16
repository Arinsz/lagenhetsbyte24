import coordinates from "../data/coordinates.json";

type Location = "Ekerö" | "Drottningholm" | "Bro";

export function useCoordinates() {
  const getCoordinates = (location: Location): [number, number] | null => {
    const locationData = coordinates[location];
    return locationData && locationData.DD.length === 2
      ? (locationData.DD as [number, number])
      : null;
  };

  return { getCoordinates };
}
