export default function parseCommas(input: string, attribute: string) {
  const regExp: RegExp = new RegExp(`(?<=\\n${attribute}[^\w*]).+(?=\\n)`);
  const match = input.match(regExp);

  if (!match) return [];

  const arr = match[0].split(",");
  return arr;
}
