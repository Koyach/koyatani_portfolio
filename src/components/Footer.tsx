"use client";

import { useLanguage } from "@/lib/LanguageContext";
import LiveVisitors from "@/components/LiveVisitors";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="px-[var(--space-md)] py-10 border-t border-[var(--border)]">
      <div className="mx-auto max-w-[var(--max-content)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <p className="font-[family-name:var(--font-dm-mono)] text-[0.7rem] text-[var(--text-tertiary)]">
            {t.footer.copyright}
          </p>
          <LiveVisitors />
        </div>
        <p className="font-[family-name:var(--font-dm-mono)] text-[0.65rem] text-[var(--text-tertiary)] tracking-wider">
          {t.footer.builtWith}
        </p>
      </div>
    </footer>
  );
}
