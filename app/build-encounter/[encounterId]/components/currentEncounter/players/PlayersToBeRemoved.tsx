import React from "react";
import { Input } from "@/components/ui/input";
import { useEncounterContext } from "@/context/build-encouter-context";
import { EncounterPlayersType } from "@/types/buildEncounter";
import { Undo } from "lucide-react";
import { create } from "mutative";

export default function PlayersToBeRemoved() {
  const { encounter, setEncounter } = useEncounterContext();
  const { encounter_playersToBeRemoved } = encounter;

  const restorePlayer = (player: EncounterPlayersType) => {
    const nextState = create(encounter, draft => {
      // Add the player to the encounter_players array
      draft.encounter_players.push(player);
      // Remove the player from the encounter_playersToBeRemoved array
      draft.encounter_playersToBeRemoved = draft.encounter_playersToBeRemoved.filter(
        p => p.id !== player.id
      );
    });
    setEncounter(nextState);
  };
  return (
    <>
      {encounter_playersToBeRemoved.map(p => {
        return (
          <div key={p.id} className="flex w-full justify-between items-center gap-x-2">
            <Input
              type="text"
              placeholder="Player Name"
              defaultValue={p.name ?? ""}
              disabled
              className="text-gray-400 line-through bg-gray-100"
            />
            <button>
              <Undo onClick={() => restorePlayer(p)} />
            </button>
          </div>
        );
      })}
    </>
  );
}
