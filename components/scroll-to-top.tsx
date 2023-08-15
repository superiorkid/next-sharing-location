"use client";

import React from "react";

import { useWindowScroll } from "@uidotdev/usehooks";
import { Button } from "@/components/ui/button";
import MaterialSymbolsArrowCircleUp from "@/components/icons/MaterialSymbolsArrowCircleUp";

function ScrollToTop() {
  const [{ x, y }, scrollTo] = useWindowScroll();

  return (y as number) >= 476 ? (
    <Button
      variant="outline"
      size="icon"
      className="fixed bottom-12 right-10 z-10 h-14 w-14 rounded-full"
      onClick={() => scrollTo({ left: 0, top: 0, behavior: "smooth" })}
    >
      <MaterialSymbolsArrowCircleUp className="w-12 h-12" />
    </Button>
  ) : null;
}

export default ScrollToTop;
