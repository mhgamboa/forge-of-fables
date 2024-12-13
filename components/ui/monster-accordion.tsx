"use client";

import * as React from "react";
import { create } from "mutative";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown, Plus } from "lucide-react";

import { useEncounterContext } from "@/context/build-encouter-context";

import { cn } from "@/lib/utils";
import { Tables } from "@/types/database.types";
const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("border-b", className)} {...props} />
));
AccordionItem.displayName = "AccordionItem";

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
  const { encounter, setEncounter } = useEncounterContext();
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    const { id, name } = monster;

    const tempId = Math.floor(Math.random() * 1000000);
    const nextState = create(encounter, draft => {
      draft.encounter_monstersToBeAdded.push({ id, name, tempId });
      draft.encounterSaved = false;
    });
    setEncounter(nextState);
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
