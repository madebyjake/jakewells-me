import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteNavbar } from "@/components/navigation/site-navbar";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://jakewells.me"),
  title: "Jake Wells",
  description: "Systems administrator and infrastructure engineer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <body className="min-h-full flex flex-col">
        <SiteNavbar />
        {children}
      </body>
    </html>
  );
}
