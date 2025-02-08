"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, CheckCircle, ChevronRight, Star } from "lucide-react";
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
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-800 to-blue-600 text-white min-h-[80vh max-h-[78vh]">
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
              transition={{ duration: 1, delay: 0.2 }}
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
          <div className="w-full  bg-opacity-10 rounded-lg p-4 relative">
            {listings.length > 0 && (
              <>
                <Gallery
                  listings={listings.slice(currentIndex, currentIndex + 3)}
                />
                <button
                  onClick={handleNext}
                  className="absolute top-1/2 right-[-0.5cm] transform -translate-y-1/2 bg-white bg-opacity-20 rounded-full p-2 hover:bg-opacity-40 transition duration-300"
                >
                  <ChevronRight className="h-6 w-6 text-white" />
                </button>
                <div className="flex items-center justify-center mt-8">
                  <div>
                    <div className="flex items-center justify-center mb-6 space-x-8">
                      <div className="flex flex-col items-center">
                        <img
                          src="/icons/googleicon.svg"
                          alt="Google"
                          className="w-9 h-9 mb-2"
                        />
                        <div className="flex mb-1">
                          {[...Array(4)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-5 h-5 text-yellow-500 fill-current"
                            />
                          ))}
                          <div className="relative w-5 h-5">
                            <Star className="absolute top-0 left-0 w-5 h-5 text-yellow-500 fill-current" />
                            <Star className="absolute top-0 left-0 w-5 h-5 text-gray-300 fill-current clip-half" />
                          </div>
                        </div>
                        <span className="text-sm text-blue-100">Reviews (36)</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <img
                          src="/icons/facebook.svg"
                          alt="Facebook"
                          className="w-9 h-9 mb-2"
                        />
                        <div className="flex mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-5 h-5 text-yellow-500 fill-current"
                            />
                          ))}
                        </div>
                        <span className="text-sm text-blue-100">Reviews (18)</span>
                      </div>
                    </div>
                    <div className="flex flex-col w-full gap-2 p-2 md:flex-row">
                      <a
                        href=""
                        target="_blank"
                        className="flex items-center justify-center w-full px-5 py-3 text-center text-white border border-white rounded-2xl"
                        rel="noreferrer"
                      >
                        <AppStoreIcon />
                        <div className="flex flex-col ml-2 leading-4 text-left md:ml-3">
                          <span className="text-sm text-white">
                            Ladda ner från
                          </span>
                          <span className="text-base font-semibold text-white">
                            App Store
                          </span>
                        </div>
                      </a>
                      <a
                        href=""
                        target="_blank"
                        className="flex items-center justify-center w-full px-5 py-3 text-center text-black border border-white rounded-2xl"
                        rel="noreferrer"
                      >
                        <PlayStoreIcon />
                        <div className="flex flex-col ml-2 leading-4 text-left md:ml-3">
                          <span className="text-sm text-white">
                            Ladda ner från
                          </span>
                          <span className="text-base font-semibold text-white">
                            Play Store
                          </span>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
