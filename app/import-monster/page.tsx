"use client";
import React, { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { redirect } from "next/navigation";

import { Tables } from "@/types/database.types";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Monster from "@/components/monster/Monster";

import parse from "@/lib/import-monster/_parse";
import { insertMonster } from "./actions";

export default function ImportMonster() {
  const supabase = createClient();

  const [monster, setMonster] = useState<Tables<"monsters"> | null>(parse(text));
  // const [monster, setMonster] = useState<Tables<"monsters"> | null>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setMonster(parse(e.target.value));

  const handleSave = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (!data?.session?.user.id) {
      toast.error("You must be logged in to save monster");
      redirect("/login");
    }

    // TODO: Add empty array for tags in Parse
    try {
      if (!monster) throw new Error("No monster found");
      await insertMonster(monster);
      toast.success("Successfully saved monster", { position: "top-center" });
    } catch (error) {
      toast.error("Failed to save monster", { position: "top-center" });
    }
  };

  return (
    <div className="grid grid-cols-1 gap-x-3 gap-y-5 md:grid-cols-2 w-full pb-6">
      <div className="flex flex-col w-full gap-y-4">
        <Textarea
          placeholder="Paste your monster here"
          className="w-full h-full min-h-96"
          onChange={handleChange}
        />
        <Button onClick={handleSave}>Save</Button>
      </div>
      <div className="w-full">
        {monster ? (
          <Monster monster={monster} combat={false} />
        ) : (
          <p className="text-gray-500 text-center">Please paste a valid monster</p>
        )}
      </div>
    </div>
  );
}

const text = `Adult Green Dragon
Huge Dragon, Lawful Evil

Armor Class 19 (natural armor)
Hit Points 207 (18d12 + 90)
Speed 40 ft., fly 80 ft., swim 40 ft.

STR
23 (+6)
DEX
12 (+1)
CON
21 (+5)
INT
18 (+4)
WIS
15 (+2)
CHA
17 (+3)

Saving Throws DEX +6, CON +10, WIS +7, CHA +8
Skills Deception +8, Insight +7, Perception +12, Persuasion +8, Stealth +6
Damage Immunities Poison
Condition Immunities Poisoned
Senses Blindsight 60 ft., Darkvision 120 ft., Passive Perception 22
Languages Common, Draconic
Challenge 15 (13,000 XP)
Proficiency Bonus +5

Amphibious. The dragon can breathe air and water.

Legendary Resistance (3/Day). If the dragon fails a saving throw, it can choose to succeed instead.

Actions
Multiattack. The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.

Bite. Melee Weapon Attack: +11 to hit, reach 10 ft., one target. Hit: 17 (2d10 + 6) piercing damage plus 7 (2d6) poison damage.

Claw. Melee Weapon Attack: +11 to hit, reach 5 ft., one target. Hit: 13 (2d6 + 6) slashing damage.

Tail. Melee Weapon Attack: +11 to hit, reach 15 ft., one target. Hit: 15 (2d8 + 6) bludgeoning damage.

Frightful Presence. Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 16 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours.

Poison Breath (Recharge 5–6). The dragon exhales poisonous gas in a 60-foot cone. Each creature in that area must make a DC 18 Constitution saving throw, taking 56 (16d6) poison damage on a failed save, or half as much damage on a successful one.

Legendary Actions
The dragon can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The dragon regains spent legendary actions at the start of its turn.

Detect. The dragon makes a Wisdom (Perception) check.

Tail Attack. The dragon makes a tail attack.

Wing Attack (Costs 2 Actions). The dragon beats its wings. Each creature within 10 feet of the dragon must succeed on a DC 19 Dexterity saving throw or take 13 (2d6 + 6) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.`;
