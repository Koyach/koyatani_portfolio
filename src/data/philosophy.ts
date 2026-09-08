import type { Locale } from "@/lib/translations";

/**
 * Where each principle comes from, and the question that keeps him up.
 * Paraphrased from Koya's own reflection notes (2025 年振り返り, 自己分析 2026-03,
 * 伝記スライド原稿 v3, 自己分析 2026-06-05). Names of private individuals removed.
 */
export interface Principle {
  title: Record<Locale, string>;
  origin: Record<Locale, string>;
}

export const principles: Principle[] = [
  {
    title: { ja: "長期的リターンを見据えた誠実さ", en: "Integrity with long-term returns in mind" },
    origin: {
      ja: "小さな嘘、小さなごまかし、小さな妥協の積み重ねが、大きなチャンスを逃す原因になると痛感した年があった。代表である自分が不在だったことを第三者から批判され、「チャンスを逃すような人間に時間を割くべきではない」と言われた日から、毎日日記をつけている。",
      en: "There was a year that taught me how small lies, small fudges and small compromises pile up into missed chances. The day a third party called me out for being absent as a leader, saying no one should spend time on someone who lets chances slip, I started keeping a daily journal. I still do.",
    },
  },
  {
    title: { ja: "仲間・チームで動くリーダーシップ", en: "Leadership that moves with the team" },
    origin: {
      ja: "以前は一人でがむしゃらに動いていた。自分の熱量で人を巻き込み、チームとして動かす側に変わった。学生団体サミットの優勝と能登での活動が、その証明だと思っている。",
      en: "I used to charge ahead alone. Somewhere along the way I became someone who pulls people in with his own energy and moves as a team. The Student Organization Summit win and the work in Noto are the proof I point to.",
    },
  },
  {
    title: { ja: "行動が先、信念が後", en: "Action first, belief follows" },
    origin: {
      ja: "動いてみて初めて「これだった」「これじゃなかった」が分かる。ミラコエも最初は「政治家を無料で呼べる」という打算で始めた。続けるうちに「対話で社会を作る」という本物の思想が育った。",
      en: "You only learn whether something was right by moving first. Mirakoe began with a calculation: you can invite politicians for free. Keeping at it is what grew a real conviction — that society is built through dialogue.",
    },
  },
];

export const concern: Record<Locale, string[]> = {
  ja: [
    "1 票という、社会を変える権利を持っているのに、なぜ行使しないのか。",
    "「能力があるのに行動しない」状態への、もったいなさ。",
  ],
  en: [
    "We each hold a vote — a real power to change society. Why leave it unused?",
    "What bothers me is the waste in “able, but not acting.”",
  ],
};
