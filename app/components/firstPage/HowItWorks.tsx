import { CheckCircle, Search, Home, Repeat, Heart, Bell } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";

const steps = [
  {
    icon: Search,
    title: "Sök",
    description: "Hitta lägenheter som matchar dina önskemål"
  },
  {
    icon: Heart,
    title: "Få matchningar",
    description: "Få matchningar med önskade byten"
  },
  {
    icon: Bell,
    title: "Få notifikationer",
    description: "Få notifikationer via appen eller mail vid matchningar"
  },
  {
    icon: Home,
    title: "Kontakta",
    description:
      "Ta kontakt med lägenhetsägare du är intresserad av eller får matchningar med"
  },
  {
    icon: Repeat,
    title: "Byt",
    description: "Genomför bytet när båda parter är överens"
  },
  {
    icon: CheckCircle,
    title: "Flytta in",
    description: "Njut av ditt nya hem!"
  }
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-20">
          Hur det fungerar
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="flex flex-col items-center text-center"
            >
              <CardHeader className="flex flex-col items-center">
                <div className="bg-blue-100 p-4 rounded-full mb-4">
                  <step.icon className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl font-semibold mb-2">
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  {step.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
