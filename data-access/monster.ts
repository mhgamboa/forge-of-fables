import "server-only";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const getXMonsters = async (query: string) => {
  // const quantity = x ?? 10;
  const supabase = createClient();
  const user = await supabase.auth.getUser();
  if (user.error) {
    console.error("getXMonsters", user.error);
    redirect("/sign-in");
  }
  const userId = user.data.user.id;

  let q = supabase
    .from("monsters")
    .select()
    .order("name", { ascending: true })
    .eq("is_deleted", false)
    .or(`user_id.is.null` + `,user_id.eq.${userId}`);
  if (query) q = q.ilike("name", `%${query}%`);

  const { data: monsters, error } = await q;

  return monsters;
};

export const getMyMonsters = async () => {
  const supabase = createClient();
  const user = await supabase.auth.getUser();
  if (user.error) {
    console.error("data-access/monster.ts getMyMonsters", user.error);
    redirect("/sign-in");
  }
  const userId = user.data.user.id;

  const { data: monsters } = await supabase
    .from("monsters")
    .select()
    .eq("is_deleted", false)
    .eq("user_id", userId);
  return monsters;
};

export const getMonstersById = async (monsterIds: number[]) => {
  const supabase = createClient();
  const { data: monsters } = await supabase.from("monsters").select().in("id", monsterIds);
  return monsters;
};
