import type { Locale } from "@/lib/translations";

/**
 * "Now" — what Koya is doing these months. Rewritten by hand about once a
 * month (source: the content sheet, 2026-09-08). Keep `updated` honest.
 */
export interface NowBlock {
  updated: string; // YYYY-MM
  doing: Record<Locale, string[]>;
  interests: Record<Locale, string>;
}

export const now: NowBlock = {
  updated: "2026-09",
  doing: {
    ja: [
      "Zero Industries の COO として事業をつくる",
      "哲学書を読み、人と対話する",
      "論文を書く",
    ],
    en: [
      "Building the business as COO of Zero Industries",
      "Reading philosophy and talking it through with people",
      "Writing a paper",
    ],
  },
  interests: {
    ja: "思想や哲学の本。音楽は Beatles と Oasis が好きだったが、いまは 2000 年代の曲も聴く。",
    en: "Books on thought and philosophy. Music: long a Beatles and Oasis person, lately also the 2000s.",
  },
};
