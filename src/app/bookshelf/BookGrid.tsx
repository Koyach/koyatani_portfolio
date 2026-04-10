"use client";

import { useState } from "react";
import Image from "next/image";
import type { Book } from "@/data/books";

export default function BookGrid({
  books,
  genres,
}: {
  books: Book[];
  genres: string[];
}) {
  const [activeGenre, setActiveGenre] = useState<string | null>(null);

  const filtered = activeGenre
    ? books.filter((b) => b.genre === activeGenre)
    : books;

  return (
    <>
      {/* Genre filter */}
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setActiveGenre(null)}
          className={`font-[family-name:var(--font-dm-mono)] text-[0.7rem] tracking-wider px-3 py-1.5 rounded-full border transition-colors ${
            activeGenre === null
              ? "border-[var(--accent)] text-[var(--accent)] bg-[var(--accent)]/10"
              : "border-[var(--border)] text-[var(--text-tertiary)] hover:border-[var(--border-hover)] hover:text-[var(--text-secondary)]"
          }`}
        >
          All
        </button>
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setActiveGenre(genre)}
            className={`font-[family-name:var(--font-dm-mono)] text-[0.7rem] tracking-wider px-3 py-1.5 rounded-full border transition-colors ${
              activeGenre === genre
                ? "border-[var(--accent)] text-[var(--accent)] bg-[var(--accent)]/10"
                : "border-[var(--border)] text-[var(--text-tertiary)] hover:border-[var(--border-hover)] hover:text-[var(--text-secondary)]"
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Book grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((book) => (
          <BookCard key={book.slug} book={book} />
        ))}
      </div>
    </>
  );
}

function BookCard({ book }: { book: Book }) {
  const [imgError, setImgError] = useState(false);

  return (
    <a
      href={book.amazonUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block border border-[var(--border)] hover:border-[var(--border-hover)] rounded-lg overflow-hidden transition-colors"
    >
      {/* Cover */}
      <div className="relative aspect-[3/4] bg-[var(--bg-tertiary)] overflow-hidden">
        {!imgError ? (
          <Image
            src={book.cover}
            alt={book.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <span className="font-[family-name:var(--font-space-grotesk)] text-[1.2rem] font-semibold text-[var(--text-tertiary)] text-center leading-tight">
              {book.title}
            </span>
          </div>
        )}
        {/* Genre badge */}
        <span className="absolute top-3 left-3 font-[family-name:var(--font-dm-mono)] text-[0.55rem] tracking-wider uppercase bg-black/60 backdrop-blur-sm text-[var(--text-secondary)] px-2 py-1 rounded">
          {book.genre}
        </span>
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="font-[family-name:var(--font-space-grotesk)] text-[1rem] font-semibold leading-tight group-hover:text-[var(--accent)] transition-colors">
          {book.title}
        </h3>
        <p className="font-[family-name:var(--font-dm-mono)] text-[0.75rem] text-[var(--text-tertiary)] mt-1">
          {book.author}
        </p>
        <p className="text-[0.85rem] text-[var(--text-secondary)] leading-relaxed mt-3">
          {book.comment}
        </p>

        {/* Amazon link hint */}
        <div className="flex items-center gap-1.5 mt-4 text-[0.7rem] text-[var(--text-tertiary)] group-hover:text-[var(--accent)] transition-colors">
          <span className="font-[family-name:var(--font-dm-mono)]">Amazon</span>
          <svg
            className="w-3 h-3"
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
        </div>
      </div>
    </a>
  );
}
