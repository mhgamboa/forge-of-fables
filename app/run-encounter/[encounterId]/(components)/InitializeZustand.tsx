"use client";
import CombatProvider from "@/providers/CombatProvider";
import { CombatMonster } from "@/types/combat";

type Props = {
  children: React.ReactNode;
  combat: CombatMonster[];
};

export default function InitializeZustand({ children, combat }: Props) {
  return <CombatProvider initialCombat={combat}>{children}</CombatProvider>;
}
