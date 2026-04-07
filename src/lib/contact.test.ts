import { afterEach, describe, expect, it, vi } from "vitest";
import { openObfuscatedContactMailto } from "./contact";

describe("openObfuscatedContactMailto", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("no-ops when window is missing (node)", () => {
    expect(() => openObfuscatedContactMailto()).not.toThrow();
  });

  it("sets location to obfuscated mailto on click", () => {
    const location = { href: "" };
    vi.stubGlobal("window", { location });
    openObfuscatedContactMailto();
    expect(location.href).toMatch(/^mailto:[^@]+@jakewells\.me$/);
  });
});
