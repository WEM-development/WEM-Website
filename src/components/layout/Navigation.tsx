"use client";

import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@heroui/react";
import WEMLogo from "@/components/common/WEMLogo";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { name: "DOMŮ", href: "/" },
    { name: "PRODUKTY", href: "/products" },
    { name: "O SPOLEČNOSTI", href: "/about" },
  ];

  return (
    <Navbar 
      onMenuOpenChange={setIsMenuOpen} 
      classNames={{
        base: "bg-white shadow-md",
        wrapper: "px-4 sm:px-6",
      }}
      maxWidth="xl"
      height="5rem"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/">
            <WEMLogo width={72} height={72} />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-8" justify="end">
        {menuItems.map((item) => (
          <NavbarItem key={item.name}>
            <Link
              color="foreground"
              href={item.href}
              className="text-m font-semibold hover:text-[#fdc746] transition"
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              color="foreground"
              className="w-full text-xl font-semibold hover:text-[#fdc746] transition"
              href={item.href}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
