import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StarIcon } from "@heroicons/react/solid"; // Import a star icon

const testimonials = [
  {
    name: "Anna Svensson",
    rating: 5,
    content:
      "Tack vare denna tjänst hittade jag min drömlägenhet på bara några veckor!",
    avatar: "/placeholder.svg?height=40&width=40"
  },
  {
    name: "Erik Andersson",
    rating: 4,
    content:
      "Processen var så enkel och smidig. Jag rekommenderar starkt denna tjänst!",
    avatar: "/placeholder.svg?height=40&width=40"
  },
  {
    name: "Lisa Karlsson",
    rating: 5,
    content: "Fantastisk tjänst! Jag kunde byta lägenhet utan några problem.",
    avatar: "/placeholder.svg?height=40&width=40"
  }
  // Lägg till fler testimonials här
];

export default function Testimonials() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Vad våra användare säger
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage
                      src={testimonial.avatar}
                      alt={testimonial.name}
                    />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">
                      {testimonial.name}
                    </CardTitle>
                    <div className="flex items-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <StarIcon key={i} className="h-5 w-5 text-yellow-500" />
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">"{testimonial.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
