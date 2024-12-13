"use client";
import CombatProvider from "@/providers/CombatProvider";
import { getEncounterWithRelationsFull } from "@/data-access/encounters";

type EncounterType = Awaited<ReturnType<typeof getEncounterWithRelationsFull>>;

type Props = {
  children: React.ReactNode;
  encounter: EncounterType;
};

export default function InitializeZustand({ children, encounter }: Props) {
  const monsters = encounter.encounter_monsters.map(m => ({
    id: `monster-${m.id}`,
    notes: m.notes,
    info: m.monsters!,
    currentHp: m.monsters?.hp_value ?? 0,
    initiative: 0,
    isMonster: true as true, // Have to use or will throw type error "boolean is not assignable to true". See for yourself
  }));

  const players = encounter.encounter_players.map(p => ({
    id: `player-${p.id}`,
    name: p.name ?? "",
    notes: p.notes,
    initiative: 0,
    isMonster: false as false, // Have to use or will throw type error "boolean is not assignable to false". See for yourself
    turnOrder: null,
    currentHp: 0,
  }));

  return (
    <CombatProvider
      id={encounter.id}
      name={encounter.name}
      description={encounter.description}
      combatants={[...monsters, ...players]}
    >
      {children}
    </CombatProvider>
  );
}
