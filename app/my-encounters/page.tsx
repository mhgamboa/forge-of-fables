import React from "react";

import { getMyEncounters } from "@/data-access/encounters";

import NewEncounterCard from "./components/newEncounterCard";
import EncounterCard from "./components/EncounterCard";

export default async function MyEncounters() {
  const encounters = await getMyEncounters();
  if (!encounters) {
    return <div>No encounters found.</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-3">My encounters</h1>
      <div className="gap-y-3 grid grid-cols-1 sm:gap-x-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <NewEncounterCard />
        {encounters.map(e => {
          return <EncounterCard e={e} key={e.id} />;
        })}
      </div>
    </div>
  );
}
