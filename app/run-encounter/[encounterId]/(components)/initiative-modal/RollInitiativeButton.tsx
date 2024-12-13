import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type Props = {
  rollMonsters: () => void;
  syncMonsters: boolean;
  setSyncMonsters: React.Dispatch<React.SetStateAction<boolean>>;
};

const InitiativeControls = ({ rollMonsters, syncMonsters, setSyncMonsters }: Props) => {
  const handleSyncToggle = () => {
    setSyncMonsters(prev => !prev);
  };

  return (
    <div className="flex flex-col gap-y-2">
      <Button
        type="submit"
        variant="outline"
        onClick={e => {
          e.preventDefault();
          rollMonsters();
        }}
      >
        Roll Initiative
      </Button>
      <div className="flex items-center space-x-2">
        <Checkbox id="sync" checked={syncMonsters} onCheckedChange={handleSyncToggle} />
        <Label
          htmlFor="sync"
          className="cursor-pointer"
          onClick={e => {
            e.preventDefault();
            handleSyncToggle();
          }}
        >
          Sync Monsters
        </Label>
      </div>
    </div>
  );
};

export default InitiativeControls;
