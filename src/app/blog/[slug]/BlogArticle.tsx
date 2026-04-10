"use client";

import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { BlogPost } from "@/lib/blog";

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="font-[family-name:var(--font-space-grotesk)] text-[1.5rem] font-semibold mt-12 mb-4"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="font-[family-name:var(--font-space-grotesk)] text-[1.2rem] font-semibold mt-8 mb-3"
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="text-[0.95rem] leading-[1.85] text-[var(--text-secondary)] mb-5"
      {...props}
    />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="text-[var(--text-primary)] font-medium" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="space-y-2 mb-5 pl-5 list-disc text-[0.95rem] text-[var(--text-secondary)]"
      {...props}
    />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="space-y-2 mb-5 pl-5 list-decimal text-[0.95rem] text-[var(--text-secondary)]"
      {...props}
    />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="pl-5 border-l-2 border-[var(--accent)] italic text-[var(--text-secondary)] my-6"
      {...props}
    />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-[var(--accent)] hover:text-[var(--accent-light)] underline underline-offset-2 transition-colors"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  hr: () => <hr className="border-none h-[1px] bg-[var(--border)] my-10" />,
};

export default function BlogArticle({ post }: { post: BlogPost }) {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-primary)]/90 backdrop-blur-md border-b border-[var(--border)]">
        <div className="mx-auto max-w-[var(--max-content)] px-[var(--space-md)] py-4 flex items-center justify-between">
          <Link
            href="/blog"
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
            Blog
          </Link>
          <span className="font-[family-name:var(--font-dm-mono)] text-[0.7rem] text-[var(--text-tertiary)] tracking-wider">
            {post.readingTime}
          </span>
        </div>
      </nav>

      <main className="pt-24 pb-20">
        <article className="mx-auto max-w-[var(--max-text)] px-[var(--space-md)]">
          <header className="mb-12">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <time className="font-[family-name:var(--font-dm-mono)] text-[0.75rem] text-[var(--text-tertiary)]">
                {post.date}
              </time>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-[family-name:var(--font-dm-mono)] text-[0.65rem] text-[var(--text-tertiary)] border border-[var(--border)] px-2 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(1.5rem,4vw,2.2rem)] font-bold leading-[1.3] tracking-tight">
              {post.title}
            </h1>
            <p className="text-[0.9rem] text-[var(--text-tertiary)] mt-4 leading-relaxed">
              {post.description}
            </p>
          </header>

          <div className="prose-custom">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>
        </article>
      </main>

      <footer className="px-[var(--space-md)] py-10 border-t border-[var(--border)]">
        <div className="mx-auto max-w-[var(--max-content)] text-center">
          <Link
            href="/blog"
            className="text-[0.85rem] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
          >
            ← All Posts
          </Link>
        </div>
      </footer>
    </div>
  );
}
