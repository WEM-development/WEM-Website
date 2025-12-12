"use client";

import "./globals.css";
import { HeroUIProvider } from "@heroui/react";
import React from "react";
import { geistMono, geistSans } from "../config/fonts";
import NavigationBar, { NavigationItem } from "../components/navigation/NavigationBar";

export const items: NavigationItem[] = [
  { name: "O nás", href: "/" },
  { name: "Produkty", href: "/products" },
  { name: "Kontakt", href: "/contact" }
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <HeroUIProvider disableAnimation={false}>
          <NavigationBar navigationItems={items}/>
          {children}
        </HeroUIProvider>
      </body>
    </html>
  );
}
