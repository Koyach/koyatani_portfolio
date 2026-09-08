"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { projects } from "@/data/projects";
import { questions } from "@/data/questions";
import { timeline } from "@/data/timeline";
import { now } from "@/data/now";
import { principles, concern } from "@/data/philosophy";
import { books } from "@/data/books";
import { TOPIC_BY_ID, type TopicId } from "@/lib/atelier/topics";

export interface PostSummary {
  slug: string;
  title: string;
  titleEn?: string;
  date: string;
  description: string;
  descriptionEn?: string;
  minutes: number;
}

interface Props {
  topic: TopicId;
  /** a question id to open first (questions topic) */
  anchor?: string;
  posts: PostSummary[];
  onOpenTopic: (topic: TopicId) => void;
}

/**
 * What unfolds from each word. Everything here is read from translations.ts,
 * data/*.ts or content/blog — the same sources as the rest of the site.
 */
export default function TopicContent({ topic, anchor, posts, onOpenTopic }: Props) {
  switch (topic) {
    case "about":
      return <AboutContent onOpenTopic={onOpenTopic} />;
    case "works":
      return <WorksContent onOpenTopic={onOpenTopic} />;
    case "philosophy":
      return <PhilosophyContent onOpenTopic={onOpenTopic} />;
    case "contact":
      return <ContactContent />;
    case "skiing":
      return <SkiingContent onOpenTopic={onOpenTopic} />;
    case "media":
      return <MediaContent />;
    case "achievements":
      return <AchievementsContent />;
    case "writing":
      return <WritingContent posts={posts} />;
    case "questions":
      return <QuestionsContent anchor={anchor} onOpenTopic={onOpenTopic} />;
    case "books":
      return <BooksContent onOpenTopic={onOpenTopic} />;
  }
}

/** Buttons that open other parts of the canvas from inside a panel. */
function TopicLinks({ topics, onOpenTopic }: { topics: TopicId[]; onOpenTopic: (t: TopicId) => void }) {
  const { locale } = useLanguage();
  return (
    <>
      {topics.map((id) => (
        <button key={id} type="button" className="atelier-inline-btn" onClick={() => onOpenTopic(id)}>
          {TOPIC_BY_ID[id].name[locale]}
        </button>
      ))}
    </>
  );
}

/* ---------------------------------------------------------------- about */

function AboutContent({ onOpenTopic }: { onOpenTopic: (t: TopicId) => void }) {
  const { t, locale } = useLanguage();
  const a = t.about;
  const pl = t.atelier.panels;
  const [status, setStatus] = useState<{ text: string; emoji: string } | null>(null);

  useEffect(() => {
    let alive = true;
    fetch("/api/status")
      .then((r) => (r.ok ? r.json() : null))
      .then((d: { text?: string; emoji?: string } | null) => {
        if (alive && d?.text) setStatus({ text: d.text, emoji: d.emoji ?? "" });
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="atelier-prose">
      <Image src="/images/profile.JPG" alt={a.profileAlt} width={84} height={84} className="atelier-photo" sizes="84px" />
      <p className="atelier-lead">
        {a.heading1}
        <br />
        {a.heading2}
      </p>
      <p>{a.bio1}</p>
      <p>{a.bio2}</p>
      <p>{a.bio3}</p>

      <h3>
        {pl.now} <span className="atelier-meta">{now.updated} {pl.updated}</span>
      </h3>
      <ul>
        {now.doing[locale].map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
      <p>{now.interests[locale]}</p>
      {status && (
        <p className="atelier-status">
          {status.emoji && <span aria-hidden="true">{status.emoji}</span>}
          <span>{status.text}</span>
        </p>
      )}

      <h3>{pl.timeline}</h3>
      <ol className="atelier-timeline">
        {timeline.map((e, i) => (
          <li key={i}>
            <span className="atelier-timeline-when">{e.when}</span>
            <span>{e.event[locale]}</span>
          </li>
        ))}
      </ol>

      <h3>{a.academicsLabel}</h3>
      <p>
        {a.academics1}
        <br />
        {a.academics2}
      </p>

      <h3>{a.internationalLabel}</h3>
      <ul>
        {a.international.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>

      <div className="atelier-links">
        <TopicLinks topics={["questions", "works", "philosophy"]} onOpenTopic={onOpenTopic} />
        <Link href="/cv" target="_blank" rel="noopener noreferrer">
          {t.contact.cvButton}
        </Link>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- works */

function WorksContent({ onOpenTopic }: { onOpenTopic: (t: TopicId) => void }) {
  const { t, locale } = useLanguage();
  const pl = t.atelier.panels;
  return (
    <div className="atelier-prose">
      {projects.map((p) => {
        const facts: Array<[string, string | undefined]> = [
          [pl.why, p.why?.[locale]],
          [pl.what, p.what?.[locale]],
          [pl.learned, p.learned?.[locale]],
          [pl.status, p.status?.[locale]],
        ];
        return (
          <article key={p.slug} className="atelier-item">
            {p.image && (
              <Image
                src={p.image}
                alt={p.title[locale]}
                width={640}
                height={427}
                className="atelier-figure"
                sizes="(max-width: 640px) 90vw, 340px"
              />
            )}
            <span className="atelier-meta">{p.tag}</span>
            <h4>
              {p.title[locale]}
              {p.subtitle && <span style={{ color: "var(--ash)", fontWeight: 400 }}> — {p.subtitle[locale]}</span>}
            </h4>
            <p className="atelier-meta" style={{ marginBottom: 6 }}>
              {p.role[locale]}
            </p>
            {p.description[locale] && <p>{p.description[locale]}</p>}
            {facts.some(([, v]) => v) && (
              <dl className="atelier-facts">
                {facts.map(([k, v]) =>
                  v ? (
                    <div key={k}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ) : null
                )}
              </dl>
            )}
            {p.stats && (
              <div className="atelier-stats">
                {p.stats.map((s) => (
                  <span key={s.label[locale]}>
                    <b>{s.value}</b>
                    {s.label[locale]}
                  </span>
                ))}
              </div>
            )}
            {p.highlights && (
              <ul>
                {p.highlights.map((h) => (
                  <li key={h[locale]}>{h[locale]}</li>
                ))}
              </ul>
            )}
            {p.reflection && <p className="atelier-quote">{p.reflection[locale]}</p>}
            <div className="atelier-links">
              <Link href={`/projects/${p.slug}`}>{pl.more} →</Link>
              {p.url && (
                <a href={p.url} target="_blank" rel="noopener noreferrer">
                  {pl.website} ↗
                </a>
              )}
            </div>
          </article>
        );
      })}
      <div className="atelier-links" style={{ marginTop: 14 }}>
        <TopicLinks topics={["questions", "achievements", "writing"]} onOpenTopic={onOpenTopic} />
      </div>
    </div>
  );
}

/* ----------------------------------------------------------- philosophy */

function PhilosophyContent({ onOpenTopic }: { onOpenTopic: (t: TopicId) => void }) {
  const { t, locale } = useLanguage();
  const pl = t.atelier.panels;
  return (
    <div className="atelier-prose">
      <p className="atelier-quote">
        {t.hero.tagline1}
        <br />
        {t.hero.tagline2}
      </p>

      <h3>{t.about.principlesLabel}</h3>
      {principles.map((p) => (
        <section key={p.title.ja} className="atelier-principle">
          <h4>{p.title[locale]}</h4>
          <p>
            <span className="atelier-meta">{pl.origin}</span> {p.origin[locale]}
          </p>
        </section>
      ))}

      <h3>{pl.concern}</h3>
      {concern[locale].map((line) => (
        <p key={line}>{line}</p>
      ))}

      <h3>{t.projects.noto.title}</h3>
      <p>{t.projects.noto.reflection}</p>

      <div className="atelier-links">
        <TopicLinks topics={["questions", "books", "writing"]} onOpenTopic={onOpenTopic} />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- contact */

const SNS = [
  { label: "Instagram", url: "https://www.instagram.com/koyatani_0828", handle: "@koyatani_0828" },
  { label: "X", url: "https://x.com/koyach777", handle: "@koyach777" },
  { label: "Facebook", url: "https://www.facebook.com/share/1FYjf7sFTV/", handle: "Koya Tani" },
  { label: "note", url: "https://note.com/koya_sfc", handle: "koya_sfc" },
];

const EMAIL = "koya@zero.space";
const CALENDAR_URL = "https://calendar.app.google/riCES5AXDQzaAwF37";

function ContactContent() {
  const { t } = useLanguage();
  const c = t.contact;
  const pl = t.atelier.panels;
  return (
    <div className="atelier-prose">
      <p className="atelier-lead">{c.heading}</p>
      <p>{c.description}</p>

      <h3>{pl.email}</h3>
      <p>
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </p>

      <h3>SNS</h3>
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {SNS.map((s) => (
          <li key={s.label}>
            <a href={s.url} target="_blank" rel="noopener noreferrer">
              {s.label}
            </a>{" "}
            <span className="atelier-meta">{s.handle}</span>
          </li>
        ))}
      </ul>

      <div className="atelier-links">
        <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer">
          {c.scheduleButton} ↗
        </a>
        <Link href="/cv" target="_blank" rel="noopener noreferrer">
          {c.cvButton}
        </Link>
      </div>

      <h3>{c.formMessage}</h3>
      <ContactForm />
    </div>
  );
}

type FormStatus = "idle" | "sending" | "success" | "error";

/** Posts to the existing /api/contact route (Neon + Resend). Nothing is faked. */
function ContactForm() {
  const { t } = useLanguage();
  const c = t.contact;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="atelier-form" onSubmit={submit}>
      <label>
        {c.formName}
        <input type="text" name="name" required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        {c.formEmail}
        <input type="email" name="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        {c.formMessage}
        <textarea name="message" required rows={4} value={message} onChange={(e) => setMessage(e.target.value)} />
      </label>
      <button type="submit" disabled={status === "sending"}>
        {status === "sending" ? c.formSending : c.formSubmit}
      </button>
      {status === "success" && (
        <p className="atelier-form-msg" role="status">
          {c.formSuccess}
        </p>
      )}
      {status === "error" && (
        <p className="atelier-form-msg" role="alert">
          {c.formError}
        </p>
      )}
    </form>
  );
}

/* --------------------------------------------------------------- skiing */

function SkiingContent({ onOpenTopic }: { onOpenTopic: (t: TopicId) => void }) {
  const { t } = useLanguage();
  const s = t.skiing;
  return (
    <div className="atelier-prose">
      <Image src="/images/skiing.jpg" alt={s.photoAlt} width={640} height={427} className="atelier-figure" sizes="(max-width: 640px) 90vw, 340px" />
      <p className="atelier-lead">
        {s.heading1} × {s.heading2}
      </p>
      <p>{s.description}</p>

      <h3>{s.resultsLabel}</h3>
      <dl className="atelier-kv">
        {s.results.map((r) => (
          <div key={r.event} style={{ display: "contents" }}>
            <dt>{r.event}</dt>
            <dd style={{ fontWeight: r.highlight ? 500 : 400, color: r.highlight ? "var(--ink)" : undefined }}>{r.result}</dd>
          </div>
        ))}
      </dl>

      <h3>{s.othersLabel}</h3>
      <ul>
        {s.others.map((o) => (
          <li key={o}>{o}</li>
        ))}
      </ul>

      <div className="atelier-links">
        <TopicLinks topics={["questions", "philosophy"]} onOpenTopic={onOpenTopic} />
        <a href="https://www.instagram.com/koyatani_0828" target="_blank" rel="noopener noreferrer">
          Instagram ↗
        </a>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- media */

function MediaContent() {
  const { t } = useLanguage();
  const m = t.media;
  return (
    <div className="atelier-prose">
      {m.categories.map((cat) => (
        <section key={cat.category}>
          <h3>{cat.category}</h3>
          <ul>
            {cat.items.map((item) => (
              <li key={item.title}>
                {"url" in item && item.url ? (
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>
                ) : (
                  <span style={{ color: "var(--ink)" }}>{item.title}</span>
                )}{" "}
                — {item.detail}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

/* --------------------------------------------------------- achievements */

function AchievementsContent() {
  const { t } = useLanguage();
  const a = t.achievements;
  return (
    <div className="atelier-prose">
      {a.items.map((item) => (
        <article key={item.title} className="atelier-item">
          <span className="atelier-meta">{item.year}</span>
          <h4>{item.title}</h4>
          <p style={{ margin: 0 }}>{item.detail}</p>
        </article>
      ))}
      <h3>{a.affiliationsLabel}</h3>
      <ul>
        {a.affiliations.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
    </div>
  );
}

/* -------------------------------------------------------------- writing */

function WritingContent({ posts }: { posts: PostSummary[] }) {
  const { t, locale } = useLanguage();
  return (
    <div className="atelier-prose">
      {posts.map((p) => (
        <article key={p.slug} className="atelier-item">
          <span className="atelier-meta">
            {p.date} · {locale === "ja" ? `${p.minutes}${t.atelier.panels.minutes}` : `${p.minutes} ${t.atelier.panels.minutes}`}
          </span>
          <h4>
            <Link href={`/blog/${p.slug}`}>{locale === "en" && p.titleEn ? p.titleEn : p.title}</Link>
          </h4>
          <p style={{ margin: 0 }}>{locale === "en" && p.descriptionEn ? p.descriptionEn : p.description}</p>
        </article>
      ))}
      <div className="atelier-links" style={{ marginTop: 14 }}>
        <Link href="/blog">{t.atelier.panels.allPosts} →</Link>
        <a href="https://note.com/koya_sfc" target="_blank" rel="noopener noreferrer">
          {t.atelier.panels.alsoOnNote} ↗
        </a>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ questions */

function QuestionsContent({ anchor, onOpenTopic }: { anchor?: string; onOpenTopic: (t: TopicId) => void }) {
  const { t, locale } = useLanguage();
  const pl = t.atelier.panels;
  const ref = useRef<HTMLDivElement>(null);

  // bring the matched question to the top of the sheet
  useEffect(() => {
    if (!anchor) return;
    const root = ref.current;
    if (!root) return;
    const id = window.setTimeout(() => {
      const el = root.querySelector<HTMLDetailsElement>(`[data-q="${anchor}"]`);
      if (!el) return;
      el.open = true;
      el.scrollIntoView({ block: "start" });
    }, 60);
    return () => window.clearTimeout(id);
  }, [anchor]);

  return (
    <div className="atelier-prose" ref={ref}>
      <p className="atelier-intro">{pl.questionsIntro}</p>
      {questions.map((q) => (
        <details key={q.id} data-q={q.id} className="atelier-qa" open={q.id === anchor}>
          <summary>{q.question[locale]}</summary>
          {q.answer[locale].map((para) => (
            <p key={para}>{para}</p>
          ))}
          {q.related.length > 0 && (
            <div className="atelier-links">
              <span className="atelier-meta">{pl.related}</span>
              <TopicLinks topics={q.related} onOpenTopic={onOpenTopic} />
            </div>
          )}
        </details>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------- books */

function BooksContent({ onOpenTopic }: { onOpenTopic: (t: TopicId) => void }) {
  const { t } = useLanguage();
  const pl = t.atelier.panels;
  return (
    <div className="atelier-prose">
      {books.map((b) => (
        <article key={b.slug} className="atelier-item">
          <span className="atelier-meta">{b.genre}</span>
          <h4>
            {b.title} <span style={{ color: "var(--ash)", fontWeight: 400, fontSize: 12.5 }}>{b.author}</span>
          </h4>
          <p style={{ margin: 0 }}>{b.comment}</p>
        </article>
      ))}
      <div className="atelier-links" style={{ marginTop: 14 }}>
        <Link href="/bookshelf">{pl.allBooks} →</Link>
        <TopicLinks topics={["philosophy", "questions"]} onOpenTopic={onOpenTopic} />
      </div>
    </div>
  );
}
