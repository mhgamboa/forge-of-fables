import "server-only";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { authenticateUser } from "@/data-access/auth";

export const getMyEncounters = async () => {
  const supabase = await createClient();

  const { id: user_id } = await authenticateUser(supabase);

  const { data: encounters } = await supabase
    .from("encounters")
    .select()
    .eq("user_id", user_id)
    .order("updated_at", { ascending: false });

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
    .from("encounters")
    .select()
    .eq("encounter_id", encounterId);

  return monsters;
};

export const getSingleEncounterWithMonsters = async (encounterId: number) => {
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
          monsters (name, id)
        ),
        encounter_players (id, name)`
    )
    .eq("id", encounterId)
    .eq("user_id", user_id)
    .single();
  if (!encounter) return redirect("/build-encounter/new");

  return encounter;
};
