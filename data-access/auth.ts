import "server-only";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SupabaseClient } from "@supabase/supabase-js";

export const authenticateUser = async (client?: SupabaseClient<any, "public", any>) => {
  const supabase = client ?? (await createClient());

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error("getUser", error);
    redirect("/sign-in");
  }
  return data.user;
};

export const getUserId = async () => {
  const user = await authenticateUser();
  return user.id;
};
