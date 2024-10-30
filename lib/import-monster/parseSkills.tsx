import { Json } from "@/types/database.types";

export default function parseSkills(input: string) {
  const regExp: RegExp = /(?<=\n)Skills.+(?=\n)/;
  const match = input.match(regExp);

  if (!match) return [];
  const skillsMatch = match[0].match(/(\w+)\s[\+\-\−]\d+/gim);
  if (!skillsMatch) return [];

  const skills = skillsMatch.map(s => parse(s)).filter(s => typeof s !== "undefined") as Json[];
  return skills;
}

const parse = (input: string) => {
  const i = input.toLowerCase();
  const isPositive = i.includes("+");
  const modifier = i.match(/\d+/);
  if (!modifier) return;

  const name = i.match(/^\w+/);
  if (!name) return;

  return {
    name: name[0].toLowerCase(),
    modifier: isPositive ? +modifier : -modifier,
  };
};
