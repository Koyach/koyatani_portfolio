"use client";

import { useEffect, useRef } from "react";
import type { Locale } from "@/lib/translations";
import { TOPICS, type TopicId } from "@/lib/atelier/topics";
import type { AtelierText } from "@/lib/atelier/text";

interface CornersProps {
  at: AtelierText;
  locale: Locale;
  name: string;
  nameEn: string;
  helpOpen: boolean;
  indexOpen: boolean;
  onToggleHelp: () => void;
  onToggleIndex: () => void;
  onContact: () => void;
  onToggleLocale: () => void;
}

/** The four corners: who this is, language, and the three discoverable doors. */
export default function Corners(props: CornersProps) {
  const { at, locale } = props;
  return (
    <>
      <div className="atelier-corner is-tl" data-ui>
        <span className="atelier-mark">
          <span lang="ja">{props.name}</span>
          <span className="atelier-mark-en" lang="en">
            {props.nameEn}
          </span>
        </span>
      </div>

      <div className="atelier-corner is-tr" data-ui>
        <button
          type="button"
          className="atelier-link"
          onClick={props.onToggleLocale}
          aria-label={locale === "ja" ? "Switch to English" : "日本語に切り替える"}
          lang={locale === "ja" ? "en" : "ja"}
        >
          {locale === "ja" ? "EN" : "日本語"}
        </button>
      </div>

      <nav className="atelier-corner is-bl" data-ui aria-label={at.help}>
        <button
          type="button"
          className="atelier-link"
          onClick={props.onToggleHelp}
          aria-expanded={props.helpOpen}
          aria-controls="atelier-help"
        >
          {at.help}
        </button>
        <button
          type="button"
          className="atelier-link"
          onClick={props.onToggleIndex}
          aria-expanded={props.indexOpen}
          aria-controls="atelier-index"
        >
          {at.index}
        </button>
        <button type="button" className="atelier-link" onClick={props.onContact}>
          {at.contact}
        </button>
      </nav>
    </>
  );
}

export function HelpPopover({ at, onClose }: { at: AtelierText; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const id = window.setTimeout(() => ref.current?.focus({ preventScroll: true }), 0);
    return () => window.clearTimeout(id);
  }, []);
  return (
    <div
      id="atelier-help"
      ref={ref}
      tabIndex={-1}
      data-ui
      className="atelier-sheet is-help"
      role="dialog"
      aria-label={at.help}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          e.stopPropagation();
          onClose();
        }
      }}
    >
      <ol>
        {at.helpSteps.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ol>
      <p>{at.helpMore}</p>
      <p className="atelier-sheet-fine">{at.helpShortcuts}</p>
      <button type="button" className="atelier-sheet-close" onClick={onClose} aria-label={at.close}>
        ×
      </button>
    </div>
  );
}

export function IndexSheet({
  at,
  locale,
  onPick,
  onClose,
}: {
  at: AtelierText;
  locale: Locale;
  onPick: (topic: TopicId) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const id = window.setTimeout(() => ref.current?.querySelector<HTMLElement>("button")?.focus({ preventScroll: true }), 0);
    return () => window.clearTimeout(id);
  }, []);
  return (
    <div
      id="atelier-index"
      ref={ref}
      data-ui
      className="atelier-sheet is-index"
      role="dialog"
      aria-label={at.index}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          e.stopPropagation();
          onClose();
        }
      }}
    >
      <p className="atelier-sheet-intro">{at.indexIntro}</p>
      <ul>
        {TOPICS.map((tp) => (
          <li key={tp.id}>
            <button type="button" onClick={() => onPick(tp.id)}>
              <span>{tp.name[locale]}</span>
              <small>{tp.hint[locale]}</small>
            </button>
          </li>
        ))}
      </ul>
      <button type="button" className="atelier-sheet-close" onClick={onClose} aria-label={at.close}>
        ×
      </button>
    </div>
  );
}
