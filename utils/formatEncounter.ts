import { Tables } from "@/types/database.types";
import { CombatMonster } from "@/types/combat";

export const formatEncounter = (encounter: Tables<"monsters">[]): CombatMonster[] => {
  return encounter.map(monster => ({
    ...monster,
    currentHp: monster.hp_value,
  }));
};
