"use client";
import React from "react";
import { cn } from "@/lib/utils";

import Monster from "@/components/monster/Monster";

import { useEncounterStore } from "@/providers/CombatProvider";
import Player from "@/components/player/Player";

type Props = {
  className?: string;
};

export default function CurrentCombatant({ className }: Props) {
  const currentTurn = useEncounterStore(state => state.currentTurn);
  const combatants = useEncounterStore(state => state.combatants);
  const updateCombat = useEncounterStore(state => state.setCombatants);

  return (
    <div className={cn("border-2 border-black rounded", className)}>
      {combatants[currentTurn].isMonster ? (
        <Monster
          monster={combatants[currentTurn].info}
          index={currentTurn}
          combat={true}
          updateCombat={updateCombat}
          currentCombat={combatants}
          className="h-full"
        />
      ) : (
        <Player />
      )}
    </div>
  );
}
