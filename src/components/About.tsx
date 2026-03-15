"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="section-padding">
      <div className="mx-auto max-w-[var(--max-content)]">
        <div className="section-label fade-in">{t.about.label}</div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[var(--space-lg)]">
          <div className="lg:col-span-7 fade-in fade-in-delay-1">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(1.8rem,4vw,2.8rem)] font-semibold leading-tight mb-8">
              {t.about.heading1}
              <br />
              <span className="text-[var(--text-secondary)]">
                {t.about.heading2}
              </span>
            </h2>

            <div className="relative aspect-[3/2] rounded-lg overflow-hidden mb-8">
              <Image
                src="/images/political_photo.jpg"
                alt={t.about.profileAlt}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
            </div>

            <div className="space-y-5 text-[0.95rem] leading-relaxed text-[var(--text-secondary)] max-w-[var(--max-text)]">
              <p>{t.about.bio1}</p>
              <p>{t.about.bio2}</p>
              <p>{t.about.bio3}</p>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-10">
            <div className="fade-in fade-in-delay-2">
              <h3 className="text-[0.7rem] font-medium tracking-[0.2em] uppercase text-[var(--text-tertiary)] mb-5">
                {t.about.principlesLabel}
              </h3>
              <ul className="space-y-3">
                {t.about.principles.map((p, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="font-[family-name:var(--font-dm-mono)] text-[0.7rem] text-[var(--accent)] mt-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[0.9rem] text-[var(--text-secondary)]">
                      {p}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="fade-in fade-in-delay-3">
              <h3 className="text-[0.7rem] font-medium tracking-[0.2em] uppercase text-[var(--text-tertiary)] mb-5">
                {t.about.internationalLabel}
              </h3>
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-5">
                <Image
                  src="/images/IMG_4898.jpg"
                  alt={t.about.kenyaAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  loading="lazy"
                />
              </div>
              <ul className="space-y-3">
                {t.about.international.map((item, i) => (
                  <li
                    key={i}
                    className="text-[0.85rem] text-[var(--text-secondary)] pl-4 border-l border-[var(--border)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="fade-in fade-in-delay-4">
              <h3 className="text-[0.7rem] font-medium tracking-[0.2em] uppercase text-[var(--text-tertiary)] mb-5">
                {t.about.academicsLabel}
              </h3>
              <p className="text-[0.85rem] text-[var(--text-secondary)]">
                {t.about.academics1}
                <br />
                {t.about.academics2}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
