import React from "react";
import Link from "next/link";

import Container from "@/components/container";
import IcBaselineFavorite from "@/components/icons/IcBaselineFavorite";
import GrommetIconsGithub from "@/components/icons/GrommetIconsGithub";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function Footer() {
  return (
    <footer className="py-10 border-t drop-shadow-sm bg-background">
      <Container className="flex items-center justify-between px-3">
        <span className="text-gray-600 dark:invert">
          made with{" "}
          <IcBaselineFavorite className="w-4 h-4 inline text-rose-500" /> by me.
        </span>
        <Link
          href="#my-github-repos"
          className={cn(
            buttonVariants({ variant: "secondary", size: "icon" }),
            "bg-background"
          )}
        >
          <GrommetIconsGithub className="w-5 h-5" />
        </Link>
      </Container>
    </footer>
  );
}

export default Footer;
