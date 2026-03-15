"use client";

import { useLanguage } from "@/lib/LanguageContext";

const ACHIEVEMENT_URLS: Record<number, string> = {
  0: "https://okimotofellowship.svjp.org/2025jpcohort-jp",
};

export default function Achievements() {
  const { t } = useLanguage();

  return (
    <section
      id="achievements"
      className="section-padding bg-[var(--bg-secondary)]"
    >
      <div className="mx-auto max-w-[var(--max-content)]">
        <div className="section-label fade-in">{t.achievements.label}</div>

        <div className="space-y-0 mb-16">
          {t.achievements.items.map((a, i) => {
            const featured = i < 2;
            const url = ACHIEVEMENT_URLS[i];

            return (
              <div
                key={i}
                className={`fade-in fade-in-delay-${Math.min(i + 1, 4)} grid grid-cols-[80px_1fr] md:grid-cols-[120px_1fr] gap-6 py-8 border-b border-[var(--border)] ${
                  featured ? "" : "opacity-80"
                }`}
              >
                <span className="font-[family-name:var(--font-dm-mono)] text-[0.8rem] text-[var(--text-tertiary)] pt-1">
                  {a.year}
                </span>
                <div>
                  <h3
                    className={`font-[family-name:var(--font-space-grotesk)] font-semibold leading-snug ${
                      featured
                        ? "text-[clamp(1.1rem,2.5vw,1.5rem)]"
                        : "text-[1rem]"
                    }`}
                  >
                    {url ? (
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[var(--accent)] transition-colors"
                      >
                        {a.title}
                        <svg
                          aria-hidden="true"
                          className="inline-block w-3.5 h-3.5 ml-1.5 text-[var(--text-tertiary)]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                          />
                        </svg>
                      </a>
                    ) : (
                      a.title
                    )}
                    {featured && (
                      <span className="inline-block ml-3 w-2 h-2 rounded-full bg-[var(--accent)] align-middle" />
                    )}
                  </h3>
                  <p className="text-[0.85rem] text-[var(--text-secondary)] mt-2">
                    {a.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="fade-in">
          <h3 className="text-[0.7rem] font-medium tracking-[0.2em] uppercase text-[var(--text-tertiary)] mb-6">
            {t.achievements.affiliationsLabel}
          </h3>
          <div className="flex flex-wrap gap-3">
            {t.achievements.affiliations.map((a, i) => (
              <span
                key={i}
                className="text-[0.8rem] text-[var(--text-secondary)] px-4 py-2 border border-[var(--border)] rounded-full"
              >
                {a}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
