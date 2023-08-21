"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { searchLocation } from "@/_actions/location.action";
import Link from "next/link";
import { Location } from "@prisma/client";
import { useRouter } from "next/navigation";
import slugify from "slugify";

interface SearchBarProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

function SearchBar({ open, setOpen }: SearchBarProps) {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [locations, setLocations] = useState<Location[] | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    searchLocation(search)
      .then((result) => {
        setLocations((prevState) => result as Location[]);
      })
      .catch((error) => {
        console.log(error);
      });

    return () => controller.abort();
  }, [search]);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        placeholder="Type a command or search..."
        onValueChange={(search) => setSearch(search)}
      />
      <CommandList>
        <ScrollArea className="max-h-[20dvh]">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Results">
            {locations?.slice(0, 8).map((location, index) => (
              <CommandItem
                key={index}
                value={location.slug}
                className="hover:cursor-pointer"
                onSelect={(string) => {
                  router.push(`/location/${string}`);
                  setOpen((open) => false);
                }}
              >
                {location.name}
              </CommandItem>
              // <Link
              //   key={index}
              //   href={`/location/${location.slug}`}
              //   onClick={(e) => {
              //     e.preventDefault();
              //     setOpen((open) => false);
              //   }}
              // >
              //   <CommandItem className="capitalize">
              //     {location.name as string}
              //   </CommandItem>
              // </Link>
            ))}
          </CommandGroup>
        </ScrollArea>
      </CommandList>
    </CommandDialog>
  );
}

export default SearchBar;
