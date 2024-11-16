"use client";
import React from "react";
import { create } from "mutative";

import { cn } from "@/lib/utils";
import { useCombatStore } from "@/providers/CombatProvider";
import { Input } from "@/components/ui/input";

type Props = {
  className?: string;
};

export default function Combatants({ className }: Props) {
  const combat = useCombatStore(state => state.combat);
  const updateCombat = useCombatStore(state => state.updateCombat);
  const setIndex = useCombatStore(state => state.setIndex);

  const handleHPChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    e.preventDefault();
    const newState = create(combat, draft => {
      draft[i].currentHp = +e.target.value;
    });
    updateCombat(newState);
  };

  return (
    <div
      className={cn(
        "border-2 border-black flex flex-col rounded max-h-96 lg:max-h-[75dvh] overflow-y-scroll dark:bg-gray-900",
        className
      )}
    >
      {combat.map((monster, i) => (
        <div
          key={`${monster.id}-${i}`}
          className="flex justify-between p-4 border-b last:border-b-0 cursor-pointer items-center"
          onClick={() => setIndex(i)}
        >
          <div>{monster.name}</div>
          <div className="flex items-center justify-end space-x-4 w-32">
            <Input
              type="number"
              value={monster.currentHp}
              onChange={e => handleHPChange(e, i)}
              onClick={e => e.stopPropagation()}
              className="w-20"
            />
            /{monster.currentHp}
          </div>
        </div>
      ))}
    </div>
  );
}
