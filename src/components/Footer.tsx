export default function Footer() {
  return (
    <footer className="px-[var(--space-md)] py-10 border-t border-[var(--border)]">
      <div className="mx-auto max-w-[var(--max-content)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-[family-name:var(--font-dm-mono)] text-[0.7rem] text-[var(--text-tertiary)]">
          &copy; 2026 Koya Tani
        </p>
        <p className="font-[family-name:var(--font-dm-mono)] text-[0.65rem] text-[var(--text-tertiary)] tracking-wider">
          Built with Next.js
        </p>
      </div>
    </footer>
  );
}
