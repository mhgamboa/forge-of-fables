"use server";
import { createClient } from "@/utils/supabase/server";
import { authenticateUser } from "@/data-access/auth";

import { EncounterPlayersToBeAddedType, EncounterPlayersType } from "@/types/buildEncounter";
import { Tables } from "@/types/database.types";

export const createEncounter_players = async (
  arr: EncounterPlayersToBeAddedType[],
  encounterId: number,
  userId?: string
) => {
  if (arr.length === 0) return;
  const supabase = await createClient();
  const { id: user_id } = userId ? { id: userId } : await authenticateUser(supabase);
  const formattedArr = arr.map(obj => ({
    encounter_id: encounterId,
    user_id,
    name: obj.name,
    notes: obj.notes,
  }));

  const { data, error } = await supabase.from("encounter_players").insert(formattedArr).select();
  if (error) {
    console.error("createEncounter_players", error);
    throw error;
  }
  return data;
};

export const deleteEncounter_players = async (arr: EncounterPlayersType[], userId?: string) => {
  if (arr.length === 0) return;
  const supabase = await createClient();

  const { id: user_id } = userId ? { id: userId } : await authenticateUser(supabase);

  const formattedArr = arr.map(obj => obj.id);

  const { data, error } = await supabase
    .from("encounter_players")
    .delete()
    .in("id", formattedArr)
    .eq("user_id", user_id);

  if (error) {
    console.error("deleteEncounter_players", error);
    throw error;
  }
  return data;
};

export const updateEncounter_players = async (
  arr: Tables<"encounter_players">[],
  userId?: string
) => {
  if (arr.length === 0) return;
  const supabase = await createClient();

  const { id: user_id } = userId ? { id: userId } : await authenticateUser(supabase);

  const formattedArr = arr.map(obj => ({
    id: obj.id,
    encounter_id: obj.encounter_id,
    name: obj.name,
    notes: obj.notes,
    user_id,
  }));

  const { data, error } = await supabase
    .from("encounter_players")
    .upsert(formattedArr, { onConflict: "id" })
    .eq("user_id", user_id);

  if (error) {
    console.error("updateEncounter_players", error);
    throw error;
  }
  return data;
};
