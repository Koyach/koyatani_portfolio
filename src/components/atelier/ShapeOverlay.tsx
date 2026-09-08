"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/translations";
import { TOPIC_BY_ID, type TopicId } from "@/lib/atelier/topics";
import { fill, type AtelierText } from "@/lib/atelier/text";
import type { Shape } from "@/lib/atelier/types";

export interface EditState {
  prefill: string;
  note: "recognized" | "noRecognition" | null;
}

export interface SuggestState {
  word: string;
  options: TopicId[];
}

interface Props {
  shape: Shape;
  locale: Locale;
  at: AtelierText;
  panelOpen: boolean;
  hasWriting: boolean;
  editing: EditState | null;
  suggest: SuggestState | null;
  pill: boolean;
  onActivate: (shape: Shape) => void;
  onCommitLabel: (shapeId: string, word: string) => void;
  onCancelEdit: (shapeId: string) => void;
  onPickTopic: (shapeId: string, topic: TopicId) => void;
  onKeepWord: (shapeId: string) => void;
  onPill: (shapeId: string) => void;
  onFocusShape: (id: string | null) => void;
}

/**
 * The HTML that lives inside a drawn enclosure: the visitor's word as a real
 * <button>, the inline text field, the "closest topic" chooser, and the quiet
 * placeholder. Positioned in world coordinates; the parent scales it.
 */
export default function ShapeOverlay(props: Props) {
  const { shape, locale, at, panelOpen, hasWriting, editing, suggest, pill } = props;
  const w = shape.bbox.maxX - shape.bbox.minX;
  const h = shape.bbox.maxY - shape.bbox.minY;
  const topicName = shape.topic ? TOPIC_BY_ID[shape.topic].name[locale] : null;

  return (
    <div
      className="atelier-shape"
      style={{ left: shape.bbox.minX, top: shape.bbox.minY, width: w, height: h }}
      data-shape-id={shape.id}
    >
      {shape.label && !editing && (
        <button
          type="button"
          data-ui
          data-shape-button={shape.id}
          className={`atelier-word ${shape.topic ? "" : "is-unknown"} ${shape.generated ? "is-generated" : ""}`}
          style={{
            fontSize: labelSize(w, h, shape.label),
            maxWidth: Math.max(40, w * 0.92),
            // short words stay on one line even in a narrow circle; long phrases may wrap
            whiteSpace: Array.from(shape.label).length <= 10 ? "nowrap" : undefined,
          }}
          aria-expanded={shape.topic ? panelOpen : undefined}
          aria-label={
            shape.topic
              ? `${shape.label} — ${topicName}${panelOpen ? `（${at.close}）` : `（${at.open}）`}`
              : `${shape.label} — ${fill(at.suggestTitle, { word: shape.label })}`
          }
          lang={/^[\x20-\x7e]+$/.test(shape.label) ? "en" : undefined}
          onClick={() => props.onActivate(shape)}
          onFocus={() => props.onFocusShape(shape.id)}
          onBlur={() => props.onFocusShape(null)}
        >
          {shape.label}
        </button>
      )}

      {!shape.label && !editing && !pill && !hasWriting && (
        <span className="atelier-placeholder" aria-hidden="true" style={{ fontSize: Math.min(14, Math.max(11, h * 0.18)) }}>
          {at.placeholderInShape}
        </span>
      )}

      {!shape.label && !editing && !pill && hasWriting && (
        <button
          type="button"
          data-ui
          className="atelier-pill"
          onClick={() => props.onPill(shape.id)}
        >
          {at.writePill} →
        </button>
      )}

      {pill && !editing && (
        <button type="button" data-ui className="atelier-pill" onClick={() => props.onPill(shape.id)}>
          {at.writePill} →
        </button>
      )}

      {editing && (
        <LabelEditor
          key={shape.id}
          shapeId={shape.id}
          width={Math.min(260, Math.max(128, w * 0.9))}
          prefill={editing.prefill}
          note={editing.note}
          at={at}
          onCommit={props.onCommitLabel}
          onCancel={props.onCancelEdit}
        />
      )}

      {suggest && !editing && (
        <div data-ui role="group" className="atelier-suggest" aria-label={fill(at.suggestTitle, { word: suggest.word })}>
          <p className="atelier-suggest-title">{fill(at.suggestTitle, { word: suggest.word })}</p>
          <div className="atelier-suggest-options">
            {suggest.options.map((id) => (
              <button key={id} type="button" onClick={() => props.onPickTopic(shape.id, id)}>
                {TOPIC_BY_ID[id].name[locale]}
                <small>{TOPIC_BY_ID[id].hint[locale]}</small>
              </button>
            ))}
          </div>
          <button type="button" className="atelier-suggest-keep" onClick={() => props.onKeepWord(shape.id)}>
            {at.keepAsIs}
          </button>
        </div>
      )}
    </div>
  );
}

function labelSize(w: number, h: number, label: string): number {
  // CJK glyphs are ~1em wide; leave room for the button's 8px side padding
  const avail = Math.max(24, w * 0.88 - 16);
  const perChar = avail / Math.max(2, Array.from(label).length);
  return Math.max(13, Math.min(30, perChar, h * 0.42));
}

interface EditorProps {
  shapeId: string;
  width: number;
  prefill: string;
  note: EditState["note"];
  at: AtelierText;
  onCommit: (shapeId: string, word: string) => void;
  onCancel: (shapeId: string) => void;
}

function LabelEditor({ shapeId, width, prefill, note, at, onCommit, onCancel }: EditorProps) {
  const [value, setValue] = useState(prefill);
  const inputRef = useRef<HTMLInputElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    // a timer, not rAF: rAF never fires in a background tab and the field would stay unfocused
    const id = window.setTimeout(() => {
      el.focus({ preventScroll: true });
      if (prefill) el.select();
    }, 0);
    return () => window.clearTimeout(id);
  }, [prefill]);

  const commit = () => {
    if (done.current) return;
    done.current = true;
    onCommit(shapeId, value);
  };
  const cancel = () => {
    if (done.current) return;
    done.current = true;
    onCancel(shapeId);
  };

  return (
    <form
      data-ui
      className="atelier-edit"
      style={{ width }}
      onSubmit={(e) => {
        e.preventDefault();
        commit();
      }}
    >
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={at.inputPlaceholder}
        aria-label={at.inputPlaceholder}
        enterKeyHint="done"
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
        maxLength={40}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            e.preventDefault();
            cancel();
          }
        }}
        onBlur={() => {
          // Leaving the field with a word keeps it; leaving it empty cancels.
          window.setTimeout(() => {
            if (done.current) return;
            if (value.trim()) commit();
            else cancel();
          }, 120);
        }}
      />
      <div className="atelier-edit-actions">
        <button type="submit" onMouseDown={(e) => e.preventDefault()}>
          {at.inputConfirm}
        </button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={cancel}>
          {at.inputCancel}
        </button>
      </div>
      {note && (
        <p className="atelier-edit-note" role="note">
          {note === "recognized" ? at.noteRecognized : at.noteNoRecognition}
        </p>
      )}
    </form>
  );
}
