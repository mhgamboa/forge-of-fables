import React from "react";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { create } from "mutative";
import { useEncounterContext } from "@/context/build-encouter-context";

export default function PlayersToBeAdded() {
  const { encounter, setEncounter } = useEncounterContext();
  const { encounter_playersToBeAdded } = encounter;

  const unAddPlayer = (playerId: number) => {
    const nextState = create(encounter, draft => {
      // Remove the player from the encounter_playersToBeAdded array
      draft.encounter_playersToBeAdded = draft.encounter_playersToBeAdded.filter(
        p => p.tempId !== playerId
      );
      return draft;
    });
    setEncounter(nextState);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, tempId: number) => {
    const nextState = create(encounter, draft => {
      // Update the player in the encounter_playersToBeAdded array
      draft.encounter_playersToBeAdded = draft.encounter_playersToBeAdded.map(p => {
        if (p.tempId === tempId) {
          return { ...p, name: e.target.value };
        }
        return p;
      });
      return draft;
    });
    setEncounter(nextState);
  };
  return (
    <>
      {encounter_playersToBeAdded.map(p => {
        return (
          <div key={p.tempId} className="flex w-full justify-between items-center gap-x-2">
            <Input
              type="text"
              placeholder="Player Name"
              value={p.name ?? ""}
              onChange={e => handleChange(e, p.tempId)}
            />
            <button>
              <X onClick={() => unAddPlayer(p.tempId)} />
            </button>
          </div>
        );
      })}
    </>
  );
}
