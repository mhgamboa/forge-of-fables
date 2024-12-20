"use client";
import React from "react";
import { useTextContext } from "../TextContext";
import parseMonsterText from "@/lib/import-monster/_parse";
import Monster from "@/components/monster/Monster";

export default function Display() {
  const { text } = useTextContext();
  const monster = parseMonsterText(text);

  return (
    <div>
      <Monster monster={monster} combat={false} />
    </div>
  );
}
