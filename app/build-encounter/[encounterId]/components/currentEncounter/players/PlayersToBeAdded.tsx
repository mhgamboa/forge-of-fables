import React from "react";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { create } from "mutative";
import { useEncounterContext } from "@/context/build-encouter-context";
import { EncounterPlayersToBeAddedType } from "@/types/buildEncounter";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";

export default function PlayersToBeAdded() {
  const { encounter, setEncounter } = useEncounterContext();
  const { encounter_playersToBeAdded, encounter_playersToBeUpdated } = encounter;

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

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>, tempId: number) => {
    const nextState = create(encounter, draft => {
      const index = draft.encounter_playersToBeAdded.findIndex(p => p.tempId === tempId);
      draft.encounter_playersToBeAdded[index].name = e.target.value;
    });
    setEncounter(nextState);
  };

  const handleNotesChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    p: EncounterPlayersToBeAddedType
  ) => {
    const nextState = create(encounter, draft => {
      const index = draft.encounter_playersToBeAdded.findIndex(p => p.tempId === p.tempId);
      draft.encounter_playersToBeAdded[index].notes = e.target.value;
    });
    setEncounter(nextState);
  };

  return (
    <>
      {encounter_playersToBeAdded.map(p => {
        return (
          <AccordionItem value={`${p.tempId}`} key={p.tempId}>
            <AccordionTrigger
              Icon={X}
              iconClassName="text-red-800"
              onIconClick={() => {
                unAddPlayer(p.tempId);
              }}
              // className={className}
            >
              <Input
                type="text"
                placeholder="Player Name"
                value={p.name ?? ""}
                onChange={e => handleNameChange(e, p.tempId)}
              />
            </AccordionTrigger>
            <AccordionContent className="px-1 pt-1">
              <Textarea
                placeholder="Add Any Notes here"
                value={p.notes ?? ""}
                onChange={e => handleNotesChange(e, p)}
              />
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </>
  );
}
