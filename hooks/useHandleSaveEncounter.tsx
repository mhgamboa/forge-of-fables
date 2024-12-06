"use client";
import { useEffect } from "react";
import { useEncounterContext } from "@/context/build-encouter-context";
import { create } from "mutative";

export const useHandleSaveEncounter = () => {
  const { encounter, setEncounter } = useEncounterContext();

  useEffect(() => {
    if (
      encounter.encounter_monstersToBeAdded.length ||
      encounter.encounter_monstersToBeRemoved.length ||
      encounter.encounter_monstersToBeUpdated.length ||
      encounter.encounter_playersToBeAdded.length ||
      encounter.encounter_playersToBeRemoved.length ||
      encounter.encounter_playersToBeUpdated.length
    ) {
      const nextState = create(encounter, draft => {
        draft.encounterSaved = false;
      });
      setEncounter(nextState);
    } else {
      const nextState = create(encounter, draft => {
        draft.encounterSaved = true;
      });
      setEncounter(nextState);
    }
  }, [encounter]);
};
