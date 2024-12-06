"use server";
import { authenticateUser } from "@/data-access/auth";
import { createClient } from "@/utils/supabase/server";
import { type EncounterMonstersType } from "@/context/build-encouter-context";

type MonsterArr = { id: number; name: string; tempId: number }[];

export const createEncounter_monsters = async (
  arr: MonsterArr,
  encounter_id: number,
  userId?: string
) => {
  if (arr.length === 0) return;

  const supabase = await createClient();
  const { id: user_id } = userId ? { id: userId } : await authenticateUser(supabase);
  const formattedArr = arr.map(obj => ({ encounter_id, monster_id: obj.id, user_id }));

  const { data, error } = await supabase
    .from("encounter_monsters")
    .insert(formattedArr)
    .select();
  if (error) {
    console.error("createEncounter_monster", error);
    throw error;
  }
  return data;
};

export const deleteEncounter_monsters = async (
  arr: EncounterMonstersType[],
  userId?: string
) => {
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
