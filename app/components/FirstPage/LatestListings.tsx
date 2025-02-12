"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Bed,
  Bath,
  Square,
  DollarSign,
  Building,
  Layers,
  ChevronRight
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

export function LatestListings() {
  interface Listing {
    id: number;
    image: string;
    title: string;
    size: number;
    rent: number;
    description: string;
    location: string;
    rooms: number;
    bathrooms: number;
    landlord: string;
    floor: number;
  }

  const [listings, setListings] = useState<Listing[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/Data/listings.json")
      .then((response) => response.json())
      .then((data) => setListings(data));
  }, []);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fId) => fId !== id) : [...prev, id]
    );
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="relative flex justify-center">
      <div
        ref={containerRef}
        className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-x-auto"
        style={{ maxWidth: "90vw" }}
      >
        {listings.map((listing) => (
          <Card
            key={listing.id}
            className="overflow-hidden flex flex-col justify-between cursor-pointer"
          >
            <div>
              <img
                src={listing.image || "/placeholder.svg"}
                alt={listing.title}
                className="w-full h-48 object-cover"
              />
              <div className="flex justify-between mt-2 mx-2">
                <CardTitle className="text-lg sm:text-base md:text-lg">
                  {listing.title}
                </CardTitle>
                <Badge className="bg-primary text-white">
                  {listing.location}
                </Badge>
              </div>
              <div className="mx-2 mt-4 mb">
                <p className="text-lg sm:text-base md:text-lg">
                  {listing.description}
                </p>
              </div>
            </div>
            <CardFooter className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="flex items-center">
                  <Bed className="h-3 w-3 mr-1" />
                  {listing.rooms}
                </span>
                <span className="flex items-center">
                  <Bath className="h-3 w-3 mr-1" />
                  {listing.bathrooms}
                </span>
                <span className="flex items-center">
                  <Square className="h-3 w-3 mr-1" />
                  {listing.size} m²
                </span>
                <span className="flex items-center">
                  <DollarSign className="h-3 w-3 mr-1" />
                  {listing.rent} SEK
                </span>
                <span className="flex items-center">
                  <Building className="h-3 w-3 mr-1" />
                  {listing.landlord}
                </span>
                <span className="flex items-center">
                  <Layers className="h-3 w-3 mr-1" />
                  {listing.floor} vån
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleFavorite(listing.id)}
                className="ml-2"
              >
                <Heart
                  className={`h-5 w-5 ${
                    favorites.includes(listing.id)
                      ? "fill-red-500 text-red-500"
                      : "text-gray-300"
                  }`}
                />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <button
        onClick={scrollRight}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white bg-opacity-20 rounded-full p-2 hover:bg-opacity-40 transition duration-300"
      >
        <ChevronRight className="h-6 w-6 text-gray-800" />
      </button>
    </div>
  );
}
