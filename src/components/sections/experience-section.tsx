"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Section } from "@/components/sections/section";
import type { Experience } from "@/lib/content";
import { cn } from "@/lib/utils";

const COMMAND = "cat experience.txt";
const TYPING_INTERVAL_MS = 45;
const ENTRY_REVEAL_INTERVAL_MS = 220;
const INTERSECTION_THRESHOLD = 0.35;

type ExperienceSectionProps = {
  experience: Experience[];
};

function TerminalPromptLine({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs text-emerald-300">
      <span className="text-emerald-400">user@jakewells.me</span>
      <span className="text-zinc-500">:</span>
      <span className="text-emerald-400">~</span>
      <span className="text-zinc-500">$</span>{" "}
      {children}
    </p>
  );
}

function TerminalCursor({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "terminal-cursor inline-block h-3 w-2 bg-emerald-400 align-middle motion-reduce:animate-none",
        className,
      )}
      aria-hidden="true"
    />
  );
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  const terminalRef = useRef<HTMLDivElement | null>(null);
  const [started, setStarted] = useState(false);
  const [typedChars, setTypedChars] = useState(0);
  const [visibleEntries, setVisibleEntries] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const effectiveTypedChars = reducedMotion && started ? COMMAND.length : typedChars;
  const effectiveVisibleEntries =
    reducedMotion && started ? experience.length : visibleEntries;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const node = terminalRef.current;
    if (!node || started) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStarted(true);
            observer.disconnect();
          }
        });
      },
      { threshold: INTERSECTION_THRESHOLD },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started || typedChars >= COMMAND.length) return;
    if (reducedMotion) return;
    const timer = setTimeout(() => setTypedChars((prev) => prev + 1), TYPING_INTERVAL_MS);
    return () => clearTimeout(timer);
  }, [started, typedChars, reducedMotion]);

  useEffect(() => {
    if (!started || typedChars < COMMAND.length || visibleEntries >= experience.length) return;
    if (reducedMotion) return;
    const timer = setTimeout(
      () => setVisibleEntries((prev) => prev + 1),
      ENTRY_REVEAL_INTERVAL_MS,
    );
    return () => clearTimeout(timer);
  }, [started, typedChars, visibleEntries, experience.length, reducedMotion]);

  const showIdlePrompt =
    started &&
    effectiveTypedChars >= COMMAND.length &&
    effectiveVisibleEntries >= experience.length;

  return (
    <Section
      id="experience"
      title="Experience"
      description="Role timeline across infrastructure and operations."
    >
      <div
        ref={terminalRef}
        className="overflow-hidden rounded-md border border-zinc-700/80 bg-zinc-950 shadow-[0_14px_34px_rgba(0,0,0,0.45)]"
      >
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/95 px-4 py-2">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-red-400/80" />
            <span className="size-2.5 rounded-full bg-amber-300/80" />
            <span className="size-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <span className="text-[11px] tracking-wide text-zinc-400">zsh — user@jakewells.me</span>
          <span className="text-[11px] text-zinc-600">●</span>
        </div>
        <ol className="terminal-scroll max-h-[32rem] space-y-6 overflow-y-auto p-4 font-mono md:p-5">
          <li className="space-y-1.5">
            <TerminalPromptLine>
              {COMMAND.slice(0, effectiveTypedChars)}
              {effectiveTypedChars < COMMAND.length ? (
                <TerminalCursor className="ml-0.5 align-middle" />
              ) : null}
            </TerminalPromptLine>
          </li>
          {experience.slice(0, effectiveVisibleEntries).map((item, index) => (
            <li key={`${item.company}-${item.role}`} className="space-y-1.5">
              <p className="text-xs text-zinc-500">
                {`-- entry ${String(experience.length - index).padStart(2, "0")} --`}
              </p>
              <p className="text-sm text-zinc-100">
                <span className="text-zinc-500">role</span>
                <span className="text-zinc-600">:</span> {item.role}
              </p>
              <p className="text-sm text-zinc-100">
                <span className="text-zinc-500">company</span>
                <span className="text-zinc-600">:</span> {item.company}
              </p>
              <p className="text-sm text-zinc-100">
                <span className="text-zinc-500">period</span>
                <span className="text-zinc-600">:</span> {item.period}
              </p>
              <p className="pt-1 text-sm leading-6 text-zinc-200">
                <span className="text-zinc-500">summary</span>
                <span className="text-zinc-600">:</span> {item.summary}
              </p>
            </li>
          ))}
          {showIdlePrompt ? (
            <li className="pt-1">
              <TerminalPromptLine>
                <TerminalCursor />
              </TerminalPromptLine>
            </li>
          ) : null}
        </ol>
      </div>
    </Section>
  );
}
