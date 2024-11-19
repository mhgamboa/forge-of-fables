"use server";

import { redirect } from "next/navigation";
import { EncounterJson } from "@/types/encounterJsonTypes";
import { createClient } from "@/utils/supabase/server";

export const setEncounterJsonDB = async (
  id: number,
  encounterJson: EncounterJson,
  name: string
) => {
  const supabase = await createClient();
  // Authenticate User
  const user = await supabase.auth.getUser();
  if (user.error) {
    console.error("setEncounterJson", user.error);
    redirect("/sign-in");
  }

  const userId = user.data.user.id;

  // Update Encounter JSON
  const { error: updateError } = await supabase
    .from("encounter_jsons")
    .update({ encounter_json: encounterJson, name })
    .eq("id", id)
    .eq("user_id", userId);

  if (updateError) {
    console.error("Error updating encounter:", updateError);
    throw updateError;
  }
  return "success";
};

export const createEncounterJsonDB = async (encounterJson: EncounterJson, name: string) => {
  const supabase = await createClient();

  // Authenticate User
  const user = await supabase.auth.getUser();
  if (user.error) {
    console.error("createEncounterJsonDB", user.error);
    redirect("/sign-in");
  }

  const userId = user.data.user.id;

  // Create Encounter JSON
  const { data, error } = await supabase
    .from("encounter_jsons")
    .insert({ encounter_json: encounterJson, user_id: userId, name })
    .select();

  if (error) {
    console.error("Error creating encounter:", error);
    throw error;
  }

  redirect(`/build-encounter/${data[0].id}`);
};
