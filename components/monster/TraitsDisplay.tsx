"use client";
import React from "react";
import reactStringReplace from "react-string-replace";
import { toastDiceRoll } from "./Monster";
import RollModifier from "./RollModifier";
import { Saves, Skills, Traits, Actions } from "@/types/monster";

export default function TraitsDisplay({ traits }: { traits: Traits }) {
  if (!traits) return null;

  return (
    <div className="space-y-2 whitespace-pre-wrap py-2">
      {traits.map(t => {
        const parseDamage = reactStringReplace(
          t.description,
          /(\(\d{1,2}d\d{1,2}(?:\)| ?[+-] ?\d{1,2}\)))/gm,
          (match, i) => (
            <button
              key={`${match}-${i}`}
              className="rounded border border-red-700 bg-white bg-opacity-75 px-0.5"
              onClick={() => toastDiceRoll(match.replace(/\s/g, "").slice(1, -1))}
            >
              {match.replace(/\s/g, "").slice(1, -1)}
            </button>
          )
        );

        const parseModifiers = reactStringReplace(
          parseDamage,
          /((?<=\s|\.)\+\d+(?=\s|\.))/gm,
          (match, i) => (
            <RollModifier key={`${match}-${i}`} modifier={parseInt(match.replace(/\s/g, ""))} />
          )
        );

        return (
          <div key={t.name}>
            <span className="font-semibold italic">{t.name}. </span>
            {parseModifiers}
          </div>
        );
      })}
    </div>
  );
}
