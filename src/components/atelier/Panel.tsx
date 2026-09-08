"use client";

import { useEffect, useRef } from "react";
import type { Locale } from "@/lib/translations";
import { TOPIC_BY_ID, type TopicId } from "@/lib/atelier/topics";
import type { AtelierText } from "@/lib/atelier/text";
import type { PanelState, Shape } from "@/lib/atelier/types";
import TopicContent, { type PostSummary } from "./panels/TopicContent";

interface Props {
  panel: PanelState;
  shape: Shape;
  maxHeight: number;
  scale: number;
  locale: Locale;
  at: AtelierText;
  posts: PostSummary[];
  focusToken: number;
  onClose: (shapeId: string) => void;
  onToggleCollapse: (shapeId: string) => void;
  onMove: (shapeId: string, x: number, y: number) => void;
  onFront: (shapeId: string) => void;
  onOpenTopic: (topic: TopicId) => void;
}

/**
 * A sheet of paper that unfolds from a drawn shape. Real HTML: heading,
 * paragraphs, links. Draggable by its header, collapsible, closable, and
 * scrollable without fighting the canvas.
 */
export default function Panel(props: Props) {
  const { panel, shape, maxHeight, scale, locale, at, posts, focusToken } = props;
  const headingRef = useRef<HTMLHeadingElement>(null);
  const drag = useRef<{ id: number; sx: number; sy: number; ox: number; oy: number } | null>(null);
  const topicName = TOPIC_BY_ID[panel.topic].name[locale];

  useEffect(() => {
    if (!focusToken) return;
    const el = headingRef.current;
    if (!el) return;
    const id = window.setTimeout(() => el.focus({ preventScroll: true }), 0);
    return () => window.clearTimeout(id);
  }, [focusToken]);

  const startDrag = (e: React.PointerEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).closest("button")) return;
    if (e.button !== 0 && e.pointerType === "mouse") return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { id: e.pointerId, sx: e.clientX, sy: e.clientY, ox: panel.x, oy: panel.y };
    props.onFront(shape.id);
  };
  const moveDrag = (e: React.PointerEvent<HTMLElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    props.onMove(shape.id, d.ox + (e.clientX - d.sx) / scale, d.oy + (e.clientY - d.sy) / scale);
  };
  const endDrag = (e: React.PointerEvent<HTMLElement>) => {
    if (drag.current?.id === e.pointerId) drag.current = null;
  };

  const onHeaderKey = (e: React.KeyboardEvent<HTMLElement>) => {
    const step = e.shiftKey ? 40 : 10;
    const map: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
    };
    const d = map[e.key];
    if (!d) return;
    e.preventDefault();
    props.onMove(shape.id, panel.x + d[0], panel.y + d[1]);
  };

  return (
    <section
      data-ui
      className={`atelier-panel ${panel.collapsed ? "is-collapsed" : ""} ${panel.side === "left" ? "from-left" : panel.side === "below" ? "from-below" : ""}`}
      style={{ left: panel.x, top: panel.y, width: panel.w, zIndex: panel.z }}
      aria-labelledby={`atelier-panel-title-${shape.id}`}
      onPointerDown={() => props.onFront(shape.id)}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          e.stopPropagation();
          props.onClose(shape.id);
          const back = document.querySelector<HTMLElement>(`[data-shape-button="${shape.id}"]`);
          back?.focus();
        }
      }}
    >
      <header
        className="atelier-panel-head"
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        title={at.dragHint}
      >
        <div className="atelier-panel-titles">
          <span className="atelier-panel-word" aria-hidden="true">
            {shape.label}
          </span>
          <h2
            id={`atelier-panel-title-${shape.id}`}
            ref={headingRef}
            tabIndex={-1}
            className="atelier-panel-title"
            onKeyDown={onHeaderKey}
          >
            {topicName}
          </h2>
        </div>
        <div className="atelier-panel-actions">
          <button
            type="button"
            aria-label={panel.collapsed ? at.expand : at.collapse}
            aria-expanded={!panel.collapsed}
            onClick={() => props.onToggleCollapse(shape.id)}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
              {panel.collapsed ? (
                <path d="M3 5.5 7 9.5 11 5.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
              ) : (
                <path d="M3 8.5 7 4.5 11 8.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
              )}
            </svg>
          </button>
          <button type="button" aria-label={at.close} onClick={() => props.onClose(shape.id)}>
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
              <path d="M3 3l8 8M11 3l-8 8" fill="none" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </button>
        </div>
      </header>

      {!panel.collapsed && (
        <div className="atelier-panel-body" data-scroll style={{ maxHeight }}>
          <TopicContent topic={panel.topic} anchor={panel.anchor} posts={posts} onOpenTopic={props.onOpenTopic} />
        </div>
      )}
    </section>
  );
}
