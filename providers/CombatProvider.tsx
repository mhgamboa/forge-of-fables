import { Tables } from "@/types/database.types";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { createStore, StoreApi, useStore } from "zustand";
import { CombatMonster } from "@/types/combat";

type CombatStore = {
  combat: CombatMonster[];
  updateCombat: (monsters: CombatMonster[]) => void;
  index: number;
  increment: () => void;
  decrement: () => void;
  setIndex: (index: number) => void;
};

const CombatContext = createContext<StoreApi<CombatStore> | undefined>(undefined);

// type CombatProviderProps = PropsWithChildren & { initialCount: number };
type CombatProviderProps = {
  children?: React.ReactNode;
  initialCombat: CombatMonster[];
};

export default function CombatProvider({ children, initialCombat }: CombatProviderProps) {
  const [store] = useState(() =>
    createStore<CombatStore>(set => ({
      combat: initialCombat,
      updateCombat: (monsters: CombatMonster[]) => set({ combat: monsters }),
      index: 0,
      increment: () => set(state => ({ index: state.index + 1 })),
      decrement: () => set(state => ({ index: state.index - 1 })),
      setIndex: (index: number) => set({ index }),
    }))
  );
  return <CombatContext.Provider value={store}>{children}</CombatContext.Provider>;
}

export function useCombatStore<T>(selector: (state: CombatStore) => T) {
  const context = useContext(CombatContext);
  if (!context) throw new Error("CombatContext.Provider not found");
  return useStore(context, selector);
}
