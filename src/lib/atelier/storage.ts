import { isTopicId } from "./topics";
import type { Doc, View } from "./types";

const KEY = "koyatani.atelier.v1";

interface Saved {
  doc: Doc;
  view: View;
  savedAt: number;
}

export function loadState(): Saved | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Saved>;
    if (!parsed.doc || parsed.doc.v !== 1) return null;
    const doc = sanitize(parsed.doc);
    const view = isView(parsed.view) ? parsed.view : { x: 0, y: 0, k: 1 };
    return { doc, view, savedAt: parsed.savedAt ?? 0 };
  } catch {
    return null;
  }
}

export function saveState(doc: Doc, view: View): void {
  if (typeof window === "undefined") return;
  try {
    const payload: Saved = { doc, view, savedAt: Date.now() };
    window.localStorage.setItem(KEY, JSON.stringify(payload));
  } catch {
    // storage may be full or blocked — the canvas still works for this visit
  }
}

export function clearState(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}

function isView(v: unknown): v is View {
  if (!v || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.x === "number" &&
    typeof o.y === "number" &&
    typeof o.k === "number" &&
    Number.isFinite(o.x) &&
    Number.isFinite(o.y) &&
    o.k > 0.1 &&
    o.k < 10
  );
}

/** Drop anything malformed so a bad save can't break the page. */
function sanitize(doc: Doc): Doc {
  const strokes = (doc.strokes ?? []).filter(
    (s) => s && typeof s.id === "string" && Array.isArray(s.points) && s.points.length > 0
  );
  const strokeIds = new Set(strokes.map((s) => s.id));
  const shapes = (doc.shapes ?? [])
    .filter((s) => s && typeof s.id === "string" && Array.isArray(s.polygon) && s.polygon.length >= 3)
    .map((s) => ({
      ...s,
      mode: s.mode === "written" ? ("written" as const) : ("enclosure" as const),
      strokeIds: (s.strokeIds ?? []).filter((id) => strokeIds.has(id)),
      topic: isTopicId(s.topic) ? s.topic : null,
      label: typeof s.label === "string" ? s.label : null,
    }));
  const shapeIds = new Set(shapes.map((s) => s.id));
  const panels = (doc.panels ?? []).filter((p) => p && shapeIds.has(p.shapeId) && isTopicId(p.topic));
  const connections = (doc.connections ?? []).filter(
    (c) => c && shapeIds.has(c.a) && shapeIds.has(c.b) && strokeIds.has(c.strokeId)
  );
  return { v: 1, strokes, shapes, panels, connections };
}
