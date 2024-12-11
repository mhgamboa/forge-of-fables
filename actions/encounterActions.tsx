"use server";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

import { authenticateUser } from "@/data-access/auth";

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

export const getEncounterWithJoins = async (encounterId: number) => {
  const supabase = await createClient();
  const { id: user_id } = await authenticateUser(supabase);

  const { data: encounter } = await supabase
    .from("encounters")
    .select(
      `id,
        name,
        description,
        encounter_monsters (
          id,
          notes,
          monsters (name, id)
        ),
        encounter_players (id, name, notes)`
    )
    .eq("id", encounterId)
    .eq("user_id", user_id)
    .single();

  if (!encounter) return redirect("/my-encounters");

  return encounter;
};
