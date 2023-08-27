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
            <Link href="/explore" className="p-3 text-center">
              Jelajah
            </Link>
            <Link href="/about" className="p-3 text-center">
              Tentang
            </Link>
            {currentUser && (
              <>
                <Separator />
                <Link href="/dashboard/account" className="p-3 text-center">
                  Akun
                </Link>
                <Link href="/dashboard" className="p-3 text-center">
                  Dashboard
                </Link>
                {currentUser.role === "ADMIN" && (
                  <Link href="/dashboard/admin" className="p-3 text-center">
                    Admin
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default MobileMenu;
