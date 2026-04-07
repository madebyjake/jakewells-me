import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/sections/section";
import type { SkillGroup, SkillItem } from "@/lib/content";
import { cn } from "@/lib/utils";

type SkillsSectionProps = {
  groups: SkillGroup[];
};

const badgeClass =
  "rounded-sm border-zinc-700/80 bg-transparent text-[0.68rem]";

function SkillItemBadge({ item }: { item: SkillItem }) {
  const { label, hint } = item;

  if (!hint) {
    return (
      <Badge variant="outline" className={badgeClass}>
        {label}
      </Badge>
    );
  }

  return (
    <span className="group relative inline-flex">
      <Badge
        variant="outline"
        className={cn("cursor-help", badgeClass)}
        aria-label={`${label}: ${hint}`}
      >
        {label}
      </Badge>
      <span className="pointer-events-none absolute -top-9 left-1/2 z-20 hidden -translate-x-1/2 whitespace-nowrap rounded-sm border border-zinc-700 bg-zinc-900 px-2 py-1 text-[11px] text-zinc-200 shadow-lg group-hover:block">
        {hint}
      </span>
    </span>
  );
}

export function SkillsSection({ groups }: SkillsSectionProps) {
  return (
    <Section
      id="skills"
      title="Skills"
      description="Core areas of practice across infrastructure, containerization, and operations."
    >
      <div className="grid gap-3 md:grid-cols-2">
        {groups.map((group) => (
          <div key={group.title}>
            <h3 className="mb-2 text-[11px] uppercase tracking-[0.14em] text-zinc-400">
              {group.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <SkillItemBadge
                  key={`${group.title}-${item.label}`}
                  item={item}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
