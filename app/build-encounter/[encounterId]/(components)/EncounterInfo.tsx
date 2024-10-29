import React from "react";
import { create } from "mutative";

import { useEncounterContext } from "@/context/build-encouter-context";
import { useEncounterSavedContext } from "@/context/encounter-saved-context";

import { Minus, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function EncounterInfo() {
  const { encounterJson, setEncounterJson } = useEncounterContext();
  const { encounterSaved, setEncounterSaved } = useEncounterSavedContext();

  const addMonster = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
    e.stopPropagation();
    const index = encounterJson.findIndex(m => m.id === id);
    setEncounterJson([
      ...encounterJson.slice(0, index),
      { ...encounterJson[index], quantity: encounterJson[index].quantity + 1 },
      ...encounterJson.slice(index + 1),
    ]);
    setEncounterSaved(false);
  };

  const removeMonster = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
    e.stopPropagation();
    const index = encounterJson.findIndex(m => m.id === id);
    const nextState = create(encounterJson, draft => {
      // Remove 1 from quantity
      draft[index].quantity--;
      // If quantity is 0, remove the monster from the array
      if (draft[index].quantity === 0) draft.splice(index, 1);
      return draft;
    });
    setEncounterJson(nextState);
    setEncounterSaved(false);
  };
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col gap-y-2 w-full">
        <h2 className="text-center text-md lg:text-2xl font-bold text-gray-800 pb-2">Monsters</h2>
        {encounterJson.map(m => {
          return (
            <div key={m.id} className="flex gap-2 justify-between w-full border p-2 rounded-md">
              <p>{m.name}</p>
              <div className="flex justify-between gap-x-1 w-20">
                <button onClick={e => removeMonster(e, m.id)}>
                  <Minus />
                </button>
                <div>{m.quantity}</div>
                <button type="submit" onClick={e => addMonster(e, m.id)}>
                  <Plus className="rounded-md" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
