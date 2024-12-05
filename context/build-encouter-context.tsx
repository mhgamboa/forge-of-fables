"use client";
import { Dispatch, SetStateAction } from "react";
import { createContext, useContext, useState, ReactNode } from "react";
import { getSingleEncounterWithMonsters } from "@/data-access/encounters";
import { Tables } from "@/types/database.types";

type EncounterContextType = Awaited<ReturnType<typeof getSingleEncounterWithMonsters>> & {
  encounter_monstersToBeAdded: number[];
  encounter_monstersToBeRemoved: number[];
  encounter_monstersToBeUpdated: Tables<"encounter_monsters">[]; // Need to update
  encounter_playersToBeAdded: number[];
  encounter_playersToBeRemoved: number[];
  encounter_playersToBeUpdated: number[]; // Need to update
};

type encounterContextValue = {
  // encounter: Awaited<ReturnType<typeof getSingleEncounterWithMonsters>>;
  encounter: EncounterContextType;
  setEncounter: Dispatch<SetStateAction<EncounterContextType>>;
  // setEncounter: Dispatch<
  //   SetStateAction<Awaited<ReturnType<typeof getSingleEncounterWithMonsters>>>
  // >;
};
export const EncounterContext = createContext<encounterContextValue | null>(null);

export const EncounterContextProvider = ({
  children,
  initialEncounter,
}: {
  children: ReactNode;
  initialEncounter: Awaited<ReturnType<typeof getSingleEncounterWithMonsters>>;
}) => {
  const formattedInitialEncounter = {
    ...initialEncounter,
    encounter_monstersToBeAdded: [],
    encounter_monstersToBeRemoved: [],
    encounter_monstersToBeUpdated: [],
    encounter_playersToBeAdded: [],
    encounter_playersToBeRemoved: [],
    encounter_playersToBeUpdated: [],
  };
  const [encounter, setEncounter] = useState<EncounterContextType>(formattedInitialEncounter);

  return (
    <EncounterContext.Provider value={{ encounter, setEncounter }}>
      {children}
    </EncounterContext.Provider>
  );
};

export const useEncounterContext = () => {
  const encounter = useContext(EncounterContext);
  if (encounter === null) throw new Error("no encounter context");
  return encounter;
};
