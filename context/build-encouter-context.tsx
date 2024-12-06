// /context/EncounterContext.tsx
"use client";
import { Dispatch, SetStateAction, createContext, useContext, useState, ReactNode } from "react";
import { getSingleEncounterWithMonsters } from "@/data-access/encounters";
import { Tables } from "@/types/database.types";

export type EncounterMonstersType = {
  id: number;
  notes: string | null;
  monsters: { name: string; id: number } | null;
}; // Return type of getSingleEncounterWithMonsters.encounterMonsters

export type EncounterPlayersType = {
  id: number;
  name: string;
};

type EncounterContextType = Awaited<ReturnType<typeof getSingleEncounterWithMonsters>> & {
  newEncounterName: string;
  newEncounterDescription: string;
  encounter_monstersToBeAdded: { id: number; name: string; tempId: number }[];
  encounter_monstersToBeRemoved: EncounterMonstersType[];
  encounter_monstersToBeUpdated: Tables<"encounter_monsters">[];
  encounter_playersToBeAdded: number[];
  encounter_playersToBeRemoved: number[];
  encounter_playersToBeUpdated: Tables<"encounter_players">[];
  encounterSaved: boolean;
};

type EncounterContextValue = {
  encounter: EncounterContextType;
  setEncounter: Dispatch<SetStateAction<EncounterContextType>>;
};

export const EncounterContext = createContext<EncounterContextValue | null>(null);

export const EncounterContextProvider = ({
  children,
  initialEncounter,
}: {
  children: ReactNode;
  initialEncounter: Awaited<ReturnType<typeof getSingleEncounterWithMonsters>>;
}) => {
  const initializeEncounter = (): EncounterContextType => ({
    ...initialEncounter,
    newEncounterName: "",
    newEncounterDescription: "",
    encounter_monstersToBeAdded: [],
    encounter_monstersToBeRemoved: [],
    encounter_monstersToBeUpdated: [],
    encounter_playersToBeAdded: [],
    encounter_playersToBeRemoved: [],
    encounter_playersToBeUpdated: [],
    encounterSaved: true,
  });

  const [encounter, setEncounter] = useState<EncounterContextType>(initializeEncounter);

  return (
    <EncounterContext.Provider value={{ encounter, setEncounter }}>
      {children}
    </EncounterContext.Provider>
  );
};

export const useEncounterContext = () => {
  const context = useContext(EncounterContext);
  if (!context)
    throw new Error(
      "EncounterContext is not provided. Wrap your component in <EncounterContextProvider>."
    );
  return context;
};
