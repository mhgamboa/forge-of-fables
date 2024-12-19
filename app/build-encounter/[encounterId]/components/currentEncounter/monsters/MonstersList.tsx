"use client";
import { Accordion } from "@/components/ui/accordion";
import { Undo, X } from "lucide-react";
import { create } from "mutative";
import { useEncounterContext } from "@/context/build-encouter-context";
import { encounterMonstersToBeAddedType, EncounterMonstersType } from "@/types/buildEncounter";
import MonsterAccordionItem from "./AccordionItem";

export default function MonstersList() {
  const { encounter, setEncounter } = useEncounterContext();
  const { encounter_monstersToBeUpdated } = encounter;

  const removeMonster = (
    e: React.MouseEvent<HTMLButtonElement | Element, MouseEvent>,
    monster: EncounterMonstersType
  ) => {
    e.stopPropagation();
    const nextState = create(encounter, draft => {
      draft.encounter_monstersToBeRemoved.push(monster);
      draft.encounter_monsters = draft.encounter_monsters.filter(m => m.id !== monster.id);
      const index = draft.encounter_monstersToBeUpdated.findIndex(m => m.id === monster.id);
      if (index !== -1) draft.encounter_monstersToBeUpdated.splice(index, 1);
    });
    setEncounter(nextState);
  };

  const restoreMonster = (
    e: React.MouseEvent<HTMLButtonElement | Element, MouseEvent>,
    monster: EncounterMonstersType
  ) => {
    e.stopPropagation();
    const nextState = create(encounter, draft => {
      draft.encounter_monsters.push(monster);
      draft.encounter_monstersToBeRemoved = draft.encounter_monstersToBeRemoved.filter(
        m => m.id !== monster.id
      );
      draft.encounterSaved = false;
    });
    setEncounter(nextState);
  };

  const unAddMonster = (
    e: React.MouseEvent<HTMLButtonElement | Element, MouseEvent>,
    monster: encounterMonstersToBeAddedType
  ) => {
    e.stopPropagation();
    const nextState = create(encounter, draft => {
      draft.encounter_monstersToBeAdded = draft.encounter_monstersToBeAdded.filter(
        m => m.tempId !== monster.tempId
      );
      draft.encounterSaved = false;
    });
    setEncounter(nextState);
  };

  const handleUpdate = (e: React.ChangeEvent<HTMLTextAreaElement>, m: EncounterMonstersType) => {
    const nextState = create(encounter, draft => {
      const index = draft.encounter_monstersToBeUpdated.findIndex(monster => monster.id === m.id);
      const notes = e.target.value === "" ? null : e.target.value;

      // If monster is not in the encounter_monstersToBeUpdated array, add it
      if (index === -1)
        draft.encounter_monstersToBeUpdated.push({
          encounter_id: draft.id,
          id: m.id,
          monster_id: m.monsters!.id,
          notes,
          created_at: "", // Placeholder to keep TS happy. When writing to DB, will be set
          user_id: "", // Placeholder to keep TS happy. When writing to DB, will be set
        });
      // If notes are the same, remove it from the encounter_monstersToBeUpdated array
      else if (notes === m.notes) draft.encounter_monstersToBeUpdated.splice(index, 1);
      // If notes are different, update the notes in the encounter_monstersToBeUpdated array
      else draft.encounter_monstersToBeUpdated[index].notes = notes;
    });

    setEncounter(nextState);
  };

  const handleUpdateToBeAdded = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    m: encounterMonstersToBeAddedType
  ) => {
    const nextState = create(encounter, draft => {
      const index = draft.encounter_monstersToBeAdded.findIndex(monster => monster.id === m.id);
      const notes = e.target.value === "" ? null : e.target.value;
      draft.encounter_monstersToBeAdded[index].notes = notes;
    });
    setEncounter(nextState);
  };

  return (
    <>
      <h2 className="text-center text-md lg:text-2xl font-bold text-gray-800 pb-2 dark:text-gray-200">
        Monsters
      </h2>
      <Accordion type="multiple" className="w-full">
        {encounter.encounter_monsters.map(monster => (
          <MonsterAccordionItem
            key={monster.id}
            monster={monster}
            icon={X}
            iconClassName="text-red-800"
            onIconClick={e => removeMonster(e, monster)}
            onNotesChange={e => handleUpdate(e, monster)}
            notes={
              encounter_monstersToBeUpdated.findIndex(m => m.id === monster.id) > -1
                ? (encounter_monstersToBeUpdated[
                    encounter_monstersToBeUpdated.findIndex(m => m.id === monster.id)
                  ].notes ?? "")
                : (monster.notes ?? "")
            }
          />
        ))}

        {encounter.encounter_monstersToBeRemoved.map(monster => (
          <MonsterAccordionItem
            key={monster.id}
            monster={monster}
            icon={Undo}
            iconClassName="text-green-800"
            onIconClick={e => restoreMonster(e, monster)}
            className="text-gray-400 line-through"
            isRemoved
          />
        ))}

        {encounter.encounter_monstersToBeAdded.map(monster => (
          <MonsterAccordionItem
            key={monster.tempId}
            id={monster.tempId}
            monster={monster}
            icon={X}
            iconClassName="text-red-800"
            onIconClick={e => unAddMonster(e, monster)}
            onNotesChange={e => handleUpdateToBeAdded(e, monster)}
            notes={monster.notes}
          />
        ))}
      </Accordion>
    </>
  );
}
