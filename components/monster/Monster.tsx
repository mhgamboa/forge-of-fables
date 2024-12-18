"use client";

import React from "react";
import { toast } from "sonner";
import { create } from "mutative";

// Utility Imports
import calculateXP from "@/utils/calculateXP";
import { rollDice } from "@/utils/rollDice";
import { cn } from "@/lib/utils";

// Component Imports
import { Separator } from "@/components/ui/separator";

// Type Imports
import { Tables } from "@/types/database.types";
import { Saves, Skills, Traits, Actions } from "@/types/monster";
import { EncounterPlayerType, EncounterMonsterType } from "@/providers/CombatProvider";
import ActionsDisplay from "./ActionsDisplay";
import AbilityScore from "./AbilityScore";
import TraitsDisplay from "./TraitsDisplay";
import ListDisplay from "./ListDisplay";
import SavesDisplay from "./SavesDisplay";
import MonsterStats from "./MonsterStats";

// Props Type
interface MonsterProps {
  monster: Tables<"monsters">;
  combat: boolean;
  updateCombat?: (c: (EncounterMonsterType | EncounterPlayerType)[]) => void;
  currentCombat?: (EncounterPlayerType | EncounterMonsterType)[];
  index?: number;
  className?: string;
}

// Utility Functions
export const toastDiceRoll = (input: string, type: "damage" | "modifier" = "damage") => {
  const numDiceMatch = input.match(/^\d+/);
  const diceSidesMatch = input.match(/(?<=d)\d+/);
  const modifierMatch = input.match(/(?<!d|\d)\d+$/);

  const numDice = numDiceMatch ? Number(numDiceMatch[0]) : null;
  const diceSides = diceSidesMatch ? Number(diceSidesMatch[0]) : null;
  const modifier = modifierMatch ? Number(modifierMatch[0]) : null;

  if (type === "damage") {
    if (!diceSides) return toast("Invalid dice", { position: "top-center" });
    if (!numDice) return toast("Invalid dice count", { position: "top-center" });

    let result: number = 0;
    for (let i = 0; i < numDice; i++) result += rollDice(diceSides);
    if (modifier) result += modifier;

    toast(`You rolled ${result}`, { position: "top-center" });
  } else {
    const number = parseInt(input);
    if (isNaN(number)) return toast("Invalid modifier", { position: "top-center" });

    const result = rollDice(20);
    const description = number < 0 ? `(${result}${number})` : `(${result}+${number})`;

    toast(`You rolled ${result + number}`, {
      position: "top-center",
      description,
    });
  }
};

// Main Monster Component
export default function Monster({
  monster,
  combat,
  updateCombat,
  currentCombat,
  index,
  className,
}: MonsterProps) {
  // prettier-ignore
  const {
      name,
      ac_notes, ac_value, hp_notes, hp_value,
      speed,
      str, dex, con, int, wis, cha,
      damage_vulnerabilities, damage_immunities, damage_resistances, condition_immunities,
      saves, skills, senses, languages, challenge,
      traits,
      actions,
      description,
      source,
      tags,
      type,
    } = monster;

  // Type casting for Supabase JSONB.
  // Unless we can implement types for JSONB, we'll have to do this.
  const typedSaves = saves as Saves;
  const typedSkills = skills as Skills;
  const typedTraits = traits as Traits;
  const typedActions = actions as Actions;

  // HP Change Handler
  // const handleHPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (!currentCombat || !updateCombat || index === undefined) return;

  //   const newState = create(currentCombat, draft => {
  //     draft[index].currentHp = +e.target.value;
  //   });
  //   updateCombat(newState);
  // };

  return (
    <div
      className={cn("lg:columns-2 lg:gap-4 bg-gray-100 dark:bg-gray-900 p-3 rounded-sm", className)}
    >
      {/* Name */}
      <div className="pb-2 text-2xl font-bold text-red-900">{name}</div>
      <Separator className="my-2" />

      {/* AC, HP, Speed */}
      {/* prettier-ignore */}
      <MonsterStats
        ac_value={ac_value} ac_notes={ac_notes}
        hp_value={hp_value} hp_notes={hp_notes}
        currentCombat={currentCombat} updateCombat={updateCombat}
        speed={speed}
        index={index}
      />
      <Separator className="my-2" />

      {/* Ability Scores */}
      <div className="flex w-full py-2 text-red-900">
        <AbilityScore name="str" modifier={str} combat={combat} />
        <AbilityScore name="dex" modifier={dex} combat={combat} />
        <AbilityScore name="con" modifier={con} combat={combat} />
        <AbilityScore name="int" modifier={int} combat={combat} />
        <AbilityScore name="wis" modifier={wis} combat={combat} />
        <AbilityScore name="cha" modifier={cha} combat={combat} />
      </div>
      <Separator className="my-2" />

      {/* Vulnerabilities, Resistances, Immunities, Saves, Skills, etc. */}
      <div className="flex w-full flex-col py-2 gap-y-2 text-red-900">
        <ListDisplay list={damage_vulnerabilities} title="Damage Vulnerabilities" />
        <ListDisplay list={damage_resistances} title="Damage Resistances" />
        <ListDisplay list={damage_immunities} title="Damage Immunities" />
        <ListDisplay list={condition_immunities} title="Condition Immunities" />

        <SavesDisplay saves={typedSaves} />

        {typedSkills.length >= 1 && (
          <div>
            <span className="font-bold">Skills</span>{" "}
            {typedSkills.map(s => `${s.name} +${s.modifier}`).join(", ")}
          </div>
        )}

        <ListDisplay list={senses} title="Senses" />
        <ListDisplay list={languages} title="Languages" />

        {challenge && (
          <div>
            <span className="font-bold">Challenge</span> {challenge} ({calculateXP(challenge)} XP)
          </div>
        )}
      </div>
      <Separator className="my-2" />

      <TraitsDisplay traits={typedTraits} />
      <ActionsDisplay actions={typedActions} />
    </div>
  );
}
