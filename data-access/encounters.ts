import "server-only";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const getMyEncounters = async () => {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();
  if (user.error) {
    console.error("getMyEncounters", user.error);
    redirect("/sign-in");
  }
  const { data: encounters } = await supabase.from("encounters").select();
  return encounters;
};

export const getEncounterMonsters = async (encounterId: number) => {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();
  if (user.error) {
    console.error("getEncounterMonsters", user.error);
    redirect("/sign-in");
  }

  const { data: monsters } = await supabase
    .from("encounter_stats")
    .select()
    .eq("encounter_id", encounterId);

  return monsters;
};
