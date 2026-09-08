import type { Locale, translations } from "@/lib/translations";

export type AtelierText = (typeof translations)[Locale]["atelier"];

/** Replace {name} placeholders in UI strings. */
export function fill(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => vars[k] ?? `{${k}}`);
}
