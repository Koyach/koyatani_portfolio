"use client";

import type { Locale } from "@/lib/translations";
import { getRelation } from "@/lib/atelier/relations";
import { TOPIC_BY_ID } from "@/lib/atelier/topics";
import type { AtelierText } from "@/lib/atelier/text";
import { centroid } from "@/lib/atelier/geometry";
import type { Connection, Doc, Pt } from "@/lib/atelier/types";

interface Props {
  connection: Connection;
  doc: Doc;
  locale: Locale;
  at: AtelierText;
}

const NOTE_W = 230;
const OFFSET = 26;

/** The sentence that appears beside a line a visitor drew between two shapes. */
export default function ConnectionNote({ connection, doc, locale, at }: Props) {
  const a = doc.shapes.find((s) => s.id === connection.a);
  const b = doc.shapes.find((s) => s.id === connection.b);
  const stroke = doc.strokes.find((s) => s.id === connection.strokeId);
  if (!a || !b || !stroke || !a.topic || !b.topic) return null;

  const pos = notePosition(stroke.points, [centroid(a.polygon), centroid(b.polygon)], doc);
  const text = getRelation(a.topic, b.topic, locale);

  return (
    <aside
      data-ui
      className={`atelier-note ${text ? "" : "is-unknown"}`}
      style={{ left: pos.x, top: pos.y, width: NOTE_W }}
      aria-label={`${TOPIC_BY_ID[a.topic].name[locale]} — ${TOPIC_BY_ID[b.topic].name[locale]}`}
    >
      <span className="atelier-note-pair">
        {a.label} — {b.label}
      </span>
      <p>{text ?? at.relationUnknown}</p>
    </aside>
  );
}

/**
 * Sit beside the middle of the line, on whichever side is farther from the
 * two shapes and any open panels, so the note never covers what it explains.
 */
function notePosition(points: Pt[], anchors: Pt[], doc: Doc): Pt {
  const i = Math.floor(points.length / 2);
  const mid = points[i];
  const p0 = points[Math.max(0, i - 3)];
  const p1 = points[Math.min(points.length - 1, i + 3)];
  let dx = p1.x - p0.x;
  let dy = p1.y - p0.y;
  const len = Math.hypot(dx, dy) || 1;
  dx /= len;
  dy /= len;
  const normal = { x: -dy, y: dx };

  const crowd: Pt[] = [
    ...anchors,
    ...doc.panels.filter((p) => p.open).map((p) => ({ x: p.x + p.w / 2, y: p.y + 120 })),
  ];
  const score = (c: Pt) => crowd.reduce((acc, q) => acc + Math.hypot(c.x - q.x, c.y - q.y), 0);

  const left = { x: mid.x + normal.x * OFFSET, y: mid.y + normal.y * OFFSET };
  const right = { x: mid.x - normal.x * OFFSET, y: mid.y - normal.y * OFFSET };
  const side = score(left) >= score(right) ? left : right;
  const towardsLeft = side === left ? normal.x : -normal.x;

  // anchor the note's near edge to the line: grows away from it
  return {
    x: towardsLeft < 0 ? side.x - NOTE_W : side.x,
    y: side.y - 14,
  };
}
