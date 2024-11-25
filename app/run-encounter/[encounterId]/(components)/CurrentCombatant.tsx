"use client";
import React from "react";
import { cn } from "@/lib/utils";

import Monster from "@/components/monster/Monster";

import { useCombatStore } from "@/providers/CombatProvider";

type Props = {
  className?: string;
};

export default function CurrentCombatant({ className }: Props) {
  const index = useCombatStore(state => state.index);
  const combat = useCombatStore(state => state.combat);
  const updateCombat = useCombatStore(state => state.updateCombat);

  return (
    <div className={cn("border-2 border-black rounded", className)}>
      <Monster
        monster={combat[index]}
        index={index}
        combat={true}
        updateCombat={updateCombat}
        currentCombat={combat}
        className="h-full"
      />
    </div>
  );
}
