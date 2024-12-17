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

export const updateEncounter = async (
  encounterId: number,
  name: string,
  description: string | null
) => {
  const supabase = await createClient();
  const { id: user_id } = await authenticateUser(supabase);

  // Create an object to hold the updates
  const updates: any = {};

  // Only add name and description if they are not empty
  if (name) {
    updates.name = name;
  }
  if (description) {
    updates.description = description;
  }

  const { data, error } = await supabase
    .from("encounters")
    .update(updates)
    .eq("id", encounterId)
    .eq("user_id", user_id)
    .select();

  if (error) {
    console.error("updateEncounter", error);
    throw error;
  }
  if (!data) throw new Error("No data returned");
  return data;
};

export const deleteEncounter = async (encounterId: number, userId?: string) => {
  const supabase = await createClient();
  let user_id = userId ?? (await authenticateUser(supabase)).id;

  const { data, error } = await supabase
    .from("encounters")
    .delete()
    .eq("id", encounterId)
    .eq("user_id", user_id)
    .select();

  if (error) {
    console.error("deleteEncounter", error);
    throw error;
  }
  if (!data) throw new Error("No data returned");
  return data;
};
