import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function page() {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();
  if (user.error) redirect("/sign-in");

  redirect("/build-encounter/new");
}
