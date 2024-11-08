"use client";
import { cn } from "@/lib/utils";
import { useCombatStore } from "@/providers/CombatProvider";
import React from "react";

type Props = {
  className?: string;
};

export default function CurrentCombatant({ className }: Props) {
  const index = useCombatStore(state => state.index);
  const combat = useCombatStore(state => state.combat);

  console.log(combat[index]);
  return <div className={cn("border-2 border-black rounded", className)}>{combat[index].name}</div>;
}
