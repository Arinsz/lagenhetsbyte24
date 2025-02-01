"use client";

import dynamic from "next/dynamic";
import ContinueRegisterForm from "./ContinueRegisterForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { useState } from "react";

const MapWithNoSSR = dynamic(() => import("../../../components/Map"), {
  ssr: false
});

export default function ContinueRegisterPage() {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedArea, setSelectedArea] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Fortsätt registreringen</CardTitle>
          <CardDescription>
            Fyll i ytterligare information om din bostad och adress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ContinueRegisterForm
              onCityChange={setSelectedCity}
              onAreaChange={setSelectedArea}
            />
            <div className="h-[400px] rounded-lg overflow-hidden">
              <MapWithNoSSR
                selectedCity={selectedCity}
                selectedArea={selectedArea}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
