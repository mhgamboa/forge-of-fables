import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

import {
  createEncounter_monsters,
  deleteEncounter_monsters,
} from "@/actions/encounter_monsterActions";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { EncounterContextType } from "@/context/build-encouter-context";
import {
  createEncounter_players,
  deleteEncounter_players,
  updateEncounter_players,
} from "@/actions/encounter_playerActions";
import { getSingleEncounterWithMonsters } from "@/data-access/encounters";
import { create } from "mutative";

export interface EncounterSaveParams {
  encounter: EncounterContextType;
  setEncounter: React.Dispatch<React.SetStateAction<EncounterContextType>>;
  router: AppRouterInstance;
}

export async function handleSaveEncounter({
  encounter,
  setEncounter,
  router,
}: EncounterSaveParams) {
  console.time("handleSaveEncounter");
  const supabase = createClient();
  const { data, error } = await supabase.auth.getSession();

  const userId = data.session?.user.id;
  if (!data || error) {
    router.push("/login");
    toast.error("You must be logged in to save your encounter");
    return;
  }

  try {
    const res = await Promise.allSettled([
      createEncounter_monsters(encounter.encounter_monstersToBeAdded, encounter.id, userId),
      deleteEncounter_monsters(encounter.encounter_monstersToBeRemoved, userId),
      createEncounter_players(encounter.encounter_playersToBeAdded, encounter.id, userId),
      deleteEncounter_players(encounter.encounter_playersToBeRemoved, userId),
      updateEncounter_players(encounter.encounter_playersToBeUpdated, userId),
    ]);
    router.refresh();

    let errorMessages: string[] = [];
    if (res[0].status === "rejected") errorMessages.push("Warning: Monsters were not added");
    else setEncounter({ ...encounter, encounter_monstersToBeAdded: [] });
    if (res[1].status === "rejected") errorMessages.push("Warning: Monsters were not removed");
    else setEncounter({ ...encounter, encounter_monstersToBeRemoved: [] });
    if (res[2].status === "rejected") errorMessages.push("Warning: Players were not added");
    else setEncounter({ ...encounter, encounter_playersToBeAdded: [] });
    if (res[3].status === "rejected") errorMessages.push("Warning: Players were not removed");
    else setEncounter({ ...encounter, encounter_playersToBeRemoved: [] });
    if (res[4].status === "rejected") errorMessages.push("Warning: Players were not updated");
    else setEncounter({ ...encounter, encounter_playersToBeUpdated: [] });

    if (errorMessages.length === 0) toast.success("Encounter Saved", { position: "top-center" });
    else if (errorMessages.length === 2)
      toast.error("Encounter Not saved", { position: "top-center" });
    else toast.warning(errorMessages.join("\n"), { position: "top-center" });

    console.timeEnd("handleSaveEncounter");
    return { success: errorMessages.length === 0, errors: errorMessages };
  } catch (catchError) {
    toast.error("An unexpected error occurred", { position: "top-center" });
    return { success: false, errors: ["An unexpected error occurred"] };
  }
}
