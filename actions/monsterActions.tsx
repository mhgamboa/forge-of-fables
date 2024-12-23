"use server";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

import { authenticateUser } from "@/data-access/auth";
import { Tables } from "@/types/database.types";

export const insertMonster = async (monster: Tables<"monsters">, userId?: string) => {
  const supabase = await createClient();

  // Authenticate User
  const user_id = userId ?? (await authenticateUser(supabase)).id;

  const { id: _id, ...updatedMonster } = monster; // We want Supbase to handle the ID, so we remove it here

  const { data, error } = await supabase
    .from("monsters")
    .insert({ ...updatedMonster, user_id })
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

  const id = monsterId ? monsterId : monster.id;

  // Update Monster
  const { data, error } = await supabase
    .from("monsters")
    .update({ ...monster, user_id, id })
    .eq("id", id)
    .eq("user_id", user_id)
    .select();

  if (error) {
    console.error("/actions/monsterActions.ts updateMonster", error);
    throw error;
  }
  if (!data) throw new Error("No data returned");
  return data;
};

export const deleteMonster = async (id: number, userId?: string) => {
  const supabase = await createClient();
  // Authenticate User
  let user_id = userId ?? (await authenticateUser(supabase)).id;

  const { error } = await supabase.from("monsters").delete().eq("id", id).eq("user_id", user_id);

  if (error) {
    console.error("/actions/monsterActions.ts deleteMonster", error);
    throw error;
  }
};
