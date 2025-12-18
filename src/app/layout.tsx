"use client";

import "./globals.css";
import { HeroUIProvider } from "@heroui/react";
import React from "react";
import { geistMono, geistSans } from "../config/fonts";
import NavigationBar, { NavigationItem } from "../components/navigation/NavigationBar";

export const items: NavigationItem[] = [
  // { name: "O nás", href: "/" },
  // { name: "Produkty", href: "/" },
  // { name: "Kontakt", href: "/" }
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" suppressHydrationWarning>
      <head>
        <title>Welding Montáže - Profesionální svařovací služby v Ostravě</title>
        <meta name="description" content="Profesionální svařovací služby a montáže ocelových konstrukcí v Ostravě" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <HeroUIProvider>
          <NavigationBar navigationItems={items}/>
          {children}
        </HeroUIProvider>
      </body>
    </html>
  );
}
