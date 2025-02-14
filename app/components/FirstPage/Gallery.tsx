"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Bed,
  Bath,
  Square,
  ChevronLeft,
  ChevronRight,
  Building,
  Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface Listing {
  id: number;
  title: string;
  description: string;
  size: number;
  rooms: number;
  bathrooms: number;
  location: string;
  rent: number;
  image: string;
  floor: number;
  elevator: boolean;
}

const dummyListings: Listing[] = [
  {
    id: 1,
    title: "Mysig 2:a i Vasastan",
    description: "Ljus och fräsch lägenhet med öppen planlösning och balkong.",
    size: 55,
    rooms: 2,
    bathrooms: 1,
    location: "Vasastan",
    rent: 9500,
    image: "/images/malmö.jpg",
    floor: 3,
    elevator: true
  },
  {
    id: 2,
    title: "Rymlig 3:a i Södermalm",
    description:
      "Nyrenoverad lägenhet med utsikt över Årstaviken. Perfekt för en liten familj eller par som vill ha extra utrymme.",
    size: 75,
    rooms: 3,
    bathrooms: 1,
    location: "Södermalm",
    rent: 12000,
    image: "/images/goteborg.jpg",
    floor: 5,
    elevator: true
  },
  {
    id: 3,
    title: "Studio i Kungsholmen",
    description: "Kompakt och välplanerad lägenhet nära tunnelbanan.",
    size: 30,
    rooms: 1,
    bathrooms: 1,
    location: "Kungsholmen",
    rent: 7000,
    image: "/images/hyllie.jpeg",
    floor: 2,
    elevator: false
  }
];

export function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fId) => fId !== id) : [...prev, id]
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % dummyListings.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + dummyListings.length) % dummyListings.length
    );
  };

  return (
    <div className="relative">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Utvalda lägenheter
      </h2>
      <div className="flex flex-wrap overflow-hidden">
        {dummyListings.map((listing, index) => (
          <motion.div
            key={listing.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4 flex"
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col w-full">
              <div className="relative h-48">
                <Image
                  src={listing.image || "/placeholder.svg"}
                  alt={listing.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleFavorite(listing.id)}
                  className="absolute top-2 right-2 bg-white bg-opacity-50 hover:bg-opacity-75"
                >
                  <Heart
                    className={`h-6 w-6 ${
                      favorites.includes(listing.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-600"
                    }`}
                  />
                </Button>
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {listing.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-grow">
                  {listing.description}
                </p>
                <div className="flex justify-between items-center mb-3">
                  <Badge variant="secondary" className="bg-primary text-white">
                    {listing.location}
                  </Badge>
                  <span className="text-lg font-bold text-primary">
                    {listing.rent} kr/mån
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-700 mt-2">
                  <span className="flex items-center">
                    <Bed className="h-4 w-4 text-gray-500 mr-1" />
                    <span>{listing.rooms}</span>
                  </span>
                  <span className="flex items-center">
                    <Bath className="h-4 w-4 text-gray-500 mr-1" />
                    <span>{listing.bathrooms}</span>
                  </span>
                  <span className="flex items-center">
                    <Square className="h-4 w-4 text-gray-500 mr-1" />
                    <span>{listing.size}m²</span>
                  </span>
                  <span className="flex items-center">
                    <Layers className="h-4 w-4 text-gray-500 mr-1" />
                    <span>{listing.floor} vån</span>
                  </span>
                  <span className="flex items-center">
                    <Image
                      src="/icons/elevator.svg"
                      alt="Elevator"
                      width={16}
                      height={20}
                      className="mr-2"
                    />
                    <span>{listing.elevator ? "Ja" : "Nej"}</span>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 text-primary hover:text-primary-dark bg-white rounded-full p-2 shadow-lg"
        style={{ left: "-1rem" }}
      >
        <ChevronLeft className="h-8 w-8" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 text-primary hover:text-primary-dark bg-white rounded-full p-2 shadow-lg"
        style={{ right: "-1rem" }}
      >
        <ChevronRight className="h-8 w-8" />
      </button>
    </div>
  );
}
