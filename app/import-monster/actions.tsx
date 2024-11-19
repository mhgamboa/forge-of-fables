"use server";

import { Tables } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const insertMonster = async (monster: Tables<"monsters">) => {
  const supabase = await createClient();

  // Authenticate User
  const user = await supabase.auth.getUser();
  if (user.error) {
    console.error("insertMonster", user.error);
    redirect("/sign-in");
  }

  const user_id = user.data.user.id;

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
