import React from "react";
import { redirect } from "next/navigation";

import { getSingleEncounterJson } from "@/data-access/encounter_json";
import { getMonstersById } from "@/data-access/monster";

import InitializeZustand from "./(components)/InitializeZustand";
import { formatEncounter } from "@/utils/formatEncounter";
import Combatants from "./(components)/Combatants";
import CurrentCombatant from "./(components)/CurrentCombatant";
import { EncounterJson } from "@/types/encounterJsonTypes";

type Props = {
  params: Promise<{ encounterId: number }>;
};

export default async function RunEncounterPage(props: Props) {
  const { encounterId } = await props.params;
  const encounter = await getSingleEncounterJson(encounterId);
  if (!encounter) redirect("/my-encounters");
  const json = encounter.encounter_json as EncounterJson;

  const monsterIds = Object.keys(encounter.encounter_json!).map(Number);
  const monsters = (await getMonstersById(monsterIds)) || [];

  const formattedEncounter = monsters && formatEncounter(monsters, json);

  return (
    <InitializeZustand combat={formattedEncounter}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Combatants className="lg:col-span-1 bg-gray-50" />
        <CurrentCombatant className="lg:col-span-2" />
      </div>
    </InitializeZustand>
  );
}
