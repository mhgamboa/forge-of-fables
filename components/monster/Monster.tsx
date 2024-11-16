"use client";
import React from "react";
import { Tables } from "@/types/database.types";
import { create } from "mutative";

import calculateModifier from "@/utils/calculateAbilityScore";
import calculateXP from "@/utils/calculateXP";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Saves, Skills, Traits, Actions } from "@/types/monster";
import { CombatMonster } from "@/types/combat";
import { toast } from "sonner";
import { rollDice } from "@/utils/rollDice";
import reactStringReplace from "react-string-replace";

type Props = {
  monster: Tables<"monsters">;
  combat: boolean;
  updateCombat?: (combat: CombatMonster[]) => void;
  currentCombat?: CombatMonster[];
  index?: number;
};

export default function Monster({ monster, combat, updateCombat, currentCombat, index }: Props) {
  const {
    ac_notes,
    ac_value,
    actions,
    cha,
    challenge,
    con,
    condition_immunities,
    damage_immunities,
    damage_resistances,
    damage_vulnerabilities,
    description,
    dex,
    hp_notes,
    hp_value,
    int,
    languages,
    name,
    saves,
    senses,
    skills,
    source,
    speed,
    str,
    tags,
    traits,
    type,
    wis,
  } = monster;

  // Unless we can implement types supabase JSONB, this is necessary
  const typedSaves = saves as Saves;
  const typedSkills = skills as Skills;
  const typedTraits = traits as Traits;
  const typedActions = actions as Actions;

  const handleHPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentCombat) return;
    if (!updateCombat) return;
    if (index === undefined) return;
    const newState = create(currentCombat, draft => {
      draft[index].currentHp = +e.target.value;
    });
    updateCombat(newState);
  };

  return (
    <div className=" lg:columns-2 lg:gap-4 bg-gray-100 dark:bg-gray-900 p-3 rounded-sm">
      <div className="pb-2 text-2xl font-bold text-red-900">{name}</div>
      <Separator className="my-2" />
      {/* ac, hp, speed */}
      <div className="py-2 text-red-900">
        <div>
          {" "}
          <span className="font-bold">Armor Class</span> {ac_value} {ac_notes}{" "}
        </div>
        <div className="flex items-center space-x-1">
          <span className="font-bold">Hit Points</span>{" "}
          {updateCombat && (
            <>
              <Input
                type="number"
                className="w-20"
                value={currentCombat && index != null ? currentCombat[index].currentHp : ""}
                onChange={e => handleHPChange(e)}
              />
            </>
          )}{" "}
          {hp_value} {hp_notes}
        </div>
        <div id="speed">
          <span className="font-bold">Speed</span> {speed.join(", ")}
        </div>
      </div>
      <Separator className="my-2" />

      {/* Ability Scores */}
      <div className="flex w-full py-2 text-red-900">
        <Ability name="str" modifier={str} combat={combat} />
        <Ability name="dex" modifier={dex} combat={combat} />
        <Ability name="con" modifier={con} combat={combat} />
        <Ability name="int" modifier={int} combat={combat} />
        <Ability name="wis" modifier={wis} combat={combat} />
        <Ability name="cha" modifier={cha} combat={combat} />
      </div>
      <Separator className="my-2" />

      {/* Vulnerabilities/Resistances/Immunities, saves, skills, senses, languages, CR */}
      <div className="flex w-full flex-col py-2 gap-y-2 text-red-900">
        {damage_vulnerabilities.length >= 1 && (
          <List list={damage_vulnerabilities} title="Damage Vulnerabilities" />
        )}
        {damage_resistances.length >= 1 && (
          <List list={damage_resistances} title="Damage Resistances" />
        )}
        {damage_immunities.length >= 1 && (
          <List list={damage_immunities} title="Damage Immunities" />
        )}
        {condition_immunities.length >= 1 && (
          <List list={condition_immunities} title="Condition Immunities" />
        )}
        <SavesComponent saves={typedSaves} />
        {typedSkills.length >= 1 && (
          <div>
            <span className="font-bold">Skills</span>{" "}
            {typedSkills.map(s => `${s.name} +${s.modifier}`).join(", ")}
          </div>
        )}
        <List list={senses} title="Senses" />
        <List list={languages} title="Languages" />
        {challenge && (
          <div>
            <span className="font-bold">Challenge</span> {challenge} ({calculateXP(challenge)} XP)
          </div>
        )}
      </div>
      <Separator className="my-2" />

      {/* traits */}
      <div className="space-y-1 whitespace-pre-wrap py-2">
        {typedTraits &&
          typedTraits.map(t => {
            return (
              <div key={t.name}>
                <span className="font-semibold italic">{t.name}.</span> {t.description}
              </div>
            );
          })}
      </div>
      {/* actions */}
      <ActionsComponent actions={typedActions} />
    </div>
  );
}

const Ability = ({
  name,
  modifier,
  combat,
}: {
  name: string;
  modifier: number;
  combat: boolean;
}) => {
  const abilityModifier = calculateModifier(modifier);
  const toastDice = (input: string) => {
    const number = parseInt(input);
    if (isNaN(number)) return toast("Invalid number", { position: "top-center" });
    // if (number < 1 || number > 20) return toast("Invalid number", { position: "top-center" });
    const result = rollDice(20);

    // Iff number is negative, we don't need the + symbol in the description
    const description = number < 0 ? `(${result}${number})` : `(${result}+${number})`;

    toast(`You rolled a ${result + number}`, {
      position: "top-center",
      description,
    });
  };

  return (
    <div className="flex w-1/6 flex-col items-center">
      <div className="font-bold">{name}</div>
      <div>
        {combat ? (
          <button
            className="rounded border border-red-700 bg-white bg-opacity-75 px-0.5"
            onClick={() => toastDice(abilityModifier.toString())}
          >
            {abilityModifier > 0 ? `+${abilityModifier}` : abilityModifier}
          </button>
        ) : (
          <p className="w-full text-center">
            {modifier} ({abilityModifier > 0 ? `+${abilityModifier}` : abilityModifier})
          </p>
        )}
      </div>
    </div>
  );
};

const List = ({ list, title }: { list: string[]; title: string }) => {
  return (
    <div id={title}>
      {list.length >= 1 && (
        <>
          <span className="font-bold">{title}</span> {list.join(", ")}
        </>
      )}
    </div>
  );
};

const SavesComponent = ({ saves }: { saves: Saves }) => {
  return (
    <>
      {saves && saves.length > 1 && (
        <div>
          <span className="font-bold">Saves</span>{" "}
          {saves
            .map(s => {
              if (!s) return;
              return `${s.name} +${s!.modifier}`;
            })
            .join(", ")}
        </div>
      )}
    </>
  );
};

const ActionsComponent = ({ actions }: { actions: Actions }) => {
  const toastDice = (input: string) => {
    const numDiceMatch = input.match(/^\d+/);
    const diceSideesMatch = input.match(/(?<=d)\d+/);
    const modifierMatch = input.match(/(?<!d|\d)\d+$/);

    const numDice = numDiceMatch ? Number(numDiceMatch[0]) : null;
    const diceSides = diceSideesMatch ? Number(diceSideesMatch[0]) : null;
    const modifier = modifierMatch ? Number(modifierMatch[0]) : null;

    if (!diceSides) return toast("Invalid number", { position: "top-center" });
    if (!numDice) return toast("Invalid number", { position: "top-center" });

    let result: number = 0;
    for (let i = 0; i < numDice; i++) result += rollDice(diceSides);
    if (modifier) result += modifier;

    toast(`You rolled a ${result}`, { position: "top-center" });
  };
  const toastHit = (input: string) => {
    const number = parseInt(input);
    if (isNaN(number)) return toast("Invalid number", { position: "top-center" });
    // if (number < 1 || number > 20) return toast("Invalid number", { position: "top-center" });
    const result = rollDice(20);

    // Iff number is negative, we don't need the + symbol in the description
    const description = number < 0 ? `(${result}${number})` : `(${result}+${number})`;

    toast(`You rolled a ${result + number}`, {
      position: "top-center",
      description,
    });
  };

  return (
    <>
      {actions.map(a => {
        return (
          <div id="actions" className="py-2" key={a.title}>
            <h3 className="text-2xl font-light text-red-900">{a.title}</h3>
            <hr className="border-black" />
            <div className="pt-4">
              {a.content.map(d => {
                if (!d) return;
                const newDescription = reactStringReplace(
                  d.description,
                  /(\(\d{1,2}d\d{1,2}(?:\)| ?[+-] ?\d{1,2}\)))/gm, // (2d6 + 2) || (2d6-2)
                  match => (
                    <button
                      className="rounded border border-red-700 bg-white bg-opacity-75 px-0.5"
                      onClick={() => toastDice(match.replace(/\s/g, "").slice(1, -1))}
                      key={match}
                    >
                      {/* Delete Spaces. .slice to delete parentheses */}
                      {match.replace(/\s/g, "").slice(1, -1)}
                    </button>
                  )
                );

                const parseHits = reactStringReplace(
                  newDescription,
                  /((?<=\s|\.)\+\d+(?=\s|\.))/gm,
                  (match, index) => (
                    <button
                      className="rounded border border-red-700 bg-white bg-opacity-75 px-0.5"
                      key={match}
                      onClick={() => toastHit(match)}
                    >
                      {match}
                    </button>
                  )
                );

                return (
                  <React.Fragment key={d.name}>
                    <div>
                      {d.name !== "" && <span className="font-semibold italic">{d.name}. </span>}
                      {/* {d.description} */}
                      {/* {newDescription} */}
                      {parseHits}
                    </div>
                    <br />
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};
