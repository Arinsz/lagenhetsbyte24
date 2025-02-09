"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, CheckCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Gallery } from "./Gallery";
import AppStoreIcon from "./icons/AppStoreIcon";
import PlayStoreIcon from "./icons/PlayStoreIcon";

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
    <div className="hero-wrapper">
      <section className="py-4 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-800 to-blue-600 text-white min-h-[60vh] overflow-hidden flex flex-col items-center">
        {/* Centered App Store & Play Store */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex flex-col w-full gap-2 p-1 md:flex-row justify-center">
            <a
              href=""
              target="_blank"
              className="flex items-center justify-center w-full px-3 py-2 text-center text-white border border-white rounded-xl"
              rel="noreferrer"
            >
              <AppStoreIcon />
              <div className="flex flex-col ml-1 leading-4 text-left md:ml-2">
                <span className="text-xs text-white">Ladda ner från</span>
                <span className="text-sm font-semibold text-white">
                  App Store
                </span>
              </div>
            </a>
            <a
              href=""
              target="_blank"
              className="flex items-center justify-center w-full px-3 py-2 text-center text-black border border-white rounded-xl"
              rel="noreferrer"
            >
              <PlayStoreIcon />
              <div className="flex flex-col ml-1 leading-4 text-left md:ml-2">
                <span className="text-xs text-white">Ladda ner från</span>
                <span className="text-sm font-semibold text-white">
                  Play Store
                </span>
              </div>
            </a>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="flex flex-col items-start text-start mt-4">
            <motion.h1
              className="text-3xl sm:text-4xl font-extrabold mb-6 leading-relaxed"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Hitta ditt nya hem med Lägenhetbyte24
            </motion.h1>
            <motion.p
              className="text-lg mb-6 text-blue-100 "
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Ingen kostnad för medlemskap!
            </motion.p>
            <div className="flex flex-row space-x-3 mb-10 w-full max-w-md">
              <div className="relative flex-grow">
                <Input
                  type="text"
                  placeholder="Sök efter stad eller område"
                  className="w-full text-black h-auto pr-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button
                  size="lg"
                  variant="secondary"
                  className="absolute inset-y-0 right-0 flex items-center px-3 h-full"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
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
      </section>
    </div>
  );
}
