import { createContext, PropsWithChildren, useContext, useState } from "react";
import { createStore, StoreApi, useStore } from "zustand";

import { Tables } from "@/types/database.types";

export type View = "none" | "initiative";

export type EncounterMonsterType = {
  id: string;
  notes: string | null;
  info: Tables<"monsters">;
  currentHp: number;
  initiative: number;
  isMonster: true;
};

export type EncounterPlayerType = {
  id: string;
  name: string;
  notes: string | null;
  initiative: number;
  isMonster: false;
  currentHp: number;
};

type EncounterStore = {
  id: number;
  name: string;
  description: string | null;
  combatants: (EncounterMonsterType | EncounterPlayerType)[];
  currentTurn: number;
  view: View;

  // Methods to manage encounter
  setCombatants: (combatants: (EncounterMonsterType | EncounterPlayerType)[]) => void;
  setCurrentTurn: (currentTurn: number) => void;
  setView: (view: View) => void;
  // updateHp: (id: number, newHp: number) => void;
};

const EncounterContext = createContext<StoreApi<EncounterStore> | undefined>(undefined);

type CombatProviderProps = PropsWithChildren & {
  id: number;
  name: string;
  description: string | null;
  children: React.ReactNode;
  combatants: (EncounterMonsterType | EncounterPlayerType)[];
};

export default function CombatProvider({
  id,
  name,
  description,
  combatants,
  children,
}: CombatProviderProps) {
  const [store] = useState(() =>
    createStore<EncounterStore>(set => ({
      id,
      name,
      description,
      combatants,
      currentTurn: 0,
      view: "none",
      setCombatants: (newCombatants: (EncounterMonsterType | EncounterPlayerType)[]) =>
        set({ combatants: newCombatants }),
      setCurrentTurn: (newTurn: number) => set({ currentTurn: newTurn }),
      setView: (newView: View) => set({ view: newView }),
      // updateHp: (id: number, newHp: number) =>
      //   set(state => ({
      //     combatants: state.combatants.map(c => (c.id === id ? { ...c, currentHp: newHp } : c)),
      //   })),
    }))
  );
  return <EncounterContext.Provider value={store}>{children}</EncounterContext.Provider>;
}

export function useEncounterStore<T>(selector: (state: EncounterStore) => T) {
  const context = useContext(EncounterContext);
  if (!context) throw new Error("EncounterContext.Provider not found");
  return useStore(context, selector);
}
