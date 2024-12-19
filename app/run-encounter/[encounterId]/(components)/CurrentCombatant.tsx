"use client";
import React from "react";
import { cn } from "@/lib/utils";

import Monster from "@/components/monster/Monster";

import { EncounterMonsterType, useEncounterStore } from "@/providers/CombatProvider";
import Player from "@/components/player/Player";
import { Textarea } from "@/components/ui/textarea";
import { create } from "mutative";

type Props = {
  className?: string;
};

export default function CurrentCombatant({ className }: Props) {
  const currentTurn = useEncounterStore(state => state.currentTurn);
  const combatants = useEncounterStore(state => state.combatants);
  const setCombatants = useEncounterStore(state => state.setCombatants);
  const updateCombat = useEncounterStore(state => state.setCombatants);
  const currentPlayer = combatants[currentTurn];

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log("notes change");
    const newState = create(combatants, draft => {
      draft[currentTurn].notes = e.target.value;
    });
    setCombatants(newState);
  };

  return (
    <div className={cn("border-2 border-black rounded", className)}>
      {combatants[currentTurn].isMonster ? (
        <Monster
          monster={(combatants[currentTurn] as EncounterMonsterType).info}
          index={currentTurn}
          combat={true}
          updateCombat={updateCombat}
          currentCombat={combatants}
          className="h-full"
          notes={currentPlayer.notes}
          onNotesChange={handleNotesChange}
        />
      ) : (
        <Player className="h-full" />
      )}
    </div>
  );
}
