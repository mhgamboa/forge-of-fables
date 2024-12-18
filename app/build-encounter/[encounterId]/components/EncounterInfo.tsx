import React from "react";
import { cn } from "@/lib/utils";

import PlayersList from "./PlayersList";
import MonstersList from "./currentEncounter/monsters/MonstersList";

interface EncounterInfoProps {
  className?: string;
}

export default function EncounterInfo({ className }: EncounterInfoProps) {
  return (
    <div className={cn("flex flex-col items-center p-2", className)}>
      <div className="flex flex-col gap-y-2 w-full">
        <MonstersList />
        <PlayersList />
      </div>
    </div>
  );
}
