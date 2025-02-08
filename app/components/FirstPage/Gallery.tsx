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
  Layers
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
}

export function Gallery({ listings }: GalleryProps) {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fId) => fId !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-4">
      {listings.slice(0, 3).map((listing) => (
        <motion.div
          key={listing.id}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className=" bg-opacity-20 rounded-lg p-4 flex items-center space-x-4 shadow-none cursor-pointer"
        >
          <img
            src={listing.image || "/placeholder.svg"}
            alt={listing.title}
            className="w-24 h-24 object-cover rounded-lg"
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">
              {listing.title}
            </h3>
            <p className="text-sm text-blue-100">{listing.description}</p>
            <div className="mt-2">
              <Badge variant="secondary">{listing.location}</Badge>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-300 mt-2">
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
    </div>
  );
}
