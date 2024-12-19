import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

import {
  createEncounter_monsters,
  deleteEncounter_monsters,
  updateEncounter_monsters,
} from "@/actions/encounter_monsterActions";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { EncounterContextType } from "@/context/build-encouter-context";
import {
  createEncounter_players,
  deleteEncounter_players,
  updateEncounter_players,
} from "@/actions/encounter_playerActions";
import { getEncounterWithJoins, updateEncounter } from "@/actions/encounterActions";

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
      // Monster-related actions
      encounter.encounter_monstersToBeAdded.length > 0
        ? createEncounter_monsters(encounter.encounter_monstersToBeAdded, encounter.id, userId)
        : Promise.resolve({ status: "fulfilled" }),
      encounter.encounter_monstersToBeRemoved.length > 0
        ? deleteEncounter_monsters(encounter.encounter_monstersToBeRemoved, userId)
        : Promise.resolve({ status: "fulfilled" }),
      encounter.encounter_monstersToBeUpdated.length > 0
        ? updateEncounter_monsters(encounter.encounter_monstersToBeUpdated, userId)
        : Promise.resolve({ status: "fulfilled" }),
      // Player-related actions
      encounter.encounter_playersToBeAdded.length > 0
        ? createEncounter_players(encounter.encounter_playersToBeAdded, encounter.id, userId)
        : Promise.resolve({ status: "fulfilled" }),
      encounter.encounter_playersToBeRemoved.length > 0
        ? deleteEncounter_players(encounter.encounter_playersToBeRemoved, userId)
        : Promise.resolve({ status: "fulfilled" }),
      encounter.encounter_playersToBeUpdated.length > 0
        ? updateEncounter_players(encounter.encounter_playersToBeUpdated, userId)
        : Promise.resolve({ status: "fulfilled" }),
      // Encounter-specific actions
      encounter.newEncounterName || encounter.newEncounterDescription
        ? updateEncounter(
            encounter.id,
            encounter.newEncounterName,
            encounter.newEncounterDescription
          )
        : Promise.resolve({ status: "fulfilled" }),
    ]);

    let errorMessages: string[] = [];
    const updatedEncounter = { ...encounter };

    // Monster-related results
    if (res[0].status === "rejected") errorMessages.push("Warning: Monsters were not added");
    else updatedEncounter.encounter_monstersToBeAdded = [];

    if (res[1].status === "rejected") errorMessages.push("Warning: Monsters were not removed");
    else updatedEncounter.encounter_monstersToBeRemoved = [];

    if (res[2].status === "rejected") errorMessages.push("Warning: Monsters were not updated");
    else updatedEncounter.encounter_monstersToBeUpdated = [];

    // Player-related results
    if (res[3].status === "rejected") errorMessages.push("Warning: Players were not added");
    else updatedEncounter.encounter_playersToBeAdded = [];

    if (res[4].status === "rejected") errorMessages.push("Warning: Players were not removed");
    else updatedEncounter.encounter_playersToBeRemoved = [];

    if (res[5].status === "rejected") errorMessages.push("Warning: Players were not updated");
    else updatedEncounter.encounter_playersToBeUpdated = [];

    // Encounter-specific results
    if (res[6].status === "rejected")
      errorMessages.push("Warning: Encounter Name & Description was not updated");
    else {
      updatedEncounter.newEncounterName = "";
      updatedEncounter.newEncounterDescription = "undefined";
    }

    // TODO: Instead of Querying the DB AGAIN, return values in promise.all and update encounter directly
    const newInitialEncounter = await getEncounterWithJoins(encounter.id);
    updatedEncounter.name = newInitialEncounter.name;
    updatedEncounter.description = newInitialEncounter.description;
    updatedEncounter.encounter_monsters = newInitialEncounter.encounter_monsters;
    updatedEncounter.encounter_players = newInitialEncounter.encounter_players;
    setEncounter(updatedEncounter);

    if (errorMessages.length === 0) toast.success("Encounter Saved", { position: "top-center" });
    else if (errorMessages.length === 2)
      toast.error("Encounter Not saved", { position: "top-center" });
    else toast.warning(errorMessages.join("\n"), { position: "top-center" });

    return { success: errorMessages.length === 0, errors: errorMessages };
  } catch (catchError) {
    toast.error("An unexpected error occurred", { position: "top-center" });
    return { success: false, errors: ["An unexpected error occurred"] };
  }
}
