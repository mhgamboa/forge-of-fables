import { Json } from "@/types/database.types";

export default function parseTraitActions(arr: string[]) {
  const actionIndexes = findIndexes(arr);
  if (!actionIndexes.Actions && !actionIndexes.ACTIONS) return { jsonTraits: [], jsonActions: [] };
  // if (!actionIndexes.Actions && !actionIndexes.ACTIONS) return { traits: [], actions: [] };

  let currentTitle = "traits";
  let currentName = "";
  let currentDescription = "";

  let traits: {
    name: string;
    description: string;
  }[] = [];

  const actions: {
    title: string;
    content: { name: string; description: string }[];
  }[] = [];

  for (let key in actionIndexes) {
    actions.push({ title: key, content: [] });
  }

  // Lines with words starting with Capital letters.
  const nameRegex =
    /^(?:[A-Z]\w*(?:'s?)?[ -]?|\d\w+ level)+(?: ?\((?:Recharge.+|[1-9].*Day|\d slots|Costs \d Actions|.* Form Only)\))?[.:]|^Action [1-5]\:|^[1-9]\./;

  arr.forEach(s => {
    const nameMatch = s.match(nameRegex);
    const titleMatch = s.match(titleRegex);

    const pushToContent = () => {
      const index = actions.findIndex(item => item.title === currentTitle);
      if (index !== -1 && currentName !== "") {
        actions[index].content.push({
          name: currentName,
          description: currentDescription,
        });
      }
      if (currentDescription !== "" && currentName === "" && currentTitle !== "traits") {
        actions[index].content.push({
          name: "",
          description: currentDescription,
        });
      }
    };

    const handleTrait = () => {
      if (currentTitle === "traits") {
        currentName !== "" && traits.push({ name: currentName, description: currentDescription });
      } else {
        pushToContent();
      }
    };
    if (nameMatch) {
      const regex = /[.:]/;
      const index = s.search(regex);
      const value = [s.substring(0, index), s.substring(index + 2)]; // Find first occurance of "." or ":"

      handleTrait();
      currentName = value[0];
      currentDescription = value[1];
    }

    if (titleMatch) {
      handleTrait();
      currentTitle = s;
      currentName = "";
      currentDescription = "";
    }

    if (!nameMatch && !titleMatch && s !== "") {
      currentDescription += ` ${s}`;
    }
  });

  actions.at(-1)?.content.push({ name: currentName, description: currentDescription });

  console.log("traits", traits);
  console.log("actions", actions);
  // return { traits, actions };
  const jsonActions = actions as Json[];
  const jsonTraits = traits as Json[];
  return { jsonActions, jsonTraits };
}

const titleRegex = /^Actions$|^Reactions$|^\w+ Actions$/i;

function findIndexes(arr: string[]) {
  const indexes: { [key: string]: number } = {};

  arr.forEach((item, index) => {
    const match = item.match(titleRegex);
    if (match) indexes[match[0]] = index;
  });
  return indexes;
}
