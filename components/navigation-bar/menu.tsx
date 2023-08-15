"use client";

import React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import useRoutes from "@/hooks/useRoutes";

function Menu() {
  const routes = useRoutes();
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {routes.map((route, index) => (
          <React.Fragment key={index}>
            <NavigationMenuItem>
              <Link href={route.href} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {route.label}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </React.Fragment>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default Menu;
