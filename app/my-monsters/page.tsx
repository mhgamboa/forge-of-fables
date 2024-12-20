import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { getMyMonsters } from "@/data-access/monster";
import { Car, Pencil, X } from "lucide-react";
import React from "react";

export default async function MyMonsters() {
  const monsters = await getMyMonsters();

  if (!monsters) {
    return <p>No monsters found</p>;
  }

  return (
    <div className="gap-y-3 grid grid-cols-1 sm:gap-x-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {monsters.map(m => (
        <Card className="flex flex-col justify-between" key={m.id}>
          <CardHeader>
            <CardTitle className="text-center">{m.name}</CardTitle>
            {m.source && <CardDescription>Source: {m.source}</CardDescription>}
          </CardHeader>
          <CardFooter className="flex gap-x-2 w-full justify-around items-center">
            <Pencil
              className="text-black transition-colors rounded-md hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 dark:hover:text-gray-50 cursor-pointer"
              size={60}
            />
            <X
              className="text-red-700 transition-colors rounded-md hover:text-red-900 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 dark:hover:text-gray-50 cursor-pointer"
              size={60}
            />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
