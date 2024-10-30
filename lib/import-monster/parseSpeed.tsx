export default function parseSpeed(input: string) {
  const regExp: RegExp = /(?<=\n)Speed.+(?=\n)/;
  const speedMatch: RegExpMatchArray | null = input.match(regExp);
  if (!speedMatch) return [""];

  return speedMatch[0].split(",");
}
