import React from "react";
import Link from "next/link";
import { format, parseISO } from "date-fns";

import { getMyEncounters } from "@/data-access/encounters";
// import { getMyEncounterJsons } from "@/data-access/encounter_json";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Play, Plus } from "lucide-react";

export default async function MyEncounters() {
  const encounters = await getMyEncounters();
  // const encounters = await getMyEncounterJsons();
  if (!encounters) {
    return <div>No encounters found.</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-3">My encounters</h1>
      <div className="gap-y-3 grid grid-cols-1 sm:gap-x-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Link href="/build-encounter">
          <Card className="cursor-pointer flex items-center justify-center min-h-24 h-full">
            <Plus />
          </Card>
        </Link>
        {encounters.map(e => {
          const parsedDate = parseISO(e.created_at);
          const formattedDate = format(parsedDate, "MM/dd/yy");
          return (
            <Card key={e.id}>
              <CardHeader>
                <CardTitle>{e.name}</CardTitle>
                <CardDescription>Created {formattedDate}</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-around">
                <Link href={`/build-encounter/${e.id}`} prefetch={false}>
                  <Pencil />
                </Link>
                <Link href={`/run-encounter/${e.id}`} prefetch={false}>
                  <Play className="h-5 w-5 text-green-700" />
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
