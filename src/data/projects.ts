export interface ProjectDetail {
  slug: string;
  tag: string;
  title: { ja: string; en: string };
  subtitle?: { ja: string; en: string };
  role: { ja: string; en: string };
  period: { ja: string; en: string };
  description: { ja: string; en: string };
  longDescription?: { ja: string; en: string };
  image?: string;
  images?: string[];
  url?: string;
  stats?: { value: string; label: { ja: string; en: string } }[];
  highlights?: { ja: string; en: string }[];
  reflection?: { ja: string; en: string };
  timeline?: { date: string; event: { ja: string; en: string } }[];
}

export const projects: ProjectDetail[] = [
  {
    slug: "mirakoe",
    tag: "Student Organization",
    title: { ja: "ミラコエ", en: "Mirakoe" },
    subtitle: {
      ja: "ミライを創るコエ",
      en: "Voices That Create the Future",
    },
    role: {
      ja: "代表（2024年9月〜現在）",
      en: "Founder & President (Sep 2024 – Present)",
    },
    period: { ja: "2024年9月〜現在", en: "Sep 2024 – Present" },
    description: {
      ja: "若者の主体的な政治参加を促す学生団体。設立時4名から55名へ成長させ、超党派の国会議員5名を招いた大規模イベントを実現。",
      en: "A student organization promoting youth political participation. Grew from 4 to 55 members and organized large-scale events featuring 5 bipartisan Diet members.",
    },
    longDescription: {
      ja: "「人は互いを完全には理解できない。だからこそ対話で社会を作る。」この信念のもと、若者が政治に主体的に参加するための場づくりを行っている。SNS発信、イベント企画、出前授業など多角的にアプローチし、政治を「遠い世界の話」から「自分ごと」へと変える活動を展開。母親が選択的夫婦別姓訴訟の原告という家庭で育ち、「声を上げなければ社会は変わらない」という原体験が活動の根幹にある。",
      en: "Under the belief that 'we can never fully understand each other — that's why we build society through dialogue,' Mirakoe creates spaces for young people to actively participate in politics. Through social media, events, and guest lectures, the organization transforms politics from a distant concept into a personal matter.",
    },
    image: "/images/miraisenkyo_photo.jpg",
    images: ["/images/miraisenkyo_photo.jpg", "/images/class_miracoe.jpg"],
    url: "https://miracoe.org/",
    stats: [
      { value: "271", label: { ja: "ミライ選挙 参加者", en: "Mirai Election Attendees" } },
      { value: "55", label: { ja: "メンバー数", en: "Members" } },
      { value: "70万+", label: { ja: "Instagram 閲覧数", en: "Instagram Views" } },
      { value: "21", label: { ja: "協賛団体", en: "Corporate Sponsors" } },
    ],
    highlights: [
      {
        ja: "ミライ選挙 — 超党派の国会議員5名を招聘、参加者満足度 8.45/10、再参加意向 97%",
        en: "Mirai Election — Invited 5 bipartisan Diet members; satisfaction 8.45/10, 97% would attend again",
      },
      {
        ja: "ぽりふぇす — Red Bull協賛、子育て世帯200名動員",
        en: "Polifes — Sponsored by Red Bull; 200 families with children attended",
      },
      {
        ja: "出前授業「つくろう。未来。」— 選挙管理委員会からの依頼による主権者教育",
        en: "Guest lectures 'Let's Build the Future' — Civic education commissioned by election committees",
      },
      {
        ja: "SNS — TikTok街頭インタビュー、X上で泉健太議員・青山繁晴議員との公開ディスカッション",
        en: "SNS — TikTok street interviews; public discussions with Diet members on X",
      },
    ],
    timeline: [
      { date: "2024.09", event: { ja: "4名で設立", en: "Founded with 4 members" } },
      { date: "2024.12", event: { ja: "メンバー20名突破", en: "Surpassed 20 members" } },
      { date: "2025.03", event: { ja: "ミライ選挙 開催（271名参加）", en: "Mirai Election held (271 attendees)" } },
      { date: "2025.06", event: { ja: "ぽりふぇす 開催（Red Bull協賛）", en: "Polifes held (Red Bull sponsored)" } },
      { date: "2025.07", event: { ja: "学生団体サミット 優勝", en: "Student Org Summit — Grand Prize" } },
      { date: "2025.09", event: { ja: "メンバー55名に成長", en: "Grew to 55 members" } },
    ],
  },
  {
    slug: "bedrock-space",
    tag: "Startup",
    title: { ja: "Bedrock Space", en: "Bedrock Space" },
    role: {
      ja: "共同創業・COO（2026年2月〜現在）",
      en: "Co-founder & COO (Feb 2026 – Present)",
    },
    period: { ja: "2026年2月〜現在", en: "Feb 2026 – Present" },
    description: {
      ja: "共同創業メンバーとして参画。COO（Chief Operating Officer）として事業運営を推進中。",
      en: "Joined as a co-founding member. Driving business operations as COO (Chief Operating Officer).",
    },
    longDescription: {
      ja: "CEOから直接COOを頼まれて加入。事業の立ち上げフェーズにおけるオペレーション構築・チームマネジメントを担当。",
      en: "Invited directly by the CEO to join as COO. Leading operations setup and team management during the founding phase.",
    },
  },
  {
    slug: "noto",
    tag: "Past Project",
    title: { ja: "能登・輪島塗事業", en: "Noto · Wajima Lacquerware" },
    role: { ja: "2025年〜2026年初頭", en: "2025 – Early 2026" },
    period: { ja: "2025年〜2026年初頭", en: "2025 – Early 2026" },
    description: {
      ja: "石川県能登半島の伝統工芸（輪島塗）を現代プロダクトに展開する事業を構想。田谷漆器店とパートナー契約を締結し、3回の現地訪問で事業の種を育てた。法人設立を目指したが実現に至らず、AI領域へピボット。",
      en: "Envisioned bringing Wajima lacquerware, a traditional craft from the Noto Peninsula, into modern products. Signed a partnership with Taya Lacquerware and visited the region three times. Pivoted to AI after the venture didn't reach incorporation.",
    },
    longDescription: {
      ja: "能登半島地震の復興支援をきっかけに、輪島塗という伝統工芸の現代化に取り組んだ。田谷漆器店との契約締結、3回の現地視察、商品企画まで進めたが、法人設立には至らなかった。しかしこの経験は「現場から始める」という行動原理を強化し、その後のAI領域へのピボットの土台となった。",
      en: "Starting from earthquake relief efforts in the Noto Peninsula, this project aimed to modernize Wajima lacquerware. Despite signing a partnership and conducting three site visits, incorporation was not achieved. The experience reinforced the principle of 'starting from the field' and laid the foundation for the subsequent pivot to AI.",
    },
    reflection: {
      ja: "「能登半島から日本再生は超長期的なプロジェクトであり、人生を通して見つめたい。」",
      en: "'Revitalizing Japan through the Noto Peninsula is an ultra-long-term project — one I want to keep in sight throughout my life.'",
    },
    timeline: [
      { date: "2025.01", event: { ja: "能登半島地震を機に構想開始", en: "Concept began after Noto earthquake" } },
      { date: "2025.04", event: { ja: "田谷漆器店とパートナー契約", en: "Partnership with Taya Lacquerware" } },
      { date: "2025.06", event: { ja: "第3回現地訪問", en: "Third site visit" } },
      { date: "2026.01", event: { ja: "AI領域へピボット", en: "Pivoted to AI" } },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getAllSlugs() {
  return projects.map((p) => p.slug);
}
