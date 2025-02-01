import { CheckCircle, Search, Home, Repeat } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Sök",
    description: "Hitta lägenheter som matchar dina önskemål",
  },
  {
    icon: Home,
    title: "Kontakta",
    description: "Ta kontakt med lägenhetsägare du är intresserad av",
  },
  {
    icon: Repeat,
    title: "Byt",
    description: "Genomför bytet när båda parter är överens",
  },
  {
    icon: CheckCircle,
    title: "Flytta in",
    description: "Njut av ditt nya hem!",
  },
]

export default function HowItWorks() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Hur det fungerar</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <step.icon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

