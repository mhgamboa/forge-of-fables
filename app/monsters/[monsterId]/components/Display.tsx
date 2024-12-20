"use client";
import React from "react";

import { useTextContext } from "../TextContext";
import parseMonsterText from "@/lib/import-monster/_parse";
import Monster from "@/components/monster/Monster";
import { usePathname } from "next/navigation";

export default function Display() {
  const { text } = useTextContext();

  const pathname = usePathname();
  const monsterId = +pathname.split("/").at(-1)!;
  const monster = parseMonsterText(text, monsterId);

  return (
    <div>
      <Monster monster={monster} combat={false} />
    </div>
  );
}
