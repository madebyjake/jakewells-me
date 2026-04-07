import { describe, expect, it } from "vitest";
import {
  contentSchemas,
  getExperience,
  getProfile,
  getProjects,
  getSkills,
} from "./content";

describe("content loaders", () => {
  it("loads profile.json", () => {
    const profile = getProfile();
    expect(profile.name).toBeTruthy();
    expect(profile.links.length).toBeGreaterThan(0);
    profile.links.forEach((link) => {
      expect(link.href).toMatch(/^https?:\/\//);
    });
  });

  it("loads and sorts projects by order", () => {
    const projects = getProjects();
    expect(projects.length).toBeGreaterThan(0);
    const orders = projects.map((p) => p.order);
    expect([...orders].sort((a, b) => a - b)).toEqual(orders);
  });

  it("loads and sorts experience by order", () => {
    const experience = getExperience();
    expect(experience.length).toBeGreaterThan(0);
    const orders = experience.map((e) => e.order);
    expect([...orders].sort((a, b) => a - b)).toEqual(orders);
  });

  it("loads skills.json", () => {
    const skills = getSkills();
    expect(skills.groups.length).toBeGreaterThan(0);
    skills.groups.forEach((group) => {
      expect(group.title).toBeTruthy();
      expect(group.items.length).toBeGreaterThan(0);
    });
  });
});

describe("contentSchemas", () => {
  it("rejects profile with empty name", () => {
    expect(() =>
      contentSchemas.profile.parse({
        name: "",
        profileImage: "/x",
        tagline: "t",
        intro: "i",
        location: "l",
        links: [{ label: "L", href: "https://example.com" }],
      }),
    ).toThrow();
  });

  it("defaults project emphasis to primary", () => {
    const project = contentSchemas.project.parse({
      title: "T",
      company: "C",
      summary: "S",
      order: 0,
    });
    expect(project.emphasis).toBe("primary");
  });

  it("accepts secondary project with href", () => {
    const project = contentSchemas.project.parse({
      title: "T",
      company: "C",
      summary: "S",
      href: "https://github.com/example/repo",
      emphasis: "secondary",
      order: 99,
    });
    expect(project.emphasis).toBe("secondary");
    expect(project.href).toBe("https://github.com/example/repo");
  });
});
