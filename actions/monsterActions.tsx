"use server";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

import { authenticateUser } from "@/data-access/auth";
import { Tables } from "@/types/database.types";

export const insertMonster = async (monster: Tables<"monsters">, userId?: string) => {
  const supabase = await createClient();
  // Authenticate User
  let user_id = userId ?? (await authenticateUser(supabase)).id;

  // Create Monster
  const { data, error } = await supabase
    .from("monsters")
    .insert({ ...monster, user_id })
    .select();

  if (error) {
    console.error("Error creating monster:", error);
    throw error;
  }

  return data[0];
};

export const updateMonster = async (
  monster: Tables<"monsters">,
  userId?: string,
  monsterId?: number
) => {
  const supabase = await createClient();
  // Authenticate User
  let user_id = userId ?? (await authenticateUser(supabase)).id;

  // Update Monster
  const { data, error } = await supabase
    .from("monsters")
    .update({ ...monster, user_id, id: monsterId ? monsterId : monster.id })
    .eq("id", monsterId ? monsterId : monster.id)
    .eq("user_id", user_id)
    .select();

  if (error) {
    console.error("/actions/monsterActions.ts updateMonster", error);
    throw error;
  }
  if (!data) throw new Error("No data returned");
  return data;
};
