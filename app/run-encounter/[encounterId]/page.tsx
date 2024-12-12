import React from "react";
import { redirect } from "next/navigation";

import { getEncounterWithRelationsFull } from "@/data-access/encounters";

import InitializeZustand from "./(components)/InitializeZustand";
import Combatants from "./(components)/Combatants";
import CurrentCombatant from "./(components)/CurrentCombatant";

type Props = {
  params: Promise<{ encounterId: number }>;
};

export default async function RunEncounterPage(props: Props) {
  const { encounterId } = await props.params;
  const encounter = await getEncounterWithRelationsFull(encounterId);
  if (!encounter) redirect("/my-encounters");

  return (
    <InitializeZustand encounter={encounter}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Combatants className="lg:col-span-1 bg-gray-50" />
        <CurrentCombatant className="lg:col-span-2" />
      </div>
    </InitializeZustand>
  );
}
