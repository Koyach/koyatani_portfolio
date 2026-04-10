export interface Book {
  slug: string;
  title: string;
  author: string;
  comment: string;
  genre: string;
  cover: string;
  amazonUrl: string;
}

export const books: Book[] = [
  // --- サンプルデータ（後で差し替え） ---
  {
    slug: "zero-to-one",
    title: "ゼロ・トゥ・ワン",
    author: "ピーター・ティール",
    comment: "「競争は敗者のすること」。起業家として、独自の価値を作る思考法を学んだ一冊。",
    genre: "Business",
    cover: "/images/books/zero-to-one.jpg",
    amazonUrl: "https://www.amazon.co.jp/dp/4140816589",
  },
  {
    slug: "thinking-fast-and-slow",
    title: "ファスト&スロー",
    author: "ダニエル・カーネマン",
    comment: "人間の意思決定がいかに非合理かを理解すると、政治参加の設計も変わる。",
    genre: "Psychology",
    cover: "/images/books/thinking-fast-and-slow.jpg",
    amazonUrl: "https://www.amazon.co.jp/dp/4150504105",
  },
  {
    slug: "sapiens",
    title: "サピエンス全史",
    author: "ユヴァル・ノア・ハラリ",
    comment: "「虚構を信じる力」が人類を動かしてきた。社会を変えたいなら、物語を作れるかが鍵。",
    genre: "Thought",
    cover: "/images/books/sapiens.jpg",
    amazonUrl: "https://www.amazon.co.jp/dp/430922671X",
  },
  {
    slug: "essentialism",
    title: "エッセンシャル思考",
    author: "グレッグ・マキューン",
    comment: "「より少なく、しかしより良く」。やることを絞る勇気をくれた一冊。",
    genre: "Business",
    cover: "/images/books/essentialism.jpg",
    amazonUrl: "https://www.amazon.co.jp/dp/4761270438",
  },
  {
    slug: "non-designers-design-book",
    title: "ノンデザイナーズ・デザインブック",
    author: "Robin Williams",
    comment: "近接・整列・反復・コントラスト。デザインの4原則を知るだけで、アウトプットの質が変わる。",
    genre: "Design",
    cover: "/images/books/non-designers-design-book.jpg",
    amazonUrl: "https://www.amazon.co.jp/dp/4839955557",
  },
  {
    slug: "drill-hole",
    title: "ドリルを売るには穴を売れ",
    author: "佐藤義典",
    comment: "顧客が本当に求めているのは「手段」ではなく「結果」。マーケティングの本質がわかる。",
    genre: "Marketing",
    cover: "/images/books/drill-hole.jpg",
    amazonUrl: "https://www.amazon.co.jp/dp/4413036018",
  },
  {
    slug: "mintzberg",
    title: "ミンツバーグの組織論",
    author: "ヘンリー・ミンツバーグ",
    comment: "組織の5つの基本形。ミラコエの組織設計で実際に参考にした。",
    genre: "Management",
    cover: "/images/books/mintzberg.jpg",
    amazonUrl: "https://www.amazon.co.jp/dp/4478024537",
  },
];

export const genres = [...new Set(books.map((b) => b.genre))];
