"use client";
import { createContext, useContext, useState, ReactNode, Dispatch } from "react";

type Context = {
  query: string;
  setQuery: Dispatch<React.SetStateAction<string>>;
};
export const QueryContext = createContext<Context | null>(null);

export const QueryContextProvider = ({
  children,
  initialQuery,
}: {
  children: ReactNode;
  initialQuery: string;
}) => {
  const [query, setQuery] = useState<string>(initialQuery);
  return <QueryContext.Provider value={{ query, setQuery }}>{children}</QueryContext.Provider>;
};

export function useQueryContext() {
  const query = useContext(QueryContext);
  if (query === null) throw new Error("no query context");
  return query;
}
