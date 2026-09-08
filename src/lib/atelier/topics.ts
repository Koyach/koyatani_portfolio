import type { Locale } from "@/lib/translations";
import { questions } from "@/data/questions";

export type TopicId =
  | "about"
  | "works"
  | "philosophy"
  | "contact"
  | "skiing"
  | "media"
  | "achievements"
  | "writing"
  | "questions"
  | "books";

export interface Topic {
  id: TopicId;
  name: Record<Locale, string>;
  /** one quiet line shown in the index and suggestions */
  hint: Record<Locale, string>;
  keywords: string[];
}

export const TOPICS: Topic[] = [
  {
    id: "about",
    name: { ja: "私について", en: "About" },
    hint: { ja: "経歴・いま", en: "Background, now" },
    keywords: [
      "私について", "わたしについて", "自己紹介", "じこしょうかい", "プロフィール", "プロフ",
      "経歴", "けいれき", "紹介", "人物", "だれ", "誰", "あなた", "君", "きみ", "谷", "たに",
      "昊埜", "こうや", "koya", "tani", "koyatani", "about", "aboutme", "profile", "bio",
      "who", "me", "intro", "background", "story", "学歴", "大学", "sfc", "慶應", "慶応", "keio",
      "自分", "じぶん", "本人", "履歴", "履歴書", "cv", "resume",
    ],
  },
  {
    id: "works",
    name: { ja: "実績", en: "Work" },
    hint: { ja: "活動・つくったもの", en: "Projects and activities" },
    keywords: [
      "実績", "じっせき", "仕事", "しごと", "プロジェクト", "活動", "かつどう", "事業",
      "制作", "作品", "取り組み", "とりくみ", "経験", "work", "works", "project", "projects",
      "portfolio", "job", "career", "activity", "activities", "startup", "スタートアップ",
      "起業", "きぎょう", "ミラコエ", "みらこえ", "mirakoe", "miracoe", "選挙", "せんきょ",
      "政治", "せいじ", "politics", "election", "bedrock", "ベッドロック", "zero", "coo",
      "能登", "のと", "noto", "輪島", "わじま", "wajima", "漆", "うるし", "団体", "組織",
    ],
  },
  {
    id: "philosophy",
    name: { ja: "思想", en: "Philosophy" },
    hint: { ja: "価値観・問い", en: "Values, questions" },
    keywords: [
      "思想", "しそう", "考え", "かんがえ", "考え方", "哲学", "てつがく", "価値観", "かちかん",
      "信念", "しんねん", "原理", "行動原理", "理念", "りねん", "想い", "思い", "おもい",
      "問い", "とい", "問題意識", "ビジョン", "philosophy", "values", "belief", "beliefs",
      "principle", "principles", "why", "vision", "thought", "thoughts", "idea", "ideas",
      "mind", "対話", "たいわ", "dialogue", "社会", "しゃかい",
    ],
  },
  {
    id: "contact",
    name: { ja: "コンタクト", en: "Contact" },
    hint: { ja: "連絡先・SNS", en: "Reach out, SNS" },
    keywords: [
      "コンタクト", "こんたくと", "連絡", "れんらく", "連絡先", "問い合わせ", "お問い合わせ",
      "といあわせ", "メール", "めーる", "話す", "はなす", "話したい", "会いたい", "依頼", "取材",
      "登壇", "相談", "そうだん", "contact", "email", "mail", "e-mail", "sns", "reach", "talk",
      "hello", "hi", "connect", "dm", "instagram", "インスタ", "twitter", "x", "facebook",
      "note", "ノート", "予約", "日程", "calendar", "カレンダー", "call", "meet", "meeting",
    ],
  },
  {
    id: "skiing",
    name: { ja: "スキー", en: "Skiing" },
    hint: { ja: "競技成績・表現", en: "Competition, expression" },
    keywords: [
      "スキー", "すきー", "ski", "skiing", "skier", "フリースタイル", "freestyle", "アルペン",
      "alpine", "雪", "ゆき", "snow", "競技", "きょうぎ", "sport", "sports", "スポーツ",
      "トリック", "ジャンプ", "jump", "趣味", "しゅみ", "hobby", "hobbies",
    ],
  },
  {
    id: "media",
    name: { ja: "メディア", en: "Media" },
    hint: { ja: "出演・掲載・登壇", en: "TV, press, talks" },
    keywords: [
      "メディア", "めでぃあ", "media", "出演", "しゅつえん", "掲載", "けいさい", "新聞",
      "しんぶん", "テレビ", "tv", "press", "news", "ニュース", "youtube", "ユーチューブ",
      "abema", "アベマ", "番組", "ばんぐみ", "記事", "取材歴", "講演", "こうえん", "talk",
      "talks", "speaking", "appearance", "appearances", "interview", "インタビュー",
    ],
  },
  {
    id: "achievements",
    name: { ja: "受賞・所属", en: "Achievements" },
    hint: { ja: "賞・プログラム", en: "Awards, programs" },
    keywords: [
      "受賞", "じゅしょう", "賞", "しょう", "表彰", "受賞歴", "所属", "しょぞく", "アワード",
      "award", "awards", "achievement", "achievements", "prize", "prizes", "honor", "honors",
      "fellow", "fellowship", "フェロー", "フェローシップ", "プログラム", "program",
      "programs", "優勝", "ゆうしょう", "win", "wins", "結果", "affiliation", "affiliations",
      "サミット", "summit", "スカラシップ", "scholarship", "ivs",
    ],
  },
  {
    id: "writing",
    name: { ja: "文章", en: "Writing" },
    hint: { ja: "ブログ・note", en: "Blog, essays" },
    keywords: [
      "文章", "ぶんしょう", "ブログ", "ぶろぐ", "blog", "エッセイ", "essay", "essays", "書いたもの",
      "書く", "かく", "writing", "writings", "post", "posts", "article", "articles", "日記",
      "にっき", "言葉", "ことば", "words", "text", "読む", "よむ", "read", "reading",
      "物語", "story", "stories", "振り返り", "抱負", "反省",
    ],
  },
  {
    id: "questions",
    name: { ja: "問い", en: "Questions" },
    hint: { ja: "よくある問いに、本人の言葉で", en: "Common questions, in his own words" },
    keywords: [
      "問い", "とい", "質問", "しつもん", "聞きたい", "ききたい", "教えて", "おしえて", "なぜ", "どうして",
      "q&a", "qa", "faq", "question", "questions", "ask", "why", "how", "interview", "インタビュー",
    ],
  },
  {
    id: "books",
    name: { ja: "本棚", en: "Bookshelf" },
    hint: { ja: "読んだ本と一言", en: "Books, one line each" },
    keywords: [
      "本棚", "ほんだな", "本", "ほん", "読書", "どくしょ", "書籍", "しょせき", "読んだ本", "愛読書",
      "book", "books", "bookshelf", "shelf", "reading list", "library",
    ],
  },
];

export const TOPIC_BY_ID: Record<TopicId, Topic> = Object.fromEntries(
  TOPICS.map((t) => [t.id, t])
) as Record<TopicId, Topic>;

export const TOPIC_IDS: TopicId[] = TOPICS.map((t) => t.id);

export function isTopicId(v: unknown): v is TopicId {
  return typeof v === "string" && (TOPIC_IDS as string[]).includes(v);
}

/** NFKC, lower-case, katakana → hiragana, strip spaces and punctuation. */
export function normalizeWord(input: string): string {
  let s = input.normalize("NFKC").toLowerCase().trim();
  // katakana → hiragana so 「コンタクト」 and 「こんたくと」 meet
  s = s.replace(/[ァ-ヶ]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0x60));
  s = s.replace(/[\s　・･、。,.!?！？:;'"“”‘’「」『』()（）\[\]【】\-_/\\~〜ー]/g, "");
  return s;
}

const NORMALIZED: Array<{ id: TopicId; keys: string[] }> = TOPICS.map((t) => ({
  id: t.id,
  keys: Array.from(new Set(t.keywords.map(normalizeWord).filter(Boolean))),
}));

export interface Resolution {
  topic: TopicId | null;
  /** id of a specific question when the word matched one of Koya's answered questions */
  anchor?: string;
  /** 3 near topics when unresolved (also handy as an "or did you mean" list) */
  suggestions: TopicId[];
}

const QUESTION_KEYS: Array<{ id: string; keys: string[] }> = questions.map((q) => ({
  id: q.id,
  keys: Array.from(new Set(q.keywords.map(normalizeWord).filter((k) => k.length >= 2))),
}));

/** The question whose keyword best explains the word (longest match wins). */
function matchQuestion(w: string): string | null {
  let best: { id: string; len: number } | null = null;
  for (const q of QUESTION_KEYS) {
    for (const k of q.keys) {
      if (w === k || w.includes(k)) {
        if (!best || k.length > best.len) best = { id: q.id, len: k.length };
      }
    }
  }
  return best?.id ?? null;
}

/**
 * Map a visitor's word to a topic.
 * exact → containment → small Latin typo → give up and suggest.
 */
export function resolveWord(word: string): Resolution {
  const w = normalizeWord(word);
  if (!w) return { topic: null, suggestions: ["about", "works", "contact"] };

  for (const t of NORMALIZED) {
    if (t.keys.includes(w)) return { topic: t.id, suggestions: [] };
  }

  // A phrase that matches one of the answered questions opens that answer.
  const q = matchQuestion(w);
  if (q) return { topic: "questions", anchor: q, suggestions: [] };

  let best: { id: TopicId; score: number } | null = null;
  for (const t of NORMALIZED) {
    for (const k of t.keys) {
      if (k.length < 2) continue;
      let score = 0;
      if (w.includes(k)) score = k.length / w.length + 0.5;
      else if (w.length >= 2 && k.includes(w)) score = w.length / k.length;
      if (score > 0 && (!best || score > best.score)) best = { id: t.id, score };
    }
  }
  if (best && best.score >= 0.5) return { topic: best.id, suggestions: [] };

  if (/^[a-z]+$/.test(w) && w.length >= 4) {
    for (const t of NORMALIZED) {
      for (const k of t.keys) {
        if (/^[a-z]+$/.test(k) && k.length >= 4 && levenshtein(w, k) <= 1) {
          return { topic: t.id, suggestions: [] };
        }
      }
    }
  }

  return { topic: null, suggestions: suggestFor(w) };
}

function suggestFor(w: string): TopicId[] {
  const grams = bigrams(w);
  const scored = NORMALIZED.map((t) => {
    let s = 0;
    for (const k of t.keys) {
      const kg = bigrams(k);
      for (const g of grams) if (kg.has(g)) s += 1;
      for (const ch of w) if (k.includes(ch) && !/^[a-z0-9]$/.test(ch)) s += 0.35;
    }
    return { id: t.id, s };
  });
  scored.sort((a, b) => b.s - a.s);
  const top = scored.filter((x) => x.s > 0).slice(0, 3).map((x) => x.id);
  const fallback: TopicId[] = ["about", "works", "contact"];
  for (const f of fallback) if (top.length < 3 && !top.includes(f)) top.push(f);
  return top;
}

function bigrams(s: string): Set<string> {
  const out = new Set<string>();
  for (let i = 0; i < s.length - 1; i++) out.add(s.slice(i, i + 2));
  return out;
}

function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) => [i, ...new Array(n).fill(0)]);
  for (let j = 1; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return dp[m][n];
}
