"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Gallery } from "./Gallery";

export default function Hero() {
  const [searchTerm, setSearchTerm] = useState("");
  const [listings, setListings] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("Data/listings.json")
      .then((response) => response.json())
      .then((data) => setListings(data));
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? listings.length - 3 : prevIndex - 3
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 3 >= listings.length ? 0 : prevIndex + 3
    );
  };

  return (
    <div className="hero-wrapper">
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-800 to-blue-600 text-white min-h-[60vh]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <motion.h1
              className="text-4xl sm:text-5xl font-extrabold mb-6 leading-relaxed mt-7"
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
            <ul className="space-y-4 max-w-md mb-8">
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
          <div className="w-full  bg-opacity-10 rounded-lg p-4 relative">
            {listings.length > 0 && (
              <>
                <Gallery
                  listings={listings.slice(currentIndex, currentIndex + 3)}
                />
                <button
                  onClick={handlePrev}
                  className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white bg-opacity-20 rounded-full p-2"
                >
                  <ChevronLeft className="h-6 w-6 text-white" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white bg-opacity-20 rounded-full p-2"
                >
                  <ChevronRight className="h-6 w-6 text-white" />
                </button>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
