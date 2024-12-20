"use client";
import { createContext, useContext, useState } from "react";

type TextContextValue = {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
};
export const TextContext = createContext<TextContextValue | null>(null);

export const TextContextProvider = ({
  children,
  text,
}: {
  children: React.ReactNode;
  text: string;
}) => {
  const [textState, setTextState] = useState<string>(text);

  return (
    <TextContext.Provider value={{ text: textState, setText: setTextState }}>
      {children}
    </TextContext.Provider>
  );
};

export const useTextContext = () => {
  const context = useContext(TextContext);
  if (!context) {
    throw new Error("TextContext is not provided. Wrap your component in <TextContextProvider>.");
  }
  return context;
};
