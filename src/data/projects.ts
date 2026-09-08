export interface ProjectDetail {
  slug: string;
  tag: string;
  title: { ja: string; en: string };
  subtitle?: { ja: string; en: string };
  role: { ja: string; en: string };
  period: { ja: string; en: string };
  description: { ja: string; en: string };
  longDescription?: { ja: string; en: string };
  /** why it started / what was done / what was learned / where it stands — in Koya's words */
  why?: { ja: string; en: string };
  what?: { ja: string; en: string };
  learned?: { ja: string; en: string };
  status?: { ja: string; en: string };
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
      ja: "共同創設者・元代表（2024年9月〜2026年5月）",
      en: "Co-founder; President Sep 2024 – May 2026",
    },
    period: { ja: "2024年9月〜", en: "Sep 2024 –" },
    description: {
      ja: "若者の主体的な政治参加を促す学生団体。設立時4名から55名へ成長させ、超党派の国会議員5名を招いた大規模イベントを実現。",
      en: "A student organization promoting youth political participation. Grew from 4 to 55 members and organized large-scale events featuring 5 bipartisan Diet members.",
    },
    longDescription: {
      ja: "「人は互いを完全には理解できない。だからこそ対話で社会を作る。」この信念のもと、若者が政治に主体的に参加するための場づくりを行っている。SNS発信、イベント企画、出前授業など多角的にアプローチし、政治を「遠い世界の話」から「自分ごと」へと変える活動を展開。母親が選択的夫婦別姓訴訟の原告という家庭で育ち、「声を上げなければ社会は変わらない」という原体験が活動の根幹にある。",
      en: "Under the belief that 'we can never fully understand each other — that's why we build society through dialogue,' Mirakoe creates spaces for young people to actively participate in politics. Through social media, events, and guest lectures, the organization transforms politics from a distant concept into a personal matter.",
    },
    learned: {
      ja: "1人ではなく、みんなで。大きなことは1人では成し遂げられない。",
      en: "Not alone — together. Nothing big gets done by one person.",
    },
    status: {
      ja: "2026年5月に代表を退任。共同創設者。",
      en: "Stepped down as president in May 2026; co-founder.",
    },
    image: "/images/miraisenkyo_photo.jpg",
    images: ["/images/miraisenkyo_photo.jpg", "/images/class_miracoe.jpg"],
    url: "https://miracoe.org/",
    stats: [
      { value: "271", label: { ja: "ミライ選挙 参加者", en: "Mirai Election Attendees" } },
      { value: "55", label: { ja: "メンバー数（最大）", en: "Members (peak)" } },
      { value: "70万+", label: { ja: "Instagram 閲覧数（2025年6月時点）", en: "Instagram views (as of Jun 2025)" } },
      { value: "21", label: { ja: "協賛団体（ミライ選挙）", en: "Sponsors (Mirai Election)" } },
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
      { date: "2026.05", event: { ja: "代表を退任、共同代表体制へ", en: "Steps down as president; co-president structure" } },
    ],
  },
  {
    slug: "bedrock-space",
    tag: "Startup",
    title: { ja: "Zero Industries", en: "Zero Industries" },
    subtitle: { ja: "旧 Bedrock Space", en: "formerly Bedrock Space" },
    role: {
      ja: "共同創業・COO（2026年2月〜現在）",
      en: "Co-founder & COO (Feb 2026 – Present)",
    },
    period: { ja: "2026年2月〜現在", en: "Feb 2026 – Present" },
    description: { ja: "", en: "" },
    longDescription: {
      ja: "CEOから直接COOを頼まれて加入。事業の立ち上げフェーズにおけるオペレーション構築・チームマネジメントを担当。",
      en: "Invited directly by the CEO to join as COO. Leading operations setup and team management during the founding phase.",
    },
    why: {
      ja: "CEOの杉原に自分から連絡したのがきっかけ。",
      en: "It started with me reaching out to Kai Sugihara, the CEO.",
    },
    what: {
      ja: "合計16名の会社に成長。光産業創生大学院大学との共同研究を締結。",
      en: "Grown to a team of 16. Signed a joint-research agreement with the Graduate School for the Creation of New Photonics Industries.",
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
      ja: "能登半島地震の復興支援をきっかけに、輪島塗という伝統工芸の現代化に取り組んだ。田谷漆器店との契約締結、3回の現地視察、商品企画まで進めたが、法人設立には至らなかった。この失敗から、事業づくりにおける市場選定の重さを学んだ。",
      en: "Starting from earthquake relief efforts in the Noto Peninsula, this project aimed to modernize Wajima lacquerware. Despite signing a partnership and conducting three site visits, incorporation was not achieved. The failure taught how much market selection matters when building a business.",
    },
    why: {
      ja: "能登半島は2030年の日本が抱える課題の先進地だと聞き、ここから地方に広がる地方創生の先駆けになる取り組みができると考えた。",
      en: "I'd heard the Noto Peninsula was living Japan's 2030 problems ahead of time, and thought a model for regional revival could start there and spread.",
    },
    learned: {
      ja: "事業づくりには市場選定が重要。自分の原体験や育った環境をメタ認知して、諦めずに続けられる領域と手段を選ぶこと。",
      en: "Market selection matters enormously. Know your own origins and environment well enough to pick a field, and a means, you can keep going in without giving up.",
    },
    status: {
      ja: "創業には至らず。AI領域へピボット。",
      en: "Did not reach founding. Pivoted to AI.",
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
