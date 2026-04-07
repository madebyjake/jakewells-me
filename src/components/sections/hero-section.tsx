import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/sections/section";

type HeroSectionProps = {
  name: string;
  profileImage: string;
  tagline: string;
  intro: string;
  location: string;
};

export function HeroSection({ name, profileImage, tagline, intro, location }: HeroSectionProps) {
  return (
    <Section id="hero" title="Profile">
      <div className="terminal-pattern glass-panel noise-overlay space-y-5 rounded-md border border-border/80 p-6 md:p-8">
        <div className="flex items-center gap-4">
          <Image
            src={profileImage}
            alt={`${name} profile photo`}
            width={64}
            height={64}
            className="size-16 rounded-sm border border-zinc-700/80 object-cover grayscale contrast-110"
            priority
          />
          <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {name}
          </h1>
        </div>
        <p className="text-base text-foreground/90">{tagline}</p>
        <p className="text-sm leading-7 text-muted-foreground">{intro}</p>
        <Badge
          variant="outline"
          className="rounded-sm border-zinc-700/80 bg-transparent text-[0.68rem]"
        >
          {location}
        </Badge>
      </div>
    </Section>
  );
}
