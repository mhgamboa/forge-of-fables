"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { useEncounterContext } from "@/context/build-encouter-context";

import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import EncounterInfo from "./EncounterInfo";
import { Input } from "@/components/ui/input";
import { useHandleSaveEncounter } from "@/hooks/useHandleSaveEncounter";
// TODO: I have 2 cn functions: one in utils and lib. Let's consolidate them
import { cn } from "@/lib/utils";
import { handleSaveEncounter } from "@/utils/handleSaveEncounter";

// TODO: Segment Mobile and Desktop in to separate files

export default function CurrentEncounter() {
  const { encounter, setEncounter } = useEncounterContext();
  useHandleSaveEncounter();
  const router = useRouter();

  const [encounterName, setEncounterName] = useState(encounter.name ?? "");

  const handleSave = () => {
    handleSaveEncounter({
      encounter,
      setEncounter,
      router,
    });
  };

  return (
    <>
      {/* Desktop View */}
      <div className="hidden lg:block lg:col-span-1">
        <div className="flex flex-col gap-4 p-4 border-2 border-foreground/10 rounded-md">
          <Input
            type="text"
            placeholder="Encounter Name"
            className="w-full"
            defaultValue={encounter.name ?? ""}
            onChange={e => setEncounterName(e.target.value)}
          />

          <EncounterInfo />
          <Button
            onClick={handleSave}
            disabled={encounter.encounterSaved}
            className={cn("w-full relative", encounter.encounterSaved && "cursor-not-allowed")}
          >
            {!encounter.encounterSaved && (
              <span className="top-[-0.25rem] right-[-0.25rem] absolute  w-3.5 h-3.5 bg-red-500 border-2 border-white dark:border-gray-800 rounded-full" />
            )}
            Save changes
          </Button>
        </div>
      </div>
      {/* Mobile View */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="secondary"
            className="lg:hidden fixed my-auto right-0 top-0 bottom-0 z-50 p-0 w-4 h-24"
          >
            {!encounter.encounterSaved && (
              <span className="absolute right-2 bottom-[5.5rem] w-3.5 h-3.5 bg-red-500 border-2 border-white dark:border-gray-800 rounded-full" />
            )}
            <ChevronLeft className="" />
          </Button>
        </SheetTrigger>
        <SheetContent className=" overflow-y-scroll">
          <SheetHeader className="mb-8 mt-4">
            <SheetTitle className="sr-only"> {encounterName}</SheetTitle>
            <Input
              type="text"
              placeholder="Encounter Name"
              className="w-full"
              defaultValue={encounter.name ?? ""}
              onChange={e => setEncounterName(e.target.value)}
            />
            <SheetDescription>
              Make changes to your Encounter here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>

          <EncounterInfo />
          <SheetFooter className="mt-4 flex justify-center">
            <SheetClose asChild>
              <Button onClick={handleSave} className="w-full" disabled={encounter.encounterSaved}>
                {!encounter.encounterSaved && (
                  <span className="relative left-[13.25rem] bottom-5 w-3.5 h-3.5 bg-red-500 border-2 border-white dark:border-gray-800 rounded-full" />
                )}
                Save changes
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
