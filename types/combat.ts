import { Tables } from "./database.types";

export type CombatMonster = Tables<"monsters"> & { currentHp: number };
