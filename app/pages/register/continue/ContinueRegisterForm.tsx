"use client";

import * as React from "react";
import { Check, ChevronRight } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

const formSchema = z.object({
  propertyType: z.string().min(1, "Välj bostadstyp"),
  location: z.string().min(1, "Ange önskad plats"),
  minRooms: z.string().min(1, "Ange minsta antal rum"),
  maxPrice: z.string().min(1, "Ange maxpris")
});

const steps = [
  { id: 1, name: "Bostadstyp" },
  { id: 2, name: "Plats" },
  { id: 3, name: "Detaljer" },
  { id: 4, name: "Budget" }
];

export default function CreateListing() {
  const [currentStep, setCurrentStep] = React.useState(1);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      propertyType: "",
      location: "",
      minRooms: "",
      maxPrice: ""
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="mx-auto max-w-2xl p-4 md:p-6">
      <div className="mb-8">
        <nav aria-label="Progress">
          <ol role="list" className="flex items-center">
            {steps.map((step, stepIdx) => (
              <li
                key={step.name}
                className={`relative ${
                  stepIdx !== steps.length - 1 ? "flex-1" : ""
                }`}
              >
                {step.id < currentStep ? (
                  <div className="group flex items-center">
                    <span className="flex items-center">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
                        <Check className="h-5 w-5 text-primary-foreground" />
                      </span>
                      <span className="ml-3 text-sm font-medium">
                        {step.name}
                      </span>
                    </span>
                    {stepIdx !== steps.length - 1 ? (
                      <div className="absolute right-4 top-4 hidden h-0.5 w-full bg-primary lg:block" />
                    ) : null}
                  </div>
                ) : step.id === currentStep ? (
                  <div className="flex items-center" aria-current="step">
                    <span className="flex items-center" aria-current="step">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-primary">
                        <span className="text-sm font-medium text-primary">
                          {step.id}
                        </span>
                      </span>
                      <span className="ml-3 text-sm font-medium">
                        {step.name}
                      </span>
                    </span>
                    {stepIdx !== steps.length - 1 ? (
                      <div className="absolute right-4 top-4 hidden h-0.5 w-full bg-muted lg:block" />
                    ) : null}
                  </div>
                ) : (
                  <div className="group flex items-center">
                    <span className="flex items-center">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-muted">
                        <span className="text-sm font-medium text-muted-foreground">
                          {step.id}
                        </span>
                      </span>
                      <span className="ml-3 text-sm font-medium text-muted-foreground">
                        {step.name}
                      </span>
                    </span>
                    {stepIdx !== steps.length - 1 ? (
                      <div className="absolute right-4 top-4 hidden h-0.5 w-full bg-muted lg:block" />
                    ) : null}
                  </div>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Skapa bostadsannons</CardTitle>
          <CardDescription>
            Berätta för oss vad du letar efter så hjälper vi dig att hitta det.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              {currentStep === 1 && (
                <FormField
                  control={form.control}
                  name="propertyType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bostadstyp</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Välj bostadstyp" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="apartment">Lägenhet</SelectItem>
                          <SelectItem value="house">Villa</SelectItem>
                          <SelectItem value="townhouse">Radhus</SelectItem>
                          <SelectItem value="cottage">Fritidshus</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {currentStep === 2 && (
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Önskad plats</FormLabel>
                      <FormControl>
                        <Input placeholder="T.ex. Stockholm" {...field} />
                      </FormControl>
                      <FormDescription>
                        Ange stad, kommun eller område
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {currentStep === 3 && (
                <FormField
                  control={form.control}
                  name="minRooms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Antal rum (minimum)</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Välj antal rum" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">1 rum</SelectItem>
                          <SelectItem value="2">2 rum</SelectItem>
                          <SelectItem value="3">3 rum</SelectItem>
                          <SelectItem value="4">4 rum</SelectItem>
                          <SelectItem value="5">5+ rum</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {currentStep === 4 && (
                <FormField
                  control={form.control}
                  name="maxPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maxpris</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="T.ex. 3000000"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Ange maxpris i kronor</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                Tillbaka
              </Button>
              {currentStep < steps.length ? (
                <Button type="button" onClick={nextStep}>
                  Nästa
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button type="submit">Skapa annons</Button>
              )}
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
