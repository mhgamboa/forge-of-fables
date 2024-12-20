import { getSingleMonster } from "@/data-access/monster";
import React from "react";
import { TextContextProvider } from "./TextContext";
import { redirect } from "next/navigation";
import TextInput from "./components/TextInput";
import Display from "./components/Display";

type Props = {
  params: Promise<{ monsterId: number }>;
};

export default async function EditMonster({ params }: Props) {
  const { monsterId } = await params;
  const monster = await getSingleMonster(monsterId, ["raw_text"]);
  if (!monster || !monster.raw_text) redirect("/monsters/list");
  return (
    <TextContextProvider text={monster.raw_text}>
      <div className="grid grid-cols-1 gap-x-3 gap-y-5 md:grid-cols-2 w-full pb-6">
        <TextInput />
        <Display />
      </div>
    </TextContextProvider>
  );
}
