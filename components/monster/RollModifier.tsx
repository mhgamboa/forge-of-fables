import { toastDiceRoll } from "./Monster";

const RollModifier: React.FC<{ modifier: number }> = ({ modifier }) => {
  return (
    <button
      className="rounded border border-red-700 bg-white bg-opacity-75 px-0.5"
      onClick={() => toastDiceRoll(modifier.toString(), "modifier")}
    >
      {modifier > 0 ? `+${modifier}` : modifier}
    </button>
  );
};
export default RollModifier;
