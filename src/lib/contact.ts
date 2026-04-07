/**
 * Opens the default mail client with an address built at click time (light obfuscation).
 */
export function openObfuscatedContactMailto(): void {
  if (typeof window === "undefined") return;
  const localPart = atob("aGVsbG8=");
  const domain = atob("amFrZXdlbGxzLm1l");
  window.location.href = `mailto:${localPart}@${domain}`;
}
