import type { Locale } from "@/lib/translations";
import type { TopicId } from "@/lib/atelier/topics";

/**
 * Questions a visitor might write into a shape, answered in Koya's own words.
 * Source: the 2026-09-08 content sheet (his notes, lightly edited into prose;
 * English is a translation). Nothing here is generated on his behalf — an
 * unanswered question simply isn't listed.
 */
export interface QA {
  id: string;
  question: Record<Locale, string>;
  answer: Record<Locale, string[]>; // paragraphs
  /** words a visitor might write that should open this answer (matched after normalisation) */
  keywords: string[];
  related: TopicId[];
}

export const questions: QA[] = [
  {
    id: "now",
    question: { ja: "いま何をしている？", en: "What are you doing now?" },
    answer: {
      ja: [
        "Zero Industries（旧 Bedrock Space）の共同創業者として、事業をつくっている。",
        "具体的には、レーザー給電事業の研究開発に必要な人材の採用と、研究機関との共同研究の締結を担当している。",
      ],
      en: [
        "Building the business as a co-founder of Zero Industries (formerly Bedrock Space).",
        "Concretely: hiring the researchers our laser power-beaming R&D needs, and signing joint-research agreements with research institutions.",
      ],
    },
    keywords: ["いま何", "今何", "何してる", "なにしてる", "最近", "さいきん", "現在", "げんざい", "今は", "いまは", "now", "these days", "currently", "recent", "recently", "today", "近況"],
    related: ["about", "works"],
  },
  {
    id: "management-sense",
    question: { ja: "経営者としてのセンスは？", en: "Do you have what it takes to run a company?" },
    answer: {
      ja: [
        "学生時代のリーダー経験と、全日本・全国大会に出場した競技者としての規律。",
        "ミラコエをゼロから立ち上げ、延べ 80 名ほどが関わる組織を、仕組みで回るところまで育てたリーダーシップ。",
        "自分で会社を創業しようとして、一度失敗した経験。",
        "そしていま、Zero の COO として事業づくりに責任を持っている経験。",
      ],
      en: [
        "Leadership experience since school, and the discipline of an athlete who competed at national championships.",
        "The leadership of building Mirakoe from zero into an organization some 80 people have passed through, and getting it to run on systems rather than on me.",
        "The experience of trying to found a company myself, and failing once.",
        "And now, the responsibility of building a business as COO of Zero.",
      ],
    },
    keywords: ["経営者", "経営", "けいえい", "センス", "せんす", "向いてる", "向いている", "むいてる", "リーダー", "りーだー", "器", "素質", "適性", "leader", "leadership", "management", "manager", "sense", "coo", "ceo", "executive"],
    related: ["works", "philosophy"],
  },
  {
    id: "why-politics",
    question: { ja: "なぜ政治（選挙）なのか", en: "Why politics?" },
    answer: {
      ja: [
        "18 歳の僕にとって、政治がいちばん近くにある問題だった。",
        "政治は人と人の関係性そのもので、生活から切り離せない。だから問題意識を持つことが多かったし、取り組みやすかった。",
      ],
      en: [
        "At eighteen, politics was the problem closest to me.",
        "Politics is relationships between people; you can't cut it out of daily life. That's why I kept running into it, and why it was the easiest place to start.",
      ],
    },
    keywords: ["なぜ政治", "政治の理由", "なぜ選挙", "選挙の理由", "政治なぜ", "きっかけ", "ミラコエの理由", "なぜミラコエ", "why politics", "why election", "why mirakoe", "motivation"],
    related: ["philosophy", "writing"],
  },
  {
    id: "role-model",
    question: { ja: "尊敬する人・影響を受けた人", en: "Who do you look up to?" },
    answer: {
      ja: ["スキーのコーチ。「できるかできないか」ではなく「やるかやらないか」だと、ずっと教えてくれた人。"],
      en: ["My ski coach. The person who kept telling me the question is never “can you or can't you” but “will you or won't you.”"],
    },
    keywords: ["尊敬", "そんけい", "師匠", "ししょう", "影響を受けた", "影響", "ロールモデル", "ろーるもでる", "恩師", "コーチ", "こーち", "role model", "mentor", "coach", "hero", "respect", "admire", "idol"],
    related: ["philosophy", "skiing"],
  },
  {
    id: "why-sfc",
    question: { ja: "慶應 SFC を選んだ理由", en: "Why Keio SFC?" },
    answer: {
      ja: ["関東に出て、同志社とは違う環境に身を置きたかった。", "それと、これからは問題解決の時代だと思ったから。"],
      en: ["I wanted to move to Tokyo and put myself somewhere unlike Doshisha.", "And because I believed the coming era would be about solving problems."],
    },
    keywords: ["なぜsfc", "sfcの理由", "なぜ慶應", "なぜ慶応", "大学の理由", "進路", "しんろ", "志望理由", "why sfc", "why keio", "why university", "college choice"],
    related: ["about"],
  },
  {
    id: "hardest",
    question: { ja: "起業でいちばんきつかったこと", en: "The hardest part of starting a company?" },
    answer: {
      ja: ["大事な仲間と心が通わないこと。", "停滞して行き先が見えないなかで、お金だけが減っていくこと。"],
      en: ["Not being able to reach the people who matter most to me.", "Standing still with no direction in sight, while the money keeps going down."],
    },
    keywords: ["きつかった", "きつい", "つらい", "辛い", "苦労", "くろう", "しんどい", "大変", "たいへん", "hardest", "hard", "tough", "struggle", "difficult", "pain"],
    related: ["works", "philosophy"],
  },
  {
    id: "strengths",
    question: { ja: "強みと弱み", en: "Strengths and weaknesses" },
    answer: {
      ja: [
        "強みは行動力。思いついた瞬間に政治家に電話する、ケニアに行く、ヒッチハイクをする。「助けてくれ」と頼めば人が集まり、大人や経営者の懐に入っていける。",
        "弱みは、一歩目は爆速なのに、二日後にはネガティブな想像が湧いて止まること。否定されるのが怖くて、安心できる環境に閉じこもってしまうこと。",
      ],
      en: [
        "My strength is that I move. The moment an idea lands I'm calling a politician, flying to Kenya, hitchhiking. When I say “help me,” people show up, and I can get close to adults and executives.",
        "My weakness: the first step is instant, and two days later the negative scenarios arrive and I stall. I'm afraid of being rejected as I am, so I retreat to where it feels safe.",
      ],
    },
    keywords: ["強み", "つよみ", "弱み", "よわみ", "得意", "とくい", "苦手", "にがて", "長所", "短所", "性格", "せいかく", "strength", "strengths", "weakness", "weaknesses", "personality", "good at", "bad at"],
    related: ["about", "philosophy"],
  },
  {
    id: "food",
    question: { ja: "好きな食べ物・好きなもの", en: "Favourite food, favourite things" },
    answer: {
      ja: [
        "ラーメン。京都には「京都ラーメン」と呼ばれるほど名店が多い。",
        "音楽は Beatles と Oasis が好きだったが、いまは 2000 年代の曲も聴く。休みの日は、祖父の車を運転したり、祖母とイタリアンを食べたり、猫に餌をやって映画を見て本を読んだり、友人とサウナに行ったり、プレイリストを作ったり、筋トレをしたりしている。",
      ],
      en: [
        "Ramen. Kyoto has so many great shops that people talk about “Kyoto ramen” as its own thing.",
        "Music: long a Beatles and Oasis person, lately also the 2000s. Days off go to driving my grandfather's car, Italian lunches with my grandmother, feeding the cat, films, books, saunas with friends, making playlists, and lifting.",
      ],
    },
    keywords: ["食べ物", "たべもの", "好きな", "すきな", "好物", "こうぶつ", "ラーメン", "らーめん", "趣味", "しゅみ", "音楽", "おんがく", "休日", "きゅうじつ", "休み", "やすみ", "オフ", "日常", "にちじょう", "食", "food", "favorite", "favourite", "hobby", "hobbies", "music", "weekend", "day off", "ramen", "like"],
    related: ["about"],
  },
  {
    id: "failure",
    question: { ja: "いちばんの失敗", en: "Your biggest failure" },
    answer: {
      ja: [
        "能登・輪島塗の事業。契約も法人化も成立しないまま、成功の一歩手前で、自分の手で止めた。",
        "学んだのは、嘘は続かないこと。純粋に「したい・したくない」で取捨選択することが、長期的なやる気を生む。",
      ],
      en: [
        "The Wajima lacquerware venture in Noto. One step short of working, with neither the contract nor the company finalized, I stopped it myself.",
        "What it taught me: lies don't last. Choosing purely by “I want to / I don't” is what produces motivation that holds up over years.",
      ],
    },
    keywords: ["失敗", "しっぱい", "挫折", "ざせつ", "しくじり", "後悔", "こうかい", "うまくいかなかった", "failure", "failed", "mistake", "mistakes", "regret", "setback"],
    related: ["works", "philosophy"],
  },
  {
    id: "future",
    question: { ja: "5 年後・10 年後", en: "Five years, ten years from now" },
    answer: {
      ja: [
        "周りから信頼され、会社のメンバーに慕われ、代表として責任を持ちながら会社を大きくしている。趣味やスキーでもイベントを開き、「こいつがいないと始まらない」と思われる存在。日本に閉じず、世界中に信頼できる仲間がいる状態。",
        "22 歳までに、事業・知性・仲間の三位一体で自分の原型を完成させる。",
      ],
      en: [
        "Trusted by the people around me, liked by the people in my company, growing it while carrying responsibility as its head. Hosting events in skiing and the things I love, the kind of person without whom nothing gets started. Not boxed into Japan — with people I can trust all over the world.",
        "By twenty-two: a first complete version of myself, built on business, intellect and companions together.",
      ],
    },
    keywords: ["5年後", "5ねんご", "10年後", "10ねんご", "将来", "しょうらい", "夢", "ゆめ", "目標", "もくひょう", "ビジョン", "びじょん", "未来", "みらい", "野望", "future", "dream", "dreams", "goal", "goals", "vision", "ambition", "years from now"],
    related: ["philosophy"],
  },
  {
    id: "why-ski",
    question: { ja: "なぜスキーを続けるのか", en: "Why do you keep skiing?" },
    answer: {
      ja: [
        "アルペンや技術スキーには決められた一つの「正解」があって、そこに自分を当てはめていく。フリースタイルは、自分がかっこいいと思うトリックを自分で決めて、好きなように極める。",
        "高校のころ「変な正解を一つ決めて、それ以外はダメ」という空気がずっと嫌で、「もっと自分らしく滑れよ」と思っていた。いまは 65 年続くサークル「ゴブリン」の代表として、それを広める側でやっている。",
      ],
      en: [
        "Alpine and technical skiing have one fixed “correct answer” you fit yourself into. Freestyle is deciding for yourself which trick looks good and perfecting it your own way.",
        "In high school I hated the air of “one odd answer is right and everything else is wrong,” and kept thinking, ski more like yourself. Now I run Goblin, a ski club with 65 years of history, and I'm on the spreading side of that.",
      ],
    },
    keywords: ["なぜスキー", "スキーの理由", "スキーを続ける", "続ける理由", "フリースタイルの理由", "なぜフリースタイル", "why ski", "why skiing", "why freestyle", "keep skiing"],
    related: ["skiing", "philosophy"],
  },
  {
    id: "influences",
    question: { ja: "影響を受けた本", en: "Books that shaped you" },
    answer: {
      ja: [
        "漫画『NARUTO』。成功の定義が「仲間と自由」になったのは、この影響が大きい。",
        "最近はアイン・ランドと稲盛和夫を対比しながら読み、自分の哲学を組み立てている。ジャック・アタリ、マックス・ウェーバーを読み進めている。",
      ],
      en: [
        "The manga Naruto. That my definition of success became “companions and freedom” owes a lot to it.",
        "Lately I read Ayn Rand against Kazuo Inamori, building my own philosophy between them. I'm working through Jacques Attali and Max Weber.",
      ],
    },
    keywords: ["影響を受けた本", "本", "ほん", "読書", "どくしょ", "おすすめの本", "愛読書", "漫画", "まんが", "マンガ", "ナルト", "なると", "book", "books", "reading list", "manga", "naruto", "favourite book", "favorite book"],
    related: ["philosophy", "writing"],
  },
  {
    id: "talks",
    question: { ja: "取材・登壇で話せるテーマ", en: "Topics for interviews and talks" },
    answer: {
      ja: [
        "これまでに話してきたテーマ：若者の政治参加と主権者教育（JDiCE での発表）、学生団体の立ち上げと組織づくり、能登での事業と地方創生、外国人労働者の受け入れ（YouTube「日本未来会議」）、選挙（AbemaTV）。",
        "依頼はコンタクトから。",
      ],
      en: [
        "Topics I've spoken on so far: youth political participation and civic education (JDiCE), founding and running a student organization, the Noto venture and regional revival, immigration and foreign labour (YouTube's Nihon Mirai Kaigi), elections (AbemaTV).",
        "Requests via Contact.",
      ],
    },
    keywords: ["話せるテーマ", "話せる", "講演テーマ", "登壇テーマ", "取材テーマ", "講演依頼", "登壇依頼", "取材依頼", "テーマ", "speaking topics", "talk topics", "topics", "speaker", "lecture"],
    related: ["contact", "media"],
  },
];

export const QUESTION_BY_ID: Record<string, QA> = Object.fromEntries(questions.map((q) => [q.id, q]));
