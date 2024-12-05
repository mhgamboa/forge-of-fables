"use server";
import { authenticateUser } from "@/data-access/auth";
import { createClient } from "@/utils/supabase/server";

export const createEncounter = async (name: string, description: string) => {
  const supabase = await createClient();
  const { id: user_id } = await authenticateUser(supabase);
  const { data, error } = await supabase
    .from("encounters")
    .insert([
      {
        name: "New Encounter",
        description: "This is a new encounter",
        user_id: user_id,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("createEncounter", error);
    throw error;
  }
  if (!data) throw new Error("No data returned");
  return data;
};
