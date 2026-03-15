"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";

export default function Skiing() {
  const { t } = useLanguage();

  return (
    <section id="skiing" className="section-padding bg-[var(--bg-secondary)]">
      <div className="mx-auto max-w-[var(--max-content)]">
        <div className="section-label fade-in">{t.skiing.label}</div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[var(--space-lg)]">
          <div className="lg:col-span-5 fade-in fade-in-delay-1">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight mb-6">
              {t.skiing.heading1}
              <span className="text-[var(--text-tertiary)]"> &times; </span>
              {t.skiing.heading2}
            </h2>
            <p className="text-[0.95rem] text-[var(--text-secondary)] leading-relaxed mb-8">
              {t.skiing.description}
            </p>

            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/images/skiing.jpg"
                alt={t.skiing.photoAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
                loading="lazy"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="fade-in fade-in-delay-2">
              <h3 className="text-[0.7rem] font-medium tracking-[0.2em] uppercase text-[var(--text-tertiary)] mb-6">
                {t.skiing.resultsLabel}
              </h3>

              <div className="space-y-0">
                {t.skiing.results.map((r, i) => (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row sm:items-baseline justify-between py-5 border-b border-[var(--border)] gap-1 sm:gap-4"
                  >
                    <span className="text-[0.9rem] text-[var(--text-secondary)]">
                      {r.event}
                    </span>
                    <span
                      className={`font-[family-name:var(--font-dm-mono)] text-[0.85rem] shrink-0 ${
                        r.highlight
                          ? "text-[var(--accent)] font-medium"
                          : "text-[var(--text-secondary)]"
                      }`}
                    >
                      {r.result}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 fade-in fade-in-delay-3">
              <h3 className="text-[0.7rem] font-medium tracking-[0.2em] uppercase text-[var(--text-tertiary)] mb-5">
                {t.skiing.othersLabel}
              </h3>
              <ul className="space-y-3">
                {t.skiing.others.map((e, i) => (
                  <li
                    key={i}
                    className="text-[0.85rem] text-[var(--text-secondary)] pl-4 border-l border-[var(--border)]"
                  >
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
