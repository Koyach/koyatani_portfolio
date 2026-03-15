const MEDIA = [
  {
    category: "TV / Web番組",
    items: [
      {
        title: "AbemaTV",
        detail: "2026年衆議院選挙 選挙特番に出演",
        url: "https://www.youtube.com/watch?v=ErYx_5WFNM0",
      },
      {
        title: "TBS京都",
        detail: "ミラコエの活動紹介がテレビ放映",
      },
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
      {
        title: "Yahoo! ニュース",
        detail: "ミラコエの活動が掲載",
      },
      {
        title: "読売新聞・京都新聞",
        detail: "複数回にわたり活動を紹介",
      },
    ],
  },
  {
    category: "登壇",
    items: [
      {
        title: "JDiCE 日本デジタルシティズンシップ教育研究会",
        detail: "「SNS時代の分断と主権者教育：良識をどう育むか」を発表",
      },
      {
        title: "能登半島 七尾茶谷市長講演会",
        detail: "市長に向けた講演を実施",
      },
    ],
  },
];

export default function Media() {
  return (
    <section id="media" className="section-padding">
      <div className="mx-auto max-w-[var(--max-content)]">
        <div className="section-label fade-in">Media</div>

        <h2 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(1.6rem,3vw,2.4rem)] font-semibold mb-12 fade-in">
          メディア掲載・出演
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {MEDIA.map((group, gi) => (
            <div key={gi} className={`fade-in fade-in-delay-${Math.min(gi + 1, 4)}`}>
              <h3 className="text-[0.7rem] font-medium tracking-[0.2em] uppercase text-[var(--accent)] mb-6 pb-3 border-b border-[var(--border)]">
                {group.category}
              </h3>
              <ul className="space-y-6">
                {group.items.map((item, ii) => (
                  <li key={ii}>
                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group"
                      >
                        <p className="text-[0.95rem] font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                          {item.title}
                          <svg
                            aria-hidden="true"
                            className="inline-block w-3.5 h-3.5 ml-1.5 text-[var(--text-tertiary)] group-hover:text-[var(--accent)] transition-colors"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.5}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                          </svg>
                        </p>
                        <p className="text-[0.8rem] text-[var(--text-secondary)] mt-1">
                          {item.detail}
                        </p>
                      </a>
                    ) : (
                      <>
                        <p className="text-[0.95rem] font-medium text-[var(--text-primary)]">
                          {item.title}
                        </p>
                        <p className="text-[0.8rem] text-[var(--text-secondary)] mt-1">
                          {item.detail}
                        </p>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
