import "server-only";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { authenticateUser } from "./auth";

export const getXMonsters = async (query?: string) => {
  // const quantity = x ?? 10;
  const supabase = await createClient();
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
  const supabase = await createClient();
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
    .eq("user_id", userId)
    .order("name", { ascending: true });
  return monsters;
};

export const getMonstersById = async (monsterIds: number[]) => {
  const supabase = await createClient();
  const { data: monsters } = await supabase.from("monsters").select().in("id", monsterIds);
  return monsters;
};

export const getSingleMonster = async (monsterId: number, columns?: string[]) => {
  const supabase = await createClient();
  const { id: user_id } = await authenticateUser(supabase);
  const { data: monster, error } = await supabase
    .from("monsters")
    .select()
    .eq("id", monsterId)
    .eq("user_id", user_id)
    .single();

  if (error || !monster) {
    console.error("data-access/monster.ts getSingleMonster", error);
    redirect("/monsters/list");
  }
  return monster;
};
