"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

export default function Projects() {
  const { t } = useLanguage();

  const projects = [
    {
      id: "mirakoe",
      slug: "mirakoe",
      ...t.projects.mirakoe,
      image: "/images/miraisenkyo_photo.jpg",
      imageAlt: "Mirai Election",
      url: "https://miracoe.org/",
    },
    {
      id: "bedrock",
      slug: "bedrock-space",
      ...t.projects.bedrock,
      subtitle: "",
      stats: [],
      highlights: [],
      image: null,
      url: "",
    },
    {
      id: "noto",
      slug: "noto",
      ...t.projects.noto,
      subtitle: "",
      stats: [],
      highlights: [],
      image: null,
      url: "",
    },
  ];

  return (
    <section id="projects" className="section-padding">
      <div className="mx-auto max-w-[var(--max-content)]">
        <div className="section-label fade-in">{t.projects.label}</div>

        <div className="space-y-24">
          {projects.map((project) => (
            <article key={project.id} className="fade-in">
              <div className="mb-8">
                <span className="font-[family-name:var(--font-dm-mono)] text-[0.7rem] text-[var(--accent)] tracking-wider uppercase">
                  {project.tag}
                </span>
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight mt-2">
                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[var(--accent)] transition-colors"
                    >
                      {project.title}
                      <svg
                        aria-hidden="true"
                        className="inline-block w-5 h-5 ml-2 text-[var(--text-tertiary)]"
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
                    project.title
                  )}
                </h3>
                {project.subtitle && (
                  <p className="text-[var(--text-tertiary)] text-[0.9rem] mt-1">
                    {project.subtitle}
                  </p>
                )}
                <p className="font-[family-name:var(--font-dm-mono)] text-[0.8rem] text-[var(--text-secondary)] mt-3">
                  {project.role}
                </p>
              </div>

              {project.image && (
                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                  <div className="relative aspect-[2/1] rounded-lg overflow-hidden flex-1">
                    <Image
                      src={project.image}
                      alt={project.imageAlt || ""}
                      fill
                      className="object-cover object-[center_35%]"
                      sizes="(max-width: 768px) 100vw, 300px"
                      loading="lazy"
                    />
                  </div>
                  {project.id === "mirakoe" && (
                    <div className="relative aspect-[2/1] rounded-lg overflow-hidden flex-1">
                      <Image
                        src="/images/class_miracoe.jpg"
                        alt="Mirakoe team"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 300px"
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>
              )}

              <p className="text-[0.95rem] leading-relaxed text-[var(--text-secondary)] max-w-[var(--max-text)] mb-10">
                {project.description}
              </p>

              {"stats" in project &&
                project.stats &&
                project.stats.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 py-8 border-t border-b border-[var(--border)]">
                    {project.stats.map(
                      (stat: { value: string; label: string }) => (
                        <div key={stat.label}>
                          <div className="stat-number">{stat.value}</div>
                          <div className="stat-label">{stat.label}</div>
                        </div>
                      )
                    )}
                  </div>
                )}

              {"highlights" in project &&
                project.highlights &&
                project.highlights.length > 0 && (
                  <ul className="space-y-4 max-w-[var(--max-text)]">
                    {project.highlights.map((h: string, i: number) => (
                      <li key={i} className="flex gap-4 text-[0.9rem]">
                        <span className="font-[family-name:var(--font-dm-mono)] text-[0.7rem] text-[var(--text-tertiary)] mt-1 shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[var(--text-secondary)]">
                          {h}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

              {"reflection" in project && project.reflection && (
                <blockquote className="mt-10 pl-6 border-l-2 border-[var(--accent)] text-[0.9rem] italic text-[var(--text-secondary)] max-w-[var(--max-text)]">
                  {project.reflection}
                </blockquote>
              )}

              <div className="mt-8">
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-2 text-[0.85rem] text-[var(--text-tertiary)] hover:text-[var(--accent)] transition-colors font-[family-name:var(--font-dm-mono)] tracking-wider"
                >
                  Read more
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
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
