"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";

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

type FormStatus = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) throw new Error();

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="section-padding">
      <div className="mx-auto max-w-[var(--max-content)]">
        <div className="section-label fade-in">{t.contact.label}</div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--space-lg)] items-start">
          {/* Left: Form + Photo */}
          <div className="fade-in fade-in-delay-1">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight mb-6">
              {t.contact.heading}
            </h2>
            <p className="text-[0.95rem] text-[var(--text-secondary)] leading-relaxed max-w-[400px] mb-8">
              {t.contact.description}
            </p>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-4 mb-8">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-[0.8rem] text-[var(--text-tertiary)] mb-1.5 font-medium"
                >
                  {t.contact.formName}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-[0.9rem] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-[0.8rem] text-[var(--text-tertiary)] mb-1.5 font-medium"
                >
                  {t.contact.formEmail}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-[0.9rem] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-[0.8rem] text-[var(--text-tertiary)] mb-1.5 font-medium"
                >
                  {t.contact.formMessage}
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-[0.9rem] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 bg-[var(--accent)] text-[var(--snow)] text-[0.85rem] font-medium tracking-wide rounded-lg hover:bg-[var(--accent-light)] active:scale-[0.98] transition-[background-color,transform] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "sending"
                  ? t.contact.formSending
                  : t.contact.formSubmit}
              </button>

              {status === "success" && (
                <p className="text-[0.85rem] text-green-400">
                  {t.contact.formSuccess}
                </p>
              )}
              {status === "error" && (
                <p className="text-[0.85rem] text-red-400">
                  {t.contact.formError}
                </p>
              )}
            </form>

            <a
              href="https://calendar.app.google/riCES5AXDQzaAwF37"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 border border-[var(--border)] text-[var(--text-secondary)] text-[0.85rem] font-medium tracking-wide rounded-lg hover:border-[var(--accent)] hover:text-[var(--accent)] active:scale-[0.98] transition-[border-color,color,transform] mb-8"
            >
              <svg
                aria-hidden="true"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                />
              </svg>
              {t.contact.scheduleButton}
            </a>

            <a
              href="/cv"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium transition-colors border border-[var(--border)] hover:border-[var(--border-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
              {t.contact.cvButton}
            </a>

            <div className="relative aspect-[3/2] rounded-lg overflow-hidden">
              <Image
                src="/images/IMG_3781.JPG"
                alt={t.contact.photoAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right: SNS Links */}
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
