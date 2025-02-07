import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import Testimonials from "./Testimonials";

const steps = [
  {
    title: "Registrera dig",
    description:
      "Skapa ett konto och berätta om din nuvarande lägenhet och vad du söker."
  },
  {
    title: "Utforska alternativ",
    description:
      "Bläddra igenom tillgängliga lägenheter och hitta potentiella byten."
  },
  {
    title: "Matcha och kommunicera",
    description:
      "När du hittar en intressant lägenhet, ta kontakt och diskutera bytesmöjligheter."
  },
  {
    title: "Genomför bytet",
    description:
      "När båda parter är överens, hjälper vi er genom bytesprocessen."
  }
];

export default function HowItWorks() {
  return (
    <>
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Hur det fungerar
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="border-t-4 border-blue-500">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="text-3xl font-bold text-blue-500 mr-3">
                      {index + 1}.
                    </span>
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Testimonials />
        </div>
      </section>
    </>
  );
}
