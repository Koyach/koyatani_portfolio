"use client";

import { useLanguage } from "@/lib/LanguageContext";

export default function Media() {
  const { t } = useLanguage();

  return (
    <section id="media" className="section-padding">
      <div className="mx-auto max-w-[var(--max-content)]">
        <div className="section-label fade-in">{t.media.label}</div>

        <h2 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(1.6rem,3vw,2.4rem)] font-semibold mb-12 fade-in">
          {t.media.heading}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {t.media.categories.map((group, gi) => (
            <div
              key={gi}
              className={`fade-in fade-in-delay-${Math.min(gi + 1, 4)}`}
            >
              <h3 className="text-[0.7rem] font-medium tracking-[0.2em] uppercase text-[var(--accent)] mb-6 pb-3 border-b border-[var(--border)]">
                {group.category}
              </h3>
              <ul className="space-y-6">
                {group.items.map((item, ii) => (
                  <li key={ii}>
                    {"url" in item && item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group"
                      >
                        <p className="text-[0.95rem] font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                          {item.title}
                          <svg
                            aria-hidden="true"
                            className="inline-block w-3.5 h-3.5 ml-1.5 text-[var(--text-tertiary)] group-hover:text-[var(--accent)] transition-colors"
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
                        </p>
                        <p className="text-[0.8rem] text-[var(--text-secondary)] mt-1">
                          {item.detail}
                        </p>
                      </a>
                    ) : (
                      <>
                        <p className="text-[0.95rem] font-medium text-[var(--text-primary)]">
                          {item.title}
                        </p>
                        <p className="text-[0.8rem] text-[var(--text-secondary)] mt-1">
                          {item.detail}
                        </p>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
