"use client";
import React from "react";
import { create } from "mutative";

import { cn } from "@/lib/utils";
import { useEncounterStore } from "@/providers/CombatProvider";
import { Input } from "@/components/ui/input";

type Props = {
  className?: string;
};

export default function Combatants({ className }: Props) {
  const combatants = useEncounterStore(state => state.combatants);
  const setCombatants = useEncounterStore(state => state.setCombatants);
  const setCurrentTurn = useEncounterStore(state => state.setCurrentTurn);
  const currentTurn = useEncounterStore(state => state.currentTurn);

  const handleHPChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    e.preventDefault();
    const newState = create(combatants, draft => {
      draft[i].currentHp = +e.target.value;
    });
    setCombatants(newState);
  };

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
            <div>{c.isMonster ? c.info.name : c.name}</div>
            <div className="flex items-center justify-end space-x-4 w-32">
              <Input
                type="number"
                value={c.currentHp}
                onChange={e => handleHPChange(e, i)}
                onClick={e => e.stopPropagation()}
                className="w-20"
              />
              {c.isMonster && <>/{c.info.hp_value}</>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
