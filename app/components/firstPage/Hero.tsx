"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, CheckCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Gallery } from "./Gallery";
import AppStoreIcon from "./icons/AppStoreIcon";
import PlayStoreIcon from "./icons/PlayStoreIcon";
import Image from "next/image";

export default function Hero() {
  const [searchTerm, setSearchTerm] = useState("");
  const [listings, setListings] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("Data/listings.json")
      .then((response) => response.json())
      .then((data) => setListings(data));
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 3 >= listings.length ? 0 : prevIndex + 3
    );
  };

  return (
    <div className="relative min-h-[600px] w-full">
      {/* Content overlay */}
      <div className="relative z-10 mx-auto flex min-h-[600px] max-w-6xl flex-col items-center justify-center px-4 text-center text-black">
        {/* Main heading */}
        <h1 className="mb-12 mt-20 max-w-2xl text-4xl font-bold leading-tight sm:text-5xl md:text-5xl">
          Vi gör det enkelt för dig att byta hyresrätt
        </h1>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-16">
          <div className="space-y-2">
            <div className="text-3xl font-bold sm:text-4xl">10 000+</div>
            <div className="text-sm text-gray-800">Antal byteslägenheter</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold sm:text-4xl">2 000+</div>
            <div className="text-sm text-gray-800">Genomförda byten</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold sm:text-4xl">4.7+</div>
            <div className="text-sm text-gray-800">Omdöme Trustpilot</div>
          </div>
        </div>

        {/* Search bar */}
        <div className="flex w-full max-w-xl flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Sök på stad eller område"
              className="h-12 w-full bg-white/95 text-black"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            size="lg"
            className="h-12 bg-[#FF9F0D] px-8 font-medium hover:bg-[#FF9F0D]/90"
          >
            <Search className="mr-2 h-4 w-4" />
            Sök
          </Button>
        </div>

        {/* Centered App Store & Play Store */}
        <div className="flex flex-col items-center mt-6">
          <div className="flex flex-col w-full gap-2 p-1 md:flex-row justify-center">
            <a
              href=""
              target="_blank"
              className="flex items-center justify-center w-full px-3 py-2 text-center text-black border border-black rounded-xl"
              rel="noreferrer"
            >
              <AppStoreIcon />
              <div className="flex flex-col ml-1 leading-4 text-left md:ml-2">
                <span className="text-xs text-black">Ladda ner från</span>
                <span className="text-sm font-semibold text-black">
                  App Store
                </span>
              </div>
            </a>
            <a
              href=""
              target="_blank"
              className="flex items-center justify-center w-full px-3 py-2 text-center text-black border border-black rounded-xl"
              rel="noreferrer"
            >
              <PlayStoreIcon />
              <div className="flex flex-col ml-1 leading-4 text-left md:ml-2">
                <span className="text-xs text-black">Ladda ner från</span>
                <span className="text-sm font-semibold text-black">
                  Play Store
                </span>
              </div>
            </a>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mt-8">
          <div className="flex flex-col items-start text-start mt-4">
            <motion.h1
              className="text-3xl sm:text-4xl font-extrabold mb-6 mt-10 leading-relaxed"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Hitta ditt nya hem med Lägenhetbyte24
            </motion.h1>
            <motion.p
              className="text-lg mb-6 text-blue-900"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Ingen kostnad för medlemskap!
            </motion.p>
            <ul className="space-y-4 max-w-md mb-8">
              <motion.li
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <CheckCircle className="h-6 w-6 text-green-400 mr-2" />
                <span>Bytesförslag anpassade för dig</span>
              </motion.li>

              <motion.li
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <CheckCircle className="h-6 w-6 text-green-400 mr-2" />
                <span>Kom igång gratis på 2 minuter</span>
              </motion.li>
              <motion.li
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.5 }}
              >
                <CheckCircle className="h-6 w-6 text-green-400 mr-2" />
                <span>Få matchningar med önskade byten</span>
              </motion.li>
              <motion.li
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 2 }}
              >
                <CheckCircle className="h-6 w-6 text-green-400 mr-2" />
                <span>Få notifikationer via appen eller via e-post</span>
              </motion.li>
            </ul>
          </div>
          <div className="w-full bg-opacity-10 space-x-1 rounded-lg p-4 relative flex flex-col items-start overflow-hidden">
            {listings.length > 0 && (
              <Gallery
                listings={listings.slice(currentIndex, currentIndex + 3)}
                handleNext={handleNext}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
