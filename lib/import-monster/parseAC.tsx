function parseAC(input: string) {
  const regExp: RegExp = /(?<=\n)Armor Class.+(?=\n)/;

  const armorClassMatch: RegExpMatchArray | null = input.match(regExp);
  if (!armorClassMatch) return { value: "??", notes: "" };

  const value = parseValue(armorClassMatch[0]);
  const notes = parseNotes(armorClassMatch[0]);

  return { value, notes };
}
export default parseAC;

const parseValue = (string: string) => {
  const valueMatch = string.match(/\d+/);
  if (!valueMatch) return 0;
  return !isNaN(+valueMatch[0]) ? +valueMatch[0] : 0;
};

const parseNotes = (string: string) => {
  const regExp: RegExp = /(?<=\d+\s).+/;
  const notesMatch = string.match(regExp);

  if (!notesMatch) return "";
  return notesMatch[0] ? notesMatch[0] : "";
};
