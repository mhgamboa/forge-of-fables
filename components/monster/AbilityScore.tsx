import calculateModifier from "@/utils/calculateAbilityScore";
import { toastDiceRoll } from "./Monster";

type AbilityScoreProps = {
  name: string;
  modifier: number;
  combat: boolean;
};

export default function AbilityScore({ name, modifier, combat }: AbilityScoreProps) {
  const abilityModifier = calculateModifier(modifier);

  return (
    <div className="flex w-1/6 flex-col items-center">
      <div className="font-bold">{name}</div>
      <div>
        {combat ? (
          <button
            className="rounded border border-red-700 bg-white bg-opacity-75 px-0.5"
            onClick={() => toastDiceRoll(abilityModifier.toString(), "modifier")}
          >
            {abilityModifier > 0 ? `+${abilityModifier}` : abilityModifier}
          </button>
        ) : (
          <p className="w-full text-center">
            {modifier} ({abilityModifier > 0 ? `+${abilityModifier}` : abilityModifier})
          </p>
        )}
      </div>
    </div>
  );
}
