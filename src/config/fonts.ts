import { Metadata } from "next";
import { Geist, Geist_Mono, Courier_Prime } from "next/font/google";

export const metadata: Metadata = {
  title: "WEM - Welding & Steel Solutions",
  description: "Professional welding and steel products and services",
};

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const courierPrime = Courier_Prime({
  variable: "--font-courier-prime",
  weight: "400",
  subsets: ["latin"],
});
