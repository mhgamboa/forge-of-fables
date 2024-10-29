"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useDebouncedCallback } from "use-debounce";

import { Input } from "@/components/ui/input";

export default function SearchBar() {
  const [query, setQuery] = useQueryState("query", { defaultValue: "" });
  const [inputValue, setInputValue] = useState(query); // Immediate input value
  const router = useRouter();

  // Debounced function to update query state and refresh router
  const debouncedHandleChange = useDebouncedCallback(async (value: string) => {
    await setQuery(value);
    router.refresh();
  }, 300);

  // Handle input changes immediately for Input field and debounce query update
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value); // Update the input field immediately
    debouncedHandleChange(value); // Debounced update to query state
  };

  return (
    <div className="flex items-center gap-2 px-4 pb-6">
      <Input
        placeholder="Search Monsters 🔍"
        value={inputValue} // Bind input to immediate inputValue
        type="search"
        onChange={handleInputChange}
      />
    </div>
  );
}
