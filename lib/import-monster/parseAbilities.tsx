export default function parseAbilities(input: string) {
  // On this string: "20 (+\-\−5) " match the "20"
  const regExp: RegExp = /\d{1,2}(?=\s\([\+\-\−]\d{1,2}\)\s)/g;
  const modifiersMatch = input.match(regExp);

  if (!modifiersMatch || modifiersMatch.length !== 6)
    return { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 };
  return {
    str: +modifiersMatch[0],
    dex: +modifiersMatch[1],
    con: +modifiersMatch[2],
    int: +modifiersMatch[3],
    wis: +modifiersMatch[4],
    cha: +modifiersMatch[5],
  };
}
