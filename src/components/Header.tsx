"use client";

import { useState, useEffect } from "react";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Media", href: "#media" },
  { label: "Skiing", href: "#skiing" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Skip link */}
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
              className="text-[0.75rem] font-medium tracking-[0.15em] uppercase text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2"
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

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden border-t border-[var(--border)] bg-[var(--bg-primary)]/95 backdrop-blur-md">
          <div className="flex flex-col px-[var(--space-md)] py-6 gap-5">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-[0.8rem] font-medium tracking-[0.15em] uppercase text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      )}
      </header>
    </>
  );
}
