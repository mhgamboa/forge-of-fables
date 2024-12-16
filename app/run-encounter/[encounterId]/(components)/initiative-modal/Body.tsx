import React, { Dispatch, SetStateAction } from "react";
import { create } from "mutative";
import { EncounterMonsterType, EncounterPlayerType } from "@/providers/CombatProvider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type Props = {
  newCombatants: (EncounterMonsterType | EncounterPlayerType)[];
  setNewCombatants: Dispatch<SetStateAction<(EncounterMonsterType | EncounterPlayerType)[]>>;
};

export default function Body({ newCombatants, setNewCombatants }: Props) {
  return (
    <div className="flex flex-col divide-y divide-slate-200 bg-slate-100 dark:bg-slate-700 p-4 overflow-y-scroll max-h-96">
      {newCombatants.map((c, i) => {
        return (
          <div key={c.id} className="flex justify-between items-center gap-4">
            <div>
              <Label htmlFor={`initiative-${c.id}`} className="text-right">
                {c.isMonster ? c.info.name : c.name}
              </Label>
            </div>
            <Input
              id={`initiative-${c.id}`}
              type="number"
              value={c.initiative}
              onChange={e => {
                e.preventDefault();
                const newState = create(newCombatants, draft => {
                  draft[i].initiative = +e.target.value;
                });
                setNewCombatants(newState);
              }}
              className="col-span-3 w-16 rounded-none border-none bg-slate-200 dark:bg-slate-800"
            />
          </div>
        );
      })}
    </div>
  );
}
