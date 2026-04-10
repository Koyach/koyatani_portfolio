"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import type { ProjectDetail } from "@/data/projects";

function t<T extends { ja: string; en: string }>(
  obj: T | undefined,
  locale: "ja" | "en"
): string {
  return obj?.[locale] ?? "";
}

export default function ProjectDetailClient({
  project,
}: {
  project: ProjectDetail;
}) {
  const { locale } = useLanguage();

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Back nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-primary)]/90 backdrop-blur-md border-b border-[var(--border)]">
        <div className="mx-auto max-w-[var(--max-content)] px-[var(--space-md)] py-4 flex items-center justify-between">
          <Link
            href="/#projects"
            className="flex items-center gap-2 text-[0.8rem] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Back
          </Link>
          <span className="font-[family-name:var(--font-dm-mono)] text-[0.7rem] text-[var(--text-tertiary)] tracking-wider uppercase">
            {project.tag}
          </span>
        </div>
      </nav>

      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-[var(--max-content)] px-[var(--space-md)]">
          {/* Header */}
          <header className="mb-16">
            <span className="font-[family-name:var(--font-dm-mono)] text-[0.7rem] text-[var(--accent)] tracking-wider uppercase">
              {project.tag}
            </span>
            <h1 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(2.5rem,8vw,5rem)] font-bold leading-[0.95] mt-3">
              {t(project.title, locale)}
            </h1>
            {project.subtitle && (
              <p className="text-[1.1rem] text-[var(--text-tertiary)] mt-3">
                {t(project.subtitle, locale)}
              </p>
            )}
            <div className="flex flex-wrap gap-6 mt-6 text-[0.85rem]">
              <span className="text-[var(--text-secondary)]">
                {t(project.role, locale)}
              </span>
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent)] hover:text-[var(--accent-light)] transition-colors flex items-center gap-1"
                >
                  Visit
                  <svg
                    className="w-3.5 h-3.5"
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
              )}
            </div>
          </header>

          {/* Images */}
          {project.images && project.images.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
              {project.images.map((src, i) => (
                <div
                  key={src}
                  className={`relative aspect-[16/9] rounded-lg overflow-hidden ${
                    project.images!.length === 1 ? "md:col-span-2" : ""
                  }`}
                >
                  <Image
                    src={src}
                    alt={`${t(project.title, locale)} ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={i === 0}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Description */}
          <div className="max-w-[var(--max-text)] mb-16">
            <p className="text-[1.05rem] leading-relaxed text-[var(--text-secondary)]">
              {t(project.longDescription ?? project.description, locale)}
            </p>
          </div>

          {/* Stats */}
          {project.stats && project.stats.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 py-10 border-t border-b border-[var(--border)]">
              {project.stats.map((stat) => (
                <div key={stat.value}>
                  <div className="stat-number">{stat.value}</div>
                  <div className="stat-label">{t(stat.label, locale)}</div>
                </div>
              ))}
            </div>
          )}

          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="mb-16">
              <h2 className="text-[0.7rem] font-medium tracking-[0.2em] uppercase text-[var(--text-tertiary)] mb-6">
                Highlights
              </h2>
              <ul className="space-y-4 max-w-[var(--max-text)]">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex gap-4 text-[0.95rem]">
                    <span className="font-[family-name:var(--font-dm-mono)] text-[0.7rem] text-[var(--text-tertiary)] mt-1 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[var(--text-secondary)]">
                      {t(h, locale)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Timeline */}
          {project.timeline && project.timeline.length > 0 && (
            <div className="mb-16">
              <h2 className="text-[0.7rem] font-medium tracking-[0.2em] uppercase text-[var(--text-tertiary)] mb-6">
                Timeline
              </h2>
              <div className="relative pl-8 border-l border-[var(--border)] space-y-8">
                {project.timeline.map((item) => (
                  <div key={item.date} className="relative">
                    <div className="absolute -left-[calc(2rem+5px)] w-[10px] h-[10px] rounded-full bg-[var(--accent)] top-1" />
                    <span className="font-[family-name:var(--font-dm-mono)] text-[0.75rem] text-[var(--accent)] tracking-wider">
                      {item.date}
                    </span>
                    <p className="text-[0.95rem] text-[var(--text-secondary)] mt-1">
                      {t(item.event, locale)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reflection */}
          {project.reflection && (
            <blockquote className="pl-6 border-l-2 border-[var(--accent)] text-[1rem] italic text-[var(--text-secondary)] max-w-[var(--max-text)]">
              {t(project.reflection, locale)}
            </blockquote>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="px-[var(--space-md)] py-10 border-t border-[var(--border)]">
        <div className="mx-auto max-w-[var(--max-content)] text-center">
          <Link
            href="/#projects"
            className="text-[0.85rem] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
          >
            ← All Projects
          </Link>
        </div>
      </footer>
    </div>
  );
}
