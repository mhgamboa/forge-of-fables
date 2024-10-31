"use client";
import React, { useState } from "react";

import { Tables } from "@/types/database.types";

import { Textarea } from "@/components/ui/textarea";
import Monster from "@/components/monster/Monster";

import parse from "@/lib/import-monster/_parse";

export default function ImportMonster() {
  const [monster, setMonster] = useState<Tables<"monsters"> | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setMonster(parse(e.target.value));

  // TODO: Add a button to import the monster
  // TODO: Add functionality to import the monster to DB
  return (
    <div className="grid grid-cols-1 gap-x-3 gap-y-5 md:grid-cols-2 w-full">
      <Textarea
        placeholder="Paste your monster here"
        className="w-full h-full min-h-96"
        onChange={handleChange}
      />
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
