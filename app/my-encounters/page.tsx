import React from "react";
import { format, compareAsc, parseISO } from "date-fns";

import { getMyEncounters } from "@/data-access/encounters";
import { getMyEncounterJsons } from "@/data-access/encounter_json";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function MyEncounters() {
  // const encounters = await getMyEncounters();
  const encounters = await getMyEncounterJsons();
  if (!encounters) {
    return <div>No encounters found.</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-3">My encounters</h1>
      <div className="gap-y-3 grid grid-cols-1 sm:gap-x-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Link href="/build-encounter">
          <Card className="cursor-pointer flex items-center justify-center min-h-24">
            <Plus />
          </Card>
        </Link>
        {encounters.map(e => {
          const parsedDate = parseISO(e.created_at);
          const formattedDate = format(parsedDate, "MM/dd/yy");
          return (
            <Link href={`/build-encounter/${e.id}`} key={e.id} prefetch={false}>
              <Card className="cursor-pointer">
                <CardHeader>
                  <CardTitle>{e.name}</CardTitle>
                  <CardDescription>Created {formattedDate}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
