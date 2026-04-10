"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

export default function Header() {
  const { t, locale, toggleLocale } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

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

  // Close menu on escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKey);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [menuOpen]);

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

          {/* Right side: language toggle + hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleLocale}
              className="font-[family-name:var(--font-dm-mono)] text-[0.7rem] tracking-wider text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors border border-[var(--border)] hover:border-[var(--border-hover)] px-2.5 py-1 rounded-full"
              aria-label={locale === "ja" ? "Switch to English" : "日本語に切替"}
            >
              {locale === "ja" ? "EN" : "JA"}
            </button>
            <button
              className="flex flex-col gap-[5px] p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span
                aria-hidden="true"
                className={`block h-[1.5px] w-5 bg-[var(--text-primary)] transition-transform duration-300 ${
                  menuOpen ? "translate-y-[6.5px] rotate-45" : ""
                }`}
              />
              <span
                aria-hidden="true"
                className={`block h-[1.5px] w-5 bg-[var(--text-primary)] transition-opacity duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                aria-hidden="true"
                className={`block h-[1.5px] w-5 bg-[var(--text-primary)] transition-transform duration-300 ${
                  menuOpen ? "-translate-y-[6.5px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Full overlay menu */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />

        {/* Menu panel */}
        <nav
          className={`absolute top-[60px] right-4 md:right-8 w-[min(320px,calc(100vw-2rem))] bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl overflow-hidden shadow-2xl transition-transform duration-300 origin-top-right ${
            menuOpen ? "scale-100" : "scale-95"
          }`}
        >
          <div className="py-3">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 px-6 py-3.5 text-[0.85rem] font-medium tracking-[0.1em] uppercase transition-colors hover:bg-[var(--snow-dim)] ${
                  activeSection === item.href
                    ? "text-[var(--accent)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                <span className="font-[family-name:var(--font-dm-mono)] text-[0.6rem] text-[var(--text-tertiary)] w-5">
                  {String(NAV_ITEMS.indexOf(item) + 1).padStart(2, "0")}
                </span>
                {item.label}
              </a>
            ))}

            {/* Divider */}
            <div className="mx-6 my-2 h-[1px] bg-[var(--border)]" />

            {/* Blog */}
            <Link
              href="/blog"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 px-6 py-3.5 text-[0.85rem] font-medium tracking-[0.1em] uppercase text-[var(--text-secondary)] hover:text-[var(--accent)] hover:bg-[var(--snow-dim)] transition-colors"
            >
              <span className="font-[family-name:var(--font-dm-mono)] text-[0.6rem] text-[var(--text-tertiary)] w-5">
                →
              </span>
              Blog
            </Link>
          </div>

          {/* Cmd+K hint */}
          <div className="px-6 py-3 border-t border-[var(--border)] flex items-center gap-2">
            <kbd className="font-[family-name:var(--font-dm-mono)] text-[0.55rem] text-[var(--text-tertiary)] border border-[var(--border)] px-1.5 py-0.5 rounded">
              ⌘K
            </kbd>
            <span className="font-[family-name:var(--font-dm-mono)] text-[0.6rem] text-[var(--text-tertiary)]">
              Quick search
            </span>
          </div>
        </nav>
      </div>
    </>
  );
}
