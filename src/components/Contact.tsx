import Image from "next/image";

const LINKS = [
  {
    label: "Instagram",
    url: "https://www.instagram.com/koyatani_0828",
    handle: "@koyatani_0828",
  },
  {
    label: "X",
    url: "https://x.com/koyach777",
    handle: "@koyach777",
  },
  {
    label: "Facebook",
    url: "https://www.facebook.com/share/1FYjf7sFTV/",
    handle: "Koya Tani",
  },
  {
    label: "note",
    url: "https://note.com/koya_sfc",
    handle: "koya_sfc",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="section-padding">
      <div className="mx-auto max-w-[var(--max-content)]">
        <div className="section-label fade-in">Contact</div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--space-lg)] items-end">
          {/* Left — message + photo + schedule button */}
          <div className="fade-in fade-in-delay-1">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight mb-6">
              話しましょう。
            </h2>
            <p className="text-[0.95rem] text-[var(--text-secondary)] leading-relaxed max-w-[400px] mb-8">
              取材・登壇・協業のご相談など、お気軽にSNSからご連絡ください。
            </p>

            {/* Schedule button */}
            <a
              href="https://calendar.app.google/riCES5AXDQzaAwF37"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 bg-[var(--accent)] text-[var(--snow)] text-[0.85rem] font-medium tracking-wide rounded-lg hover:bg-[var(--accent-light)] active:scale-[0.98] transition-[background-color,transform] mb-8"
            >
              <svg
                aria-hidden="true"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              日程を調整する
            </a>

            {/* Photo */}
            <div className="relative aspect-[3/2] rounded-lg overflow-hidden">
              <Image
                src="/images/IMG_3781.JPG"
                alt="谷昊埜 — 海を見つめる後ろ姿"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right — links */}
          <div className="fade-in fade-in-delay-2">
            <ul className="space-y-0">
              {LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-5 border-b border-[var(--border)] transition-colors hover:border-[var(--border-hover)]"
                  >
                    <div>
                      <span className="text-[0.95rem] font-medium group-hover:text-[var(--accent)] transition-colors">
                        {link.label}
                      </span>
                      <span className="ml-3 font-[family-name:var(--font-dm-mono)] text-[0.8rem] text-[var(--text-tertiary)]">
                        {link.handle}
                      </span>
                    </div>
                    <svg
                      aria-hidden="true"
                      className="w-4 h-4 text-[var(--text-tertiary)] group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-[color,transform]"
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
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
