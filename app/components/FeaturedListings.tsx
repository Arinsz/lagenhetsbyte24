"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
import { Bed, Bath, Square, Heart } from "lucide-react";

const listings = [
  {
    id: 1,
    title: "Mysig 2:a i Södermalm",
    description: "Charmig lägenhet med balkong och öppen spis",
    size: 55,
    rooms: 2,
    bathrooms: 1,
    location: "Stockholm",
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
    image: "/placeholder.svg?height=200&width=300"
  }
];

export default function FeaturedListings() {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fId) => fId !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Utvalda lägenheter
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {listings.map((listing) => (
            <motion.div
              key={listing.id}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <img
                    src={listing.image || "/placeholder.svg"}
                    alt={listing.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <CardTitle>{listing.title}</CardTitle>
                  <CardDescription>{listing.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <Badge variant="secondary">{listing.location}</Badge>
                    <div className="flex items-center space-x-2 text-gray-500">
                      <Bed className="h-4 w-4" />
                      <span>{listing.rooms}</span>
                      <Bath className="h-4 w-4" />
                      <span>{listing.bathrooms}</span>
                      <Square className="h-4 w-4" />
                      <span>{listing.size} m²</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Visa mer</Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleFavorite(listing.id)}
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        favorites.includes(listing.id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-500"
                      }`}
                    />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
