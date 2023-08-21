import React from "react";

import { Button } from "@/components/ui/button";
import IconParkOutlineHamburgerButton from "@/components/icons/IconParkOutlineHamburgerButton";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import getCurrentUser from "@/_actions/get-current-user";
import SearchBarTrigger from "@/components/navigation-bar/search-bar-trigger";

async function MobileMenu() {
  const currentUser = await getCurrentUser();
  return (
    <Sheet>
      <SheetTrigger asChild className="lg:hidden">
        <Button variant="outline" size="icon">
          <IconParkOutlineHamburgerButton className="w-6 h-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full py-16">
        <div className="flex flex-col justify-between  h-full">
          <div className="w-full flex flex-col space-y-3 rounded-md">
            <SearchBarTrigger />
            <Link href="#" className="p-3 text-center">
              explore
            </Link>
            <Link href="#" className="p-3 text-center">
              about
            </Link>
            {currentUser && (
              <>
                <Separator />
                <Link href="#" className="p-3 text-center">
                  Account
                </Link>
                <Link href="#" className="p-3 text-center">
                  Dashboard
                </Link>
                {currentUser.role === "ADMIN" && (
                  <Link href="#" className="p-3 text-center">
                    Admin
                  </Link>
                )}
              </>
            )}
          </div>
          <div></div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default MobileMenu;
