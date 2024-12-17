import React from "react";
import { Input } from "@/components/ui/input";
import { EncounterPlayerType, EncounterMonsterType } from "@/providers/CombatProvider";
import { create } from "mutative";

interface MonsterStatsProps {
  ac_value: number;
  ac_notes: string | null;
  hp_value: number;
  hp_notes: string | null;
  speed: string[];
  updateCombat?: (c: (EncounterMonsterType | EncounterPlayerType)[]) => void;
  currentCombat?: (EncounterPlayerType | EncounterMonsterType)[];
  index?: number;
}

export default function MonsterStats({
  ac_value,
  ac_notes,
  hp_value,
  hp_notes,
  speed,
  updateCombat,
  currentCombat,
  index,
}: MonsterStatsProps) {
  const handleHPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentCombat || !updateCombat || index === undefined) return;

    const newState = create(currentCombat, draft => {
      draft[index].currentHp = +e.target.value;
    });
    updateCombat(newState);
  };

  return (
    <div className="py-2 text-red-900">
      <div>
        <span className="font-bold">Armor Class</span> {ac_value} {ac_notes}
      </div>
      <div className="flex items-center space-x-1">
        <span className="font-bold">Hit Points</span>{" "}
        {updateCombat && (
          <Input
            type="number"
            className="w-20"
            value={currentCombat && index != null ? currentCombat[index].currentHp : ""}
            onChange={handleHPChange}
          />
        )}{" "}
        {hp_value} {hp_notes}
      </div>
      <div id="speed">
        <span className="font-bold">Speed</span> {speed.join(", ")}
      </div>
    </div>
  );
}
