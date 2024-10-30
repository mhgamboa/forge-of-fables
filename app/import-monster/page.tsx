"use client";
import React, { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import Monster from "@/components/monster/Monster";
import { Tables } from "@/types/database.types";
import parse from "@/lib/import-monster/_parse";

export default function ImportMonster() {
  const [monster, setMonster] = useState<any>(null);
  // const [monster, setMonster] = useState<Tables<"monsters"> | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMonster(parse(e.target.value));
  };
  useEffect(() => {
    console.log(monster);
  }, [monster]);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 p-4 w-full bg-red-500">
      <Textarea
        placeholder="Paste your monster here"
        className="w-full md:w-1/2"
        onChange={handleChange}
      />
      <div className="w-full md:w-1/2 bg-blue-500">Sup</div>
    </div>
  );
}
