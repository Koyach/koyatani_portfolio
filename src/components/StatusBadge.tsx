"use client";

import { useEffect, useState } from "react";

type Status = { text: string; emoji: string };

export default function StatusBadge() {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    fetch("/api/status")
      .then((r) => r.json())
      .then((data) => {
        if (data.text) setStatus(data);
      })
      .catch(() => {});
  }, []);

  const displayText = status?.text || "Online";
  const displayEmoji = status?.emoji || "";

  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
      style={{
        background: "var(--snow-dim)",
        border: "1px solid var(--border)",
        color: "var(--text-secondary)",
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full animate-pulse"
        style={{ background: "var(--accent)" }}
      />
      {displayEmoji && <span>{displayEmoji}</span>}
      <span className="font-mono text-[0.7rem]">{displayText}</span>
    </div>
  );
}
