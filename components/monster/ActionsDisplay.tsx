"use client";
import React from "react";
import reactStringReplace from "react-string-replace";
import { Saves, Skills, Traits, Actions } from "@/types/monster";
import { toastDiceRoll } from "./Monster";
import RollModifier from "./RollModifier";

type ActionsDisplayProps = {
  actions: Actions;
};

export default function ActionsDisplay({ actions }: ActionsDisplayProps) {
  return (
    <>
      {actions.map((action, actionIndex) => (
        <div id="actions" className="py-2" key={action.title}>
          <h3 className="text-2xl font-light text-red-700">{action.title}</h3>
          <hr className="border-black" />
          <div className="pt-4 space-y-3">
            {action.content.map((content, contentIndex) => {
              if (!content) return null;

              const parseDamage = reactStringReplace(
                content.description,
                /(\(\d{1,2}d\d{1,2}(?:\)| ?[+-] ?\d{1,2}\)))/gm,
                (match, i) => (
                  <button
                    key={`${match}-${i}`}
                    className="rounded border border-red-700 bg-white dark:bg-gray-800 dark:text-white bg-opacity-75 px-1 py-0.5"
                    onClick={() => toastDiceRoll(match.replace(/\s/g, "").slice(1, -1))}
                  >
                    {match.replace(/\s/g, "").slice(1, -1)}
                  </button>
                )
              );

              const parseModifiers = reactStringReplace(
                parseDamage,
                /((?<=\s|\.)\+\d+(?=\s|\.))/gm,
                (match, i) => <RollModifier key={`${match}-${i}`} modifier={parseInt(match)} />
              );

              return (
                <div key={`${content.name}-${actionIndex}-${contentIndex}`}>
                  {content.name !== "" && (
                    <span className="font-semibold italic">{content.name}. </span>
                  )}
                  {parseModifiers}
                  <br />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}
