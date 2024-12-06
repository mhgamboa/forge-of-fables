"use client";
import React, { useState } from "react";
import { toast } from "sonner";

import { useEncounterContext } from "@/context/build-encouter-context";
import { useEncounterSavedContext } from "@/context/encounter-saved-context";

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

// import { EncounterJson, FormattedEncounterJson } from "@/types/encounterJsonTypes";
// import { createEncounterJsonDB, setEncounterJsonDB } from "../actions";
import EncounterInfo from "./EncounterInfo";
import { Input } from "@/components/ui/input";

export default function CurrentEncounter() {
  const { encounter, setEncounter } = useEncounterContext();
  // const { encounterSaved, setEncounterSaved } = useEncounterSavedContext();
  const [encounterName, setEncounterName] = useState(encounter.name ?? "");

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // const result = encounterJson.reduce((acc, item) => {
    //   acc[item.id] = item.quantity;
    //   return acc;
    // }, {} as EncounterJson);
    // try {
    //   isNaN(id)
    //     ? await createEncounterJsonDB(result, encounterName)
    //     : await setEncounterJsonDB(id, result, encounterName);
    //   toast.success("Encounter Saved", { position: "top-center" });
    //   setEncounterSaved(true);
    // } catch {
    //   toast.error("Error: Encounter Not saved");
    // }
    console.log(encounter);
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
          <Button onClick={handleSave} disabled={!encounterName} className="w-full relative">
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
        <SheetContent>
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
              <Button onClick={handleSave} className="w-full">
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
