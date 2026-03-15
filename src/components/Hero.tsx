"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[100svh] flex items-end pb-[var(--space-lg)] md:pb-[var(--space-xl)] px-[var(--space-sm)] md:px-[var(--space-md)]">
      <div className="absolute inset-0">
        <Image
          src="/images/profile.JPG"
          alt={t.hero.name}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)]/60 via-[var(--bg-primary)]/40 to-[var(--bg-primary)]" />
      </div>

      <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-[var(--accent-glow)] blur-[120px] pointer-events-none" />

      <div className="relative mx-auto w-full max-w-[var(--max-content)]">
        <div className="mb-8">
          <p className="text-[0.7rem] font-medium tracking-[0.25em] uppercase text-[var(--accent)] mb-6">
            {t.hero.badge}
          </p>
          <h1 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(3rem,10vw,8rem)] font-bold leading-[0.9] tracking-tight">
            {t.hero.name}
          </h1>
          <p className="font-[family-name:var(--font-dm-mono)] text-[clamp(0.9rem,2vw,1.2rem)] text-[var(--text-secondary)] mt-4 tracking-wider">
            {t.hero.nameEn}
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <p className="max-w-[440px] text-[0.95rem] leading-relaxed text-[var(--text-secondary)]">
            {t.hero.tagline1}
            <br />
            {t.hero.tagline2}
          </p>

          <div className="flex items-center gap-3 text-[var(--text-tertiary)]">
            <div className="w-[1px] h-12 bg-[var(--text-tertiary)] animate-pulse" />
            <span className="text-[0.65rem] tracking-[0.2em] uppercase">
              {t.hero.scroll}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
