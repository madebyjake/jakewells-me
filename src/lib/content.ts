import fs from "node:fs";
import path from "node:path";
import { z } from "zod";

const linkSchema = z.object({
  label: z.string().min(1),
  href: z.string().url(),
});

const profileSchema = z.object({
  name: z.string().min(1),
  profileImage: z.string().min(1),
  tagline: z.string().min(1),
  intro: z.string().min(1),
  location: z.string().min(1),
  links: z.array(linkSchema).min(1),
});

const projectSchema = z.object({
  title: z.string().min(1),
  company: z.string().min(1),
  summary: z.string().min(1),
  href: z.string().url().optional(),
  emphasis: z.enum(["primary", "secondary"]).default("primary"),
  order: z.number().int().nonnegative(),
});

const experienceSchema = z.object({
  company: z.string().min(1),
  role: z.string().min(1),
  period: z.string().min(1),
  summary: z.string().min(1),
  order: z.number().int().nonnegative(),
});

const skillItemSchema = z.object({
  label: z.string().min(1),
  hint: z.string().min(1).optional(),
});

const skillsSchema = z.object({
  groups: z.array(
    z.object({
      title: z.string().min(1),
      items: z.array(skillItemSchema).min(1),
    }),
  ),
});

export type LinkItem = z.infer<typeof linkSchema>;
export type Profile = z.infer<typeof profileSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type SkillsData = z.infer<typeof skillsSchema>;
export type SkillGroup = SkillsData["groups"][number];
export type SkillItem = z.infer<typeof skillItemSchema>;

/** Exported for unit tests validating JSON shape rules. */
export const contentSchemas = {
  profile: profileSchema,
  project: projectSchema,
  experience: experienceSchema,
  skills: skillsSchema,
} as const;

const contentRoot = path.join(process.cwd(), "src", "content");

function readJsonDocument<T>(fileName: string, schema: z.ZodSchema<T>): T {
  const filePath = path.join(contentRoot, fileName);
  const raw = fs.readFileSync(filePath, "utf8");
  return schema.parse(JSON.parse(raw));
}

function readOrderedJsonArray<T extends { order: number }>(
  fileName: string,
  itemSchema: z.ZodSchema<T>,
): T[] {
  const filePath = path.join(contentRoot, fileName);
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed: unknown = JSON.parse(raw);
  const items = z.array(itemSchema).parse(parsed);
  return items.sort((a, b) => a.order - b.order);
}

export function getProfile() {
  return readJsonDocument("profile.json", profileSchema);
}

export function getProjects(): Project[] {
  return readOrderedJsonArray("projects.json", projectSchema);
}

export function getExperience(): Experience[] {
  return readOrderedJsonArray("experience.json", experienceSchema);
}

export function getSkills(): SkillsData {
  return readJsonDocument("skills.json", skillsSchema);
}
