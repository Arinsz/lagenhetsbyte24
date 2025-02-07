"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const listings = [
  {
    id: 1,
    title: "Mysig etta i Södermalm",
    area: 30,
    price: 5000,
    type: "Hyresrätt",
    image: "/apartment1.jpg"
  },
  {
    id: 2,
    title: "Rymlig tvåa i Vasastan",
    area: 65,
    price: 8500,
    type: "Bostadsrätt",
    image: "/apartment2.jpg"
  },
  {
    id: 3,
    title: "Modern lägenhet i Gamla Stan",
    area: 45,
    price: 6500,
    type: "Hyresrätt",
    image: "/apartment3.jpg"
  }
];

export function LatestListings() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {listings.map((listing) => (
        <Card key={listing.id} className="overflow-hidden">
          <img
            src={listing.image || "/placeholder.svg"}
            alt={listing.title}
            className="w-full h-48 object-cover"
          />
          <CardHeader>
            <CardTitle>{listing.title}</CardTitle>
            <CardDescription>
              {listing.area} m² - {listing.price} kr/mån
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Badge>{listing.type}</Badge>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Visa detaljer</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
