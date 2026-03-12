"use client";
import { useQueryState } from "nuqs";
import { Input } from "@/components/ui/input";
import { searchParser, usernameParser, techParser } from "./search-params";
import { useState, useEffect } from "react";

export function Search() {
  const [search, setSearch] = useQueryState("search", searchParser.search);
  const [username, setUsername] = useQueryState("username", usernameParser.username);
  const [tech, setTech] = useQueryState("tech", techParser.tech);

  const initialValue = username ? `@${username}` : tech ? `#${tech}` : search;
  const [inputValue, setInputValue] = useState(initialValue);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (inputValue.startsWith("@")) {
        setSearch("");
        setTech("");
        setUsername(inputValue.slice(1));
      } else if (inputValue.startsWith("#")) {
        setSearch("");
        setUsername("");
        setTech(inputValue.slice(1));
      } else {
        setUsername("");
        setTech("");
        setSearch(inputValue);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [inputValue, setSearch, setTech, setUsername]);

  return (
    <Input
      value={inputValue}
      type="search"
      placeholder="Buscar..."
      onChange={(evento) => setInputValue(evento.target.value)}
    />
  );
}