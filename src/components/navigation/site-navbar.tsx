"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { openObfuscatedContactMailto } from "@/lib/contact";

export function SiteNavbar() {
  return (
    <header className="terminal-divider glass-panel noise-overlay sticky top-0 z-20">
      <nav className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4 md:px-12">
        <Link href="/" className="text-sm font-semibold tracking-wide">
          <span className="terminal-accent mr-2">{">_"}</span>
          jakewells.me
        </Link>
        <div className="flex items-center">
          <Button
            type="button"
            size="sm"
            onClick={openObfuscatedContactMailto}
            className="transition-colors hover:bg-emerald-400 hover:text-zinc-950"
          >
            <Mail className="size-4" />
            Contact
          </Button>
        </div>
      </nav>
    </header>
  );
}
