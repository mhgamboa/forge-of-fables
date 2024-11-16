import { Tables } from "@/types/database.types";
import { CombatMonster } from "@/types/combat";
import { EncounterJson } from "@/types/encounterJsonTypes";

export const formatEncounter = (encounter: Tables<"monsters">[], encounterJson: EncounterJson) => {
  // const result = encounter.flatMap(item => {
  //   const quantity = encounterJson[item.id];
  //   return Array(quantity).fill(item);
  // });

  // TODO: Lookup flatMap, Array(), and fill

  const result = encounter.flatMap(item => {
    const quantity = encounterJson[item.id];
    return Array(quantity)
      .fill(null)
      .map(() => ({
        ...item,
        currentHp: item.hp_value,
      }));
  });
  return result;

  return encounter.map(monster => ({
    ...monster,
    currentHp: monster.hp_value,
  }));
};
