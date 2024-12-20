"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { EncounterPlayerType, useEncounterStore } from "@/providers/CombatProvider";

import { Input } from "@/components/ui/input";
import { create } from "mutative";
import { Textarea } from "@/components/ui/textarea";

export default function Player({ className }: { className?: string }) {
  const combatants = useEncounterStore(state => state.combatants);
  const setCombatants = useEncounterStore(state => state.setCombatants);
  const currentTurn = useEncounterStore(state => state.currentTurn);
  const currentPlayer = combatants[currentTurn] as EncounterPlayerType;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newState = create(combatants, draft => {
      draft[currentTurn].notes = e.target.value;
    });
    setCombatants(newState);
  };

  return (
    <div
      className={cn("bg-gray-100 dark:bg-gray-900 p-3 rounded-sm flex flex-col gap-y-4", className)}
    >
      <div className="flex items-center justify-center rounded-md w-full gap-x-3">
        <h2 className="text-2xl font-bold dark:text-primary text-center">{currentPlayer.name}</h2>
        Total HP:
        <Input
          type="number"
          className="w-20 text-black"
          value={currentPlayer.currentHp ?? 0}
          onChange={e => {
            const newState = create(combatants, draft => {
              draft[currentTurn].currentHp = +e.target.value;
            });
            setCombatants(newState);
          }}
        />
      </div>
      <Textarea
        placeholder="Add Any Notes here"
        value={currentPlayer.notes ?? ""}
        onChange={handleChange}
      />
    </div>
  );
}
