const LINKS = [
  {
    label: "Instagram",
    url: "https://instagram.com/",
    handle: "@koyatani",
  },
  {
    label: "X (Twitter)",
    url: "https://x.com/",
    handle: "@koyatani",
  },
  {
    label: "YouTube",
    url: "https://youtube.com/",
    handle: "谷昊埜",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="section-padding">
      <div className="mx-auto max-w-[var(--max-content)]">
        <div className="section-label fade-in">Contact</div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--space-lg)] items-end">
          {/* Left — message */}
          <div className="fade-in fade-in-delay-1">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight mb-6">
              話しましょう。
            </h2>
            <p className="text-[0.95rem] text-[var(--text-secondary)] leading-relaxed max-w-[400px]">
              取材・登壇・協業のご相談など、お気軽にSNSからご連絡ください。
            </p>
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
