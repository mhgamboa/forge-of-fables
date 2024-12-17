import { Saves } from "@/types/monster";

export default function SavesDisplay({ saves }: { saves: Saves }) {
  if (!saves || saves.length <= 1) return null;

  return (
    <div>
      <span className="font-bold">Saves</span>{" "}
      {saves
        .filter(s => s)
        .map(s => `${s!.name} +${s!.modifier}`)
        .join(", ")}
    </div>
  );
}
