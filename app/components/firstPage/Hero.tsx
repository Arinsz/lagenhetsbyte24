"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Image from "next/image";
import { Gallery } from "./Gallery";

export default function Hero() {
  return (
    <div className="relative min-h-screen w-full pt-20 pb-16 bg-gradient-to-b from-white to-gray-100">
      {/* Background image */}
      <div className="absolute inset-0 z-0 opacity-10">
        <Image
          src="https://www.hemie.se/"
          alt="Cozy home interior"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl mb-4">
            Vi gör det enkelt för dig att byta hyresrätt
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Hitta din nästa drömbostad bland tusentals hyresrätter över hela
            Sverige.
          </p>

          {/* Stats */}
          <div className="flex justify-center space-x-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">10 000+</div>
              <div className="text-sm text-gray-600">Antal byteslägenheter</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">2 000+</div>
              <div className="text-sm text-gray-600">Genomförda byten</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">4.7+</div>
              <div className="text-sm text-gray-600">Omdöme Trustpilot</div>
            </div>
          </div>

          {/* Search bar */}
          <div className="flex max-w-2xl mx-auto">
            <Input
              type="text"
              placeholder="Sök på stad eller område"
              className="rounded-r-none"
            />
            <Button
              type="submit"
              size="lg"
              className="rounded-l-none bg-primary text-white hover:bg-primary/90"
            >
              <Search className="mr-2 h-4 w-4" />
              Sök
            </Button>
          </div>
        </div>

        {/* Gallery */}
        <Gallery listings={[]} handleNext={() => {}} />
      </div>
    </div>
  );
}
