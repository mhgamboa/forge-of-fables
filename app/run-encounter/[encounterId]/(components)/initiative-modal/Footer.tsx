"use client";
import React, { Dispatch, SetStateAction, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import {
  EncounterMonsterType,
  EncounterPlayerType,
  useEncounterStore,
} from "@/providers/CombatProvider";
import { rollDice } from "@/utils/rollDice";
import RollInitiativeButton from "./RollInitiativeButton";

type Props = {
  newCombatants: (EncounterMonsterType | EncounterPlayerType)[];
  setNewCombatants: Dispatch<SetStateAction<(EncounterMonsterType | EncounterPlayerType)[]>>;
};

export default function Footer({ newCombatants, setNewCombatants }: Props) {
  const setView = useEncounterStore(state => state.setView);
  const setCombatants = useEncounterStore(state => state.setCombatants);

  const [syncMonsters, setSyncMonsters] = useState(true);

  const rollMonsters = () => {
    const syncRoll = syncMonsters ? rollDice(20) : null;

    const nextState = newCombatants.map(c => {
      const initiative = c.isMonster ? (syncRoll ?? rollDice(20)) : c.initiative;
      return { ...c, initiative };
    });
    setNewCombatants(nextState);
  };

  return (
    <DialogFooter>
      <div className="flex gap-4 w-full justify-between">
        <RollInitiativeButton
          rollMonsters={rollMonsters}
          syncMonsters={syncMonsters}
          setSyncMonsters={setSyncMonsters}
        />
        <Button
          type="submit"
          onClick={e => {
            e.preventDefault();
            setCombatants([...newCombatants].sort((a, b) => b.initiative - a.initiative));
            setView("none");
          }}
        >
          Save changes
        </Button>
      </div>
    </DialogFooter>
  );
}
