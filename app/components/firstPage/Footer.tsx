import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from "@/components/ui/hover-card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

export default function Footer() {
  return (
    <div className="footer-wrapper">
      <div className="w-200 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-1"></div>{" "}
      {/* Add fading line */}
      <footer className="bg-white text-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900">
                Om oss
              </h3>
              <p className="text-sm">
                Lägenhetbyte24 är din pålitliga partner för att hitta ditt nästa
                hem genom smidiga lägenhetsbyten.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900">
                Snabblänkar
              </h3>
              <ul className="space-y-2">
                {["Hem", "Hur det fungerar", "Lägenheter", "Kontakta oss"].map(
                  (item, index) => (
                    <li key={index}>
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <Link
                            href={`/${item.toLowerCase().replace(/ /g, "-")}`}
                            className="text-sm hover:text-blue-600 transition-colors"
                          >
                            {item}
                          </Link>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-64">
                          <div className="flex justify-between space-x-4">
                            <div>
                              <h4 className="text-sm font-semibold">{item}</h4>
                              <p className="text-sm">
                                Utforska vår {item.toLowerCase()} sida för mer
                                information.
                              </p>
                            </div>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900">
                Kontakt
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center text-sm">
                  <Mail className="mr-2 h-4 w-4" /> info@lagenhetbyte24.se
                </li>
                <li className="flex items-center text-sm">
                  <Phone className="mr-2 h-4 w-4" /> 08-123 45 67
                </li>
                <li className="flex items-center text-sm">
                  <MapPin className="mr-2 h-4 w-4" /> Bytesvägen 24, 123 45
                  Stockholm
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900">
                Följ oss
              </h3>
              <div className="flex space-x-4">
                <TooltipProvider>
                  {[
                    {
                      icon: Facebook,
                      label: "Facebook",
                      href: "https://facebook.com",
                      color: "hover:text-blue-600"
                    },
                    {
                      icon: Instagram,
                      label: "Instagram",
                      href: "https://instagram.com",
                      color: "hover:text-pink-600"
                    },
                    {
                      icon: Twitter,
                      label: "Twitter",
                      href: "https://twitter.com",
                      color: "hover:text-blue-400"
                    }
                  ].map((item, index) => (
                    <Tooltip key={index}>
                      <TooltipTrigger asChild>
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-gray-400 ${item.color} transition-colors`}
                        >
                          <item.icon size={24} />
                          <span className="sr-only">{item.label}</span>
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Följ oss på {item.label}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </TooltipProvider>
              </div>
            </div>
          </div>

          <div className="text-center pb-4 mt-20">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Lägenhetbyte24. Alla rättigheter
              förbehållna.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
