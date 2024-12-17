"use client";
import React from "react";

import { cn } from "@/lib/utils";
import { useEncounterStore } from "@/providers/CombatProvider";
import HPInput from "./HPInput";

type Props = {
  className?: string;
};

export default function Combatants({ className }: Props) {
  const combatants = useEncounterStore(state => state.combatants);
  const setCurrentTurn = useEncounterStore(state => state.setCurrentTurn);
  const currentTurn = useEncounterStore(state => state.currentTurn);

  return (
    <div
      className={cn(
        "border-2 border-black flex flex-col rounded max-h-96 lg:max-h-[75dvh] overflow-y-scroll dark:bg-gray-900",
        className
      )}
    >
      {combatants.map((c, i) => {
        return (
          <div
            key={c.id}
            className={cn(
              "flex justify-between p-4 border-b last:border-b-0 cursor-pointer items-center",
              currentTurn === i && "bg-gray-200 dark:bg-gray-800"
            )}
            onClick={() => setCurrentTurn(i)}
          >
            <div className="w-28">{c.isMonster ? c.info.name : c.name}</div>
            <HPInput i={i} />
            <div className="w-16 text-end">{c.currentHp} </div>
          </div>
        );
      })}
    </div>
  );
}
