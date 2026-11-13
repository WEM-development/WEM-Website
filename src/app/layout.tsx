"use client";

import "./globals.css";
import { HeroUIProvider } from "@heroui/react";
import React from "react";
import { geistSans } from "../config/fonts";

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
        <meta name="keywords" content="svářečské práce, svařování, svařování firma, zpracování kovů, práce svářeče, zpracování kovů, svařování na míru" />
      </head>
      <body className={`${geistSans.variable} antialiased`}>
        <HeroUIProvider>
          {children}
        </HeroUIProvider>
      </body>
    </html>
  );
}
