import React from "react";
import { Tables } from "@/types/database.types";

import calculateModifier from "@/utils/calculateAbilityScore";
import calculateXP from "@/utils/calculateXP";

import { Separator } from "@/components/ui/separator";
import { Saves, Skills, Traits, Actions } from "@/types/monster";

type Props = {
  monster: Tables<"monsters">;
  combat: boolean;
};

export default function Monster({ monster, combat }: Props) {
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

  return (
    <div className=" lg:columns-2 lg:gap-4 bg-gray-100 p-3 rounded-sm">
      <div className="pb-2 text-2xl font-bold text-red-900">{name}</div>
      <Separator className="my-2" />
      {/* ac, hp, speed */}
      <div className="py-2 text-red-900">
        <div>
          <span className="font-bold">Armor Class</span> {ac_value} {ac_notes}
        </div>
        <div>
          <span className="font-bold">Hit Points</span> {hp_value} {hp_notes}
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
      {/* <TriangleDivider /> */}
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

  return (
    <div className="flex w-1/6 flex-col items-center">
      <div className="font-bold">{name}</div>
      <div>
        {combat ? (
          <button className="rounded border border-red-700 bg-white bg-opacity-75 px-0.5">
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

                return (
                  <React.Fragment key={d.name}>
                    <div>
                      {d.name !== "" && <span className="font-semibold italic">{d.name}. </span>}
                      {d.description}
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
