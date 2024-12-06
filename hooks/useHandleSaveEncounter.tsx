"use client";
import { useEffect } from "react";
import { useEncounterContext } from "@/context/build-encouter-context";

export const useHandleSaveEncounter = () => {
  const { encounter, setEncounter } = useEncounterContext();

  useEffect(() => {
    console.log("useHandleSaveEncounter", encounter);
    if (encounter.encounter_monstersToBeAdded.length)
      console.log(
        "encounter.encounter_monstersToBeAdded",
        encounter.encounter_monstersToBeAdded
      );
  }, [encounter]);
};
