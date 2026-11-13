"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@heroui/react";
import WEMLogo from "@/components/common/WEMLogo";
import ButtonLink from "@/components/common/ButtonLink";
import { company, siteLinks } from "@/config/company";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      isBlurred={false}
      classNames={{
        base: "bg-paper",
        wrapper: "px-4 sm:px-6 lg:px-8",
        menu: "bg-paper pt-10",
      }}
      maxWidth="xl"
      height="5rem"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Zavřít menu" : "Otevřít menu"}
          className="md:hidden"
        />
        <NavbarBrand>
          <Link href="/" aria-label={company.name}>
            <WEMLogo width={72} height={72} />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden md:flex gap-8 lg:gap-10" justify="end">
        {siteLinks.map((item) => {
          const isActive = pathname === item.href;

          return (
            <NavbarItem key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`relative py-2 text-xs font-semibold uppercase tracking-[0.2em] transition-colors hover:text-ink ${
                  isActive ? "text-ink" : "text-neutral-500"
                }`}
              >
                {item.name}
                {isActive && <span aria-hidden="true" className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-brand" />}
              </Link>
            </NavbarItem>
          );
        })}
        <NavbarItem className="hidden lg:flex">
          <ButtonLink href={`mailto:${company.email}`} variant="secondary" size="sm">
            Kontakt
          </ButtonLink>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {siteLinks.map((item) => (
          <NavbarMenuItem key={item.href}>
            <Link
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 py-3 text-2xl font-semibold tracking-tight text-ink"
            >
              {pathname === item.href && <span aria-hidden="true" className="h-0.5 w-4 bg-brand" />}
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem className="mt-6">
          <ButtonLink href={`mailto:${company.email}`} className="w-full">
            {company.email}
          </ButtonLink>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
