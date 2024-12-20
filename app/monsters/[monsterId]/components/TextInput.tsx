"use client";
import React, { ChangeEvent, useState } from "react";
import { toast } from "sonner";
import { redirect, usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useTextContext } from "../TextContext";

import { createClient } from "@/utils/supabase/client";
import parseMonsterText from "@/lib/import-monster/_parse";
import { updateMonster } from "@/actions/monsterActions";

export default function TextInput() {
  const { text, setText } = useTextContext();
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setText(event.target.value);
  }

  const handleSave = async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const monsterId = +pathname.split("/").at(-1)!;
      const { data, error } = await supabase.auth.getSession();
      if (!data?.session?.user.id || error) {
        toast.error("You must be logged in to save monster");
        redirect("/login");
      }
      const monster = parseMonsterText(text, monsterId);
      if (!monster) throw new Error("No monster found");
      await updateMonster(monster, data?.session?.user.id, monsterId);
      toast.success("Successfully updated monster", { position: "top-center" });
    } catch (error) {
      toast.error("Failed to save monster", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col w-full gap-y-4">
      <Textarea
        placeholder="Paste your monster here"
        className="w-full h-full min-h-96"
        defaultValue={text}
        onChange={handleChange}
      />
      <Button onClick={handleSave}>Save</Button>
    </div>
  );
}
