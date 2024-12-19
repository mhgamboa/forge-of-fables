"use client";
import React from "react";
import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { EncounterMonstersType, encounterMonstersToBeAddedType } from "@/types/buildEncounter";
import { LucideIcon } from "lucide-react";

interface MonsterAccordionItemProps {
  monster: EncounterMonstersType | encounterMonstersToBeAddedType;
  icon: LucideIcon;
  iconClassName: string;
  onIconClick: (e: React.MouseEvent<HTMLButtonElement | Element, MouseEvent>) => void;
  onNotesChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  notes?: string | null;
  isRemoved?: boolean;
  id?: number;
}

export default function MonsterAccordionItem({
  monster,
  icon: Icon,
  iconClassName,
  onIconClick,
  onNotesChange,
  className,
  notes,
  isRemoved = false,
  id,
}: MonsterAccordionItemProps) {
  const name = "monsters" in monster ? monster.monsters?.name : monster.name;

  return (
    <AccordionItem value={`${id ? id : monster.id}`}>
      <AccordionTrigger
        Icon={Icon}
        iconClassName={iconClassName}
        onIconClick={onIconClick}
        className={className}
      >
        {name}
      </AccordionTrigger>
      {!isRemoved && onNotesChange && (
        <AccordionContent className="px-1 pt-1">
          <Textarea placeholder="Add Any Notes here" value={notes ?? ""} onChange={onNotesChange} />
        </AccordionContent>
      )}
    </AccordionItem>
  );
}
