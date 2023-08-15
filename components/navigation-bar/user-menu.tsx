"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TablerUser from "@/components/icons/TablerUser";
import MaterialSymbolsLogoutRounded from "@/components/icons/MaterialSymbolsLogoutRounded";
import MaterialSymbolsDashboardCustomizeRounded from "@/components/icons/MaterialSymbolsDashboardCustomizeRounded";
import { useToast } from "@/components/ui/use-toast";
import { User } from ".prisma/client";

interface UserMenuProps {
  session: User | null;
}

function UserMenu({ session }: UserMenuProps) {
  const { toast } = useToast();
  const router = useRouter();

  const handleLogout = () => {
    signOut({ redirect: false })
      .then((response) => {
        toast({
          title: "Sign Out",
          description: "Log out successfully",
        });
        router.refresh();
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Sign Out",
          description: "Log out failed",
        });
      });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="w-7 h-7">
          <AvatarImage src={session?.image as string} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[187px]">
        <DropdownMenuLabel>
          <h5>{session?.name}</h5>
          <span className="font-normal">{session?.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard/account">
            <TablerUser className="mr-2 w-4 h-4" />
            Account
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard">
            <MaterialSymbolsDashboardCustomizeRounded className="mr-2 w-4 h-4" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-rose-700 focus:text-background focus:bg-rose-500"
          onClick={handleLogout}
        >
          <MaterialSymbolsLogoutRounded className="mr-2 w-4 h-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserMenu;
