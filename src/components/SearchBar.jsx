"use client";
import { Loader2, Loader2Icon, LoaderCircle, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const inputRef = useRef();
  const [isSearching, startTransition] = useTransition();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const search = () => {
    if (!searchTerm) return;
    startTransition(() => {
      router.push(`/search?query=${searchTerm}`);
    });
  };

  return (
    <div className="w-full h-14 relative flex flex-col bg-gray-300 rounded-md">
      <div className="relative h-14 z-10 rounded-md">
        <Input
          className="absolute inset-0 h-full border-black font-bold text-black"
          placeholder="Search..."
          disabled={isSearching}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          ref={inputRef}
          onKeyDown={(e) => {
            if (e.key === "Escape") inputRef?.current?.blur();
            if (e.key === "Enter") search();
          }}
        />
        <Button
          className="absolute inset-y-0 right-0 h-full rounded-l-none"
          onClick={() => search()}
          disabled={isSearching}
        >
          {!isSearching ? (
            <Search className="w-6 h-6" />
          ) : (
            <Loader2Icon className="w-6 h-6 animate-spin" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
