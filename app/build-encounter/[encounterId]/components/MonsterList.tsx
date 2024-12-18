"use client";
import React, { useEffect, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/monster-accordion";

import Monster from "@/components/monster/Monster";
import { getXMonsters } from "@/data-access/monster";
import { Tables } from "@/types/database.types";
import { useQueryContext } from "./QueryContext";
import { set } from "date-fns";

export default function MonsterList({ monsters }: { monsters: Tables<"monsters">[] | null }) {
  // TODO: Query monsters here instead of in parent component?
  const { query } = useQueryContext();
  const [filteredMonsters, setFilteredMonsters] = useState<Tables<"monsters">[]>(monsters!);

  if (!monsters) return <div>There are no monsters 😞</div>;

  useEffect(() => {
    setFilteredMonsters(monsters);
  }, []);

  useEffect(() => {
    if (query) {
      setFilteredMonsters(
        monsters.filter(monster => monster.name.toLowerCase().includes(query.toLowerCase()))
      );
    } else {
      setFilteredMonsters(monsters); // Reset to full list if no query
    }
  }, [query, monsters]);

  if (!filteredMonsters || !filteredMonsters.length)
    return <div className="w-full md:col-span-2">There are no monsters 😞</div>;

  return (
    <Accordion type="multiple" className="w-full md:col-span-2">
      {filteredMonsters.map(monster => (
        <AccordionItem key={monster.id} value={`${monster.id}`}>
          <AccordionTrigger monster={monster}>{monster.name}</AccordionTrigger>
          <AccordionContent>
            <Monster monster={monster} combat={false} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
