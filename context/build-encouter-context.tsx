"use client";
import { Dispatch, SetStateAction } from "react";
import { createContext, useContext, useState, ReactNode } from "react";
import { getSingleEncounterWithMonsters } from "@/data-access/encounters";

type encounterContextValue = {
  encounter: Awaited<ReturnType<typeof getSingleEncounterWithMonsters>>;
  setEncounter: Dispatch<
    SetStateAction<Awaited<ReturnType<typeof getSingleEncounterWithMonsters>>>
  >;
};
export const EncounterContext = createContext<encounterContextValue | null>(null);

export const EncounterContextProvider = ({
  children,
  initialEncounter,
}: {
  children: ReactNode;
  initialEncounter: Awaited<ReturnType<typeof getSingleEncounterWithMonsters>>;
}) => {
  const [encounter, setEncounter] =
    useState<Awaited<ReturnType<typeof getSingleEncounterWithMonsters>>>(initialEncounter);

  const addMonster = async (monsterId: number, monsterName: string) => {
    const newMonster = {
      encounter_id: encounter.id, // Assuming the `id` of the encounter is included
      monster_id: monsterId,
    };

    // Update the database
    const { data, error } = await supabase.from("encounter_monsters").insert([newMonster]);

    if (error) {
      console.error("Failed to add monster:", error);
      return;
    }

    // Update the context state
    setEncounter(prev => ({
      ...prev,
      encounter_monsters: [
        ...prev.encounter_monsters,
        { id: data[0].id, monsters: { id: monsterId, name: monsterName } },
      ],
    }));
  };
  return (
    <EncounterContext.Provider value={{ encounter, setEncounter }}>
      {children}
    </EncounterContext.Provider>
  );
};

export const useEncounterContext = () => {
  ("useEncounterContext");
  const encounter = useContext(EncounterContext);
  if (encounter === null) throw new Error("no encounter context");
  return encounter;
};
