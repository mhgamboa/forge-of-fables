"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { useCombatStore } from "@/providers/CombatProvider";

type Props = {
  className?: string;
};

export default function Combatants({ className }: Props) {
  const combat = useCombatStore(state => state.combat);
  const setIndex = useCombatStore(state => state.setIndex);
  return (
    <div
      className={cn(
        "border-2 border-black flex flex-col rounded max-h-[75dvh] overflow-y-scroll",
        className
      )}
    >
      {combat.map((monster, i) => (
        <div
          key={monster.id}
          className="flex justify-between p-4 border-b last:border-b-0 cursor-pointer"
          onClick={() => setIndex(i)}
        >
          <div>{monster.name}</div>
          <div>input/{monster.currentHp}</div>
        </div>
      ))}
    </div>
  );
}
