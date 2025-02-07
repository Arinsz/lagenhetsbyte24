"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      className
    )}
    {...props}
  >
    <div className="pb-4 pt-0">{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };

const faqItems = [
  {
    question: "Hur fungerar lägenhetsbyte?",
    answer:
      "Lägenhetsbyte innebär att två eller fler parter byter sina hyresrätter med varandra. På vår plattform kan du lägga upp din lägenhet, söka efter passande byten, och kommunicera med potentiella bytespartners."
  },
  {
    question: "Är det lagligt att byta lägenhet?",
    answer:
      "Ja, lägenhetsbyte är lagligt i Sverige, men det kräver hyresvärdens godkännande. Vi guidar dig genom processen och hjälper dig att samla in nödvändig dokumentation för att få godkännande."
  },
  {
    question: "Hur lång tid tar ett lägenhetsbyte vanligtvis?",
    answer:
      "Tiden för ett lägenhetsbyte kan variera, men vanligtvis tar processen mellan 1-3 månader från det att du hittar en bytespartner till dess att bytet är genomfört."
  },
  {
    question:
      "Vad händer om jag ångrar mig efter att ha hittat en bytespartner?",
    answer:
      "Du kan när som helst avbryta bytesprocessen fram till dess att kontrakten är påskrivna. Vi rekommenderar dock att du är säker på ditt beslut innan du inleder seriösa diskussioner med en bytespartner."
  }
];

export default function FAQ() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Vanliga frågor
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
