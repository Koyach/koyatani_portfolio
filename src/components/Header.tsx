"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/lib/LanguageContext";

export default function Header() {
  const { t, locale, toggleLocale } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const menuRef = useRef<HTMLElement>(null);

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
          scrolled
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

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-[0.75rem] font-medium tracking-[0.15em] uppercase transition-colors hover:text-[var(--text-primary)] ${
                  activeSection === item.href
                    ? "text-[var(--accent)]"
                    : "text-[var(--text-secondary)]"
                }`}
              >
                {item.label}
              </a>
            ))}
            {/* Language toggle */}
            <button
              onClick={toggleLocale}
              className="font-[family-name:var(--font-dm-mono)] text-[0.75rem] tracking-wider text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors border border-[var(--border)] hover:border-[var(--border-hover)] px-3 py-1 rounded-full"
              aria-label={locale === "ja" ? "Switch to English" : "日本語に切替"}
            >
              {locale === "ja" ? "EN" : "JA"}
            </button>
          </nav>

          {/* Mobile: language toggle + hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleLocale}
              className="font-[family-name:var(--font-dm-mono)] text-[0.7rem] tracking-wider text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors border border-[var(--border)] px-2.5 py-1 rounded-full"
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
                className={`block h-[1.5px] w-5 bg-[var(--text-primary)] transition-transform ${
                  menuOpen ? "translate-y-[6.5px] rotate-45" : ""
                }`}
              />
              <span
                aria-hidden="true"
                className={`block h-[1.5px] w-5 bg-[var(--text-primary)] transition-opacity ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                aria-hidden="true"
                className={`block h-[1.5px] w-5 bg-[var(--text-primary)] transition-transform ${
                  menuOpen ? "-translate-y-[6.5px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <nav
          ref={menuRef}
          className={`md:hidden border-t border-[var(--border)] bg-[var(--bg-primary)]/95 backdrop-blur-md overscroll-contain overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
            menuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0 border-transparent"
          }`}
        >
          <div className="flex flex-col px-[var(--space-sm)] py-4 gap-0">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`text-[0.85rem] font-medium tracking-[0.15em] uppercase hover:text-[var(--text-primary)] py-3.5 px-2 min-h-[44px] flex items-center transition-colors ${
                  activeSection === item.href
                    ? "text-[var(--accent)]"
                    : "text-[var(--text-secondary)]"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </header>
    </>
  );
}
