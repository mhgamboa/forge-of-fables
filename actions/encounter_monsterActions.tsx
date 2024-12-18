"use server";
import { authenticateUser } from "@/data-access/auth";
import { createClient } from "@/utils/supabase/server";
import { encounterMonstersToBeAddedType, type EncounterMonstersType } from "@/types/buildEncounter";
import { redirect } from "next/navigation";
import { Tables } from "@/types/database.types";

type MonsterArr = encounterMonstersToBeAddedType[];

export const createEncounter_monsters = async (
  arr: MonsterArr,
  encounter_id: number,
  userId?: string
) => {
  if (arr.length === 0) return;

  const supabase = await createClient();
  const { id: user_id } = userId ? { id: userId } : await authenticateUser(supabase);
  const formattedArr = arr.map(obj => ({
    encounter_id,
    monster_id: obj.id,
    user_id,
    notes: obj.notes,
  }));

  const { data, error } = await supabase.from("encounter_monsters").insert(formattedArr).select();
  if (error) {
    console.error("createEncounter_monster", error);
    throw error;
  }
  return data;
};

export const deleteEncounter_monsters = async (arr: EncounterMonstersType[], userId?: string) => {
  if (arr.length === 0) return;
  const supabase = await createClient();

  const { id: user_id } = userId ? { id: userId } : await authenticateUser(supabase);

  const formattedArr = arr.map(obj => obj.id);

  const { data, error } = await supabase
    .from("encounter_monsters")
    .delete()
    .in("id", formattedArr)
    .eq("user_id", user_id);

  if (error) {
    console.error("deleteEncounter_monster", error);
    throw error;
  }
  return data;
};

export const getEncounter_monster = async (id: number) => {
  const supabase = await createClient();
  const { id: user_id } = await authenticateUser(supabase);

  const { data: monster } = await supabase
    .from("encounter_monsters")
    .select("*")
    .eq("id", id)
    .eq("user_id", user_id)
    .single();

  if (!monster) {
    return [redirect("/my-encounters")];
  }

  return monster;
};

export const updateEncounter_monsters = async (
  arr: Tables<"encounter_monsters">[],
  userId?: string
) => {
  if (arr.length === 0) return;
  const supabase = await createClient();

  const { id: user_id } = userId ? { id: userId } : await authenticateUser(supabase);

  const formattedArr = arr.map(obj => ({
    id: obj.id,
    notes: obj.notes,
    encounter_id: obj.encounter_id,
    monster_id: obj.monster_id,
    user_id,
  }));

  console.log(formattedArr);
  const { data, error } = await supabase
    .from("encounter_monsters")
    .upsert(formattedArr, { onConflict: "id" })
    // .upsert(formattedArr, { onConflict: "id" })
    .eq("user_id", user_id);

  if (error) {
    console.error("updateEncounter_monster", error);
    throw error;
  }
  return data;
};
