"use client";
import React, { useState, KeyboardEvent, MouseEvent } from "react";
import { Input } from "@/components/ui/input";
import { useEncounterStore } from "@/providers/CombatProvider";
import { ShieldPlus, ShieldX } from "lucide-react";
import { create } from "mutative";

export default function HPInput({ i }: { i: number }) {
  const combatants = useEncounterStore(state => state.combatants);
  const setCombatants = useEncounterStore(state => state.setCombatants);

  const [value, setValue] = useState<number>(0);

  // Handles HP changes (damage or healing)
  const updateHP = (index: number, damage: boolean) => {
    const newState = create(combatants, draft => {
      const changeAmount = damage ? -value : value;
      draft[index].currentHp += changeAmount;
    });
    setCombatants(newState);
    setValue(0);
  };

  // Handles button clicks (damage or healing)
  const handleButtonClick = (e: MouseEvent<SVGSVGElement>, damage: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    updateHP(i, damage);
  };

  // Handles pressing "Enter" or "Shift+Enter"
  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const isShiftPressed = e.shiftKey;
      updateHP(i, !isShiftPressed); // Shift+Enter -> Heal, Enter -> Damage
      (e.target as HTMLInputElement).blur();
    }
  };

  // Clears input field focus on click
  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
    (e.target as HTMLInputElement).select();
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <ShieldX className="text-red-700 cursor-pointer" onClick={e => handleButtonClick(e, true)} />
      {/* TODO: Add tooltip for Input that explains Enter and Shift+Enter. Should show when focused? */}
      <Input
        type="number"
        value={value}
        onChange={e => setValue(Number(e.target.value))}
        onClick={handleInputClick}
        onKeyUp={handleKeyUp}
        className="w-20 text-center"
      />
      <ShieldPlus
        className="text-green-700 cursor-pointer"
        onClick={e => handleButtonClick(e, false)}
      />
    </div>
  );
}
