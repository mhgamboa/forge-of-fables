"use client";
import React, { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { redirect } from "next/navigation";

import { Tables } from "@/types/database.types";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Monster from "@/components/monster/Monster";

import parse from "@/lib/import-monster/_parse";
import { insertMonster } from "@/actions/monsterActions";

export default function ImportMonster() {
  const supabase = createClient();

  const [monster, setMonster] = useState<Tables<"monsters"> | null>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setMonster(parse(e.target.value));

  const handleSave = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (!data?.session?.user.id) {
      toast.error("You must be logged in to save monster");
      redirect("/login");
    }

    try {
      if (!monster) throw new Error("No monster found");
      await insertMonster(monster);
      toast.success("Successfully saved monster", { position: "top-center" });
    } catch (error) {
      toast.error("Failed to save monster", { position: "top-center" });
    }
  };

  return (
    <div className="grid grid-cols-1 gap-x-3 gap-y-5 md:grid-cols-2 w-full pb-6">
      <div className="flex flex-col w-full gap-y-4">
        <Textarea
          placeholder="Paste your monster here"
          className="w-full h-full min-h-96"
          onChange={handleChange}
        />
        <Button onClick={handleSave}>Save</Button>
      </div>
      <div className="w-full">
        {monster ? (
          <Monster monster={monster} combat={false} />
        ) : (
          <p className="text-gray-500 text-center">Please paste a valid monster</p>
        )}
      </div>
    </div>
  );
}

type dog = {
  name: string;
  age: number;
  dogBreed: string;
};
