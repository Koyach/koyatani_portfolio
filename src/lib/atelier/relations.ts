import type { Locale } from "@/lib/translations";
import type { TopicId } from "./topics";

/**
 * Relations between two topics, shown when a visitor draws a line from one
 * enclosure to another. Every entry restates something already published in
 * translations.ts / data/projects.ts / content/blog — nothing new is claimed.
 * Pairs without an entry get an honest "not written yet" note in the UI.
 */
const RELATIONS: Record<string, Record<Locale, string>> = {
  "about|works": {
    ja: "母親が選択的夫婦別姓訴訟の原告という家庭で育った原体験が、ミラコエの活動の根幹にある。",
    en: "Growing up with a mother who is a plaintiff in Japan's selective-surname lawsuit is the root of Mirakoe's work.",
  },
  "about|skiing": {
    ja: "ジュニアワールドツアー2位。競技で培った「まず飛ぶ。考えるのはその後」が、すべての活動に通底している。",
    en: "2nd in the Junior World Tour. The competitive habit of “jump first, think later” runs through everything.",
  },
  "about|philosophy": {
    ja: "「声を上げなければ社会は変わらない」という信念とともに育った。人は互いを完全には理解できない。だからこそ対話で社会を作る。",
    en: "Raised with the belief that society won't change unless you speak up. We can never fully understand each other — that's why we build society through dialogue.",
  },
  "about|writing": {
    ja: "「スキーバカが政治教育に手を出し、SFCに入学するまで」に、3歳から慶應SFCまでの全記録を書いている。",
    en: "“From Ski Bum to Political Activist to SFC” records the whole path, from skiing at age three to Keio SFC.",
  },
  "about|achievements": {
    ja: "Dan Okimoto Rising Innovators Fellows に最年少で採択（2026.01）。IVSスカラシップ2期生。",
    en: "Youngest selectee of the Dan Okimoto Rising Innovators Fellows (Jan 2026). IVS Scholarship 2nd cohort.",
  },
  "about|media": {
    ja: "AbemaTV の2026年衆議院選挙特番に出演。YouTube「令和の猫」にレギュラー出演。",
    en: "Appeared on AbemaTV's 2026 House of Representatives election special; a regular on YouTube's “Reiwa no Neko”.",
  },
  "works|philosophy": {
    ja: "「アイデアの源泉は現場にある」。能登には3回通い、法人設立には至らなかったが、この経験が「現場から始める」原理を強くした。",
    en: "“Ideas come from the field.” Three visits to Noto didn't lead to incorporation, but the experience hardened the principle of starting on the ground.",
  },
  "works|media": {
    ja: "ミラコエの活動は TBS京都で放映され、Yahoo!ニュース・読売新聞・京都新聞に掲載された。",
    en: "Mirakoe's work was aired by TBS Kyoto and covered by Yahoo! News, Yomiuri Shimbun and Kyoto Shimbun.",
  },
  "works|achievements": {
    ja: "ミラコエ代表として第5回学生団体サミットで優勝（2025.07）。宮古島観光戦略プログラムでは最優秀賞。",
    en: "Won the 5th Student Organization Summit as Mirakoe's president (Jul 2025); Best Award at the Miyako Island tourism strategy program.",
  },
  "works|writing": {
    ja: "「ミラコエの立ち上げ物語」「社会活動をしたらYahoo!ニュースで叩かれた件」など、活動の記録を note に書いている。",
    en: "Essays such as “The Mirakoe Origin Story” and “When Our Social Initiative Got Trashed on Yahoo! News” record the work as it happened.",
  },
  "works|skiing": {
    ja: "石川能登チャリティーイベントにスキーで参加。能登での事業構想と同じ土地に、別の入口から関わった。",
    en: "Took part in a Noto charity event as a skier — the same region as the lacquerware venture, entered from a different door.",
  },
  "philosophy|skiing": {
    ja: "大学1年次からフリースタイルスキーをアート活動として続け、「自由に自分らしく生きる」を体現している。行動が先、信念が後。",
    en: "Since first year of university, freestyle skiing has continued as an art form — living freely, as oneself. Action first, belief follows.",
  },
  "philosophy|writing": {
    ja: "「最高裁で原告になった母親は僕の活動の原点だ」に、政治をタブー視する風潮と戦う理由を書いている。",
    en: "“My Mother's Supreme Court Case Is the Origin of Everything I Do” explains why he fights the taboo around talking politics.",
  },
  "philosophy|media": {
    ja: "JDiCE で「SNS時代の分断と主権者教育：良識をどう育むか」を発表。対話の思想を、教育の場で語った。",
    en: "Presented “Division in the SNS Era & Civic Education” at JDiCE — the philosophy of dialogue, spoken in an education setting.",
  },
  "skiing|achievements": {
    ja: "近畿大会（アルペン / 2025年）男子団体初優勝。インターハイには同志社34年ぶりの出場。",
    en: "Men's team champion at the 2025 Kinki regional (alpine); qualified for Inter-High, Doshisha's first in 34 years.",
  },
  "skiing|media": {
    ja: "さっぽろ雪まつりにゲストパフォーマーとして出演。Instagram のフリースタイル動画は累計30万回以上再生。",
    en: "Guest performer at the Sapporo Snow Festival; freestyle videos on Instagram have passed 300K views.",
  },
  "skiing|writing": {
    ja: "3歳でスキー板を履いた話から始まる「スキーバカが政治教育に手を出し、SFCに入学するまで」。",
    en: "“From Ski Bum to Political Activist to SFC” begins with standing on skis at age three.",
  },
  "media|writing": {
    ja: "Yahoo!ニュースで「茶番」と叩かれた経験を「社会活動をしたらYahoo!ニュースで叩かれた件」に書いた。",
    en: "Being called a “farce” by Yahoo! News commenters became the essay “When Our Social Initiative Got Trashed on Yahoo! News”.",
  },
  "achievements|writing": {
    ja: "「20歳になる僕の、今年の抱負」で、学生団体サミット優勝の翌年の迷走と覚悟を振り返っている。",
    en: "“Turning 20: My Resolutions for This Year” looks back on the drift and resolve that followed the Summit win.",
  },
};

export function relationKey(a: TopicId, b: TopicId): string {
  return [a, b].sort().join("|");
}

// Keys above are written in reading order; look them up order-independently.
const BY_SORTED_KEY: Record<string, Record<Locale, string>> = Object.fromEntries(
  Object.entries(RELATIONS).map(([k, v]) => [k.split("|").sort().join("|"), v])
);

export function getRelation(a: TopicId, b: TopicId, locale: Locale): string | null {
  if (a === b) return null;
  const r = BY_SORTED_KEY[relationKey(a, b)];
  return r ? r[locale] : null;
}
