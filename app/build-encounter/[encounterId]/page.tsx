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
import { getSingleEncounterWithMonsters } from "@/data-access/encounters";
import { parse } from "path";

type Props = {
  params: Promise<{ encounterId: string }>;
  searchParams: Promise<{ query: string }>;
};

export default async function BuildEncounters({ params, searchParams }: Props) {
  const encounterId = (await params).encounterId;
  const query = (await searchParams).query || "";

  const id = parseInt(encounterId);
  const numberRegex = /^\d+$/;
  // If not valid number, redirect to new encounter
  if (!numberRegex.test(encounterId) || id <= 0) redirect("/my-encounters");

  // Start fetching encounter and monsters simultaneously
  const [encounter, monsters] = await Promise.all([
    getSingleEncounterWithMonsters(id),
    getXMonsters(),
  ]);

  if (!encounter) redirect("/my-encounters");

  return (
    <EncounterSavedContextProvider>
      <EncounterContextProvider initialEncounter={encounter}>
        <QueryContextProvider initialQuery={query}>
          <SearchBar />
          <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Suspense fallback={<FallBack />}>
              {/* <MonsterList query={query} /> */}
              <MonsterList monsters={monsters} />
            </Suspense>
            <CurrentEncounter id={id} />
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
