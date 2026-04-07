import Link from "next/link";
import { Link as LinkIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Section } from "@/components/sections/section";
import { cn } from "@/lib/utils";
import type { LinkItem } from "@/lib/content";

type LinksSectionProps = {
  links: LinkItem[];
};

export function LinksSection({ links }: LinksSectionProps) {
  return (
    <Section
      id="links"
      title="Links"
      description="Primary profiles and contact points."
    >
      <div className="flex flex-wrap gap-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-2 font-medium")}
          >
            <LinkIcon className="size-4" />
            {link.label}
          </Link>
        ))}
      </div>
    </Section>
  );
}
