"use client";

import { useId } from "react";
import type { AtelierText } from "@/lib/atelier/text";

interface Props {
  phase: "none" | "ask" | "demo";
  reducedMotion: boolean;
  at: AtelierText;
}

/**
 * After a pause: a small question. After a longer pause: a faint, silent
 * demonstration — a word writes itself, it is read, and a sheet unfolds.
 * Gone the moment the visitor touches the canvas.
 */
export default function Onboarding({ phase, reducedMotion, at }: Props) {
  const clipId = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  if (phase === "none") return null;
  return (
    <div className={`atelier-onboarding ${phase === "demo" ? "is-demo" : ""}`} aria-live="polite">
      <p className="atelier-ask">{at.ask}</p>

      {phase === "demo" && (
        <div className={`atelier-demo ${reducedMotion ? "is-static" : ""}`} aria-hidden="true">
          <svg viewBox="0 0 320 130" width="320" height="130">
            <defs>
              <clipPath id={`demo-reveal-${clipId}`}>
                <rect className="demo-reveal-rect" x="14" y="20" width="0" height="70" />
              </clipPath>
            </defs>

            {/* the visitor's hand */}
            <text className="demo-hand" x="18" y="62" clipPath={`url(#demo-reveal-${clipId})`}>
              {at.demoWord}
            </text>
            {/* what it was read as */}
            <text className="demo-read" x="18" y="84">
              {at.demoWord}
            </text>

            <path className="demo-thread" d="M126 52 Q148 48 166 38" />
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
