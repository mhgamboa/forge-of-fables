import React from "react";
import { useDebouncedCallback } from "use-debounce";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/monster-accordion";

import Monster from "@/components/monster/Monster";
import { getXMonsters } from "@/data-access/monster";

export default async function MonsterList({ query }: { query: string }) {
  const monsters = await getXMonsters(query);
  if (!monsters) return <div>There are no monsters :(</div>;

  return (
    <Accordion type="multiple" className="w-full md:col-span-2">
      {monsters.map(monster => (
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
