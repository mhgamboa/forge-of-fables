"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { useCombatStore } from "@/providers/CombatProvider";

type Props = {
  className?: string;
};

export default function Combatants({ className }: Props) {
  const { combat } = useCombatStore(state => state);
  console.log("combat", combat);
  return (
    <div
      className={cn(
        "border-2 border-black flex flex-col rounded max-h-[70dvh] overflow-y-scroll",
        className
      )}
    >
      {combat.map(monster => (
        <div key={monster.id} className="flex justify-between p-4 border-b last:border-b-0">
          <div>{monster.name}</div>
          <div>input/{monster.currentHp}</div>
        </div>
      ))}
    </div>
  );
}
