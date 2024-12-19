"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { useEncounterContext } from "@/context/build-encouter-context";
import { EncounterPlayersType } from "@/types/buildEncounter";
import { X } from "lucide-react";
import { create } from "mutative";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";

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
        notes: player.notes,
      });
      return draft;
    });
    setEncounter(nextState);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>, p: EncounterPlayersType) => {
    const nextState = create(encounter, draft => {
      const updatedIndex = draft.encounter_playersToBeUpdated.findIndex(
        player => player.id === p.id
      );
      const name = e.target.value;

      if (updatedIndex === -1)
        draft.encounter_playersToBeUpdated.push({
          id: p.id,
          name,
          notes: p.notes,
          encounter_id: draft.id,
          created_at: "", // Placeholder to keep TS happy. When writing to DB, will be set
          user_id: "", // Placeholder to keep TS happy. When writing to DB, will be set
        });
      else draft.encounter_playersToBeUpdated[updatedIndex].name = name;

      if (name === draft.encounter_players[updatedIndex]?.name)
        draft.encounter_playersToBeUpdated.splice(updatedIndex, 1);
    });
    setEncounter(nextState);
  };

  const handleNotesChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    p: EncounterPlayersType
  ) => {
    const nextState = create(encounter, draft => {
      const updatedIndex = draft.encounter_playersToBeUpdated.findIndex(
        player => player.id === p.id
      );
      const notes = e.target.value;

      if (updatedIndex === -1)
        draft.encounter_playersToBeUpdated.push({
          id: p.id,
          name: p.name,
          notes,
          encounter_id: draft.id,
          created_at: "", // Placeholder to keep TS happy. When writing to DB, will be set
          user_id: "", // Placeholder to keep TS happy. When writing to DB, will be set
        });
      // If notes are the same, remove it from the encounter_monstersToBeUpdated array
      else if (notes === p.notes) draft.encounter_playersToBeUpdated.splice(updatedIndex, 1);
      // If notes are different, update the notes in the encounter_monstersToBeUpdated array
      else draft.encounter_playersToBeUpdated[updatedIndex].notes = notes;
    });
    setEncounter(nextState);
  };

  return (
    <>
      {encounter_players.map(p => {
        return (
          <AccordionItem value={`${p.id}`} key={p.id}>
            <AccordionTrigger
              Icon={X}
              iconClassName="text-red-800"
              onIconClick={() => {
                removePlayer(p);
              }}
              // className={className}
            >
              <Input
                type="text"
                placeholder="Player Name"
                value={
                  encounter_playersToBeUpdated.find(e_p => e_p.id === p.id)?.name ?? p.name ?? ""
                }
                onChange={e => handleNameChange(e, p)}
              />
            </AccordionTrigger>
            <AccordionContent className="px-1 pt-1">
              <Textarea
                placeholder="Add Any Notes here"
                value={
                  encounter_playersToBeUpdated.findIndex(e_p => e_p.id === p.id) > -1
                    ? (encounter_playersToBeUpdated[
                        encounter_playersToBeUpdated.findIndex(player => player.id === p.id)
                      ].notes ?? "")
                    : (p.notes ?? "")
                }
                onChange={e => handleNotesChange(e, p)}
              />
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </>
  );
}
