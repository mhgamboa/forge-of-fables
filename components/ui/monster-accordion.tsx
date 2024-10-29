"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown, Plus } from "lucide-react";

import { useEncounterContext } from "@/context/build-encouter-context";

import { cn } from "@/lib/utils";
import { Tables } from "@/types/database.types";
import { useEncounterSavedContext } from "@/context/encounter-saved-context";
const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("border-b", className)} {...props} />
));
AccordionItem.displayName = "AccordionItem";

type Dog = { namez: string; id: number };
type Props = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
  className?: string;
  children: React.ReactNode;
  monster: Tables<"monsters">;
};

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  Props
>(({ className, children, monster, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>div>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <div className="flex items-center space-x-4">
        <EncounterInteract monster={monster} />
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
      </div>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const EncounterInteract = ({ monster }: { monster: Tables<"monsters"> }) => {
  const { encounterJson, setEncounterJson } = useEncounterContext();
  const { encounterSaved, setEncounterSaved } = useEncounterSavedContext();
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    const id = monster.id;

    const hasId = encounterJson.find(m => m.id === id);
    if (hasId) {
      // if hasId then add 1 to quantity without modifying original encounterJson
      const index = encounterJson.findIndex(m => m.id === id);
      setEncounterJson([
        ...encounterJson.slice(0, index),
        { ...encounterJson[index], quantity: encounterJson[index].quantity + 1 },
        ...encounterJson.slice(index + 1),
      ]);
    } else {
      setEncounterJson([...encounterJson, { id, name: monster.name, quantity: 1 }]);
    }
    setEncounterSaved(false);
  };
  return (
    <div onClick={handleClick} className="hover:bg-foreground/10 rounded-md p-2">
      <Plus className="h-4 w-4" />
    </div>
  );
};

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
