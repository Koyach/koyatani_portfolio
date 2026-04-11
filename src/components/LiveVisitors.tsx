"use client";

import { useEffect, useState } from "react";

export default function LiveVisitors() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let active = true;

    async function fetchCount() {
      try {
        const res = await fetch("/api/visitors");
        if (res.ok) {
          const data = await res.json();
          if (active) setCount(data.count);
        }
      } catch {
        // Silently fail
      }
    }

    fetchCount();
    const interval = setInterval(fetchCount, 30_000); // Refresh every 30s

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  if (count === null) return null;

  const displayCount = Math.max(count, 1); // At least 1 (the current viewer)

  return (
    <div className="flex items-center gap-2">
      <span
        className="w-2 h-2 rounded-full animate-pulse"
        style={{ background: "#4ade80" }}
      />
      <span
        className="text-xs font-mono"
        style={{ color: "var(--text-tertiary)" }}
      >
        {displayCount} {displayCount === 1 ? "visitor" : "visitors"} now
      </span>
    </div>
  );
}
