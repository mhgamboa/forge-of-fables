"use client";
import { Dispatch, SetStateAction, createContext, useContext, useState, ReactNode } from "react";
import { getEncounterWithRelations } from "@/data-access/encounters";
import { Tables } from "@/types/database.types";
import {
  InitialEncounter,
  EncounterMonstersType,
  encounterMonstersToBeAddedType,
  EncounterPlayersType,
  EncounterPlayersToBeAddedType,
} from "@/types/buildEncounter";

// TODO: Convert to Zustand to reduce re-renders
export type EncounterContextType = InitialEncounter & {
  newEncounterName: string;
  newEncounterDescription: string;
  encounter_monstersToBeAdded: encounterMonstersToBeAddedType[];
  encounter_monstersToBeRemoved: EncounterMonstersType[];
  encounter_monstersToBeUpdated: Tables<"encounter_monsters">[];
  encounter_playersToBeAdded: EncounterPlayersToBeAddedType[];
  encounter_playersToBeRemoved: EncounterPlayersType[];
  encounter_playersToBeUpdated: Tables<"encounter_players">[];
  encounterSaved: boolean;
};

type EncounterContextValue = {
  encounter: EncounterContextType;
  setEncounter: Dispatch<SetStateAction<EncounterContextType>>;
};

export const EncounterContext = createContext<EncounterContextValue | null>(null);

type Props = {
  children: ReactNode;
  initialEncounter: InitialEncounter;
};

export const EncounterContextProvider = ({ children, initialEncounter }: Props) => {
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
