"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

export default function Header() {
  const { t, locale, toggleLocale } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const menuAreaRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const NAV_ITEMS = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.achievements, href: "#achievements" },
    { label: t.nav.media, href: "#media" },
    { label: t.nav.skiing, href: "#skiing" },
    { label: t.nav.contact, href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: "-40% 0px -60% 0px" }
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  });

  const openMenu = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setMenuOpen(true);
  }, []);

  const startClose = useCallback(() => {
    closeTimerRef.current = setTimeout(() => {
      setMenuOpen(false);
    }, 200);
  }, []);

  // Close on escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-[var(--accent)] focus:text-white focus:px-4 focus:py-2 focus:rounded"
      >
        Skip to content
      </a>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled || menuOpen
            ? "bg-[var(--bg-primary)]/90 backdrop-blur-md border-b border-[var(--border)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[var(--max-content)] items-center justify-between px-[var(--space-md)] py-4">
          <a
            href="#"
            className="font-[family-name:var(--font-space-grotesk)] text-sm font-semibold tracking-widest uppercase"
          >
            K.T.
          </a>

          {/* Right side: language toggle + menu trigger */}
          <div
            ref={menuAreaRef}
            className="relative flex items-center gap-3"
            onMouseEnter={openMenu}
            onMouseLeave={startClose}
          >
            <button
              onClick={toggleLocale}
              className="font-[family-name:var(--font-dm-mono)] text-[0.7rem] tracking-wider text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors border border-[var(--border)] hover:border-[var(--border-hover)] px-2.5 py-1 rounded-full"
              aria-label={locale === "ja" ? "Switch to English" : "日本語に切替"}
            >
              {locale === "ja" ? "EN" : "JA"}
            </button>

            {/* Hamburger icon */}
            <button
              className="flex flex-col gap-[5px] p-2"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              <span
                aria-hidden="true"
                className={`block h-[1.5px] w-5 bg-[var(--text-primary)] transition-all duration-300 ${
                  menuOpen ? "translate-y-[6.5px] rotate-45" : ""
                }`}
              />
              <span
                aria-hidden="true"
                className={`block h-[1.5px] w-5 bg-[var(--text-primary)] transition-all duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                aria-hidden="true"
                className={`block h-[1.5px] w-5 bg-[var(--text-primary)] transition-all duration-300 ${
                  menuOpen ? "-translate-y-[6.5px] -rotate-45" : ""
                }`}
              />
            </button>

            {/* Dropdown menu — expands from the hamburger */}
            <nav
              className={`absolute top-full right-0 mt-3 w-[min(300px,calc(100vw-2rem))] bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl shadow-2xl transition-all duration-300 origin-top-right ${
                menuOpen
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-90 -translate-y-2 pointer-events-none"
              }`}
              onMouseEnter={openMenu}
              onMouseLeave={startClose}
            >
              <div className="py-2">
                {NAV_ITEMS.map((item, i) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-3 px-5 py-3 text-[0.85rem] font-medium tracking-[0.1em] uppercase transition-colors hover:bg-[var(--snow-dim)] ${
                      activeSection === item.href
                        ? "text-[var(--accent)]"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    <span className="font-[family-name:var(--font-dm-mono)] text-[0.6rem] text-[var(--text-tertiary)] w-5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.label}
                  </a>
                ))}

                <div className="mx-5 my-1.5 h-[1px] bg-[var(--border)]" />

                <Link
                  href="/blog"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-5 py-3 text-[0.85rem] font-medium tracking-[0.1em] uppercase text-[var(--text-secondary)] hover:text-[var(--accent)] hover:bg-[var(--snow-dim)] transition-colors"
                >
                  <span className="font-[family-name:var(--font-dm-mono)] text-[0.6rem] text-[var(--text-tertiary)] w-5">
                    →
                  </span>
                  Blog
                </Link>
                <Link
                  href="/bookshelf"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-5 py-3 text-[0.85rem] font-medium tracking-[0.1em] uppercase text-[var(--text-secondary)] hover:text-[var(--accent)] hover:bg-[var(--snow-dim)] transition-colors"
                >
                  <span className="font-[family-name:var(--font-dm-mono)] text-[0.6rem] text-[var(--text-tertiary)] w-5">
                    →
                  </span>
                  Bookshelf
                </Link>
              </div>

              <div className="px-5 py-2.5 border-t border-[var(--border)] flex items-center gap-2">
                <kbd className="font-[family-name:var(--font-dm-mono)] text-[0.55rem] text-[var(--text-tertiary)] border border-[var(--border)] px-1.5 py-0.5 rounded">
                  ⌘K
                </kbd>
                <span className="font-[family-name:var(--font-dm-mono)] text-[0.6rem] text-[var(--text-tertiary)]">
                  Quick search
                </span>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
