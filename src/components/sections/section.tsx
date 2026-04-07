import type { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";

type SectionProps = {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
};

export function Section({ id, title, description, children }: SectionProps) {
  return (
    <section
      id={id}
      className="animate-in fade-in-0 slide-in-from-bottom-1 duration-500 motion-reduce:animate-none space-y-4"
    >
      <header className="space-y-3">
        <h2 className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
          {title}
        </h2>
        {description ? (
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground">{description}</p>
        ) : null}
        <Separator />
      </header>
      {children}
    </section>
  );
}
