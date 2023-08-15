import React, { Dispatch, SetStateAction } from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SearchBarProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

function SearchBar({ open, setOpen }: SearchBarProps) {
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <ScrollArea className="max-h-[20dvh]">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Results">
            <CommandItem>items 1</CommandItem>
            <CommandItem>items 2</CommandItem>
            <CommandItem>items 3</CommandItem>
            {/*{locations?.slice(0, 8).map((location, index) => (*/}
            {/*  <Link key={index} href={`/explore/${location.slug}`}>*/}
            {/*    <CommandItem className="capitalize">*/}
            {/*      {location.name}*/}
            {/*    </CommandItem>*/}
            {/*  </Link>*/}
            {/*))}*/}
          </CommandGroup>
        </ScrollArea>
      </CommandList>
    </CommandDialog>
  );
}

export default SearchBar;
