"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Link, Button } from "@heroui/react";
import WEMLogo from "../common/WEMLogo";

export interface NavigationItem {
  name: string;
  href: string;
}

export default function NavigationBar({ navigationItems }: { navigationItems: NavigationItem[] }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden text-black"
        />
        <NavbarBrand>
          <WEMLogo width={72} height={72} />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {navigationItems.map(({ name, href }) => (
          <NavbarItem key={name} isActive={pathname === href}>
            <Link
              color={pathname !== href ? "foreground" : undefined}
              href={href}
            >
              {name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/contact">Contact</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {navigationItems.map(({ name, href }) => (
          <NavbarMenuItem key={name} isActive={pathname === href}>
            <Link
              className="w-full"
              color={pathname !== href ? "foreground" : undefined}
              href={href}
              size="lg"
            >
              {name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
