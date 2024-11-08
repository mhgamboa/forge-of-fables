import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getMyMonsters } from "@/data-access/monster";
import { Car } from "lucide-react";
import React from "react";

export default async function MyMonsters() {
  const monsters = await getMyMonsters();

  if (!monsters) {
    return <p>No monsters found</p>;
  }

  return (
    <div className="gap-y-3 grid grid-cols-1 sm:gap-x-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {monsters.map(m => (
        <Card className="cursor-pointer" key={m.id}>
          <CardHeader>
            <CardTitle>{m.name}</CardTitle>
            {m.source && <CardDescription>Source: {m.source}</CardDescription>}
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
