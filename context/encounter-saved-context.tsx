"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type encounterSavedContextValue = {
  encounterSaved: boolean;
  setEncounterSaved: React.Dispatch<React.SetStateAction<boolean>>;
};
export const EncounterSavedContext = createContext<encounterSavedContextValue | null>(null);

export const EncounterSavedContextProvider = ({ children }: { children: ReactNode }) => {
  const [encounterSaved, setEncounterSaved] = useState<boolean>(true);
  return (
    <EncounterSavedContext.Provider value={{ encounterSaved, setEncounterSaved }}>
      {children}
    </EncounterSavedContext.Provider>
  );
};

export const useEncounterSavedContext = () => {
  ("useEncounterSavedContext");
  const encounterSaved = useContext(EncounterSavedContext);
  if (encounterSaved === null) throw new Error("no encounterSaved context");
  return encounterSaved;
};
