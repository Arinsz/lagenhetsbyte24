"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Listing {
  id: number;
  title: string;
  description: string;
  size: number;
  rooms: number;
  bathrooms: number;
  location: string;
  rent: number;
  landlord: string;
  floor: number;
  image: string;
}

interface GalleryProps {
  listings: Listing[];
  handleNext: () => void;
}

export function Gallery({ listings, handleNext }: GalleryProps) {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fId) => fId !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-3 relative w-full">
      {listings.slice(0, 3).map((listing) => (
        <motion.div
          key={listing.id}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className="bg-opacity-20 rounded-lg p-3 flex items-start space-x-5 shadow-none cursor-pointer min-h-[150px] w-full"
        >
          <img
            src={listing.image || "/placeholder.svg"}
            alt={listing.title}
            className="w-24 h-24 object-cover rounded-lg"
          />
          <div className="flex-1 text-left">
            <h3 className="text-lg font-semibold text-black">
              {listing.title}
            </h3>
            <p className="text-sm text-gray-800">{listing.description}</p>
            <div className="mt-2">
              <Badge variant="secondary" className="ml-0">
                {listing.location}
              </Badge>
            </div>
            <div className="flex flex-wrap items-start gap-2 text-xs text-gray-600 mt-2">
              <span className="flex items-start">
                <Bed className="h-3 w-3 mr-1" />
                {listing.rooms}
              </span>
              <span className="flex items-start">
                <Bath className="h-3 w-3 mr-1" />
                {listing.bathrooms}
              </span>
              <span className="flex items-start">
                <Square className="h-3 w-3 mr-1" />
                {listing.size} m²
              </span>
              <span className="flex items-start">
                <DollarSign className="h-3 w-3 mr-1" />
                {listing.rent} SEK
              </span>
              <span className="flex items-start">
                <Building className="h-3 w-3 mr-1" />
                {listing.landlord}
              </span>
              <span className="flex items-start">
                <Layers className="h-3 w-3 mr-1" />
                {listing.floor} vån
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleFavorite(listing.id)}
            className="self-start"
          >
            <Heart
              className={`h-5 w-5 ${
                favorites.includes(listing.id)
                  ? "fill-red-500 text-red-500"
                  : "text-gray-300"
              }`}
            />
          </Button>
        </motion.div>
      ))}
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-[-0.2cm] transform -translate-y-1/2 bg-white bg-opacity-20 rounded-full p-2 hover:bg-opacity-40 transition duration-300 hover:scale-110"
      >
        <ChevronRight className="h-6 w-6 text-black" />
      </button>
    </div>
  );
}
