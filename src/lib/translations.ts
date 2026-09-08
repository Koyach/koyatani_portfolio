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
      bio1: "同志社高等学校から慶應義塾大学SFCへ。学生団体ミラコエを共同創設し、代表として55名の組織を率いて、超党派の国会議員を招いた271名規模のイベントを実現（代表は2026年5月に退任）。",
      bio2: "母親が選択的夫婦別姓訴訟の原告という家庭で、「声を上げなければ社会は変わらない」という信念とともに育った。メキシコ出身の方との同居経験や、南アフリカ人の友人家族との交流など、多文化的な環境が現在の活動の原点。",
      bio3: "フリースタイルスキーではジュニアワールドツアー2位の実績を持ち、競技で培った「まず飛ぶ。考えるのはその後」という姿勢が、すべての活動に通底している。",
      principlesLabel: "行動原理",
      principles: [
        "長期的リターンを見据えた誠実さ",
        "仲間・チームで動くリーダーシップ",
        "行動が先、信念が後",
      ],
      internationalLabel: "海外経験",
      international: [
        "ケニア — 小学生への日本文化授業（2025年）",
        "インドネシア — 語学研修（2025年）",
        "アメリカ — ホームステイ受入家庭で育つ（幼少期〜）",
        "シリコンバレー — 石倉大樹氏から学ぶ（2026年）",
        "シンガポール・ベトナム — 渡航経験",
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
        role: "共同創設者・元代表（2024年9月〜2026年5月）",
        description:
          "若者の主体的な政治参加を促す学生団体。設立時4名から55名へ成長させ、超党派の国会議員5名を招いた大規模イベントを実現。",
        stats: [
          { value: "271", label: "ミライ選挙 参加者" },
          { value: "55", label: "メンバー数（最大）" },
          { value: "70万+", label: "Instagram 閲覧数（2025年6月時点）" },
          { value: "21", label: "協賛団体（ミライ選挙）" },
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
        title: "Zero Industries",
        subtitle: "旧 Bedrock Space",
        role: "共同創業・COO（2026年2月〜現在）",
        description: "",
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
          detail:
            "Silicon Valley Japan Platform 主催の第1期。2026年3月、シリコンバレーで6日間（企業訪問、Dan Okimoto 氏との対話、最終プレゼン）",
        },
        {
          year: "2025.07",
          title: "第5回学生団体サミット 優勝",
          detail: "約40団体・300名規模のサミットで、5分ピッチにより最年少で優勝（賞金20万円）",
        },
        {
          year: "2026.02",
          title: "宮古島観光戦略プログラム 最優秀賞",
          detail:
            "リクルート WOW! BASE 主催、宮古島市での5日間。人流データを使い「海だけじゃない、3泊4日の島時間」を提案。3人チーム",
        },
        {
          year: "2024",
          title: "アプリ甲子園 1次選考通過（AI開発部門）",
          detail:
            "Trash Image Analyzer — ゴミを撮影すると自作AIが燃える／燃えないを判別。祇園・河原町のゴミ箱位置を実地調査して実装",
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
        "ゴブリンスキークラブ 代表（65年続く慶應のフリースタイルスキーサークル）",
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
              detail: "2026年衆議院選挙 選挙特番に出演（2026年2月）",
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
                "「SNS時代の分断と主権者教育：良識をどう育むか 〜排外主義の広がりから考える、情報モラル教育の課題〜」を発表（2025年11月29日）",
            },
            {
              title: "能登半島 七尾市での講演会",
              detail: "輪島塗事業の縁で講演（2025年12月27日）。茶谷市長も来場",
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
        "ゴブリンスキークラブ 代表 — 週1回のトランポリン練習と月1回のオフトレ施設練習",
      ],
      photoAlt: "谷昊埜 — フリースタイルスキーのエアトリック",
    },

    // Contact
    contact: {
      label: "Contact",
      heading: "話しましょう。",
      description:
        "取材・登壇・協業のご相談など、お気軽にご連絡ください。",
      scheduleButton: "日程を調整する",
      cvButton: "履歴書をダウンロード",
      photoAlt: "谷昊埜 — 海を見つめる後ろ姿",
      formName: "お名前",
      formEmail: "メールアドレス",
      formMessage: "メッセージ",
      formSubmit: "送信する",
      formSending: "送信中...",
      formSuccess: "送信しました。ありがとうございます。",
      formError: "送信に失敗しました。もう一度お試しください。",
    },

    // Footer
    footer: {
      copyright: "\u00a9 2026 Koya Tani",
      builtWith: "Built with Next.js",
    },

    // Chat
    chat: {
      title: "質問する",
      placeholder: "昊埜について何でも聞いてください...",
      send: "送信",
      greeting: "こんにちは！谷昊埜について何か聞きたいことはありますか？",
      error: "エラーが発生しました。もう一度お試しください。",
      rateLimit: "リクエストが多すぎます。少し待ってから再度お試しください。",
    },

    // Atelier (drawing canvas home)
    atelier: {
      ask: "何を知りたい？",
      demoCaption: "四角を描く → 言葉を書く → 開く",
      demoWord: "実績",
      placeholderInShape: "ここに言葉を",
      inputPlaceholder: "言葉を入力（例：実績）",
      inputConfirm: "決定",
      inputCancel: "やめる",
      writePill: "書いた言葉を入力",
      noteRecognized: "手書きを読み取りました。違っていれば直してください。",
      noteNoRecognition: "このブラウザは手書き認識に対応していません。言葉を入力してください。",
      suggestTitle: "「{word}」に近いのは？",
      keepAsIs: "そのまま残す",
      open: "開く",
      close: "閉じる",
      collapse: "折りたたむ",
      expand: "ひらく",
      dragHint: "ドラッグで移動。矢印キーでも動きます",
      help: "使い方",
      index: "一覧",
      contact: "連絡先",
      indexIntro: "描かずに開く入口。",
      helpSteps: [
        "四角や丸を、好きな場所に描く。",
        "その中をタップして、言葉を入れる（実績・私について・コンタクト など）。",
        "図形がボタンになる。押すと、そこから情報がひらく。",
      ],
      helpMore: "2つの図形を線でつなぐと、その関係が出ます。",
      helpShortcuts: "ホイールで移動、Ctrl+ホイールで拡大縮小、スペース+ドラッグで移動。⌘Z 元に戻す、⇧⌘Z やり直す、0 で全体、Esc で閉じる。",
      undo: "元に戻す",
      redo: "やり直す",
      erase: "消す",
      draw: "描く",
      fit: "全体を見る",
      saveImage: "画像として保存",
      reset: "最初から",
      resetConfirm: "描いたものをすべて消して、最初からやり直しますか？",
      relationUnknown: "この2つの関係は、まだ言葉になっていません。",
      restored: "前回の配置を復元しました。",
      a11y: {
        shapeMade: "囲みができました。中をタップすると言葉を入力できます。",
        became: "「{label}」が{topic}への入口になりました。",
        opened: "{topic}をひらきました。",
        closed: "{topic}を閉じました。",
        unknownWord: "「{word}」に対応する項目はありません。近い項目を選べます。",
        connected: "{a}と{b}をつなぎました。",
        erased: "消しました。",
        undone: "元に戻しました。",
        redone: "やり直しました。",
        resetDone: "最初からやり直します。",
      },
      panels: {
        now: "いま",
        more: "くわしく",
        website: "サイト",
        allPosts: "すべての記事",
        alsoOnNote: "note でも書いています",
        minutes: "分で読める",
        results: "競技成績",
        openWriting: "文章をひらく",
        openWorks: "実績をひらく",
        openPhilosophy: "思想をひらく",
        openQuestions: "問いをひらく",
        timeline: "年表",
        updated: "更新",
        email: "メール",
        why: "なぜ始めたか",
        what: "何をしたか",
        learned: "学んだこと",
        status: "いまの状態",
        related: "関連",
        questionsIntro: "図形の中に問いを書くと、ここから答えがひらきます。まだ答えのない問いは、そのまま残ります。",
        askedWord: "あなたの言葉",
        concern: "いまの問題意識",
        origin: "由来",
        allBooks: "本棚をすべて見る",
        questionsInPanel: "この項目への問い",
      },
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
      bio1: "From Doshisha High School to Keio University SFC. Co-founded the student organization Mirakoe, grew it from 4 to 55 members as president and organized a 271-person event featuring 5 Diet members from across party lines (stepped down as president in May 2026).",
      bio2: "Raised in a household where his mother is a plaintiff in Japan\u2019s selective surname lawsuit, growing up with the belief that \u201csociety won\u2019t change unless you speak up.\u201d Living with someone from Mexico and close ties with a South African family shaped a multicultural foundation for his current work.",
      bio3: "Placed 2nd in the Junior World Tour for freestyle skiing. The mindset of \u201cjump first, think later\u201d cultivated through competition runs through everything he does.",
      principlesLabel: "Principles",
      principles: [
        "Integrity with long-term returns in mind",
        "Leadership that moves with the team",
        "Action first, belief follows",
      ],
      internationalLabel: "International Experience",
      international: [
        "Kenya \u2014 Teaching Japanese culture to elementary students (2025)",
        "Indonesia \u2014 Language program (2025)",
        "USA \u2014 Grew up hosting homestay students annually",
        "Silicon Valley \u2014 Learning from Daiki Ishikura (2026)",
        "Singapore & Vietnam \u2014 Travel experience",
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
        role: "Co-founder; President Sep 2024 – May 2026",
        description:
          "A student organization promoting youth political participation. Grew from 4 to 55 members and organized large-scale events featuring 5 bipartisan Diet members.",
        stats: [
          { value: "271", label: "Mirai Election Attendees" },
          { value: "55", label: "Members (peak)" },
          { value: "700K+", label: "Instagram views (as of Jun 2025)" },
          { value: "21", label: "Sponsors (Mirai Election)" },
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
        title: "Zero Industries",
        subtitle: "formerly Bedrock Space",
        role: "Co-founder & COO (Feb 2026 \u2013 Present)",
        description: "",
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
            "First cohort of the Silicon Valley Japan Platform program. Six days in Silicon Valley in March 2026: company visits, a session with Dan Okimoto, final presentation",
        },
        {
          year: "2025.07",
          title: "5th Student Organization Summit \u2014 Grand Prize",
          detail: "Youngest winner among ~40 organizations and 300 attendees, on a five-minute pitch (\u00a5200K prize)",
        },
        {
          year: "2026.02",
          title: "Miyako Island Tourism Strategy \u2014 Best Award",
          detail:
            "Recruit WOW! BASE program, five days on Miyako Island. A team of three used footfall data to propose \u201cmore than the sea: a 3-night island stay\u201d",
        },
        {
          year: "2024",
          title: "App Koshien \u2014 1st Round Pass (AI division)",
          detail:
            "Trash Image Analyzer \u2014 photograph your trash and a home-built model tells burnable from non-burnable; bin locations in Gion and Kawaramachi surveyed on foot",
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
        "President, Goblin Ski Club (Keio\u2019s 65-year-old freestyle ski club)",
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
              detail: "Appeared on the 2026 House of Representatives election special (Feb 2026)",
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
                "Presented \u201cDivision in the SNS Era & Civic Education: How Do We Foster Good Judgment?\u201d (29 Nov 2025)",
            },
            {
              title: "Noto Peninsula \u2014 Lecture in Nanao",
              detail: "A talk born of the lacquerware venture (27 Dec 2025); the mayor of Nanao attended",
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
        "President of Goblin Ski Club \u2014 weekly trampoline practice, monthly off-snow facility sessions",
      ],
      photoAlt: "Koya Tani \u2014 Freestyle skiing aerial trick",
    },

    contact: {
      label: "Contact",
      heading: "Let\u2019s talk.",
      description:
        "For press, speaking, or collaboration inquiries, feel free to reach out.",
      scheduleButton: "Schedule a Meeting",
      cvButton: "Download CV",
      photoAlt: "Koya Tani \u2014 Looking out at the ocean",
      formName: "Name",
      formEmail: "Email",
      formMessage: "Message",
      formSubmit: "Send",
      formSending: "Sending...",
      formSuccess: "Sent successfully. Thank you!",
      formError: "Failed to send. Please try again.",
    },

    footer: {
      copyright: "\u00a9 2026 Koya Tani",
      builtWith: "Built with Next.js",
    },

    chat: {
      title: "Ask me",
      placeholder: "Ask anything about Koya...",
      send: "Send",
      greeting: "Hi! Have any questions about Koya Tani?",
      error: "Something went wrong. Please try again.",
      rateLimit: "Too many requests. Please wait a moment.",
    },

    atelier: {
      ask: "What do you want to know?",
      demoCaption: "Draw a box → write a word → open",
      demoWord: "Work",
      placeholderInShape: "a word goes here",
      inputPlaceholder: "Type a word (e.g. Work)",
      inputConfirm: "Done",
      inputCancel: "Cancel",
      writePill: "Type what you wrote",
      noteRecognized: "Read from your handwriting — fix it if it's wrong.",
      noteNoRecognition: "This browser can't read handwriting. Please type the word.",
      suggestTitle: "Closest to “{word}”?",
      keepAsIs: "Leave it as is",
      open: "Open",
      close: "Close",
      collapse: "Collapse",
      expand: "Expand",
      dragHint: "Drag to move. Arrow keys work too",
      help: "How to",
      index: "Index",
      contact: "Contact",
      indexIntro: "Open without drawing.",
      helpSteps: [
        "Draw a box or a circle anywhere.",
        "Tap inside it and type a word (Work, About, Contact…).",
        "The shape becomes a button. Press it and the page opens from there.",
      ],
      helpMore: "Draw a line between two shapes to see how they relate.",
      helpShortcuts: "Wheel to pan, Ctrl+wheel to zoom, Space+drag to pan. ⌘Z undo, ⇧⌘Z redo, 0 to see everything, Esc to close.",
      undo: "Undo",
      redo: "Redo",
      erase: "Erase",
      draw: "Draw",
      fit: "See everything",
      saveImage: "Save as image",
      reset: "Start over",
      resetConfirm: "Erase everything and start over?",
      relationUnknown: "The link between these two isn't written yet.",
      restored: "Restored your previous canvas.",
      a11y: {
        shapeMade: "An enclosure was made. Tap inside it to type a word.",
        became: "“{label}” is now the entry to {topic}.",
        opened: "Opened {topic}.",
        closed: "Closed {topic}.",
        unknownWord: "Nothing matches “{word}”. You can pick a nearby topic.",
        connected: "Connected {a} and {b}.",
        erased: "Erased.",
        undone: "Undone.",
        redone: "Redone.",
        resetDone: "Starting over.",
      },
      panels: {
        now: "Now",
        more: "More",
        website: "Website",
        allPosts: "All posts",
        alsoOnNote: "Also on note",
        minutes: "min read",
        results: "Results",
        openWriting: "Open writing",
        openWorks: "Open work",
        openPhilosophy: "Open philosophy",
        openQuestions: "Open questions",
        timeline: "Timeline",
        updated: "updated",
        email: "Email",
        why: "Why it started",
        what: "What was done",
        learned: "What I learned",
        status: "Where it stands",
        related: "Related",
        questionsIntro: "Write a question inside a shape and the answer opens here. Questions without an answer yet stay as they are.",
        askedWord: "Your word",
        concern: "What bothers me now",
        origin: "Where it comes from",
        allBooks: "See the whole shelf",
        questionsInPanel: "Questions on this",
      },
    },
  },
} as const;
