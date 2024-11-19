import "server-only";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { FormattedEncounterJson, type EncounterJson } from "@/types/encounterJsonTypes";

export const getMyEncounterJsons = async () => {
  const supabase = await createClient();
  const { error, data } = await supabase.auth.getUser();
  if (error) {
    console.error("getMyEncounters", error);
    redirect("/sign-in");
  }

  const { data: encounters_jsons } = await supabase
    .from("encounter_jsons")
    .select(`id, name, created_at`)
    .eq("user_id", data.user.id)
    .order("updated_at", { ascending: false });

  return encounters_jsons;
};

export const getEncounterMonsters = async (encounterId: number) => {
  const supabase = await createClient();

  // Authenticate User
  const user = await supabase.auth.getUser();
  if (user.error) {
    console.error("getEncounterMonsters", user.error);
    redirect("/sign-in");
  }
  const userId = user.data.user.id;

  // Get Encounter JSON
  const { data: encounterData, error: encounterError } = await supabase
    .from("encounter_jsons")
    .select("encounter_json,user_id")
    .eq("id", encounterId)
    // .eq("user_id", userId)
    .single();

  if (encounterError) {
    console.error("Error fetching encounter:", encounterError);
    return [];
  }
  if (!encounterData || !encounterData.encounter_json) return [];
  if (encounterData.user_id !== userId) redirect("/my-encounters");

  const encounterJson = encounterData.encounter_json as EncounterJson;

  // Get Monster Names & Ids
  const monsterIdArray = Object.keys(encounterJson);
  const { data: monsters, error: monstersError } = await supabase
    .from("monsters")
    .select("id, name")
    .in("id", monsterIdArray);

  if (monstersError) {
    console.error("Error fetching monsters:", monstersError);
    return [];
  }
  if (!monsters) return [];

  // Combine Monster Names, Ids, and Quantities
  const monstersWithQuantity = monsters.map(m => ({
    ...m,
    quantity: encounterJson[m.id], // Ensure default quantity of 0 if missing
  }));

  return monstersWithQuantity;
};

export const getEncounterJsonName = async (id: number) => {
  const supabase = await createClient();
  // Authenticate User
  const user = await supabase.auth.getUser();
  if (user.error) {
    console.error("getEncounterJsonName", user.error);
    redirect("/sign-in");
  }
  const userId = user.data.user.id;

  // Get Encounter JSON
  const { data: encounterData, error: encounterError } = await supabase
    .from("encounter_jsons")
    .select("name, user_id")
    .eq("id", id)
    .single();

  if (encounterError) {
    console.error("Error fetching encounter:", encounterError);
    return "";
  }

  if (encounterData.user_id !== userId) redirect("/my-encounters");

  if (!encounterData) return "";

  return encounterData.name;
};

export const getSingleEncounterJson = async (id: number) => {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();
  if (user.error) {
    console.error("getSingleEncounter", user.error);
    redirect("/sign-in");
  }
  const userId = user.data.user.id;

  const { data: encounterJson } = await supabase
    .from("encounter_jsons")
    .select("name, encounter_json")
    .eq("id", id)
    .eq("user_id", userId)
    .single();

  return encounterJson;
};
