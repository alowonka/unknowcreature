import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import CustomCursor from "./components/CustomCursor";
import { getDictionary } from "@/app/i18n";

const meta = getDictionary().metadata;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
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
