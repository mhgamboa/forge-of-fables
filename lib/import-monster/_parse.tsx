import parseAC from "./parseAC";
import parseHP from "./parseHP";
import parseSpeed from "./parseSpeed";
import parseAbilities from "./parseAbilities";
import parseDefences from "./parseDefences";
import parseSavingThrows from "./parseSavingThrows";
import parseSkills from "./parseSkills";
import parseCommas from "./parseCommas";
import parseChallenge from "./parseChallenge";
import parseTraitActions from "./parseTraitsActions";
import { Tables } from "@/types/database.types";

const parseMonsterText = (input: string, id?: number): Tables<"monsters"> => {
  const arr = input.split(/\n/gm);
  const ac = parseAC(input);
  const hp = parseHP(input);
  const speed = parseSpeed(input);
  const abilities = parseAbilities(input);
  const damage_vulnerabilities = parseDefences(input, "Damage Vulnerabilities");
  const damage_resistances = parseDefences(input, "Damage Resistances");
  const damage_immunities = parseDefences(input, "Damage Immunities");
  const condition_immunities = parseDefences(input, "Condition Immunities");
  const saves = parseSavingThrows(input);
  const skills = parseSkills(input);
  const senses = parseCommas(input, "Senses");
  const languages = parseCommas(input, "Languages");
  const challenge = parseChallenge(input);
  const { jsonActions: actions, jsonTraits: traits } = parseTraitActions(arr);

  // return {
  //   name: "Test",
  //   source: "Test",
  //   type: "Test",
  //   hp_value: 10,
  //   hp_notes: "Test",
  //   ac_value: 10,
  //   ac_notes: "Test",
  //   speed: ["Test"],
  //   // abilities
  //   str: 10,
  //   dex: 10,
  //   con: 10,
  //   int: 10,
  //   wis: 10,
  //   cha: 10,
  //   damage_vulnerabilities: ["damage vulnerabilities"],
  //   damage_resistances: ["damage resistances"],
  //   damage_immunities: ["damage immunities"],
  //   condition_immunities: ["condition immunities"],
  //   saves: [{ name: "Dex", modifier: 6 }] as Json[],
  //   skills: [{ name: "Perception", modifier: 4 }] as Json[],
  //   senses,
  //   languages,
  //   challenge,
  //   traits,
  //   actions,
  //   description: "",
  // } as Tables<"monsters">;

  return {
    id: id ? id : 0,
    name: arr[0],
    source: "",
    type: arr[1],
    hp_value: hp.value,
    hp_notes: hp.notes,
    ac_value: ac.value,
    ac_notes: ac.notes,
    speed,
    str: abilities.str,
    dex: abilities.dex,
    con: abilities.con,
    int: abilities.int,
    wis: abilities.wis,
    cha: abilities.cha,
    damage_vulnerabilities,
    damage_resistances,
    damage_immunities,
    condition_immunities,
    saves,
    skills,
    senses,
    languages,
    challenge,
    traits,
    actions,
    description: "",
    tags: [] as string[],
    raw_text: input,
    is_deleted: false,
    user_id: "",
  };
};

export default parseMonsterText;
