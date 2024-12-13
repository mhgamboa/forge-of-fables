"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useEncounterStore } from "@/providers/CombatProvider";
import { useState } from "react";
import Footer from "./Footer";
import Body from "./Body";

export default function InitiativeModal({ triggerClass }: { triggerClass: string }) {
  const view = useEncounterStore(state => state.view);
  const setView = useEncounterStore(state => state.setView);
  const combatants = useEncounterStore(state => state.combatants);
  const [newCombatants, setNewCombatants] = useState(combatants);

  return (
    <Dialog open={view === "initiative"} onOpenChange={e => !e && setView("none")}>
      <DialogTrigger asChild>
        <div className={triggerClass} onClick={() => setView("initiative")}>
          Roll Initiative
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Roll Initiative</DialogTitle>
          <DialogDescription>
            Make changes to your initiative here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <Body newCombatants={newCombatants} setNewCombatants={setNewCombatants} />
        <Footer newCombatants={newCombatants} setNewCombatants={setNewCombatants} />
      </DialogContent>
    </Dialog>
  );
}
