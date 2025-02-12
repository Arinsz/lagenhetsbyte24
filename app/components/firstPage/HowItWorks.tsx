"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Search,
  Users,
  MessageCircle,
  Home,
  ChevronDown,
  ChevronUp
} from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Sök",
    description: "Hitta potentiella byten",
    details:
      "Använd vår avancerade sökfunktion för att filtrera lägenheter baserat på område, storlek, hyra och andra viktiga faktorer. Spara dina favoritlägenheter för enkel åtkomst senare."
  },
  {
    icon: Users,
    title: "Matcha",
    description: "Hitta intresserade partners",
    details:
      "Vårt smarta matchningssystem använder AI för att föreslå de mest lämpliga bytespartners baserat på bådas preferenser och krav. Detta ökar chanserna för en framgångsrik matchning avsevärt."
  },
  {
    icon: MessageCircle,
    title: "Kommunicera",
    description: "Diskutera bytesdetaljer",
    details:
      "Använd vår inbyggda meddelandefunktion för att kommunicera säkert med andra användare. Ställ frågor, dela bilder och kom överens om villkoren för bytet i en trygg miljö."
  },
  {
    icon: Home,
    title: "Flytta in",
    description: "Genomför bytet",
    details:
      "Vi guidar er genom hela bytesprocessen, från att upprätta nödvändiga dokument till att koordinera flyttdatum. Vår kundtjänst finns tillgänglig för att hjälpa er med eventuella frågor eller problem som kan uppstå under processen."
  }
];

export default function HowItWorks() {
  const [expandedSteps, setExpandedSteps] = useState<number[]>([]);

  const handleToggle = (index: number) => {
    setExpandedSteps((prev) =>
      prev.includes(index)
        ? prev.filter((step) => step !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="py-20 px-5 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center mb-12">
          Hur går det till?
        </h2>{" "}
        {/* Add heading */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <TimelineStep
              key={index}
              step={step}
              index={index}
              isExpanded={expandedSteps.includes(index)}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineStep({
  step,
  index,
  isExpanded,
  onToggle
}: {
  step: any;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`bg-white p-6 rounded-lg shadow-md flex flex-col ${
        isExpanded ? "h-auto" : "h-[280px]"
      }`}
    >
      <div className="flex flex-col items-center mb-4 text-center">
        <div className="bg-primary p-4 rounded-full mb-4">
          <step.icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
        <p className="text-gray-600">{step.description}</p>
      </div>
      <div className="flex-grow">
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="text-gray-600 mt-4"
            >
              <p>{step.details}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <button
        onClick={onToggle}
        className="mt-4 flex items-center justify-center text-primary transition-colors duration-200"
      >
        {isExpanded ? "Läs mindre" : "Läs mer"}
        {isExpanded ? (
          <ChevronUp className="ml-1 w-4 h-4" />
        ) : (
          <ChevronDown className="ml-1 w-4 h-4" />
        )}
      </button>
    </motion.div>
  );
}
