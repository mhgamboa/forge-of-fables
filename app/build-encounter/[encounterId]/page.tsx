import React, { Suspense } from "react";
import { redirect } from "next/navigation";
import { Loader } from "lucide-react";

import { EncounterContextProvider } from "@/context/build-encouter-context";
import { EncounterSavedContextProvider } from "@/context/encounter-saved-context";

import { getEncounterJsonName, getEncounterMonsters } from "@/data-access/encounter_json";

import MonsterList from "./(components)/MonsterList";
import CurrentEncounter from "./(components)/CurrentEncounter";
import SearchBar from "./(components)/SearchBar";
import { QueryContextProvider } from "./(components)/QueryContext";
import { getXMonsters } from "@/data-access/monster";

type Params = Promise<{ encounterId: string }>;
type SearchParams = Promise<{ query: string }>;

type Props = {
  params: Params;
  searchParams: SearchParams;
};

export default async function BuildEncounters(props: Props) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { encounterId } = params;

  if (encounterId !== "new" && typeof parseInt(encounterId) !== "number")
    redirect("/build-encounter/new");

  const query = searchParams?.query || "";
  const id = parseInt(encounterId);

  const encounterName = id ? await getEncounterJsonName(id) : "";
  const encounterJson = id ? await getEncounterMonsters(id) : [];
  const monsters = await getXMonsters();

  return (
    <EncounterSavedContextProvider>
      <EncounterContextProvider initialEncounterJson={encounterJson}>
        <QueryContextProvider initialQuery={query}>
          <SearchBar />
          <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Suspense fallback={<FallBack />}>
              {/* <MonsterList query={query} /> */}
              <MonsterList monsters={monsters} />
            </Suspense>
            <CurrentEncounter id={id} name={encounterName} />
          </div>
        </QueryContextProvider>
      </EncounterContextProvider>
    </EncounterSavedContextProvider>
  );
}

const FallBack = () => {
  return (
    <div className="flex justify-center items-center h-full w-full md:col-span-2">
      <Loader className="animate-spin text-4xl" />
    </div>
  );
};
