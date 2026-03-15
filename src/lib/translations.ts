export type Locale = "ja" | "en";

export const translations = {
  ja: {
    // Header
    nav: {
      about: "About",
      projects: "Projects",
      achievements: "Achievements",
      media: "Media",
      skiing: "Skiing",
      contact: "Contact",
    },

    // Hero
    hero: {
      badge: "Portfolio 2026",
      name: "谷昊埜",
      nameEn: "Koya Tani",
      tagline1: "人は互いを完全には理解できない。",
      tagline2: "だからこそ対話で社会を作る。",
      scroll: "Scroll",
    },

    // About
    about: {
      label: "About",
      heading1: "19歳。京都から慶應SFCへ。",
      heading2: "対話と行動で社会を動かす。",
      bio1: "同志社高等学校から慶應義塾大学SFCへ。学生団体ミラコエの代表として55名の組織を率い、超党派の国会議員を招いた271名規模のイベントを実現。",
      bio2: "母親が選択的夫婦別姓訴訟の原告という家庭で、「声を上げなければ社会は変わらない」という信念とともに育った。メキシコ出身の方との同居経験や、南アフリカ人の友人家族との交流など、多文化的な環境が現在の活動の原点。",
      bio3: "フリースタイルスキーではジュニアワールドツアー2位の実績を持ち、競技で培った「まず飛ぶ。考えるのはその後」という姿勢が、すべての活動に通底している。",
      principlesLabel: "行動原理",
      principles: [
        "アイデアの源泉は現場にある",
        "長期的リターンを見据えた誠実さ",
        "仲間・チームで動くリーダーシップ",
        "行動が先、信念が後",
      ],
      internationalLabel: "海外経験",
      international: [
        "ケニア — 小学生への日本文化授業",
        "インドネシア — 語学研修（2025年）",
        "アメリカ — ホームステイ受入家庭で育つ",
        "ベトナム・シンガポール — 渡航経験",
      ],
      academicsLabel: "学業",
      academics1: "慶應SFC 総合政策学部（2025年4月入学）",
      academics2: "清水先生の日本政治外交研究（JPD）所属",
      profileAlt: "谷昊埜 — 海をバックにした笑顔のポートレート",
      kenyaAlt: "ケニアの子どもたちと — 日本文化授業の様子",
    },

    // Projects
    projects: {
      label: "Projects",
      mirakoe: {
        tag: "Student Organization",
        title: "ミラコエ",
        subtitle: "ミライを創るコエ",
        role: "代表（2024年9月〜現在）",
        description:
          "若者の主体的な政治参加を促す学生団体。設立時4名から55名へ成長させ、超党派の国会議員5名を招いた大規模イベントを実現。",
        stats: [
          { value: "271", label: "ミライ選挙 参加者" },
          { value: "55", label: "メンバー数" },
          { value: "70万+", label: "Instagram 閲覧数" },
          { value: "21", label: "協賛団体" },
        ],
        highlights: [
          "ミライ選挙 — 超党派の国会議員5名を招聘、参加者満足度 8.45/10、再参加意向 97%",
          "ぽりふぇす — Red Bull協賛、子育て世帯200名動員",
          "出前授業「つくろう。未来。」— 選挙管理委員会からの依頼による主権者教育",
          "SNS — TikTok街頭インタビュー、X上で泉健太議員・青山繁晴議員との公開ディスカッション",
        ],
      },
      bedrock: {
        tag: "Startup",
        title: "Bedrock Space",
        role: "共同創業・Chief of Staff（2026年2月〜現在）",
        description:
          "共同創業メンバーとして参画。CoS（Chief of Staff）として事業運営を推進中。",
      },
      noto: {
        tag: "Past Project",
        title: "能登・輪島塗事業",
        role: "2025年〜2026年初頭",
        description:
          "石川県能登半島の伝統工芸（輪島塗）を現代プロダクトに展開する事業を構想。田谷漆器店とパートナー契約を締結し、3回の現地訪問で事業の種を育てた。法人設立を目指したが実現に至らず、AI領域へピボット。",
        reflection:
          "「能登半島から日本再生は超長期的なプロジェクトであり、人生を通して見つめたい。」",
      },
    },

    // Achievements
    achievements: {
      label: "Achievements",
      affiliationsLabel: "所属・プログラム",
      items: [
        {
          year: "2026.01",
          title: "Dan Okimoto Rising Innovators Fellows 最年少採択",
          detail: "Silicon Valley Japan Platform主催のフェローシッププログラム",
        },
        {
          year: "2025.07",
          title: "第5回学生団体サミット 優勝",
          detail: "日本一の学生団体の代表に（賞金20万円）",
        },
        {
          year: "2025",
          title: "宮古島観光戦略プログラム 最優秀賞",
          detail:
            "リクルート主催。人流データを活用した閑散期の観光客滞在日数増加戦略を提案",
        },
        {
          year: "2024",
          title: "アプリ甲子園 1次選考通過",
          detail: "京都のゴミ問題をAIで解決するアプリを開発",
        },
        {
          year: "2024",
          title: "TSG 1次選考通過",
          detail: "高校3年次",
        },
        {
          year: "2024",
          title: "モノコトイノベーション 5位入賞",
          detail: "高校2年次",
        },
      ],
      affiliations: [
        "IVSスカラシップ 2期生（2025年7月〜）",
        "慶應ビジネスクラブ（KBC）21期",
        "日本若者協議会",
        "起業義塾部",
        "ゴブリンスキークラブ",
      ],
    },

    // Media
    media: {
      label: "Media",
      heading: "メディア掲載・出演",
      categories: [
        {
          category: "TV / Web番組",
          items: [
            {
              title: "AbemaTV",
              detail: "2026年衆議院選挙 選挙特番に出演",
              url: "https://www.youtube.com/watch?v=ErYx_5WFNM0",
            },
            { title: "TBS京都", detail: "ミラコエの活動紹介がテレビ放映" },
            {
              title: "YouTube「令和の猫」",
              detail: "レギュラーとして継続出演",
              url: "https://www.youtube.com/watch?v=DUPNnr09aBQ&t=760s",
            },
            {
              title: "YouTube「日本未来会議」",
              detail: "外国人労働者受け入れ等のテーマで複数回出演",
              url: "https://www.youtube.com/watch?v=qrzjkqnooBQ&t=120s",
            },
          ],
        },
        {
          category: "新聞 / Web",
          items: [
            { title: "Yahoo! ニュース", detail: "ミラコエの活動が掲載" },
            { title: "読売新聞・京都新聞", detail: "複数回にわたり活動を紹介" },
          ],
        },
        {
          category: "登壇",
          items: [
            {
              title: "JDiCE 日本デジタルシティズンシップ教育研究会",
              detail:
                "「SNS時代の分断と主権者教育：良識をどう育むか」を発表",
            },
            {
              title: "能登半島 七尾茶谷市長講演会",
              detail: "市長に向けた講演を実施",
            },
          ],
        },
      ],
    },

    // Skiing
    skiing: {
      label: "Skiing",
      heading1: "フリースタイル",
      heading2: "アルペン",
      description:
        "フリースタイル・アルペンの二刀流で活動。大学1年次からはフリースタイルスキーをアート活動として継続し、自由に自分らしく生きることを体現している。",
      resultsLabel: "競技成績",
      results: [
        { event: "ジュニアワールドツアー（フリースタイル）", result: "2位", highlight: true },
        { event: "全日本選手権（フリースタイル）", result: "15位", highlight: false },
        { event: "近畿大会（アルペン / 2025年）", result: "男子団体初優勝", highlight: true },
        { event: "京都府スキー選手権（アルペン）", result: "3位（2年連続）", highlight: false },
        { event: "全国高等学校総体（インターハイ）", result: "出場（同志社34年ぶり）", highlight: true },
      ],
      othersLabel: "その他",
      others: [
        "さっぽろ雪まつり — ゲストパフォーマーとして出演",
        "石川能登チャリティーイベント参加",
        "Instagramフリースタイル動画 累計30万回以上再生",
      ],
      photoAlt: "谷昊埜 — フリースタイルスキーのエアトリック",
    },

    // Contact
    contact: {
      label: "Contact",
      heading: "話しましょう。",
      description:
        "取材・登壇・協業のご相談など、お気軽にSNSからご連絡ください。",
      scheduleButton: "日程を調整する",
      photoAlt: "谷昊埜 — 海を見つめる後ろ姿",
    },

    // Footer
    footer: {
      copyright: "\u00a9 2026 Koya Tani",
      builtWith: "Built with Next.js",
    },
  },

  en: {
    nav: {
      about: "About",
      projects: "Projects",
      achievements: "Achievements",
      media: "Media",
      skiing: "Skiing",
      contact: "Contact",
    },

    hero: {
      badge: "Portfolio 2026",
      name: "谷昊埜",
      nameEn: "Koya Tani",
      tagline1: "We can never fully understand each other.",
      tagline2: "That\u2019s why we build society through dialogue.",
      scroll: "Scroll",
    },

    about: {
      label: "About",
      heading1: "19 years old. Kyoto to Keio SFC.",
      heading2: "Moving society through dialogue and action.",
      bio1: "From Doshisha High School to Keio University SFC. As founder of student organization Mirakoe, grew the team from 4 to 55 members and organized a 271-person event featuring 5 Diet members from across party lines.",
      bio2: "Raised in a household where his mother is a plaintiff in Japan\u2019s selective surname lawsuit, growing up with the belief that \u201csociety won\u2019t change unless you speak up.\u201d Living with someone from Mexico and close ties with a South African family shaped a multicultural foundation for his current work.",
      bio3: "Placed 2nd in the Junior World Tour for freestyle skiing. The mindset of \u201cjump first, think later\u201d cultivated through competition runs through everything he does.",
      principlesLabel: "Principles",
      principles: [
        "Ideas come from the field",
        "Integrity with long-term returns in mind",
        "Leadership that moves with the team",
        "Action first, belief follows",
      ],
      internationalLabel: "International Experience",
      international: [
        "Kenya \u2014 Teaching Japanese culture to elementary students",
        "Indonesia \u2014 Language program (2025)",
        "USA \u2014 Grew up hosting homestay students annually",
        "Vietnam & Singapore \u2014 Travel experience",
      ],
      academicsLabel: "Academics",
      academics1: "Keio SFC, Faculty of Policy Management (enrolled Apr 2025)",
      academics2: "Shimizu Lab \u2014 Japanese Politics & Diplomacy (JPD)",
      profileAlt: "Koya Tani \u2014 Portrait with ocean backdrop",
      kenyaAlt: "With children in Kenya \u2014 Japanese culture class",
    },

    projects: {
      label: "Projects",
      mirakoe: {
        tag: "Student Organization",
        title: "Mirakoe",
        subtitle: "Voices That Create the Future",
        role: "Founder & President (Sep 2024 \u2013 Present)",
        description:
          "A student organization promoting youth political participation. Grew from 4 to 55 members and organized large-scale events featuring 5 bipartisan Diet members.",
        stats: [
          { value: "271", label: "Mirai Election Attendees" },
          { value: "55", label: "Members" },
          { value: "700K+", label: "Instagram Views" },
          { value: "21", label: "Corporate Sponsors" },
        ],
        highlights: [
          "Mirai Election \u2014 Invited 5 bipartisan Diet members; satisfaction 8.45/10, 97% would attend again",
          "Polifes \u2014 Sponsored by Red Bull; 200 families with children attended",
          "Guest lectures \u201cLet\u2019s Build the Future\u201d \u2014 Civic education commissioned by election committees",
          "SNS \u2014 TikTok street interviews; public discussions with Diet members on X",
        ],
      },
      bedrock: {
        tag: "Startup",
        title: "Bedrock Space",
        role: "Co-founder & Chief of Staff (Feb 2026 \u2013 Present)",
        description:
          "Joined as a co-founding member. Driving business operations as Chief of Staff (CoS).",
      },
      noto: {
        tag: "Past Project",
        title: "Noto \u00b7 Wajima Lacquerware",
        role: "2025 \u2013 Early 2026",
        description:
          "Envisioned bringing Wajima lacquerware, a traditional craft from the Noto Peninsula, into modern products. Signed a partnership with Taya Lacquerware and visited the region three times. Pivoted to AI after the venture didn\u2019t reach incorporation.",
        reflection:
          "\u201cRevitalizing Japan through the Noto Peninsula is an ultra-long-term project \u2014 one I want to keep in sight throughout my life.\u201d",
      },
    },

    achievements: {
      label: "Achievements",
      affiliationsLabel: "Affiliations & Programs",
      items: [
        {
          year: "2026.01",
          title: "Dan Okimoto Rising Innovators Fellows \u2014 Youngest Selectee",
          detail:
            "Fellowship program by Silicon Valley Japan Platform",
        },
        {
          year: "2025.07",
          title: "5th Student Organization Summit \u2014 Grand Prize",
          detail: "Named Japan\u2019s No.1 student organization leader (\u00a5200K prize)",
        },
        {
          year: "2025",
          title: "Miyako Island Tourism Strategy \u2014 Best Award",
          detail:
            "Recruit-sponsored. Proposed a data-driven strategy to increase tourist stays during off-peak seasons",
        },
        {
          year: "2024",
          title: "App Koshien \u2014 1st Round Pass",
          detail: "Developed an AI app to solve Kyoto\u2019s waste problem",
        },
        {
          year: "2024",
          title: "TSG \u2014 1st Round Pass",
          detail: "High school senior year",
        },
        {
          year: "2024",
          title: "Monokoto Innovation \u2014 5th Place",
          detail: "High school junior year",
        },
      ],
      affiliations: [
        "IVS Scholarship 2nd Cohort (Jul 2025\u2013)",
        "Keio Business Club (KBC) 21st Cohort",
        "Japan Youth Council",
        "Keio Entrepreneurship Club",
        "Goblin Ski Club",
      ],
    },

    media: {
      label: "Media",
      heading: "Media & Appearances",
      categories: [
        {
          category: "TV / Web Shows",
          items: [
            {
              title: "AbemaTV",
              detail: "Appeared on 2026 House of Representatives election special",
              url: "https://www.youtube.com/watch?v=ErYx_5WFNM0",
            },
            { title: "TBS Kyoto", detail: "TV coverage of Mirakoe\u2019s activities" },
            {
              title: "YouTube \u201cReiwa no Neko\u201d",
              detail: "Regular cast member",
              url: "https://www.youtube.com/watch?v=DUPNnr09aBQ&t=760s",
            },
            {
              title: "YouTube \u201cNihon Mirai Kaigi\u201d",
              detail: "Multiple appearances discussing foreign labor policy",
              url: "https://www.youtube.com/watch?v=qrzjkqnooBQ&t=120s",
            },
          ],
        },
        {
          category: "Press",
          items: [
            { title: "Yahoo! News", detail: "Coverage of Mirakoe\u2019s activities" },
            {
              title: "Yomiuri Shimbun \u00b7 Kyoto Shimbun",
              detail: "Multiple articles covering activities",
            },
          ],
        },
        {
          category: "Speaking",
          items: [
            {
              title: "JDiCE \u2014 Japan Digital Citizenship Education",
              detail:
                "Presented \u201cDivision in the SNS Era & Civic Education: How Do We Foster Good Judgment?\u201d",
            },
            {
              title: "Noto Peninsula \u2014 Mayor Chatani Lecture",
              detail: "Delivered a lecture to the Mayor of Nanao City",
            },
          ],
        },
      ],
    },

    skiing: {
      label: "Skiing",
      heading1: "Freestyle",
      heading2: "Alpine",
      description:
        "Competing in both freestyle and alpine skiing. Since his first year of university, he has continued freestyle skiing as an art form, embodying freedom and self-expression.",
      resultsLabel: "Competition Results",
      results: [
        { event: "Junior World Tour (Freestyle)", result: "2nd", highlight: true },
        { event: "All-Japan Championship (Freestyle)", result: "15th", highlight: false },
        { event: "Kinki Regional (Alpine / 2025)", result: "Men\u2019s Team Champion", highlight: true },
        { event: "Kyoto Pref. Championship (Alpine)", result: "3rd (2 consecutive years)", highlight: false },
        { event: "National Inter-High (Alpine)", result: "Qualified (Doshisha\u2019s 1st in 34 years)", highlight: true },
      ],
      othersLabel: "Other",
      others: [
        "Sapporo Snow Festival \u2014 Performed as guest",
        "Noto charity event participant",
        "Instagram freestyle videos \u2014 300K+ total views",
      ],
      photoAlt: "Koya Tani \u2014 Freestyle skiing aerial trick",
    },

    contact: {
      label: "Contact",
      heading: "Let\u2019s talk.",
      description:
        "For press, speaking, or collaboration inquiries, feel free to reach out via social media.",
      scheduleButton: "Schedule a Meeting",
      photoAlt: "Koya Tani \u2014 Looking out at the ocean",
    },

    footer: {
      copyright: "\u00a9 2026 Koya Tani",
      builtWith: "Built with Next.js",
    },
  },
} as const;
