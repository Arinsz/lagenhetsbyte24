"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Bed,
  Bath,
  Square,
  Heart,
  DollarSign,
  Building,
  Layers
} from "lucide-react";
import * as Tabs from "@radix-ui/react-tabs";

const listings = [
  {
    id: 1,
    title: "Mysig 2:a i Södermalm",
    description: "Charmig lägenhet med balkong och öppen spis",
    size: 55,
    rooms: 2,
    bathrooms: 1,
    location: "Stockholm",
    rent: 12000,
    landlord: "Fastighets AB",
    floor: 3,
    image: "/placeholder.svg?height=200&width=300"
  },
  {
    id: 2,
    title: "Rymlig 3:a i Majorna",
    description: "Nyrenoverad lägenhet med havsutsikt",
    size: 75,
    rooms: 3,
    bathrooms: 1,
    location: "Göteborg",
    rent: 15000,
    landlord: "Majorna Fastigheter",
    floor: 5,
    image: "/placeholder.svg?height=200&width=300"
  },
  {
    id: 3,
    title: "Modern 1:a i Västra Hamnen",
    description: "Stilren lägenhet med gångavstånd till stranden",
    size: 40,
    rooms: 1,
    bathrooms: 1,
    location: "Malmö",
    rent: 10000,
    landlord: "Hamnen Bostäder",
    floor: 2,
    image: "/placeholder.svg?height=200&width=300"
  }
];

export default function Hero() {
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fId) => fId !== id) : [...prev, id]
    );
  };

  return (
    <div className="hero-wrapper">
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-400 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h1
              className="text-4xl sm:text-5xl font-extrabold mb-6 leading-relaxed"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Hitta ditt nya hem med Lägenhetbyte24
            </motion.h1>
            <motion.p
              className="text-xl mb-8 text-blue-100"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Ingen kostnad för medlemskap!
            </motion.p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
              <Input
                type="text"
                placeholder="Sök efter stad eller område"
                className="w-full sm:w-64 text-black"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button size="lg" variant="secondary">
                <Search className="mr-2 h-4 w-4" /> Sök
              </Button>
            </div>
            <ul className="space-y-4 max-w-md">
              <motion.li
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <CheckCircle className="h-6 w-6 text-green-400 mr-2" />
                <span>Bytesförslag anpassade för dig</span>
              </motion.li>
              <motion.li
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <CheckCircle className="h-6 w-6 text-green-400 mr-2" />
                <span>Hjälp igenom hela bytet</span>
              </motion.li>
              <motion.li
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <CheckCircle className="h-6 w-6 text-green-400 mr-2" />
                <span>Kom igång gratis på 2 minuter</span>
              </motion.li>
            </ul>
          </div>
          <div className="relative h-96 w-full overflow-y-auto bg-white bg-opacity-10 rounded-lg p-4">
            <div className="space-y-4">
              {listings.map((listing) => (
                <motion.div
                  key={listing.id}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white bg-opacity-20 rounded-lg p-4 flex items-center space-x-4"
                >
                  <img
                    src={listing.image || "/placeholder.svg"}
                    alt={listing.title}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <CardTitle className="text-lg text-white">
                      {listing.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-blue-100">
                      {listing.description}
                    </CardDescription>
                    <div className="mt-2">
                      <Badge variant="secondary">{listing.location}</Badge>
                    </div>
                    <div className="flex justify-start items-center space-x-2 text-gray-300 mt-2">
                      <Bed className="h-4 w-4" />
                      <span>{listing.rooms}</span>
                      <Bath className="h-4 w-4" />
                      <span>{listing.bathrooms}</span>
                      <Square className="h-4 w-4" />
                      <span>{listing.size} m²</span>
                      <DollarSign className="h-4 w-4" />
                      <span>{listing.rent} SEK</span>
                      <Building className="h-4 w-4" />
                      <span>{listing.landlord}</span>
                      <Layers className="h-4 w-4" />
                      <span>{listing.floor} vån</span>
                    </div>
                    <div className="mt-2 flex justify-start space-x-2">
                      <Button variant="outline" size="sm">
                        Visa mer
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleFavorite(listing.id)}
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            favorites.includes(listing.id)
                              ? "fill-red-500 text-red-500"
                              : "text-gray-300"
                          }`}
                        />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
