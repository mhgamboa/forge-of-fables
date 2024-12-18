"use client";
import React from "react";
import { create } from "mutative";

import { useEncounterContext } from "@/context/build-encouter-context";

import { Plus } from "lucide-react";

import CurrentPlayers from "./currentEncounter/players/CurrentPlayers";
import PlayersToBeAdded from "./currentEncounter/players/PlayersToBeAdded";
import PlayersToBeRemoved from "./currentEncounter/players/PlayersToBeRemoved";

export default function PlayersList() {
  const { encounter, setEncounter } = useEncounterContext();
  const { encounter_players, encounter_playersToBeAdded } = encounter;

  const addPlayer = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const nextState = create(encounter, draft => {
      // Add the player to the encounter_playersToBeAdded array
      draft.encounter_playersToBeAdded.push({
        name: `Player ${encounter_players.length + encounter_playersToBeAdded.length + 1}`,
        tempId: Math.floor(Math.random() * 1000000),
        notes: null,
      });
      return draft;
    });
    setEncounter(nextState);
  };

  return (
    <>
      <h2 className="text-center text-md lg:text-2xl font-bold text-gray-800 pt-3 dark:text-gray-200">
        Players
      </h2>
      <div className="flex flex-col justify-between w-full p-2 gap-y-3">
        <CurrentPlayers />
        <PlayersToBeAdded />
        <PlayersToBeRemoved />
        <div
          onClick={e => addPlayer(e)}
          className="flex justify-center w-full border p-2 rounded-md cursor-pointer"
        >
          <Plus className="text-gray-600" />
        </div>
      </div>
    </>
  );
}
