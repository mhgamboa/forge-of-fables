import { getEncounterWithRelations } from "@/data-access/encounters";

export type EncounterMonstersType = {
  id: number;
  notes: string | null;
  monsters: { name: string; id: number } | null;
}; // Return type of getEncounterWithRelations.encounterMonsters

export type encounterMonstersToBeAddedType = {
  id: number;
  name: string;
  tempId: number;
  notes: string | null;
};
export type EncounterPlayersType = {
  id: number;
  name: string | null;
  notes: string | null;
};

export type EncounterPlayersToBeAddedType = {
  name: string;
  tempId: number;
  notes: string | null;
};

export type InitialEncounter = Awaited<ReturnType<typeof getEncounterWithRelations>>;
