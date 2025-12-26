"use client";

import "./globals.css";
import { HeroUIProvider } from "@heroui/react";
import React from "react";
import { usePathname } from "next/navigation";
import { geistMono, geistSans, courierPrime } from "../config/fonts";
import NavigationBar, { NavigationItem } from "../components/navigation/NavigationBar";

const navigationItems: Record<string, NavigationItem[]> = { 
  "/management": [
    { name: "Vytvořit fakturu", href: "/management" }
  ],
  "/": [
    { name: "O nás", href: "/" },
    { name: "Produkty", href: "/" },
    { name: "Kontakt", href: "/" }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathname = usePathname();
  const currentItemsKey = Object.keys(navigationItems).find(key => pathname?.startsWith(key))!;
  const currentItems = navigationItems[currentItemsKey];
  const isManagementRoute = pathname?.startsWith("/management");

  return (
    <html lang="cs" suppressHydrationWarning>
      <head>
        <title>Welding Montáže - Profesionální svařovací služby v Ostravě</title>
        <meta name="description" content="Profesionální svařovací služby a montáže ocelových konstrukcí v Ostravě" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${courierPrime.variable} antialiased`}>
        <HeroUIProvider>
          {!isManagementRoute && <NavigationBar navigationItems={currentItems}/>}
          {children}
        </HeroUIProvider>
      </body>
    </html>
  );
}
