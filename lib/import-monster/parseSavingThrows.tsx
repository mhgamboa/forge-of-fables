import { Json } from "@/types/database.types";

export default function parseSavingThrows(input: string) {
  const regExp: RegExp = /(?<=\n)Saving Throws.+(?=\n)/;
  const match = input.match(regExp);

  if (!match) return [];
  const savesMatch = match[0].match(/(Str|Dex|Con|Int|Wis|Cha)\s[\+\-\−]\d+/gim);
  if (!savesMatch) return [];

  const saves = savesMatch.map(s => parse(s)).filter(s => s) as Json[];
  return saves;
}

const parse = (input: string) => {
  const i = input.toLowerCase();
  const isPositive = i.includes("+");
  const modifier = i.match(/\d+/);
  if (!modifier) return;

  let name!: string;

  if (i.includes("str")) name = "str";
  if (i.includes("dex")) name = "dex";
  if (i.includes("con")) name = "con";
  if (i.includes("int")) name = "int";
  if (i.includes("wis")) name = "wis";
  if (i.includes("cha")) name = "cha";

  return { name, modifier: isPositive ? +modifier : -modifier };
};
