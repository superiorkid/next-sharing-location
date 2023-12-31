"use client";

import React, { useEffect, useState } from "react";

import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import MdiMagnify from "@/components/icons/MdiMagnify";
import SearchBar from "@/components/navigation-bar/search-bar";
import { useWindowSize } from "@uidotdev/usehooks";

function SearchBarTrigger() {
  const [open, setOpen] = useState<boolean>(false);
  const window = useWindowSize();

  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if (event.key === "k" && event.metaKey) {
        setOpen((open) => true);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={(window.width as number) <= 768 ? "ghost" : "outline"}
          size={(window.width as number) <= 768 ? "icon" : "sm"}
          className="flex md:w-[257px] items-center md:justify-between md:text-gray-600 shadow-inner focus-visible:border-2 focus-visible:ring-0"
          onClick={() => setOpen((open) => true)}
        >
          {(window.width as number) <= 768 ? (
            <MdiMagnify className="h-5 w-5" />
          ) : (
            <>
              <div className="flex items-center">
                <MdiMagnify className="mr-2 h-4 w-4" />
                Cari Lokasi...
              </div>
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">super</span>k
              </kbd>
            </>
          )}
        </Button>
      </AlertDialogTrigger>
      <SearchBar open={open} setOpen={setOpen} />
    </AlertDialog>
  );
}

export default SearchBarTrigger;
