import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | 谷昊埜",
  description: "谷昊埜のブログ。政治・起業・スキー・思考について。",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-primary)]/90 backdrop-blur-md border-b border-[var(--border)]">
        <div className="mx-auto max-w-[var(--max-content)] px-[var(--space-md)] py-4 flex items-center justify-between">
          <Link
            href="/"
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
            Home
          </Link>
          <span className="font-[family-name:var(--font-dm-mono)] text-[0.7rem] text-[var(--text-tertiary)] tracking-wider uppercase">
            Blog
          </span>
        </div>
      </nav>

      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-[var(--max-content)] px-[var(--space-md)]">
          <header className="mb-16">
            <div className="section-label">Blog</div>
            <h1 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight">
              Thoughts & Notes
            </h1>
          </header>

          {posts.length === 0 ? (
            <p className="text-[var(--text-tertiary)]">No posts yet.</p>
          ) : (
            <div className="space-y-0">
              {posts.map((post) => (
                <article key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block py-8 border-b border-[var(--border)] hover:border-[var(--border-hover)] transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-3">
                      <h2 className="font-[family-name:var(--font-space-grotesk)] text-[1.3rem] font-semibold group-hover:text-[var(--accent)] transition-colors">
                        {post.title}
                      </h2>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="font-[family-name:var(--font-dm-mono)] text-[0.75rem] text-[var(--text-tertiary)]">
                          {post.readingTime}
                        </span>
                        <time className="font-[family-name:var(--font-dm-mono)] text-[0.75rem] text-[var(--text-tertiary)]">
                          {post.date}
                        </time>
                      </div>
                    </div>
                    <p className="text-[0.9rem] text-[var(--text-secondary)] max-w-[var(--max-text)]">
                      {post.description}
                    </p>
                    {post.tags.length > 0 && (
                      <div className="flex gap-2 mt-3">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-[family-name:var(--font-dm-mono)] text-[0.65rem] text-[var(--text-tertiary)] border border-[var(--border)] px-2 py-0.5 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
