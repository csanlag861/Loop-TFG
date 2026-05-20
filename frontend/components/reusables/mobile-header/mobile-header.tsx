"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Search } from "@/features/search/search";
import { Search as SearchIcon } from "lucide-react";
import { useQueryState } from "nuqs";
import { searchParser, usernameParser, techParser } from "@/features/search/search-params";

export function MobileHeader() {
  const [search, setSearch] = useQueryState("search", searchParser.search);
  const [username, setUsername] = useQueryState("username", usernameParser.username);
  const [tech, setTech] = useQueryState("tech", techParser.tech);

  const hasActiveQuery = !!(search || username || tech);
  const [isSearching, setIsSearching] = useState(false);

  // If there's an active query on load, expand by default
  useEffect(() => {
    if (hasActiveQuery) {
      setIsSearching(true);
    }
  }, [hasActiveQuery]);

  const handleCancel = async () => {
    setIsSearching(false);
    // Clear searches when canceling to go back to the standard home feed
    await setSearch(null);
    await setUsername(null);
    await setTech(null);
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-50 md:hidden bg-[var(--bg-01)]/85 backdrop-blur-md border-b border-[var(--gris-07)] h-14 flex items-center justify-between px-4 w-[calc(100%+16px)] mx-[-8px] mt-[-8px] mb-4 transition-all duration-300">
      {!isSearching ? (
        <div className="flex items-center justify-between w-full animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <Image
              src="/favicon.ico"
              alt="Logo Loop"
              width={28}
              height={28}
              priority
            />
            <span className="font-sohne-bold text-lg text-[var(--primary-color)] tracking-tight">
              Loop
            </span>
          </div>
          <button
            onClick={() => setIsSearching(true)}
            aria-label="Buscar"
            className="p-2 rounded-full hover:bg-[var(--gris-08)] text-[var(--gris-03)] hover:text-[var(--gris-01)] transition-colors cursor-pointer"
          >
            <SearchIcon size={20} />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3 w-full animate-in fade-in slide-in-from-right-4 duration-200">
          <div className="flex-1">
            <Search />
          </div>
          <button
            onClick={handleCancel}
            className="text-sm font-medium text-[var(--gris-03)] hover:text-[var(--gris-01)] px-2 py-1.5 rounded-md hover:bg-[var(--gris-08)] transition-colors cursor-pointer shrink-0"
          >
            Cancelar
          </button>
        </div>
      )}
    </header>
  );
}

export default MobileHeader;
