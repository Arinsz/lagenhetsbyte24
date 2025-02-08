"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="relative py-0 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          ></motion.h1>
          <motion.p
            className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Vi förenklar processen att hitta och byta till din lägenhet. Börja
            din resa mot ett nytt hem idag.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
            >
              Kom igång
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
            >
              Lär dig mer
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
