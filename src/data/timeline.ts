import type { Locale } from "@/lib/translations";

export interface TimelineEntry {
  when: string; // display label, e.g. "2025.03"
  event: Record<Locale, string>;
  note?: Record<Locale, string>;
}

/** Chronology shown in the About panel. Facts from the existing site and the 2026-09-08 content sheet. */
export const timeline: TimelineEntry[] = [
  { when: "2006", event: { ja: "京都で生まれる", en: "Born in Kyoto" } },
  { when: "2009", event: { ja: "3 歳でスキーを始める", en: "Starts skiing at three" } },
  {
    when: "2020 頃",
    event: {
      ja: "中学時代、コロナ禍に「荒野行動」でスモールビジネスを始める。iPad を買う",
      en: "Junior high, mid-pandemic: a first small business around the game Knives Out. Buys an iPad",
    },
  },
  {
    when: "2022.04",
    event: { ja: "同志社高校に入学。岩倉祭 総監督（高 1）", en: "Enters Doshisha High School. Directs the Iwakura Festival (Y1)" },
  },
  {
    when: "2023",
    event: { ja: "吉本新喜劇に主演（高 2）。JOF キャンプリーダー", en: "Leads a Yoshimoto Shinkigeki stage (Y2). JOF camp leader" },
  },
  {
    when: "2024",
    event: {
      ja: "岩倉祭 分団長（高 3）。アプリ甲子園・TSG 1 次通過、モノコトイノベーション 5 位",
      en: "Festival division leader (Y3). First-round passes at App Koshien and TSG; 5th at Monokoto Innovation",
    },
  },
  { when: "2024.09", event: { ja: "ミラコエを 4 名で設立", en: "Founds Mirakoe with four members" } },
  { when: "2025.03", event: { ja: "ミライ選挙を開催（271 名参加）", en: "Hosts Mirai Election (271 attendees)" } },
  { when: "2025.04", event: { ja: "慶應義塾大学 SFC 総合政策学部に入学", en: "Enters Keio SFC, Faculty of Policy Management" } },
  {
    when: "2025",
    event: { ja: "ケニアで小学生に日本文化の授業。インドネシアで語学研修", en: "Teaches Japanese culture in Kenya; language program in Indonesia" },
  },
  { when: "2025.06", event: { ja: "ぽりふぇす（Red Bull 協賛）", en: "Polifes, sponsored by Red Bull" } },
  {
    when: "2025.07",
    event: { ja: "第 5 回学生団体サミット 優勝。IVS スカラシップ 2 期", en: "Wins the 5th Student Organization Summit. IVS Scholarship, 2nd cohort" },
  },
  { when: "2025", event: { ja: "ゴブリンスキークラブ（慶應、65 年の歴史）の代表を引き受ける", en: "Takes over as president of Goblin, Keio's 65-year-old ski club" } },
  {
    when: "2025–2026",
    event: {
      ja: "能登・輪島塗の事業を構想。田谷漆器店と契約、3 回の現地訪問。法人設立に至らず",
      en: "Plans a Wajima lacquerware venture in Noto: partnership signed, three visits, no incorporation",
    },
  },
  { when: "2026.01", event: { ja: "Dan Okimoto Rising Innovators Fellows に最年少で採択", en: "Youngest selectee, Dan Okimoto Rising Innovators Fellows" } },
  { when: "2026.02", event: { ja: "Zero Industries（旧 Bedrock Space）を共同創業。COO", en: "Co-founds Zero Industries (formerly Bedrock Space) as COO" } },
  { when: "2026.02", event: { ja: "宮古島観光戦略プログラム（リクルート）最優秀賞", en: "Best Award, Recruit's Miyako Island tourism strategy program" } },
  {
    when: "2026.03",
    event: { ja: "SVJP フェローシップでシリコンバレーへ（6 日間）。石倉大樹氏から学ぶ", en: "Six days in Silicon Valley on the SVJP fellowship; learns from Daiki Ishikura" },
  },
  { when: "2026.05", event: { ja: "ミラコエの代表を退任", en: "Steps down as president of Mirakoe" } },
];
