import { Metadata } from "next";
import { Geist } from "next/font/google";

export const metadata: Metadata = {
  title: "WEM - Welding Montáže",
  description: "Svářečské a montážní služby"
};

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
