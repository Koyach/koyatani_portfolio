export interface Book {
  slug: string;
  title: string;
  author: string;
  /** Koya's own one-line takeaway, from his reading notes */
  comment: string;
  genre: string;
  cover?: string;
  amazonUrl?: string;
}

/**
 * Books with a real note behind them. Source: Koya's reading notes
 * (Obsidian, 04_読書・動画メモ) and the 2026-09-08 content sheet.
 * Sample data was removed; nothing is listed without his own words on it.
 */
export const books: Book[] = [
  {
    slug: "resolution",
    title: "解像度を上げる",
    author: "馬田隆明",
    comment: "共感されることが多かったのは、課題が優れていたからではなく、解像度が低くて誰にでも当てはまる課題だったから。衝撃だった。",
    genre: "Business",
  },
  {
    slug: "art-of-loving",
    title: "愛するということ",
    author: "エーリッヒ・フロム",
    comment: "未成熟な愛は、必要であるがゆえに愛する。成熟した愛は、愛するがゆえに必要とする。",
    genre: "Thought",
  },
  {
    slug: "essentialism",
    title: "エッセンシャル思考",
    author: "グレッグ・マキューン",
    comment: "モチベーションを高めるのは、日々のささやかな進捗。90点ルール。",
    genre: "Business",
    cover: "/images/books/essentialism.jpg",
    amazonUrl: "https://www.amazon.co.jp/dp/4761270438",
  },
  {
    slug: "mintzberg",
    title: "ミンツバーグの組織論",
    author: "ヘンリー・ミンツバーグ",
    comment: "プログラム型組織は超効率的かつ安定的。ただ、私はそこで働きたくない。",
    genre: "Management",
    cover: "/images/books/mintzberg.jpg",
    amazonUrl: "https://www.amazon.co.jp/%E3%83%9F%E3%83%B3%E3%83%84%E3%83%90%E3%83%BC%E3%82%B0%E3%81%AE%E7%B5%84%E7%B9%94%E8%AB%96-%EF%BC%97%E3%81%A4%E3%81%AE%E9%A1%9E%E5%9E%8B%E3%81%A8%E5%8A%9B%E5%AD%A6%E3%80%81%E3%81%9D%E3%81%97%E3%81%A6%E3%81%9D%E3%81%AE%E5%85%88%E3%81%B8-%E3%83%98%E3%83%B3%E3%83%AA%E3%83%BC%E3%83%BB%E3%83%9F%E3%83%B3%E3%83%84%E3%83%90%E3%83%BC%E3%82%B0/dp/4478118167",
  },
  {
    slug: "change-society",
    title: "「社会を変える」を仕事にする",
    author: "駒崎弘樹",
    comment: "若いうちに培うべきなのは「自分はできるんだ」という心構え。",
    genre: "Social",
  },
  {
    slug: "consultant-first-year",
    title: "コンサル一年目が学ぶこと",
    author: "大石哲之",
    comment: "情報を集めただけでは考えたことにならない。その先の本質を提案して初めて価値が生まれる。",
    genre: "Business",
  },
  {
    slug: "drill-hole",
    title: "ドリルを売るには穴を売れ",
    author: "佐藤義典",
    comment: "マーケティングで大事なのは肌感覚。実地で起こるもの。",
    genre: "Marketing",
    cover: "/images/books/drill-hole.jpg",
    amazonUrl: "https://www.amazon.co.jp/%E3%83%89%E3%83%AA%E3%83%AB%E3%82%92%E5%A3%B2%E3%82%8B%E3%81%AB%E3%81%AF%E7%A9%B4%E3%82%92%E5%A3%B2%E3%82%8C-%E4%BD%90%E8%97%A4-%E7%BE%A9%E5%85%B8/dp/4413036239",
  },
  {
    slug: "wealth-of-nations",
    title: "国富論",
    author: "アダム・スミス",
    comment: "富は金銀ではなく労働の生産物であり、分業がそれを増やす。",
    genre: "Thought",
  },
  {
    slug: "singularity",
    title: "シンギュラリティは近い",
    author: "レイ・カーツワイル",
    comment: "寿命脱出速度、知能の100万倍。メモを取りながら読んだ。",
    genre: "Technology",
  },
  {
    slug: "naruto",
    title: "NARUTO",
    author: "岸本斉史",
    comment: "成功の定義が「仲間と自由」になったのは、この漫画の影響が大きい。",
    genre: "Manga",
  },
];

export const genres = [...new Set(books.map((b) => b.genre))];
