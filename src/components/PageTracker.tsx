"use client";

import { useEffect, useRef } from "react";

export default function PageTracker() {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;

    // Don't track admin pages
    if (window.location.pathname.startsWith("/admin")) return;

    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: window.location.pathname,
        referrer: document.referrer || null,
      }),
    }).catch(() => {
      // Silently fail — analytics should never break the site
    });
  }, []);

  return null;
}
