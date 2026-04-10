import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export default function LatestPost() {
  const posts = getAllPosts();
  if (posts.length === 0) return null;

  const latest = posts[0];

  return (
    <section className="section-padding">
      <div className="mx-auto max-w-[var(--max-content)]">
        <div className="flex items-baseline justify-between mb-6">
          <div className="section-label">Latest Post</div>
          <Link
            href="/blog"
            className="font-[family-name:var(--font-dm-mono)] text-[0.7rem] text-[var(--text-tertiary)] hover:text-[var(--accent)] transition-colors tracking-wider"
          >
            View all →
          </Link>
        </div>

        <Link
          href={`/blog/${latest.slug}`}
          className="group block p-6 md:p-8 border border-[var(--border)] hover:border-[var(--border-hover)] rounded-lg transition-colors"
        >
          <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-3">
            <h3 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(1.1rem,2.5vw,1.4rem)] font-semibold group-hover:text-[var(--accent)] transition-colors">
              {latest.title}
            </h3>
            <div className="flex items-center gap-3 shrink-0">
              <span className="font-[family-name:var(--font-dm-mono)] text-[0.7rem] text-[var(--text-tertiary)]">
                {latest.readingTime}
              </span>
              <time className="font-[family-name:var(--font-dm-mono)] text-[0.7rem] text-[var(--text-tertiary)]">
                {latest.date}
              </time>
            </div>
          </div>
          <p className="text-[0.9rem] text-[var(--text-secondary)] max-w-[var(--max-text)]">
            {latest.description}
          </p>
        </Link>
      </div>
    </section>
  );
}
