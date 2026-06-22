import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import CustomCursor from "./components/CustomCursor";

export const metadata: Metadata = {
  title: "Unknown Creature Games — A Mexican-American Game Studio",
  description:
    "Unknown Creature Games is a Mexican-American studio crafting original worlds, unforgettable creatures, and educational games. Built by five Yucatecans, from Mérida to Houston.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="grain bg-ink text-bone antialiased overflow-x-hidden">
        <SmoothScroll />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
