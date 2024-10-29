"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { type FormattedEncounterJson } from "@/types/encounterJsonTypes";

type encounterContextValue = {
  encounterJson: FormattedEncounterJson[];
  setEncounterJson: React.Dispatch<React.SetStateAction<FormattedEncounterJson[]>>;
};
export const EncounterContext = createContext<encounterContextValue | null>(null);

export const EncounterContextProvider = ({
  children,
  initialEncounterJson,
}: {
  children: ReactNode;
  initialEncounterJson: FormattedEncounterJson[];
}) => {
  const [encounterJson, setEncounterJson] =
    useState<FormattedEncounterJson[]>(initialEncounterJson);
  return (
    <EncounterContext.Provider value={{ encounterJson, setEncounterJson }}>
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
