import React from "react";
import { redirect } from "next/navigation";

import { EncounterContextProvider } from "@/context/build-encouter-context";
import { EncounterSavedContextProvider } from "@/context/encounter-saved-context";

import { getEncounterJsonName, getEncounterMonsters } from "@/data-access/encounter_json";

import MonsterList from "./(components)/MonsterList";
import CurrentEncounter from "./(components)/CurrentEncounter";
import SearchBar from "./(components)/SearchBar";

type Props = {
  params: { encounterId: string };
  searchParams?: { query?: string };
};

export default async function BuildEncounters({ params: { encounterId }, searchParams }: Props) {
  if (encounterId !== "new" && typeof parseInt(encounterId) !== "number")
    redirect("/build-encounter/new");

  const query = searchParams?.query || "";
  const id = parseInt(encounterId);

  const encounterName = id ? await getEncounterJsonName(id) : "";
  const encounterJson = id ? await getEncounterMonsters(id) : [];
  return (
    <EncounterSavedContextProvider>
      <EncounterContextProvider initialEncounterJson={encounterJson}>
        <SearchBar />
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4">
          <MonsterList query={query} />
          <CurrentEncounter id={id} name={encounterName} />
        </div>
      </EncounterContextProvider>
    </EncounterSavedContextProvider>
  );
}
