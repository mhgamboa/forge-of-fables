import { Input } from "@/components/ui/input";
import { useEncounterContext } from "@/context/build-encouter-context";
import { EncounterPlayersType } from "@/types/buildEncounter";
import { X } from "lucide-react";
import { create } from "mutative";
import React from "react";

export default function CurrentPlayers() {
  const { encounter, setEncounter } = useEncounterContext();
  const { encounter_players, encounter_playersToBeUpdated } = encounter;

  const removePlayer = (player: EncounterPlayersType) => {
    const nextState = create(encounter, draft => {
      // Remove the player from the encounter_players array
      draft.encounter_players = draft.encounter_players.filter(p => p.id !== player.id);
      // If the player is in the encounter_playersToBeUpdated array, remove them from that array
      const index = draft.encounter_playersToBeUpdated.findIndex(p => p.id === player.id);
      if (index !== -1) draft.encounter_playersToBeUpdated.splice(index, 1);
      // Add the player to the encounter_playersToBeRemoved array
      draft.encounter_playersToBeRemoved.push({
        id: player.id,
        name: player.name,
        notes: null,
      });
      return draft;
    });
    setEncounter(nextState);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: number, i: number) => {
    const nextState = create(encounter, draft => {
      const updatedIndex = draft.encounter_playersToBeUpdated.findIndex(p => p.id === id);
      const name = e.target.value;

      if (updatedIndex === -1) draft.encounter_playersToBeUpdated.push({ id, name, notes: null });
      else draft.encounter_playersToBeUpdated[updatedIndex].name = name;

      if (name === draft.encounter_players[i].name)
        draft.encounter_playersToBeUpdated.splice(updatedIndex, 1);

      return draft;
    });

    setEncounter(nextState);
  };

  return (
    <>
      {encounter_players.map((p, i) => {
        return (
          <div key={p.id} className="flex w-full justify-between items-center gap-x-2">
            <Input
              type="text"
              placeholder="Player Name"
              value={
                encounter_playersToBeUpdated.find(e_p => e_p.id === p.id)?.name ?? p.name ?? ""
              }
              onChange={e => handleChange(e, p.id, i)}
            />
            <button>
              <X onClick={e => removePlayer(p)} />
            </button>
          </div>
        );
      })}
    </>
  );
}
