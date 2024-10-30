const parseHP = (input: string) => {
  const regExp: RegExp = /(?<=\n)Hit Points.+(?=\n)/;

  const HPMatch: RegExpMatchArray | null = input.match(regExp);
  if (!HPMatch) return { value: "??", notes: "" };

  const value = parseValue(HPMatch[0]);
  const notes = parseNotes(HPMatch[0]);

  return { value, notes };
};
export default parseHP;

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
