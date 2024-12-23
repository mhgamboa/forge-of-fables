import DeleteDialog from "@/app/my-encounters/components/DeleteDialog";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { getMyMonsters } from "@/data-access/monster";
import { createClient } from "@/utils/supabase/server";
import { Car, Pencil, X } from "lucide-react";
import Link from "next/link";
import React from "react";
import { deleteMonster as deleteMonsterDB } from "@/actions/monsterActions";

export default async function MyMonsters() {
  const monsters = await getMyMonsters();

  if (!monsters?.length)
    return (
      <p className="text-center">
        You don't have any imported monsters. Why don't you try{" "}
        <Link href="/monster/import" className="text-primary font-medium underline">
          importing one?
        </Link>
      </p>
    );

  // Just make this a list of rows instead of cards
  return (
    <div className="gap-y-3 grid grid-cols-1 sm:gap-x-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {monsters.map(m => (
        <Card className="flex flex-col justify-between" key={m.id}>
          <CardHeader>
            <CardTitle className="text-center">{m.name}</CardTitle>
            {m.source && <CardDescription>Source: {m.source}</CardDescription>}
          </CardHeader>
          <CardFooter className="flex gap-x-2 w-full justify-around items-center">
            <Link href={`/monsters/${m.id}`} prefetch={false}>
              <Pencil
                className="text-black dark:text-white transition-colors rounded-md hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 dark:hover:text-gray-50 cursor-pointer"
                size={60}
              />
            </Link>
            <DeleteDialog
              trigger={
                <X
                  className="text-red-700 transition-colors rounded-md hover:text-red-900 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 dark:hover:text-gray-50 cursor-pointer"
                  size={60}
                />
              }
              // trigger={<X className="h-8 w-8 text-red-700 cursor-pointer" />}
              title="Are you absolutely sure?"
              description="This action cannot be undone. This will permanently delete your encounter."
              confirmText="Delete Encounter"
              deleteFunction={async () => {
                "use server";
                await deleteMonsterDB(m.id);
              }}
              errorText="Error deleting encounter"
            />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
