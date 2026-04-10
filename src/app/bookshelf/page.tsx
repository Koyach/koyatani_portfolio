import { Metadata } from "next";
import Link from "next/link";
import { books, genres } from "@/data/books";
import BookGrid from "./BookGrid";

export const metadata: Metadata = {
  title: "Bookshelf | 谷昊埜",
  description: "谷昊埜のおすすめ本。ビジネス・思想・技術など、影響を受けた本を紹介。",
};

export default function BookshelfPage() {
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
            Bookshelf
          </span>
        </div>
      </nav>

      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-[var(--max-content)] px-[var(--space-md)]">
          <header className="mb-12">
            <div className="section-label">Bookshelf</div>
            <h1 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight">
              Books I Recommend
            </h1>
            <p className="text-[0.95rem] text-[var(--text-secondary)] mt-4 max-w-[var(--max-text)]">
              影響を受けた本、何度も読み返す本、誰かに薦めたい本。
            </p>
          </header>

          <BookGrid books={books} genres={genres} />
        </div>
      </main>

      <footer className="px-[var(--space-md)] py-10 border-t border-[var(--border)]">
        <div className="mx-auto max-w-[var(--max-content)] text-center">
          <Link
            href="/"
            className="text-[0.85rem] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
          >
            ← Home
          </Link>
        </div>
      </footer>
    </div>
  );
}
