"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { createEncounter } from "@/actions/encounterActions";

import { Loader, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function NewEncounterCard() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await createEncounter("New Encounter", "This is a new encounter");
      router.push(`/build-encounter/${res.id}`);
      toast.success("Encounter Created", { position: "top-center" });
    } catch {
      toast.error("Error: Encounter Not created", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      className="cursor-pointer flex items-center justify-center min-h-24 h-full"
      onClick={handleClick}
    >
      {loading ? <Loader className="h-5 w-5 animate-spin" /> : <Plus />}
    </Card>
  );
}
