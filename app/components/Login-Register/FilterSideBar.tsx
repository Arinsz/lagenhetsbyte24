import { useState } from "react";
import { MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface FilterSidebarProps {
  onSearch: () => void;
  setSearchLocation: (value: string) => void;
}

export default function FilterSidebar({
  onSearch,
  setSearchLocation
}: FilterSidebarProps) {
  const [rent, setRent] = useState<number>(5000);
  const [area, setArea] = useState<number>(50);

  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-4">
        <div className="mt-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Sök plats eller område"
              className="pl-8"
              onChange={(e) => setSearchLocation(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && onSearch()}
            />
          </div>
          <div className="grid gap-2">
            <Label>Bostadstyp</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Välj bostadstyp" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apartment">Lägenhet</SelectItem>
                <SelectItem value="house">Villa</SelectItem>
                <SelectItem value="townhouse">Radhus</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-auto p-4">
        <div className="grid gap-2">
          <Label>Antal rum</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Välj antal rum" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 rum</SelectItem>
              <SelectItem value="2">2 rum</SelectItem>
              <SelectItem value="3">3 rum</SelectItem>
              <SelectItem value="4">4+ rum</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label>Hyra (kr/mån): {rent} kr</Label>
          <div className="px-2">
            <Slider
              value={[rent]}
              max={20000}
              min={0}
              step={500}
              className="py-4"
              onValueChange={(value) => setRent(value[0])}
            />
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>0 kr</span>
            <span>20 000 kr</span>
          </div>
        </div>

        <div className="grid gap-2">
          <Label>Yta (kvm): {area} kvm</Label>
          <div className="px-2">
            <Slider
              value={[area]}
              max={200}
              min={0}
              step={5}
              className="py-4"
              onValueChange={(value) => setArea(value[0])}
            />
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>0 kvm</span>
            <span>200 kvm</span>
          </div>
        </div>

        <div className="space-y-4">
          <Label>Matchande bostäder</Label>
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="flex gap-4 p-4">
                  <div className="h-20 w-20 shrink-0 rounded-md bg-muted" />
                  <div className="space-y-1">
                    <h3 className="font-medium">2 rum och kök</h3>
                    <p className="text-sm text-muted-foreground">
                      55 kvm • 7 500 kr/mån
                    </p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>Södermalm, Stockholm</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t p-4">
        <Button className="w-full" onClick={onSearch}>
          Visa 45 bostäder
        </Button>
      </div>
    </div>
  );
}
