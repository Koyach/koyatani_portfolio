"use client";

import type { RefObject } from "react";
import { nearestPointOnPolyline, polygonPath, smoothPath } from "@/lib/atelier/geometry";
import type { Doc, PanelState, Pt, View } from "@/lib/atelier/types";

interface Props {
  doc: Doc;
  view: View;
  liveRef: RefObject<SVGPathElement | null>;
  focusShapeId: string | null;
}

/** Every line the visitor drew, plus the thin threads from a shape to its open panel. */
export default function InkLayer({ doc, view, liveRef, focusShapeId }: Props) {
  const shapesById = new Map(doc.shapes.map((s) => [s.id, s]));
  const focused = focusShapeId ? shapesById.get(focusShapeId) : undefined;

  return (
    <svg className="atelier-ink" aria-hidden="true" focusable="false">
      <g transform={`translate(${view.x} ${view.y}) scale(${view.k})`}>
        {doc.panels
          .filter((p) => p.open)
          .map((p) => {
            const shape = shapesById.get(p.shapeId);
            if (!shape) return null;
            const anchor = panelAnchor(p);
            const from = nearestPointOnPolyline(anchor, shape.polygon);
            return <path key={`thread-${p.shapeId}`} className="atelier-thread" d={threadPath(from, anchor)} />;
          })}

        {focused && <path className="atelier-shape-focus" d={polygonPath(focused.polygon)} />}

        {doc.strokes.map((s) => (
          <path key={s.id} className={`atelier-stroke is-${s.kind}`} d={smoothPath(s.points)} />
        ))}

        <path ref={liveRef} className="atelier-stroke is-live" d="" />
      </g>
    </svg>
  );
}

function panelAnchor(p: PanelState): Pt {
  if (p.side === "left") return { x: p.x + p.w, y: p.y + 20 };
  if (p.side === "below") return { x: p.x + 28, y: p.y };
  return { x: p.x, y: p.y + 20 };
}

function threadPath(a: Pt, b: Pt): string {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const cx = mx - dy * 0.18;
  const cy = my + dx * 0.18;
  return `M${a.x.toFixed(1)} ${a.y.toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
}
