"use client";

import type { AtelierText } from "@/lib/atelier/text";

interface Props {
  phase: "none" | "ask" | "demo";
  reducedMotion: boolean;
  at: AtelierText;
}

/**
 * After a pause: a small question. After a longer pause: a faint, silent
 * demonstration — a box draws itself, a word appears, a sheet unfolds.
 * Gone the moment the visitor touches the canvas.
 */
export default function Onboarding({ phase, reducedMotion, at }: Props) {
  if (phase === "none") return null;
  return (
    <div className={`atelier-onboarding ${phase === "demo" ? "is-demo" : ""}`} aria-live="polite">
      <p className="atelier-ask">{at.ask}</p>

      {phase === "demo" && (
        <div className={`atelier-demo ${reducedMotion ? "is-static" : ""}`} aria-hidden="true">
          <svg viewBox="0 0 320 130" width="320" height="130">
            <path
              className="demo-box"
              d="M24 22 C60 18 96 20 130 21 C133 44 131 68 130 92 C96 95 60 94 25 93 C22 70 23 46 24 22 Z"
            />
            <text className="demo-word" x="77" y="62">
              {at.demoWord}
            </text>
            <path className="demo-thread" d="M130 40 Q150 42 166 34" />
            <g className="demo-panel">
              <rect x="166" y="22" width="132" height="86" rx="1.5" />
              <line x1="180" y1="40" x2="240" y2="40" />
              <line x1="180" y1="56" x2="284" y2="56" />
              <line x1="180" y1="68" x2="270" y2="68" />
              <line x1="180" y1="80" x2="278" y2="80" />
            </g>
          </svg>
          <p className="atelier-demo-caption">{at.demoCaption}</p>
        </div>
      )}
    </div>
  );
}
