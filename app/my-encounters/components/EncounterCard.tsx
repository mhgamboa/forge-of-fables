"use client";
import React from "react";
import Link from "next/link";
import { format, parseISO } from "date-fns";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tables } from "@/types/database.types";
import { Pencil, Play, X } from "lucide-react";

import DeleteDialog from "./DeleteDialog";
import { createClient } from "@/utils/supabase/client";
import { deleteEncounter } from "@/actions/encounterActions";

export default function EncounterCard({ e }: { e: Tables<"encounters"> }) {
  const parsedDate = parseISO(e.created_at);
  const formattedDate = format(parsedDate, "MM/dd/yy");

  const deleteFuntion = async (id: number) => {
    const supabase = createClient();
    const session = await supabase.auth.getSession();
    const userId = session.data.session?.user.id;
    await deleteEncounter(id, userId);
  };

  return (
    <Card key={e.id}>
      <CardHeader>
        <CardTitle className="text-center">{e.name}</CardTitle>
        <CardDescription className="text-center">Created {formattedDate}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-around">
        <Link href={`/build-encounter/${e.id}`} prefetch={false}>
          <Pencil className="h-8 w-8" />
        </Link>
        <Link href={`/run-encounter/${e.id}`} prefetch={false}>
          <Play className="h-8 w-8 text-green-700" />
        </Link>
      </CardContent>
      <CardFooter className="flex justify-center">
        {/* <X className="h-8 w-8 text-red-700 cursor-pointer" /> */}
        <DeleteDialog
          trigger={<X className="h-8 w-8 text-red-700 cursor-pointer" />}
          title="Are you absolutely sure?"
          description="This action cannot be undone. This will permanently delete your encounter."
          confirmText="Delete Encounter"
          deleteFunction={() => deleteFuntion(e.id)}
          errorText="Error deleting encounter"
        />
      </CardFooter>
    </Card>
  );
}
