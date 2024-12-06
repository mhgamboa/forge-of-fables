"use server";
import { authenticateUser } from "@/data-access/auth";
import { createClient } from "@/utils/supabase/server";

type MonsterArr = { id: number; name: string; tempId: number }[];

export const createEncounter_monster = async (
  arr: MonsterArr,
  encounter_id: number,
  userId?: string
) => {
  const supabase = await createClient();
  const { id: user_id } = userId ? { id: userId } : await authenticateUser(supabase);
  const formattedArr = arr.map(obj => ({ encounter_id, monster_id: obj.id, user_id }));

  const { data, error } = await supabase.from("encounter_monsters").insert(formattedArr).select();
  if (error) {
    console.error("createEncounter_monster", error);
    throw error;
  }
  return data;
};
