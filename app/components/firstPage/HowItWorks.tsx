"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Search, Users, MessageCircle, Home } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Sök och utforska",
    description:
      "Bläddra igenom tillgängliga lägenheter och hitta potentiella byten som matchar dina önskemål.",
    details:
      "Använd vår avancerade sökfunktion för att filtrera lägenheter baserat på område, storlek, hyra och andra viktiga faktorer. Spara dina favoritlägenheter för enkel åtkomst senare."
  },
  {
    icon: Users,
    title: "Matcha",
    description:
      "Hitta personer som är intresserade av din lägenhet och vars lägenheter passar dina kriterier.",
    details:
      "Vårt smarta matchningssystem använder AI för att föreslå de mest lämpliga bytespartners baserat på bådas preferenser och krav. Detta ökar chanserna för en framgångsrik matchning avsevärt."
  },
  {
    icon: MessageCircle,
    title: "Kommunicera",
    description:
      "Ta kontakt med potentiella bytespartners och diskutera detaljerna kring ert byte.",
    details:
      "Använd vår inbyggda meddelandefunktion för att kommunicera säkert med andra användare. Ställ frågor, dela bilder och kom överens om villkoren för bytet i en trygg miljö."
  },
  {
    icon: Home,
    title: "Byt och flytta in",
    description:
      "När ni är överens, genomför bytet och flytta in i ert nya hem.",
    details:
      "Vi guidar er genom hela bytesprocessen, från att upprätta nödvändiga dokument till att koordinera flyttdatum. Vår kundtjänst finns tillgänglig för att hjälpa er med eventuella frågor eller problem som kan uppstå under processen."
  }
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-5 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-14">
          Hur det fungerar
        </h2>
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <TimelineStep key={index} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineStep({ step, index }: { step: any; index: number }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 0 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.1 }} // Remove delay
      className="flex items-start mb-8"
    >
      <div className="flex-1 sm:px-4">
        <div className="bg-white p-6 rounded-lg shadow-md h-64 flex flex-col justify-between">
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <step.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">{step.title}</h3>
            </div>
            <p className="text-gray-600 mb-4">{step.description}</p>
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="text-gray-600 mt-4"
            >
              {step.details}
            </motion.p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
