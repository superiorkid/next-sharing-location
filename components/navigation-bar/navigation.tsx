import React from "react";

import Container from "@/components/container";
import Logo from "@/components/navigation-bar/logo";
import Menu from "@/components/navigation-bar/menu";
import SearchBarTrigger from "@/components/navigation-bar/search-bar-trigger";
import MobileMenu from "@/components/navigation-bar/mobile-menu";
import { Theme } from "@/components/navigation-bar/theme";
import AuthPopup from "@/components/navigation-bar/auth-popup";
import UserMenu from "@/components/navigation-bar/user-menu";
import getCurrentUser from "@/_actions/get-current-user";

async function Navigation() {
  const session = await getCurrentUser();
  return (
    <nav className="border-b drop-shadow-sm py-1 bg-background sticky top-0 z-10">
      <Container className="flex justify-between items-center px-3">
        {/*mobile menu*/}
        <MobileMenu />

        <div className="hidden lg:flex items-center space-x-4">
          <Logo />
          <Menu />
        </div>

        <div className="flex items-center space-x-2.5">
          <SearchBarTrigger />
          <Theme />
          {session ? <UserMenu session={session} /> : <AuthPopup />}
        </div>
      </Container>
    </nav>
  );
}

export default Navigation;
