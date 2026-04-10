"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";

interface PaletteItem {
  id: string;
  label: string;
  sublabel?: string;
  category: string;
  action: () => void;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const items: PaletteItem[] = [
    // Sections
    { id: "about", label: "About", sublabel: "Profile & principles", category: "Sections", action: () => navigate("#about") },
    { id: "projects", label: "Projects", sublabel: "Mirakoe, Bedrock, Noto", category: "Sections", action: () => navigate("#projects") },
    { id: "achievements", label: "Achievements", sublabel: "Awards & programs", category: "Sections", action: () => navigate("#achievements") },
    { id: "media", label: "Media", sublabel: "TV, press, speaking", category: "Sections", action: () => navigate("#media") },
    { id: "skiing", label: "Skiing", sublabel: "Freestyle & alpine", category: "Sections", action: () => navigate("#skiing") },
    { id: "contact", label: "Contact", sublabel: "SNS & scheduling", category: "Sections", action: () => navigate("#contact") },
    // Pages
    { id: "blog", label: "Blog", sublabel: "Thoughts & notes", category: "Pages", action: () => router.push("/blog") },
    { id: "bookshelf", label: "Bookshelf", sublabel: "Recommended books", category: "Pages", action: () => router.push("/bookshelf") },
    { id: "p-mirakoe", label: "Mirakoe", sublabel: "Project detail", category: "Projects", action: () => router.push("/projects/mirakoe") },
    { id: "p-bedrock", label: "Bedrock Space", sublabel: "Project detail", category: "Projects", action: () => router.push("/projects/bedrock-space") },
    { id: "p-noto", label: "Noto Lacquerware", sublabel: "Project detail", category: "Projects", action: () => router.push("/projects/noto") },
    // Easter eggs
    { id: "ee-ski", label: "ski", sublabel: "Watch freestyle video", category: "Easter Eggs", action: () => window.open("https://www.instagram.com/koyatani_0828", "_blank") },
    { id: "ee-home", label: "home", sublabel: "Go to top", category: "Easter Eggs", action: () => navigate("#") },
  ];

  function navigate(hash: string) {
    if (window.location.pathname !== "/") {
      router.push("/" + hash);
    } else {
      const el = document.querySelector(hash === "#" ? "body" : hash);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  }

  const filtered = query
    ? items.filter(
        (item) =>
          item.label.toLowerCase().includes(query.toLowerCase()) ||
          (item.sublabel?.toLowerCase().includes(query.toLowerCase()) ?? false)
      )
    : items.filter((item) => item.category !== "Easter Eggs");

  const grouped = filtered.reduce<Record<string, PaletteItem[]>>(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    },
    {}
  );

  const toggle = useCallback(() => {
    setOpen((prev) => {
      if (!prev) {
        setQuery("");
        setSelectedIndex(0);
      }
      return !prev;
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        toggle();
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggle]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyNav = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[selectedIndex]?.action();
      setOpen(false);
    }
  };

  if (!open) return null;

  let flatIndex = 0;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center pt-[20vh]"
      onClick={() => setOpen(false)}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative w-[min(560px,90vw)] bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--border)]">
          <svg
            className="w-4 h-4 text-[var(--text-tertiary)] shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyNav}
            placeholder="Type a command or search..."
            className="flex-1 bg-transparent text-[0.95rem] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none font-[family-name:var(--font-dm-mono)]"
          />
          <kbd className="text-[0.6rem] text-[var(--text-tertiary)] border border-[var(--border)] px-1.5 py-0.5 rounded font-[family-name:var(--font-dm-mono)]">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[320px] overflow-y-auto py-2">
          {filtered.length === 0 ? (
            <div className="px-5 py-8 text-center text-[0.85rem] text-[var(--text-tertiary)]">
              No results found.
            </div>
          ) : (
            Object.entries(grouped).map(([category, categoryItems]) => (
              <div key={category}>
                <div className="px-5 py-2 text-[0.6rem] font-medium tracking-[0.2em] uppercase text-[var(--text-tertiary)]">
                  {category}
                </div>
                {categoryItems.map((item) => {
                  const currentIndex = flatIndex++;
                  const isSelected = currentIndex === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      className={`w-full flex items-center justify-between px-5 py-2.5 text-left transition-colors ${
                        isSelected
                          ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                          : "text-[var(--text-secondary)] hover:bg-[var(--snow-dim)]"
                      }`}
                      onClick={() => {
                        item.action();
                        setOpen(false);
                      }}
                      onMouseEnter={() => setSelectedIndex(currentIndex)}
                    >
                      <div>
                        <span className="text-[0.9rem]">{item.label}</span>
                        {item.sublabel && (
                          <span className="ml-2 text-[0.75rem] text-[var(--text-tertiary)]">
                            {item.sublabel}
                          </span>
                        )}
                      </div>
                      {isSelected && (
                        <span className="text-[0.6rem] text-[var(--text-tertiary)] font-[family-name:var(--font-dm-mono)]">
                          Enter
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer hint */}
        <div className="px-5 py-2.5 border-t border-[var(--border)] flex items-center gap-4 text-[0.6rem] text-[var(--text-tertiary)] font-[family-name:var(--font-dm-mono)]">
          <span>
            <kbd className="border border-[var(--border)] px-1 py-0.5 rounded mr-1">↑↓</kbd>
            navigate
          </span>
          <span>
            <kbd className="border border-[var(--border)] px-1 py-0.5 rounded mr-1">Enter</kbd>
            select
          </span>
          <span>
            <kbd className="border border-[var(--border)] px-1 py-0.5 rounded mr-1">Esc</kbd>
            close
          </span>
        </div>
      </div>
    </div>
  );
}
