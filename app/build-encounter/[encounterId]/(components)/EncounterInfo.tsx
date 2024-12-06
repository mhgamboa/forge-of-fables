import React from "react";
import { create } from "mutative";

import { EncounterMonstersType, useEncounterContext } from "@/context/build-encouter-context";

import { Undo, X } from "lucide-react";
import { useHandleSaveEncounter } from "@/hooks/useHandleSaveEncounter";

export default function EncounterInfo() {
  const { encounter, setEncounter } = useEncounterContext();

  useHandleSaveEncounter();
  const removeMonster = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    monster: EncounterMonstersType
  ) => {
    e.stopPropagation();
    const nextState = create(encounter, draft => {
      // Add the monster to the encounter_monstersToBeRemoved array
      draft.encounter_monstersToBeRemoved.push(monster);
      // Remove the monster from the encounter_monsters array
      draft.encounter_monsters = draft.encounter_monsters.filter(m => m.id !== monster.id);
      draft.encounterSaved = false;
      return draft;
    });
    setEncounter(nextState);
  };

  const restoreMonster = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    monster: EncounterMonstersType
  ) => {
    e.stopPropagation();
    const nextState = create(encounter, draft => {
      // Add the monster to the encounter_monsters array
      draft.encounter_monsters.push(monster);
      // Remove the monster from the encounter_monstersToBeRemoved array
      draft.encounter_monstersToBeRemoved = draft.encounter_monstersToBeRemoved.filter(
        m => m.id !== monster.id
      );
      draft.encounterSaved = false;
      return draft;
    });
    setEncounter(nextState);
  };

  const unAddMonster = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    monster: { id: number; name: string; tempId: number }
  ) => {
    e.stopPropagation();
    const nextState = create(encounter, draft => {
      // Remove the monster from the encounter_monstersToBeAdded array
      draft.encounter_monstersToBeAdded = draft.encounter_monstersToBeAdded.filter(
        m => m.tempId !== monster.tempId
      );
      draft.encounterSaved = false;
      return draft;
    });
    setEncounter(nextState);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col gap-y-2 w-full">
        <h2 className="text-center text-md lg:text-2xl font-bold text-gray-800 pb-2">
          Monsters
        </h2>
        {encounter.encounter_monsters.map(m => {
          return (
            <div key={m.id} className="flex justify-between w-full border p-2 rounded-md">
              <p>{m.monsters!.name}</p>
              <div className="flex">
                <button onClick={e => removeMonster(e, m)}>
                  <X />
                </button>
              </div>
            </div>
          );
        })}

        {encounter.encounter_monstersToBeRemoved.map(m => {
          return (
            <div key={m.id} className="flex justify-between w-full border p-2 rounded-md">
              <p className="text-gray-400 line-through">{m.monsters!.name}</p>
              <div className="flex">
                <button onClick={e => restoreMonster(e, m)}>
                  <Undo />
                </button>
              </div>
            </div>
          );
        })}
        {encounter.encounter_monstersToBeAdded.length > 0 && (
          <>
            <h2 className="text-center text-sm lg:text-lg font-bold text-gray-800 pb-1 mt-4">
              Monsters to be Added
            </h2>
            {encounter.encounter_monstersToBeAdded.map(m => {
              return (
                <div
                  key={m.tempId}
                  className="flex justify-between w-full border p-2 rounded-md"
                >
                  <p>{m.name}</p>
                  <div className="flex">
                    <button onClick={e => unAddMonster(e, m)}>
                      <X />
                    </button>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
